import { createHash } from "node:crypto";
import { db } from "@/lib/db";
import { isChatReaction } from "@/lib/chat/shared";
import { toMessageDTO } from "@/lib/chat/service";

export function reactionActor(role: "ADMIN" | "VISITOR", id: string) {
  return createHash("sha256").update(`chat-reaction:${role}:${id}`).digest("hex").slice(0, 32);
}

export async function reactToMessage(conversationId: string, messageId: string, actor: string, emoji: string) {
  if (!isChatReaction(emoji)) return null;
  return db.$transaction(async (tx) => {
    // Serialize toggles on a message, including requests from multiple tabs.
    const rows = await tx.$queryRaw<{ id: string; sender_type: string }[]>`
      SELECT id, sender_type FROM chat_messages
      WHERE id = ${messageId}::uuid AND conversation_id = ${conversationId}::uuid
      FOR UPDATE
    `;
    if (!rows.length || rows[0].sender_type === "SYSTEM") return null;
    const where = { messageId_actor: { messageId, actor } };
    const previous = await tx.chatReaction.findUnique({ where });
    if (previous?.emoji === emoji) await tx.chatReaction.delete({ where });
    else await tx.chatReaction.upsert({ where, create: { messageId, actor, emoji }, update: { emoji } });
    // Use a monotonic database timestamp, even when different servers' clocks differ.
    await tx.$executeRaw`
      UPDATE chat_messages SET reactions_updated_at = GREATEST(
        clock_timestamp(), COALESCE(reactions_updated_at, '-infinity'::timestamptz) + interval '1 millisecond'
      ) WHERE id = ${messageId}::uuid
    `;
    const message = await tx.chatMessage.findUniqueOrThrow({ where: { id: messageId }, include: { reactions: true } });
    return toMessageDTO(message);
  });
}
