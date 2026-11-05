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

const { sizeBreakdown, trimRequirements, settlementScenario, milestoneDates } =
  load("../components/industries/apparel/calculations.ts");
const { apparelSlugs, pages, sizes, trims, milestones, examplePcd } = load(
  "../components/industries/apparel/data.ts",
);

assert.deepEqual(
  sizeBreakdown(
    3000,
    sizes.map((s) => s.ratio),
  ),
  [500, 1000, 1000, 500],
);
assert.deepEqual(sizeBreakdown(1000, [1, 2, 2, 1]), [167, 333, 333, 167]);
assert.deepEqual(sizeBreakdown(7, [1, 1, 1, 1]), [2, 2, 2, 1]);
assert.deepEqual(sizeBreakdown(3, [0, 2, 0]), [0, 3, 0]);
// Exercise conservation and zero-ratio protection, including the upper boundary.
for (const quantity of [1, 2, 7, 999, 1000000]) {
  for (const ratios of [
    [1, 2, 2, 1],
    [1000, 0, 1, 2],
    [1, 1, 1],
  ]) {
    const pieces = sizeBreakdown(quantity, ratios);
    assert.equal(
      pieces.reduce((a, b) => a + b, 0),
      quantity,
    );
    pieces.forEach((p, i) => {
      assert.ok(Number.isInteger(p) && p >= 0);
      if (ratios[i] === 0) assert.equal(p, 0);
    });
  }
}
for (const quantity of [0, -1, 1.5, 1000001, NaN, Infinity])
  assert.throws(() => sizeBreakdown(quantity, [1]));
for (const ratios of [
  [],
  [0, 0],
  [-1, 2],
  [1.5],
  [1001],
  [NaN],
  Array(21).fill(1),
])
  assert.throws(() => sizeBreakdown(10, ratios));

const required = trimRequirements(1000, 2.5, trims);
assert.deepEqual(
  required.map((r) => r.required),
  [6150, 1025, 2050, 1025],
);
assert.deepEqual(
  required.map((r) => r.short),
  [150, 25, 550, 225],
);
assert.equal(
  trimRequirements(1, 10, [{ perPiece: 100, stock: 0 }])[0].required,
  110,
);
assert.deepEqual(trimRequirements(1, 0, [{ perPiece: 1, stock: 5 }])[0], {
  required: 1,
  short: 0,
  surplus: 4,
});
assert.equal(
  trimRequirements(3, 0.01, [{ perPiece: 1, stock: 0 }])[0].required,
  4,
);
assert.equal(
  trimRequirements(1000000, 100, [{ perPiece: 100, stock: 0 }])[0].required,
  200000000,
);
for (const value of [-1, 100.01, NaN, Infinity])
  assert.throws(() => trimRequirements(1, value, trims));
for (const value of [0, -1, 1.5, 1000001, NaN])
  assert.throws(() => trimRequirements(value, 0, trims));
for (const perPiece of [-1, 0.5, 101, NaN])
  assert.throws(() => trimRequirements(1, 0, [{ perPiece, stock: 0 }]));
for (const stock of [-1, 0.5, 100000001, NaN])
  assert.throws(() => trimRequirements(1, 0, [{ perPiece: 1, stock }]));

const trade = settlementScenario({
  mode: "margin",
  quantity: 10000,
  selling: 8.5,
  buying: 7.2,
});
assert.equal(trade.revenue, 85000);
assert.equal(trade.cost, 72000);
assert.equal(trade.contribution, 13000);
assert.ok(Math.abs(trade.margin - (13000 / 85000) * 100) < 1e-10);
assert.deepEqual(
  settlementScenario({ mode: "commission", quantity: 10000, fee: 0.35 }),
  {
    mode: "commission",
    revenue: 3500,
    cost: null,
    contribution: null,
    margin: null,
  },
);
assert.equal(
  settlementScenario({
    mode: "margin",
    quantity: 3,
    selling: 0.1,
    buying: 0.03,
  }).contribution,
  0.21,
);
assert.equal(
  settlementScenario({ mode: "margin", quantity: 1, selling: 1, buying: 2 })
    .margin,
  -100,
);
assert.equal(
  settlementScenario({ mode: "commission", quantity: 10, fee: 0 }).revenue,
  0,
);
for (const value of [-1, NaN, Infinity, 1000001]) {
  assert.throws(() =>
    settlementScenario({ mode: "commission", quantity: 1, fee: value }),
  );
  assert.throws(() =>
    settlementScenario({
      mode: "margin",
      quantity: 1,
      selling: 1,
      buying: value,
    }),
  );
}
assert.throws(() =>
  settlementScenario({
    mode: "margin",
    quantity: 1,
    selling: 0.001,
    buying: 0,
  }),
);
assert.throws(() =>
  settlementScenario({ mode: "commission", quantity: 0, fee: 1 }),
);

assert.deepEqual(
  milestoneDates(
    examplePcd,
    milestones.map((m) => m.days),
  ),
  ["2026-11-24", "2026-12-01", "2026-12-05", "2026-12-08"],
);
assert.deepEqual(milestoneDates("2028-03-01", [0, 1, 2]), [
  "2028-03-01",
  "2028-02-29",
  "2028-02-28",
]);
assert.deepEqual(milestoneDates("2026-01-01", [1]), ["2025-12-31"]);
for (const date of [
  "",
  "2026-02-29",
  "2026-13-01",
  "2026-04-31",
  "1999-12-31",
  "2101-01-01",
  "2026-1-01",
])
  assert.throws(() => milestoneDates(date, [1]));
for (const value of [-1, 0.5, 366, NaN, Infinity])
  assert.throws(() => milestoneDates(examplePcd, [value]));

assert.equal(apparelSlugs.length, 4);
const destinations = new Set();
for (const slug of apparelSlugs) {
  const route = fs.readFileSync(
    `app/[locale]/industries/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`slug="${slug}"`) && !route.includes("ComingSoonPage"),
  );
  assert.ok(route.includes(`apparelMetadata("${slug}")`));
  assert.equal(pages[slug].stages.length, 3);
  assert.equal(pages[slug].faqs.length, 3);
  for (const tool of pages[slug].tools) {
    const file = `app/[locale]${tool.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing destination ${tool.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Placeholder ${tool.href}`,
    );
    destinations.add(tool.href);
  }
}
assert.ok(
  fs
    .readFileSync(
      "app/[locale]/industries/manufacturing/textile/page.tsx",
      "utf8",
    )
    .includes("TextileManufacturingLanding"),
);
console.log(
  `PASS: whole-piece allocation, exact trim counts, commercial-mode boundaries, UTC date arithmetic, four routes and ${destinations.size} implemented destinations.`,
);
