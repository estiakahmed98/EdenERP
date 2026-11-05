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
const {
  basketTotals,
  programmeBudget,
  durationSeconds,
  formatDuration,
  programmeRundown,
} = load("../components/industries/others/calculations.ts");
const {
  otherIndustries,
  pages,
  products,
  initialBasket,
  programmeLines,
  segments,
} = load("../components/industries/others/data.ts");
assert.deepEqual(
  basketTotals(
    [
      { price: 350, qty: 1 },
      { price: 650, qty: 1 },
    ],
    80,
    0,
  ),
  { subtotal: 1000, delivery: 80, discount: 0, total: 1080 },
);
assert.deepEqual(basketTotals([], 80, 0), {
  subtotal: 0,
  delivery: 0,
  discount: 0,
  total: 0,
});
assert.equal(basketTotals([{ price: 0.1, qty: 3 }], 0.2, 0.1).total, 0.4);
assert.equal(basketTotals([{ price: 100, qty: 1 }], 0, 100).total, 0);
assert.throws(() => basketTotals([{ price: 100, qty: 1 }], 0, 101));
for (const qty of [0, -1, 1.5, 100, NaN])
  assert.throws(() => basketTotals([{ price: 100, qty }], 0, 0));
for (const invalid of [-1, NaN, Infinity, 100000001]) {
  assert.throws(() => basketTotals([{ price: invalid, qty: 1 }], 0, 0));
  assert.throws(() => basketTotals([], invalid, 0));
  assert.throws(() => basketTotals([], 0, invalid));
  assert.throws(() => programmeBudget(invalid, [0]));
  assert.throws(() => programmeBudget(100, [invalid]));
}
assert.deepEqual(programmeBudget(100000, [35000, 45000, 20000]), {
  assigned: 100000,
  remaining: 0,
  share: 100,
});
assert.deepEqual(programmeBudget(100, [80, 40]), {
  assigned: 120,
  remaining: -20,
  share: 120,
});
assert.deepEqual(programmeBudget(1, [0.1, 0.2]), {
  assigned: 0.3,
  remaining: 0.7,
  share: 30,
});
assert.throws(() => programmeBudget(0, [0]));
assert.throws(() => programmeBudget(0.001, [0]));
assert.equal(durationSeconds("02:30"), 150);
assert.equal(durationSeconds("180:00"), 10800);
assert.equal(durationSeconds("00:00"), 0);
for (const duration of ["", "12", "02:60", "-1:00", "180:01", "999:00", "01:1"])
  assert.throws(() => durationSeconds(duration));
assert.equal(formatDuration(-30), "00:30");
const defaultRundown = programmeRundown("19:00", 30, segments);
assert.equal(defaultRundown.total, 1440);
assert.equal(defaultRundown.remaining, 360);
assert.deepEqual(defaultRundown.timings.at(-1).end, {
  time: "19:24:00",
  days: 0,
});
const midnight = programmeRundown("23:58", 2, [
  { id: "EX", duration: "02:30" },
]);
assert.deepEqual(midnight.timings[0].end, { time: "00:00:30", days: 1 });
assert.equal(midnight.remaining, -30);
assert.equal(programmeRundown("00:00", 1, []).total, 0);
for (const start of ["", "24:00", "9:00", "09:60"])
  assert.throws(() => programmeRundown(start, 30, segments));
for (const target of [0, -1, 1.5, 181, NaN, Infinity])
  assert.throws(() => programmeRundown("19:00", target, segments));
assert.throws(() =>
  programmeRundown(
    "00:00",
    180,
    Array.from({ length: 9 }, (_, i) => ({
      id: String(i),
      duration: "180:00",
    })),
  ),
);
assert.equal(products.filter((row) => initialBasket[row.id]).length, 2);
assert.equal(
  programmeLines.reduce((sum, row) => sum + row.amount, 0),
  100000,
);
assert.equal(otherIndustries.length, 3);
for (const slug of otherIndustries) {
  const route = fs.readFileSync(
    `app/[locale]/industries/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`slug="${slug}"`) && !route.includes("ComingSoonPage"),
  );
  assert.equal(pages[slug].stages.length, 3);
  for (const tool of pages[slug].tools) {
    const file = `app/[locale]${tool.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing preview ${tool.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Linked placeholder ${tool.href}`,
    );
  }
}
console.log(
  "PASS: basket cents/discount boundaries, programme-budget arithmetic, rundown duration/midnight cases, three routes and implemented preview links.",
);
