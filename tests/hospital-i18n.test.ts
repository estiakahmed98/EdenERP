import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import ts from "typescript";
import {
  parse,
  type MessageFormatElement,
} from "@formatjs/icu-messageformat-parser";
import { hospitalPages } from "../components/hospital/registry.ts";

type Tree = { [key: string]: string | Tree };
const read = (locale: string) =>
  JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
function flat(tree: Tree, prefix = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tree).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === "string"
        ? [[path, value]]
        : Object.entries(flat(value, path));
    }),
  );
}
function signature(nodes: MessageFormatElement[]): unknown[] {
  return nodes
    .filter((n) => n.type !== 0)
    .map((n) => {
      if (n.type === 5 || n.type === 6)
        return [
          n.type,
          n.value,
          Object.fromEntries(
            Object.entries(n.options).map(([key, value]) => [
              key,
              signature(value.value),
            ]),
          ),
        ];
      if (n.type === 8) return [n.type, n.value, signature(n.children)];
      return [n.type, "value" in n ? n.value : "#"];
    })
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

test("all 24 Hospital pages have complete copy in all eight locales with intact ICU", () => {
  const source = flat(read("en").pages.hospitalApp);
  for (const locale of ["en", "bn", "tr", "ar", "zh", "ja", "ne", "vi"]) {
    const messages = read(locale),
      translated = flat(messages.pages.hospitalApp);
    assert.deepEqual(
      Object.keys(translated).sort(),
      Object.keys(source).sort(),
      locale,
    );
    for (const [key, original] of Object.entries(source)) {
      const target = translated[key];
      assert.ok(target.trim(), `${locale}.${key}`);
      assert.deepEqual(
        signature(parse(target)),
        signature(parse(original)),
        `${locale}.${key}`,
      );
      assert.deepEqual(
        [/^\s/.test(target), /\s$/.test(target)],
        [/^\s/.test(original), /\s$/.test(original)],
        `${locale}.${key}`,
      );
      if (locale !== "en")
        assert.notEqual(target, original, `${locale}.${key}: English fallback`);
      assert.doesNotMatch(target, /AdonERP/, `${locale}.${key}`);
    }
    for (const page of hospitalPages)
      assert.equal(
        messages.pages.hospitalApp.pages[page.slug].title,
        messages.layout.header.modules.hospital.links[page.slug],
        `${locale}.${page.slug}`,
      );
  }
});

test("Hospital visible JSX retains only identifiers, notation and localized copy", () => {
  const bad: string[] = [];
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
        const remainder = text.replace(
          /DEMO[-A-Za-z0-9]*|AdonERP|UHID|BDT|CT|MRI|ECG|Rx|OT|\b[WL]-?\b/g,
          "",
        );
        if (/[A-Za-z]/.test(remainder)) bad.push(`${path}: ${text.trim()}`);
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
          !ts.isJsxAttribute(node.parent) &&
          node.expression &&
          ts.isStringLiteral(node.expression)
        )
          check(node.expression.text);
        ts.forEachChild(node, visit);
      };
      visit(ast);
    }
  }
  inspect("components/hospital");
  inspect("app/[locale]/apps/hospital");
  assert.deepEqual(bad, []);
});

test("Hospital form patterns compile with browser Unicode sets and enforce identifier syntax", () => {
  const patterns: string[] = [];
  for (const file of ["front-desk", "operations", "administration"]) {
    const path = `components/hospital/workspaces/${file}.tsx`;
    const ast = ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && node.name.getText(ast) === "pattern") {
        const value = node.initializer;
        if (value && ts.isStringLiteral(value)) patterns.push(value.text);
        else if (
          value &&
          ts.isJsxExpression(value) &&
          value.expression &&
          ts.isStringLiteral(value.expression)
        )
          patterns.push(value.expression.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }
  assert.equal(patterns.length, 3);
  for (const pattern of patterns) {
    const regex = new RegExp(`^(?:${pattern})$`, "v");
    assert.equal(regex.test("DEMO-P05"), true);
    assert.equal(regex.test("DEMO-P 05"), false);
    assert.equal(regex.test("DEMO-P<5>"), false);
    assert.equal(regex.test(""), false);
  }
});
