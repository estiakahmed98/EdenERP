-- CreateEnum
CREATE TYPE "DemoRequestStatus" AS ENUM ('NEW', 'CONTACTED', 'SCHEDULED', 'CLOSED');

-- CreateTable
CREATE TABLE "demo_requests" (
    "id" UUID NOT NULL,
    "requestKey" UUID NOT NULL,
    "dedupeKey" VARCHAR(64) NOT NULL,
    "payloadHash" VARCHAR(64) NOT NULL,
    "fullName" VARCHAR(120) NOT NULL,
    "companyName" VARCHAR(160) NOT NULL,
    "phone" VARCHAR(40) NOT NULL,
    "shareMore" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(254),
    "modules" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "message" TEXT,
    "locale" VARCHAR(8) NOT NULL DEFAULT 'en',
    "status" "DemoRequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT NOT NULL DEFAULT '',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "demo_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demo_request_rate_limits" (
    "key" VARCHAR(64) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "demo_request_rate_limits_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "demo_requests_requestKey_key" ON "demo_requests"("requestKey");

-- CreateIndex
CREATE UNIQUE INDEX "demo_requests_dedupeKey_key" ON "demo_requests"("dedupeKey");

-- CreateIndex
CREATE INDEX "demo_requests_createdAt_idx" ON "demo_requests"("createdAt");

-- CreateIndex
CREATE INDEX "demo_requests_status_createdAt_idx" ON "demo_requests"("status", "createdAt");

-- CreateIndex
CREATE INDEX "demo_request_rate_limits_expiresAt_idx" ON "demo_request_rate_limits"("expiresAt");

