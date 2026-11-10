/**
 * Apply reviewed Bangla rewrites to messages/bn.json without reformatting it.
 *
 * Patch file: JSON object { "<key path>": "new value" | { "bn": "new value", "why": "reason" } }
 * Key paths use the audit notation: dots for object keys, [i] for array items,
 * e.g. "pages.home.hero.typeWords[0]". Only existing string values can change:
 * keys, ordering, arrays and formatting of the file are left untouched (string
 * literals are replaced in place in the raw text).
 *
 * Every entry is validated against messages/en.json before anything is written:
 *   - path exists in en and bn, and both are strings
 *   - ICU placeholder names and HTML tags match en
 *   - leading/trailing whitespace matches en (split headlines rely on it)
 *   - value is non-empty
 * Any failure aborts the whole patch.
 *
 * Applied changes are appended to docs/localization/translation-changes.jsonl
 * (key, old, new, why, patch name) so the change report can be regenerated.
 *
 * Usage: node scripts/apply-bn-patch.mjs <patch.json> [more.json ...] [--dry-run]
 */
import { readFile, writeFile, appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const bnFile = path.join(root, "messages", "bn.json");
const enFile = path.join(root, "messages", "en.json");
const ledger = path.join(root, "docs", "localization", "translation-changes.jsonl");

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const patchFiles = argv.filter((a) => !a.startsWith("--"));
if (!patchFiles.length) {
  console.error("usage: node scripts/apply-bn-patch.mjs <patch.json> [--dry-run]");
  process.exit(2);
}

/** Map every string value in raw JSON text to { start, end } of its literal (quotes included). */
export function indexStrings(text) {
  const spans = new Map();
  let i = 0;
  const ws = () => {
    while (i < text.length && /\s/.test(text[i])) i += 1;
  };
  const readString = () => {
    const start = i;
    i += 1;
    while (text[i] !== '"') i += text[i] === "\\" ? 2 : 1;
    i += 1;
    return { start, end: i, value: JSON.parse(text.slice(start, i)) };
  };
  const value = (p) => {
    ws();
    const ch = text[i];
    if (ch === "{") {
      i += 1;
      ws();
      if (text[i] === "}") return void (i += 1);
      for (;;) {
        ws();
        const key = readString().value;
        ws();
        i += 1; // :
        value(p ? `${p}.${key}` : key);
        ws();
        if (text[i] === ",") i += 1;
        else return void (i += 1); // }
      }
    }
    if (ch === "[") {
      i += 1;
      ws();
      if (text[i] === "]") return void (i += 1);
      for (let n = 0; ; n += 1) {
        value(`${p}[${n}]`);
        ws();
        if (text[i] === ",") i += 1;
        else return void (i += 1); // ]
      }
    }
    if (ch === '"') {
      const s = readString();
      spans.set(p, { start: s.start, end: s.end, value: s.value });
      return;
    }
    while (i < text.length && !/[,\]}\s]/.test(text[i])) i += 1; // number/true/false/null
  };
  value("");
  return spans;
}

function placeholders(text) {
  const names = new Set();
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "{") {
      if (depth === 0) {
        const m = /^\{\s*([A-Za-z_]\w*)/.exec(text.slice(i));
        if (m) names.add(m[1]);
      }
      depth += 1;
    } else if (text[i] === "}") depth = Math.max(0, depth - 1);
  }
  return [...names].sort().join(",");
}
const tags = (t) => (t.match(/<\/?[a-zA-Z][\w-]*/g) || []).sort().join(",");
const edges = (t) => `${/^\s/.test(t)}|${/\s$/.test(t)}`;

const enText = await readFile(enFile, "utf8");
const bnText = await readFile(bnFile, "utf8");
const enSpans = indexStrings(enText);
const bnSpans = indexStrings(bnText);

const edits = new Map();
const errors = [];
for (const file of patchFiles) {
  const patch = JSON.parse(await readFile(file, "utf8"));
  const name = path.basename(file);
  for (const [key, entry] of Object.entries(patch)) {
    const next = typeof entry === "string" ? entry : entry?.bn;
    const why = typeof entry === "string" ? "" : entry?.why || "";
    const en = enSpans.get(key);
    const bn = bnSpans.get(key);
    if (!en || !bn) errors.push(`${key}: not a string in ${!en ? "en" : "bn"}.json`);
    else if (typeof next !== "string" || !next.trim()) errors.push(`${key}: empty value`);
    else if (placeholders(en.value) !== placeholders(next))
      errors.push(`${key}: placeholders {${placeholders(next)}} != en {${placeholders(en.value)}}`);
    else if (tags(en.value) !== tags(next)) errors.push(`${key}: HTML tags differ from en`);
    else if (edges(en.value) !== edges(next))
      errors.push(`${key}: leading/trailing whitespace differs from en ${JSON.stringify(en.value)}`);
    else if (next !== bn.value) edits.set(key, { span: bn, next, why, patch: name, en: en.value });
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  console.error(`\n${errors.length} invalid entries; nothing written.`);
  process.exit(1);
}

const ordered = [...edits.entries()].sort((a, b) => b[1].span.start - a[1].span.start);
let out = bnText;
for (const [, e] of ordered) {
  out = out.slice(0, e.span.start) + JSON.stringify(e.next) + out.slice(e.span.end);
}
JSON.parse(out); // must still be valid JSON

if (dryRun) {
  console.log(`dry run: ${edits.size} changes would be applied.`);
  process.exit(0);
}
await writeFile(bnFile, out, "utf8");
await mkdir(path.dirname(ledger), { recursive: true });
const at = new Date().toISOString();
await appendFile(
  ledger,
  [...edits.entries()]
    .map(([key, e]) => JSON.stringify({ key, en: e.en, old: e.span.value, new: e.next, why: e.why, patch: e.patch, at }))
    .join("\n") + (edits.size ? "\n" : ""),
  "utf8",
);
console.log(`applied ${edits.size} changes to messages/bn.json`);
