import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getClientIp } from "@/lib/security/client-ip";
import { createRateLimiter } from "@/lib/security/rate-limit";

const signupLimiter = createRateLimiter({ limit: 5, windowMs: 60 * 60_000 });
// Fallback when no proxy IP header is present (all clients share this bucket).
const signupUnknownIpLimiter = createRateLimiter({ limit: 30, windowMs: 60 * 60_000 });
const EMAIL_RE = /^[^s@]+@[^s@]+.[^s@]+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = ip ? signupLimiter.check(ip) : signupUnknownIpLimiter.check("unknown");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many sign-up attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  try {
    const body = await request.json();
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body?.password ?? "");
    const name =
      typeof body?.name === "string" && body.name.trim().length > 0
        ? body.name.trim().slice(0, 100)
        : null;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    if (email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // bcrypt silently ignores bytes past 72; refuse rather than mislead the user.
    if (new TextEncoder().encode(password).length > 72) {
      return NextResponse.json(
        { error: "Password must be at most 72 characters" },
        { status: 400 },
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account already exists with this email" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
      await db.user.create({
        data: {
          email,
          name,
          passwordHash,
        },
      });
    } catch (error) {
      // Two concurrent sign-ups for the same email: the unique index wins.
      if ((error as { code?: string })?.code === "P2002") {
        return NextResponse.json(
          { error: "An account already exists with this email" },
          { status: 409 },
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Unable to create account right now" },
      { status: 500 },
    );
  }
}
