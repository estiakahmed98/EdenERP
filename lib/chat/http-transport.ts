/**
 * HTTP (polling) chat transport — the fallback for hosts that cannot hold a
 * WebSocket (Vercel and other serverless platforms), served by
 * app/api/chat/poll/route.ts.
 *
 * Stateless: every request reads and writes Postgres, so it works across any
 * number of short-lived function instances. Presence is derived from
 * heartbeats (visitorLastSeenAt / chat_agent_presence) instead of open sockets.
 * Expiring typing rows carry typing indicators across serverless instances.
 */
import { db } from "@/lib/db";
import { createRateLimiter } from "@/lib/security/rate-limit";
import {
  CHAT_LIMITS,
  validateMessageContent,
  type ChatClientEvent,
  type AdminConversationDTO,
  type ChatServerEvent,
} from "@/lib/chat/shared";
import {
  adminConversationSummary,
  getConversation,
  markDelivered,
  markRead,
  saveMessage,
  setConversationStatus,
  toAdminConversationDTO,
  toMessageDTO,
  toVisitorConversationDTO,
  touchVisitor,
  unreadForAdmin,
} from "@/lib/chat/service";
import type { ChatConversation } from "@/lib/generated/prisma/client";
import { reactionActor } from "@/lib/chat/reactions";
import { readTyping, writeTyping } from "@/lib/chat/typing";
import { sendAutoReplyIfFirst } from "@/lib/chat/auto-reply";

/** A heartbeat younger than this counts as online. Clients poll every few seconds. */
export const ONLINE_MS = 30_000;
/** Re-read this much before the cursor so rows committed late are never missed (client de-duplicates). */
const OVERLAP_MS = 5_000;
/** Throttle visitor heartbeat writes. */
const TOUCH_EVERY_MS = 10_000;

const limiter = createRateLimiter({ limit: CHAT_LIMITS.messagesPerWindow, windowMs: CHAT_LIMITS.windowMs });

export type PollResult = { events: ChatServerEvent[]; cursor: string };

const onlineSince = () => new Date(Date.now() - ONLINE_MS);
const isOnlineAt = (c: Pick<ChatConversation, "visitorLastSeenAt">) =>
  Boolean(c.visitorLastSeenAt && c.visitorLastSeenAt.getTime() > Date.now() - ONLINE_MS);

function parseSince(since: string | null) {
  if (!since || Number.isNaN(Date.parse(since))) return null;
  return new Date(Date.parse(since) - OVERLAP_MS);
}

// ---------------------------------------------------------------- presence

/** Agents online, per admin heartbeat. Tolerates the presence table not being migrated yet. */
async function agentsOnline() {
  try {
    return (await db.chatAgentPresence.count({ where: { lastSeenAt: { gt: onlineSince() } } })) > 0;
  } catch {
    return false;
  }
}

async function adminHeartbeat(userId: string, name: string) {
  try {
    await db.chatAgentPresence.upsert({
      where: { userId },
      create: { userId, name: name.slice(0, CHAT_LIMITS.name), lastSeenAt: new Date() },
      update: { lastSeenAt: new Date(), name: name.slice(0, CHAT_LIMITS.name) },
    });
  } catch {
    /* table missing: presence unavailable, chat still works */
  }
}

async function visitorHeartbeat(conversation: ChatConversation) {
  const last = conversation.visitorLastSeenAt?.getTime() ?? 0;
  if (Date.now() - last < TOUCH_EVERY_MS) return conversation;
  return touchVisitor(conversation.id, {});
}

/** Reactions must not masquerade as new messages or change read/unread state. */
function messageChanges(m: Parameters<typeof toMessageDTO>[0], from: Date, conversation?: AdminConversationDTO): ChatServerEvent[] {
  const events: ChatServerEvent[] = [];
  if (m.createdAt > from) events.push({ t: "message", message: toMessageDTO(m), conversation });
  else {
    if (m.deliveredAt && m.deliveredAt > from) events.push({ t: "receipt", conversationId: m.conversationId, kind: "delivered", ids: [m.id], at: m.deliveredAt.toISOString() });
    if (m.readAt && m.readAt > from) events.push({ t: "receipt", conversationId: m.conversationId, kind: "read", ids: [m.id], at: m.readAt.toISOString() });
  }
  if (m.reactionsUpdatedAt && m.reactionsUpdatedAt > from) events.push({ t: "reaction", message: toMessageDTO(m) });
  return events;
}

