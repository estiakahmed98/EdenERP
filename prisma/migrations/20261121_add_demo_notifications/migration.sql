CREATE TABLE "demo_notifications" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "channel" VARCHAR(16) NOT NULL,
    "recipient" VARCHAR(254) NOT NULL,
    "status" VARCHAR(16) NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "availableAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMPTZ(3),
    "lockToken" UUID,
    "lastError" VARCHAR(160),
    "sentAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "demo_notifications_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "demo_notifications_channel_check" CHECK ("channel" IN ('EMAIL', 'WHATSAPP')),
    CONSTRAINT "demo_notifications_status_check" CHECK ("status" IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED')),
    CONSTRAINT "demo_notifications_attempts_check" CHECK ("attempts" >= 0)
);

CREATE UNIQUE INDEX "demo_notifications_requestId_channel_recipient_key"
ON "demo_notifications"("requestId", "channel", "recipient");

CREATE INDEX "demo_notifications_channel_status_availableAt_idx"
ON "demo_notifications"("channel", "status", "availableAt");

ALTER TABLE "demo_notifications" ADD CONSTRAINT "demo_notifications_requestId_fkey"
FOREIGN KEY ("requestId") REFERENCES "demo_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
