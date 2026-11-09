import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { parse } from "@formatjs/icu-messageformat-parser";

const root = new URL("../", import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), "utf8");
const locales = ["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"];
function flatten(value, path = "", result = {}) {
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value))
      flatten(child, path ? `${path}.${key}` : key, result);
  } else result[path] = value;
  return result;
}
function signature(message) {
  const walk = (nodes) =>
    nodes.flatMap((node) => {
      if ([1, 2, 3, 4].includes(node.type))
        return [`${node.type}:${node.value}`];
      if (node.type === 8) return [`tag:${node.value}`, ...walk(node.children)];
      if ([5, 6].includes(node.type))
        return [
          `${node.type}:${node.value}`,
          ...Object.entries(node.options).flatMap(([key, value]) => [
            key,
            ...walk(value.value),
          ]),
        ];
      return [];
    });
  return walk(parse(message)).sort();
}
function load(file, dependencies = {}) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", "require", output)(
    module,
    module.exports,
    (name) => {
      assert.ok(
        Object.hasOwn(dependencies, name),
        `Unknown dependency ${name}`,
      );
      return dependencies[name];
    },
  );
  return module.exports;
}
const data = load("components/quality/data.ts");
const calculations = load("components/quality/calculations.ts", {
  "./data": data,
});
const { enumLabel, qualityError, formatDate } = load(
  "components/quality/labels.ts",
);
const master = flatten(JSON.parse(read("messages/en.json")).pages.qualityApp);
const keys = Object.keys(master).sort();
for (const locale of locales) {
  const messages = JSON.parse(read(`messages/${locale}.json`)).pages.qualityApp;
  const values = flatten(messages);
  assert.deepEqual(Object.keys(values).sort(), keys, `${locale}: key parity`);
  for (const [key, value] of Object.entries(values)) {
    assert.equal(typeof value, "string", `${locale}: ${key}`);
    assert.ok(value.trim(), `${locale}: empty ${key}`);
    assert.deepEqual(
      signature(value),
      signature(master[key]),
      `${locale}: ICU ${key}`,
    );
    assert.ok(!/EdenERP|ZXQ|QXZ/.test(value), `${locale}: invalid ${key}`);
    if (locale !== "en" && !["CAPA", "SPC"].includes(master[key]))
      assert.notEqual(value, master[key], `${locale}: untranslated ${key}`);
  }
  const t = (key) => {
    assert.ok(Object.hasOwn(values, key), `${locale}: missing ${key}`);
    return values[key];
  };
  const pages = data.getQualityPages(t);
  assert.deepEqual(Object.keys(pages), data.qualitySlugs);
  for (const slug of data.qualitySlugs) {
    assert.equal(pages[slug].title, messages.qualityPages[slug].title);
    assert.equal(pages[slug].steps.length, 4);
  }
  assert.deepEqual(
    data.getSuppliedNcRecords(t).map(({ title: _title, ...row }) => row),
    data.suppliedNcRecords,
  );
  assert.deepEqual(
    data.getSuppliedCapaRecords(t).map(({ problem: _problem, ...row }) => row),
    data.suppliedCapaRecords,
  );
  assert.deepEqual(data.getSuppliedSpcSummary(t), {
    ...data.suppliedSpcSummary,
    parameter: messages.suppliedSpcSummary.parameter,
    context: messages.suppliedSpcSummary.context,
  });
  for (const value of [
    "All",
    "Minor",
    "Major",
    "Critical",
    "Inspection",
    "Supplier",
    "Production",
    "Open",
    "CAPA",
    "Corrective",
    "Preventive",
    "Accept",
    "Reject",
  ])
    assert.equal(enumLabel(t, value), messages.enums[value]);
  for (const [lot, aql, level, key] of [
    [1, "2.5", "II", "invalidLot"],
    [500, "1.5", "II", "unsupportedCombination"],
    [501, "2.5", "II", "unsupportedLot"],
  ])
    assert.equal(
      qualityError(t, calculations.lookupAqlPlan(lot, aql, level).error),
      messages.errors[key],
    );
  for (const [input, key] of [
    ["", "readingCount"],
    ["1, invalid", "finiteReading"],
  ]) {
    let error;
    try {
      calculations.parseReadings(input);
    } catch (caught) {
      error = caught.message;
    }
    assert.equal(qualityError(t, error), messages.errors[key]);
  }
  assert.equal(formatDate(locale, null), "—");
  assert.ok(formatDate(locale, "2026-10-19"));
}

const technical =
  /^(?:Adon|ERP|AdonERP|Alif Steel Mills Ltd|CSV|LSL 22|USL 25|NC-\d+)$/;
for (const file of [
  "page.tsx",
  "ui.tsx",
  "heroes.tsx",
  "dashboard.tsx",
  "non-conformance.tsx",
  "capa.tsx",
  "aql.tsx",
  "spc.tsx",
]) {
  const source = read(`components/quality/${file}`);
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function check(node) {
    if (ts.isJsxText(node)) {
      const text = node.text.trim();
      assert.ok(
        !/[A-Za-z]{2}/.test(text) || technical.test(text),
        `${file}: hardcoded copy ${text}`,
      );
    }
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const expression = node.expression.getText(ast);
      assert.ok(
        !/^(record|selected)\.(status|severity|source|type)$/.test(expression),
        `${file}: untranslated enum ${expression}`,
      );
    }
    ts.forEachChild(node, check);
  }
  check(ast);
  assert.ok(
    !/lang="en"|locale="en"|messages\/en\.json|className=\{t\(/.test(source),
    `${file}: English override or translated class`,
  );
}
for (const file of ["non-conformance.tsx", "capa.tsx"])
  assert.ok(
    read(`components/quality/${file}`).includes('closeLabel={t("ui.close")}'),
  );
console.log(
  `PASS: ${keys.length} QMS messages × ${locales.length} locales; ICU/key parity, enum/source fidelity, localized validation, date display and hardcoded-copy checks.`,
);
