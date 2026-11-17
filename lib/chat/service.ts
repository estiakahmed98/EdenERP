/**
 * Live chat persistence. Used by both the API routes (bundled by Next.js) and
 * the WebSocket server (server.ts, run by tsx) — so it must not hold any
 * in-memory state; everything lives in Postgres.
 */
import { createHash, randomBytes } from "node:crypto";

import { db } from "@/lib/db";
import type {
  ChatConversation,
  ChatMessage,
  ChatSenderType,
} from "@/lib/generated/prisma/client";
import {
  CHAT_LIMITS,
  type AdminConversationDTO,
  type ChatMessageDTO,
  type ChatStatus,
  type VisitorConversationDTO,
} from "@/lib/chat/shared";

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

export function newChatToken() {
  return randomBytes(32).toString("base64url");
}

export function hashChatToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.ANALYTICS_IP_SALT || process.env.AUTH_SECRET || "";
  return createHash("sha256").update(`chat|${salt}|${ip}`).digest("hex");
}

/** Raw cookie header -> { name: value } (first occurrence wins). */
export function parseCookies(header: string | undefined | null) {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    if (!k || k in out) continue;
    try {
      out[k] = decodeURIComponent(part.slice(i + 1).trim());
    } catch {
      out[k] = part.slice(i + 1).trim();
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// DTO mapping
// ---------------------------------------------------------------------------

const iso = (d: Date | null | undefined) => (d ? d.toISOString() : null);

export function toMessageDTO(m: ChatMessage): ChatMessageDTO {
  return {
    id: m.id,
    conversationId: m.conversationId,
    senderType: m.senderType,
    senderName: m.senderName,
    body: m.body,
    clientId: m.clientId,
    createdAt: m.createdAt.toISOString(),
    deliveredAt: iso(m.deliveredAt),
    readAt: iso(m.readAt),
  };
}

export function toVisitorConversationDTO(c: ChatConversation): VisitorConversationDTO {
  return {
    id: c.id,
    visitorName: c.visitorName,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
  };
}

export function toAdminConversationDTO(
  c: ChatConversation,
  extra: { unreadCount: number; online: boolean },
): AdminConversationDTO {
  return {
    id: c.id,
    visitorName: c.visitorName,
    visitorEmail: c.visitorEmail,
    visitorPhone: c.visitorPhone,
    userId: c.userId,
    locale: c.locale,
    status: c.status,
    startPath: c.startPath,
    currentPath: c.currentPath,
    userAgent: c.userAgent,
    online: extra.online,
    visitorLastSeenAt: iso(c.visitorLastSeenAt),
    lastMessageAt: iso(c.lastMessageAt),
    lastMessagePreview: c.lastMessagePreview,
    unreadCount: extra.unreadCount,
    createdAt: c.createdAt.toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------

export type NewConversationInput = {
  name: string;
  email?: string | null;
  phone?: string | null;
  locale?: string | null;
  path?: string | null;
  userId?: string | null;
  userAgent?: string | null;
  ip?: string | null;
};

export async function createConversation(input: NewConversationInput) {
  const token = newChatToken();
  const conversation = await db.chatConversation.create({
    data: {
      tokenHash: hashChatToken(token),
      visitorName: input.name.slice(0, CHAT_LIMITS.name),
      visitorEmail: input.email?.slice(0, CHAT_LIMITS.email) || null,
      visitorPhone: input.phone?.slice(0, CHAT_LIMITS.phone) || null,
      locale: (input.locale || "en").slice(0, 8),
      startPath: input.path?.slice(0, CHAT_LIMITS.path) || null,
      currentPath: input.path?.slice(0, CHAT_LIMITS.path) || null,
      userId: input.userId || null,
      userAgent: input.userAgent?.slice(0, 512) || null,
      ipHash: hashIp(input.ip ?? null),
    },
  });
  return { conversation, token };
}

export async function findConversationByToken(token: string | undefined | null) {
  if (!token || token.length > 128) return null;
  return db.chatConversation.findUnique({ where: { tokenHash: hashChatToken(token) } });
}

/** Hand a signed-in user their latest conversation on a new device: rotates the token. */
export async function reclaimConversationForUser(userId: string) {
  const existing = await db.chatConversation.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  if (!existing) return null;
  const token = newChatToken();
  const conversation = await db.chatConversation.update({
    where: { id: existing.id },
    data: { tokenHash: hashChatToken(token) },
  });
  return { conversation, token };
}

export async function getConversation(id: string) {
  return db.chatConversation.findUnique({ where: { id } });
}

export async function unreadForAdmin(conversationIds: string[]) {
  if (conversationIds.length === 0) return new Map<string, number>();
  const rows = await db.chatMessage.groupBy({
    by: ["conversationId"],
    where: { conversationId: { in: conversationIds }, senderType: "VISITOR", readAt: null },
    _count: { _all: true },
  });
  return new Map(rows.map((r) => [r.conversationId, r._count._all]));
}

export async function adminConversationSummary(id: string, online: boolean) {
  const c = await getConversation(id);
  if (!c) return null;
  const unread = await unreadForAdmin([id]);
  return toAdminConversationDTO(c, { unreadCount: unread.get(id) ?? 0, online });
}

export async function listConversations(opts: {
  status?: ChatStatus | "ALL";
  q?: string;
  take?: number;
  isOnline: (id: string) => boolean;
}) {
  const q = opts.q?.trim().slice(0, 100);
  const rows = await db.chatConversation.findMany({
    where: {
      ...(opts.status && opts.status !== "ALL" ? { status: opts.status } : {}),
      ...(q
        ? {
            OR: [
              { visitorName: { contains: q, mode: "insensitive" } },
              { visitorEmail: { contains: q, mode: "insensitive" } },
              { visitorPhone: { contains: q } },
              { lastMessagePreview: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ lastMessageAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
    take: Math.min(opts.take ?? 100, 200),
  });
  const unread = await unreadForAdmin(rows.map((r) => r.id));
  return rows.map((c) =>
    toAdminConversationDTO(c, { unreadCount: unread.get(c.id) ?? 0, online: opts.isOnline(c.id) }),
  );
}

export async function getMessages(conversationId: string, before?: Date | null, take = CHAT_LIMITS.historyPage) {
  const rows = await db.chatMessage.findMany({
    where: { conversationId, ...(before ? { createdAt: { lt: before } } : {}) },
    orderBy: { createdAt: "desc" },
    take: Math.min(take, 200) + 1,
  });
  const hasMore = rows.length > take;
  return { messages: rows.slice(0, take).reverse().map(toMessageDTO), hasMore };
}

export async function setConversationStatus(id: string, status: ChatStatus) {
  return db.chatConversation.update({
    where: { id },
    data: { status, closedAt: status === "CLOSED" ? new Date() : null },
  });
}

export async function touchVisitor(id: string, data: { currentPath?: string }) {
  return db.chatConversation.update({
    where: { id },
    data: {
      visitorLastSeenAt: new Date(),
      ...(data.currentPath ? { currentPath: data.currentPath.slice(0, CHAT_LIMITS.path) } : {}),
    },
  });
}

// ---------------------------------------------------------------------------
// Messages and receipts
// ---------------------------------------------------------------------------

export async function saveMessage(input: {
  conversationId: string;
  senderType: ChatSenderType;
  senderUserId?: string | null;
  senderName?: string | null;
  body: string;
  clientId: string;
  delivered: boolean;
  /** false: leave the inbox preview / last-activity time alone (automatic replies). */
  updatePreview?: boolean;
}) {
  const now = new Date();
  // Resend after a reconnect: return the stored row instead of a duplicate.
  const existing = await db.chatMessage.findUnique({
    where: {
      conversationId_clientId: { conversationId: input.conversationId, clientId: input.clientId },
    },
  });
  if (existing) return { message: existing, duplicate: true };

  const [message] = await db.$transaction([
    db.chatMessage.create({
      data: {
        conversationId: input.conversationId,
        senderType: input.senderType,
        senderUserId: input.senderUserId ?? null,
        senderName: input.senderName?.slice(0, CHAT_LIMITS.name) ?? null,
        body: input.body,
        clientId: input.clientId,
        createdAt: now,
        deliveredAt: input.delivered ? now : null,
      },
    }),
    db.chatConversation.update({
      where: { id: input.conversationId },
      data: {
        ...(input.updatePreview === false
          ? {}
          : { lastMessageAt: now, lastMessagePreview: input.body.replace(/\s+/g, " ").slice(0, 200) }),
        // A visitor writing into a closed conversation reopens it.
        ...(input.senderType === "VISITOR" ? { status: "OPEN", closedAt: null } : {}),
      },
    }),
  ]);
  return { message, duplicate: false };
}

/**
 * Mark undelivered messages written by `sender` as delivered. Returns the
 * affected ids grouped by conversation so the sender side can be notified.
 */
export async function markDelivered(where: { conversationId?: string; sender: ChatSenderType }) {
  const pending = await db.chatMessage.findMany({
    where: {
      senderType: where.sender,
      deliveredAt: null,
      ...(where.conversationId ? { conversationId: where.conversationId } : {}),
    },
    select: { id: true, conversationId: true },
    take: 2000,
  });
  if (pending.length === 0) return { at: new Date(), byConversation: new Map<string, string[]>() };
  const at = new Date();
  await db.chatMessage.updateMany({
    where: { id: { in: pending.map((p) => p.id) } },
    data: { deliveredAt: at },
  });
  const byConversation = new Map<string, string[]>();
  for (const p of pending) {
    const list = byConversation.get(p.conversationId) ?? [];
    list.push(p.id);
    byConversation.set(p.conversationId, list);
  }
  return { at, byConversation };
}

/** Mark messages written by `sender` in a conversation as read (and delivered). */
export async function markRead(conversationId: string, sender: ChatSenderType) {
  const pending = await db.chatMessage.findMany({
    where: { conversationId, senderType: sender, readAt: null },
    select: { id: true },
    take: 2000,
  });
  const at = new Date();
  if (pending.length === 0) return { at, ids: [] as string[] };
  const ids = pending.map((p) => p.id);
  await db.$transaction([
    db.chatMessage.updateMany({ where: { id: { in: ids }, deliveredAt: null }, data: { deliveredAt: at } }),
    db.chatMessage.updateMany({ where: { id: { in: ids } }, data: { readAt: at } }),
  ]);
  return { at, ids };
}
