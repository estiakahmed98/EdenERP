# Code Audit — AdonERP

**Date:** 2026-11-10 · **Codebase:** Next.js 16.4.6 (App Router, Turbopack), React 19, next-intl 4, NextAuth 4 (JWT), Prisma 7.10 + `@prisma/adapter-pg`, Tailwind 4.
**Size:** 412 files under `app/`, 230 components, 363 localized pages × 8 locales, 11 API route files.

Security-specific findings are in `SECURITY_AUDIT.md`; this report covers correctness, build health and maintainability.

## Baseline health

| Check | Command | Result |
|---|---|---|
| Type check | `npx tsc --noEmit -p .` | **0 errors** (before and after changes) |
| Production build | `npm run build` | **pass** — 2,918 static params generated, compile ~10–24 s, total ~1m55s |
| Unit tests | `npm test` | 9/9 pass (new) |
| i18n | `npm run i18n:check` | pass (after fixes; script was broken — see Q3) |
| Lint | `npm run lint` | **cannot run** — ESLint not installed, no config (see Q4) |

## Findings

### F1 — Blog edits silently discarded content · High · FIXED
- **Affected:** `app/api/blog/[id]/route.ts` (PUT), caller `components/admin/blog/BlogForm.tsx`.
- **Root cause:** the form sends `content`, but the PUT handler destructured only `title, summary, date, author, image, ads`. Editing a post's body returned 200 and changed nothing — admins would believe the edit was saved.
- **Fix:** PUT now accepts and sanitises `content`; all fields typed `unknown` and validated.
- **Verified:** type check + build; unauthenticated PUT → 401 live. *Not verified:* an authenticated edit round-trip (no admin session used in testing — see FUNCTIONAL_TEST_REPORT).

### F2 — DB connection exhaustion silently dropped blog URLs from the sitemap · High · FIXED
- **Affected:** `lib/db.ts`, `app/sitemap.ts`.
- **Root cause:** each process created a `pg` pool with the default `max: 10`; `next build` runs ~11 static-generation workers → up to 110 connections, above Postgres' default `max_connections` (100). The sitemap's blog query failed with `too many clients already`, and `blogPostEntries()` swallowed the error, so the built sitemap contained **0 of 96** blog URLs. The same exhaustion applies to several production instances.
- **Fix:** bounded pool (`3` during build, `5` at runtime, override `DATABASE_POOL_MAX`), idle/connect timeouts; the sitemap now logs the error instead of failing silently.
- **Verified:** rebuilt → no connection errors, 96 blog URLs present; API throughput unchanged (637 req/s at c=100, previously 670).

### F3 — Corrupted hero text in 6 locales · High (user-visible) · FIXED
- **Affected:** `messages/{ar,ja,ne,tr,vi,zh}.json` → `pages.home.hero.typeWords`.
- **Root cause:** commit `5082e70` saved these strings through a non-UTF-8 path; non-Latin characters became literal `?` (e.g. `"???ERP??????"`, `"Kurumsal d?zeyde"`). The homepage hero typed out question marks in those languages.
- **Fix:** faithful translations of the current English phrases written as UTF-8; `i18n:check` now fails on this class of corruption (Q3).
- **Prevention:** edit message files in an editor/script that writes UTF-8; in PowerShell 5.1 use `-Encoding utf8` (see AGENTS/team notes).

### Q1 — `ignoreBuildErrors: true` · Medium · FIXED
Removed (tsc is clean); type errors now fail the build.

### Q2 — Regex-based HTML sanitisation duplicated in 3 places · Medium · FIXED (2 of 3)
`lib/blog.ts`, `app/api/blog/route.ts` and `components/admin/blog/BlogDetails.tsx` each had their own sanitiser. The first two now delegate to `lib/security/sanitize-html.ts`. `BlogDetails.tsx` (admin-only preview, client-side DOMParser) is left as is: content is now sanitised on write, and pulling `sanitize-html` into a client bundle isn't worth the weight. Low residual risk.

### Q3 — `npm run i18n:check` was broken · Medium · FIXED
Script expected `messages/en/*.json` directories; messages are single files per locale, so it crashed with `ENOENT`. Rewritten (`scripts/check-i18n-keys.mjs`) to compare all 7 locales against `en.json`:
- **fails** on type mismatches, ICU placeholder mismatches (next-intl throws at runtime), encoding corruption, invalid JSON;
- **reports** missing keys (runtime falls back to English) and extra keys; `--verbose` lists them.
Verified it detects the original corrupted `tr.json` (3 errors) and passes on the fixed files.

### Q4 — ESLint configured in scripts but not installed · Low · OPEN
`"lint": "eslint ."` exists but `eslint`/`eslint-config-next` are not dependencies and there is no config. Recommendation: add `eslint`, `eslint-config-next` (flat config) and fix/triage in a separate PR — enabling it now would surface a large backlog unrelated to launch.

### Q5 — Two lockfiles (`package-lock.json` and `pnpm-lock.yaml`) · Low · OPEN
Dependency upgrades in this audit were made with npm, so `pnpm-lock.yaml` is now stale. Pick one package manager and delete the other lockfile so CI and production resolve identical versions.

### Q6 — `tsconfig.tsbuildinfo` is committed · Low · OPEN
Build artefact that changes on every type check. Add to `.gitignore` and `git rm --cached`.

### Q7 — Large message bundle architecture · High (performance) · OPEN
See `PERFORMANCE_REPORT.md` P1. Code-level note: `useTranslations("pages")` (whole namespace) in 2 client components and dynamic namespaces (`` `pages.fundAccounting.${page}` ``) are what currently prevent per-route message splitting.

### Q8 — Legacy redirect pages listed in sitemap · Low · FIXED
`/demo` and `/apps/services/project` are redirect stubs; the sitemap now skips pages whose body is a top-level `redirect(...)`.

### Q9 — Placeholder site URL accepted · High (SEO) · FIXED
See `SEO_LOCALIZATION_REPORT.md` S1.

## Files changed in this audit

| Area | Files |
|---|---|
| New security helpers | `lib/security/{sanitize-html,rate-limit,client-ip,image-upload}.ts` |
| Tests | `tests/security.test.ts`; `package.json` scripts `test`, `typecheck`; `tsconfig.json` `allowImportingTsExtensions` |
| API routes | `app/api/upload`, `app/api/admin/analytics/summary`, `app/api/analytics/collect`, `app/api/auth/signup`, `app/api/blog`, `app/api/blog/[id]` |
| Auth | `lib/auth.ts`, `lib/auth-admin.ts`, `app/auth/signup/page.tsx` |
| Data/config | `lib/db.ts`, `lib/blog.ts`, `lib/site.ts`, `app/sitemap.ts`, `next.config.mjs`, `prisma/seed.ts`, `.env.example` |
| Dependencies | `next` 16.4.6, `@prisma/client`/`@prisma/adapter-pg`/`prisma` 7.10.1, `sanitize-html` 2.18.1 (+types), `sharp` override 0.35.5 |
| i18n | `scripts/check-i18n-keys.mjs`; `messages/{ar,ja,ne,tr,vi,zh}.json` (hero `typeWords` only) |

No visual design, layout, animation or copy in `en`/`bn` was changed. `messages/bn.json` contains the owner's uncommitted edits and was not touched by this audit.
