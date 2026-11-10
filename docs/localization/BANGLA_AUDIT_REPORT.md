# Bangla localization audit

This report is for the AdonERP product owner, the marketing and content team, and the engineers who maintain `messages/bn.json`.

- **Scope:** `messages/en.json` compared with `messages/bn.json`, 39,340 strings and 1.23M English characters.
- **Date:** 2026-11-10.
- **Method:** automated checks over every string, then hand review of the high-visibility content listed under *Coverage*.
- **What changed:** only `bn.json` values. `en.json` is untouched.

Related documents: [style guide](BANGLA_STYLE_GUIDE.md), [change list](TRANSLATION_CHANGES.md), [validation](LOCALIZATION_VALIDATION.md).

## 1. Summary

**Structure was already sound.**
- No missing keys, type mismatches, array-length differences, ICU placeholder differences or HTML-tag differences.
- Before the rewrite, 12 strings had leading or trailing whitespace that didn't match English. These have been fixed.

**Quality was the problem.** The checks found four kinds of issue:

1. **Machine translation (MT).**
   - It is concentrated in the module showcases under `/apps/*`, i.e. `pages.accountingShowcase`, which is 49% of all text.
   - Examples:
     - "Past usage is solid" became *অতীত ব্যবহার কঠিন* ("past usage is difficult").
     - "Store staff on their phones" became *তাদের ফোনে কর্মীদের স্টোর করুন* ("store your staff on their phones").
     - "Generator spares by site" became *সাইট দ্বারা জেনারেটর spares.*
2. **Invented claims.** The product and app pages added promises the English doesn't make:
   - "Start now" became *এখনই **ফ্রি** শুরু করুন* (59 times).
   - "Meet an advisor" became *HR / AI / আর্কিটেক্ট **এক্সপার্টের** পরামর্শ নিন*.
   - Words like *নিখুঁত* (flawless), *শতভাগ* (100%), *বহুগুণ* (many times over) and *নিরাপদ* (secure) were added.
   - Payroll invented "PF, festival bonus, a few clicks".
   - Recruitment invented "AI-powered ATS".
   - The Expenses CTA replaced its English with "no monthly fee, no hidden cost".
   - A partner was listed as "Saudi Ministry of Health and Family Welfare" when the English says "Ministry of Health".
3. **Mistranslations that change meaning.**
   - "Print quote" became *কোটা প্রিন্ট করুন* ("print quota").
   - "Don't waste time" became *সময়ের অবচয় রোধে* (অবচয় = depreciation).
   - "Invoice" was rendered as *চালান*, which means challan, a different document, in 76 strings.
   - The brand was misspelled *আডন ইআরপি*.
4. **Banglish and inconsistency.**
   - The Community hub pages were written in Latin-script English mixed into Bangla.
   - The same term had several translations: প্রকল্প/প্রজেক্ট in 491 vs 177 strings, অর্ডার/আদেশ, ইনভয়েস/চালান, রিপোর্ট/প্রতিবেদন.
   - Acronyms appeared in both scripts: CRM/সিআরএম, HR/এইচআর, AI/এআই.
   - 72 strings used the Google-Translate danda "৷" (U+09F7).

**What I did:**
- Changed **2,784 strings**. 1,690 of these were hand-written rewrites; the rest were rule-based consistency fixes.
- Added a style guide, a validated patch tool, an audit script and an i18n regression test.
- Every automated check passes (see [validation](LOCALIZATION_VALIDATION.md)).

**What remains:**
- About 690 module-showcase strings still score as machine translation. Most of them are acceptable short questions such as *এটি কি এক্সপোর্ট করা যায়?*, but they have not been hand-rewritten (see §5).
- 30 namespaces are never rendered (§4.1), so I left them alone.

## 2. Findings (before → after)

Counts come from `scripts/audit-bn-translations.mjs` (all 39,340 strings) and the MT fingerprint score used in this audit.

| Category | Severity | Before | After | Notes |
|---|---|---|---|---|
| Missing keys / structure / placeholders / HTML tags | Blocker | 0 | 0 | Parity was already complete. |
| Edge whitespace in split headlines | High | 12 | **0** | Stray spaces rendered as a gap before the brand, e.g. " AdonERP দেখুন". |
| Invented claims and padding (product, pricing, app pages) | High | ~450 strings | **0 known** | Hand review of every product hero, metadata, CTA, app card and pricing feature line. |
| Meaning-changing mistranslations | High | 80+ found | **fixed** | Listed in §3. |
| MT fingerprint score ≥ 2 (strong) | High | 363 | **99** | Mostly in `accountingShowcase`. |
| MT fingerprint score ≥ 1 | Medium | 1,216 | **694** | Remaining strings are mostly acceptable; see §5. |
| Banglish (Latin words inside Bangla prose) | Medium | 139 | **94** | The remainder are mostly file paths and unused namespaces. |
| Non-approved term variants | Medium | 966 | **290** | The remainder are mostly *চালান* used correctly for delivery or VAT challans and *আর্থিক প্রতিবেদন* (financial statements), both intentional. |
| Stiff or formal wording | Low | 32 | **26** | |
| ASCII "." after Bangla instead of "।" | Low | 99 | **71** | The remainder are abbreviations (মো., লি., কো.) and "১." step numbers, which are correct. |
| Google-Translate danda "৷" | Low | 72 | **0** | |
| Short labels ≥ 2.2× the English length (mobile overflow risk) | Medium | 285 | **165** | See §5. |
| "Untranslated" (bn = en) | Info | 580 | 585 | Almost all are identifiers that must not be translated: icon names, colours, ids, CLI commands, names, `BDT 1,64,16,000`. It grew by 5 because acronyms and brands are now kept in Latin. |
| Keys only in bn.json | Info | 14 | 14 | Not removed, as instructed; see §4.3. |

