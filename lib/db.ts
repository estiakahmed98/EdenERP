import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Bound the per-process pool. node-postgres defaults to 10, and `next build`
 * runs ~11 static-generation workers, each with its own client: that exceeded
 * Postgres' default max_connections (100) and silently dropped DB-backed
 * content (blog URLs vanished from the sitemap). The same applies to several
 * production instances. Override with DATABASE_POOL_MAX.
 */
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const poolMax = Number(process.env.DATABASE_POOL_MAX) || (isBuild ? 3 : 5);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      max: poolMax,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
