import fs from "node:fs/promises";

const locales = ["bn", "ne", "ja", "zh", "tr", "vi"];
const languageCodes = { bn: "bn", ne: "ne", ja: "ja", zh: "zh-CN", tr: "tr", vi: "vi" };
const source = JSON.parse(await fs.readFile("messages/en.json", "utf8")).pages.accountingShowcase;
const cachePath = "scripts/.accounting-showcase-translation-cache.json";
let cache = {};
try { cache = JSON.parse(await fs.readFile(cachePath, "utf8")); } catch {}

const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function collectMissing(s, t, path, out) {
  if (typeof s === "string") { if (t === undefined) out.push({ path, value: s }); return; }
  if (Array.isArray(s)) {
    if (!Array.isArray(t)) { if (t === undefined) s.forEach((v, i) => collectMissing(v, undefined, `${path}.${i}`, out)); return; }
    s.forEach((v, i) => collectMissing(v, t[i], `${path}.${i}`, out)); return;
  }
  if (!isObject(s)) return;
  for (const [k, v] of Object.entries(s)) collectMissing(v, t?.[k], path ? `${path}.${k}` : k, out);
}

function setAt(object, path, value) {
  const parts = path.split("."); const leaf = parts.pop(); let cursor = object;
  for (const part of parts) { if (!cursor[part] || typeof cursor[part] !== "object") cursor[part] = /^\d+$/.test(part) ? [] : {}; cursor = cursor[part]; }
  cursor[leaf] = value;
}

function protect(value) {
  const saved = [];
  const text = value.replace(/\{[^{}]+\}|https?:\/\/\S+|\b[A-Z]{2,}[0-9A-Z_.\/-]*\b/g, (m) => {
    const token = `ZXQPROTECT${saved.length}QXZ`; saved.push(m); return token;
  });
  return { text, restore: (s) => s.replace(/ZXQPROTECT(\d+)QXZ/g, (_, i) => saved[Number(i)]) };
}

async function request(locale, text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${languageCodes[locale]}&dt=t&q=${encodeURIComponent(text)}`;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const result = (data?.[0] ?? []).map((part) => part?.[0] ?? "").join("");
      if (result) return result;
    } catch (error) { if (attempt === 7) throw error; await delay(error?.message?.includes("429") ? 5000 * (attempt + 1) : 700 * (attempt + 1)); }
  }
  throw new Error("Translation returned no text");
}

async function translateBatch(locale, items) {
  const prepared = items.map((item) => ({ item, guard: protect(item.value) }));
  const joined = prepared.map(({ guard }, i) => `ZXQITEM${i}QXZ\n${guard.text}`).join("\n");
  const translated = await request(locale, joined);
  const parts = [];
  const re = /ZXQITEM(\d+)QXZ\s*\n([\s\S]*?)(?=\nZXQITEM\d+QXZ\s*\n|$)/g;
  let match;
  while ((match = re.exec(translated))) parts[Number(match[1])] = match[2].trim();
  if (parts.length !== items.length || parts.some((x) => !x)) {
    return Promise.all(prepared.map(async ({ item, guard }) => {
      const key = `${locale}:${item.value}`;
      if (!cache[key]) cache[key] = guard.restore(await request(locale, guard.text));
      return cache[key];
    }));
  }
  return parts.map((part, i) => {
    const key = `${locale}:${items[i].value}`;
    cache[key] = prepared[i].guard.restore(part);
    return cache[key];
  });
}

async function runLocale(locale) {
  const file = `messages/${locale}.json`;
  const catalog = JSON.parse(await fs.readFile(file, "utf8"));
  const target = catalog.pages.accountingShowcase ?? {};
  const missing = [];
  collectMissing(source, target, "", missing);
  const pending = [];
  for (const item of missing) {
    const cached = cache[`${locale}:${item.value}`];
    if (cached !== undefined) setAt(target, item.path, cached);
    else pending.push(item);
  }
  console.log(`${locale}: ${missing.length} missing strings, ${pending.length} not cached`);
  const batches = [];
  let current = []; let size = 0;
  for (const item of pending) {
    const next = item.value.length + 40;
    if (current.length && size + next > 2600) { batches.push(current); current = []; size = 0; }
    current.push(item); size += next;
  }
  if (current.length) batches.push(current);
  let completed = 0;
  const concurrency = 3;
  for (let start = 0; start < batches.length; start += concurrency) {
    const group = batches.slice(start, start + concurrency);
    const results = await Promise.all(group.map((batch) => translateBatch(locale, batch)));
    for (let i = 0; i < group.length; i += 1) group[i].forEach((item, j) => setAt(target, item.path, results[i][j]));
    completed += group.reduce((n, b) => n + b.length, 0);
    if (completed % 100 < group.reduce((n, b) => n + b.length, 0) || completed === pending.length) console.log(`${locale}: ${completed}/${pending.length}`);
    await fs.writeFile(cachePath, JSON.stringify(cache), "utf8");
  }
  catalog.pages.accountingShowcase = target;
  await fs.writeFile(file, JSON.stringify(catalog, null, 2) + "\n", "utf8");
  console.log(`${locale}: saved`);
}

for (const locale of locales) await runLocale(locale);
