import { createHash, randomUUID } from "node:crypto";
import { Prisma } from "@/lib/generated/prisma/client";
import { db } from "@/lib/db";
import type {
  DemoAdminData,
  DemoRequestRow,
  DemoSubmission,
} from "./validation";
import { DEMO_STATUSES } from "./validation";

export class DemoRequestError extends Error {
  constructor(
    public code: string,
    public status: number,
  ) {
    super(code);
  }
}
const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export function submissionHashes(input: DemoSubmission, now = new Date()) {
  const value = JSON.stringify(input.details);
  return {
    payloadHash: hash(value),
    dedupeKey: hash(`${now.toISOString().slice(0, 10)}|${value}`),
  };
}
/** Existing parameterized Prisma connection works without hot-reload delegate drift. */
export async function saveDemoRequest(input: DemoSubmission, ip: string) {
  const now = new Date();
  const { payloadHash, dedupeKey } = submissionHashes(input, now);
  return db.$transaction(async (tx) => {
    const previous = await tx.$queryRaw<
      { id: string; payloadHash: string }[]
    >`SELECT "id", "payloadHash" FROM "demo_requests" WHERE "requestKey" = ${input.requestKey}::uuid`;
    if (previous[0]) {
      if (previous[0].payloadHash !== payloadHash)
        throw new DemoRequestError("REQUEST_CHANGED", 409);
      return { id: previous[0].id, created: false };
    }
    const duplicate = await tx.$queryRaw<
      { id: string }[]
    >`SELECT "id" FROM "demo_requests" WHERE "dedupeKey" = ${dedupeKey}`;
    if (duplicate[0]) return { id: duplicate[0].id, created: false };
    // Database-backed limit is shared by workers; IPs are never stored in clear text.
    const bucket = hash(
      `${process.env.NEXTAUTH_SECRET ?? "demo-request"}|${ip}|${Math.floor(now.getTime() / 3600000)}`,
    );
    await tx.$executeRaw`DELETE FROM "demo_request_rate_limits" WHERE "expiresAt" < ${now}`;
    const rate = await tx.$queryRaw<
      { count: number }[]
    >`INSERT INTO "demo_request_rate_limits" ("key","count","expiresAt") VALUES (${bucket},1,${new Date(now.getTime() + 3600000)}) ON CONFLICT ("key") DO UPDATE SET "count"="demo_request_rate_limits"."count"+1 RETURNING "count"`;
    if (rate[0].count > 5) throw new DemoRequestError("RATE_LIMITED", 429);
    const value = input.details;
    const id = randomUUID();
    const modules = Prisma.sql`ARRAY[${Prisma.join(value.modules.length ? value.modules.map((v) => Prisma.sql`${v}`) : [Prisma.sql`NULL`])}]::text[]`;
    const rows = await tx.$queryRaw<{ id: string }[]>(Prisma.sql`
      INSERT INTO "demo_requests" ("id","requestKey","dedupeKey","payloadHash","fullName","companyName","phone","shareMore","email","modules","message","locale","updatedAt")
      VALUES (${id}::uuid,${input.requestKey}::uuid,${dedupeKey},${payloadHash},${value.fullName},${value.companyName},${value.phone},${value.shareMore},${value.email || null},array_remove(${modules},NULL),${value.message || null},${input.locale},CURRENT_TIMESTAMP)
      ON CONFLICT DO NOTHING RETURNING "id"
    `);
    if (rows[0]) return { id: rows[0].id, created: true };
    // A competing request can win either unique constraint while this transaction waits.
    const committed = await tx.$queryRaw<
      { id: string; payloadHash: string }[]
    >`SELECT "id","payloadHash" FROM "demo_requests" WHERE "requestKey"=${input.requestKey}::uuid OR "dedupeKey"=${dedupeKey}`;
    const same = committed.find((row) => row.payloadHash === payloadHash);
    if (!same) throw new DemoRequestError("REQUEST_CHANGED", 409);
    return { id: same.id, created: false };
  });
}

type StoredRow = Omit<DemoRequestRow, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};
const publicColumns = Prisma.sql`"id","fullName","companyName","phone","shareMore","email","modules","message","locale","status","adminNotes","version","createdAt","updatedAt"`;
export async function getDemoRequests(query: {
  q: string;
  status: string;
  page: number;
}): Promise<DemoAdminData> {
  const conditions: Prisma.Sql[] = [];
  if (query.status !== "ALL")
    conditions.push(Prisma.sql`"status"::text=${query.status}`);
  if (query.q) {
    const search = `%${query.q.replace(/[\\%_]/g, (v) => "\\" + v)}%`;
    conditions.push(
      Prisma.sql`("fullName" ILIKE ${search} OR "companyName" ILIKE ${search} OR "phone" ILIKE ${search} OR "email" ILIKE ${search})`,
    );
  }
  const where = conditions.length
    ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
    : Prisma.empty;
  const pageSize = 20;
  const [rows, count, groups] = await db.$transaction([
    db.$queryRaw<StoredRow[]>(
      Prisma.sql`SELECT ${publicColumns} FROM "demo_requests" ${where} ORDER BY "createdAt" DESC,"id" DESC LIMIT ${pageSize} OFFSET ${(query.page - 1) * pageSize}`,
    ),
    db.$queryRaw<{ total: number }[]>(
      Prisma.sql`SELECT COUNT(*)::int AS total FROM "demo_requests" ${where}`,
    ),
    db.$queryRaw<
      { status: DemoRequestRow["status"]; total: number }[]
    >`SELECT "status",COUNT(*)::int AS total FROM "demo_requests" GROUP BY "status"`,
  ]);
  const counts = Object.fromEntries(
    DEMO_STATUSES.map((status) => [
      status,
      groups.find((row) => row.status === status)?.total ?? 0,
    ]),
  ) as DemoAdminData["counts"];
  return {
    requests: rows.map((row) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    total: count[0].total,
    page: query.page,
    pageSize,
    counts,
  };
}
export async function updateDemoRequest(input: {
  id: string;
  version: number;
  status: string;
  adminNotes: string;
}) {
  const rows = await db.$queryRaw<
    StoredRow[]
  >`UPDATE "demo_requests" SET "status"=${input.status}::"DemoRequestStatus","adminNotes"=${input.adminNotes},"version"="version"+1,"updatedAt"=CURRENT_TIMESTAMP WHERE "id"=${input.id}::uuid AND "version"=${input.version} RETURNING ${publicColumns}`;
  if (!rows[0]) throw new DemoRequestError("UPDATE_CONFLICT", 409);
  return {
    ...rows[0],
    createdAt: rows[0].createdAt.toISOString(),
    updatedAt: rows[0].updatedAt.toISOString(),
  };
}
