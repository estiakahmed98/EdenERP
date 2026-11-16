# Medical College — UI audit, implementation and verification

16 November 2026. Scope: eight locale-aware Medical College public product-preview pages.

## Critical baseline finding

This checkout did not contain a Medical College module: no matching routes, navigation group, student/assessment models, DGME/academic APIs or module permissions. Its separate Medical Centre app pages and Industries College page were inspected and preserved. Prisma has marketing/authentication/demo-request/pricing/analytics data, with USER/ADMIN roles; no College student, academic approval or clinical training model. All eight proposed URLs returned HTTP 404 before implementation. Those actual before screenshots were captured; they must not be misrepresented as screenshots of a previous working College UI. No Medical College screenshots were attached to this task turn.

The implementation therefore supplies eight interactive academic planning previews. It does not claim to preserve an absent operational backend or turn local state into approved academic records. No student identities, applicant lists, clinical cases, invented statistics, regulatory thresholds, programme durations, quotas or committee mandates have been seeded. Every page discloses the disconnected backend and local-only state.

## Design-system audit and direction

- Accounting Hub: `app/[locale]/apps/accounting/accounting-hub/page.tsx` — strong grouped hierarchy and restrained financial presentation.
- Manufacturing: `components/manufacturing/module-page.tsx` and showcase visual family — feature-specific diagrams and shared demo CTA.
- QMS: `components/quality/{page,heroes,ui,calculations}.tsx/ts` — purpose-specific workspaces, evidence context and calculations.
- Industries: industrial textile material-study layouts, retail book-spine objects, and education shared pages — physical editorial objects, explanatory annotations and interactive studies.
- Hospital: `components/hospital/{experience,editorial-heroes,ui}.tsx` — reviewed especially for the navigation regression. College has no module aside or replacement pre-hero context bar.

The resulting structure is Global Header → Breadcrumb → Page-specific compact header → disclosed functional workspace. Rubik/Bengali support, global light/dark tokens, brand blue/navy/green and the original LiveDemoButton/provider remain. Eight custom SVG object scenes have different compositions; headers stay compact rather than becoming marketing landing heroes. Workspaces use different models: admission rail, marks ledger, criteria gate, rotation calendar, posting journal, programme pathway, relationship map and settings review. Tables have named keyboard-focusable horizontal scroll regions; controls have labels, keyboard focus and loading/validation states. A route loading state and recoverable error boundary use the installed Next.js conventions.

## Data flow and boundaries

The public UI loads local planning state → pure validated calculation or bounded state update → labelled preview result. No College API, database write, role decision, signature, clinical action, admission decision, result publication or payment occurs. The existing booking modal is reused; no lead submission was made during QA. Local plans live only in component state; reset/reload clears them. No server storage is used. User-entered references are non-personal planning codes, not student records.

## Before/after and route-specific completion

### 1. Intake & Admission

- Route: /[locale]/apps/medical-college/intake-admission
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: Admission ticket and seat-study header; live local pipeline rail with a separate, full-width round timeline.
- Working preview interactions: Local planning-reference creation in an accessible dialog; duplicate reference guard; stage transitions; search/filter/sort; capacity/allocation arithmetic.
- Backend/regulatory gap: Real candidate records, intake configuration, verified DGME notices/allocations, admission decisions and role-based processing.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/intake-admission-interaction.png).

### 2. Cards & Items

- Route: /[locale]/apps/medical-college/cards-items
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: An assessment ledger with a paper edge, custom marks-sheet illustration and a separate professor/registrar review margin.
- Working preview interactions: Editable item maxima/scores, item add/remove, total/percentage calculation, invalid-mark guard, sequential local review checklist and invalidation when marks change.
- Backend/regulatory gap: Official curriculum/card definitions, student assessments, professor/registrar permissions, durable sign-off and audit trail.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/cards-items-interaction.png).

### 3. Professional Exams