// -------------------------------------------------------------------- poll

export async function visitorPoll(conversation: ChatConversation, since: string | null): Promise<PollResult> {
  const cursor = new Date().toISOString();
  const from = parseSince(since);
  const current = await visitorHeartbeat(conversation);
  // Admin replies are delivered once the visitor's client fetches them.
  await markDelivered({ conversationId: conversation.id, sender: "ADMIN" });

  const events: ChatServerEvent[] = [];
  const agents = await agentsOnline();
  if (!from) {
    events.push({ t: "hello", role: "visitor", conversation: toVisitorConversationDTO(current), agentsOnline: agents, reactionActor: reactionActor("VISITOR", conversation.id) });
    events.push(...await readTyping({ conversationId: conversation.id, from: "ADMIN" }));
    return { events, cursor };
  }

  const changed = await db.chatMessage.findMany({
    include: { reactions: true },
    where: {
      conversationId: conversation.id,
      OR: [{ createdAt: { gt: from } }, { deliveredAt: { gt: from } }, { readAt: { gt: from } }, { reactionsUpdatedAt: { gt: from } }],
    },
    orderBy: { createdAt: "asc" },
    take: 200,
  });
  for (const m of changed) events.push(...messageChanges(m, from));
  events.push(...await readTyping({ conversationId: conversation.id, from: "ADMIN" }));
  events.push({ t: "agents", online: agents });
  events.push({ t: "conversation", conversation: toVisitorConversationDTO(current) });
  return { events, cursor };
}

export async function adminPoll(admin: { userId: string; name: string }, since: string | null): Promise<PollResult> {
  const cursor = new Date().toISOString();
  const from = parseSince(since);
  await adminHeartbeat(admin.userId, admin.name);
  // Visitor messages are delivered once an agent's inbox has fetched them.
  await markDelivered({ sender: "VISITOR" });

  const recent = await db.chatConversation.findMany({
    where: { visitorLastSeenAt: { gt: new Date(Date.now() - ONLINE_MS * 2) } },
    take: 200,
  });

  if (!from) {
    return {
      events: [{ t: "hello", role: "admin", userId: admin.userId, reactionActor: reactionActor("ADMIN", admin.userId), online: recent.filter(isOnlineAt).map((c) => c.id) }, ...await readTyping({ excludeActor: `a:${admin.userId}` })],
      cursor,
    };
  }

  const [messages, updated] = await Promise.all([
    db.chatMessage.findMany({
      include: { reactions: true },
      where: { OR: [{ createdAt: { gt: from } }, { deliveredAt: { gt: from } }, { readAt: { gt: from } }, { reactionsUpdatedAt: { gt: from } }] },
      orderBy: { createdAt: "asc" },
      take: 500,
    }),
    db.chatConversation.findMany({ where: { updatedAt: { gt: from } }, take: 200 }),
  ]);

  // Summaries for every conversation that changed or has changed messages.
  const byId = new Map(updated.map((c) => [c.id, c]));
  const missing = [...new Set(messages.map((m) => m.conversationId))].filter((id) => !byId.has(id));
  if (missing.length) {
    for (const c of await db.chatConversation.findMany({ where: { id: { in: missing } } })) byId.set(c.id, c);
  }
  const unread = await unreadForAdmin([...byId.keys()]);
  const summaries = new Map(
    [...byId.values()].map((c) => [
      c.id,
      toAdminConversationDTO(c, { unreadCount: unread.get(c.id) ?? 0, online: isOnlineAt(c) }),
    ]),
  );

  const events: ChatServerEvent[] = [];
  for (const s of summaries.values()) events.push({ t: "conversation", conversation: s });
  for (const m of messages) {
    events.push(...messageChanges(m, from, summaries.get(m.conversationId)));
  }
  for (const c of recent) {
    events.push({
      t: "presence",
      conversationId: c.id,
      online: isOnlineAt(c),
      lastSeenAt: c.visitorLastSeenAt?.toISOString() ?? null,
      currentPath: c.currentPath,
    });
  }
  events.push(...await readTyping({ excludeActor: `a:${admin.userId}` }));
  return { events, cursor };
}

