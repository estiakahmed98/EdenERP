export type NotificationChannel = "EMAIL" | "WHATSAPP";
export type NotificationRecipient = { channel: NotificationChannel; recipient: string };
type NotificationEnvironment = Record<string, string | undefined>;

export function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

export function normalizeWhatsAppRecipient(value: string) {
  if (!/^[+\d\s().-]+$/.test(value)) throw new Error("Invalid WhatsApp notification recipient configuration");
  const digits = value.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) throw new Error("WhatsApp notification recipients must include their country code");
  return digits;
}

/** Master switch. Recipients themselves are managed in the admin panel (database). */
export function notificationsEnabled(env: NotificationEnvironment = process.env) {
  return env.DEMO_NOTIFICATIONS_ENABLED === "true";
}

/** Validates and normalizes an admin-entered recipient. Throws without echoing the value. */
export function normalizeRecipient(channel: NotificationChannel, value: string): NotificationRecipient {
  const input = value.trim();
  if (channel === "EMAIL") {
    const email = input.toLowerCase();
    if (!validEmail(email)) throw new Error("Invalid email notification recipient");
    return { channel, recipient: email };
  }
  return { channel, recipient: normalizeWhatsAppRecipient(input) };
}

export function getSmtpConfig(env: NotificationEnvironment = process.env) {
  const host = env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(env.SMTP_PORT || "465");
  const secure = env.SMTP_SECURE === undefined ? port === 465 : env.SMTP_SECURE === "true";
  const user = env.SMTP_USER?.trim().toLowerCase() || "";
  const password = host === "smtp.gmail.com" ? env.SMTP_PASSWORD?.replace(/\s/g, "") : env.SMTP_PASSWORD;
  const fromName = env.SMTP_FROM_NAME?.trim() || "Adon ERP";
  if (!Number.isInteger(port) || port < 1 || port > 65535 || /[\r\n\s]/.test(host)) throw new Error("Invalid SMTP server configuration");
  if (env.SMTP_SECURE !== undefined && !["true", "false"].includes(env.SMTP_SECURE)) throw new Error("SMTP_SECURE must be true or false");
  if (!validEmail(user) || !password || /[\r\n]/.test(fromName)) throw new Error("Set SMTP_USER and SMTP_PASSWORD for the sender account");
  return { host, port, secure, user, password, fromName };
}
