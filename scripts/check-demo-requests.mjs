import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash, randomUUID } from "node:crypto";
import ts from "typescript";

const require = createRequire(import.meta.url);
function loader(overrides = {}) {
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(file);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} };
    cache.set(absolute, module);
    const source = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;
    function resolve(id) {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (id.startsWith("@/") || id.startsWith(".")) {
        const target = id.startsWith("@/")
          ? path.resolve(id.slice(2))
          : path.resolve(path.dirname(absolute), id);
        if (fs.existsSync(target + ".ts")) return load(target + ".ts");
        return require(target);
      }
      return require(id);
    }
    new Function("require", "module", "exports", source)(
      resolve,
      module,
      module.exports,
    );
    return module.exports;
  }
  return load;
}
const unitLoad = loader({
  "@/lib/db": {
    db: {
      $transaction: async () => {
        throw new Error("Unit-test database failure");
      },
    },
  },
});
const validation = unitLoad("lib/demo-requests/validation.ts");
const basic = {
  fullName: "Alex Tester",
  companyName: "Example Company",
  phone: "+1 (555) 555-0123",
};
const parsed = validation.demoDetailsSchema.parse(basic);
assert.equal(parsed.phone, "+15555550123");
assert.equal(parsed.shareMore, false);
for (const field of ["fullName", "companyName", "phone"])
  assert.equal(
    validation.demoDetailsSchema.safeParse({ ...basic, [field]: "" }).success,
    false,
  );
assert(
  validation.demoDetailsSchema.safeParse({ ...basic, shareMore: true }).success,
);
assert.equal(
  validation.demoDetailsSchema.safeParse({
    ...basic,
    shareMore: true,
    email: "bad",
  }).success,
  false,
);
const hidden = validation.demoDetailsSchema.parse({
  ...basic,
  shareMore: false,
  email: "not-an-email",
  modules: ["Accounting"],
  message: "Hidden information",
});
assert.equal(hidden.email, "");
assert.deepEqual(hidden.modules, []);
assert.equal(hidden.message, "");
assert.deepEqual(
  validation.demoDetailsSchema.parse({
    ...basic,
    shareMore: true,
    modules: ["Accounting", "Accounting"],
  }).modules,
  ["Accounting"],
);
for (const overrides of [
  { phone: "123" },
  { phone: "a555555555" },
  { phone: "1".repeat(16) },
  { message: "x".repeat(2001) },
  { modules: ["Not a module"] },
])
  assert.equal(
    validation.demoDetailsSchema.safeParse({ ...basic, ...overrides }).success,
    false,
  );
