-- Recipients become admin-managed (previously DEMO_NOTIFICATION_EMAILS / DEMO_NOTIFICATION_WHATSAPP).
CREATE TABLE "demo_notification_recipients" (
    "id" UUID NOT NULL,
    "channel" VARCHAR(16) NOT NULL,
    "recipient" VARCHAR(254) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "demo_notification_recipients_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "demo_notification_recipients_channel_check" CHECK ("channel" IN ('EMAIL', 'WHATSAPP'))
);

CREATE UNIQUE INDEX "demo_notification_recipients_channel_recipient_key"
ON "demo_notification_recipients"("channel", "recipient");

-- Seed the previously agreed recipients so delivery continues unchanged after deploy.
INSERT INTO "demo_notification_recipients" ("id", "channel", "recipient")
SELECT gen_random_uuid(), seed."channel", seed."recipient"
FROM (VALUES
    ('EMAIL', 'estiakahmed898@gmail.com'),
    ('EMAIL', 'talat.md@gmail.com'),
    ('EMAIL', 'adonventure@gmail.com'),
    ('EMAIL', 'support@adonerp.com'),
    ('EMAIL', 'support@adonerp.com.bd'),
    ('EMAIL', 'support@adonerp.bd'),
    ('WHATSAPP', '8801842781978'),
    ('WHATSAPP', '8801805412462'),
    ('WHATSAPP', '8801805434469')
) AS seed("channel", "recipient")
ON CONFLICT ("channel", "recipient") DO NOTHING;

-- Single-row status the worker publishes (heartbeat, WhatsApp state, QR) and
-- the admin panel reads. "command" lets an admin ask the worker to act.
CREATE TABLE "demo_notification_worker" (
    "id" VARCHAR(32) NOT NULL,
    "state" VARCHAR(16) NOT NULL DEFAULT 'disconnected',
    "qr" TEXT,
    "account" VARCHAR(32),
    "command" VARCHAR(16),
    "commandAt" TIMESTAMPTZ(3),
    "heartbeatAt" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "demo_notification_worker_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "demo_notification_worker_command_check" CHECK ("command" IS NULL OR "command" IN ('LOGOUT'))
);

INSERT INTO "demo_notification_worker" ("id") VALUES ('whatsapp') ON CONFLICT DO NOTHING;
