import { NextRequest, NextResponse } from "next/server";
import { demoSubmissionSchema } from "@/lib/demo-requests/validation";
import { saveDemoRequest } from "@/lib/demo-requests/service";
import { demoError, readDemoJson, sameOrigin } from "@/lib/demo-requests/http";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  try {
    const result = demoSubmissionSchema.safeParse(await readDemoJson(request));
    if (!result.success)
      return NextResponse.json(
        { code: "INVALID_REQUEST", fields: result.error.flatten() },
        { status: 400 },
      );
    const ip =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim()
        .slice(0, 100) ||
      request.headers.get("x-real-ip")?.slice(0, 100) ||
      "unknown";
    const saved = await saveDemoRequest(result.data, ip);
    return NextResponse.json(
      { saved: true, requestId: saved.id },
      {
        status: saved.created ? 201 : 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    return demoError(error);
  }
}