assert(
  !validation.demoSubmissionSchema.safeParse({
    requestKey: randomUUID(),
    details: basic,
    website: "spam",
  }).success,
);
assert(!validation.demoReceiptSchema.safeParse({ saved: true }).success);
assert(
  !validation.demoReceiptSchema.safeParse({
    saved: false,
    requestId: randomUUID(),
  }).success,
);
const english = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
assert.equal(english.common.demoRequest.submit, "Request a Live Demo");
assert.equal(
  english.common.demoRequest.success,
  "Thank you! Our team will contact you shortly to arrange your demo.",
);
const dialog = fs.readFileSync(
  "components/demo-booking/booking-dialog.tsx",
  "utf8",
);
assert(
  !/Calendar|preferenceTimes|setStep|plannerSettings|localStorage/.test(dialog),
);
for (const [, key] of dialog.matchAll(/\bt\("([^"]+)"/g))
  assert.equal(typeof english.common.demoRequest[key], "string", key);

const { NextRequest } = require("next/server");
const route = unitLoad("app/api/demo-requests/route.ts");
const request = (
  body,
  origin = "http://localhost:3000",
  type = "application/json",
) =>
  new NextRequest("http://localhost:3000/api/demo-requests", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": type },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
assert.equal((await route.POST(request({}))).status, 400);
assert.equal(
  (await route.POST(request({}, "https://another.example"))).status,
  403,
);
assert.equal(
  (await route.POST(request("bad", undefined, "text/plain"))).status,
  415,
);
assert.equal((await route.POST(request("x".repeat(17000)))).status, 413);
const priorError = console.error;
console.error = () => {};
const failed = await route.POST(
  request({ details: basic, requestKey: randomUUID() }),
);
console.error = priorError;
assert.equal(failed.status, 503);
assert.equal((await failed.json()).saved, undefined);
let authSession = null;
const admin = loader({
  "next-auth/next": { getServerSession: async () => authSession },
  "@/lib/auth": { authOptions: {} },
  "@/lib/db": { db: {} },
})("app/api/admin/demo-requests/route.ts");
assert.equal(
  (
    await admin.GET(
      new NextRequest("http://localhost:3000/api/admin/demo-requests"),
    )
  ).status,
  401,
);
authSession = { user: { role: "USER" } };
assert.equal(
  (
    await admin.GET(
      new NextRequest("http://localhost:3000/api/admin/demo-requests"),
    )
  ).status,
  401,
);
authSession = { user: { role: "ADMIN" } };
assert.equal(
  (
    await admin.GET(
      new NextRequest("http://localhost:3000/api/admin/demo-requests?page=0"),
    )
  ).status,
  400,
);
console.log(
  "PASS: three required fields, optional details, hidden-data stripping, validation, real-acknowledgement contract, body/origin limits, failed-database response and admin role boundaries.",
);

if (!process.argv.includes("--integration")) process.exit(0);
await import("dotenv/config");
const dbUrl = process.env.DATABASE_URL;
assert(
  dbUrl &&
    ["localhost", "127.0.0.1", "::1", "[::1]"].includes(
      new URL(dbUrl).hostname,
    ),
  "Integration tests require the audited local database.",
);
const base =
  process.argv.find((arg) => arg.startsWith("--base-url="))?.slice(11) ??
  "http://localhost:3000";
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Integration tests must target a local app.",
);
const { PrismaClient, Prisma } = require("../lib/generated/prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: dbUrl }),
});
const service = loader({ "@/lib/db": { db } })("lib/demo-requests/service.ts");
const run = randomUUID(),
  company = "Integration-only " + run;
const keys = new Set(),
  ips = new Set();
