# Hospital redesign — route-by-route before/after audit

Date: 16 November 2026. This report supersedes the first Hospital UI pass documented in `hospital-ui-audit.md`.

> Latest navigation cleanup: the replacement context bar and route dropdown have now also been removed. Current acceptance structure is Global Header → Breadcrumb → Hero → Content. See the navigation-cleanup evidence at the end; earlier screenshots below document the preceding overhaul.

## Scope and repository findings

The repository is a public ERP marketing/product-preview site. It has no operational Hospital database, clinical API, patient authentication/authorisation or durable medical audit service. The overhaul preserves 24 explicit locale routes, local workspaces, global menus, metadata and the shared LiveDemoButton/booking provider. No Prisma, API, authentication, environment, payment or booking-submit logic changed.

The first pass narrowed every page with a 202px searchable left sidebar and a shared copy/art split hero. Its wrappers, card-shaped workspace frame and repeated statistic tiles weakened the purpose-specific scenes. The previous source was preserved in the local QA `before/hospital` folder; the original per-route hero screenshots are linked below.

## Industries benchmark and creative direction

The Industries route inventory and shared families were inspected: manufacturing, industrial, apparel, retail, education, hospitality, professional and others. Particular source references were `components/industries/industrial/{heroes.tsx,ui.tsx,industrial.module.css}`, `apparel/heroes.tsx`, `retail/heroes.tsx`, and the manufacturing/textile landing entry. Their useful principles are physical objects (fabric studies, garment drawings, book spines), annotations attached to a meaningful detail, editorial hierarchy, and interactions that explain the product rather than simulate a live operational service.

Hospital applies those principles with its own campus, patient dossier, destination board, clinical folio, daybook, ward cutaway, specimen bench, imaging room, pharmacy cabinet, coverage bridge, credential portfolio and exploded settings. No Industries illustration or hero template was copied. Five new code-native SVG scenes use React useId for collision-free gradient IDs. The remaining route-specific vector/object primitives are enlarged and reframed in 24 explicit compositions.

## Shared structural fixes

- Removed the entire Hospital aside/navigation DOM and its sidebar CSS, search state and reserved grid column. The shell and main column now share the complete available width, with responsive outer gutters.
- Top-level navigation uses only the existing global header and breadcrumb. The replacement Hospital icon/title, context groups, route dropdown and contextual links have been removed from the shared renderer and stylesheet. Hospital Settings retains its functional in-workspace controls.
- Replaced the generic split renderer with 24 explicit editorial compositions in `editorial-heroes.tsx` and responsive rules in `editorial.module.css`.
- Removed the duplicated Dashboard statistic-card row. Workspace headings use the current page title, the outer repeated card is removed, table/form styling is compact and the next-step/demo area is one balanced horizontal section.
- Maintained visible keyboard focus, native form labels, aria-pressed workflow stages, live focus feedback, table regions, localized routing, reduced-motion behaviour and six lazy workspace bundles. No external 3D library or new runtime package was added.
- Supplied screenshot aggregates are labelled historical source snapshots. Fictional inputs use DEMO identifiers and explicit local-only notices. Zero licensed beds remains zero; no invented occupancy/live chart.

## Verification

Final production build: PASS (Next.js 16.4.6, errors enabled, 3,110 generated pages). Standalone TypeScript and scoped ESLint: PASS. Hospital + marketing-readiness + security regressions: 27/27 PASS. Full repository suite: 29 PASS / 3 pre-existing failures in Bengali split-headline spacing, legacy translation artefacts and TransportPool CTA wording; no Hospital failures.

- All 48 English/Bengali production URLs: HTTP 200, title metadata and rendered workspace.
- All 24 route-specific production workspace scenarios: PASS, including invalid inputs and blocked actions. All 24 default Hospital regions: zero axe WCAG A/AA violations. Four representative dark regions and the final mobile Departments state also returned zero violations.
- All 24 pages captured and inspected at desktop 1440px, Bengali mobile 390px, tablet 768px and dark desktop 1440px: 96/96 route/viewport states passed, no Hospital aside, outer horizontal overflow or JavaScript page error. Contact sheets cover every hero and workspace; individual full-page screenshots are linked per route below. The final Department atrium was recaptured in all four states after the last art change.
- Additional 320px English checks: 24/24 without outer overflow. Arabic RTL and dark Bengali mobile were sampled successfully; those are supplemental checks, not a claim of complete six-language localisation.
- Horizontal context links, native 24-route selector, shared booking modal, Escape dismissal and focus return: PASS. No form submission or Hospital mutation was sent.
- i18n checker: zero structural errors; English/Bengali Hospital copy has matching keys. Existing values in all eight message files were compared against HEAD: zero changed; only Hospital keys were added. Six detailed language fallbacks remain as described below.
- Diff whitespace: PASS. The repository has no installed ESLint command for a full-site npm run lint; the existing temporary ESLint toolchain was used to lint every changed TS/TSX file. No full-site ESLint PASS is claimed.

