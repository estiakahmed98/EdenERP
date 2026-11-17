import { NextRequest, NextResponse } from "next/server";

import { CHAT_LIMITS, parseClientEvent } from "@/lib/chat/shared";
import { identifyChatRequest } from "@/lib/chat/request-auth";
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
export async function GET(request: NextRequest) {
  const who = await identifyChatRequest(request);
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
  const who = await identifyChatRequest(request);
  if (!who) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401, headers: noStore });

  const raw = await request.text();
  if (raw.length > CHAT_LIMITS.frame) return NextResponse.json({ code: "BAD_FRAME" }, { status: 413, headers: noStore });
  const event = parseClientEvent(raw);
  if (!event) return NextResponse.json({ events: [{ t: "error", code: "BAD_FRAME" }] }, { status: 400, headers: noStore });

  try {
    const events = who.role === "admin" ? await adminFrame(who.admin, event) : await visitorFrame(who.conversation, event);
    return NextResponse.json({ events }, { headers: noStore });
  } catch {
    return NextResponse.json({ events: [{ t: "error", code: "SERVER_ERROR", clientId: event.t === "send" ? event.clientId : undefined }] }, { status: 400, headers: noStore });
  }
}
