-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "reactions_updated_at" TIMESTAMPTZ(3);

-- CreateTable
CREATE TABLE "chat_reactions" (
    "message_id" UUID NOT NULL,
    "actor" VARCHAR(64) NOT NULL,
    "emoji" VARCHAR(16) NOT NULL,

    CONSTRAINT "chat_reactions_pkey" PRIMARY KEY ("message_id","actor")
);

-- AddForeignKey
ALTER TABLE "chat_reactions" ADD CONSTRAINT "chat_reactions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

