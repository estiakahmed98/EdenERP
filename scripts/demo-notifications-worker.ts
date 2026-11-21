import "dotenv/config";
import { setTimeout as delay } from "node:timers/promises";
import pg from "pg";

/**
 * Persistent notification worker. Run separately from Next.js so Chromium and
 * SMTP do not extend a visitor's request or depend on a browser page being open.
 */
async function main() {
  const { notificationsEnabled } = await import("../lib/demo-notifications/config");
  if (!notificationsEnabled()) {
    console.log("[notifications] Disabled. Set DEMO_NOTIFICATIONS_ENABLED=true to enable delivery.");
    return;
  }

  const { db } = await import("../lib/db");
  const settings = await import("../lib/demo-notifications/settings");
  const { createEmailSender } = await import("../lib/demo-notifications/email");
  const { formatDemoNotification } = await import("../lib/demo-notifications/content");
  const queue = await import("../lib/demo-notifications/queue");
  type Job = NonNullable<Awaited<ReturnType<typeof queue.claimNextNotification>>>;
  type Channel = Job["channel"];
  let emailSender: ReturnType<typeof createEmailSender> | undefined;
  let whatsapp: InstanceType<(typeof import("../lib/demo-notifications/whatsapp"))["WhatsAppSender"]> | undefined;
  let lockClient: pg.Client | undefined;
  let ownsLock = false;
  let running = true;
  let emailReady = false;
  let nextEmailVerification = 0;
  const sleepController = new AbortController();
  const shutdown = () => {
    if (!running) return;
    running = false;
    sleepController.abort();
    console.log("[notifications] Stopping after current deliveries finish.");
  };
  const sleep = (ms: number) => delay(ms, undefined, { signal: sleepController.signal }).catch(() => {});

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);

  function failureCode(error: unknown, channel: Channel) {
    const message = error instanceof Error ? error.message : "";
    // Only use our transports' short machine codes, never SMTP responses or
    // Chromium errors, which can contain credentials, addresses or lead data.
    if (/^(?:SMTP|EMAIL|WHATSAPP)_[A-Z_]{2,60}$/.test(message)) return message;
    return channel === "EMAIL" ? "EMAIL_SEND_FAILED" : "WHATSAPP_SEND_FAILED";
  }

  async function ensureEmailReady() {
    if (emailReady || Date.now() < nextEmailVerification) return;
    nextEmailVerification = Date.now() + 60_000;
    try {
      emailSender?.close();
      emailSender = createEmailSender();
      await emailSender.verify();
      emailReady = true;
      console.log("[notifications] SMTP authenticated and ready.");
    } catch {
      emailReady = false;
      console.error("[notifications] SMTP unavailable. Check SMTP_USER, SMTP_PASSWORD and SMTP settings. Retrying in 60 seconds; email jobs remain queued.");
    }
  }

  async function processChannel(channel: Channel) {
    while (running) {
      try {
        if (channel === "EMAIL") await ensureEmailReady();
        if (!running) break;
        if (channel === "EMAIL" ? !emailReady : !whatsapp?.isReady()) {
          await sleep(1_000);
          continue;
        }
        const job = await queue.claimNextNotification(channel);
        if (!job) {
          await sleep(1_000);
          continue;
        }
        if (channel === "WHATSAPP" && !whatsapp?.isReady()) {
          await queue.releaseNotification(job);
          await sleep(1_000);
          continue;
        }
        const content = formatDemoNotification(job.details, process.env.NEXT_PUBLIC_SITE_URL);
        try {
          if (channel === "EMAIL") await emailSender!.send(job.recipient, content, job.id);
          else await whatsapp!.send(job.recipient, content.text);
        } catch (error) {
          if (channel === "WHATSAPP" && error instanceof Error && ["WhatsApp is not connected", "WHATSAPP_NOT_CONNECTED"].includes(error.message)) {
            await queue.releaseNotification(job);
            await sleep(1_000);
            continue;
          }
          const code = failureCode(error, channel);
          await queue.markNotificationFailed(job, code);
          if (channel === "EMAIL") emailReady = false;
          console.error(`[notifications] ${channel} delivery failed (${code}); job ${job.id} retained. Inspect notifications:status for retry state.`);
          await sleep(channel === "WHATSAPP" ? 1_500 : 250);
          continue;
        }
        // A send that succeeded followed by a database error is left leased.
        // Retrying immediately here would increase duplicate delivery risk.
        try {
          const recorded = await queue.markNotificationSent(job);
          console.log(recorded
            ? `[notifications] ${channel} accepted; job ${job.id} marked SENT.`
            : `[notifications] ${channel} accepted; job ${job.id} no longer owns its lease.`);
        } catch {
          console.error(`[notifications] ${channel} accepted but acknowledgement storage failed for job ${job.id}. Lease recovery will handle it.`);
        }
        await sleep(channel === "WHATSAPP" ? 1_500 : 250);
      } catch {
        console.error(`[notifications] ${channel} queue unavailable. Retrying in 10 seconds.`);
        await sleep(10_000);
      }
    }
  }

  /** Publishes WhatsApp state/QR for the admin panel and runs admin commands. */
  async function statusLoop() {
    let commandRunning = false;
    while (running) {
      try {
        const command = commandRunning ? null : await settings.takeWorkerCommand();
        if (command === "LOGOUT" && whatsapp) {
          commandRunning = true;
          console.log("[notifications] Admin requested WhatsApp logout; starting a new session for a fresh QR.");
          void whatsapp.logout()
            .catch(() => console.error("[notifications] WhatsApp could not restart after logout; reconnect is scheduled."))
            .finally(() => { commandRunning = false; });
        }
        await settings.publishWorkerStatus({
          state: whatsapp?.getState() ?? "disconnected",
          qr: whatsapp?.getQrImage() ?? null,
          account: whatsapp?.getAccount() ?? null,
        });
      } catch {
        console.error("[notifications] Could not publish worker status to the database. Retrying.");
      }
      await sleep(3_000);
    }
  }

  try {
    await db.$queryRaw`SELECT 1 AS connected FROM "demo_notifications" LIMIT 1`;
    // Recipients are managed in the admin panel and read per demo request, so both channels always run.
    const channels = new Set<Channel>(["EMAIL", "WHATSAPP"]);
    const recipients = await settings.listRecipients();
    console.log(`[notifications] Recipients (admin panel): ${recipients.filter((entry) => entry.channel === "EMAIL").length} email, ${recipients.filter((entry) => entry.channel === "WHATSAPP").length} WhatsApp.`);
    if (process.argv.includes("--check")) {
      await ensureEmailReady();
      if (!emailReady) process.exitCode = 1;
      console.log("[notifications] Database queue checked. No notifications sent and no WhatsApp browser started.");
      return;
    }

    lockClient = new pg.Client({ connectionString: process.env.DATABASE_URL, keepAlive: true, connectionTimeoutMillis: 10_000, application_name: "AdonERP demo notification worker" });
    lockClient.on("error", () => {
      console.error("[notifications] Worker lock connection lost. Stopping to prevent duplicate workers.");
      shutdown();
    });
    await lockClient.connect();
    const lock = await lockClient.query<{ locked: boolean }>("SELECT pg_try_advisory_lock(72410622) AS locked");
    if (!lock.rows[0]?.locked) {
      console.error("[notifications] Another notification worker is already running for this database. Stop it before starting another.");
      process.exitCode = 1;
      return;
    }
    ownsLock = true;

    const { WhatsAppSender } = await import("../lib/demo-notifications/whatsapp");
    whatsapp = new WhatsAppSender();
    // QR scanning may take indefinitely; email delivery must keep working.
    void whatsapp.initialize().catch(() => {
      console.error("[notifications] WhatsApp could not initialize. Check the saved QR/session and Chromium installation. Email delivery continues.");
    });
    console.log("[notifications] Worker running. Link WhatsApp from Admin → Notifications; WhatsApp jobs wait until it is connected.");
    await Promise.all([statusLoop(), ...[...channels].map((channel) => processChannel(channel))]);
  } finally {
    running = false;
    sleepController.abort();
    process.removeListener("SIGINT", shutdown);
    process.removeListener("SIGTERM", shutdown);
    emailSender?.close();
    await whatsapp?.destroy().catch(() => {});
    if (ownsLock) await settings.markWorkerStopped().catch(() => {});
    await lockClient?.end().catch(() => {});
    await db.$disconnect();
  }
}

main().catch(() => {
  console.error("[notifications] Startup failed. Check DATABASE_URL, the notification migration and notification environment settings.");
  process.exitCode = 1;
});
