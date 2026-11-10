# Bangla localization validation

This report records the checks run against `messages/bn.json` after the 2026-11-10 rewrite. Only checks that were actually executed are listed as passed. Anything not run is in §4.

## 1. Commands and results

| # | Check | Command | Result |
|---|---|---|---|
| 1 | JSON validity and key parity, 7 locales against en | `npm run i18n:check` | **Pass.** bn: 0 errors, 0 missing, 0 extra-type issues. |
| 2 | Unit and regression tests (security + new i18n suite) | `npm test` (`node --test tests/`) | **Pass, 14/14.** |
| 3 | bn structure equals en: keys, types, array lengths | `tests/i18n-bn.test.ts` → structure test | **Pass.** 39,340 strings, 0 structural differences. |
| 4 | Every bn ICU message compiles with `@formatjs/icu-messageformat-parser` (the parser next-intl uses) and has the same argument names as en | `tests/i18n-bn.test.ts` → ICU test | **Pass.** 0 failures. |
| 5 | Leading/trailing whitespace parity (split headlines) | `tests/i18n-bn.test.ts` | **Pass.** The last offender (`pages.audit.mobileSection.titleHighlight`) was fixed. |
| 6 | No "৷" (U+09F7), no "???" corruption, no "Adon ERP", no প্রকল্প | `tests/i18n-bn.test.ts` | **Pass.** |
| 7 | Recurring CTAs use the approved strings | `tests/i18n-bn.test.ts` | **Pass.** |
| 8 | Every patch validated before writing: placeholders, HTML tags, edge whitespace and non-empty values against en; JSON re-parsed after writing | `scripts/apply-bn-patch.mjs`, 19 batches | **Pass.** 2,875 changes applied, 0 rejected. |
| 9 | Diff hygiene: values replaced in place, no reformatting | `git diff --stat messages/bn.json` | Only changed value lines differ; key order and CRLF formatting are preserved. |
| 10 | Quality audit before and after | `node scripts/audit-bn-translations.mjs` | See §2. |
| 10b | TypeScript | `npx tsc --noEmit -p .` | **Pass**, 0 errors (includes the new test file). |
| 11 | Live rendering of every Bangla sitemap URL | crawl of `http://localhost:3000` (your running dev server) | See §3. |

`en.json` and the other 6 locale files were not modified (`git diff --stat messages/` lists only `bn.json`).

## 2. Audit metrics (all 39,340 strings)

| Metric | Before | After |
|---|---|---|
| Machine-translation fingerprint ≥ 1 (`mt`) | 1,216 | 693 |
| Machine-translation fingerprint ≥ 2 (strong) | 363 | 99 |
| Non-approved term variants | 966 | 290 |
| Banglish (Latin-heavy Bangla prose) | 139 | 94 |
| Short labels ≥ 2.2× English length (overflow risk) | 285 | 165 |
| Edge-whitespace mismatches | 12 | 0 |
| Google-Translate danda "৷" | 72 | 0 |
| "একটি" occurrences (article calque) | 2,855 | 2,550 |
| Strings changed | — | 2,784 |

## 3. Rendering check

I crawled all **369** Bangla URLs from the sitemap, three at a time, against your running dev server (`localhost:3000`).

- **369/369 return 200** with `<html lang="bn">`.
- No page contains `MISSING_MESSAGE`, `FORMATTING_ERROR`, `INVALID_MESSAGE` or a raw `pages.*` key.
- 5 URLs under `/industries/food&hospitality/*` first returned 404. That was a bug in my crawler: it didn't unescape `&amp;` from the sitemap XML. Re-requested with `&`, all 5 returned 200 with 0 errors.
- Median render time on the dev server was 3.0 s.
- Spot checks confirmed the new strings render: the nav button *ফ্রি ট্রাই করুন*, the testimonials title *টিমগুলোর ভরসা AdonERP* and the home CTA *ব্যবসাকে নিয়ে যান পরের লেভেলে*.

On `/bn/pricing` the hero and plans still show the older copy, because they come from the database (audit §4.2), not from bn.json.

## 4. Not performed, and remaining risks

- **Visual mobile check at 360 px:** no browser automation is installed in the repo (no Playwright or Puppeteer). Overflow was assessed with the length heuristic in §2: 165 labels are still ≥ 2.2× the English length, about half of them in unused namespaces. The highest-risk visible elements were shortened by hand: nav buttons, pricing toggles, plan features, app cards, hero CTAs and floating notes. A designer should still look at `/bn`, `/bn/pricing` and three or four `/bn/apps/*` pages on a phone.
- **Native-speaker review:** I wrote the rewrites following the style guide. A Bangladeshi copywriter should review the hand-reviewed batches in `TRANSLATION_CHANGES.md` before launch, especially the hero headlines and Gen-Z phrasing.
- **Database-driven copy:** the pricing hero, plans, FAQs and modules come from the database when it has rows (see audit §4.2), so `bn.json` changes there are not visible until the admin content is updated.
- **Remaining machine translation:** about 690 strings in `pages.accountingShowcase` still carry the `mt` tag. They are understandable but not polished.
- **Number style:** 82 strings mix ASCII digits into Bangla prose. Most are codes and IDs, which are correct. They were not converted automatically, because some UI values may be parsed by code.
- **Production build:** not re-run for this change. Only JSON values changed, which the ICU compile test covers, and no TypeScript was touched apart from the new test file.
