/**
 * Regression tests for the 2026-11 production audit security fixes.
 * Run: npm test   (node --test, native TypeScript type stripping)
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeRichHtml } from "../lib/security/sanitize-html.ts";
import { createRateLimiter } from "../lib/security/rate-limit.ts";
import { getClientIp } from "../lib/security/client-ip.ts";
import { detectImageKind } from "../lib/security/image-upload.ts";

const headers = (h: Record<string, string>) => ({
  get: (name: string) => h[name.toLowerCase()] ?? null,
});

/* ---------------------------- sanitizer ---------------------------- */

test("sanitizer: payloads that bypassed the old regex stripper are neutralised", () => {
  const payloads = [
    `<svg/onload=alert(1)>`,
    `<img src=x onerror=alert(1)>`,
    `<a href=javascript:alert(1)>x</a>`,
    `<a href="java&#115;cript:alert(1)">x</a>`,
    `<a href="  JaVaScRiPt:alert(1)">x</a>`,
    `<iframe src="https://evil.example"></iframe>`,
    `<script>alert(1)</script>`,
    `<scr<script>ipt>alert(1)</script>`,
    `<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>`,
    `<form action="https://evil.example"><input name=p></form>`,
    `<div style="background:url(javascript:alert(1))">x</div>`,
    `<img src="data:image/svg+xml;base64,PHN2Zy8+">`,
  ];
  for (const p of payloads) {
    const out = sanitizeRichHtml(p).toLowerCase();
    assert.ok(!out.includes("javascript:"), `javascript: survived: ${p} -> ${out}`);
    assert.ok(!/\son\w+\s*=/.test(out), `event handler survived: ${p} -> ${out}`);
    assert.ok(!/<(script|svg|iframe|form|input|style|math)\b/.test(out), `tag survived: ${p} -> ${out}`);
    assert.ok(!out.includes("data:"), `data: URL survived: ${p} -> ${out}`);
  }
});

test("sanitizer: normal editor formatting is preserved", () => {
  const html =
    `<h2>Title</h2><p style="text-align: center;">Hi <strong>bold</strong> <em>it</em></p>` +
    `<ul><li>one</li></ul><a href="https://adonerp.com/x">link</a>` +
    `<img src="/uploads/a.png" alt="a"><table><tbody><tr><td colspan="2">c</td></tr></tbody></table>`;
  const out = sanitizeRichHtml(html);
  for (const fragment of [
    "<h2>Title</h2>",
    `style="text-align:center"`,
    "<strong>bold</strong>",
    "<li>one</li>",
    `href="https://adonerp.com/x"`,
    `src="/uploads/a.png"`,
    `colspan="2"`,
  ]) {
    assert.ok(out.includes(fragment), `missing ${fragment} in ${out}`);
  }
});

test("sanitizer: target=_blank links get rel=noopener", () => {
  const out = sanitizeRichHtml(`<a href="https://x.example" target="_blank">x</a>`);
  assert.match(out, /rel="noopener noreferrer"/);
});

test("sanitizer: non-strings become empty", () => {
  assert.equal(sanitizeRichHtml(undefined), "");
  assert.equal(sanitizeRichHtml({ toString: () => "<script>" }), "");
});

/* --------------------------- rate limiter -------------------------- */

test("rate limiter: allows up to limit, blocks after, resets after window", () => {
  let now = 1_000;
  const rl = createRateLimiter({ limit: 3, windowMs: 1_000, now: () => now });
  assert.equal(rl.check("a").ok, true);
  assert.equal(rl.check("a").ok, true);
  assert.equal(rl.check("a").ok, true);
  const blocked = rl.check("a");
  assert.equal(blocked.ok, false);
  assert.ok(blocked.retryAfterSeconds >= 1);
  assert.equal(rl.check("b").ok, true, "keys are independent");
  now += 1_001;
  assert.equal(rl.check("a").ok, true, "window resets");
});

test("rate limiter: reset() clears a key (successful login)", () => {
  const rl = createRateLimiter({ limit: 1, windowMs: 60_000 });
  rl.check("k");
  assert.equal(rl.check("k").ok, false);
  rl.reset("k");
  assert.equal(rl.check("k").ok, true);
});

/* ----------------------------- client ip --------------------------- */

test("client ip: accepts valid IPs, rejects junk header values", () => {
  assert.equal(getClientIp(headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" })), "203.0.113.7");
  assert.equal(getClientIp(headers({ "x-real-ip": "2001:db8::1" })), "2001:db8::1");
  assert.equal(getClientIp(headers({ "x-forwarded-for": "../../etc/passwd" })), null);
  assert.equal(getClientIp(headers({ "x-forwarded-for": "evil", "x-real-ip": "198.51.100.2" })), "198.51.100.2");
  assert.equal(getClientIp(headers({})), null);
});

/* ---------------------------- image upload ------------------------- */

const bytes = (...parts: (number[] | string)[]) =>
  new Uint8Array(parts.flatMap((p) => (typeof p === "string" ? [...p].map((c) => c.charCodeAt(0)) : p)));

test("upload: detects real image signatures", () => {
  assert.deepEqual(detectImageKind(bytes([0xff, 0xd8, 0xff, 0xe0])), { mime: "image/jpeg", ext: "jpg" });
  assert.deepEqual(detectImageKind(bytes([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), { mime: "image/png", ext: "png" });
  assert.deepEqual(detectImageKind(bytes("GIF89a")), { mime: "image/gif", ext: "gif" });
  assert.deepEqual(detectImageKind(bytes("RIFF", [0, 0, 0, 0], "WEBP")), { mime: "image/webp", ext: "webp" });
  assert.deepEqual(detectImageKind(bytes([0, 0, 0, 0x1c], "ftypavif")), { mime: "image/avif", ext: "avif" });
});

test("upload: HTML/SVG disguised as images is rejected", () => {
  assert.equal(detectImageKind(bytes("<html><script>alert(1)</script>")), null);
  assert.equal(detectImageKind(bytes(`<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)">`)), null);
  assert.equal(detectImageKind(bytes("")), null);
});
