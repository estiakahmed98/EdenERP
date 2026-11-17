/**
 * Live chat WebSocket hub. Attached to the HTTP server in server.ts.
 *
 * - Visitors: authenticated by the httpOnly CHAT_COOKIE -> one conversation.
 * - Admins:   `?as=admin`, authenticated via the NextAuth session and a
 *             fresh role check against the database.
 *
 * Every message, delivery and read receipt is written to Postgres first and
 * then fanned out, so a restart loses nothing but live presence.
 *
 * Scaling note: socket membership is in-process. Behind several app
 * instances, fan-out must go through a shared bus (Postgres LISTEN/NOTIFY or
 * Redis pub/sub) — a single Node process is assumed here.
 */
import type { IncomingMessage, Server } from "node:http";
import type { Duplex } from "node:stream";

import { WebSocketServer, type RawData, type WebSocket } from "ws";

import { db } from "@/lib/db";
import { createRateLimiter } from "@/lib/security/rate-limit";
import {
  CHAT_COOKIE,
  CHAT_LIMITS,
  CHAT_WS_PATH,
  normalizeBody,
  parseClientEvent,
  type ChatClientEvent,
  type ChatServerEvent,
} from "@/lib/chat/shared";
import {
  adminConversationSummary,
  findConversationByToken,
  getConversation,
  markDelivered,
  markRead,
  parseCookies,
  saveMessage,
  setConversationStatus,
  toMessageDTO,
  toVisitorConversationDTO,
  touchVisitor,
} from "@/lib/chat/service";
import { sendAutoReplyIfFirst } from "@/lib/chat/auto-reply";

type VisitorClient = { role: "visitor"; ws: WebSocket; conversationId: string; name: string; userId: string | null };
type AdminClient = { role: "admin"; ws: WebSocket; userId: string; name: string };
type Client = VisitorClient | AdminClient;
type Identity = Omit<VisitorClient, "ws"> | Omit<AdminClient, "ws">;

const HEARTBEAT_MS = 30_000;

class ChatHub {
  readonly visitors = new Map<string, Set<VisitorClient>>();
  readonly admins = new Set<AdminClient>();
  private readonly alive = new WeakMap<WebSocket, boolean>();
  private readonly limiter = createRateLimiter({
    limit: CHAT_LIMITS.messagesPerWindow,
    windowMs: CHAT_LIMITS.windowMs,
  });
  private readonly lastPageWrite = new Map<string, number>();
  readonly wss = new WebSocketServer({ noServer: true, maxPayload: CHAT_LIMITS.frame });

  constructor() {
    const timer = setInterval(() => {
      for (const ws of this.wss.clients) {
        if (this.alive.get(ws) === false) {
          ws.terminate();
          continue;
        }
        this.alive.set(ws, false);
        ws.ping();
      }
    }, HEARTBEAT_MS);
    timer.unref();
  }

  isOnline = (conversationId: string) => (this.visitors.get(conversationId)?.size ?? 0) > 0;
  get agentsOnline() {
    return this.admins.size > 0;
  }

  // ---------------------------------------------------------------- fan-out

