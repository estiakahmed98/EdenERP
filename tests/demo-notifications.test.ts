import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getSmtpConfig,
  normalizeRecipient,
  normalizeWhatsAppRecipient,
  notificationsEnabled,
} from "../lib/demo-notifications/config.ts";
import { formatDemoNotification, type DemoNotificationDetails } from "../lib/demo-notifications/content.ts";
import { MAX_NOTIFICATION_ATTEMPTS, NOTIFICATION_LEASE_MS, retryDelayMs, safeNotificationError } from "../lib/demo-notifications/policy.ts";

const sender = {
  SMTP_USER: "sender@example.com",
  SMTP_PASSWORD: "test-only-password",
};
const details: DemoNotificationDetails = {
  id: "9f2f28a8-44aa-433b-96da-77e71f8262b9",
  fullName: "Demo Visitor",
  companyName: "Example Company",
  phone: "+8801700000000",
  email: "visitor@example.com",
  modules: ["Accounting", "Inventory"],
  message: "Please contact us tomorrow.",
  createdAt: "2026-11-21T09:00:00.000Z",
};

test("notifications are opt-in and only the exact value true enables delivery", () => {
  for (const enabled of [undefined, "false", "TRUE", "1", ""]) {
    assert.equal(notificationsEnabled({ DEMO_NOTIFICATIONS_ENABLED: enabled }), false);
  }
  assert.equal(notificationsEnabled({ DEMO_NOTIFICATIONS_ENABLED: "true" }), true);
});

test("admin-entered recipients are normalized before they are stored", () => {
  assert.deepEqual(normalizeRecipient("EMAIL", " TEAM@Example.com "), { channel: "EMAIL", recipient: "team@example.com" });
  assert.deepEqual(normalizeRecipient("WHATSAPP", "+880 1842-781978"), { channel: "WHATSAPP", recipient: "8801842781978" });
  assert.deepEqual(normalizeRecipient("WHATSAPP", "+880 (1805) 412462"), { channel: "WHATSAPP", recipient: "8801805412462" });
});

test("invalid recipients fail closed without leaking the entered destination", () => {
  for (const phone of ["01700000000", "12345", "+88017000000000000", "88017<script>", "88017@example.com"]) {
    assert.throws(() => normalizeWhatsAppRecipient(phone));
    assert.throws(() => normalizeRecipient("WHATSAPP", phone));
  }
  for (const email of ["not-an-email", "a@b", "two@@example.com", "8801842781978"]) {
    assert.throws(() => normalizeRecipient("EMAIL", email));
  }
  const privateDestination = "private-configuration@example.com\r\nBcc: attacker@example.com";
  assert.throws(() => normalizeRecipient("EMAIL", privateDestination), (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.ok(!error.message.includes("private-configuration"));
    assert.ok(!error.message.includes("attacker"));
    return true;
  });
});

test("Gmail SMTP config removes app-password display spaces and preserves private credentials", () => {
  const config = getSmtpConfig({ ...sender, SMTP_USER: " SENDER@Example.com ", SMTP_PASSWORD: "abcd efgh ijkl mnop" });
  assert.equal(config.user, "sender@example.com");
  assert.equal(config.password, "abcdefghijklmnop");
  assert.equal(config.host, "smtp.gmail.com");
  assert.equal(config.port, 465);
  assert.equal(config.secure, true);
  const custom = getSmtpConfig({ ...sender, SMTP_HOST: "mail.example.com", SMTP_PORT: "587", SMTP_PASSWORD: "keep internal spaces" });
  assert.equal(custom.password, "keep internal spaces");
  assert.equal(custom.secure, false);
});

