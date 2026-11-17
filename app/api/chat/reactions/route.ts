import { NextRequest, NextResponse } from "next/server";
import { identifyChatRequest } from "@/lib/chat/request-auth";
import { reactionActor, reactToMessage } from "@/lib/chat/reactions";
import { broadcastReaction } from "@/lib/chat/presence";
import { isChatReaction, UUID_RE } from "@/lib/chat/shared";
import { createRateLimiter } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const limiter = createRateLimiter({ limit: 20, windowMs: 10_000 });
const headers = { "Cache-Control": "private, no-store" };
const error = (code: string, status: number) => NextResponse.json({ code }, { status, headers });

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return error("FORBIDDEN", 403);
  const who = await identifyChatRequest(request);
  if (!who) return error("UNAUTHORIZED", 401);
  const actor = who.role === "admin" ? reactionActor("ADMIN", who.admin.userId) : reactionActor("VISITOR", who.conversation.id);
  if (!limiter.check(actor).ok) return error("RATE_LIMITED", 429);
  if (Number(request.headers.get("content-length")) > 2048) return error("BAD_FRAME", 413);
  try {
    const raw = await request.text();
    if (raw.length > 2048) return error("BAD_FRAME", 413);
    const input = JSON.parse(raw);
    if (!input || typeof input !== "object" || !isChatReaction(input.emoji) || typeof input.messageId !== "string" || !UUID_RE.test(input.messageId)) return error("BAD_FRAME", 400);
    const conversationId = who.role === "visitor" ? who.conversation.id : input.conversationId;
    if (typeof conversationId !== "string" || !UUID_RE.test(conversationId)) return error("BAD_FRAME", 400);
    const message = await reactToMessage(conversationId, input.messageId, actor, input.emoji);
    if (!message) return error("NOT_FOUND", 404);
    broadcastReaction(message);
    return NextResponse.json({ message }, { headers });
  } catch {
    return error("SERVER_ERROR", 500);
  }
}
