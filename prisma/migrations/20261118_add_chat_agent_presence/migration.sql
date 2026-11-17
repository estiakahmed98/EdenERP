-- CreateTable
CREATE TABLE "chat_agent_presence" (
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(120),
    "last_seen_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_agent_presence_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "chat_agent_presence_last_seen_at_idx" ON "chat_agent_presence"("last_seen_at");
