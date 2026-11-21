# Demo request notifications

After a visitor submits a valid **Request a Live Demo** form, the application saves the demo request and its notification jobs in one PostgreSQL transaction. A separate worker sends an email to each configured email address and a WhatsApp message to each configured WhatsApp number. The visitor does not need to open WhatsApp or press Send.

The form and shared `components/ui/dialog.tsx` do not manage delivery. The website accepts requests even when the delivery worker is offline; pending jobs remain in the database.

## Initial setup

Install dependencies, generate the Prisma client and apply migrations:

```powershell
npm install
npx prisma generate
npx prisma migrate deploy
```

Set server-only configuration in the ignored `.env` file. Use `.env.example` as the reference. Never put credentials in a variable beginning with `NEXT_PUBLIC_`.

```dotenv
DEMO_NOTIFICATIONS_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=adonerp4@gmail.com
SMTP_PASSWORD="your Gmail app password"
SMTP_FROM_NAME="Adon ERP"
WHATSAPP_AUTH_PATH=.wwebjs_auth
NEXT_PUBLIC_SITE_URL=https://adonerp.com.bd
```

The SMTP user must be the Gmail account that generated the app password. SMTP verification checks login without sending a message:

```powershell
npm run notifications:worker -- --check
```

Restart the website after changing its notification configuration. Existing demo requests are not automatically notified; only new submissions enqueue jobs. Duplicate form submissions reuse the saved request and do not add another set of jobs.

## Admin panel: Notifications

Signed-in administrators manage delivery at **Admin → Notifications** (`/admin/notifications`):

- **WhatsApp sender** — connection status, the login QR code while waiting for a scan, the linked sender number, and an action to unlink it (or restart a stuck session) so another phone can be linked.
- **WhatsApp numbers / Email addresses** — the recipients. Each new demo request creates one job per recipient. WhatsApp numbers must include the country code (for example `8801XXXXXXXXX`). Changes apply to new demo requests only; queued jobs keep their original recipients. Up to 25 recipients per channel.
- **Delivery status** — counts per channel and status, recent jobs, and **Retry failed** (same as `npm run notifications:retry`).

Recipients are stored in the `demo_notification_recipients` table. The migration seeds the previously agreed six emails and three WhatsApp numbers. `DEMO_NOTIFICATION_EMAILS` and `DEMO_NOTIFICATION_WHATSAPP` are no longer read.

The website and worker communicate only through the database: the worker publishes a heartbeat, WhatsApp state and QR image to `demo_notification_worker` every 3 seconds, and the admin panel writes one-shot commands (unlink) there. If the heartbeat is older than 30 seconds the panel shows **Worker not running**. The QR image is only returned to administrators and is cleared once WhatsApp connects or the worker stops.

## Connect WhatsApp

Run this process in addition to the website:

```powershell
npm run notifications:worker
```

Open **Admin → Notifications**. When the status shows **Waiting for scan**, on the sender phone open **WhatsApp → Linked devices → Link a device** and scan the QR code shown there. The worker also prints the QR in its terminal and saves `.wwebjs_auth/login-qr.png` as a fallback. Keep the QR private. A dedicated sender number is preferable; the configured numbers are recipients.

The bot uses `whatsapp-web.js` and WhatsApp Web, not the official Cloud API. It needs a running Node.js process, Chromium and persistent storage. Its saved `LocalAuth` session normally survives restarts, but logout, a revoked linked device or an expired session requires another QR scan. Do not delete the auth directory or add its contents to Git.

The worker keeps email and WhatsApp delivery independent. Email can continue while WhatsApp waits for QR login. A database advisory lock prevents two workers from using the same account for the same database.

## Run continuously

Keep both the application and notification worker running under a process supervisor on a machine with persistent storage. The worker must run as a persistent process; it should not be started from a Next.js request handler. If the website runs elsewhere, the worker can run on a separate machine with access to the same database and notification configuration.

The worker defaults to Chromium's normal sandbox. Only enable an explicit `WHATSAPP_NO_SANDBOX=true` override when the hosting environment requires it and provides equivalent process isolation. `WHATSAPP_EXECUTABLE_PATH` can select an existing compatible Chrome/Chromium installation. If Puppeteer's browser was not installed (for example, npm blocked its install script), run `npm run notifications:browser:install` or configure that executable path.

No library per-message fee is charged by this integration. The machine running the worker may incur hosting costs. WhatsApp Web automation can disconnect or be restricted by WhatsApp; it does not offer a delivery guarantee.

## Delivery status and retries

```powershell
npm run notifications:status
npm run notifications:retry
```

Status shows channel counts without displaying lead information or credentials. Notification states are `PENDING`, `PROCESSING`, `SENT` and `FAILED`. Each recipient has an independent job, so a failure for one destination does not resend messages already accepted for another destination.

Failed attempts use delayed retries. After the maximum attempt count, a job stays `FAILED` for inspection. `notifications:retry` resets failed jobs to pending; it does not resend jobs already marked sent. Unavailable or disconnected transports leave jobs queued without consuming delivery attempts.

`SENT` means the transport accepted the notification, not that a person read it. Delivery is at least once: if a transport accepts a message but the worker crashes before recording success, lease recovery may send a duplicate. SMTP message IDs are stable for a notification, but recipient systems may still display duplicate email.

To pause new notification creation and worker delivery, set `DEMO_NOTIFICATIONS_ENABLED=false` and restart the application and worker. Previously queued jobs remain stored and can be sent after enabling delivery again.

## Verification

`npm test` covers recipient validation, message escaping and retry policy. `npm run notifications:test` exercises the migration, atomic request/outbox insertion, duplicate submissions, concurrent claims, lease recovery and retries in a temporary PostgreSQL schema, including a non-UTC database session. It uses the configured database with permission to create a schema, removes its temporary schema afterward, and sends no external messages. It does not process the application's real queue.
