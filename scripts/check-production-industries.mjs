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
const { steelWeight, riceMassBalance } = load(
  "../components/industries/manufacturing/calculations.ts",
);
const { industrySlugs, pages, steelExample, riceExample } = load(
  "../components/industries/manufacturing/data.ts",
);
assert.deepEqual(steelWeight(18400, 8600, [4000, 3200]), {
  net: 9800,
  allocated: 7200,
  remaining: 2600,
});
assert.deepEqual(steelWeight(10, 2, [9]), {
  net: 8,
  allocated: 9,
  remaining: -1,
});
assert.deepEqual(steelWeight(0, 0, []), { net: 0, allocated: 0, remaining: 0 });
assert.deepEqual(steelWeight(0.3, 0.1, [0.1, 0.1]), {
  net: 0.2,
  allocated: 0.2,
  remaining: 0,
});
assert.equal(steelWeight(1.2344, 0, [0.2344]).remaining, 1);
assert.throws(() => steelWeight(10, 11, []));
for (const invalid of [-1, NaN, Infinity, 100000001]) {
  assert.throws(() => steelWeight(invalid, 0, []));
  assert.throws(() => steelWeight(100, invalid, []));
  assert.throws(() => steelWeight(100, 0, [invalid]));
}
assert.deepEqual(riceMassBalance(riceExample.input, riceExample), {
  recorded: 9800,
  unassigned: 200,
  headRicePercent: 65,
  ricePercent: 70,
});
assert.deepEqual(
  riceMassBalance(10, { headRice: 0, brokenRice: 0, bran: 0, husk: 0 }),
  { recorded: 0, unassigned: 10, headRicePercent: 0, ricePercent: 0 },
);
assert.equal(
  riceMassBalance(100, { headRice: 101, brokenRice: 0, bran: 0, husk: 0 })
    .unassigned,
  -1,
);
assert.equal(
  riceMassBalance(0.3, { headRice: 0.1, brokenRice: 0.1, bran: 0.1, husk: 0 })
    .unassigned,
  0,
);
for (const invalid of [0, 0.0004, -1, NaN, Infinity, 100000001])
  assert.throws(() => riceMassBalance(invalid, riceExample));
for (const key of ["headRice", "brokenRice", "bran", "husk"])
  for (const invalid of [-1, NaN, Infinity, 100000001])
    assert.throws(() =>
      riceMassBalance(10000, { ...riceExample, [key]: invalid }),
    );
assert.equal(
  steelWeight(
    steelExample.gross,
    steelExample.tare,
    steelExample.orders.map((row) => row.weight),
  ).net,
  9800,
);
assert.equal(industrySlugs.length, 2);
for (const slug of industrySlugs) {
  const route = fs.readFileSync(
    `app/[locale]/industries/${slug}/page.tsx`,
    "utf8",
  );
  assert.ok(
    route.includes(`slug="${slug}"`) && !route.includes("ComingSoonPage"),
  );
  assert.equal(pages[slug].stages.length, 4);
  for (const tool of pages[slug].tools) {
    const file = `app/[locale]${tool.href}/page.tsx`;
    assert.ok(fs.existsSync(file), `Missing product preview ${tool.href}`);
    assert.ok(
      !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
      `Linked placeholder ${tool.href}`,
    );
  }
}
console.log(
  "PASS: steel gram-based weighment/allocation, rice mass-balance boundaries, both routes and implemented preview destinations.",
);
