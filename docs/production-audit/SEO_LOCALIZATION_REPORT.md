# SEO & Localization Report — AdonERP

**Date:** 2026-11-10 · **Locales:** en (default), bn, zh, tr, ar, ja, ne, vi — `localePrefix: "always"`, no auto-detection.

## Method
- Crawled every URL in the generated `sitemap.xml` against the local production build and checked: HTTP status, `<link rel="canonical">`, `<title>`, meta description, `<html lang>`, raw/missing translation keys, and `????` text.
- Lighthouse SEO category on 3 pages.
- `npm run i18n:check` (rewritten) across all 7 non-default locales.

## Results

| Check | Result |
|---|---|
| Sitemap URLs | 2,952 (363 pages × 8 locales + 12 blog posts × 8, minus redirect stubs) |
| HTTP 200 | **2,952 / 2,952** |
| Canonical present | 2,952 / 2,952 |
| `<title>` present | 2,952 / 2,952 |
| Meta description present | 2,952 / 2,952 |
| `<html lang>` matches URL locale | 2,952 / 2,952 |
| Raw i18n keys / `MISSING_MESSAGE` in HTML | 0 |
| Lighthouse SEO | 92 → canonical issue (S1), otherwise passing |
| `robots.txt` | allows `/`, disallows `/api/`, `/admin`, `/auth/`, `/checkout`, `/_next/`; welcomes AI crawlers; links sitemap |
| hreflang | every page lists all 8 locales + `x-default` (en) |
| Structured data | Organization, LocalBusiness, WebSite, SoftwareApplication (root layout); BlogPosting on posts; `<` escaped |

## Findings

### S1 — Canonical/hreflang/sitemap pointed to `https://your-domain.com` · Critical (SEO) · FIXED in code, ACTION REQUIRED in env
- **Root cause:** `.env` (copied from `.env.example`) sets `NEXT_PUBLIC_SITE_URL=https://your-domain.com`; `lib/site.ts` used it verbatim. Every canonical, hreflang, OG URL, JSON-LD URL and sitemap `<loc>` pointed to a domain AdonERP doesn't own — search engines would canonicalise the site away.
- **Fix:** `lib/site.ts` ignores placeholder hosts (`your-domain.com`, `example.*`), falls back to Vercel/production URL or localhost, and warns during production builds.
- **Action:** set `NEXT_PUBLIC_SITE_URL` to the real production origin in the production environment. Verify after deploy: `curl -s https://<domain>/en | grep canonical`.

### S2 — Blog posts missing from sitemap after some builds · High · FIXED
Caused by DB connection exhaustion during build (CODE_AUDIT F2). Verified: 96 blog URLs present after fix.

### S3 — Redirecting URLs listed in sitemap · Low · FIXED
`/{locale}/demo` and `/{locale}/apps/services/project` returned 307. Now excluded (16 URLs).

### S4 — Sitemap is frozen at build time · Medium · OPEN
`app/sitemap.ts` is statically generated; new blog posts appear only after the next deploy. Adding `revalidate` as-is would make it scan `app/` on the filesystem at runtime, which isn't available on serverless hosts. **Recommendation:** generate the page-route list at build into a JSON file (or a static array) and keep only the blog query dynamic, then `export const revalidate = 3600`.

### S5 — Corrupted hero copy in 6 locales · High · FIXED
See CODE_AUDIT F3. Now guarded by `i18n:check`.

## Translation coverage (`npm run i18n:check`)

| Locale | Errors | Missing keys (fallback to en) | Extra keys |
|---|---|---|---|
| bn | 0 | 0 | 14 |
| zh | 0 | 0 | 0 |
| tr | 0 | 0 | 0 |
| ar | 0 | 0 | 0 |
| ja | 0 | 0 | 0 |
| ne | 0 | 1 | 0 |
| vi | 0 | 0 | 0 |

Run `node scripts/check-i18n-keys.mjs --verbose` to list the missing `ne` key and the 14 extra `bn` keys (likely leftovers; harmless).

**Limits of this check:** it verifies structure, placeholders and encoding, not translation quality. The six restored hero strings (ar, ja, ne, tr, vi, zh) were written during this audit and should be reviewed by native speakers.

## Locale-specific layout
- `<html lang>` is correct on every page.
- **S6 — Arabic `dir="rtl"` is set only client-side · Medium · OPEN.** `components/locale-document.tsx` sets `document.documentElement.dir` in the browser after hydration, so server HTML is LTR: Arabic pages paint left-to-right until JS runs (layout flip on load, worse on slow devices), and non-JS crawlers see LTR. **Fix:** render `dir` on `<html>` on the server (root layout reads the locale segment), keep the client effect for client-side locale switches. Not changed here because `<html>` lives in the root layout outside `[locale]` and needs a careful refactor.
- Visual RTL/long-string overflow checks were **not** performed (see FUNCTIONAL_TEST_REPORT).

## Recommended next actions
1. Set `NEXT_PUBLIC_SITE_URL` in production (S1) — launch blocker for SEO.
2. Make the sitemap revalidate (S4).
3. Native-speaker review of the 6 restored strings; add `i18n:check` to CI.
4. Submit the sitemap in Google Search Console / Bing Webmaster after deploy; verification meta tags are already wired (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