Evidence: [production routes](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/production-routes.json), [functional scenarios](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/production-functional.json), [96 viewport states](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/visual-qa.json), [320px checks](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/small-mobile.json), [final navigation/modal flow](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/final-flow.json), [build](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/build-final.log), [TypeScript](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/typecheck-final.log), [scoped ESLint](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/eslint-final.log), [regressions](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/regression.log), [full suite including existing failures](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/full-tests.log), [i18n](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/i18n.log).

Contact sheets: [desktop heroes 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/desktop-hero-review-1.png), [desktop heroes 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/desktop-hero-review-2.png), [Bengali mobile heroes 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/mobile-hero-review-1.png), [Bengali mobile heroes 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/mobile-hero-review-2.png), [dark heroes 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/dark-hero-review-1.png), [dark heroes 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/dark-hero-review-2.png), [desktop workspaces 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/desktop-workspace-review-1.png), [desktop workspaces 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/desktop-workspace-review-2.png).

Automated scans are scoped to Hospital content, not an accessibility certification of the entire website. No real demo request, payment, clinical record or other mutation was submitted.

## Route-by-route audit

### 1. Hospital Dashboard

- Route: /[locale]/apps/hospital/hospital-dashboard
- Before: Operations mosaic in a constrained split hero; sidebar constrained the main content.
- After: Full-width editorial masthead, new isometric hospital campus, supplied-data passport and selectable patient-journey strip.
- Preserved interaction: Source-category drill-down and linked service detail.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Live aggregation/reporting API.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/hospital-dashboard-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-dashboard-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-dashboard-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-dashboard-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-dashboard-dark-full.png).

### 2. Patients

- Route: /[locale]/apps/hospital/patients
- Before: Small identity folio beside copy; sidebar constrained the main content.
- After: Wide physical patient dossier, UHID spine, fingerprint index and attached interactive history.
- Preserved interaction: Identifier search, consent example and registration review.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Persisted identity, deduplication and consent.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/patients-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/patients-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/patients-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/patients-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/patients-dark-full.png).

### 3. OPD Serials

- Route: /[locale]/apps/hospital/opd-serials
- Before: Queue illustration in the shared split layout; sidebar constrained the main content.
- After: Waiting-room destination board, oversized token, interactive stages and specialty sitting tickets.
- Preserved interaction: Sitting selection and bounded queue progression.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Appointments, queue persistence and waiting-area display.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/opd-serials-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/opd-serials-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/opd-serials-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/opd-serials-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/opd-serials-dark-full.png).

### 4. Consultations

- Route: /[locale]/apps/hospital/consultations
- Before: Small notes folio in the shared split layout; sidebar constrained the main content.
- After: Clinical writing desk with layered paper, marginal index and separate draft/review/amendment line.
- Preserved interaction: Local draft lock and reasoned amendment preview.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Authenticated clinical signing and immutable amendments.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/consultations-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/consultations-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/consultations-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/consultations-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/consultations-dark-full.png).

### 5. Billing

- Route: /[locale]/apps/hospital/billing
- Before: Receipt illustration beside copy; sidebar constrained the main content.
- After: Invoice editorial, statement-sized receipt, BDT watermark and quantity/subtotal equation.
- Preserved interaction: Quantity, tender sufficiency, change and receipt preview.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Real payments, charges, bills and ledger posting.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/billing-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/billing-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/billing-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/billing-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/billing-dark-full.png).

### 6. Day Close

