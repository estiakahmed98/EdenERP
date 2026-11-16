# Medical College — Bengali localization and UX content audit

Reviewed on 16 November 2026. Scope: the eight public Medical College pages, their shared UI, navigation labels, metadata and interactive preview states. No other module or language catalogue was rewritten.

## Outcome

- Reviewed **249 EN/Bn string pairs**: 240 in `pages.medicalCollegeApp`, plus nine global Medical College menu labels.
- Rewrote **117 existing Bengali values**, retained 127 after review, and added five contextual EN/Bn pairs.
- EN/Bn Medical College key parity: **100%**. All source keys and existing placeholders remain intact.
- English source copy remains unchanged apart from the five new messages. Other language files are unchanged.
- All eight pages use translations for prose, labels, accessible names, feedback and metadata. Retained Latin text is limited to branding, programme/regulator/API/currency identifiers, unit identifiers A/B, sorting ranges A–Z/Z–A and user-entered reference codes.

The existing implementation is a **local planning preview**. It has no connected academic API, student record system, institutional permissions or approval backend. Copy now states this clearly without implying a real admission, signature, published result, allowance payment or regulatory decision.

## Editorial method

Read all source components and all 244 original catalogue pairs, including strings not currently rendered. Each pair was checked for:

1. Original English meaning and the action actually performed by the component.
2. Natural Bangladesh Bengali grammar and sentence structure.
3. Medical education terminology and the difference between planning, review and approval.
4. Concise professional UX wording and consistency across shared uses.
5. Literal phrasing, unnecessary English and robotic noun chains.

`medical-college-bn-review.json` records every retained, rewritten and added value. `medical-college-bn.patch.json` is the repeatable patch for existing values. Changes were applied through `scripts/apply-bn-patch.mjs`; its ledger records the revisions, including two final wording refinements. The ledger therefore has 119 rows for 117 distinct changed keys.

## Page coverage

All routes below have prefix `/[locale]/apps/medical-college/`. Each page's title, description/SEO, stored headline, breadcrumb, shared CTA, loading/error copy and accessible control names were reviewed. The stored headline fields are currently unused; they were reviewed without changing the hero design.

### 1. Intake & Admission — `intake-admission`

- Title/menu: **ভর্তি পরিকল্পনা ও কার্যক্রম**. “Intake” no longer implies candidate selection or a merit decision.
- Audited admission stages, DGME reference timeline, seat labels, reference creation dialog, duplicate/empty/invalid reference feedback, search, stage filtering, sorting and detail actions.
- Added a dedicated no-search-results message instead of claiming records are disconnected when the filter has no match.
- Plan counts use the locale number formatter. The reference dialog uses the existing validator for empty submissions, keeping its message translated instead of depending on browser validation language. The `required` attribute and validation rules remain present.
- Tested capacity bounds, creation, duplicate rejection, stage advancement, filter/search/sort and all reference-timeline buttons in EN/Bn, desktop/mobile/tablet.

### 2. Cards & Items — `cards-items`

- Kept the familiar medical education terms **কার্ড** and **আইটেম**. Maximum marks is consistently **পূর্ণমান**.
- Audited item labels, mark-entry accessible names, totals, percentage, invalid marks, add/remove actions and the professor/registrar checklist.
- “পর্যালোচনার প্রস্তুতি” was corrected to “পর্যালোচনার চেকলিস্ট” where the source denotes a checklist. No checklist is presented as an actual signature.
- Tested invalid/valid marks, review gating, local review feedback, review reset after editing and item add/remove in both languages and all four QA modes.

### 3. Professional Exams — `professional-exams`

- Title remains **প্রফেশনাল পরীক্ষা**; academic phases consistently use **পর্যায়**.
- Audited user-entered institutional thresholds, attendance/assessment labels, status changes, result worksheet, review feedback and phase handover.
- Distinguished preparation for institutional review from actual examination eligibility, result publication or promotion.
- Localized the two decorative criterion indices. No threshold, percentage or examination rule changed.
- Tested review gating, changed-threshold invalidation, result validation and percentage outputs in both languages and all four modes.

### 4. Ward Placement — `ward-placement`

- Title remains **ওয়ার্ডে প্রশিক্ষণ**. Used **ক্লিনিক্যাল রোটেশন**, **ওয়ার্ড পোস্টিং**, **প্রশিক্ষণ ইউনিট** and **সেশন** consistently in their relevant contexts.
- Audited the calendar, unit labels, date-aware slot accessible names, selected session, attendance simulation, planning notes and learning history.
- Replaced hardcoded `W / 01` with a localized week label. Session-reference errors no longer imply a global uniqueness constraint that this component does not enforce.
- Selected-session/history dates and accessible slot names include the year; compact calendar column headings remain short.
- Tested invalid reference, session planning, attendance, previous/next week and returning to an existing session. Patient data remains explicitly prohibited.

