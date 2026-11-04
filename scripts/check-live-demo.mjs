import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const { options } = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  process.cwd(),
);
const sharedButton = path.resolve("components/live-demo-button.tsx");

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? sourceFiles(file)
      : /\.[jt]sx?$/.test(entry.name)
        ? [file]
        : [];
  });
}

const usages = new Map();
for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
  const source = fs.readFileSync(file, "utf8");
  assert(
    !/Book a (?:live )?demo|ManufacturingDemoButton|\bbookLiveDemo\b|\bbookDemo\b/i.test(
      source,
    ),
    `Retired demo label/component in ${file}`,
  );
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(ast);
      if (tag === "LiveDemoButton") {
        assert.equal(
          node.attributes.properties.length,
          0,
          `Local button overrides in ${file}`,
        );
        usages.set(file, (usages.get(file) ?? 0) + 1);
        assert(
          ast.statements.some(
            (statement) =>
              ts.isImportDeclaration(statement) &&
              ts.isStringLiteral(statement.moduleSpecifier) &&
              path.resolve(
                ts.resolveModuleName(
                  statement.moduleSpecifier.text,
                  file,
                  options,
                  ts.sys,
                ).resolvedModule?.resolvedFileName ?? "",
              ) === sharedButton &&
              statement.importClause?.name?.text === "LiveDemoButton",
          ),
          `Use the global component directly in ${file}`,
        );
      }
      for (const attribute of node.attributes.properties) {
        if (
          ts.isJsxAttribute(attribute) &&
          attribute.name.getText(ast) === "href" &&
          attribute.initializer &&
          ts.isStringLiteral(attribute.initializer)
        ) {
          assert.notEqual(
            attribute.initializer.text,
            "/demo",
            `Retired direct demo link in ${file}`,
          );
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

const english = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
assert.equal(english.common.actions.liveDemo, "Meet an Advisor with Live Demo");
const locales = fs
  .readdirSync("messages")
  .filter((file) => file.endsWith(".json"));
for (const locale of locales) {
  const messages = JSON.parse(
    fs.readFileSync(path.join("messages", locale), "utf8"),
  );
  assert(
    messages.common.actions.liveDemo?.trim(),
    `Missing label in ${locale}`,
  );
  assert.equal(messages.pages.accountingShowcase.common.bookDemo, undefined);
  assert.equal(
    messages.pages.accountingShowcase.common.bookLiveDemo,
    undefined,
  );
  assert.equal(messages.pages.manufacturingShowcase?.bookDemo, undefined);
}
for (const area of ["accounting", "manufacturing", "quality", "university"]) {
  assert(
    [...usages.keys()].some((file) => file.split(path.sep).includes(area)),
    `Missing ${area} migration`,
  );
}
console.log(
  `PASS: ${[...usages.values()].reduce((a, b) => a + b, 0)} shared CTA placements across ${usages.size} source files; all ${locales.length} catalogs populated; no retired labels, direct /demo links or local overrides.`,
);