- Route: /[locale]/apps/hospital/day-close
- Before: Balance graphic beside copy; sidebar constrained the main content.
- After: Open three-leaf daybook, ruled charge/collection pages and reconciliation centre.
- Preserved interaction: Prior-day blocker, collection match and close preview.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Durable day close and ledger journals.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/day-close-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/day-close-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/day-close-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/day-close-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/day-close-dark-full.png).

### 7. Doctors’ Money

- Route: /[locale]/apps/hospital/doctors-money
- Before: Small allocation tree in split hero; sidebar constrained the main content.
- After: Collection note, branching settlement diagram and trailing share/owed annotation.
- Preserved interaction: Bounded amount allocation and remaining balance.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Doctor contracts, payroll/vendor settlement.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/doctors-money-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-money-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-money-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-money-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-money-dark-full.png).

### 8. Wards & Beds

- Route: /[locale]/apps/hospital/wards-beds
- Before: Small top-down ward map beside copy; sidebar constrained the main content.
- After: New panoramic isometric ward cutaway, truthful zero-licensed-bed margin and physical bed legend.
- Preserved interaction: Opt-in illustrative ward with maintenance blocking.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Real bed inventory, permissions and occupancy.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/wards-beds-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/wards-beds-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/wards-beds-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/wards-beds-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/wards-beds-dark-full.png).

### 9. Admissions

- Route: /[locale]/apps/hospital/admissions
- Before: Admission steps inside the common hero; sidebar constrained the main content.
- After: Staggered arrival stations connected by a curved route, each with a distinct identity/bed/handover role.
- Preserved interaction: Consent and fictional admission review.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Admission/reservation persistence.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/admissions-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/admissions-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/admissions-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/admissions-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/admissions-dark-full.png).

### 10. Bed Census

- Route: /[locale]/apps/hospital/bed-census
- Before: Census dots in a split hero; sidebar constrained the main content.
- After: Zero-capacity editorial, dotted capacity study and explicit occupancy denominator.
- Preserved interaction: Validated capacity/occupied calculator, including zero/invalid cases.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Census snapshots, midnight job and history.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/bed-census-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/bed-census-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/bed-census-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/bed-census-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/bed-census-dark-full.png).

### 11. Laboratory

- Route: /[locale]/apps/hospital/laboratory
- Before: Compact specimen rack beside copy; sidebar constrained the main content.
- After: Dedicated specimen bench, enlarged tubes, measurement rule, attached passport and interactive trace.
- Preserved interaction: Collection/receipt stage progression and search.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Lab orders, devices, results and verifier permissions.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/laboratory-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/laboratory-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/laboratory-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/laboratory-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/laboratory-dark-full.png).

### 12. Imaging

- Route: /[locale]/apps/hospital/imaging
- Before: Simple scanner icon in split hero; sidebar constrained the main content.
- After: New isometric CT room panorama, modality index and separate reporting docket.
- Preserved interaction: Modality filtering, report structure and draft transition.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: PACS/DICOM, clinical findings and signing.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/imaging-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/imaging-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/imaging-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/imaging-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/imaging-dark-full.png).

### 13. Pharmacy

- Route: /[locale]/apps/hospital/pharmacy
- Before: Small pharmacy shelf in split hero; sidebar constrained the main content.
- After: Apothecary cabinet, Rx spine, dimensional stock packages and barcode inventory docket.
- Preserved interaction: Expiry block, quantity bounds and local issue review.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Medication catalogue, stock movements and dispensing.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/pharmacy-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/pharmacy-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/pharmacy-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/pharmacy-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/pharmacy-dark-full.png).

### 14. Operating Theatre

- Route: /[locale]/apps/hospital/operating-theatre
- Before: Theatre plan in the common hero frame; sidebar constrained the main content.
- After: Rotated theatre blueprint portfolio with measurement edge and separate editorial narrative.
- Preserved interaction: Room-specific equipment/team readiness review.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Theatre scheduling, conflict checks and clinical safety process.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/operating-theatre-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/operating-theatre-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/operating-theatre-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/operating-theatre-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/operating-theatre-dark-full.png).

### 15. Emergency

- Route: /[locale]/apps/hospital/emergency
- Before: Small handover lanes in split hero; sidebar constrained the main content.
- After: Pulse masthead and full-width numbered intake/assessment/transfer runway.
- Preserved interaction: Local handover lane progression without medical priority claims.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Clinical triage and emergency records.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/emergency-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/emergency-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/emergency-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/emergency-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/emergency-dark-full.png).