### 5. Interns — `interns`

- Title/menu: **ইন্টার্ন চিকিৎসক**, matching the people represented by “Interns”. Internship remains **ইন্টার্নশিপ** in journey copy.
- Audited postings, date range/overlap feedback, logbook labels, supervisor notes/checklist, allowance calculation and local review feedback.
- Added a logbook-specific progress label instead of reusing “checklist progress”.
- Posting date ranges now display both years when a posting crosses the year boundary.
- Tested overlapping postings, cross-year display, logbook percentage, allowance arithmetic and review preparation in both languages and all four modes.

### 6. Postgraduate Trainees — `postgraduate-trainees`

- Title remains **স্নাতকোত্তর প্রশিক্ষণার্থী**. FCPS, MD, MS, BCPS and BMDC remain Latin identifiers.
- Audited every programme tab, training-evidence checklist, supervisor notes/review and stipend estimate.
- Corrected **affiliation → অধিভুক্তি**, avoiding conflation with recognition/accreditation (**স্বীকৃতি**).
- Tested FCPS/MD/MS switching, checklist progress, supervisor feedback, stipend arithmetic and resetting programme-specific draft state.

### 7. Governance — `governance`

- Title/menu: **কলেজ পরিচালনা ও তদারকি**.
- Audited responsibility-map controls, all four responsibility descriptions, evidence/reviewer/policy checklist, review summary and budget comparison.
- Added a budget-specific disclaimer. The budget panel no longer shows an irrelevant allowance/stipend/payroll warning.
- Tested all four responsibility areas, local summaries, budget overrun feedback and locale-formatted remaining amount.
- No statutory committee structure, Academic Council requirement or legal compliance assertion was added.

### 8. College Settings — `college-settings`

- Audited academic/seat/validation tabs, institution-code helper, date range, document-language preference, regulator-reference notes, consistency badges and local review feedback.
- Academic period is **একাডেমিক মেয়াদ**, not an assumed academic year. This preserves the broader English meaning.
- Tested invalid settings, references, language preference, date range, seat bounds, consistency status and review feedback in both languages and all four modes.
- The document-language preference remains a preview field; the actual global language switch was separately tested.

## Terminology decisions

- Admission round: **ভর্তির ধাপ** in this illustrative timeline. Do not imply an officially published round.
- Migration: **মাইগ্রেশন**; merit list: **মেধাতালিকা**; quota: **কোটা**. These are not rendered workflows in the current eight pages, so none was invented.
- Professional examination: **প্রফেশনাল পরীক্ষা**.
- Formative assessment: **ধারাবাহিক মূল্যায়ন (Formative Assessment)** when that specific concept is meant. Current generic assessment fields remain **মূল্যায়ন**; they were not relabelled as statutory formative assessment.
- Card final: **কার্ড ফাইনাল পরীক্ষা**. No card-final examination workflow exists in these previews.
- Clinical rotation / ward placement: **ক্লিনিক্যাল রোটেশন / ওয়ার্ডে প্রশিক্ষণ**; rotational posting: **রোটেশনভিত্তিক পোস্টিং**.
- Logbook: **লগবুক**; intern / internship: **ইন্টার্ন চিকিৎসক / ইন্টার্নশিপ**; supervisor: **তত্ত্বাবধায়ক**.
- Postgraduate trainee: **স্নাতকোত্তর প্রশিক্ষণার্থী**. “Residency” is not assumed for every FCPS/MD/MS track; no residency entitlement or duration was added.
- Governance: **কলেজ পরিচালনা ও তদারকি**; Academic Council: **একাডেমিক কাউন্সিল** if an actual council is referenced. Current map is illustrative and has no such council entity.
- Affiliation: **অধিভুক্তি**; accreditation/recognition: **স্বীকৃতি**; regulatory compliance: **নিয়ন্ত্রক সংস্থার বিধিবিধান মেনে চলা**, phrased contextually rather than as certification.
- DGME, BMDC, BCPS, MBBS, BDS, FCPS, MD, MS, API and BDT are preserved as identifiers.

Terminology references, used to understand words rather than import rules:

