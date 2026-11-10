/**
 * Bangla translation quality audit: messages/bn.json against messages/en.json.
 *
 * Read-only. Prints a summary per category and per section, and with
 * --json <file> writes every finding (key, en, bn, issues) for review.
 *
 * Categories
 *   missing        key in en, absent in bn (falls back to English at runtime)
 *   extra          key only in bn (never rendered unless code reads it)
 *   structure      type / array-length mismatch
 *   placeholder    ICU {arg} set differs
 *   html           <tag> set differs
 *   whitespace     leading/trailing space differs (breaks split headlines)
 *   untranslated   bn === en and en contains real English words
 *   englishHeavy   most letters in bn are Latin although en is a sentence
 *   mt             machine-translation fingerprint score >= 1 (see mtScore)
 *   formal         stiff/machine-translation wording (see FORMAL list)
 *   punctuation    Bangla sentence ending with "." instead of "।"
 *   digits         ASCII digits in otherwise Bangla prose (house style: Bangla digits)
 *   overflow       short UI label whose bn is much longer than en
 *   term           a non-approved variant of a glossary term
 *
 * Usage: node scripts/audit-bn-translations.mjs [--json out.json] [--section pages.home]
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "messages");
const args = process.argv.slice(2);
const jsonOut = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;
const sectionFilter = args.includes("--section") ? args[args.indexOf("--section") + 1] : null;

const en = JSON.parse(await readFile(path.join(dir, "en.json"), "utf8"));
const bn = JSON.parse(await readFile(path.join(dir, "bn.json"), "utf8"));

// Wording that reads as stiff, archaic or machine translated in UI/marketing copy.
export const FORMAL = [
  "অনুগ্রহপূর্বক", "নিমিত্তে", "নিমিত্ত", "দ্বারা সম্পাদিত", "সম্পাদন করুন", "প্রদান করা হয়েছে",
  "পরিদর্শন করুন", "অবলোকন", "উপরন্তু", "তদুপরি", "এতদ্বারা", "সমুদয়", "প্রণয়নকৃত",
  "বিদ্যমান রয়েছে", "অবস্থিত রয়েছে", "করা হইয়া", "হইবে", "করিতে", "করিয়া", "হইয়া",
  "সক্ষমতা প্রদান", "সহায়তা প্রদান করে", "নিশ্চিতকরণ", "ব্যবহারকারীগণ",
];

// Approved term → variants that should be replaced (see docs/localization/BANGLA_STYLE_GUIDE.md).
export const TERMS = {
  "প্রজেক্ট": ["প্রকল্প"],
  "ড্যাশবোর্ড": ["ড্যাশবোর্ড়", "ড্যাসবোর্ড"],
  "ইনভেন্টরি": ["মজুদ ব্যবস্থাপনা", "ইনভেনটরি"],
  "ইনভয়েস": ["চালান", "ইনভয়েজ", "ইনভইস"],
  "কাস্টমার/গ্রাহক": ["খরিদ্দার", "ক্রেতাগণ"],
  "সাপ্লাই চেইন": ["সরবরাহ শৃঙ্খল", "সাপ্লাই চেন"],
  "ওয়ার্কফ্লো": ["কর্মপ্রবাহ", "ওয়ার্কফ্লো়"],
  "রিপোর্ট": ["প্রতিবেদন"],
  "সেটিংস": ["সেটিং্স", "বিন্যাস"],
  "ইমেইল": ["ই-মেইল", "ইমেল"],
  "অ্যাপ": ["এপ", "অ্যাপ্লিকেশনসমূহ"],
};

/**
 * Machine-translation fingerprint score (0 = clean). ≥1 reported as "mt",
 * ≥2 is a strong signal. Counts English-article calques (একটি…একটি), pronoun
 * calques (তারা/এটি for things), literal prepositions (দ্বারা, বিরুদ্ধে,
 * হিসাবে), stiff passives and Google-Translate punctuation.
 */