  private send(ws: WebSocket, event: ChatServerEvent) {
    if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(event));
  }
  private toVisitors(conversationId: string, event: ChatServerEvent, except?: WebSocket) {
    for (const c of this.visitors.get(conversationId) ?? []) if (c.ws !== except) this.send(c.ws, event);
  }
  private toAdmins(event: ChatServerEvent, except?: WebSocket) {
    for (const c of this.admins) if (c.ws !== except) this.send(c.ws, event);
  }
  private toAllVisitors(event: ChatServerEvent) {
    for (const set of this.visitors.values()) for (const c of set) this.send(c.ws, event);
  }

  private async pushSummary(conversationId: string) {
    const summary = await adminConversationSummary(conversationId, this.isOnline(conversationId));
    if (summary) this.toAdmins({ t: "conversation", conversation: summary });
  }

  // ------------------------------------------------------------- lifecycle

  attach(client: Client) {
    const { ws } = client;
    this.alive.set(ws, true);
    ws.on("pong", () => this.alive.set(ws, true));
    ws.on("message", (data, isBinary) => {
      if (isBinary) return this.send(ws, { t: "error", code: "BAD_FRAME" });
      void this.onFrame(client, data).catch((err) => {
        console.error("chat: frame failed", err instanceof Error ? err.message : err);
        this.send(ws, { t: "error", code: "SERVER_ERROR" });
      });
    });
    ws.on("close", () => void this.detach(client).catch(() => {}));
    ws.on("error", () => {});

    return client.role === "visitor" ? this.onVisitorJoin(client) : this.onAdminJoin(client);
  }

  private async onVisitorJoin(client: VisitorClient) {
    const firstSocket = !this.isOnline(client.conversationId);
    const set = this.visitors.get(client.conversationId) ?? new Set();
    set.add(client);
    this.visitors.set(client.conversationId, set);

    const conversation = await touchVisitor(client.conversationId, {});
    this.send(client.ws, {
      t: "hello",
      role: "visitor",
      conversation: toVisitorConversationDTO(conversation),
      agentsOnline: this.agentsOnline,
    });

    // Admin replies sent while the visitor was away are now delivered.
    const { at, byConversation } = await markDelivered({
      conversationId: client.conversationId,
      sender: "ADMIN",
    });
    const ids = byConversation.get(client.conversationId);
    if (ids?.length) {
      const receipt: ChatServerEvent = { t: "receipt", conversationId: client.conversationId, kind: "delivered", ids, at: at.toISOString() };
      this.toAdmins(receipt);
      this.toVisitors(client.conversationId, receipt);
    }

    if (firstSocket) {
      this.toAdmins({
        t: "presence",
        conversationId: client.conversationId,
        online: true,
        lastSeenAt: conversation.visitorLastSeenAt?.toISOString() ?? null,
        currentPath: conversation.currentPath,
      });
    }
  }

  private async onAdminJoin(client: AdminClient) {
    const wasEmpty = this.admins.size === 0;
    this.admins.add(client);
    this.send(client.ws, {
      t: "hello",
      role: "admin",
      userId: client.userId,
      online: [...this.visitors.keys()].filter(this.isOnline),
    });
    if (wasEmpty) this.toAllVisitors({ t: "agents", online: true });

    // Visitor messages that arrived with no admin connected are now delivered.
    const { at, byConversation } = await markDelivered({ sender: "VISITOR" });
    for (const [conversationId, ids] of byConversation) {
      const receipt: ChatServerEvent = { t: "receipt", conversationId, kind: "delivered", ids, at: at.toISOString() };
      this.toVisitors(conversationId, receipt);
      this.toAdmins(receipt);
    }
  }

  private async detach(client: Client) {
    if (client.role === "admin") {
      this.admins.delete(client);
      if (this.admins.size === 0) this.toAllVisitors({ t: "agents", online: false });
      return;
    }
    const set = this.visitors.get(client.conversationId);
    set?.delete(client);
    if (set && set.size === 0) {
      this.visitors.delete(client.conversationId);
      this.lastPageWrite.delete(client.conversationId);
      const conversation = await touchVisitor(client.conversationId, {}).catch(() => null);
      this.toAdmins({
        t: "presence",
        conversationId: client.conversationId,
        online: false,
        lastSeenAt: (conversation?.visitorLastSeenAt ?? new Date()).toISOString(),
        currentPath: conversation?.currentPath ?? null,
      });
      this.toAdmins({ t: "typing", conversationId: client.conversationId, from: "VISITOR", typing: false });
    }
  }

  // ---------------------------------------------------------------- frames

  private async onFrame(client: Client, data: RawData) {
    const event = parseClientEvent(data.toString());
    if (!event) return this.send(client.ws, { t: "error", code: "BAD_FRAME" });
    if (event.t === "ping") return this.send(client.ws, { t: "pong" });
    return client.role === "visitor" ? this.onVisitorEvent(client, event) : this.onAdminEvent(client, event);
  }

  private async onVisitorEvent(client: VisitorClient, event: ChatClientEvent) {
    const conversationId = client.conversationId;
    switch (event.t) {
      case "send": {
        const body = normalizeBody(event.body);
        if (!body) return this.send(client.ws, { t: "error", code: "EMPTY", clientId: event.clientId });
        if (body.length > CHAT_LIMITS.body)
          return this.send(client.ws, { t: "error", code: "TOO_LONG", clientId: event.clientId });
        if (!this.limiter.check(`v:${conversationId}`).ok)
          return this.send(client.ws, { t: "error", code: "RATE_LIMITED", clientId: event.clientId });

        const { message, duplicate } = await saveMessage({
          conversationId,
          senderType: "VISITOR",
          senderUserId: client.userId,
          senderName: client.name,
          body,
          clientId: event.clientId,
          delivered: this.agentsOnline,
        });
        const dto = toMessageDTO(message);
        this.toVisitors(conversationId, { t: "message", message: dto });
        if (duplicate) return;
        const summary = await adminConversationSummary(conversationId, true);
        this.toAdmins({ t: "message", message: dto, conversation: summary ?? undefined });
        this.toAdmins({ t: "typing", conversationId, from: "VISITOR", typing: false });

        const conversation = await getConversation(conversationId);
        const auto = conversation ? await sendAutoReplyIfFirst(conversation, true) : null;
        if (auto) {
          const autoDto = toMessageDTO(auto);
          this.toVisitors(conversationId, { t: "message", message: autoDto });
          const autoSummary = await adminConversationSummary(conversationId, true);
          this.toAdmins({ t: "message", message: autoDto, conversation: autoSummary ?? undefined });
        }
        return;
      }
      case "typing":
        return this.toAdmins({ t: "typing", conversationId, from: "VISITOR", typing: event.typing });
      case "read": {
        const { at, ids } = await markRead(conversationId, "ADMIN");
        if (!ids.length) return;
        const receipt: ChatServerEvent = { t: "receipt", conversationId, kind: "read", ids, at: at.toISOString() };
        this.toAdmins(receipt);
        this.toVisitors(conversationId, receipt);
        return;
      }
      case "page": {
        // Track the page the visitor is on; throttle DB writes to one per 5s.
        const now = Date.now();
        if (now - (this.lastPageWrite.get(conversationId) ?? 0) < 5_000) return;
        this.lastPageWrite.set(conversationId, now);
        const c = await touchVisitor(conversationId, { currentPath: event.path });
        this.toAdmins({
          t: "presence",
          conversationId,
          online: true,
          lastSeenAt: c.visitorLastSeenAt?.toISOString() ?? null,
          currentPath: c.currentPath,
        });
        return;
      }
      default:
        return this.send(client.ws, { t: "error", code: "FORBIDDEN" });
    }
  }

  private async onAdminEvent(client: AdminClient, event: ChatClientEvent) {
    if (!("conversationId" in event) || !event.conversationId)
      return this.send(client.ws, { t: "error", code: "BAD_FRAME" });
    const conversationId = event.conversationId;
    const conversation = await getConversation(conversationId);
    if (!conversation)
      return this.send(client.ws, {
        t: "error",
        code: "NOT_FOUND",
        clientId: event.t === "send" ? event.clientId : undefined,
      });

    switch (event.t) {
      case "send": {
        const body = normalizeBody(event.body);
        if (!body) return this.send(client.ws, { t: "error", code: "EMPTY", clientId: event.clientId });
        if (body.length > CHAT_LIMITS.body)
          return this.send(client.ws, { t: "error", code: "TOO_LONG", clientId: event.clientId });
        if (!this.limiter.check(`a:${client.userId}`).ok)
          return this.send(client.ws, { t: "error", code: "RATE_LIMITED", clientId: event.clientId });

        const { message, duplicate } = await saveMessage({
          conversationId,
          senderType: "ADMIN",
          senderUserId: client.userId,
          senderName: client.name,
          body,
          clientId: event.clientId,
          delivered: this.isOnline(conversationId),
        });
        const dto = toMessageDTO(message);
        // Replying means the admin has read everything before it.
        const read = duplicate ? null : await markRead(conversationId, "VISITOR");
        const summary = await adminConversationSummary(conversationId, this.isOnline(conversationId));
        this.toAdmins({ t: "message", message: dto, conversation: summary ?? undefined });
        if (duplicate) return;
        this.toVisitors(conversationId, { t: "message", message: dto });
        this.toVisitors(conversationId, { t: "typing", conversationId, from: "ADMIN", typing: false });
        if (read?.ids.length) {
          this.toVisitors(conversationId, {
            t: "receipt",
            conversationId,
            kind: "read",
            ids: read.ids,
            at: read.at.toISOString(),
          });
        }
        return;
      }
      case "typing":
        this.toVisitors(conversationId, {
          t: "typing",
          conversationId,
          from: "ADMIN",
          typing: event.typing,
          name: client.name,
        });
        // Let other admins see a colleague is answering.
        this.toAdmins({ t: "typing", conversationId, from: "ADMIN", typing: event.typing, name: client.name }, client.ws);
        return;
      case "read": {
        const { at, ids } = await markRead(conversationId, "VISITOR");
        if (ids.length) {
          const receipt: ChatServerEvent = { t: "receipt", conversationId, kind: "read", ids, at: at.toISOString() };
          this.toVisitors(conversationId, receipt);
          this.toAdmins(receipt);
        }
        await this.pushSummary(conversationId);
        return;
      }
      case "status": {
        const updated = await setConversationStatus(conversationId, event.status);
        this.toVisitors(conversationId, { t: "conversation", conversation: toVisitorConversationDTO(updated) });
        await this.pushSummary(conversationId);
        return;
      }
      default:
        return this.send(client.ws, { t: "error", code: "FORBIDDEN" });
    }
  }
}

