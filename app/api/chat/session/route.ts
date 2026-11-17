import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { CHAT_COOKIE, CHAT_COOKIE_MAX_AGE, CHAT_FLAG_COOKIE, CHAT_LIMITS } from "@/lib/chat/shared";
import {
  createConversation,
  findConversationByToken,
  getMessages,
  reclaimConversationForUser,
  toVisitorConversationDTO,
} from "@/lib/chat/service";
import { getClientIp } from "@/lib/security/client-ip";
import { createRateLimiter } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startLimiter = createRateLimiter({ limit: 5, windowMs: 60 * 60_000 });
const noStore = { "Cache-Control": "private, no-store" };

const startSchema = z.object({
  name: z.string().trim().min(1).max(CHAT_LIMITS.name),
  email: z.union([z.literal(""), z.email().max(CHAT_LIMITS.email)]).optional(),
  phone: z
    .string()
    .trim()
    .max(CHAT_LIMITS.phone)
    .regex(/^[+\d\s()-]*$/)
    .optional(),
  locale: z.string().max(8).optional(),
  path: z.string().max(CHAT_LIMITS.path).startsWith("/").optional(),
});

function setChatCookie(res: NextResponse, token: string) {
  res.cookies.set(CHAT_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CHAT_COOKIE_MAX_AGE,
  });
  res.cookies.set(CHAT_FLAG_COOKIE, "1", {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CHAT_COOKIE_MAX_AGE,
  });
  return res;
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

/** The visitor's conversation (by cookie) and its recent history. */
export async function GET(request: NextRequest) {
  let conversation = await findConversationByToken(request.cookies.get(CHAT_COOKIE)?.value);
  let newToken: string | null = null;

  if (!conversation) {
    // Signed-in user on a new device / cleared cookies: give them their thread back.
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
      const reclaimed = await reclaimConversationForUser(session.user.id);
      if (reclaimed) {
        conversation = reclaimed.conversation;
        newToken = reclaimed.token;
      }
    }
    if (!conversation) {
      const res = NextResponse.json(
        {
          conversation: null,
          prefill: { name: session?.user?.name ?? "", email: session?.user?.email ?? "" },
        },
        { headers: noStore },
      );
      if (request.cookies.has(CHAT_FLAG_COOKIE)) res.cookies.delete(CHAT_FLAG_COOKIE);
      return res;
    }
  }

  const before = request.nextUrl.searchParams.get("before");
  const beforeDate = before && !Number.isNaN(Date.parse(before)) ? new Date(before) : null;
  const { messages, hasMore } = await getMessages(conversation.id, beforeDate);
  const res = NextResponse.json(
    { conversation: toVisitorConversationDTO(conversation), messages, hasMore },
    { headers: noStore },
  );
  return newToken ? setChatCookie(res, newToken) : res;
}

/** Start a conversation: stores the visitor's details and sets the chat cookie. */
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });

  const existing = await findConversationByToken(request.cookies.get(CHAT_COOKIE)?.value);
  if (existing) {
    return NextResponse.json({ conversation: toVisitorConversationDTO(existing) }, { headers: noStore });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400 });
  }
  const parsed = startSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { code: "INVALID_REQUEST", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const ip = getClientIp(request.headers);
  if (ip && !startLimiter.check(ip).ok) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": "3600" } });
  }

  const session = await getServerSession(authOptions);
  const { conversation, token } = await createConversation({
    name: parsed.data.name,
    email: parsed.data.email || session?.user?.email || null,
    phone: parsed.data.phone || null,
    locale: parsed.data.locale,
    path: parsed.data.path,
    userId: session?.user?.id ?? null,
    userAgent: request.headers.get("user-agent"),
    ip,
  });

  const res = NextResponse.json(
    { conversation: toVisitorConversationDTO(conversation), messages: [], hasMore: false },
    { status: 201, headers: noStore },
  );
  return setChatCookie(res, token);
}
