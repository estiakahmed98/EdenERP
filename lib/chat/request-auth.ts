import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CHAT_COOKIE } from "@/lib/chat/shared";
import { findConversationByToken } from "@/lib/chat/service";

export async function chatAdmin() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) return null;
  const user = await db.user.findUnique({ where: { id }, select: { id: true, role: true, name: true } });
  return user?.role === "ADMIN" ? { userId: user.id, name: user.name || "Support" } : null;
}

export async function identifyChatRequest(request: NextRequest) {
  if (request.nextUrl.searchParams.get("as") === "admin") {
    const admin = await chatAdmin();
    return admin ? { role: "admin" as const, admin } : null;
  }
  const conversation = await findConversationByToken(request.cookies.get(CHAT_COOKIE)?.value);
  return conversation ? { role: "visitor" as const, conversation } : null;
}
