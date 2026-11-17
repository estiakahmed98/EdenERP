import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { chatAdmin } from "@/lib/chat/request-auth";
import { findConversationByToken } from "@/lib/chat/service";
import { CHAT_COOKIE, UUID_RE } from "@/lib/chat/shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  if (!UUID_RE.test(id)) return new Response(null, { status: 404, headers });
  const visitor = await findConversationByToken(request.cookies.get(CHAT_COOKIE)?.value);
  const metadata = await db.chatImage.findUnique({ where: { id }, select: { conversationId: true } });
  if (!metadata || (visitor?.id !== metadata.conversationId && !(await chatAdmin()))) {
    return new Response(null, { status: 404, headers });
  }
  const image = await db.chatImage.findUnique({ where: { id }, select: { data: true, mime: true } });
  if (!image) return new Response(null, { status: 404, headers });
  return new Response(new Uint8Array(image.data), { headers: {
    ...headers, "Content-Type": image.mime, "Content-Disposition": "inline",
    "Content-Security-Policy": "default-src 'none'; sandbox",
  } });
}
