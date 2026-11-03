import { NextRequest, NextResponse } from "next/server";
import { DemoRequestError } from "./service";

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}
export async function readDemoJson(request: NextRequest) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    throw new DemoRequestError("INVALID_CONTENT_TYPE", 415);
  if (Number(request.headers.get("content-length") ?? 0) > 16384)
    throw new DemoRequestError("REQUEST_TOO_LARGE", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new DemoRequestError("INVALID_REQUEST", 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16384) {
      await reader.cancel();
      throw new DemoRequestError("REQUEST_TOO_LARGE", 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new DemoRequestError("INVALID_REQUEST", 400);
  }
}
export function demoError(error: unknown) {
  if (error instanceof DemoRequestError)
    return NextResponse.json(
      { code: error.code },
      {
        status: error.status,
        headers: {
          "Cache-Control": "no-store",
          ...(error.status === 429 ? { "Retry-After": "3600" } : {}),
        },
      },
    );
  // Never expose connection strings, SQL or personal data in a public response/log.
  console.error(
    "Demo request operation failed",
    error instanceof Error ? error.name : "UnknownError",
  );
  return NextResponse.json(
    { code: "SERVICE_UNAVAILABLE" },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
