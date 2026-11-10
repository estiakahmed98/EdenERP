# Performance Report — AdonERP

**Date:** 2026-11-10 · **Environment:** local production build (`next build` + `next start`), Windows dev machine, local Postgres. Lighthouse 12.8.2, mobile preset (simulated 4× CPU throttle, slow 4G). Numbers are for comparison and prioritisation; re-measure on the real host/CDN.

## Measurements

### Lighthouse (mobile)

| Page | Perf | A11y | Best pr. | SEO | LCP | TBT | CLS | FCP | Transfer |
|---|---|---|---|---|---|---|---|---|---|
| `/en` | **40** | 96 | 96 | 92* | 6.5 s | 2,010 ms | 0.065 | 3.3 s | 913 KiB |
| `/en/pricing` | 65 | 100 | 96 | 92* | 6.0 s | 250 ms | 0 | 3.6 s | 847 KiB |
| `/bn` | **38** | 96 | 96 | 92* | 6.9 s | 2,260 ms | 0.061 | 3.9 s | 1,026 KiB |

\*SEO 92 was caused by the placeholder canonical domain (fixed, see SEO report S1). Best-practices 96 is a console error from `/_vercel/insights/script.js` (404 off Vercel — expected locally).

### Server (full crawl, 2,952 URLs, 8 concurrent)
- Server response p50 **682 ms**, p90 843 ms, p99 990 ms.
- HTML document size p50 **1,187 KB**, max 1,423 KB (`/bn`).
- Build output: **every page route is `ƒ` (dynamic)** — rendered on every request.

## Findings (by impact)

### P1 — ~934 KB of unrelated translations shipped in every page · High · OPEN (plan below)
- **Evidence:** `/en/pricing` HTML is 1,188 KB, of which 1,097 KB is the RSC payload. Probing `en.json` strings: 934 KB of non-pricing `pages.*` namespaces are present in that page.
- **Root cause:** `app/[locale]/layout.tsx` passes all messages to `NextIntlClientProvider`, excluding only `accountingShowcase`.
- **Impact:** this is the main driver of LCP/FCP/TBT. Lighthouse shows the LCP element (hero `<p>`) with TTFB 460 ms, load 0 ms and **render delay 6,040 ms** — the text is ready but the main thread is busy parsing/executing ~1 MB of inline RSC scripts. It also costs server CPU (P2) and mobile data.
- **Why not changed in this audit:** two client components call `useTranslations("pages")` (whole namespace) and some use computed namespaces (`` `pages.fundAccounting.${page}` ``). Removing a namespace that a client component still needs throws `MISSING_MESSAGE` in production. This needs a route-by-route change, not a blanket edit.
- **Plan (est. 1–2 days):**
  1. Root layout provider keeps only `common`, `layout`, and namespaces used by globally mounted client components (header, footer, demo booking, floating actions).
  2. Add a nested `NextIntlClientProvider` in each section layout (`apps/`, `industries/`, `community/`, …) that picks only that section's namespaces.
  3. Replace `useTranslations("pages")` with specific namespaces; pass computed-namespace data from the server.
  4. Verify with the crawler in this audit (it flags raw message keys in SSR output) plus a browser console check.
- **Expected result:** HTML from ~1.2 MB to ~150–250 KB on most pages; large LCP/TBT improvement.

### P2 — All pages are dynamically server-rendered · High · OPEN
- **Evidence:** build route table shows `ƒ` for all 363 localized pages. Load test: page throughput **~15 req/s per Node process** regardless of concurrency (≈65 ms CPU/request); latency grows linearly (p50 635 ms @10 → 3.2 s @50 → 6.6 s @100 concurrent).
- **Root causes:**
  1. `app/[locale]/layout.tsx` `generateMetadata` reads `headers()` (`x-pathname`) to build canonical/hreflang → opts every page out of static rendering.
  2. `setRequestLocale` is called in 1 of 363 pages, so next-intl's `getLocale()` reads request headers.
  3. Layout reads pricing settings from the DB on every request (`getPricingSiteConfig`).
- **Plan:** call `setRequestLocale(locale)` in `[locale]/layout.tsx` and every page; move canonical/hreflang into per-page metadata (`getLocaleAlternates(path)` — 46 pages already do this) instead of reading headers; cache pricing config with revalidation tagged on admin save. Then pages can be static/ISR and served from CDN.
- **Risk if launched as-is:** fine on Vercel (serverless autoscaling) for normal B2B traffic; on a single VPS a traffic spike (launch post, ads) will queue requests at ~15 req/s per process. Run multiple processes (PM2 cluster) or put a CDN with short HTML caching in front.

### P3 — Main-thread JS on the homepage · Medium · OPEN
Bootup: chunk `2vks9de…` 3.1 s, `0uezo7l…` (framer-motion) 2.6 s, document inline scripts 1.6 s (P1). DOM 2,492 elements. Unused JS only ~45 KiB, so the work is evaluation/hydration rather than dead code. After P1, re-profile; candidates: lazy-mount below-the-fold animated sections, defer the Three.js background (`ThreeBg`, already loaded from `/vendor/three`) until idle.

### P4 — Analytics geo lookup could stall requests · Medium · FIXED
`ip-api.com` call had no timeout; now 1.5 s cap and non-fatal (see SECURITY M1).

### P5 — Postgres pool exhaustion · High · FIXED
See CODE_AUDIT F2. Bounded pool; API throughput unchanged.

### Already good
- `next/image` with AVIF/WebP and 30-day cache; static asset `Cache-Control: max-age=31536000`.
- `optimizePackageImports` for lucide/react-icons/framer-motion/date-fns/recharts.
- Hero entrance animation is transform-only (no `opacity:0`), so it doesn't delay LCP itself.
- CLS ≤ 0.065 (good).
- `accountingShowcase` (852 KB) is already excluded from the client payload.

## Commands executed
```
npm run build                                   # route table, timings
node crawl.mjs                                  # 2,952 URLs, latency + HTML size
npx lighthouse@12.8.2 http://localhost:3100/{en,en/pricing,bn} --only-categories=performance,accessibility,best-practices,seo
npx autocannon@8.0.0 -c {10,50,100} -d 20 …     # see LOAD_TEST_REPORT
```

## Not performed
- Field data (CrUX/RUM) — none available before launch.
- WebPageTest / real-device testing, CDN-level measurements.
- Bundle analyzer run (Turbopack chunk names are hashed; attribution above is by content sampling).