## 3. Important individual fixes

| Key | Problem | Fix |
|---|---|---|
| `pages.pricing.standardPlanPage.priceSummary.quotaPrint` | "Print quote" became *কোটা প্রিন্ট করুন* (quota) | কোটেশন প্রিন্ট করুন |
| `pages.pricing.plans.*.features[*]`, `includedList[*]` | Added "secure", "expert", "advanced infrastructure", "custom studio panel" | Faithful one-line features |
| `pages.expenses.ctaBanner.description` | English replaced by "no monthly fee, no hidden cost…" | Faithful: "Join thousands of businesses…" |
| `pages.payroll.hero.description` | Invented PF, festival bonus, "few clicks", "100% accurate" | Faithful list of payslips, contracts, work entries, deductions, benefits, payments |
| `pages.recruitment.hero.titleHighlight` | "ATS" became "AI-powered ATS" | ATS |
| `pages.timesheets.hero.title` | *সময়ের অবচয়* ("depreciation of time") | সময় নষ্ট নয়, |
| `pages.crm/hr/performance.hero.titleHighlight` | "Magic" replaced by generic text | জাদু |
| `pages.iotdefence.metadata.title` | Product name "Eden Defence" replaced | Eden Defence IoT প্ল্যাটফর্ম |
| `pages.community.find-partner.partners[3].name` | Added "Saudi … and Family Welfare" | স্বাস্থ্য মন্ত্রণালয় |
| `pages.accounting.cta.description` | Brand misspelled *আডন ইআরপি* | AdonERP |
| `pages.accountingShowcase.ep{Payslips,Profile}Page.industries.angles.retail` | "Store staff" became "store your staff" | ফোনেই স্টোরের কর্মীরা। |
| 70 × `startButton` / `footerCta.button` | "Start now" became "start **free** now" | এখনই শুরু করুন |
| 40 × `advisorButton` | "Meet an advisor" became "talk to an HR/AI/retail expert" | পরামর্শকের সঙ্গে কথা বলুন |
| 76 strings | Invoice rendered as *চালান* | ইনভয়েস |
| 490 strings | প্রকল্প | প্রজেক্ট (as you specified) |

## 4. Issues outside bn.json, for the product owner

### 4.1 Thirty namespaces are never rendered

Verified by searching every `useTranslations`/`getTranslations` call, plus the shared helpers.

```
pages.{toystore, hotel, textile, restaurant, fastfood, guesthouse, bookstore, clothingstore,
grocerystore, hardwarestore, furniturestore, furniture, beveragedistributor, realestate,
construction, architecture, accounting-firm, marketing, audit, talent, metalfab,
collaborate, customerstories, partner, events, translations, documents, spreadsheet,
support, manufacturingSubnav}
```

- The live industry pages render from `pages.industriesApp`, and the live Documents and Spreadsheet apps use `pages.appPages.*`.
- These 30 blocks (about 2,800 strings) were **not hand-rewritten**. A few rule-based CTA, glossary and spelling fixes reached them as a side effect, which is harmless.
- Several old sub-blocks of `pages.community` (`tutorials`, `forum`, `github`, `documentation`, `training`, `meet-advisor`, `become-a-partner`, `events`, `translations`) also look unused, because the community redesign reads `pages.communityApp`. I rewrote the Banglish in `tutorials` before confirming this; the change is harmless.
- **Recommendation:** delete these blocks from all 8 locale files in one reviewed change. They add about 150 KB of English per locale to the message bundle that is sent to every page (see the performance report).

### 4.2 Pricing page copy is database-driven (action needed)

`app/[locale]/pricing` renders the hero, plans, plan features, modules and FAQs from Postgres through `lib/pricing/service.ts`:
- The tables are `PricingPageContent`, `PricingPlan`, `PricingPlanFeature`, `PricingFaq` and `PricingModule`.
- `messages/bn.json → pages.pricing` is only the **default**. It is used when the database has no rows for `bn`.

