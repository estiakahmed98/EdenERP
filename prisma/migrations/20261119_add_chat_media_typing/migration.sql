-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "image_id" UUID;

-- CreateTable
CREATE TABLE "chat_images" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "sender_type" "ChatSenderType" NOT NULL,
    "sender_user_id" TEXT,
    "mime" VARCHAR(32) NOT NULL,
    "data" BYTEA NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_typing" (
    "conversation_id" UUID NOT NULL,
    "actor" VARCHAR(160) NOT NULL,
    "sender_type" "ChatSenderType" NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_typing_pkey" PRIMARY KEY ("conversation_id","actor")
);

-- CreateIndex
CREATE INDEX "chat_images_conversation_id_created_at_idx" ON "chat_images"("conversation_id", "created_at");

-- CreateIndex
CREATE INDEX "chat_typing_expires_at_idx" ON "chat_typing"("expires_at");

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "chat_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_images" ADD CONSTRAINT "chat_images_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_typing" ADD CONSTRAINT "chat_typing_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