- Route: /[locale]/apps/medical-college/professional-exams
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: An examination-gate header, numbered institutional criteria, readiness decision area, result worksheet and phase handover line.
- Working preview interactions: User-entered attendance/assessment criteria, evidence checklist, readiness gating and local result percentage; no regulatory default thresholds.
- Backend/regulatory gap: Published BMDC/institutional eligibility policy, student evidence, examination entry, result publication and approved progression.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/professional-exams-interaction.png).

### 4. Ward Placement

- Route: /[locale]/apps/medical-college/ward-placement
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: A compact isometric teaching-floor panorama, unit tiles and a seven-day calendar with an attached session sheet and learning history.
- Working preview interactions: Week navigation, unit/day selection, one local block per slot, editable non-clinical reflection, local attendance checkbox, removal and history selection.
- Backend/regulatory gap: Real wards, student/group allocation, timetable availability, clinical supervision, case records and verified attendance.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/ward-placement-interaction.png).

### 5. Interns

- Route: /[locale]/apps/medical-college/interns
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: A posting-journey header and dated posting journal, paired with a logbook ring and an allowance ledger.
- Working preview interactions: User-defined non-overlapping posting ranges, local timeline removal, logbook denominator validation, supervisor-note checklist and BDT/months arithmetic.
- Backend/regulatory gap: Intern records, institution-approved rotational requirements, actual logbooks, supervisor approval and payroll/allowance payment.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/interns-interaction.png).

### 6. Postgraduate Trainees

- Route: /[locale]/apps/medical-college/postgraduate-trainees
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: A degree-portfolio header, three programme views and an evidence pathway with a separate supervision/stipend workspace.
- Working preview interactions: FCPS/MD/MS switching, programme-scoped checklist/review reset, local checklist progress, feedback draft and stipend calculation.
- Backend/regulatory gap: Verified programme affiliation, BCPS/BMDC requirements, trainee records, official assessments, supervision and stipend approval.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/postgraduate-trainees-interaction.png).

### 7. Governance

- Route: /[locale]/apps/medical-college/governance
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: An organisational-object header, interactive responsibility network, review checklist and full-width financial oversight ledger.
- Working preview interactions: Responsibility selection, per-area evidence checklist, local review summary, budget/proposed-amount validation and remaining-balance calculation.
- Backend/regulatory gap: Institution-specific statutory committees, legal compliance evidence, delegated authority, financial approval and durable audit logs.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/governance-interaction.png).

### 8. College Settings

- Route: /[locale]/apps/medical-college/college-settings
- Before: absent (HTTP 404), no workflow implementation to preserve in this checkout.
- Design: An exploded configuration-sheet header, horizontal functional tabs, academic/reference forms and a current validation summary.
- Working preview interactions: Institution-code/date-range validation, language preference, bounded seat plan, institutional reference notes and current-state validation feedback.
- Backend/regulatory gap: Persisted college configuration, permissions, official seat approval, verified references and immutable configuration audit.
- Visual/functional status: PASS for the implemented preview — desktop workflow scenario, English desktop, Bengali mobile, tablet and Bengali dark screenshots; zero outer overflow and zero scoped default-state axe violations.
- Screenshots: [Actual before](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-before.png), [Desktop after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-desktop.png), [Bengali mobile after](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-mobile.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-tablet.png), [Bengali dark mode](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-dark.png), [Exercised workspace](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/college-settings-interaction.png).

## Implementation and preservation

New files: `components/medical-college/{registry,calculations,page,experience,ui,heroes,art}.ts/tsx`, scoped `college.module.css`, seven lazy workspace modules, eight explicit app routes plus loading/error boundaries, and `tests/medical-college.test.ts`. Global Apps-menu, module icon and directory category integrations were extended. Existing routes and the staged Hospital work were preserved. No API, Prisma, auth, booking submission or environment file was modified.

English and Bengali contain the complete new College namespace and page copy. All eight site locales have native College navigation names. The other six detailed page locales use the existing English fallback; complete native localisation of those descriptions/controls is not claimed. Existing translation values are preserved.

## Verification results