// ------------------------------------------------------------------ frames

function validateBody(raw: string, clientId: string): { body: string } | { error: ChatServerEvent } {
  const value = validateMessageContent(raw);
  return "error" in value ? { error: { t: "error", code: value.error, clientId } } : value;
}

export async function visitorFrame(conversation: ChatConversation, event: ChatClientEvent): Promise<ChatServerEvent[]> {
  const conversationId = conversation.id;
  switch (event.t) {
    case "send": {
      const v = validateBody(event.body, event.clientId);
      if ("error" in v) return [v.error];
      if (!limiter.check(`v:${conversationId}`).ok) return [{ t: "error", code: "RATE_LIMITED", clientId: event.clientId }];
      const { message } = await saveMessage({
        conversationId,
        senderType: "VISITOR",
        senderUserId: conversation.userId,
        senderName: conversation.visitorName,
        body: v.body,
        clientId: event.clientId,
        delivered: false, // set when an agent's inbox fetches it
      });
      const events: ChatServerEvent[] = [{ t: "message", message: toMessageDTO(message) }];
      // The visitor receives it in this response, so it is delivered.
      const auto = await sendAutoReplyIfFirst(conversation, true);
      if (auto) events.push({ t: "message", message: toMessageDTO(auto) });
      return events;
    }
    case "read": {
      const { at, ids } = await markRead(conversationId, "ADMIN");
      return ids.length ? [{ t: "receipt", conversationId, kind: "read", ids, at: at.toISOString() }] : [];
    }
    case "page":
      await touchVisitor(conversationId, { currentPath: event.path });
      return [];
    case "typing":
      await writeTyping(conversationId, `v:${conversationId}`, "VISITOR", conversation.visitorName, event.typing);
      return [];
    case "ping":
      return [];
    default:
      return [{ t: "error", code: "FORBIDDEN" }];
  }
}

export async function adminFrame(admin: { userId: string; name: string }, event: ChatClientEvent): Promise<ChatServerEvent[]> {
  if (event.t === "ping") return [];
  if (!("conversationId" in event) || !event.conversationId) return [{ t: "error", code: "BAD_FRAME" }];
  const conversationId = event.conversationId;
  const conversation = await getConversation(conversationId);
  if (!conversation) {
    return [{ t: "error", code: "NOT_FOUND", clientId: event.t === "send" ? event.clientId : undefined }];
  }
  const summary = async () => {
    const s = await adminConversationSummary(conversationId, isOnlineAt(conversation));
    return s ? [{ t: "conversation", conversation: s } as ChatServerEvent] : [];
  };

  switch (event.t) {
    case "typing":
      await writeTyping(conversationId, `a:${admin.userId}`, "ADMIN", admin.name, event.typing);
      return [];
    case "send": {
      const v = validateBody(event.body, event.clientId);
      if ("error" in v) return [v.error];
      if (!limiter.check(`a:${admin.userId}`).ok) return [{ t: "error", code: "RATE_LIMITED", clientId: event.clientId }];
      const { message, duplicate } = await saveMessage({
        conversationId,
        senderType: "ADMIN",
        senderUserId: admin.userId,
        senderName: admin.name,
        body: v.body,
        clientId: event.clientId,
        delivered: false, // set when the visitor's widget fetches it
      });
      if (!duplicate) await markRead(conversationId, "VISITOR");
      const s = await adminConversationSummary(conversationId, isOnlineAt(conversation));
      return [{ t: "message", message: toMessageDTO(message), conversation: s ?? undefined }];
    }
    case "read": {
      const { at, ids } = await markRead(conversationId, "VISITOR");
      const out: ChatServerEvent[] = ids.length
        ? [{ t: "receipt", conversationId, kind: "read", ids, at: at.toISOString() }]
        : [];
      return [...out, ...(await summary())];
    }
    case "status":
      await setConversationStatus(conversationId, event.status);
      return summary();
    default:
      return [{ t: "error", code: "FORBIDDEN" }];
  }
}