test("invalid SMTP settings fail without disclosing passwords", () => {
  const secret = "private-test-credential";
  for (const overrides of [
    { SMTP_USER: "" }, { SMTP_PASSWORD: "" }, { SMTP_PORT: "0" },
    { SMTP_PORT: "65536" }, { SMTP_PORT: "465.5" }, { SMTP_PORT: "nan" },
    { SMTP_HOST: "smtp.example.com\r\nInjected" }, { SMTP_SECURE: "yes" },
    { SMTP_FROM_NAME: "Adon ERP\r\nBcc: attacker@example.com" },
  ]) {
    assert.throws(() => getSmtpConfig({ ...sender, SMTP_PASSWORD: secret, ...overrides }), (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.ok(!error.message.includes(secret));
      assert.ok(!error.message.includes("attacker@example.com"));
      return true;
    });
  }
});

test("lead details stay readable in text and cannot inject HTML or mail headers", () => {
  const output = formatDemoNotification({
    ...details,
    fullName: "Visitor\r\nBcc: attacker@example.com",
    companyName: '<img src=x onerror="alert(1)">',
    message: "A & B <script>alert('injection')</script>\nSecond line",
    email: "visitor@example.com\r\nCc: attacker@example.com",
  }, "https://adonerp.com.bd");
  assert.ok(!output.subject.includes("\r"));
  assert.ok(!output.subject.includes("\n"));
  assert.ok(!output.subject.includes("attacker@example.com"));
  assert.ok(!output.html.includes("<img"));
  assert.ok(!output.html.includes("<script>"));
  assert.ok(output.html.includes("&lt;img"));
  assert.ok(output.html.includes("A &amp; B"));
  assert.ok(output.text.includes("A & B <script>"));
  assert.equal(output.replyTo, undefined);
});

test("admin links use a safe origin and never inherit credentials, paths or query strings", () => {
  const output = formatDemoNotification(details, "https://adonerp.com.bd/somewhere?token=private#fragment");
  assert.ok(output.text.includes("https://adonerp.com.bd/admin/demo-bookings"));
  assert.ok(!output.text.includes("token=private"));
  assert.equal(output.replyTo, "visitor@example.com");
  for (const origin of ["javascript:alert(1)", "data:text/html,hello", "https://user:password@example.com", "invalid origin"]) {
    const invalid = formatDemoNotification(details, origin);
    assert.ok(!invalid.text.includes("Admin panel:"));
    assert.ok(!invalid.html.includes("href="));
  }
});

test("optional lead fields and invalid timestamps produce usable notifications", () => {
  const output = formatDemoNotification({ ...details, email: null, message: null, modules: [], createdAt: "invalid" });
  assert.ok(output.text.includes("Email: Not provided"));
  assert.ok(output.text.includes("Modules: Not specified"));
  assert.ok(output.text.includes("Message: Not provided"));
  assert.ok(output.text.includes("Not recorded"));
  assert.equal(output.replyTo, undefined);
  const timestamped = formatDemoNotification(details);
  assert.ok(timestamped.text.includes("(Dhaka)"));
  assert.ok(timestamped.text.includes("3:00"));
});

test("delivery retries back off to a bounded delay and persisted errors exclude raw transport details", () => {
  assert.equal(MAX_NOTIFICATION_ATTEMPTS, 8);
  assert.ok(NOTIFICATION_LEASE_MS >= 60_000);
  const delays = Array.from({ length: 20 }, (_, index) => retryDelayMs(index + 1));
  assert.equal(delays[0], 30_000);
  for (let index = 1; index < delays.length; index++) {
    assert.ok(delays[index] >= delays[index - 1]);
    assert.ok(delays[index] <= 60 * 60_000);
  }
  assert.equal(delays.at(-1), 60 * 60_000);
  assert.equal(safeNotificationError("SMTP_AUTH_FAILED"), "SMTP_AUTH_FAILED");
  for (const raw of ["Error: login failed for private@example.com", "password=private", "A".repeat(100), "TOKEN\nLEAK", ""]) {
    assert.equal(safeNotificationError(raw), "DELIVERY_FAILED");
  }
});
