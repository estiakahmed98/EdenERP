import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { parse } from "@formatjs/icu-messageformat-parser";

const locales = ["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"];
const directory = new URL("../", import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, directory), "utf8");
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
          ...Object.entries(node.options).flatMap(([key, option]) => [
            key,
            ...walk(option.value),
          ]),
        ];
      return [];
    });
  return walk(parse(message)).sort();
}
function load(file) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", output)(module, module.exports);
  return module.exports;
}
const { getPages, getCourses, getLessons, getLearners, getSessions, sessions } =
  load("components/education/industry/data.ts");
const { choiceLabel } = load("components/education/industry/labels.ts");
const { findConflicts, creditTotal } = load(
  "components/education/industry/calculations.ts",
);
const master = flatten(
  JSON.parse(read("messages/en.json")).pages.educationIndustries,
);
const keys = Object.keys(master).sort();
for (const locale of locales) {
  const messages = JSON.parse(read(`messages/${locale}.json`)).pages
    .educationIndustries;
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
    if (locale !== "en" && master[key] !== "LMS")
      assert.notEqual(value, master[key], `${locale}: untranslated ${key}`);
  }
  const t = (key) => {
    assert.ok(Object.hasOwn(values, key), `${locale}: unknown key ${key}`);
    return values[key];
  };
  for (const [industry, page] of Object.entries(getPages(t))) {
    assert.equal(page.title, messages.pages[industry].title);
    assert.equal(page.journeys.length, 3);
    assert.equal(page.faqs.length, 3);
    assert.ok(page.tools.every((tool) => tool.href.startsWith("/apps/")));
  }
  assert.deepEqual(
    getSessions(t).map(({ title: _title, ...row }) => row),
    sessions,
  );
  assert.deepEqual(
    findConflicts(
      { ...sessions[0], start: "09:30", end: "09:45" },
      getSessions(t),
    ),
    [{ id: "EX-01", reasons: ["room", "tutor", "group"] }],
  );
  const courses = getCourses(t);
  assert.deepEqual(
    courses.map(({ id, credits }) => [id, credits]),
    [
      ["EX-C101", 3],
      ["EX-Q102", 3],
      ["EX-E103", 2],
      ["EX-R104", 3],
      ["EX-D105", 3],
    ],
  );
  assert.equal(
    creditTotal(
      courses.map((row) => row.id),
      courses,
    ),
    14,
  );
  assert.deepEqual(
    getLessons(t).map((row) => row.id),
    ["goal", "practice", "feedback"],
  );
  assert.deepEqual(
    getLearners(t).map((row) => row.id),
    ["S-1001", "S-1002", "S-1003", "S-1004"],
  );
  for (const value of [
    "Sunday",
    "Monday",
    "Tuesday",
    "Lab 01",
    "Hall B",
    "Tutor A",
    "Tutor B",
    "Science 1",
    "Humanities 1",
  ])
    assert.ok(choiceLabel(t, value));
}

// Guard the original failure: new page copy must use messages, not an English-only root.
for (const file of ["page.tsx", "heroes.tsx", "demos.tsx", "ui.tsx"]) {
  const source = read(`components/education/industry/${file}`);
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
        !/[A-Za-z]{2}/.test(text) || ["Adon", "ERP", "AdonERP"].includes(text),
        `${file}: hardcoded visible copy ${text}`,
      );
    }
    ts.forEachChild(node, check);
  }
  check(ast);
  assert.ok(!source.includes('lang="en"'), `${file}: forced English`);
}
const demos = read("components/education/industry/demos.tsx");
for (const value of ["present", "absent", "late", "unmarked"])
  assert.ok(
    demos.includes(`value="${value}"`),
    `Translated attendance value ${value}`,
  );
assert.ok(
  demos.includes("value={value}"),
  "Timetable options must retain canonical values",
);
console.log(
  `PASS: ${keys.length} education messages × ${locales.length} locales; key/ICU parity, translated copy, stable demo values and hardcoded-text regression checks.`,
);
