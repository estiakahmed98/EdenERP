import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

function loadTypeScript(relativePath, dependencies = {}) {
  const file = new URL(relativePath, import.meta.url);
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  const require = (name) => {
    if (!(name in dependencies))
      throw new Error(`Unexpected test dependency: ${name}`);
    return dependencies[name];
  };
  new Function("exports", "module", "require", output)(
    module.exports,
    module,
    require,
  );
  return module.exports;
}
const data = loadTypeScript("../components/quality/data.ts");
const { lookupAqlPlan, evaluateAql, calculateSpc, parseReadings } =
  loadTypeScript("../components/quality/calculations.ts", { "./data": data });
const close = (actual, expected, tolerance = 1e-6) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} differs from ${expected}`,
  );

assert.equal(data.qualitySlugs.length, 5);
assert.equal(
  data.qualitySnapshot.severity.reduce((sum, row) => sum + row.count, 0),
  6,
);
assert.equal(
  data.qualitySnapshot.sources.reduce((sum, row) => sum + row.count, 0),
  6,
);
assert.equal(data.suppliedNcRecords.length, 4);
assert.equal(data.suppliedCapaRecords.length, 4);
assert.ok(
  data.suppliedCapaRecords.every(
    (row) => row.owner === null && row.due === null,
  ),
);
assert.equal(data.qualitySnapshot.aqlPassRate, null);
assert.equal(data.qualitySnapshot.aqlInspections, 0);

for (const plan of data.suppliedAqlPlans) {
  assert.equal(lookupAqlPlan(plan.min, "2.5", "II").plan.code, plan.code);
  assert.equal(lookupAqlPlan(plan.max, "2.5", "II").plan.code, plan.code);
  assert.equal(evaluateAql(plan, plan.accept).decision, "Accept");
  assert.equal(evaluateAql(plan, plan.reject).decision, "Reject");
  for (const invalid of [-1, 0.5, plan.sample + 1, NaN])
    assert.ok(evaluateAql(plan, invalid).error);
}
assert.equal(lookupAqlPlan(500, "2.5", "II").plan.sample, 50);
assert.equal(lookupAqlPlan(501, "2.5", "II").plan, null);
assert.equal(lookupAqlPlan(1000, "2.5", "II").plan, null);
assert.equal(lookupAqlPlan(100, "1.5", "II").plan, null);
assert.equal(lookupAqlPlan(100, "2.5", "III").plan, null);
for (const invalid of [0, 1, 2.5, NaN, Infinity])
  assert.equal(lookupAqlPlan(invalid, "2.5", "II").plan, null);

// Independent published example: NIST Individuals-control-chart flow readings.
const nist = calculateSpc(
  [49.6, 47.6, 49.9, 51.3, 47.8, 51.2, 52.6, 52.4, 53.6, 52.1],
  45,
  57,
);
close(nist.mean, 50.81);
close(nist.mrMean, 1.8777777777777778);
close(nist.ucl, 55.8041, 0.0001);
close(nist.lcl, 45.8159, 0.0001);
assert.equal(nist.outOfControl, 0);
const constant = calculateSpc([5, 5, 5], 4, 6);
assert.equal(constant.sigma, 0);
assert.equal(constant.cp, null);
assert.equal(constant.cpk, null);
assert.throws(() => calculateSpc([1], 0, 2));
assert.throws(() => calculateSpc([1, NaN], 0, 2));
assert.throws(() => calculateSpc([1, 2], 3, 2));
assert.throws(() => calculateSpc([1e308, 1e308], 0, 2));
assert.deepEqual(
  parseReadings("23.1, 23.4\n23.8; 24.2"),
  [23.1, 23.4, 23.8, 24.2],
);
for (const invalid of ["", "23", "23, invalid", "Infinity, 2"])
  assert.throws(() => parseReadings(invalid));
assert.throws(() => parseReadings(Array(501).fill("23").join(",")));
const source = data.suppliedSpcSummary;
close((source.usl - source.lsl) / (6 * source.sigma), source.cp, 0.001);
close(
  Math.min(source.usl - source.mean, source.mean - source.lsl) /
    (3 * source.sigma),
  source.cpk,
  0.001,
);
close(source.mean + 3 * source.sigma, source.ucl);
close(source.mean - 3 * source.sigma, source.lcl);
assert.equal(data.simulatedReadings.length, 100);
assert.ok(data.simulatedReadings.every(Number.isFinite));

console.log(
  "PASS: QMS source fidelity, all supplied AQL boundaries and decisions, unsupported plans, NIST SPC example, zero variation, numeric overflow and reading parser edge cases.",
);
