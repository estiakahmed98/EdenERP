import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

// Exercise the production presentation helpers without a database or browser.
const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const cache = new Map();
function load(relative) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const module = { exports: {} };
  cache.set(filename, module.exports);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const localRequire = (specifier) =>
    specifier.startsWith(".")
      ? load(
          path.relative(
            root,
            path.resolve(path.dirname(filename), `${specifier}.ts`),
          ),
        )
      : require(specifier);
  new Function("require", "module", "exports", source)(
    localRequire,
    module,
    module.exports,
  );
  cache.set(filename, module.exports);
  return module.exports;
}
const { getPlanPrice, hasConfiguredFeature } = load(
  "components/pricing/plan-presentation.ts",
);
const { convertAmount, formatCurrency } = load("components/pricing/utils.ts");
const plan = {
  id: "test",
  users: 10,
  quarterlyFee: 12000,
  currency: "BDT",
  features: ["Accounting"],
};
for (const [cycle, amount, total, saving] of [
  ["monthly", 400, 4000, null],
  ["quarterly", 360, 3600, 400],
  ["semiannual", 320, 3200, 800],
  ["yearly", 260, 2600, 1400],
]) {
  const result = getPlanPrice(plan, cycle);
  assert.equal(result.amount, amount, cycle);
  assert.equal(result.monthlyTotal, total, cycle);
  if (saving === null) assert.equal(result.monthlySaving, null);
  else assert.ok(Math.abs(result.monthlySaving - saving) < 0.000001);
}
const fixed = {
  ...plan,
  currency: "USD",
  monthlyFee: 499,
  serverFee: 20,
  setupFee: 100,
};
assert.equal(getPlanPrice(fixed, "yearly").amount, 5988);
assert.equal(getPlanPrice(fixed, "monthly").amount, 499);
assert.equal(getPlanPrice(fixed, "yearly").original, null);
assert.deepEqual(getPlanPrice(fixed, "yearly").fees, [
  { label: "oneTimeSetup", amount: 100 },
  { label: "serverMaintenance", amount: 20 },
]);
for (const override of [
  { quarterlyFee: 0 },
  { quarterlyFee: undefined },
  { users: 0 },
  { users: "99 +" },
]) {
  assert.equal(getPlanPrice({ ...plan, ...override }, "yearly"), null);
}
assert.equal(
  hasConfiguredFeature({ ...plan, id: "enterprise" }, "Manufacturing"),
  false,
);
assert.equal(hasConfiguredFeature(plan, "Accounting"), true);
assert.equal(convertAmount(12200, "BDT", "USD"), 100);
assert.equal(convertAmount(100, "USD", "BDT"), 12200);
assert.equal(formatCurrency(12200, "USD", "BDT"), "$100.00");
assert.equal(plan.quarterlyFee, 12000); // Display conversion never mutates billing data.

const locales = ["en", "bn", "tr", "ar", "zh", "ja", "ne", "vi"];
const read = (locale) =>
  JSON.parse(
    fs.readFileSync(path.join(root, "messages", `${locale}.json`), "utf8"),
  );
const master = read("en").pages.pricing.ui;
for (const locale of locales) {
  const ui = read(locale).pages.pricing.ui;
  assert.deepEqual(
    Object.keys(ui).sort(),
    Object.keys(master).sort(),
    `${locale}: UI key parity`,
  );
  for (const [key, value] of Object.entries(ui)) {
    assert.ok(
      typeof value === "string" && value.trim(),
      `${locale}.${key}: nonempty text`,
    );
    assert.deepEqual(
      value.match(/\{\w+\}/g) ?? [],
      master[key].match(/\{\w+\}/g) ?? [],
      `${locale}.${key}: placeholders`,
    );
  }
}
console.log(
  "PASS: billing cycles, fixed fees, quote-only guard, explicit feature coverage, currency conversion and 8-locale UI parity.",
);
