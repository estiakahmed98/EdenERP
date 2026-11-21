import 'dotenv/config';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import pg from 'pg';

async function main() {
const originalUrl = process.env.DATABASE_URL!;
const schema = `eden_notification_test_${randomUUID().replaceAll('-', '')}`;
const setup = new pg.Client({ connectionString: originalUrl });
await setup.connect();
let cleanupDb: (() => Promise<void>) | undefined;
try {
  assert.match(schema, /^eden_notification_test_[a-f0-9]{32}$/);
  await setup.query(`CREATE SCHEMA "${schema}"`);
  await setup.query(`SET search_path TO "${schema}", public`);
  await setup.query('CREATE TABLE "demo_requests" (LIKE public."demo_requests" INCLUDING ALL)');
  await setup.query('CREATE TABLE "demo_request_rate_limits" (LIKE public."demo_request_rate_limits" INCLUDING ALL)');
  await setup.query(await readFile('prisma/migrations/20261121_add_demo_notifications/migration.sql', 'utf8'));
  // Regress databases where schema sync removed the client-managed field's
  // default. Raw notification inserts must still supply updatedAt themselves.
  await setup.query('ALTER TABLE "demo_notifications" ALTER COLUMN "updatedAt" DROP DEFAULT');
  await setup.query(await readFile('prisma/migrations/20261121_notification_settings/migration.sql', 'utf8'));
  // Guard: nothing in this test may touch the real (public) recipient list.
  const publicRecipients = async () => {
    const exists = await setup.query(`SELECT to_regclass('public.demo_notification_recipients') AS t`);
    if (!exists.rows[0].t) return '';
    const rows = await setup.query('SELECT "channel", "recipient" FROM public."demo_notification_recipients" ORDER BY 1, 2');
    return JSON.stringify(rows.rows);
  };
  const publicBefore = await publicRecipients();
  const isolatedUrl = new URL(originalUrl);
  // Regress the PrismaPg timestamptz bug under an explicitly non-UTC session.
  isolatedUrl.searchParams.set('options', `-c search_path=${schema},public -c TimeZone=America/Los_Angeles`);
  process.env.DATABASE_URL = isolatedUrl.href;
  process.env.DEMO_NOTIFICATIONS_ENABLED = 'true';
  const { db } = await import('../lib/db');
  cleanupDb = () => db.$disconnect();
  const activeSchema = await db.$queryRaw<{ current_schema: string }[]>`SELECT current_schema()`;
  assert.equal(activeSchema[0].current_schema, schema, 'Isolation must be confirmed before writes');
  const { saveDemoRequest } = await import('../lib/demo-requests/service');
  const { demoSubmissionSchema } = await import('../lib/demo-requests/validation');
  const queue = await import('../lib/demo-notifications/queue');
  const { POST } = await import('../app/api/demo-requests/route');
  const { NextRequest } = await import('next/server');
  const submission = demoSubmissionSchema.parse({
    requestKey: randomUUID(), locale: 'en', website: '',
    details: { fullName: 'Notification Integration Test', companyName: 'Isolated Test Company', phone: '+8801700000000', shareMore: true, email: 'test@example.invalid', modules: ['Inventory'], message: 'No external messages sent.' },
  });
  const post = (body: unknown, origin = 'http://notifications.test') => POST(new NextRequest('http://notifications.test/api/demo-requests', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, 'x-forwarded-for': '127.0.0.1' }, body: JSON.stringify(body),
  }));
  assert.equal((await post({})).status, 400);
  assert.equal((await post(submission, 'https://foreign.invalid')).status, 403);
  const response = await post(submission);
  assert.equal(response.status, 201);
  const receipt = await response.json();
  assert.equal(receipt.saved, true);
  const created = { id: receipt.requestId as string };
  const jobs = await db.$queryRaw<{ channel: string; recipient: string; status: string }[]>`SELECT "channel", "recipient", "status" FROM "demo_notifications"`;
  assert.equal(jobs.length, 9);
  assert.equal(jobs.filter((n) => n.channel === 'EMAIL').length, 6);
  assert.equal(jobs.filter((n) => n.channel === 'WHATSAPP').length, 3);
  assert.ok(jobs.every((n) => n.status === 'PENDING'));
  console.log('PASS: real API validation/origin checks, saved receipt and nine atomic outbox jobs');

  assert.equal((await post(submission)).status, 200);

  const repeated = await saveDemoRequest(submission, 'isolated-notification-test');
  assert.equal(repeated.created, false);
  const [a, b] = await Promise.all([
    saveDemoRequest({ ...submission, requestKey: randomUUID() }, 'duplicate-a'),
    saveDemoRequest({ ...submission, requestKey: randomUUID() }, 'duplicate-b'),
  ]);
  assert.equal(a.id, created.id); assert.equal(b.id, created.id);
  const count = await db.$queryRaw<{ n: number }[]>`SELECT COUNT(*)::int AS n FROM "demo_notifications"`;
  assert.equal(count[0].n, 9);
  console.log('PASS: repeated and concurrent duplicate submissions do not duplicate notifications');

  // Make the outbox insert fail inside the request transaction.
  await setup.query('ALTER TABLE "demo_notifications" ADD CONSTRAINT "test_block_inserts" CHECK (false) NOT VALID');
  const rollbackKey = randomUUID();
  await assert.rejects(saveDemoRequest({ ...submission, requestKey: rollbackKey, details: { ...submission.details, fullName: 'Must Roll Back' } }, 'rollback-case'));
  await setup.query('ALTER TABLE "demo_notifications" DROP CONSTRAINT "test_block_inserts"');
  const rolledBack = await db.$queryRaw<{ n: number }[]>`SELECT COUNT(*)::int AS n FROM "demo_requests" WHERE "requestKey"=${rollbackKey}::uuid`;
  assert.equal(rolledBack[0].n, 0);
  console.log('PASS: outbox/config failure rolls the new request back atomically');

  const claimed = await Promise.all(Array.from({ length: 6 }, () => queue.claimNextNotification('EMAIL')));
  assert.ok(claimed.every(Boolean));
  const emailJobs = claimed.filter((job) => job !== null);
  assert.equal(new Set(emailJobs.map((job) => job.id)).size, 6);
  assert.equal(await queue.claimNextNotification('EMAIL'), null);
  const first = emailJobs[0];
  assert.equal(first.details.id, created.id);
  assert.equal(first.details.companyName, submission.details.companyName);
  assert.equal(await queue.markNotificationSent(first), true);
  assert.equal(await queue.markNotificationFailed(first, 'SHOULD_NOT_RETRY'), false);
  console.log('PASS: concurrent claims are unique and SENT jobs cannot be retried by stale workers');

  const retry = emailJobs[1];
  assert.equal(await queue.markNotificationFailed(retry, 'SECRET raw provider response'), true);
  const delayed = await db.$queryRaw<{ status: string; lastError: string; future: boolean }[]>`
    SELECT "status", "lastError", "availableAt">CURRENT_TIMESTAMP AS future FROM "demo_notifications" WHERE "id"=${retry.id}::uuid`;
  assert.equal(delayed[0].status, 'PENDING'); assert.equal(delayed[0].lastError, 'DELIVERY_FAILED'); assert.equal(delayed[0].future, true);
  assert.equal(await queue.claimNextNotification('EMAIL'), null);
  await db.$executeRaw`UPDATE "demo_notifications" SET "availableAt"=CURRENT_TIMESTAMP WHERE "id"=${retry.id}::uuid`;
  const again = await queue.claimNextNotification('EMAIL');
  assert.ok(again); assert.equal(again.id, retry.id); assert.equal(again.attempts, 2);
  assert.equal(await queue.markNotificationSent(retry), false);
  assert.equal(await queue.markNotificationSent(again), true);
  console.log('PASS: delayed retries, sanitized errors and lease-token fencing');

  const crashed = emailJobs[2];
  await db.$executeRaw`UPDATE "demo_notifications" SET "lockedAt"=CURRENT_TIMESTAMP-INTERVAL '10 minutes' WHERE "id"=${crashed.id}::uuid`;
  const recovered = await queue.claimNextNotification('EMAIL');
  assert.ok(recovered); assert.equal(recovered.id, crashed.id); assert.equal(recovered.attempts, 2);
  assert.equal(await queue.markNotificationSent(crashed), false);
  await db.$executeRaw`UPDATE "demo_notifications" SET "attempts"=8 WHERE "id"=${recovered.id}::uuid`;
  assert.equal(await queue.markNotificationFailed({ ...recovered, attempts: 8 }, 'SMTP_SEND_FAILED'), true);
  const exhausted = await db.$queryRaw<{ status: string }[]>`SELECT "status" FROM "demo_notifications" WHERE "id"=${recovered.id}::uuid`;
  assert.equal(exhausted[0].status, 'FAILED');
  console.log('PASS: crash recovery and terminal failure after eight attempts');

  const disconnected = await queue.claimNextNotification('WHATSAPP');
  assert.ok(disconnected); assert.equal(await queue.releaseNotification(disconnected), true);
  const released = await db.$queryRaw<{ status: string; attempts: number }[]>`SELECT "status", "attempts" FROM "demo_notifications" WHERE "id"=${disconnected.id}::uuid`;
  assert.deepEqual(released[0], { status: 'PENDING', attempts: 0 });
  await db.$executeRaw`DELETE FROM "demo_requests" WHERE "id"=${created.id}::uuid`;
  const remaining = await db.$queryRaw<{ n: number }[]>`SELECT COUNT(*)::int AS n FROM "demo_notifications"`;
  assert.equal(remaining[0].n, 0);
  console.log('PASS: disconnect preserves attempts and deleting a request removes its queued notifications');

  const settings = await import('../lib/demo-notifications/settings');
  const seeded = await settings.listRecipients();
  assert.equal(seeded.filter((r) => r.channel === 'WHATSAPP').length, 3);
  const added = await settings.addRecipient('WHATSAPP', '+880 1700-000001');
  assert.equal(added.recipient, '8801700000001');
  await assert.rejects(settings.addRecipient('WHATSAPP', '8801700000001'), (e: unknown) => (e as { code?: string }).code === 'duplicate');
  await assert.rejects(settings.addRecipient('EMAIL', 'not-an-email'), (e: unknown) => (e as { code?: string }).code === 'invalid');
  for (const r of seeded.filter((r) => r.channel === 'EMAIL')) await settings.removeRecipient(r.id);
  await assert.rejects(settings.removeRecipient(seeded[0].id), (e: unknown) => (e as { code?: string }).code === 'notFound');
  const next = await saveDemoRequest({ ...submission, requestKey: randomUUID(), details: { ...submission.details, fullName: 'Admin Managed Recipients', phone: '+8801700000009' } }, 'recipients-case');
  assert.equal(next.created, true);
  const nextJobs = await db.$queryRaw<{ channel: string; recipient: string }[]>`SELECT "channel", "recipient" FROM "demo_notifications" WHERE "requestId"=${next.id}::uuid`;
  assert.equal(nextJobs.length, 4);
  assert.ok(nextJobs.every((j) => j.channel === 'WHATSAPP'));
  assert.ok(nextJobs.some((j) => j.recipient === '8801700000001'));
  console.log('PASS: admin-managed recipients are validated and used for new demo requests');

  let overview = await settings.getNotificationOverview();
  assert.equal(overview.worker.online, false);
  await settings.publishWorkerStatus({ state: 'qr', qr: 'data:image/png;base64,AAAA', account: null });
  overview = await settings.getNotificationOverview();
  assert.equal(overview.worker.online, true); assert.equal(overview.worker.state, 'qr'); assert.equal(overview.worker.qr, 'data:image/png;base64,AAAA');
  await settings.requestWorkerCommand('LOGOUT');
  assert.equal(await settings.takeWorkerCommand(), 'LOGOUT');
  assert.equal(await settings.takeWorkerCommand(), null);
  await db.$executeRaw`UPDATE "demo_notification_worker" SET "heartbeatAt"=CURRENT_TIMESTAMP-INTERVAL '1 minute'`;
  overview = await settings.getNotificationOverview();
  assert.equal(overview.worker.online, false); assert.equal(overview.worker.qr, null);
  console.log('PASS: worker status heartbeat, QR visibility and one-shot admin commands');
  assert.equal(await publicRecipients(), publicBefore, 'The real recipient list must not change');
  console.log('PASS: real recipient list untouched');
} finally {
  await cleanupDb?.();
  await setup.query('SET search_path TO public');
  await setup.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await setup.end();
  console.log('Isolated database test schema removed. No real notifications sent.');
}
}

main().catch((error: unknown) => {
  console.error('Notification integration test failed:', error instanceof assert.AssertionError ? error.message : error instanceof Error ? error.name : 'UnknownError');
  process.exitCode = 1;
});
