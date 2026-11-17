import { NextRequest, NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/auth-admin";
import { listConversations } from "@/lib/chat/service";
import { isVisitorOnline } from "@/lib/chat/presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin inbox: conversations, newest activity first, with unread counts and presence. */
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 });

  const statusParam = request.nextUrl.searchParams.get("status");
  const status = statusParam === "OPEN" || statusParam === "CLOSED" ? statusParam : "ALL";
  const q = request.nextUrl.searchParams.get("q") ?? undefined;

  const conversations = await listConversations({ status, q, isOnline: isVisitorOnline });
  return NextResponse.json({ conversations }, { headers: { "Cache-Control": "private, no-store" } });
}
