/**
 * Domain-forwarding locale priority (adonerp.com -> adonerp.com.bd).
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  FORWARD_PARAM,
  buildForwardUrl,
  createForwardToken,
  explicitLocaleFromCookies,
  getForwardConfig,
  isPagePath,
  normalizeHost,
  verifyForwardToken,
} from "../lib/geo/domain-forward.ts";
import { countryFromHeaders } from "../lib/geo/locale-cookies.ts";
import worker from "../scripts/domain-forward/cloudflare-worker.js";

const SECRET = "test-secret-0123456789-abcdefghijklmnop";
const SOURCES = ["adonerp.com"];
const NOW = 1_800_000_000;

/* ------------------------------- tokens ------------------------------- */

test("token: a fresh token from an allowed source verifies", async () => {
  const token = await createForwardToken(SECRET, "www.adonerp.com", { nowSeconds: NOW });
  assert.equal(await verifyForwardToken(token, SECRET, SOURCES, { nowSeconds: NOW + 10 }), "adonerp.com");
});

test("token: plain source params and garbage are rejected", async () => {
  for (const bad of ["adonerp.com", "source=adonerp.com", "", "a.b.c", "x".repeat(600), "%%%.%%%"]) {
    assert.equal(await verifyForwardToken(bad, SECRET, SOURCES, { nowSeconds: NOW }), null, bad);
  }
  assert.equal(await verifyForwardToken(null, SECRET, SOURCES), null);
});

test("token: wrong secret, tampered payload or signature are rejected", async () => {
  const token = await createForwardToken(SECRET, "adonerp.com", { nowSeconds: NOW });
  assert.equal(await verifyForwardToken(token, "another-secret-0123456789-abcdefghij", SOURCES, { nowSeconds: NOW }), null);

  const [payload, sig] = token.split(".");
  const forged = Buffer.from(`adonerp.com|${NOW + 99999}|nonce`).toString("base64url");
  assert.equal(await verifyForwardToken(`${forged}.${sig}`, SECRET, SOURCES, { nowSeconds: NOW }), null);
  const flipped = sig.slice(0, -2) + (sig.endsWith("AA") ? "BB" : "AA");
  assert.equal(await verifyForwardToken(`${payload}.${flipped}`, SECRET, SOURCES, { nowSeconds: NOW }), null);
});

test("token: expired or from a non-allowed source is rejected", async () => {
  const token = await createForwardToken(SECRET, "adonerp.com", { nowSeconds: NOW, ttlSeconds: 60 });
  assert.equal(await verifyForwardToken(token, SECRET, SOURCES, { nowSeconds: NOW + 60 + 31 }), null);
  assert.equal(await verifyForwardToken(token, SECRET, SOURCES, { nowSeconds: NOW + 60 + 20 }), "adonerp.com", "clock skew tolerated");

  const evil = await createForwardToken(SECRET, "evil.example", { nowSeconds: NOW });
  assert.equal(await verifyForwardToken(evil, SECRET, SOURCES, { nowSeconds: NOW }), null);
});

test("token: disabled when no (or a too-short) secret is configured", async () => {
  const token = await createForwardToken(SECRET, "adonerp.com", { nowSeconds: NOW });
  assert.equal(await verifyForwardToken(token, null, SOURCES, { nowSeconds: NOW }), null);
  assert.equal(getForwardConfig({ DOMAIN_FORWARD_SECRET: "short" }).secret, null);
  assert.equal(getForwardConfig({ DOMAIN_FORWARD_SECRET: SECRET }).secret, SECRET);
});

/* ------------------------------- config ------------------------------- */

test("config: defaults and normalisation", () => {
  const cfg = getForwardConfig({});
  assert.deepEqual(cfg.sourceHosts, ["adonerp.com"]);
  assert.equal(cfg.targetOrigin, "https://adonerp.com.bd");
  assert.equal(cfg.ttlSeconds, 120);
  assert.equal(getForwardConfig({ DOMAIN_FORWARD_TTL_SECONDS: "99999" }).ttlSeconds, 600);
  assert.equal(getForwardConfig({ DOMAIN_FORWARD_TARGET_ORIGIN: "javascript:alert(1)" }).targetOrigin, null);
  assert.equal(normalizeHost("WWW.AdonERP.com:443"), "adonerp.com");
  assert.equal(normalizeHost("adonerp.com.bd"), "adonerp.com.bd");
});

test("routing: page paths match the proxy matcher", () => {
  for (const p of ["/", "/en", "/bn/pricing", "/apps/accounting"]) assert.ok(isPagePath(p), p);
  for (const p of ["/api/geo", "/_next/static/x.js", "/admin", "/auth/login", "/robots.txt", "/logo.png"]) {
    assert.ok(!isPagePath(p), p);
  }
});

