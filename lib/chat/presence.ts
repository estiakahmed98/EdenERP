/**
 * Read live presence from the WebSocket hub (lib/chat/ws-server.ts) without
 * importing it: the hub is created by server.ts and parked on globalThis, and
 * API routes run in the same Node process. Without the custom server (plain
 * `next dev`) nobody is ever online.
 */
import type { ChatMessageDTO } from "@/lib/chat/shared";

type HubLike = { isOnline(conversationId: string): boolean; publishReaction(message: ChatMessageDTO): void; revokeUserSessions?(userId: string): void };

export function disconnectUserChat(userId: string) {
  const hub = (globalThis as unknown as { __adonChatHub?: HubLike }).__adonChatHub;
  hub?.revokeUserSessions?.(userId);
}

export function isVisitorOnline(conversationId: string) {
  const hub = (globalThis as unknown as { __adonChatHub?: HubLike }).__adonChatHub;
  return hub ? hub.isOnline(conversationId) : false;
}

export function broadcastReaction(message: ChatMessageDTO) {
  const hub = (globalThis as unknown as { __adonChatHub?: HubLike }).__adonChatHub;
  hub?.publishReaction?.(message);
}
