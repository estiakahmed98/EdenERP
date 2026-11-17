/**
 * Live chat: WebSocket frame validation and message normalisation.
 * Run: npm test   (node --test, native TypeScript type stripping)
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { CHAT_LIMITS, normalizeBody, isChatReaction, applyReaction, parseClientEvent, typingEvents, validateMessageContent } from "../lib/chat/shared.ts";

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

test("attachment sends are rejected, while emoji messages remain plain text", () => {
  for (const imageId of [UUID, null, "https://example.com/image.png", {}]) {
    assert.equal(parseClientEvent(JSON.stringify({ t: "send", clientId: "image-message-1", body: "hello", imageId })), null);
  }
  assert.deepEqual(validateMessageContent(" \n "), { error: "EMPTY" });
  assert.deepEqual(validateMessageContent("x".repeat(CHAT_LIMITS.body + 1)), { error: "TOO_LONG" });
  const emoji = "\u{1F916}\u{1F44D}\u{1F3FD}\u{2764}\u{FE0F}";
  assert.deepEqual(validateMessageContent(emoji), { body: emoji });
});

test("reactions accept only the supported emoji, without arbitrary markup or payloads", () => {
  for (const emoji of ["\u{1F44D}", "\u{2764}\u{FE0F}", "\u{1F602}", "\u{1F62E}", "\u{1F622}", "\u{1F64F}"]) assert.equal(isChatReaction(emoji), true);
  for (const emoji of [null, {}, [], "", "<script>", "\u{1F44D}\u{1F44D}", "hello"]) assert.equal(isChatReaction(emoji), false);
});

test("reaction updates preserve message receipts and cannot append, cross conversations or roll back newer data", () => {
  const message = { id: UUID, conversationId: UUID, senderType: "VISITOR" as const, senderName: "Visitor", body: "hello", clientId: "client-123", createdAt: "2026-11-17T00:00:00Z", deliveredAt: "2026-11-17T00:00:01Z", readAt: "2026-11-17T00:00:02Z", reactions: [], reactionsUpdatedAt: null };
  const update = { ...message, deliveredAt: null, readAt: null, reactions: [{ emoji: "\u{1F44D}", actors: ["visitor-actor"] }], reactionsUpdatedAt: "2026-11-17T00:00:03Z" };
  const changed = applyReaction([message], update);
  assert.deepEqual(changed[0].reactions, update.reactions);
  assert.equal(changed[0].readAt, message.readAt);
  assert.equal(changed[0].body, message.body);
  assert.deepEqual(applyReaction([], update), []);
  assert.deepEqual(applyReaction([message], { ...update, conversationId: "another-conversation" }), [message]);
  assert.deepEqual(applyReaction(changed, { ...update, reactions: [], reactionsUpdatedAt: "2026-11-17T00:00:01Z" }), changed);
  assert.deepEqual(applyReaction(changed, { ...update, reactions: [], reactionsUpdatedAt: "2026-11-17T00:00:04Z" })[0].reactions, []);
});

test("polling typing keeps an active colleague visible and expires abandoned drafts", () => {
  const now = 10_000;
  const stopped = { conversationId: UUID, senderType: "ADMIN", name: "First admin", expiresAt: new Date(now - 1) };
  const active = { ...stopped, name: "Second admin", expiresAt: new Date(now + 6_000) };
  assert.deepEqual(typingEvents([stopped, active], now), [{ t: "typing", conversationId: UUID, from: "ADMIN", typing: true, name: "Second admin" }]);
  assert.deepEqual(typingEvents([active, stopped], now), typingEvents([stopped, active], now));
  assert.deepEqual(typingEvents([active], now + 6_000), [{ t: "typing", conversationId: UUID, from: "ADMIN", typing: false, name: "Second admin" }]);
  const visitor = { ...active, senderType: "VISITOR", name: "Visitor" };
  assert.equal(typingEvents([active, visitor], now).length, 2);
  assert.deepEqual(typingEvents([{ ...active, senderType: "SYSTEM" }], now), []);
});
