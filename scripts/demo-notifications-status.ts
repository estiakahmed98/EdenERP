import "dotenv/config";

async function main() {
  const { db } = await import("../lib/db");
  try {
    if (process.argv.includes("--retry-failed")) {
      const count = await db.$executeRaw`
        UPDATE "demo_notifications"
        SET "status" = 'PENDING', "attempts" = 0,
            "availableAt" = CURRENT_TIMESTAMP, "lockedAt" = NULL,
            "lockToken" = NULL, "lastError" = NULL, "updatedAt" = CURRENT_TIMESTAMP
        WHERE "status" = 'FAILED'
      `;
      console.log(`[notifications] ${count} failed notification(s) queued for retry. The worker will deliver them when the channel is ready.`);
    }
    const rows = await db.$queryRaw<{ channel: string; status: string; count: number }[]>`
      SELECT "channel", "status", COUNT(*)::int AS "count"
      FROM "demo_notifications"
      GROUP BY "channel", "status"
      ORDER BY "channel", "status"
    `;
    if (rows.length) console.table(rows);
    else console.log("[notifications] No notifications queued yet.");
    const failures = await db.$queryRaw<{ channel: string; lastError: string | null; count: number }[]>`
      SELECT "channel", "lastError", COUNT(*)::int AS "count"
      FROM "demo_notifications"
      WHERE "status" = 'FAILED'
      GROUP BY "channel", "lastError"
      ORDER BY "channel", "lastError"
    `;
    if (failures.length) {
      console.log("[notifications] Failed delivery reasons:");
      console.table(failures);
    }
  } finally {
    await db.$disconnect();
  }
}

main().catch(() => {
  console.error("[notifications] Unable to read the queue. Check DATABASE_URL and apply the notification migration.");
  process.exitCode = 1;
});
