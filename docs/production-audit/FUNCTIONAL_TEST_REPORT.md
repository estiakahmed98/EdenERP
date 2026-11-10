# Functional Test Report — AdonERP

**Date:** 2026-11-10 · **Target:** local production build (`next start`), local Postgres.

## Coverage summary

| Area | Status | How |
|---|---|---|
| Every public page (all 8 locales) renders | ✅ Executed | HTTP crawl of 2,952 sitemap URLs |
| Correct locale per URL | ✅ Executed | `<html lang>` check on every page |
| Translations resolve (no raw keys) | ✅ Executed | SSR output scan on every page + `i18n:check` |
| Legacy redirects (`/demo`, `/apps/services/project`) | ✅ Executed | 307 observed, then excluded from sitemap |
| Admin access control (`/admin` → sign-in) | ✅ Executed | live request |
| API validation/error paths | ✅ Executed | 27-check live API suite |
| Sign-up validation errors + rate limit | ✅ Executed | live API |
| Sign-in failure + lockout | ✅ Executed | live NextAuth credentials flow (nonexistent account) |
| Demo-request rejection paths (origin) | ✅ Executed | live API |
| Demo-request **successful** submission | ⛔ Not executed | would insert a record; existing `scripts/check-demo-requests.mjs` covers it — run on staging |
| Sign-up **successful** account creation | ⛔ Not executed | would create a user |
| Admin flows (blog create/edit/delete, upload, pricing, demo bookings) | ⛔ Not executed | no admin session used; **F1 fix (blog content edit) needs a manual check** |
| Browser E2E: navigation, menus, popups, language switcher, CTA clicks, form UI | ⛔ Not executed | no Playwright/Cypress in repo; only HTTP-level checks |
| Responsive / cross-browser visual | ⛔ Not executed | see below |
| Keyboard / screen-reader | ⚠️ Partial | Lighthouse a11y only |

## Executed results

### Page crawl
```
pages 2952 | 200: 2952 | non-200: 0
canonical/title/description missing: 0 | raw i18n keys: 0 | lang mismatches: 0
```

### Live API suite — 27/27 pass
Unauthenticated access rejected (401) on: `POST /api/upload`, `GET /api/admin/analytics/summary`, `POST /api/blog`, `PUT /api/blog/1`, `DELETE /api/blog/1`, `GET /api/admin/demo-requests`, `GET /api/admin/pricing`.
Analytics collector: invalid JSON 400 · absurd timestamp 200 · 9 KB body 413 · 121st request/min 429 · other IP 200.
Sign-up: invalid email 400 · short password 400 · 73-byte password 400 · 6th attempt 429.
Sign-in: 10 × denied, 11th rate-limited.
Demo requests: no Origin 403 · foreign Origin 403.
Headers: nosniff, X-Frame-Options, Referrer-Policy, HSTS, Permissions-Policy present; X-Powered-By absent; `/uploads/*` sandbox CSP; `/admin` → 307 `/auth/signin`.

### Unit tests — `npm test` 9/9 pass
Sanitizer (12 XSS payloads blocked, formatting kept, `noopener` added), rate limiter (limit/window/reset), client-IP parsing, image signature detection.

### Accessibility (Lighthouse)
`/en` 96, `/en/pricing` 100, `/bn` 96. Only failing audit: **color-contrast** — 5 elements on the homepage: hero tag pill, the fake browser URL bar and the initials badges in the product preview. Changing these colours affects the approved design, so they're left for design sign-off.

## Defects found
| ID | Defect | Severity | Status |
|---|---|---|---|
| F1 | Editing a blog post's content silently didn't save | High | Fixed (needs manual admin verification) |
| F3 | Hero typed `???` in ar/ja/ne/tr/vi/zh | High | Fixed |
| — | Browser console: `/_vercel/insights/script.js` 404 when not hosted on Vercel | Low | Expected off-Vercel; remove `@vercel/analytics` if not deploying to Vercel |

## Manual checks required before launch
1. Sign in as admin → edit an existing post's **body** → save → reload: change persists (F1).
2. Upload an image in the blog editor (now admin-only + byte-sniffed) — JPEG/PNG/WebP/GIF/AVIF accepted.
3. Submit the demo-booking popup in 2 locales on staging; confirm admin list shows it.
4. Language switcher on 3–4 deep pages keeps the same path.
5. Mobile (375 px), tablet (768 px), desktop (1440 px) spot-check of home, pricing, one industry page, one app page, blog post; Arabic page for RTL.
6. Safari + Firefox + Chrome on the home and demo-booking popup.

## Recommended next actions
Add Playwright with a smoke suite (home per locale, nav menu, language switcher, demo popup open/validate, sign-in error) and run it in CI against preview deployments.
