import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { parse } from "@formatjs/icu-messageformat-parser";
import { formatDemoMoney } from "../lib/demo-format.ts";
import { whatsappUrl, banglaWhatsAppMessage } from "../lib/whatsapp.ts";
import { hasMarketingEvidence } from "../lib/marketing-evidence.ts";

// Load the same pure TS inventory used by Next, resolving its local imports.
function loadTs<T>(file: string): T {
  const resolved = path.resolve(file);
  const module = { exports: {} as unknown };
  const output = ts.transpileModule(readFileSync(resolved, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  new Function("module", "exports", "require", output)(
    module,
    module.exports,
    (name: string) => {
      const local = name.startsWith("@/")
        ? name.slice(2)
        : path.resolve(path.dirname(resolved), name);
      return loadTs(local + ".ts");
    },
  );
  return module.exports as T;
}

const { productCounts, productInventory } = loadTs<
  typeof import("../lib/product-inventory.ts")
>("lib/product-inventory.ts");
const root = "app/[locale]";

test("directory counts are derived from unique menu routes, not marketing constants", () => {
  assert.equal(productCounts.modules, productInventory.modules.length);
  assert.equal(
    productCounts.appPages,
    new Set(productInventory.modules.flatMap((m) => m.links.map((l) => l.href)))
      .size,
  );
  for (const href of [
    ...productInventory.appPages,
    ...productInventory.industryPages,
  ]) {
    assert.ok(
      existsSync(`${root}${href}/page.tsx`),
      `Broken advertised route: ${href}`,
    );
  }
  assert.equal(productCounts.sectors, productInventory.sectors.length);
});

test("the industries directory covers every existing industry detail route", () => {
  const routes: string[] = [];
  function walk(folder: string) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = `${folder}/${entry.name}`;
      if (entry.isDirectory()) walk(file);
      else if (entry.name === "page.tsx" && folder !== `${root}/industries`)
        routes.push(folder.slice(root.length));
    }
  }
  walk(`${root}/industries`);
  assert.deepEqual(new Set(productInventory.industryPages), new Set(routes));
});

test("all connected industry workflows are backed by published app routes", () => {
  const { industrySolutions } = loadTs<
    typeof import("../lib/industry-solutions.ts")
  >("lib/industry-solutions.ts");
  for (const sector of industrySolutions) {
    assert.ok(
      sector.workflow.length >= 2,
      `${sector.id}: insufficient workflow context`,
    );
    for (const step of sector.workflow)
      assert.ok(productInventory.appPages.includes(step.href));
  }
  assert.equal(industrySolutions[0].id, "garmentsTextile");
});

test("every supported locale has complete directory, demo and WhatsApp labels with valid ICU", () => {
  const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
  function compare(a: unknown, b: unknown, label: string) {
    if (typeof a === "string") {
      assert.equal(typeof b, "string", label);
      parse(String(b));
      assert.deepEqual(
        [...a.matchAll(/\{(\w+)\}/g)].map((m) => m[1]),
        [...String(b).matchAll(/\{(\w+)\}/g)].map((m) => m[1]),
        label,
      );
    } else if (a && typeof a === "object") {
      assert.ok(b && typeof b === "object", label);
      for (const [k, v] of Object.entries(a))
        compare(v, (b as Record<string, unknown>)[k], `${label}.${k}`);
    }
  }
  for (const file of readdirSync("messages").filter((file) =>
    file.endsWith(".json"),
  )) {
    const locale = JSON.parse(readFileSync(`messages/${file}`, "utf8"));
    compare(
      en.pages.industryDirectory,
      locale.pages.industryDirectory,
      `${file}:industryDirectory`,
    );
    compare(en.pages.home.demo, locale.pages.home.demo, `${file}:demo`);
    compare(en.common.whatsapp, locale.common.whatsapp, `${file}:whatsapp`);
    assert.doesNotMatch(locale.common.actions.viewAllApps, /50|৫০/);
  }
});

test("unapproved endorsements, certification, adoption and performance claims fail closed", () => {
  for (const claim of [
    "homepage-testimonials",
    "contact:adoption-statistics",
    "contact:certification-and-sla",
    "partner:Reputation Prime",
    "__proto__",
  ])
    assert.equal(hasMarketingEvidence(claim), false);
  const home = readFileSync(
    "components/landing/TestimonialsSection.tsx",
    "utf8",
  );
  assert.ok(home.includes("guides(community)"));
  assert.doesNotMatch(
    home,
    /testimonials\.items|testimonials\.extraQuote|Stars|blockquote/,
  );
});

test("legacy testimonial UI remains inside an evidence condition", () => {
  function walkFiles(folder: string): string[] {
    return readdirSync(folder, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory()
        ? walkFiles(`${folder}/${e.name}`)
        : e.name.endsWith(".tsx")
          ? [`${folder}/${e.name}`]
          : [],
    );
  }
  for (const file of walkFiles(`${root}/apps`)) {
    const text = readFileSync(file, "utf8");
    if (!text.includes("import { hasMarketingEvidence }")) continue;
    const source = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function inspect(node: ts.Node) {
      if (
        ts.isCallExpression(node) &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0]) &&
        /(?:^|\.)testimonial(?:Section)?\./i.test(node.arguments[0].text)
      ) {
        let parent = node.parent,
          inJsx = false,
          guarded = false;
        while (parent) {
          if (ts.isJsxElement(parent)) inJsx = true;
          if (
            ts.isConditionalExpression(parent) &&
            parent.condition.getText(source).startsWith("hasMarketingEvidence(")
          )
            guarded = true;
          parent = parent.parent;
        }
        if (inJsx) assert.ok(guarded, `Unguarded endorsement: ${file}`);
      }
      ts.forEachChild(node, inspect);
    }
    inspect(source);
  }
});

test("Bangladesh demo money is BDT with local number grouping", () => {
  assert.match(formatDemoMoney(1840000, "bn"), /১৮,৪০,০০০/);
  assert.match(formatDemoMoney(1840000, "en"), /18,40,000/);
  assert.doesNotMatch(formatDemoMoney(1840000, "en"), /\$|USD/);
});

test("WhatsApp campaign uses the configured public number and lossless Bangla encoding", () => {
  const url = new URL(whatsappUrl("+880 1842-781978"));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/8801842781978");
  assert.equal(url.searchParams.get("text"), banglaWhatsAppMessage);
  assert.match(banglaWhatsAppMessage, /AdonERP/);
  assert.throws(() => whatsappUrl("not-a-phone"));
});

test("quote-only and published pricing keep their existing calculation paths", () => {
  const { getPlanPrice } = loadTs<
    typeof import("../components/pricing/plan-presentation.ts")
  >("components/pricing/plan-presentation.ts");
  const plan = {
    id: "test",
    name: "Test",
    tagline: "Test",
    icon: "",
    accent: "",
    cta: "",
    order: 0,
    enabled: true,
    features: [],
    users: 4,
    currency: "BDT" as const,
    setupFee: 0,
    quarterlyFee: 0,
  };
  assert.equal(getPlanPrice(plan, "monthly"), null);
  assert.equal(
    getPlanPrice({ ...plan, monthlyFee: 2000 }, "yearly")?.amount,
    24000,
  );
  assert.equal(
    getPlanPrice({ ...plan, quarterlyFee: 300 }, "yearly")?.amount,
    16.25,
  );
  assert.equal(
    getPlanPrice({ ...plan, currency: "USD", monthlyFee: 100 }, "monthly")
      ?.sourceCurrency,
    "USD",
  );
});
