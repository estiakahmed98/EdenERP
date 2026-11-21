import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { normalizeRecipient, notificationsEnabled, type NotificationChannel } from "./config";

/** The worker writes a heartbeat every few seconds; older than this means it is not running. */
export const WORKER_STALE_MS = 30_000;
const WORKER_ID = "whatsapp";
const MAX_RECIPIENTS_PER_CHANNEL = 25;

export type WhatsAppState = "disconnected" | "starting" | "qr" | "ready" | "error";
export type WorkerCommand = "LOGOUT";

export class NotificationSettingsError extends Error {
  constructor(readonly code: "invalid" | "duplicate" | "notFound" | "limit", readonly status: number) {
    super(code);
  }
}

export type NotificationRecipientRow = { id: string; channel: NotificationChannel; recipient: string; createdAt: string };

// Raw SQL with unqualified table names (like queue.ts): Prisma model queries
// hard-code the "public" schema, which would bypass search_path isolation.

export async function listRecipients(): Promise<NotificationRecipientRow[]> {
  const rows = await db.$queryRaw<{ id: string; channel: NotificationChannel; recipient: string; createdAt: Date }[]>`
    SELECT "id", "channel", "recipient", "createdAt" FROM "demo_notification_recipients"
    ORDER BY "channel", "createdAt", "recipient"
  `;
  return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
}

export async function addRecipient(channel: NotificationChannel, value: string): Promise<NotificationRecipientRow> {
  let normalized;
  try { normalized = normalizeRecipient(channel, value); }
  catch { throw new NotificationSettingsError("invalid", 400); }
  const counted = await db.$queryRaw<{ n: number }[]>`SELECT COUNT(*)::int AS n FROM "demo_notification_recipients" WHERE "channel"=${channel}`;
  if ((counted[0]?.n ?? 0) >= MAX_RECIPIENTS_PER_CHANNEL) throw new NotificationSettingsError("limit", 400);
  const rows = await db.$queryRaw<{ id: string; recipient: string; createdAt: Date }[]>`
    INSERT INTO "demo_notification_recipients" ("id", "channel", "recipient")
    VALUES (${randomUUID()}::uuid, ${normalized.channel}, ${normalized.recipient})
    ON CONFLICT ("channel", "recipient") DO NOTHING
    RETURNING "id", "recipient", "createdAt"
  `;
  const row = rows[0];
  if (!row) throw new NotificationSettingsError("duplicate", 409);
  return { id: row.id, channel, recipient: row.recipient, createdAt: row.createdAt.toISOString() };
}

export async function removeRecipient(id: string) {
  const removed = await db.$executeRaw`DELETE FROM "demo_notification_recipients" WHERE "id"=${id}::uuid`;
  if (removed === 0) throw new NotificationSettingsError("notFound", 404);
}

/** Resets FAILED jobs to PENDING (same as `npm run notifications:retry`). Never resends SENT jobs. */
export async function retryFailedNotifications() {
  return db.$executeRaw`
    UPDATE "demo_notifications"
    SET "status"='PENDING', "attempts"=0, "availableAt"=CURRENT_TIMESTAMP, "lockedAt"=NULL,
        "lockToken"=NULL, "lastError"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    WHERE "status"='FAILED'
  `;
}

export async function requestWorkerCommand(command: WorkerCommand) {
  await db.$executeRaw`
    INSERT INTO "demo_notification_worker" ("id", "command", "commandAt", "updatedAt")
    VALUES (${WORKER_ID}, ${command}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("id") DO UPDATE SET "command"=EXCLUDED."command", "commandAt"=CURRENT_TIMESTAMP, "updatedAt"=CURRENT_TIMESTAMP
  `;
}

export async function getNotificationOverview() {
  const [worker, recipients, counts, recent] = await Promise.all([
    db.$queryRaw<{ state: string; qr: string | null; account: string | null; command: string | null; heartbeatAt: Date | null; online: boolean }[]>`
      SELECT "state", "qr", "account", "command", "heartbeatAt",
        COALESCE("heartbeatAt" > CURRENT_TIMESTAMP - (${WORKER_STALE_MS} * INTERVAL '1 millisecond'), false) AS "online"
      FROM "demo_notification_worker" WHERE "id"=${WORKER_ID}
    `,
    listRecipients(),
    db.$queryRaw<{ channel: NotificationChannel; status: string; count: number }[]>`
      SELECT "channel", "status", COUNT(*)::int AS "count" FROM "demo_notifications" GROUP BY "channel", "status"
    `,
    // Only the admin's own destinations and delivery metadata; no visitor details.
    db.$queryRaw<{ id: string; channel: NotificationChannel; recipient: string; status: string; lastError: string | null; attempts: number; createdAt: Date; sentAt: Date | null }[]>`
      SELECT "id", "channel", "recipient", "status", "lastError", "attempts", "createdAt", "sentAt"
      FROM "demo_notifications" ORDER BY "createdAt" DESC, "id" LIMIT 15
    `,
  ]);
  const row = worker[0];
  const online = row?.online ?? false;
  const state = (online ? row.state : "disconnected") as WhatsAppState;
  return {
    enabled: notificationsEnabled(),
    worker: {
      online,
      state,
      // A QR is only useful while the worker is alive and waiting for a scan.
      qr: online && state === "qr" ? row.qr : null,
      account: online && state === "ready" ? row.account : null,
      pendingCommand: row?.command ?? null,
      heartbeatAt: row?.heartbeatAt?.toISOString() ?? null,
    },
    recipients,
    counts,
    recent: recent.map((job) => ({ ...job, createdAt: job.createdAt.toISOString(), sentAt: job.sentAt?.toISOString() ?? null })),
  };
}

export type NotificationOverview = Awaited<ReturnType<typeof getNotificationOverview>>;

/* ---------- worker side ---------- */

export async function publishWorkerStatus(status: { state: WhatsAppState; qr: string | null; account: string | null }) {
  await db.$executeRaw`
    INSERT INTO "demo_notification_worker" ("id", "state", "qr", "account", "heartbeatAt", "updatedAt")
    VALUES (${WORKER_ID}, ${status.state}, ${status.qr}, ${status.account}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("id") DO UPDATE SET "state"=EXCLUDED."state", "qr"=EXCLUDED."qr", "account"=EXCLUDED."account",
      "heartbeatAt"=CURRENT_TIMESTAMP, "updatedAt"=CURRENT_TIMESTAMP
  `;
}

/** Atomically takes the pending admin command, if any. */
export async function takeWorkerCommand(): Promise<WorkerCommand | null> {
  const rows = await db.$queryRaw<{ command: WorkerCommand | null }[]>`
    UPDATE "demo_notification_worker" w SET "command"=NULL, "commandAt"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    FROM (SELECT "command" FROM "demo_notification_worker" WHERE "id"=${WORKER_ID} AND "command" IS NOT NULL FOR UPDATE) prev
    WHERE w."id"=${WORKER_ID}
    RETURNING prev."command"
  `;
  return rows[0]?.command ?? null;
}

export async function markWorkerStopped() {
  await db.$executeRaw`
    UPDATE "demo_notification_worker" SET "state"='disconnected', "qr"=NULL, "heartbeatAt"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    WHERE "id"=${WORKER_ID}
  `;
}
