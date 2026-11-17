/**
 * Live chat: WebSocket frame validation and message normalisation.
 * Run: npm test   (node --test, native TypeScript type stripping)
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { CHAT_LIMITS, normalizeBody, parseClientEvent } from "../lib/chat/shared.ts";

const UUID = "3f0c8a52-6b1e-4c1d-9a6b-2f7d1e0c9b11";

test("parseClientEvent accepts well-formed frames", () => {
  assert.deepEqual(parseClientEvent(JSON.stringify({ t: "send", clientId: "abcdef1234", body: "hi" })), {
    t: "send",
    clientId: "abcdef1234",
    body: "hi",
    conversationId: undefined,
  });
  assert.deepEqual(parseClientEvent(JSON.stringify({ t: "typing", typing: true, conversationId: UUID })), {
    t: "typing",
    typing: true,
    conversationId: UUID,
  });
  assert.deepEqual(parseClientEvent(JSON.stringify({ t: "status", conversationId: UUID, status: "CLOSED" })), {
    t: "status",
    conversationId: UUID,
    status: "CLOSED",
  });
  assert.deepEqual(parseClientEvent('{"t":"ping"}'), { t: "ping" });
});

test("parseClientEvent rejects malformed or hostile frames", () => {
  for (const raw of [
    "not json",
    "null",
    "[]",
    '{"t":"nope"}',
    JSON.stringify({ t: "send", clientId: "short", body: "x" }),
    JSON.stringify({ t: "send", clientId: "abc def 1234", body: "x" }),
    JSON.stringify({ t: "send", clientId: "abcdef1234", body: 5 }),
    JSON.stringify({ t: "send", clientId: "abcdef1234", body: "x", conversationId: "1 OR 1=1" }),
    JSON.stringify({ t: "typing", typing: "yes" }),
    JSON.stringify({ t: "page", path: "https://evil.example" }),
    JSON.stringify({ t: "status", conversationId: UUID, status: "DELETED" }),
    JSON.stringify({ t: "status", status: "OPEN" }),
  ]) {
    assert.equal(parseClientEvent(raw), null, raw);
  }
});

test("page paths are capped", () => {
  const e = parseClientEvent(JSON.stringify({ t: "page", path: "/" + "a".repeat(2000) }));
  assert.equal(e?.t, "page");
  assert.equal(e && e.t === "page" ? e.path.length : 0, CHAT_LIMITS.path);
});

test("normalizeBody trims, unifies newlines and strips control characters", () => {
  assert.equal(normalizeBody("  hello\r\nworld  "), "hello\nworld");
  assert.equal(normalizeBody("a\n\n\n\n\nb"), "a\n\nb");
  assert.equal(normalizeBody("x\u0000y\u0007z"), "xyz");
  assert.equal(normalizeBody(" \n\t "), "");
  assert.equal(normalizeBody("বাংলা মেসেজ ✓"), "বাংলা মেসেজ ✓");
});
