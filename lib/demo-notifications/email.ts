import nodemailer from "nodemailer";
import { getSmtpConfig, validEmail } from "./config.ts";
import type { DemoNotificationContent } from "./content.ts";

function safeSmtpError(error: unknown) {
  const code = (error as { code?: unknown })?.code;
  const codes: Record<string, string> = {
    EAUTH: "SMTP_AUTHENTICATION_FAILED",
    ETIMEDOUT: "SMTP_TIMEOUT",
    ECONNECTION: "SMTP_CONNECTION_FAILED",
    ESOCKET: "SMTP_SOCKET_FAILED",
    ETLS: "SMTP_TLS_FAILED",
    EENVELOPE: "SMTP_RECIPIENT_REJECTED",
    EMESSAGE: "SMTP_MESSAGE_REJECTED",
  };
  return new Error(typeof code === "string" && Object.hasOwn(codes, code) ? codes[code] : "SMTP_SEND_FAILED");
}

export function createEmailSender(env: Record<string, string | undefined> = process.env) {
  const config = getSmtpConfig(env);
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
    logger: false,
    debug: false,
  });
  return {
    async verify() {
      try { await transport.verify(); } catch (error) { throw safeSmtpError(error); }
    },
    async send(recipient: string, content: DemoNotificationContent, notificationId: string) {
      if (!validEmail(recipient)) throw new Error("Invalid email notification recipient");
      const id = notificationId.replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 150);
      if (!id) throw new Error("Notification ID is required");
      try {
        const info = await transport.sendMail({
          from: { name: config.fromName, address: config.user },
          to: recipient,
          ...(content.replyTo ? { replyTo: content.replyTo } : {}),
          subject: content.subject,
          text: content.text,
          html: content.html,
          messageId: `<demo-${id}@${config.user.split("@")[1]}>`,
        });
        if (info.rejected.length || !info.accepted.length) throw new Error("Recipient rejected");
        return info.messageId;
      } catch (error) { throw safeSmtpError(error); }
    },
    close() { transport.close(); },
  };
}
