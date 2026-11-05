import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
function load(relative) {
  const code = ts.transpileModule(
    fs.readFileSync(new URL(relative, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const module = { exports: {} };
  new Function("module", "exports", code)(module, module.exports);
  return module.exports;
}
const { fabricLength, barPattern, componentKits } = load(
  "../components/industries/industrial/calculations.ts",
);
const { industrialSlugs, pages, routeFor, defaultLosses, components } = load(
  "../components/industries/industrial/data.ts",
);

const fabric = fabricLength(1000, defaultLosses);
assert.deepEqual(
  fabric.stages.map((s) => s.after),
  [990, 970.2, 965.349],
);
assert.deepEqual(
  fabric.stages.map((s) => s.loss),
  [10, 19.8, 4.851],
);
assert.equal(fabric.finished, 965.349);
assert.equal(fabric.lost, 34.651);
assert.ok(Math.abs(fabric.retainedPercent - 96.5349) < 1e-10);
assert.equal(fabricLength(1, []).finished, 1);
assert.equal(fabricLength(1, [0, 0, 0]).retainedPercent, 100);
assert.equal(fabricLength(1, [100, 20, 30]).finished, 0);
assert.equal(fabricLength(0.001, [50]).finished, 0.001);
assert.equal(fabricLength(10, [1.234]).stages[0].percent, 1.23);
for (const metres of [0.001, 1.2345, 1000, 1000000]) {
  const result = fabricLength(metres, [1, 2, 0.5]);
  assert.equal(
    Math.round((result.finished + result.lost) * 1000),
    Math.round(result.incoming * 1000),
  );
  result.stages.forEach((s) => {
    assert.ok(s.after >= 0 && s.after <= s.before);
    assert.equal(
      Math.round((s.loss + s.after) * 1000),
      Math.round(s.before * 1000),
    );
  });
}
for (const metres of [0, -1, 0.0009, 1000001, NaN, Infinity])
  assert.throws(() => fabricLength(metres, [1]));
for (const loss of [-1, 100.01, NaN, Infinity])
  assert.throws(() => fabricLength(1, [loss]));

const cut = barPattern(6000, 1200, 3, 12);
assert.deepEqual(cut, {
  perBar: 4,
  bars: 3,
  patterns: [{ bars: 3, pieces: 4, used: 4812, remaining: 1188 }],
  stockTotal: 18000,
  pieceTotal: 14400,
  allowanceTotal: 36,
  remaining: 3564,
});
const partial = barPattern(6000, 1200, 3, 10);
assert.deepEqual(partial.patterns, [
  { bars: 2, pieces: 4, used: 4812, remaining: 1188 },
  { bars: 1, pieces: 2, used: 2406, remaining: 3594 },
]);
assert.equal(partial.remaining, 5970);
assert.equal(barPattern(6000, 6000, 0, 1).remaining, 0);
assert.equal(barPattern(1000000, 1, 0, 1).patterns[0].pieces, 1);
assert.throws(() => barPattern(6000, 6000, 1, 1));
for (const quantity of [1, 4, 5, 10, 12, 10000]) {
  const result = barPattern(6000, 1200, 3, quantity);
  assert.ok(result.patterns.length <= 2);
  assert.equal(
    result.patterns.reduce((sum, p) => sum + p.bars, 0),
    result.bars,
  );
  assert.equal(
    result.patterns.reduce((sum, p) => sum + p.bars * p.pieces, 0),
    quantity,
  );
  assert.equal(
    result.patterns.reduce((sum, p) => sum + p.bars * p.remaining, 0),
    result.remaining,
  );
  assert.equal(
    result.pieceTotal + result.allowanceTotal + result.remaining,
    result.stockTotal,
  );
}
for (const bad of [0, -1, 0.5, 1000001, NaN]) {
  assert.throws(() => barPattern(bad, 1, 0, 1));
  assert.throws(() => barPattern(100, bad, 0, 1));
}
for (const bad of [-1, 0.5, 1001, NaN])
  assert.throws(() => barPattern(6000, 1200, bad, 1));
for (const bad of [0, -1, 0.5, 10001, NaN])
  assert.throws(() => barPattern(6000, 1200, 3, bad));

const kits = componentKits(24, components);
assert.deepEqual(
  kits.lines.map((l) => l.required),
  [96, 24, 24],
);
assert.deepEqual(
  kits.lines.map((l) => l.short),
  [16, 0, 4],
);
assert.equal(kits.available, 20);
assert.equal(kits.covered, 20);
assert.equal(kits.short, 4);
assert.equal(componentKits(20, components).short, 0);
assert.equal(componentKits(1, [{ perUnit: 4, stock: 0 }]).available, 0);
assert.equal(
  componentKits(10000, [{ perUnit: 100, stock: 100000000 }]).lines[0].required,
  1000000,
);
assert.throws(() => componentKits(1, []));
for (const bad of [0, -1, 0.5, 101, NaN])
  assert.throws(() => componentKits(1, [{ perUnit: bad, stock: 1 }]));
for (const bad of [-1, 0.5, 100000001, NaN])
  assert.throws(() => componentKits(1, [{ perUnit: 1, stock: bad }]));
for (const bad of [0, -1, 0.5, 10001, NaN])
  assert.throws(() => componentKits(bad, components));

const stems = {
  textile: "TextileManufacturingLanding",
  metal: "MetalFabricationLanding",
  furniture: "CustomFurnitureProductionLanding",
};
const tools = new Set(),
  related = new Set();
assert.equal(industrialSlugs.length, 3);
for (const slug of industrialSlugs) {
  const route = fs.readFileSync(
    `app/[locale]${routeFor(slug)}/page.tsx`,
    "utf8",
  );
  assert.ok(route.includes(`industrialMetadata("${slug}")`));
  assert.ok(route.includes(stems[slug]));
  const leaf = fs.readFileSync(
    `components/landing/Industries/manufacturing/${slug}/${stems[slug]}.tsx`,
    "utf8",
  );
  assert.ok(leaf.includes(`slug="${slug}"`));
  assert.equal(pages[slug].steps.length, 3);
  assert.equal(pages[slug].faqs.length, 3);
  for (const [targets, set] of [
    [pages[slug].tools, tools],
    [pages[slug].related, related],
  ])
    for (const target of targets) {
      const file = `app/[locale]${target.href}/page.tsx`;
      assert.ok(fs.existsSync(file), `Missing destination ${target.href}`);
      assert.ok(
        !fs.readFileSync(file, "utf8").includes("ComingSoonPage"),
        `Placeholder ${target.href}`,
      );
      set.add(target.href);
    }
}
const ui = fs.readFileSync("components/industries/industrial/ui.tsx", "utf8");
const workspace = fs.readFileSync(
  "components/industries/industrial/workspaces.tsx",
  "utf8",
);
assert.ok(ui.includes('from "../professional/ui"'));
assert.ok(workspace.includes('id="professional-workspace"'));
console.log(
  `PASS: sequential length/rounding conservation, grouped bar patterns and remainders, component kit boundaries, three route/legacy bindings, ${tools.size} product links and ${related.size} related industry links.`,
);
