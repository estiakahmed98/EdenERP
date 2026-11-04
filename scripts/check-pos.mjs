import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

function load(relative) {
  const compiled = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", compiled)(module, module.exports);
  return module.exports;
}
const { basketTotals, allocateCost } = load(
  "../components/pos/calculations.ts",
);
const { posSlugs, pages, stock, saleSummary, locations, shifts, transfers } =
  load("../components/pos/data.ts");
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`);

// Supplied inclusive example: VAT is extracted, never added twice.
assert.deepEqual(basketTotals([{ price: 3450, qty: 1 }], 3500), {
  total: 3450,
  tax: 450,
  exTax: 3000,
  change: 50,
  due: 0,
  ready: true,
});
assert.equal(basketTotals([{ price: 3450, qty: 2 }], 6900).tax, 900);
assert.equal(basketTotals([{ price: 690, qty: 1 }], 689.99).due, 0.01);
assert.equal(basketTotals([{ price: 690, qty: 1 }], 689.99).ready, false);
assert.equal(basketTotals([], 1000).ready, false);
assert.equal(basketTotals([{ price: 0.1, qty: 3 }], 0.3, 0).total, 0.3);
for (const tender of [-1, NaN, Infinity, 100000001])
  assert.throws(() => basketTotals([], tender));
for (const qty of [0, -1, 1.5, 1000, NaN])
  assert.throws(() => basketTotals([{ price: 1, qty }], 0));
for (const price of [-1, NaN, Infinity, 1000001])
  assert.throws(() => basketTotals([{ price, qty: 1 }], 0));

// Every allocated paisa is conserved, including equal-weight remainder ties.
const lines = [
  { qty: 600, retail: 690 },
  { qty: 550, retail: 490 },
];
for (const basis of ["quantity", "retail"]) {
  for (const cost of [0.01, 0.03, 180000, 999999.99]) {
    const shares = allocateCost(cost, lines, basis);
    close(
      shares.reduce((sum, row) => sum + row.value, 0),
      cost,
    );
    assert.ok(
      shares.every((row) => Number.isFinite(row.unitCost) && row.value >= 0),
    );
  }
}
assert.deepEqual(
  allocateCost(
    0.01,
    [
      { qty: 1, retail: 1 },
      { qty: 1, retail: 1 },
    ],
    "quantity",
  ).map((row) => row.value),
  [0.01, 0],
);
const quantity = allocateCost(180000, lines, "quantity");
const retail = allocateCost(180000, lines, "retail");
assert.ok(retail[0].value > quantity[0].value);
for (const qty of [0, -1, 1.5, NaN, 100001])
  assert.throws(() => allocateCost(100, [{ qty, retail: 1 }], "quantity"));
assert.throws(() => allocateCost(0, lines, "retail"));
assert.throws(() => allocateCost(100, [], "retail"));
assert.throws(() => allocateCost(100, [{ qty: 1, retail: 0 }], "retail"));

// Independently transcribed source totals and route coverage.
assert.equal(
  stock.reduce((sum, row) => sum + row.qty, 0),
  1390,
);
close(
  stock.reduce((sum, row) => sum + row.value, 0),
  853556.98,
);
close(
  stock.reduce((sum, row) => sum + row.retail, 0),
  2531860,
);
close(
  saleSummary.gross - saleSummary.vat - saleSummary.cost,
  saleSummary.margin,
);
assert.equal(locations.filter((row) => row.outlet).length, 2);
assert.equal(shifts.length, 8);
assert.equal(transfers.length, 2);
assert.equal(transfers[0].shortage, null);
assert.equal(posSlugs.length, 10);
for (const slug of posSlugs) {
  const route = fs.readFileSync(
    `app/[locale]/apps/pos/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`slug="${slug}"`) && !route.includes("ComingSoonPage"),
  );
  assert.equal(pages[slug].steps.length, 4);
  assert.ok(
    pages[slug].related.every(
      (item) => item !== slug && posSlugs.includes(item),
    ),
  );
}
console.log(
  "PASS: POS checkout VAT/tender boundaries, integer-paisa allocation, supplied totals and all 10 route mappings.",
);