const startHour = Math.floor(Date.now() / 3600000);
function payload(name, extra = {}) {
  const requestKey = randomUUID();
  keys.add(requestKey);
  return {
    requestKey,
    details: { ...basic, companyName: company, fullName: name, ...extra },
  };
}
async function post(body, ip = "198.51.100.63:" + randomUUID()) {
  keys.add(body.requestKey);
  ips.add(ip);
  const response = await fetch(base + "/api/demo-requests", {
    method: "POST",
    headers: {
      Origin: new URL(base).origin,
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  return { status: response.status, data: await response.json() };
}
async function stored(id) {
  const rows =
    await db.$queryRaw`SELECT * FROM demo_requests WHERE id=${id}::uuid`;
  return rows[0];
}
try {
  const minimum = payload("Minimum Fields");
  const first = await post(minimum);
  assert.equal(first.status, 201);
  assert(first.data.saved);
  const row = await stored(first.data.requestId);
  assert.equal(row.phone, "+15555550123");
  assert.equal(row.email, null);
  assert.deepEqual(row.modules, []);
  assert.equal(row.message, null);
  const retry = await post(minimum);
  assert.equal(retry.status, 200);
  assert.equal(retry.data.requestId, row.id);
  const duplicate = await post({ ...minimum, requestKey: randomUUID() });
  assert.equal(duplicate.status, 200);
  assert.equal(duplicate.data.requestId, row.id);
  assert.equal(
    (
      await post({
        ...minimum,
        details: { ...minimum.details, fullName: "Changed Request" },
      })
    ).status,
    409,
  );
  assert.equal(
    (
      await post(
        payload("Invalid Optional", { shareMore: true, email: "invalid" }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await post(payload("Blank Optional", { shareMore: true }))).status,
    201,
  );
  const detailResult = await post(
    payload("Full Optional", {
      shareMore: true,
      email: " ALEX@EXAMPLE.TEST ",
      modules: ["Manufacturing", "Accounting"],
      message: "Discuss a workflow.",
    }),
  );
  assert.equal(detailResult.status, 201);
  const detailRow = await stored(detailResult.data.requestId);
  assert.equal(detailRow.email, "alex@example.test");
  assert.deepEqual(detailRow.modules, ["Accounting", "Manufacturing"]);
  assert.equal(detailRow.message, "Discuss a workflow.");
  const noResult = await post(
    payload("No Optional", {
      shareMore: false,
      email: "invalid-hidden-email",
      modules: ["Accounting"],
      message: "Hidden and discarded",
    }),
  );
  const noRow = await stored(noResult.data.requestId);
  assert.equal(noRow.email, null);
  assert.equal(noRow.message, null);
  assert.deepEqual(noRow.modules, []);
  const racing = payload("Concurrent Request");
  const race = await Promise.all([
    post(racing),
    post({ ...racing, requestKey: randomUUID() }),
  ]);
  assert.deepEqual(race.map((value) => value.status).sort(), [200, 201]);
  assert.equal(race[0].data.requestId, race[1].data.requestId);
  const rateIp = "198.51.100.64:" + run;
  for (let index = 0; index < 6; index++)
    assert.equal(
      (await post(payload("Rate Check " + index), rateIp)).status,
      index < 5 ? 201 : 429,
    );
  const list = await service.getDemoRequests({
    q: run,
    status: "ALL",
    page: 1,
  });
  assert.equal(list.total, 10);
  assert.equal(
    (
      await service.getDemoRequests({
        q: "' OR 1=1 --",
        status: "ALL",
        page: 1,
      })
    ).total,
    0,
  );
  const updated = await service.updateDemoRequest({
    id: row.id,
    version: 0,
    status: "CONTACTED",
    adminNotes: "Follow-up recorded by integration test.",
  });
  assert.equal(updated.version, 1);
  assert.equal(updated.status, "CONTACTED");
  await assert.rejects(
    service.updateDemoRequest({
      id: row.id,
      version: 0,
      status: "CLOSED",
      adminNotes: "Stale edit",
    }),
    (error) => error.code === "UPDATE_CONFLICT",
  );
  const edits = await Promise.allSettled([
    service.updateDemoRequest({
      id: row.id,
      version: 1,
      status: "SCHEDULED",
      adminNotes: "First concurrent edit",
    }),
    service.updateDemoRequest({
      id: row.id,
      version: 1,
      status: "CLOSED",
      adminNotes: "Second concurrent edit",
    }),
  ]);
  assert.equal(
    edits.filter((result) => result.status === "fulfilled").length,
    1,
  );
  assert.equal(
    edits.find((result) => result.status === "rejected").reason.code,
    "UPDATE_CONFLICT",
  );
  assert.equal((await stored(row.id)).version, 2);
  const unauthorized = await fetch(base + "/api/admin/demo-requests");
  assert.equal(unauthorized.status, 401);
  console.log(
    "PASS: real HTTP/PostgreSQL persistence, optional-data policy, retry/concurrency deduplication, rate limiting, admin search/status/notes and concurrent-edit protection.",
  );
} finally {
  if (keys.size)
    await db.$executeRaw(
      Prisma.sql`DELETE FROM demo_requests WHERE "requestKey" IN (${Prisma.join([...keys].map((key) => Prisma.sql`${key}::uuid`))}) AND "companyName"=${company}`,
    );
  const rateKeys = [];
  for (const ip of ips)
    for (let hour = startHour; hour <= Math.floor(Date.now() / 3600000); hour++)
      rateKeys.push(
        createHash("sha256")
          .update(
            `${process.env.NEXTAUTH_SECRET ?? "demo-request"}|${ip}|${hour}`,
          )
          .digest("hex"),
      );
  if (rateKeys.length)
    await db.$executeRaw(
      Prisma.sql`DELETE FROM demo_request_rate_limits WHERE key IN (${Prisma.join(rateKeys)})`,
    );
  await db.$disconnect();
  console.log(
    "Removed only this run’s synthetic requests and rate buckets; existing client records were preserved.",
  );
}
