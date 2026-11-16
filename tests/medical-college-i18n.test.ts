import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import ts from "typescript";
import {
  parse,
  type MessageFormatElement,
} from "@formatjs/icu-messageformat-parser";
import { createFormatter, createTranslator } from "next-intl";
import { collegePages } from "../components/medical-college/registry.ts";

type Messages = { [key: string]: string | Messages };
const read = (locale: string) =>
  JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
const en = read("en"),
  bn = read("bn");
function flatten(value: Messages, prefix = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof child === "string"
        ? [[path, child]]
        : Object.entries(flatten(child, path));
    }),
  );
}
const english = flatten(en.pages.medicalCollegeApp),
  bengali = flatten(bn.pages.medicalCollegeApp);

test("every supported College locale has complete native copy, matching menu labels and intact ICU", () => {
  for (const locale of ["tr", "ar", "zh", "ja", "ne", "vi"]) {
    const catalog = read(locale);
    const translated = flatten(catalog.pages.medicalCollegeApp);
    assert.deepEqual(
      Object.keys(translated).sort(),
      Object.keys(english).sort(),
      locale,
    );
    for (const [key, source] of Object.entries(english)) {
      const target = translated[key];
      assert.ok(target?.trim(), `${locale}.${key}`);
      assert.deepEqual(
        signature(parse(target)),
        signature(parse(source)),
        `${locale}.${key}`,
      );
      if (key !== "ui.session")
        assert.notEqual(target, source, `${locale}.${key}: English fallback`);
      assert.deepEqual(
        [/^\s/.test(target), /\s$/.test(target)],
        [/^\s/.test(source), /\s$/.test(source)],
        `${locale}.${key}`,
      );
    }
    for (const page of collegePages)
      assert.equal(
        catalog.layout.header.modules.medicalCollege.links[page.slug],
        catalog.pages.medicalCollegeApp.pages[page.slug].title,
        `${locale}.${page.slug}`,
      );
  }
});

function signature(nodes: MessageFormatElement[]): unknown[] {
  return nodes
    .filter((n) => n.type !== 0)
    .map((n) => {
      if (n.type === 6 || n.type === 5)
        return [
          n.type,
          n.value,
          Object.fromEntries(
            Object.entries(n.options).map(([k, v]) => [k, signature(v.value)]),
          ),
        ];
      if (n.type === 8) return [n.type, n.value, signature(n.children)];
      return [n.type, "value" in n ? n.value : "#"];
    })
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

test("all eight College pages and menu labels have complete Bengali coverage and valid ICU", () => {
  assert.deepEqual(Object.keys(english).sort(), Object.keys(bengali).sort());
  for (const [key, source] of Object.entries(english)) {
    const target = bengali[key];
    assert.ok(target.trim(), key);
    assert.deepEqual(signature(parse(target)), signature(parse(source)), key);
    assert.deepEqual(
      [/^\s/.test(target), /\s$/.test(target)],
      [/^\s/.test(source), /\s$/.test(source)],
      key,
    );
    // Placeholder-only compositions intentionally contain no prose to translate.
    let prose = target
      .replace(/\{[^}]+\}/g, "")
      .replace(/DGME|BMDC|BCPS|API|BDT|FCPS|MD|MS|A–Z|Z–A/g, "");
    if (key === "ui.unitA" || key === "ui.unitB")
      prose = prose.replace(/[AB]/g, "");
    assert.ok(!/[A-Za-z]/.test(prose), `${key}: unintended English prose`);
    assert.doesNotMatch(target, /EdenERP|[০-৯]?[0-9]|৷/, key);
  }
  for (const page of collegePages)
    assert.equal(
      bn.layout.header.modules.medicalCollege.links[page.slug],
      bn.pages.medicalCollegeApp.pages[page.slug].title,
    );
});

test("College dates, counts, percentages and BDT amounts format in the selected locale", () => {
  for (const locale of ["en", "bn"] as const) {
    const f = createFormatter({ locale }),
      catalog = locale === "bn" ? bn : en;
    const t = createTranslator({
      locale,
      messages: catalog,
      namespace: "pages.medicalCollegeApp",
    });
    const count = f.number(1234);
    const message = t("ui.count", { count });
    assert.ok(message.includes(count));
    assert.ok(t("ui.item", { value: f.number(2) }).includes(f.number(2)));
    const amount = f.number(1234567.5, {
      style: "currency",
      currency: "BDT",
      currencyDisplay: "narrowSymbol",
    });
    const date = f.dateTime(new Date("2027-01-02T12:00:00Z"), {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    if (locale === "bn") {
      assert.match(message, /১,২৩৪/);
      assert.match(amount, /১২,৩৪,৫৬৭\.৫০/);
      assert.match(date, /২০২৭/);
      assert.doesNotMatch(date, /[0-9]/);
    } else {
      assert.match(message, /1,234/);
      assert.match(amount, /1,234,567\.50/);
      assert.match(date, /2027/);
    }
  }
});

test("College JSX has no hardcoded English labels apart from technical programme and currency identifiers", () => {
  const approved = new Set([
    "AdonERP",
    "MBBS",
    "BDS",
    "FCPS",
    "MD",
    "MS",
    "BDT",
  ]);
  const failures: string[] = [];
  function inspect(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        inspect(path);
        continue;
      }
      if (!path.endsWith(".tsx")) continue;
      const ast = ts.createSourceFile(
        path,
        readFileSync(path, "utf8"),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const check = (text: string) => {
        const value = text.trim();
        if (/[A-Za-z]/.test(value) && !approved.has(value))
          failures.push(`${path}: ${value}`);
      };
      const visit = (node: ts.Node) => {
        if (ts.isJsxText(node)) check(node.text);
        if (
          ts.isJsxAttribute(node) &&
          /^(?:title|placeholder|aria-label)$/.test(node.name.getText(ast)) &&
          node.initializer &&
          ts.isStringLiteral(node.initializer)
        )
          check(node.initializer.text);
        if (
          ts.isJsxExpression(node) &&
          node.expression &&
          ts.isStringLiteral(node.expression)
        )
          check(node.expression.text);
        ts.forEachChild(node, visit);
      };
      visit(ast);
    }
  }
  inspect("components/medical-college");
  inspect("app/[locale]/apps/medical-college");
  assert.deepEqual(failures, []);
});
