/**
 * i18n parity check for messages/<locale>.json against messages/en.json.
 *
 * Fails (exit 1) on problems that break or visibly corrupt the UI:
 *   - value type mismatch (string vs object/array) — next-intl throws
 *   - ICU placeholder mismatch ({name} present in en but not in locale, or vice versa)
 *   - encoding corruption: runs of "???" where text was lost on save
 *   - invalid JSON
 * Reports (no failure) coverage gaps, since missing keys fall back to English
 * at runtime (i18n/messages.ts mergeMessages):
 *   - keys missing from a locale, keys only in a locale
 *
 * Usage: node scripts/check-i18n-keys.mjs [--verbose]
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const messagesDir = path.join(process.cwd(), "messages");
const BASE = "en";
const LOCALES = ["bn", "zh", "tr", "ar", "ja", "ne", "vi"];
const verbose = process.argv.includes("--verbose");

// Text lost to a wrong-encoding save shows up as "?" runs or "?" inside words (d?zeyde).
const qCount = (t) => (t.match(/\?/g) || []).length;
const isCorrupt = (base, other) =>
  /\?{3,}/.test(other) || (/\p{L}\?\p{L}/u.test(other) && qCount(other) > qCount(base));
// Top-level ICU argument names: {name}, {count, plural, ...}
function placeholders(text) {
  const names = new Set();
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "{") {
      if (depth === 0) {
        const m = /^\{\s*([A-Za-z_][\w]*)/.exec(text.slice(i));
        if (m) names.add(m[1]);
      }
      depth += 1;
    } else if (ch === "}") {
      depth = Math.max(0, depth - 1);
    }
  }
  return [...names].sort().join(",");
}

function kind(v) {
  if (Array.isArray(v)) return "array";
  if (v === null) return "null";
  return typeof v;
}

function walk(base, other, keyPath, out) {
  const kb = kind(base);
  const ko = kind(other);
  if (ko === "undefined") {
    out.missing.push(keyPath);
    return;
  }
  if (kb !== ko) {
    out.errors.push(`${keyPath}: type mismatch (en ${kb} vs ${ko})`);
    return;
  }
  if (kb === "object" || kb === "array") {
    for (const key of Object.keys(base)) {
      walk(base[key], other[key], kb === "array" ? `${keyPath}[${key}]` : `${keyPath}.${key}`, out);
    }
    for (const key of Object.keys(other)) {
      if (!(key in base)) out.extra.push(kb === "array" ? `${keyPath}[${key}]` : `${keyPath}.${key}`);
    }
    return;
  }
  if (kb === "string") {
    if (isCorrupt(base, other)) {
      out.errors.push(`${keyPath}: corrupted text ${JSON.stringify(other.slice(0, 60))}`);
    }
    const pb = placeholders(base);
    const po = placeholders(other);
    if (pb !== po) out.errors.push(`${keyPath}: placeholder mismatch (en {${pb}} vs {${po}})`);
  }
}

async function load(locale) {
  const file = path.join(messagesDir, `${locale}.json`);
  return JSON.parse(await readFile(file, "utf8"));
}

async function main() {
  const base = await load(BASE);
  let failed = false;

  for (const locale of LOCALES) {
    let messages;
    try {
      messages = await load(locale);
    } catch (error) {
      console.error(`✗ ${locale}: cannot read/parse messages/${locale}.json — ${error.message}`);
      failed = true;
      continue;
    }

    const out = { errors: [], missing: [], extra: [] };
    for (const key of Object.keys(base)) walk(base[key], messages[key], key, out);

    const status = out.errors.length ? "✗" : "✓";
    console.log(
      `${status} ${locale}: ${out.errors.length} errors, ${out.missing.length} missing (falls back to en), ${out.extra.length} extra`,
    );
    for (const e of out.errors) console.log(`    error  ${e}`);
    if (verbose) {
      for (const m of out.missing) console.log(`    missing ${m}`);
      for (const x of out.extra) console.log(`    extra   ${x}`);
    }
    if (out.errors.length) failed = true;
  }

  if (failed) {
    console.error("\ni18n check failed.");
    process.exit(1);
  }
  console.log("\ni18n check passed (run with --verbose to list missing keys).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
