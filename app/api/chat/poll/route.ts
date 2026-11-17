import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CHAT_COOKIE, CHAT_LIMITS, parseClientEvent } from "@/lib/chat/shared";
import { findConversationByToken } from "@/lib/chat/service";
import { adminFrame, adminPoll, visitorFrame, visitorPoll } from "@/lib/chat/http-transport";

/**
 * HTTP chat transport for hosts without WebSockets (Vercel). See lib/chat/http-transport.ts.
 *
 *   GET  /api/chat/poll[?as=admin][&since=<cursor>]  -> { events, cursor }
 *   POST /api/chat/poll[?as=admin]  body: client frame -> { events }
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "private, no-store" };

async function identify(request: NextRequest) {
  if (request.nextUrl.searchParams.get("as") === "admin") {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    if (!id) return null;
    // Fresh role check, as the WebSocket hub does.
    const user = await db.user.findUnique({ where: { id }, select: { id: true, role: true, name: true } });
    if (!user || user.role !== "ADMIN") return null;
    return { role: "admin" as const, admin: { userId: user.id, name: user.name || "Support" } };
  }
  const conversation = await findConversationByToken(request.cookies.get(CHAT_COOKIE)?.value);
  return conversation ? { role: "visitor" as const, conversation } : null;
}

export async function GET(request: NextRequest) {
  const who = await identify(request);
  if (!who) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401, headers: noStore });
  const since = request.nextUrl.searchParams.get("since");
  const result = who.role === "admin" ? await adminPoll(who.admin, since) : await visitorPoll(who.conversation, since);
  return NextResponse.json(result, { headers: noStore });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403, headers: noStore });
  }
  const who = await identify(request);
  if (!who) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401, headers: noStore });

  const raw = await request.text();
  if (raw.length > CHAT_LIMITS.frame) return NextResponse.json({ code: "BAD_FRAME" }, { status: 413, headers: noStore });
  const event = parseClientEvent(raw);
  if (!event) return NextResponse.json({ events: [{ t: "error", code: "BAD_FRAME" }] }, { status: 400, headers: noStore });

  const events = who.role === "admin" ? await adminFrame(who.admin, event) : await visitorFrame(who.conversation, event);
  return NextResponse.json({ events }, { headers: noStore });
}