- [DGME: medical admission, migration and waiting-list notice](https://dgme.gov.bd/pages/notices/6922f0c8dbfbab28ce0d1280).
- [BMDC curriculum: item/card/term formative assessment and professional examinations](https://www.bmdc.org.bd/docs/curriculum/2020/1.FrontPage.pdf).
- [Dhaka Medical College: Operational Manual of MBBS Curriculum 2021](https://dmc.gov.bd/sites/default/files/files/dmc.portal.gov.bd/notification_circular/ac54fdbe_666e_4ae3_9380_6a61a551a71b/2025-03-24-02-58-4d1386b91da94a03ebe7c2ea19cd0b89.pdf).
- [BCPS trainee/supervisor e-logbook](https://bcps.edu.bd/eportal.php).

No admission criteria, seat quota, pass percentage, programme duration, financial figure or regulatory requirement was copied from these references into the application.

## Formatting and source audit

- `next-intl` handles translated messages and locale formatting. Bengali outputs use Bengali digits, lakh grouping and BDT currency formatting.
- Date-only values continue to use UTC formatting to prevent timezone-related day changes. Native number/date inputs keep machine-readable numeric/ISO values; their editing widgets follow the browser/OS language. Application-rendered dates, counts, totals and accessible calendar labels are localized.
- A TypeScript JSX audit guards against English literals in visible text, labels, placeholders and literal text expressions. Branding and technical identifiers are explicitly allowlisted.
- No page-specific FAQ, tooltip system, notification feed or separate student-record API exists in these source files. There was no hidden FAQ or operational backend copy to translate.
- Loading and error/retry components already use the shared namespace. Their messages were edited/validated; a real network failure was not fabricated to claim end-to-end error recovery.

## Validation

- JSON syntax and duplicate-key scan: EN/Bn valid, zero duplicate keys.
- Medical College key/type parity, ICU compilation, argument/tag signatures, edge whitespace and unintended-English checks: PASS.
- `node --test tests/medical-college.test.ts tests/medical-college-i18n.test.ts`: **11/11 PASS**.
- `npm run typecheck`: PASS.
- Scoped ESLint using the available temporary ESLint/TypeScript toolchain: PASS for the College components/routes and the added localization test. The repository itself has no installed ESLint dev dependency; this is not a claim of a clean full-site lint run.
- `npm run i18n:check`: PASS; Bengali has zero missing keys. Existing 14 unrelated extra Bengali keys remain.
- Scoped Bengali text audit: zero missing/type/placeholder/tag/whitespace/MT/formal/terminology/punctuation/digit/overflow findings. One reviewed false positive remains: `ui.session` is the intentionally language-neutral composition `{unit} · {date}`; both substituted values are localized.
- Full repository `npm test`: **53 PASS, 3 FAIL**. The three existing failures concern split-headline whitespace, legacy translation artefacts and TransportPool CTA consistency outside Medical College. They were not changed or hidden.
- Browser: 32 route/interaction cases across EN light desktop 1440px, Bn light desktop 1440px, Bn light mobile 390px and Bn dark tablet 768px. All HTTP 200, correct translated title/meta description, no raw translation keys, no viewport overflow and zero scoped axe WCAG A/AA findings.
- Separate real EN → Bn language-menu switch, empty-reference dialog validation, keyboard focus/return, shared Bengali live-demo modal and all eight 320px routes checked.
- Screenshots cover initial page layouts and exercised workspace states. Fixed-header screenshot artefacts were corrected by taking screenshots from scroll position zero and cropping the workspace from that image; no page styling was hidden for QA.
- Browser API writes were blocked. Console failures caused by the deliberately blocked analytics collector were identified and excluded from application-error assertions; no booking or academic data was submitted.

## Evidence and remaining scope

Local QA artifacts: `C:/Users/zisan/AppData/Local/Temp/adon-college-bn-20261116/`.

- `results.json`: route-by-route interaction, metadata, overflow and accessibility results.
- `catalog-validation.json`: syntax, duplicate-key and ICU results.
- `switch-narrow.json`: actual language switch, keyboard/modal and narrow-screen results.
- `<slug>-bn-1440-light.png`, `<slug>-bn-390-light.png`: initial desktop/mobile screenshots.
- `<slug>-<locale>-<width>-<theme>-workspace.png`: exercised workspace screenshots.
- `<slug>-review.png`: desktop/mobile/dark-tablet inspection sheets.

No known untranslated prose remains within the Medical College EN/Bn scope. At the end of this Bengali audit, the other six locales still used English fallback for the 240 detailed Medical College messages. That gap was subsequently closed in the [remaining-locales follow-up](medical-college-other-locales.md). The module remains the existing local planning preview, with the same calculation/validation logic and no new backend integration.
