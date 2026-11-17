/**
 * Live chat: types, limits and the WebSocket protocol shared by the browser
 * and the server. Keep this file free of Node / Prisma imports — client
 * components import it.
 *
 * Transport: one WebSocket per browser tab at CHAT_WS_PATH (attached to the
 * HTTP server in server.ts). Visitors authenticate with the httpOnly
 * CHAT_COOKIE set by POST /api/chat/session; admins connect with `?as=admin`
 * and authenticate with their NextAuth session cookie.
 */

export const CHAT_WS_PATH = "/api/chat/ws";
export const CHAT_COOKIE = "adon_chat";
/** Readable (non-secret) marker so the widget knows a thread exists without an API call. */
export const CHAT_FLAG_COOKIE = "adon_chat_on";
export const CHAT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export const CHAT_LIMITS = {
  body: 2000,
  name: 120,
  email: 254,
  phone: 40,
  path: 512,
  clientId: 64,
  /** Max inbound frame size in bytes. */
  frame: 16 * 1024,
  /** Messages per window per socket. */
  messagesPerWindow: 12,
  windowMs: 10_000,
  historyPage: 50,
} as const;

export type ChatSender = "VISITOR" | "ADMIN" | "SYSTEM";
export type ChatStatus = "OPEN" | "CLOSED";

export type ChatMessageDTO = {
  id: string;
  conversationId: string;
  senderType: ChatSender;
  senderName: string | null;
  body: string;
  clientId: string;
  createdAt: string;
  deliveredAt: string | null;
  readAt: string | null;
};

/** What the visitor's own widget sees. */
export type VisitorConversationDTO = {
  id: string;
  visitorName: string;
  status: ChatStatus;
  createdAt: string;
};

/** What admins see in the inbox. */
export type AdminConversationDTO = {
  id: string;
  visitorName: string;
  visitorEmail: string | null;
  visitorPhone: string | null;
  userId: string | null;
  locale: string;
  status: ChatStatus;
  startPath: string | null;
  currentPath: string | null;
  userAgent: string | null;
  online: boolean;
  visitorLastSeenAt: string | null;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  unreadCount: number;
  createdAt: string;
};

// ---------------------------------------------------------------------------
// Client -> server frames
// ---------------------------------------------------------------------------

export type ChatClientEvent =
  | { t: "send"; clientId: string; body: string; conversationId?: string }
  | { t: "typing"; typing: boolean; conversationId?: string }
  | { t: "read"; conversationId?: string }
  | { t: "page"; path: string }
  | { t: "status"; conversationId: string; status: ChatStatus }
  | { t: "ping" };

// ---------------------------------------------------------------------------
// Server -> client frames
// ---------------------------------------------------------------------------

export type ChatServerEvent =
  | {
      t: "hello";
      role: "visitor";
      conversation: VisitorConversationDTO;
      agentsOnline: boolean;
    }
  | { t: "hello"; role: "admin"; userId: string; online: string[] }
  | { t: "message"; message: ChatMessageDTO; conversation?: AdminConversationDTO }
  | {
      t: "receipt";
      conversationId: string;
      kind: "delivered" | "read";
      ids: string[];
      at: string;
    }
  | { t: "typing"; conversationId: string; from: "VISITOR" | "ADMIN"; typing: boolean; name?: string }
  | {
      t: "presence";
      conversationId: string;
      online: boolean;
      lastSeenAt: string | null;
      currentPath: string | null;
    }
  | { t: "agents"; online: boolean }
  | { t: "conversation"; conversation: AdminConversationDTO | VisitorConversationDTO }
  | { t: "error"; code: ChatErrorCode; clientId?: string }
  | { t: "pong" };

export type ChatErrorCode =
  | "BAD_FRAME"
  | "RATE_LIMITED"
  | "EMPTY"
  | "TOO_LONG"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "SERVER_ERROR";

const isStr = (v: unknown): v is string => typeof v === "string";
export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const optId = (v: unknown) => v === undefined || (isStr(v) && UUID_RE.test(v));

/** Normalise message text: trim, unify newlines, collapse >2 blank lines, strip control chars. */
export function normalizeBody(raw: string) {
  return raw
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Strictly validate an inbound frame. Returns null for anything malformed. */
export function parseClientEvent(raw: string): ChatClientEvent | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const e = data as Record<string, unknown>;

  switch (e.t) {
    case "send":
      if (!isStr(e.clientId) || !/^[A-Za-z0-9_-]{8,64}$/.test(e.clientId)) return null;
      if (!isStr(e.body) || !optId(e.conversationId)) return null;
      return {
        t: "send",
        clientId: e.clientId,
        body: e.body,
        conversationId: e.conversationId as string | undefined,
      };
    case "typing":
      if (typeof e.typing !== "boolean" || !optId(e.conversationId)) return null;
      return { t: "typing", typing: e.typing, conversationId: e.conversationId as string | undefined };
    case "read":
      if (!optId(e.conversationId)) return null;
      return { t: "read", conversationId: e.conversationId as string | undefined };
    case "page":
      if (!isStr(e.path) || !e.path.startsWith("/")) return null;
      return { t: "page", path: e.path.slice(0, CHAT_LIMITS.path) };
    case "status":
      if (!isStr(e.conversationId) || !optId(e.conversationId)) return null;
      if (e.status !== "OPEN" && e.status !== "CLOSED") return null;
      return { t: "status", conversationId: e.conversationId, status: e.status };
    case "ping":
      return { t: "ping" };
    default:
      return null;
  }
}

export function newClientId() {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