### 16. Blood Bank

- Route: /[locale]/apps/hospital/blood-bank
- Before: Blood-unit trail beside copy; sidebar constrained the main content.
- After: New dimensional unit bag, vertical passport/barcode and identity/document/reviewer journey.
- Preserved interaction: Quarantine block and per-unit document-review state.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Screening, crossmatch and transfusion decisions.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/blood-bank-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/blood-bank-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/blood-bank-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/blood-bank-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/blood-bank-dark-full.png).

### 17. Payers

- Route: /[locale]/apps/hospital/payers
- Before: Compact coverage diagram beside copy; sidebar constrained the main content.
- After: Arched patient/payer coverage bridge with separate responsibilities and disclosure.
- Preserved interaction: Cents-preserving coverage slider and authorisation/claim checklist.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Payer contracts, approvals and claims.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/payers-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/payers-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/payers-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/payers-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/payers-dark-full.png).

### 18. Indicators

- Route: /[locale]/apps/hospital/indicators
- Before: Small metric lens in split hero; sidebar constrained the main content.
- After: Large supplied 92% measurement plate with the actual 505/549 denominator and definition band.
- Preserved interaction: Outpatient/laboratory/finance formula exploration.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Reporting data source and period-based aggregation.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/indicators-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/indicators-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/indicators-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/indicators-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/indicators-dark-full.png).

### 19. Doctors & Sittings

- Route: /[locale]/apps/hospital/doctors-sittings
- Before: Timetable art inside common hero; sidebar constrained the main content.
- After: Timetable edition anchored by illustrative 17:00, wide schedule paper and separate action margin.
- Preserved interaction: Department/engagement search and sitting selection.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Doctor records, qualifications and schedule persistence.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/doctors-sittings-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-sittings-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-sittings-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-sittings-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/doctors-sittings-dark-full.png).

### 20. Services & Prices

- Route: /[locale]/apps/hospital/services-prices
- Before: Catalogue illustration beside copy; sidebar constrained the main content.
- After: Physical price-book spread, BDT spine, quote margin and catalogue leaf.
- Preserved interaction: Price-list selection and illustrative estimate.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Governed tariffs, packages and billing integration.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/services-prices-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/services-prices-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/services-prices-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/services-prices-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/services-prices-dark-full.png).

### 21. Hospital Departments

- Route: /[locale]/apps/hospital/hospital-departments
- Before: Small department directory in split hero; sidebar constrained the main content.
- After: Centred institution masthead and branching specialty atlas around a distinct three-wing service atrium.
- Preserved interaction: Clinical/diagnostic/support directory filters.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Department records and HR mapping.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/hospital-departments-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-departments-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-departments-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-departments-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-departments-dark-full.png).

### 22. Staff Registrations

- Route: /[locale]/apps/hospital/staff-registrations
- Before: Credential card beside copy; sidebar constrained the main content.
- After: Layered credential portfolio, expiry tab, handwritten note and explicit status strip.
- Preserved interaction: As-of-date validity and expiry filters.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Verified credentials, registries and renewals.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/staff-registrations-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/staff-registrations-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/staff-registrations-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/staff-registrations-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/staff-registrations-dark-full.png).

### 23. Record Access Log

- Route: /[locale]/apps/hospital/record-access-log
- Before: Access log illustration in common split hero; sidebar constrained the main content.
- After: Lock masthead and horizontal event ribbon, with visible fictional identifiers.
- Preserved interaction: Action/date/role filtering and real demo CSV download.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Durable audit storage and authorised export.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/record-access-log-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/record-access-log-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/record-access-log-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/record-access-log-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/record-access-log-dark-full.png).

### 24. Hospital Settings

- Route: /[locale]/apps/hospital/hospital-settings
- Before: Configuration stack beside copy; sidebar constrained the main content.
- After: Exploded facility/language/access layers, connecting traces and compact policy note.
- Preserved interaction: Horizontal settings groups, validated facility code and local summary.
- QA: PASS — desktop workflow scenario; desktop, Bengali mobile, tablet and dark desktop screenshots; no Hospital sidebar or outer page overflow; zero default-state Hospital axe violations.
- Backend still required: Persisted configuration, role policy and licence validation.
- Evidence: [Before hero](C:/Users/zisan/AppData/Local/Temp/adon-hospital-20261116/hospital-settings-hero.png), [After desktop](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-settings-desktop-full.png), [After Bengali mobile](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-settings-mobile-full.png), [Tablet](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-settings-tablet-full.png), [Dark](C:/Users/zisan/AppData/Local/Temp/adon-hospital-overhaul-20261116/hospital-settings-dark-full.png).

