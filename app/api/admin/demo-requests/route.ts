import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  demoAdminCreateSchema,
  demoAdminDeleteSchema,
  demoAdminQuerySchema,
  demoAdminUpdateSchema,
} from "@/lib/demo-requests/validation";
import {
  createDemoRequest,
  deleteDemoRequest,
  getDemoRequests,
  updateDemoRequest,
} from "@/lib/demo-requests/service";
import { demoError, readDemoJson, sameOrigin } from "@/lib/demo-requests/http";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

const unauthorized = () =>
  NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
const forbiddenOrigin = () =>
  NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });
const invalid = (error: { flatten: () => unknown }) =>
  NextResponse.json(
    { code: "INVALID_REQUEST", fields: error.flatten() },
    { status: 400 },
  );

/** List / search / filter. */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  const query = demoAdminQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams),
  );
  if (!query.success)
    return NextResponse.json({ code: "INVALID_QUERY" }, { status: 400 });
  try {
    return NextResponse.json(await getDemoRequests(query.data), {
      headers: NO_STORE,
    });
  } catch (error) {
    return demoError(error);
  }
}

/** Create a request manually. */
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  if (!sameOrigin(request)) return forbiddenOrigin();
  try {
    const result = demoAdminCreateSchema.safeParse(await readDemoJson(request));
    if (!result.success) return invalid(result.error);
    const created = await createDemoRequest(result.data);
    return NextResponse.json(
      { saved: true, request: created },
      { status: 201, headers: NO_STORE },
    );
  } catch (error) {
    return demoError(error);
  }
}

/** Update status / notes / contact details (optimistic locking via `version`). */
export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  if (!sameOrigin(request)) return forbiddenOrigin();
  try {
    const result = demoAdminUpdateSchema.safeParse(await readDemoJson(request));
    if (!result.success) return invalid(result.error);
    const saved = await updateDemoRequest(result.data);
    return NextResponse.json(
      { saved: true, request: saved },
      { headers: NO_STORE },
    );
  } catch (error) {
    return demoError(error);
  }
}

/** Permanently delete a request. */
export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  if (!sameOrigin(request)) return forbiddenOrigin();
  try {
    const result = demoAdminDeleteSchema.safeParse(await readDemoJson(request));
    if (!result.success) return invalid(result.error);
    await deleteDemoRequest(result.data.id);
    return NextResponse.json({ deleted: true }, { headers: NO_STORE });
  } catch (error) {
    return demoError(error);
  }
}
