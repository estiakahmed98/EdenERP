import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

function load(relative) {
  const output = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", output)(module, module.exports);
  return module.exports;
}
const { marginScenario, remainingDays, compareDates } = load(
  "../components/merchandising/calculations.ts",
);
const data = load("../components/merchandising/data.ts");
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`);

// Per-piece USD scenario: cents are rounded before multiplication.
const scenario = marginScenario(16.4, 15.02, 1000);
assert.equal(scenario.revenue, 16400);
assert.equal(scenario.cost, 15020);
assert.equal(scenario.net, 1380);
close(scenario.margin, 8.414634146341463);
assert.equal(marginScenario(0.1, 0.05, 3).net, 0.15);
assert.equal(marginScenario(10, 12, 1).margin, -20);
for (const price of [0, 0.001, -1, NaN, Infinity, 1000001])
  assert.throws(() => marginScenario(price, 1));
for (const cost of [-1, NaN, Infinity, 1000001])
  assert.throws(() => marginScenario(1, cost));
for (const qty of [0, -1, 1.5, NaN, 1000001])
  assert.throws(() => marginScenario(1, 1, qty));

assert.deepEqual(remainingDays(8400, 7002, 500), {
  remaining: 1398,
  days: 2.796,
});
assert.deepEqual(remainingDays(9600, 10501, 0), { remaining: 0, days: 0 });
assert.deepEqual(remainingDays(100, 50, 0), { remaining: 50, days: null });
close(remainingDays(2440, 0, 4200).days, 2440 / 4200);
for (const pace of [-1, 0.5, NaN, 1000001])
  assert.throws(() => remainingDays(100, 50, pace));
assert.throws(() => remainingDays(0, 0, 100));
assert.throws(() => remainingDays(100, -1, 100));

// UTC date-only arithmetic is independent of browser locale, time of day and DST.
assert.deepEqual(compareDates("2026-10-02", "2026-10-04", "2026-10-05"), {
  delay: 2,
  wallDelay: -1,
});
assert.equal(compareDates("2026-10-04", "2026-10-02").delay, -2);
assert.equal(compareDates("2026-10-04", "2026-10-04").delay, 0);
assert.equal(compareDates("2024-02-28", "2024-03-01").delay, 2);
assert.equal(compareDates("2026-12-31", "2027-01-01").delay, 1);
for (const date of [
  "",
  "2026-02-29",
  "2026-04-31",
  "2026-13-01",
  "2026-00-01",
  "1999-12-31",
  "2101-01-01",
  "2026-1-2",
])
  assert.throws(() => compareDates(date, "2026-10-04"));

// Independent source-total checks; cropped excerpts are not expanded to match aggregates.
assert.equal(
  data.owners.reduce((sum, row) => sum + row.late, 0),
  64,
);
assert.equal(
  data.tnaStates.reduce((sum, row) => sum + row.value, 0),
  510,
);
assert.equal(
  data.receipts.reduce((sum, row) => sum + row.qty, 0),
  8400,
);
assert.equal(
  data.receipts.reduce((sum, row) => sum + row.cartons, 0),
  750,
);
assert.equal(
  data.receipts
    .filter((row) => row.mode === "Memo")
    .reduce((sum, row) => sum + row.qty, 0),
  5400,
);
assert.ok(
  data.receipts
    .filter((row) => row.mode === "Memo")
    .every((row) => row.value === null),
);
assert.equal(
  data.factories.reduce((sum, row) => sum + row.wip, 0),
  6440,
);
assert.equal(
  data.factories.flatMap((row) => row.certificates).filter((row) => row.alert)
    .length,
  3,
);
assert.equal(
  data.profitSummary.revenue - data.profitSummary.cost,
  data.profitSummary.net,
);
assert.equal(data.styles.length, 5);
assert.equal(data.styles[0].margin, 9.1);
assert.equal(data.milestones.length, 7);
assert.equal(data.materials.length, 7);
assert.equal(data.production.length, 5);
assert.ok(data.production.some((row) => row.sewn > row.qty));
assert.equal(data.materials.find((row) => row.id === "000009").short, null);
assert.equal(data.portalUsers.length, 3);
assert.equal(
  data.portalUsers.find((row) => row.role === "QA").canApprove,
  false,
);
assert.equal(
  data.profits.find((row) => row.mode === "Commission").actualCost,
  null,
);
assert.equal(data.merchandisingSlugs.length, 9);
for (const slug of data.merchandisingSlugs) {
  const route = fs.readFileSync(
    `app/[locale]/apps/merchandising/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`slug="${slug}"`) && !route.includes("ComingSoonPage"),
  );
  assert.equal(data.pages[slug].steps.length, 4);
  assert.ok(
    data.pages[slug].related.every(
      (item) => item !== slug && data.merchandisingSlugs.includes(item),
    ),
  );
}
console.log(
  "PASS: Merchandising margin, capacity/date boundaries, source totals, unknown-value preservation and all nine route mappings.",
);
