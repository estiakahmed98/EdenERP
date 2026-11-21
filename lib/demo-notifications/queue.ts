import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { notificationsEnabled } from "./config";
import type { DemoNotificationDetails } from "./content";
import { MAX_NOTIFICATION_ATTEMPTS, NOTIFICATION_LEASE_MS, retryDelayMs, safeNotificationError } from "./policy";

export { MAX_NOTIFICATION_ATTEMPTS } from "./policy";
export type NotificationChannel = "EMAIL" | "WHATSAPP";
export type NotificationJob = {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  attempts: number;
  lockToken: string;
  details: DemoNotificationDetails;
};

/**
 * Called in the SAME transaction that inserts a new public demo request.
 * Recipients come from the admin-managed "demo_notification_recipients" table.
 */
export async function enqueueDemoNotifications(tx: Prisma.TransactionClient, requestId: string) {
  if (!notificationsEnabled()) return;
  await tx.$executeRaw`
    INSERT INTO "demo_notifications" ("id", "requestId", "channel", "recipient", "updatedAt")
    SELECT gen_random_uuid(), ${requestId}::uuid, r."channel", r."recipient", CURRENT_TIMESTAMP
    FROM "demo_notification_recipients" r
    ON CONFLICT ("requestId", "channel", "recipient") DO NOTHING
  `;
}

type Claimed = Omit<NotificationJob, "details"> & {
  requestId: string; fullName: string; companyName: string; phone: string;
  email: string | null; modules: string[]; message: string | null; createdAt: string;
};

/** A lease and SKIP LOCKED allow safe recovery after a worker crash. */
export async function claimNextNotification(channel: NotificationChannel): Promise<NotificationJob | null> {
  const lockToken = randomUUID();
  // Use PostgreSQL's clock for every lease/retry. The pg adapter can serialize a
  // JS Date as a timezone-less parameter, shifting it in non-UTC DB sessions.
  return db.$transaction(async (tx) => {
    await tx.$executeRaw`
      UPDATE "demo_notifications" SET "status"='FAILED', "lockedAt"=NULL, "lockToken"=NULL,
        "lastError"='ATTEMPTS_EXHAUSTED', "updatedAt"=CURRENT_TIMESTAMP
      WHERE "channel"=${channel} AND "attempts">=${MAX_NOTIFICATION_ATTEMPTS}
        AND ("status"='PENDING' OR ("status"='PROCESSING'
          AND "lockedAt"<CURRENT_TIMESTAMP-(${NOTIFICATION_LEASE_MS}*INTERVAL '1 millisecond')))
    `;
    const rows = await tx.$queryRaw<Claimed[]>`
      WITH candidate AS (
        SELECT "id" FROM "demo_notifications"
        WHERE "channel"=${channel} AND "attempts"<${MAX_NOTIFICATION_ATTEMPTS}
          AND (("status"='PENDING' AND "availableAt"<=CURRENT_TIMESTAMP)
            OR ("status"='PROCESSING' AND "lockedAt"<CURRENT_TIMESTAMP-(${NOTIFICATION_LEASE_MS}*INTERVAL '1 millisecond')))
        ORDER BY "availableAt", "createdAt", "id"
        FOR UPDATE SKIP LOCKED LIMIT 1
      ), claimed AS (
        UPDATE "demo_notifications" AS n SET "status"='PROCESSING', "attempts"=n."attempts"+1,
          "lockedAt"=CURRENT_TIMESTAMP, "lockToken"=${lockToken}::uuid, "updatedAt"=CURRENT_TIMESTAMP
        FROM candidate WHERE n."id"=candidate."id" RETURNING n.*
      )
      SELECT c."id", c."channel", c."recipient", c."attempts", c."lockToken", c."requestId",
        r."fullName", r."companyName", r."phone", r."email", r."modules", r."message",
        to_char(r."createdAt" AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS "createdAt"
      FROM claimed c JOIN "demo_requests" r ON r."id"=c."requestId"
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id, channel: row.channel, recipient: row.recipient, attempts: row.attempts, lockToken: row.lockToken,
      details: { id: row.requestId, fullName: row.fullName, companyName: row.companyName, phone: row.phone,
        email: row.email, modules: row.modules, message: row.message, createdAt: row.createdAt },
    };
  });
}

export async function markNotificationSent(job: NotificationJob) {
  const changed = await db.$executeRaw`
    UPDATE "demo_notifications" SET "status"='SENT', "sentAt"=CURRENT_TIMESTAMP,
      "lockedAt"=NULL, "lockToken"=NULL, "lastError"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    WHERE "id"=${job.id}::uuid AND "lockToken"=${job.lockToken}::uuid AND "status"='PROCESSING'
  `;
  return changed === 1;
}

export async function markNotificationFailed(job: NotificationJob, errorCode: string) {
  const status = job.attempts >= MAX_NOTIFICATION_ATTEMPTS ? "FAILED" : "PENDING";
  const retryMs = retryDelayMs(job.attempts);
  const changed = await db.$executeRaw`
    UPDATE "demo_notifications" SET "status"=${status}, "availableAt"=CURRENT_TIMESTAMP+(${retryMs}*INTERVAL '1 millisecond'),
      "lastError"=${safeNotificationError(errorCode)}, "lockedAt"=NULL, "lockToken"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    WHERE "id"=${job.id}::uuid AND "lockToken"=${job.lockToken}::uuid AND "status"='PROCESSING'
  `;
  return changed === 1;
}

/** No transport attempt was made (e.g. disconnected before send). */
export async function releaseNotification(job: NotificationJob) {
  const changed = await db.$executeRaw`
    UPDATE "demo_notifications" SET "status"='PENDING', "attempts"=GREATEST(0,"attempts"-1),
      "availableAt"=CURRENT_TIMESTAMP, "lockedAt"=NULL, "lockToken"=NULL, "updatedAt"=CURRENT_TIMESTAMP
    WHERE "id"=${job.id}::uuid AND "lockToken"=${job.lockToken}::uuid AND "status"='PROCESSING'
  `;
  return changed === 1;
}
