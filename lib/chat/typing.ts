import { db } from "@/lib/db";
import { CHAT_LIMITS, typingEvents, type ChatServerEvent } from "@/lib/chat/shared";
import { createRateLimiter } from "@/lib/security/rate-limit";

const limiter = createRateLimiter({ limit: 12, windowMs: 10_000 });

export async function writeTyping(conversationId: string, actor: string, from: "ADMIN" | "VISITOR", name: string, typing: boolean) {
  if (!limiter.check(`${actor}:${conversationId}`).ok) return;
  const expiresAt = new Date(Date.now() + (typing ? 6_000 : 0));
  await db.chatTyping.upsert({
    where: { conversationId_actor: { conversationId, actor } },
    create: { conversationId, actor, senderType: from, name: name.slice(0, CHAT_LIMITS.name), expiresAt },
    update: { name: name.slice(0, CHAT_LIMITS.name), expiresAt },
  });
}

export async function readTyping(opts: { conversationId?: string; excludeActor?: string; from?: "ADMIN" | "VISITOR" }): Promise<ChatServerEvent[]> {
  const now = Date.now();
  const rows = await db.chatTyping.findMany({
    where: {
      expiresAt: { gt: new Date(now - 10_000) },
      ...(opts.conversationId ? { conversationId: opts.conversationId } : {}),
      ...(opts.excludeActor ? { actor: { not: opts.excludeActor } } : {}),
      ...(opts.from ? { senderType: opts.from } : {}),
    },
    orderBy: { expiresAt: "desc" },
    take: 500,
  });
  return typingEvents(rows, now);
}