export function mtScore(b) {
  const words = (b.match(/[ঀ-৿]+/g) || []).length || 1;
  const c = (re) => (b.match(re) || []).length;
  let s = 0;
  s += Math.max(0, c(/একটি/g) - 1) * 1.5;
  s += c(/(^|\s)(তারা|তাদের|তাদেরকে|এটি|এটা|প্রত্যেকে|প্রত্যেককে|তার নিজস্ব)(\s|$|,|।)/g) * 1.2;
  s += c(/হিসাবে(?![ঀ-৿])|বিরুদ্ধে|দ্বারা|অর্থপ্রদান|অর্থ প্রদান|যেতে পারে|প্রদান করা|সক্ষম করে|অনুমতি দেয়|অনুমতি দিয়েছে|কিনা তা|যা আপনাকে|আপনাকে .{0,20}দেয়/g) * 1.5;
  s += c(/করা হয়(?!েছে)|করা হয়েছে|হয়ে যায়|রাখতে দেয়|করতে দেয়/g) * 0.7;
  s += c(/[ঀ-৿]\.(\s|$)/g) * 2;
  s += c(/৷/g) * 2;
  s += c(/(^|\s)(আপনার|আপনি)(\s)/g) > 2 ? 1 : 0;
  return +((s / Math.sqrt(words)) * 3).toFixed(2);
}

const LATIN = /[A-Za-z]/g;
const BENGALI = /[ঀ-৿]/g;
const count = (s, re) => (s.match(re) || []).length;

function placeholders(text) {
  const names = new Set();
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "{") {
      if (depth === 0) {
        const m = /^\{\s*([A-Za-z_]\w*)/.exec(text.slice(i));
        if (m) names.add(m[1]);
      }
      depth += 1;
    } else if (ch === "}") depth = Math.max(0, depth - 1);
  }
  return [...names].sort().join(",");
}
const tags = (t) => (t.match(/<\/?[a-zA-Z][\w-]*/g) || []).sort().join(",");

// Values that are legitimately identical in both languages.
const NEUTRAL = (s) =>
  !/[A-Za-z]{2,}/.test(s) || // icons, numbers, punctuation
  /^#[0-9a-f]{3,8}$/i.test(s) ||
  /^(https?:|mailto:|tel:|\/)/.test(s) ||
  /^[\w.+-]+@[\w.-]+$/.test(s) ||
  /^[A-Z0-9][A-Z0-9 &/+.-]*$/.test(s) || // acronyms / codes: ERP, CRM, POS, VAT, Q3-2025
  /^[\w-]+$/.test(s) && !/\s/.test(s) && s.length <= 3 ||
  /^(Adon\s?ERP|Adon|Odoo|SAP|Salesforce|GitHub|WhatsApp|Google|bKash|Nagad|Excel|EN|BN)$/i.test(s) ||
  /^[A-Z][a-z]+(?: [A-Z][a-z]+)?$/.test(s) && s.length <= 14 && !/^(Save|Cancel|Delete|Edit|Search|Submit|Close|Open|Next|Back|Home|Login|Logout|Sign|Help|Settings|Total|Status|Date|Name|Email|Phone|Price|Amount)/.test(s); // proper names in demo data