## Remaining scope and limitations

- This is a complete Hospital product-preview UI, not a clinically deployable Hospital backend. The route-specific missing services are listed above. Nothing in this task creates or verifies medical advice, licences, patient consent or clinical safety.
- English and Bengali cover all new Hospital descriptions, labels and controls. The six other site locales have native Hospital menu/page names but detailed content continues through the repository English fallback. Full native translation of that new content is not claimed.
- Browser coverage uses Chromium. Other browser engines and physical devices were not tested. Full-site accessibility and a Lighthouse/performance score are not claimed.
- The full repository test suite has pre-existing Bengali localisation failures outside Hospital; they are reported in the final validation section rather than changed as part of this design task.
- Screenshots and executable browser checks are stored locally in the linked temporary QA folder. No deployment, commit or push was performed.

## Modified implementation files

- `components/hospital/experience.tsx`: structural sidebar removal and horizontal navigation.
- `editorial-heroes.tsx`, `editorial.module.css`, `medical-art.tsx`: 24 compositions, five custom healthcare scenes and responsive presentation.
- `illustrations.tsx`: retained route-specific illustration primitives; `heroes.tsx` delegates to the new composition renderer.
- `hospital.module.css`, `ui.tsx` and six `workspaces/*.tsx`: full-width workspace framing, page-specific headings and preserved controls.
- The 24 explicit Hospital page routes, registry, metadata helper, loading/error states, global menu/directory integration and Hospital translation namespaces are part of the original task and remain in this working tree. No existing language value was changed.
- `tests/hospital.test.ts`: nine route/navigation, localisation and calculation regressions.
- `docs/hospital-ui-audit.md`: marked historical; this file is the current acceptance report.

## Hospital navigation cleanup — current acceptance

Root cause: `HospitalExperience` still rendered `contextBar` (module icon/title, group buttons and route selector) plus `contextLinks` between the breadcrumb and hero on every route. This was actual shared markup, not a lingering sidebar width or a translation problem. Styling could not satisfy the requested removal.

Fix: remove both blocks from `experience.tsx`, their selection state/router-only imports, and all related desktop/responsive CSS rules. The breadcrumb is now the sole sibling before the hero. All 24 route wrappers use this same shared renderer. The global header, breadcrumb links, hero compositions, workspaces, NextLink and shared demo modal are unchanged. No language file was edited by this follow-up.

The existing navigation regression now requires breadcrumb → hero adjacency and prohibits an aside, context bar or route dropdown in the shared shell. Browser checks additionally inspect the rendered DOM and assert exactly one pre-hero sibling (the breadcrumb), no unwanted navigation nodes, HTTP 200, no outer overflow, no page errors and a working workspace reset.

Validation: PASS — 24/24 desktop (1440px, English) and 24/24 mobile (390px, Bengali) routes captured and visually inspected. All 48 have breadcrumb → hero adjacency, zero unwanted navigation nodes, HTTP 200, no outer overflow, no JavaScript page errors and working workspace reset. Shared demo dialog open/Escape passed; a separate Bengali production Dashboard screenshot and breadcrumb navigation check passed. All 48 English/Bengali production responses contain the hero/workspace and no removed navigation markup. Standalone TypeScript, scoped ESLint, all nine Hospital tests and the production build passed.

Evidence: [48 browser results](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/results.json), [48 production routes](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/production-routes.json), [production build](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/build.log), [Bengali Dashboard](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/dashboard-bn-desktop.png), [desktop screenshots 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/desktop-review-1.png), [desktop screenshots 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/desktop-review-2.png), [mobile screenshots 1](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/mobile-review-1.png), [mobile screenshots 2](C:/Users/zisan/AppData/Local/Temp/adon-hospital-nav-cleanup-20261116/mobile-review-2.png). Individual full-page images are in that same QA folder, named `<slug>-desktop.png` and `<slug>-mobile.png`.

