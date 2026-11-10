# Security Audit — AdonERP

**Date:** 2026-11-10 · **Scope:** all API routes (`app/api/**`), auth (`lib/auth*.ts`), admin surface, file upload, HTML rendering sinks, dependencies, secrets handling, HTTP headers.
**Method:** manual code review of every route + live tests against a local production build (`next start`, port 3100, local Postgres). No production systems were touched.

## Summary

| Severity | Found | Fixed | Open |
|---|---|---|---|
| Critical | 3 | 3 | 0 |
| High | 4 | 4 | 0 |
| Medium | 7 | 6 | 1 |
| Low | 5 | 2 | 3 |

**No known open Critical or High security issues remain.** One Medium (zod advisory, not exploitable here) and three Lows are open with recommendations.

---

## Findings

### C1 — Unauthenticated file upload → stored XSS on the site origin · Critical · FIXED
- **Affected:** `app/api/upload/route.ts`
- **Root cause:** no authentication; file extension taken from the client filename; type check trusted the client-sent MIME type. A request with `type: image/png` and name `evil.html` was written to `public/uploads/<id>.html` and served from the AdonERP origin (session cookies in scope).
- **Fix:** admin-only (`isAdminRequest()`); size checked before buffering (`content-length` and `File.size`, max 5 MB); type detected from magic bytes (`lib/security/image-upload.ts`) and the extension derived from the detected type — never from the filename; `/uploads/*` now served with `Content-Security-Policy: default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox` as defence in depth.
- **Verified:** live `POST /api/upload` (HTML disguised as PNG, no session) → `401`. Unit tests reject HTML/SVG byte streams.

### C2 — Next.js 16.2.x: unauthenticated RCE advisories · Critical · FIXED
- **Affected:** `next@16.2.11` — GHSA-2464-fhr4-w9xw (RCE via Image Optimization + SVG), GHSA-673q-mjm6-r5xr (RCE in `use cache`), GHSA-p3m5-59mp-jv5r (Server Actions DoS). Range `>=16.0.0 <=16.4.0`.
- **Fix:** `next@16.4.6` (patch within major). Build, crawl and API suites re-run green afterwards.

### C3 — Blog HTML sanitizer bypassable (stored XSS on public blog) · Critical → treated High (requires admin-authored content) · FIXED
- **Affected:** `lib/blog.ts` `sanitizeHtmlFragment`, `app/api/blog/route.ts`; sink `app/[locale]/community/learn/blog/[slug]/page.tsx` (`dangerouslySetInnerHTML`).
- **Root cause:** regex blacklist. Demonstrated bypasses (executed against the old function): `<svg/onload=alert(1)>`, `<a href=javascript:alert(1)>`, `<a href="java&#115;cript:…">` all passed through unchanged.
- **Fix:** allowlist sanitizer `lib/security/sanitize-html.ts` (`sanitize-html@2.18.1`): fixed tag/attribute/style allowlist matching Jodit output, URL schemes limited to `http/https/mailto/tel`, `rel="noopener noreferrer"` forced on `target=_blank`. Applied on **write** (POST and PUT) and on **render**.
- **Verified:** 12 payloads in `tests/security.test.ts` neutralised; legitimate formatting (headings, alignment, lists, links, images, tables) preserved.

### H1 — Admin analytics API readable by anyone · High · FIXED
- **Affected:** `app/api/admin/analytics/summary/route.ts` had no auth check (visitor counts, paths, referrers, countries/cities).
- **Fix:** `isAdminRequest()` guard → `401`. Verified live.

### H2 — No brute-force protection on sign-in · High · FIXED
- **Affected:** `lib/auth.ts` (Credentials provider).
- **Fix:** in-process limiter: 10 attempts / 15 min per email+IP, 50 / 15 min per IP; counter reset on success; inputs length-capped.
- **Verified live:** attempts 1–10 → denied, 11th → "Too many sign-in attempts".

### H3 — Sign-up: no rate limit, weak password policy, race on duplicate email · High · FIXED
- **Affected:** `app/api/auth/signup/route.ts`, `app/auth/signup/page.tsx`.
- **Fix:** 5 sign-ups/hour/IP; email format + 254-char cap; password 8–72 bytes (bcrypt truncates silently past 72); bcrypt cost 10→12; unique-constraint race (`P2002`) returns `409` instead of `500`. Form `minLength`/label updated to match.
- **Verified live:** invalid email/short/overlong → `400`; 6th attempt from one IP → `429`.

### H4 — Seed creates `admin@example.com` / `admin123` · High · FIXED
- **Affected:** `prisma/seed.ts`. Running the seed against production would create a known-credential ADMIN.
- **Fix:** password from `SEED_ADMIN_PASSWORD` (min 12 chars); in production the admin seed is skipped without it; in development a random password is generated and printed once.
- **Action required:** if the seed was ever run against a shared/production DB, change or delete `admin@example.com` now.

### M1 — Analytics collector: unvalidated input, no rate limit, unbounded third-party call · Medium · FIXED
- **Affected:** `app/api/analytics/collect/route.ts`
- **Root causes / fixes:**
  - Client `ts` trusted (Invalid Date → exception; arbitrary back/forward-dated rows) → accepted only within ±5 min of server time.
  - Arbitrary `X-Forwarded-For` strings sent to ip-api.com and cached → IP validated with `net.isIP` (`lib/security/client-ip.ts`).
  - Geo lookup had no timeout (a slow ip-api stalled every page view) → 1.5 s `AbortSignal.timeout`, failures non-fatal.
  - `geoIpCache.create` raced on the unique key → `upsert`.
  - No rate limit / body cap → 120 events/min/IP, 8 KB body cap.
  - Hard-coded fallback salt `"boe-default-salt"` made IP hashes reversible → falls back to `AUTH_SECRET`; no hash if no secret. *Note: daily-unique counts on deploy day will be slightly inflated because the hash changes.*
  - DB errors were reported as `400` → now `500` + server log.
