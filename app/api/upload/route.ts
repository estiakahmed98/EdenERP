import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

import { isAdminRequest } from "@/lib/auth-admin";
import { detectImageKind, MAX_UPLOAD_BYTES } from "@/lib/security/image-upload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uploadsRoot = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  // Admin-only: this writes into /public, which is served from our origin.
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Reject oversized bodies before buffering them (form overhead allowance: 64 KB).
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_UPLOAD_BYTES + 64 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 });
    }

    const buf = new Uint8Array(await file.arrayBuffer());
    // Trust the bytes, not the client-supplied MIME type or filename.
    const kind = detectImageKind(buf);
    if (!kind) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }

    const name = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${kind.ext}`;
    await fs.mkdir(uploadsRoot, { recursive: true });
    await fs.writeFile(path.join(uploadsRoot, name), buf);

    return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
  } catch (e) {
    console.error("[upload] error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
