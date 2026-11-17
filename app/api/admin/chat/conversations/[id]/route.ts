import { NextRequest, NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/auth-admin";
import { adminConversationSummary, getMessages } from "@/lib/chat/service";
import { isVisitorOnline } from "@/lib/chat/presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One conversation with a page of its history (`?before=<ISO date>` for older). */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 });

  const { id } = await params;
  if (!UUID.test(id)) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 });

  const conversation = await adminConversationSummary(id, isVisitorOnline(id));
  if (!conversation) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 });

  const before = request.nextUrl.searchParams.get("before");
  const beforeDate = before && !Number.isNaN(Date.parse(before)) ? new Date(before) : null;
  const { messages, hasMore } = await getMessages(id, beforeDate);

  return NextResponse.json(
    { conversation, messages, hasMore },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
