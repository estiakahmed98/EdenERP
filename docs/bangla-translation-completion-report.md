# Bangla Translation Completion Report

Project: Adon ERP (Next.js, next-intl) — files `messages/en.json` (reference) and `messages/bn.json`.

## Summary

| Metric | Value |
|---|---|
| English leaf keys (`en.json`) | 37,425 |
| Bangla leaf keys (`bn.json`) | 37,517 |
| Initially missing Bangla keys | 13,257 |
| Missing Bangla keys now | **0** |
| Extra Bangla-only keys (preserved) | 92 |
| Unique English strings translated | ~11,000 (used for the 13,257 missing keys plus English text left in place, e.g. `appPages`, `communityApp`) |
| Corrupted existing strings repaired | 15 (stray Korean/Thai/Japanese/Chinese/Cyrillic characters inside Bangla text) |
| Existing translations corrected otherwise | 2 (`mergeList` missing `{date}`; `totalPosts` made an ICU plural like `en.json`) |
| Syntax fix | Trailing comma in `bn.json` removed |

## Automated verification

Run with `scratchpad/verify.js` (checks run against the current files):

- `en.json` and `bn.json` parse as strict JSON: **pass**.
- Every English key exists in Bangla (0 missing): **pass**.
- Object/array structure matches `en.json` (0 type mismatches): **pass**.
- No stray foreign-script characters in Bangla strings: **pass**.
- ICU/`{placeholder}` consistency: **pass** for all strings. The checker still lists 2 keys
  (`pages.community.blog.dynamic.totalPosts`, `pages.budgetManagement.table.rowsCount`).
  Both are false positives: they are `{count, plural, one {…} other {…}}` messages whose nested
  braces confuse the simple regex; the `count` variable and the plural structure match English.
- `npx tsc --noEmit`: no errors reported. (Only JSON files were changed, no TypeScript.)
- ESLint was not run (no source code was touched).

## Intentionally unchanged values (identical to English)

1,064 Bangla values still equal the English text. All were reviewed and are intentional:

- Icon names and CSS/gradient/colour tokens (e.g. `Sparkles`, `from-blue-500 to-indigo-600`, `#3aafa9`).
- Routes, asset paths, URLs, e-mail addresses, slugs and status identifiers.
- Acronyms/technical terms kept as is (ERP, CRM, BOQ, CSV, Excel, WIP, SKU, TIN, NID, CGPA, EMI, MRP, MTBF, MTTR, SPI, CPI, CMMS, FEFO, GDPR…).
- Product, brand and organisation names (Adon ERP, Next.js, GitHub, Starbucks Coffee, UNICEF, FCDO, Denim House…).
- Personal names, place names in sample data, money/amount samples and document numbers (e.g. `BDT 2,40,00,000`, `GP-IN`).
- Code tokens such as `'{DEPT}'`, `'{YY}'`, `'{SEQ3}'` and the literal key `common.actions.liveDemo`.

## Empty / null values (kept as in the repository)

- 4 Bangla strings are empty on purpose (English fragments with no Bangla equivalent because of word order):
  `pages.hardwarestore.loyaltySection.titleMiddle`, `pages.mrp.hero.title`, `pages.mrp.hero.titleEnd`,
  `pages.recruitment.automationSection.subtitle`.
- 4 `badge` values in `pages.pricing.erpPackages.*` are `null` in both languages.

## Translation conventions

- Latin digits kept (consistent with existing `bn.json`), e.g. `1 সেপ্টে`, `120-এর মধ্যে 25`.
- Currency written as `টাকা` in prose; `BDT`/`USD` kept in figures.
- Consistent ERP vocabulary: সরবরাহকারী (vendor/supplier), রসিদ (receipt), চালান (challan / shipment), লেজার (ledger), চার্ট অব অ্যাকাউন্টস, ওয়্যারহাউস, রিকুইজিশন, ইনভয়েস, পেরোল.

## Unresolved issues

None known. Remaining recommendations: do a native-speaker pass over the long marketing/demo copy in
`pages.industriesApp` and `pages.accountingShowcase`, and a visual check of `/bn/...` pages in the browser
(no browser/runtime test was run). Nothing was committed or pushed.
