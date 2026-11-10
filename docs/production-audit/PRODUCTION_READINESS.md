# Production Readiness — AdonERP

**Date:** 2026-11-10 · **Verdict:** ready to launch **once the 4 environment/ops blockers below are done**. No open Critical or High code-level security defects. Performance is the main known weakness (works, but slow on mobile).

## Launch blockers (action required, not code)

| # | Item | Why | How to verify |
|---|---|---|---|
| B1 | Set `NEXT_PUBLIC_SITE_URL` to the real production origin | Otherwise canonicals/sitemap use a fallback host (was `your-domain.com`) | `curl -s https://<domain>/en \| grep canonical` |
| B2 | Set `AUTH_SECRET` (new random value), `NEXTAUTH_URL` (`https://<domain>`), `ANALYTICS_IP_SALT` | Session signing; current `.env` has `NEXTAUTH_URL=http://localhost:3000/` | sign in on production |
| B3 | Confirm production secrets ≠ values leaked in git history; revoke old TinyMCE key; ensure no `admin@example.com` / `admin123` account exists | SECURITY M4/H4 | `SELECT email, role FROM users WHERE role='ADMIN'` |
| B4 | Database migrations: on a **fresh** DB run `npx prisma migrate deploy`. If the production DB was created with `prisma db push` (as the local one was — it has no migration history), baseline first: `npx prisma migrate resolve --applied 20260609_add_pricing_management` and `… 20261103_add_demo_requests` | Otherwise `migrate deploy` fails trying to recreate existing tables | `npx prisma migrate status` → "up to date" |

## Readiness checklist

| Area | Status | Notes |
|---|---|---|
| Production build | ✅ | `npm run build` passes with type checking enforced |
| Type check | ✅ | 0 errors |
| Unit tests | ✅ | `npm test` 9/9 |
| i18n integrity | ✅ | `npm run i18n:check` passes |
| Lint | ❌ | ESLint not installed (CODE_AUDIT Q4) |
| Dependency vulns | ✅ | 1 high (zod) accepted with justification (SECURITY M7) |
| Security headers | ✅ | HSTS, nosniff, XFO, Referrer-Policy, Permissions-Policy; CSP pending (M6) |
| AuthN/AuthZ | ✅ | all admin APIs/pages guarded; brute-force limits |
| Schema/migrations | ⚠️ | schema matches local DB (`migrate diff` empty); see B4 |
| DB connection pool | ✅ | bounded (`DATABASE_POOL_MAX`, default 5); check `max_connections` × instances |
| Uploads storage | ⚠️ | files written to `public/uploads` on local disk — **lost on redeploy and not shared across instances; read-only on Vercel**. Move to object storage (S3/R2/Vercel Blob) before relying on uploads in production |
| Monitoring / error logging | ❌ | only `console.error`; no Sentry/APM. Add error tracking + uptime check on `/en` and `/api/blog?limit=1` |
| Analytics | ✅/⚠️ | GA/GTM via env; `@vercel/analytics` only works on Vercel |
| Backups | ❓ | not visible from the repo — confirm automated daily Postgres backups + one restore test |
| Rollback | ⚠️ | no documented procedure — see below |
| CI | ❌ | none in repo — add build + `typecheck` + `test` + `i18n:check` on PRs |
| Lockfile | ⚠️ | npm and pnpm lockfiles both present; pnpm one is stale |

## Environment variables (names only)
Required: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`.
Recommended: `ANALYTICS_IP_SALT`, `DATABASE_POOL_MAX`, `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_GTM_ID`, search-console verification keys.
Seed only: `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`. All documented in `.env.example`.

## Deployment security
- Run behind a proxy that **overwrites** `X-Forwarded-For` (Vercel does; nginx: `proxy_set_header X-Forwarded-For $remote_addr;`) — rate limits key on it.
- Postgres must not be publicly reachable; use TLS (`?sslmode=require`) if it's on another host.
- Single-instance assumption for rate limits (in-memory). If you scale out, move them to Redis/DB.

## Rollback procedure (proposed)
1. **App:** redeploy the previous build (Vercel: "Promote" previous deployment; self-host: keep the previous `.next` release directory/container tag and switch the symlink/tag).
2. **DB:** this audit adds **no migrations**, so rolling back the app needs no DB change. For future releases, use additive migrations only, and take a backup immediately before `migrate deploy`.
3. **Verify:** home `/en`, `/en/pricing`, sign-in, `/sitemap.xml`.

## Post-launch priorities
1. Translation payload split (PERFORMANCE P1) — biggest UX win.
2. Static rendering/ISR (P2).
3. Error monitoring, CI, ESLint.
4. CSP report-only → enforce; JWT role refresh; zod 4.
5. Object storage for uploads.

## Report index
`CODE_AUDIT.md` · `SECURITY_AUDIT.md` · `FUNCTIONAL_TEST_REPORT.md` · `PERFORMANCE_REPORT.md` · `LOAD_TEST_REPORT.md` · `SEO_LOCALIZATION_REPORT.md`
