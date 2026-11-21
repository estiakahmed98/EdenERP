import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createRateLimiter } from "@/lib/security/rate-limit";
import { UserManagementError } from "./service";

const writes = createRateLimiter({ limit: 30, windowMs: 60_000 });
export const privateHeaders = { "Cache-Control": "private, no-store" };

export async function authorizeUserManagement(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { response: NextResponse.json({ error: "unauthorized" }, { status: 401, headers: privateHeaders }) };
  if (session.user.role !== "ADMIN") return { response: NextResponse.json({ error: "forbidden" }, { status: 403, headers: privateHeaders }) };
  if (request.method !== "GET") {
    // Cookie authentication needs an explicit CSRF check for custom mutation routes.
    const origin = request.headers.get("origin");
    const expectedOrigin = new URL(process.env.NEXTAUTH_URL || request.url).origin;
    if (!origin || origin !== expectedOrigin || !request.headers.get("content-type")?.startsWith("application/json")) {
      return { response: NextResponse.json({ error: "forbidden" }, { status: 403, headers: privateHeaders }) };
    }
    const limit = writes.check(session.user.id);
    if (!limit.ok) return { response: NextResponse.json({ error: "rateLimit" }, { status: 429, headers: { ...privateHeaders, "Retry-After": String(limit.retryAfterSeconds) } }) };
  }
  return { actorId: session.user.id };
}

export function userManagementFailure(error: unknown) {
  if (error instanceof UserManagementError) return NextResponse.json({ error: error.code }, { status: error.status, headers: privateHeaders });
  if (error instanceof SyntaxError) return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
  const code = (error as { code?: string })?.code;
  if (code === "P2002") return NextResponse.json({ error: "duplicateEmail" }, { status: 409, headers: privateHeaders });
  if (code === "P2025") return NextResponse.json({ error: "notFound" }, { status: 404, headers: privateHeaders });
  console.error("User management operation failed", error);
  return NextResponse.json({ error: "server" }, { status: 500, headers: privateHeaders });
}