test("forward URL: keeps path + query, replaces any incoming token", async () => {
  const cfg = { ...getForwardConfig({ DOMAIN_FORWARD_SECRET: SECRET }), secret: SECRET, targetOrigin: "https://adonerp.com.bd" };
  const url = await buildForwardUrl(new URL(`https://adonerp.com/bn/pricing?plan=pro&${FORWARD_PARAM}=stale`), cfg, "adonerp.com");
  assert.equal(url.origin, "https://adonerp.com.bd");
  assert.equal(url.pathname, "/bn/pricing");
  assert.equal(url.searchParams.get("plan"), "pro");
  assert.equal(url.searchParams.getAll(FORWARD_PARAM).length, 1);
  assert.equal(await verifyForwardToken(url.searchParams.get(FORWARD_PARAM), SECRET, SOURCES), "adonerp.com");

  const asset = await buildForwardUrl(new URL("https://adonerp.com/robots.txt"), cfg, "adonerp.com");
  assert.equal(asset.toString(), "https://adonerp.com.bd/robots.txt");
});

test("cloudflare worker: tokens verify with the app's verifier", async () => {
  const res = await worker.fetch(new Request("https://www.adonerp.com/solutions?x=1"), { DOMAIN_FORWARD_SECRET: SECRET });
  assert.equal(res.status, 307);
  assert.equal(res.headers.get("cache-control"), "private, no-store");
  const location = new URL(res.headers.get("location")!);
  assert.equal(location.origin + location.pathname, "https://adonerp.com.bd/solutions");
  assert.equal(location.searchParams.get("x"), "1");
  assert.equal(await verifyForwardToken(location.searchParams.get(FORWARD_PARAM), SECRET, SOURCES), "adonerp.com");
});

/* -------------------------- locale preference ------------------------- */

const names = { locale: "NEXT_LOCALE", geoHint: "GEO_LOCALE_HINT", source: "LOCALE_SOURCE" };
const jar = (c: Record<string, string>) => ({ get: (n: string) => (n in c ? { value: c[n] } : undefined) });
const isLocale = (v: string) => ["en", "bn"].includes(v);

test("preference: only a switcher choice counts as explicit", () => {
  assert.equal(explicitLocaleFromCookies(jar({ NEXT_LOCALE: "bn" }), isLocale, names), "bn");
  assert.equal(explicitLocaleFromCookies(jar({ NEXT_LOCALE: "bn", GEO_LOCALE_HINT: "bn" }), isLocale, names), null, "geo-chosen");
  assert.equal(explicitLocaleFromCookies(jar({ NEXT_LOCALE: "en", LOCALE_SOURCE: "forward" }), isLocale, names), null, "forward-chosen");
  assert.equal(explicitLocaleFromCookies(jar({ NEXT_LOCALE: "xx" }), isLocale, names), null);
  assert.equal(explicitLocaleFromCookies(jar({}), isLocale, names), null);
});

/* ------------------------------- country ------------------------------ */

const headers = (h: Record<string, string>) => ({ get: (n: string) => h[n.toLowerCase()] ?? null });

test("country: Vercel trusts only its own header", () => {
  const env = { VERCEL: "1", NODE_ENV: "production" };
  assert.equal(countryFromHeaders(headers({ "x-vercel-ip-country": "bd" }), env), "BD");
  assert.equal(countryFromHeaders(headers({ "cf-ipcountry": "BD", "x-country-code": "BD" }), env), null, "spoofed");
});

test("country: GEO_COUNTRY_HEADER pins the trusted header", () => {
  const env = { GEO_COUNTRY_HEADER: "cf-ipcountry", NODE_ENV: "production" };
  assert.equal(countryFromHeaders(headers({ "cf-ipcountry": "BD" }), env), "BD");
  assert.equal(countryFromHeaders(headers({ "x-vercel-ip-country": "BD" }), env), null);
  assert.equal(countryFromHeaders(headers({ "cf-ipcountry": "XX" }), env), null);
});

test("country: legacy fallback list and dev override still work", () => {
  assert.equal(countryFromHeaders(headers({ "cloudfront-viewer-country": "US" }), { NODE_ENV: "production" }), "US");
  assert.equal(countryFromHeaders(headers({}), { GEO_COUNTRY_OVERRIDE: "bd", NODE_ENV: "development" }), "BD");
  assert.equal(countryFromHeaders(headers({}), { GEO_COUNTRY_OVERRIDE: "bd", NODE_ENV: "production" }), null);
});
