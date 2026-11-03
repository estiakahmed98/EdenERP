import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  demoAdminQuerySchema,
  demoAdminUpdateSchema,
} from "@/lib/demo-requests/validation";
import {
  getDemoRequests,
  updateDemoRequest,
} from "@/lib/demo-requests/service";
import { demoError, readDemoJson, sameOrigin } from "@/lib/demo-requests/http";

export const runtime = "nodejs";
async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}
export async function GET(request: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  const query = demoAdminQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams),
  );
  if (!query.success)
    return NextResponse.json({ code: "INVALID_QUERY" }, { status: 400 });
  try {
    return NextResponse.json(await getDemoRequests(query.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return demoError(error);
  }
}
export async function PATCH(request: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  if (!sameOrigin(request))
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  try {
    const result = demoAdminUpdateSchema.safeParse(await readDemoJson(request));
    if (!result.success)
      return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400 });
    const saved = await updateDemoRequest(result.data);
    return NextResponse.json(
      { saved: true, request: saved },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return demoError(error);
  }
}
