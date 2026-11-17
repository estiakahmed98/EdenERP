-- CreateEnum
CREATE TYPE "ChatConversationStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "ChatSenderType" AS ENUM ('VISITOR', 'ADMIN', 'SYSTEM');

-- CreateTable
CREATE TABLE "chat_conversations" (
    "id" UUID NOT NULL,
    "token_hash" VARCHAR(64) NOT NULL,
    "user_id" TEXT,
    "visitor_name" VARCHAR(120) NOT NULL,
    "visitor_email" VARCHAR(254),
    "visitor_phone" VARCHAR(40),
    "locale" VARCHAR(8) NOT NULL DEFAULT 'en',
    "status" "ChatConversationStatus" NOT NULL DEFAULT 'OPEN',
    "start_path" VARCHAR(512),
    "current_path" VARCHAR(512),
    "user_agent" VARCHAR(512),
    "ip_hash" VARCHAR(64),
    "visitor_last_seen_at" TIMESTAMPTZ(3),
    "last_message_at" TIMESTAMPTZ(3),
    "last_message_preview" VARCHAR(200),
    "closed_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "sender_type" "ChatSenderType" NOT NULL,
    "sender_user_id" TEXT,
    "sender_name" VARCHAR(120),
    "body" TEXT NOT NULL,
    "client_id" VARCHAR(64) NOT NULL,
    "delivered_at" TIMESTAMPTZ(3),
    "read_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_conversations_token_hash_key" ON "chat_conversations"("token_hash");

-- CreateIndex
CREATE INDEX "chat_conversations_status_last_message_at_idx" ON "chat_conversations"("status", "last_message_at");

-- CreateIndex
CREATE INDEX "chat_conversations_user_id_idx" ON "chat_conversations"("user_id");

-- CreateIndex
CREATE INDEX "chat_conversations_last_message_at_idx" ON "chat_conversations"("last_message_at");

-- CreateIndex
CREATE INDEX "chat_messages_conversation_id_created_at_idx" ON "chat_messages"("conversation_id", "created_at");

-- CreateIndex
CREATE INDEX "chat_messages_conversation_id_sender_type_read_at_idx" ON "chat_messages"("conversation_id", "sender_type", "read_at");

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_conversation_id_client_id_key" ON "chat_messages"("conversation_id", "client_id");

-- AddForeignKey
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