const findings = [];
const stats = {};
const bump = (cat, section) => {
  stats[cat] ??= { total: 0, sections: {} };
  stats[cat].total += 1;
  stats[cat].sections[section] = (stats[cat].sections[section] || 0) + 1;
};
const sectionOf = (key) => {
  const p = key.split(/[.[]/);
  return p[0] === "pages" ? `pages.${p[1]}` : p[0];
};
function add(key, e, b, issues) {
  if (!issues.length) return;
  const section = sectionOf(key);
  for (const i of issues) bump(i, section);
  findings.push({ key, section, issues, en: e, bn: b });
}

function checkString(key, e, b) {
  const issues = [];
  if (placeholders(e) !== placeholders(b)) issues.push("placeholder");
  if (tags(e) !== tags(b)) issues.push("html");
  if (/^\s/.test(e) !== /^\s/.test(b) || /\s$/.test(e) !== /\s$/.test(b)) issues.push("whitespace");

  const latin = count(b, LATIN);
  const beng = count(b, BENGALI);
  const enWords = (e.match(/[A-Za-z]{3,}/g) || []).length;
  if (b === e && !NEUTRAL(e)) issues.push("untranslated");
  else if (enWords >= 4 && latin > 0 && latin / (latin + beng) > 0.6) issues.push("englishHeavy");

  if (beng > 0) {
    if (mtScore(b) >= 1) issues.push("mt");
    if (FORMAL.some((w) => b.includes(w))) issues.push("formal");
    if (/[ঀ-৿][)"”’]?\.\s*$/.test(b) || /[ঀ-৿]\.\s+[ঀ-৿]/.test(b)) issues.push("punctuation");
    // ASCII digits in Bangla prose (ignore codes like A4, ISO 9001, v2, %, times like 10:30, and placeholders)
    const prose = b.replace(/\{[^}]*\}/g, "").replace(/[A-Za-z]+[-\s]?\d+|\d+[A-Za-z]+/g, "");
    if (/\d/.test(prose) && beng > 8) issues.push("digits");
    if (e.length <= 24 && b.length > Math.max(e.length * 2.2, e.length + 18)) issues.push("overflow");
    for (const [, variants] of Object.entries(TERMS)) {
      if (variants.some((v) => b.includes(v))) {
        issues.push("term");
        break;
      }
    }
  }
  add(key, e, b, issues);
}

function walk(e, b, key) {
  if (sectionFilter && !key.startsWith(sectionFilter) && !sectionFilter.startsWith(key)) return;
  if (b === undefined) {
    const leaves = [];
    (function collect(v, k) {
      if (v !== null && typeof v === "object") for (const c of Object.keys(v)) collect(v[c], Array.isArray(v) ? `${k}[${c}]` : `${k}.${c}`);
      else leaves.push([k, v]);
    })(e, key);
    for (const [k, v] of leaves) add(k, v, undefined, ["missing"]);
    return;
  }
  const te = Array.isArray(e) ? "array" : e === null ? "null" : typeof e;
  const tb = Array.isArray(b) ? "array" : b === null ? "null" : typeof b;
  if (te !== tb) return add(key, e, b, ["structure"]);
  if (te === "array" && e.length !== b.length) add(key, `len ${e.length}`, `len ${b.length}`, ["structure"]);
  if (te === "object" || te === "array") {
    for (const k of Object.keys(e)) walk(e[k], b[k], te === "array" ? `${key}[${k}]` : key ? `${key}.${k}` : k);
    for (const k of Object.keys(b)) {
      if (!(k in e)) {
        const kk = te === "array" ? `${key}[${k}]` : key ? `${key}.${k}` : k;
        if (!sectionFilter || kk.startsWith(sectionFilter)) add(kk, undefined, typeof b[k] === "string" ? b[k] : "(object)", ["extra"]);
      }
    }
    return;
  }
  if (te === "string") checkString(key, e, b);
}

walk(en, bn, "");

const order = ["missing", "structure", "placeholder", "html", "whitespace", "untranslated", "englishHeavy", "mt", "formal", "term", "punctuation", "digits", "overflow", "extra"];
console.log("category        total   top sections");
for (const c of order) {
  const s = stats[c];
  if (!s) {
    console.log(`${c.padEnd(15)} ${"0".padStart(5)}`);
    continue;
  }
  const top = Object.entries(s.sections).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => `${k}:${v}`).join("  ");
  console.log(`${c.padEnd(15)} ${String(s.total).padStart(5)}   ${top}`);
}
console.log(`\nkeys with at least one finding: ${findings.length}`);
if (jsonOut) {
  await writeFile(jsonOut, JSON.stringify({ stats, findings }, null, 1), "utf8");
  console.log(`wrote ${jsonOut}`);
}
const blocking = ["structure", "placeholder", "html"].reduce((n, c) => n + (stats[c]?.total || 0), 0);
process.exit(blocking ? 1 : 0);