On the local database the `bn` rows exist and override the file. The rendered `/bn/pricing` still shows the old *স্বচ্ছ মূল্যনীতি* / *সহজ পরিকল্পনা।*, while `pages.pricing.ui` strings (labels, comparison, FAQ headings) show the new copy.

**Action:** for each environment, either re-enter the Bangla pricing content from `pages.pricing` in the admin pricing editor, or clear the `bn` pricing rows so the defaults apply. I did not modify any database. Blog posts are also database content and were out of scope.

### 4.3 English source issues (en.json was not modified)

| Key | Issue |
|---|---|
| `pages.pricing.plans.standard.features[4]`, `standardPlanPage.includedList[0,3]`, `successPacksPage.faq.items[3].answer` | English mentions **Odoo / Odoo.sh**, which reads like copy from Odoo's pricing page. Bangla says AdonERP or omits it; the English should be fixed. |
| `pages.*.ctaBanner.title`, `accounting.cta.description` | English claims "15 million users", "15,000+ businesses" and "98% implementation success rate", while the home page says "Early users". **Verify these claims**; Bangla translates them faithfully. |
| `pages.home.nativeAi.quote*`, `pages.home.nativeAi.typeWords` | Not rendered by `NativeAISection.tsx`. These are dead keys. |
| `pages.analytics.metadata.description` and others | Double space in "with  Adon ERP" in English. |
| `pages.iotdefence.*` | English copy is about drones, missiles and air defence: a sensitive topic for a public ERP site. Bangla is now faithful and no longer invents weapons-stock details, but the product owner should confirm this page should be public. |

### 4.4 Keys only in bn.json (not removed)

All 14 are in unused namespaces except `pages.performance.featuresSection`, `pages.performance.testimonial` and `pages.timesheets.hoursSection.demo.demo`. next-intl ignores keys the code never reads. I recommend removing them together with §4.1.

```
pages.architecture.financeSection.titleEnd     pages.discuss.footerCta.titleHighlight
pages.discuss.footerCta.titleEnd               pages.fastfood.inventorySection.titleEnd
pages.metalfab.quotesSection.titleEnd          pages.metalfab.purchaseSection.titleEnd
pages.partner.ctaSection.subtitle              pages.performance.featuresSection (object)
pages.performance.testimonial (object)         pages.realestate.propertiesSection.titleEnd
pages.restaurant.inventorySection.titleEnd     pages.textile.purchaseSection.titleEnd
pages.timesheets.hoursSection.demo.demo        pages.find-partner (object)
```

### 4.5 Owner-approved content left as-is

`pages.home.hero.typeWords`: you reverted my earlier shortening in commit `5082e70`, so I treated it as approved and didn't change it.

## 5. Coverage and remaining work

| Area | Strings | Treatment |
|---|---|---|
| `layout` (nav, mega-menu, footer), `common` | 519 | Full hand review |
| `pages.home`, `pricing`, `apps`, `contact`, `help`, `Checkout` | ~700 | Full hand review |
| Product pages in use (38 namespaces, e.g. `crm`, `hr`, `payroll`, `mrp`) | ~5,000 | Hand review of metadata, hero, CTAs, footer CTAs and app cards. Body sections got only rule-based fixes. |
| `pages.community` hubs and metadata | ~350 | Full hand review |
| `pages.accountingShowcase` (189 module pages) | 18,973 | ~370 worst MT strings hand-rewritten, plus rule-based fixes everywhere. **About 690 strings still flagged** (score ≥ 1); about 100 are strong (score ≥ 2). |
| `industriesApp`, `universityApp`, `merchandisingApp`, `posApp`, `qualityApp`, `fundAccounting`, `manufacturingModules` | ~6,600 | Rule-based fixes only. MT fingerprints are low (≤ 34 flagged per namespace), and the text sampled reads as human-edited. |
| `admin` | 447 | Rule-based only; spot-checked as clean. |
| 30 unused namespaces | ~2,800 | Not reviewed (§4.1). |

**Next actions:**
1. Have a native speaker review the hand-rewritten high-visibility strings, which are listed in full in [TRANSLATION_CHANGES.md](TRANSLATION_CHANGES.md).
2. Rewrite the remaining flagged `accountingShowcase` strings:
   - Run `node scripts/audit-bn-translations.mjs --section pages.accountingShowcase --json out.json`.
   - Review the findings tagged `mt`, `formal`, `term` and `punctuation`. 693 strings carry `mt` across the whole file.
   - Apply the fixes with `scripts/apply-bn-patch.mjs`.
3. Check the 165 overflow-risk labels visually at 360 px width (§LOCALIZATION_VALIDATION).
4. Delete the unused namespaces and fix the English source issues in §4.2.
5. Make the 6 other locales follow the same rules. Their `hero.typeWords` were restored from "???" corruption earlier and still need native review.