- Production build: PASS on Next.js 16.4.6; 3,174 generated pages. [Build log](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/build.log).
- Standalone TypeScript and scoped ESLint: PASS for all College files/routes/tests and changed navigation integrations. [TypeScript](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/typecheck-final.log), [ESLint](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/eslint-final.log). The repository lacks an installed ESLint CLI, so the existing temporary ESLint toolchain was used; full-repository npm run lint is not claimed.
- Regression: 35/35 College + Hospital + marketing-readiness + security tests passed. Full repository suite: 37 PASS / 3 existing Bengali-localisation test groups FAIL (split-headline whitespace, legacy translation artefacts and TransportPool CTA wording). Those unrelated translations were preserved. [Regression](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/regression.log), [full suite](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/full-tests.log).
- Routes: all 16 EN/Bn production URLs return HTTP 200, correct title metadata and rendered hero/workspace, without raw translation keys or module side navigation. [Route results](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/production-routes.json).
- Browser interactions: 8/8 production workflow scenarios passed, covering duplicate planning references, search/filter/stage changes, invalid marks, review gating/invalidation, empty and entered exam criteria, calendar selection/week navigation, posting overlap, progress calculations, programme isolation, responsibility scopes, budget limits and invalid/current settings. Reset works on every page. [Functional results](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/functional.json).
- Visual QA: all eight pages captured and inspected at 1440px English desktop, 390px Bengali mobile, 768px tablet and 1440px Bengali dark mode: 32/32 states, zero outer page overflow or JavaScript page errors. All 32 scoped Hospital-independent College axe scans returned zero WCAG A/AA violations. Tablet marks-sheet stacking was refined and recaptured after review. [32-state results](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/visual.json).
- Extra 320px English: all eight pages without outer overflow. Actual English → Bengali header language switching, mobile planning dialog and the shared booking dialog passed; Escape returns focus to the originating demo CTA. No request was submitted. [Small-screen and flow results](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/small-and-flow.json), [planning dialog](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/planning-dialog-mobile.png), [shared demo](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/shared-demo-mobile.png).
- Localisation: JSON/i18n structural check passed, with the repository's existing fallback/extra-key notices. EN/Bn College key parity is covered by tests. All existing translation values were compared against the pre-task staged catalogues: zero changed in all eight languages. [i18n check](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/i18n.log), [translation diff](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/translation-diff.json).
- Diff whitespace: PASS. No database/API/auth/environment changes, real student records, real clinical actions or lead submissions.

Review sheets: [desktop](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/desktop-review.png), [Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/mobile-review.png), [tablet](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/tablet-review.png), [Bengali dark](C:/Users/zisan/AppData/Local/Temp/adon-medical-college-20261116/dark-review.png). Each sheet was visually inspected; the per-route full-page images above remain the primary evidence. The recoverable route error boundary is implemented, but an unexpected runtime failure was not deliberately injected during browser QA.

The initial dev pass exposed a stale translation bundle (raw namespace keys). Restarting the scoped local dev server resolved it; final checks explicitly reject raw keys. An overly broad test selector for governance status was narrowed to the actual notice before rerunning that scenario. Neither initial failed attempt is presented as a successful final check.

## Remaining issues and limits

- The eight UIs are public planning previews, not an authenticated academic administration system. Real operations require the missing per-page services listed above and verified institution/regulator rules. No legal or medical compliance certification is claimed.
- The supplied task mentioned an existing functional module and screenshots, but neither was present in this checkout/turn. A different operational repository, branch or screenshots would be needed for a faithful comparison and actual workflow-preserving operational redesign.
- English/Bengali are complete for this new module; detailed translations for the other six locales remain English fallback.
- Chromium QA is scoped to this module. No cross-engine, physical-device, full-site accessibility certification or Lighthouse performance score is claimed.
- Full-site tests have existing Bengali-localisation failures outside this module; final counts are reported with evidence.
- No commit, push or deployment was performed. Screenshots and executable QA scripts are linked from the local QA folder.