- **Verified live:** invalid JSON → 400, absurd ts → 200, >8 KB → 413, request 121 → 429, other IP unaffected.

### M2 — Blog edit endpoint mass-assignment/validation gaps · Medium · FIXED
`PUT /api/blog/[id]` accepted unvalidated `date` (Invalid Date → 500), unbounded strings, unsanitised summary. Now typed as `unknown`, length-capped, date validated, summary sanitised. (Also see functional bug F1.)

### M3 — `typescript.ignoreBuildErrors: true` · Medium · FIXED
Type errors could ship to production. `tsc --noEmit` is clean (0 errors), so the flag is now `false`; the production build type-checks.

### M4 — Secrets committed in git history · Medium · MITIGATED (action required)
`.env` was tracked in commits `7c56236`, `293138d`, `c267098` (variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_TINYMCE_API_KEY`) before `cd24caf "Stop tracking .env"`. Checked by equality only (values never printed): the current `AUTH_SECRET` and `DATABASE_URL` **differ** from the leaked ones.
**Action:** confirm production secrets were never set to the leaked values; revoke the old TinyMCE key; if the repository is or was public, treat all four as compromised.

### M5 — Missing `Permissions-Policy` · Medium → Low · FIXED
Added `camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()` (none are used).

### M6 — No Content-Security-Policy on pages · Medium · OPEN
Not added in this pass: the site uses inline JSON-LD, inline style, GA/GTM and Vercel Analytics; a strict CSP needs per-request nonces (which would conflict with future static rendering) and cross-browser testing. **Recommendation:** ship `Content-Security-Policy-Report-Only` with a report endpoint first, then enforce.

### M7 — zod 3.x memory-exhaustion advisory (GHSA-mrhx-c7xc-m3w5) · Medium · OPEN (accepted)
Fix requires zod 4 (major; `@hookform/resolvers` v3 would also need v5). **Not exploitable here:** the only zod schemas on public input (`lib/demo-requests/validation.ts`) sit behind a streamed 16 KB body cap (`lib/demo-requests/http.ts`), and array fields are bounded by enum length. Schedule the zod 4 migration post-launch.

### Low findings
| ID | Finding | Status |
|---|---|---|
| L1 | `sharp` < 0.35.5 (librsvg CVE), `source-map-js`, `fast-uri`, Prisma dev-server `@hono/node-server` advisories | FIXED (`sharp` override 0.35.5, `prisma`/`@prisma/*` 7.10.1, `npm audit fix`) |
| L2 | Role is cached in the JWT for the session lifetime (30 days): a demoted admin keeps admin rights until the token expires | OPEN — re-read `role` from DB in the `jwt` callback (e.g. every 5 min) |
| L3 | Rate limits are per process (in-memory) | OPEN — fine for one instance; use Redis/DB (like `demo_request_rate_limits`) when scaling out |
| L4 | `X-Forwarded-For` first hop is trusted; spoofable if the proxy appends instead of overwriting | OPEN — confirm proxy config (Vercel overwrites; nginx needs `proxy_set_header X-Forwarded-For $remote_addr`) |
| L5 | Sign-up reveals whether an email is registered (409) | ACCEPTED (UX) — revisit if public sign-up stays enabled |

### Verified as already sound
- Demo-request API: same-origin check, streamed 16 KB cap, DB-backed rate limit (5/h, hashed IPs), dedupe, parameterised `$queryRaw` tagged templates.
- Admin pages: server-side `requireAdminSession()` in `app/admin/layout.tsx`; all admin APIs (`blog` POST/PUT/DELETE, `admin/demo-requests`, `admin/pricing`) check `role === "ADMIN"`.
- No raw SQL built by string concatenation (`$queryRawUnsafe`/`$executeRawUnsafe` not used).
- JSON-LD `dangerouslySetInnerHTML` sinks escape `<`.
- `.env*` git-ignored; no secrets found in the working tree (pattern scan).
- Existing headers: HSTS (preload), `nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `X-Powered-By` removed, `X-Robots-Tag: noindex` on `/admin`.

---

## Tests executed

| Command | Result |
|---|---|
| `npm test` (`node --test tests/`) | 9/9 pass — sanitizer (12 payloads + formatting), rate limiter, client IP parsing, image signature detection |
| Live API suite (27 checks, prod build) | 27/27 pass — authz on 7 endpoints, collector hardening, signup validation + 429, sign-in lockout on 11th try, demo-request origin guard, 6 security headers, `/uploads` CSP, `/admin` redirect |
| Old-sanitizer bypass reproduction | 3 of 4 payloads passed the old regex unchanged (confirms C3) |
| `npm audit` | before: 1 critical, 3 high, 4 moderate → after: 1 high (zod, see M7) |

The live suite is a scratch script (not committed) because it targets a running server; the unit tests are committed in `tests/security.test.ts`.

## Not performed
- Authenticated admin-flow penetration testing (no admin credentials were used).
- Third-party/infra review (hosting, WAF, DB network exposure, backups).
- DAST scanner (e.g. OWASP ZAP) run.

## Recommended next actions
1. Rotate/confirm secrets per M4; remove `admin@example.com` if it exists anywhere shared (H4).
2. CSP in report-only mode (M6).
3. DB-refreshed role in JWT (L2); shared rate-limit store before multi-instance (L3).
4. zod 4 migration (M7).
