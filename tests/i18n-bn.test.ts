/**
 * Regression tests for the Bangla localisation (messages/bn.json).
 *
 * Guards the invariants the 2026-11 Bangla rewrite relied on: same structure as
 * en.json, ICU messages that still compile, identical placeholders, preserved
 * edge whitespace for split headlines, and none of the machine-translation
 * artefacts that were cleaned up.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "@formatjs/icu-messageformat-parser";

const en = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url), "utf8"));
const bn = JSON.parse(readFileSync(new URL("../messages/bn.json", import.meta.url), "utf8"));

type Pair = { path: string; en: string; bn: string };
const pairs: Pair[] = [];
const structural: string[] = [];

function kind(v: unknown) {
  return Array.isArray(v) ? "array" : v === null ? "null" : typeof v;
}
function walk(e: unknown, b: unknown, path: string) {
  if (b === undefined) return; // missing keys fall back to English at runtime
  if (kind(e) !== kind(b)) {
    structural.push(`${path}: ${kind(e)} vs ${kind(b)}`);
    return;
  }
  if (Array.isArray(e)) {
    if (e.length !== (b as unknown[]).length) structural.push(`${path}: array length ${e.length} vs ${(b as unknown[]).length}`);
    e.forEach((v, i) => walk(v, (b as unknown[])[i], `${path}[${i}]`));
  } else if (e && typeof e === "object") {
    for (const k of Object.keys(e)) walk((e as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], path ? `${path}.${k}` : k);
  } else if (typeof e === "string") pairs.push({ path, en: e, bn: b as string });
}
walk(en, bn, "");

function argNames(message: string): string {
  const names = new Set<string>();
  const visit = (nodes: ReturnType<typeof parse>) => {
    for (const n of nodes as unknown as Array<Record<string, unknown>>) {
      if (typeof n.value === "string" && n.type !== 0) names.add(n.value);
      if (n.options) for (const o of Object.values(n.options as Record<string, { value: ReturnType<typeof parse> }>)) visit(o.value);
      if (Array.isArray(n.children)) visit(n.children as ReturnType<typeof parse>);
    }
  };
  visit(parse(message, { ignoreTag: true }));
  return [...names].sort().join(",");
}

test("bn.json has the same structure and array lengths as en.json", () => {
  assert.deepEqual(structural, []);
  assert.ok(pairs.length > 30000, `expected the full catalogue, got ${pairs.length} strings`);
});

test("every Bangla ICU message compiles and keeps the English placeholders", () => {
  const failures: string[] = [];
  for (const p of pairs) {
    let enArgs: string;
    try {
      enArgs = argNames(p.en);
    } catch {
      continue; // English itself is not ICU-parseable; nothing to compare
    }
    try {
      const bnArgs = argNames(p.bn);
      if (bnArgs !== enArgs) failures.push(`${p.path}: {${bnArgs}} != en {${enArgs}}`);
    } catch (error) {
      failures.push(`${p.path}: does not compile (${(error as Error).message})`);
    }
  }
  assert.deepEqual(failures.slice(0, 20), []);
});

test("split-headline fragments keep the English leading/trailing spaces", () => {
  const edge = (s: string) => `${/^\s/.test(s)}${/\s$/.test(s)}`;
  const bad = pairs.filter((p) => edge(p.en) !== edge(p.bn)).map((p) => p.path);
  assert.deepEqual(bad, []);
});

test("no machine-translation or encoding artefacts remain", () => {
  const bad = pairs
    .filter((p) => /৷/.test(p.bn) || /\?{3,}/.test(p.bn) || /Adon\s+ERP/.test(p.bn) || /প্রকল্প/.test(p.bn))
    .map((p) => p.path);
  assert.deepEqual(bad, []);
});

test("recurring CTAs use one approved translation", () => {
  const approved: Record<string, string> = {
    "Start now": "এখনই শুরু করুন",
    "Meet an advisor": "পরামর্শকের সঙ্গে কথা বলুন",
    "Request a demonstration": "ডেমোর অনুরোধ করুন",
    "See all features": "সব ফিচার দেখুন",
  };
  const bad = pairs.filter((p) => approved[p.en] && p.bn !== approved[p.en]).map((p) => `${p.path}: ${p.bn}`);
  assert.deepEqual(bad, []);
});
