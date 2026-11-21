-- Match the Prisma schema as well as the original notification migration.
-- Prisma's @updatedAt alone is client-side; raw SQL requires a database default
-- or an explicit timestamp. The enqueue query also supplies its own timestamp.
ALTER TABLE "demo_notifications"
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