// ---------------------------------------------------------------------------
// Upgrade handling
// ---------------------------------------------------------------------------

function reject(socket: Duplex, status: number, message: string) {
  socket.write(`HTTP/1.1 ${status} ${message}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
  socket.destroy();
}

/** Browsers always send Origin on WebSocket handshakes; require it to be this host. */
function sameOrigin(req: IncomingMessage) {
  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === String(host).split(",")[0].trim();
  } catch {
    return false;
  }
}

/**
 * Admin identity comes from NextAuth's own /api/auth/session (forwarding the
 * browser's cookies), so the socket accepts exactly the sessions the app does
 * — whatever the secret configuration (in dev without AUTH_SECRET NextAuth
 * derives its own). The role is then re-checked against the database.
 */
async function adminFromSession(cookieHeader: string, sessionUrl: string) {
  const res = await fetch(sessionUrl, {
    headers: { cookie: cookieHeader, accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });
  if (!res.ok) return null;
  const session = (await res.json().catch(() => null)) as { user?: { id?: unknown } } | null;
  const id = typeof session?.user?.id === "string" ? session.user.id : null;
  if (!id) return null;
  const user = await db.user.findUnique({ where: { id }, select: { id: true, role: true, name: true } });
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

async function authenticate(req: IncomingMessage, url: URL, sessionUrl: string): Promise<Identity | null> {
  const cookieHeader = req.headers.cookie ?? "";
  const cookies = parseCookies(cookieHeader);

  if (url.searchParams.get("as") === "admin") {
    if (!cookieHeader) return null;
    const user = await adminFromSession(cookieHeader, sessionUrl);
    return user ? { role: "admin", userId: user.id, name: user.name || "Support" } : null;
  }

  const conversation = await findConversationByToken(cookies[CHAT_COOKIE]);
  if (!conversation) return null;
  return {
    role: "visitor",
    conversationId: conversation.id,
    name: conversation.visitorName,
    userId: conversation.userId,
  };
}

// Parked on globalThis so API routes in the same process can read presence (lib/chat/presence.ts).
const globalForChat = globalThis as unknown as { __adonChatHub?: ChatHub };

/** `sessionUrl`: this app's NextAuth session endpoint, reachable from the server itself. */
export function attachChatServer(server: Server, options: { sessionUrl: string }) {
  const hub = (globalForChat.__adonChatHub ??= new ChatHub());

  server.on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname !== CHAT_WS_PATH) return; // HMR and others: Next.js handles them.

    if (!sameOrigin(req)) return reject(socket, 403, "Forbidden");

    authenticate(req, url, options.sessionUrl)
      .then((identity) => {
        if (!identity) return reject(socket, 401, "Unauthorized");
        hub.wss.handleUpgrade(req, socket, head, (ws) => {
          void hub.attach({ ...identity, ws } as Client)?.catch((err: unknown) => {
            console.error("chat: join failed", err instanceof Error ? err.message : err);
            ws.close(1011, "join failed");
          });
        });
      })
      .catch((err: unknown) => {
        console.error("chat: auth failed", err instanceof Error ? err.message : err);
        reject(socket, 500, "Internal Server Error");
      });
  });

  return hub;
}
