# Hospital module audit and implementation

> Historical first pass — superseded by [the complete redesign audit](hospital-redesign-audit.md). Sidebar descriptions and first-pass screenshots below document the rejected earlier design, not the current UI.

## Repository findings

The supplied screenshots describe an operational hospital product, but this repository contains a public Next.js ERP website. Before this work it had no Hospital routes, Hospital menu group, clinical APIs, patient models, Hospital database, Hospital role enforcement or clinical audit trail. Prisma contains marketing, authentication, analytics, blog, demo-request and pricing models. No hospital backend has been invented or replaced.

The Homepage supplies brand typography and its shared booking CTA; Accounting Hub supplies restrained tokens, product framing and contextual information. Manufacturing supplies reusable preview patterns; QMS supplies purpose-built calculations and five visual identities. Hospital retains Rubik/Bengali font support, global color tokens and the existing booking provider, but does not blur or block interactive workspaces. All 24 pages have a unique custom hero illustration/composition and a page-specific interactive workspace.

## Route inventory

- /apps/hospital/hospital-dashboard — Hospital Dashboard
- /apps/hospital/patients — Patients
- /apps/hospital/opd-serials — OPD Serials
- /apps/hospital/consultations — Consultations
- /apps/hospital/billing — Billing
- /apps/hospital/day-close — Day Close
- /apps/hospital/doctors-money — Doctors’ Money
- /apps/hospital/wards-beds — Wards & Beds
- /apps/hospital/admissions — Admissions
- /apps/hospital/bed-census — Bed Census
- /apps/hospital/laboratory — Laboratory
- /apps/hospital/imaging — Imaging
- /apps/hospital/pharmacy — Pharmacy
- /apps/hospital/operating-theatre — Operating Theatre
- /apps/hospital/emergency — Emergency
- /apps/hospital/blood-bank — Blood Bank
- /apps/hospital/payers — Payers
- /apps/hospital/indicators — Indicators
- /apps/hospital/doctors-sittings — Doctors & Sittings
- /apps/hospital/services-prices — Services & Prices
- /apps/hospital/hospital-departments — Hospital Departments
- /apps/hospital/staff-registrations — Staff Registrations
- /apps/hospital/record-access-log — Record Access Log
- /apps/hospital/hospital-settings — Hospital Settings

## Shared architecture

- registry.ts owns all 24 slugs, groups, hero identities and next-page connections. The global Apps menu derives Hospital links from this same registry; centralized product inventory updates automatically to 23 modules and 278 menu-backed app pages.
- The scoped Hospital shell contains searchable grouped sidebar navigation, breadcrumbs, locale-aware links and two instances of the existing LiveDemoButton.
- The 24 hero scenes cover an operations mosaic, identity folio, queue rail, clinical notes, receipt, reconciliation, settlement branches, ward floor plan, admission steps, census grid, specimen rack, scanner, pharmacy shelves, theatre plan, emergency handovers, blood-unit trail, coverage diagram, indicator lens, sitting timetable, catalogue, department tree, credentials, access timeline and configuration stack.
- Six code-split workspace bundles provide page-specific states and controls; source snapshot and fictional simulations are explicitly separated. Loading and recoverable route error states are provided.
- Local preview edits reset on navigation/reload or Reset preview; no hospital mutations, form submissions, clinical signatures or financial postings occur.

## Data and privacy policy

Supplied aggregate facts only: 1,000 registrations, 12 doctors, 10 departments, 57 services, zero licensed beds; screenshot indicator examples 140/16 seen per day, 14/182 no-shows and 505/549 within laboratory turnaround. These are labelled as supplied historical screenshots, never current live statistics. No patient names, phone numbers, NIDs, scans, clinical values, licence/council claims or physician credentials from the screenshots were copied.

Interactive examples use DEMO identifiers, explicitly illustrative fees, fictional stock, bounded operational state changes and local-only notes. Ward illustrations are opt-in because the supplied facility has no licensed beds. Pharmacy does not name or recommend medication. Blood-bank preview makes no compatibility or transfusion decision. Emergency lanes do not assign medical priority. Theatre coordination is not a clinical safety checklist. All pages disclose the backend gap.

## Localization scope

Every visible Hospital label and paragraph uses next-intl. English and professionally authored Bengali include all page copy and controls. All eight locales have native Hospital navigation and page names. The other six locales intentionally retain the repository's English fallback for detailed preview descriptions/controls; complete native localization of those new descriptions is a remaining content task, not claimed complete. Existing locale routing and unrelated translations remain unchanged. New namespaces were added without reformatting existing message files.

## Backend implementation gaps

Real patient registration/deduplication/consent, persisted appointments, clinician authentication and role checks, immutable signing/amendments, prescriptions/certificates, payment processing and ledger posting, admissions/reservations, census jobs/history, lab device/result verification, PACS/DICOM, medication catalogues/dispensing, theatre scheduling conflicts, clinical triage, blood screening/crossmatch, payer contracts/claims, verified professional credentials and durable security audit logging require a separate authenticated Hospital backend. The existing public demo-request API and booking modal are preserved.

## Validation

The 24 desktop routes and all 24 Bengali mobile routes pass the scoped browser checks. See the route-specific evidence below.

## Route-by-route completion

Each row below is a completed interactive product-preview page, not an implemented authenticated Hospital service. Desktop workflow checks and Bengali mobile layout checks passed for every route. Every desktop Hospital main region returned zero axe WCAG A/AA violations in the tested default state.

### Hospital Dashboard

- Route: /[locale]/apps/hospital/hospital-dashboard
- Visual identity: Operations mosaic.
- Implemented: Selectable source breakdown, linked detail drill-down, four source KPIs.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Live aggregation and reporting API.

### Patients

- Route: /[locale]/apps/hospital/patients
- Visual identity: Identity folio and fingerprint orbit.
- Implemented: Identifier search, consent preview, registration review, identity/timeline switching.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Patient identity, deduplication, consent and patient database.

### OPD Serials

- Route: /[locale]/apps/hospital/opd-serials
- Visual identity: Queue rail and token typography.
- Implemented: Sitting selection, bounded queue progression and capacity context.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Persisted scheduling, arrival and doctor queue events.

### Consultations

- Route: /[locale]/apps/hospital/consultations
- Visual identity: Layered note folio.
- Implemented: Visit selection, non-clinical draft, preview locking, reason-required amendment, certificate explanation.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Clinician authorisation, immutable medical records and document issuing.

### Billing

- Route: /[locale]/apps/hospital/billing
- Visual identity: Itemised receipt composition.
- Implemented: Bounded quantities, total calculation, tender shortfall/change and simulated receipt.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Real hospital tariff, payments, receipt sequencing and ledger posting.

### Day Close

- Route: /[locale]/apps/hospital/day-close
- Visual identity: Balanced reconciliation diagram.
- Implemented: Charge/collection matching, earlier-day blocker and a non-posting close preview.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Atomic day-close locking, reconciliation data and journals.

### Doctors’ Money

- Route: /[locale]/apps/hospital/doctors-money
- Visual identity: Branching collection-to-share visual.
- Implemented: Consultant selection, bounded allocation, invalid-amount error and local remaining balance.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Real fee-sharing contracts, settlements, vendor bills and payroll links.

### Wards & Beds

- Route: /[locale]/apps/hospital/wards-beds
- Visual identity: Isometric ward floor plan.
- Implemented: Source zero-bed state, opt-in fictional ward, bed selection, maintenance blocking.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Licensed facility inventory, reservations, live occupancy and authorisation.

### Admissions

- Route: /[locale]/apps/hospital/admissions
- Visual identity: Stepped admission arrival.
- Implemented: DEMO-only identifier form, unavailable-bed restriction, consent and handover review.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Transactional admission, bed allocation, deposits and inpatient billing.

### Bed Census

- Route: /[locale]/apps/hospital/bed-census
- Visual identity: Capacity grid and source zero.
- Implemented: Zero-denominator handling, validated bed calculator and occupancy ring.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Scheduled census, immutable history and bed-charge posting.

### Laboratory

- Route: /[locale]/apps/hospital/laboratory
- Visual identity: Specimen rack and barcode handover.
- Implemented: Stage filters, sample search, specimen selection, bounded collection/receipt trace.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Laboratory roles, clinical results, analyser integration and verified release.

### Imaging

- Route: /[locale]/apps/hospital/imaging
- Visual identity: Custom scanner illustration.
- Implemented: Modality filtering, study detail, local draft structure and bounded reporting stages.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: PACS/DICOM, real studies, reporting permissions and medical signing.

### Pharmacy

- Route: /[locale]/apps/hospital/pharmacy
- Visual identity: Layered inventory shelves.
- Implemented: Illustrative stock selection, expired-stock block, quantity bounds and local stock subtraction.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Medication catalogue, prescription checks and dispensing stock ledger.

### Operating Theatre

- Route: /[locale]/apps/hospital/operating-theatre
- Visual identity: Theatre room plan.
- Implemented: Room/time selection, separate readiness state per room and explicit non-clinical review.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Scheduling conflicts, theatre roles and approved clinical safety processes.

### Emergency

- Route: /[locale]/apps/hospital/emergency
- Visual identity: Operational handover lanes.
- Implemented: Fictional token progression between intake, assessment handover and transfer.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Clinical triage, urgency, treatment and emergency record backend.

### Blood Bank

- Route: /[locale]/apps/hospital/blood-bank
- Visual identity: Traceable unit and review trail.
- Implemented: Unit selection, review checks, quarantine blocking and non-clinical review.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Screening, crossmatch, compatibility, blood inventory and clinical release.

### Payers

- Route: /[locale]/apps/hospital/payers
- Visual identity: Coverage branching diagram.
- Implemented: Coverage slider with cent-preserving patient/payer split and separate review stages.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Contracts, memberships, guaranteed cover, claims and payer receivables.

### Indicators

- Route: /[locale]/apps/hospital/indicators
- Visual identity: Measurement lens and formula card.
- Implemented: Indicator/category switching with supplied numerator, denominator and definitions.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Live date-filtered analytics and report source API.

### Doctors & Sittings

- Route: /[locale]/apps/hospital/doctors-sittings
- Visual identity: Department sitting timetable.
- Implemented: Department/search filters, doctor code selection and sitting details.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Verified credentials and real appointment/sitting records.

### Services & Prices

- Route: /[locale]/apps/hospital/services-prices
- Visual identity: Multi-price catalogue composition.
- Implemented: Price-list switching, search, service selection and illustrative estimate.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Published tariffs, validated price caps and admin catalogue persistence.

### Hospital Departments

- Route: /[locale]/apps/hospital/hospital-departments
- Visual identity: Connected specialty tree.
- Implemented: Clinical/diagnostic/administrative selection with department detail.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Real department hierarchy and HR/account mapping.

### Staff Registrations

- Route: /[locale]/apps/hospital/staff-registrations
- Visual identity: Credential folio and expiry calendar.
- Implemented: Chosen-date validity classification, status filter and clear invalid/empty states.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Verified professional registrations and issuing-council integration.

### Record Access Log

- Route: /[locale]/apps/hospital/record-access-log
- Visual identity: Access-event timeline.
- Implemented: Action/role/date filters and an actual downloadable demo-only CSV.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Durable immutable security audit log and export authorisation.

### Hospital Settings

- Route: /[locale]/apps/hospital/hospital-settings
- Visual identity: Facility control stack.
- Implemented: Facility code validation, service toggles, document language, role explanation and local summary.
- Verification: PASS — HTTP 200, desktop interaction, 390px Bengali layout, no outer horizontal overflow, no Hospital-region axe violations.
- Backend gap: Validated server configuration, role policy and persisted settings.

## Final engineering validation

- Production build: PASS, including the final SEO-title adjustment. Compilation, TypeScript and 3,110 generated pages completed with errors enabled. Local production checks passed for all 48 English/Bengali Hospital URLs: HTTP 200, rendered workspace and page metadata. Hospital titles use absolute metadata to avoid repeating the parent layout brand suffix.
- Standalone TypeScript: PASS.
- Hospital + marketing-readiness + security regression: 26/26 PASS.
- Full repository npm test: 28 PASS / 3 FAIL; the same existing Bengali whitespace, legacy translation artefact and TransportPool recurring-CTA groups remain. Hospital code and its tests pass.
- Scoped ESLint: PASS for Hospital components/routes/test plus the existing navigation files changed in this task. npm run lint cannot run because the repository has no installed eslint executable; no full-repository lint PASS is claimed.
- i18n structural check: PASS, zero errors; Bengali has no missing keys. Six other languages retain detailed Hospital English fallback (70 missing object/path entries per locale; Nepali 71 including its prior extra missing entry). English and Bengali Hospital namespaces have matching control/page structure and valid ICU.
- Bengali Hospital content audit: zero missing, structure, ICU placeholder, tag, whitespace, untranslated, English-heavy, punctuation or digit findings. Seven heuristic review candidates were reviewed in healthcare context: ward layout wording, operating-theatre wording, department wording and long but natural payer labels. Mobile layout showed no overflow.
- Browser functional checks: 24/24 desktop PASS; 24/24 Bengali mobile route/layout PASS. Tablet (768px), dark desktop, dark Bengali mobile and Arabic RTL sampled successfully with no outer overflow/runtime error.
- axe: zero violations across all 24 default desktop Hospital regions; zero on four representative dark-mode regions. This is scoped automated testing, not a claim that the whole site is accessibility-certified.
- Shared live-demo dialog and cross-page sidebar navigation: PASS. No demo request, payment or hospital mutation was submitted.
- Diff whitespace check: PASS.

## Changed files

- app/[locale]/apps/hospital/*/page.tsx: 24 explicit page routes and localized metadata.
- app/[locale]/apps/hospital/loading.tsx and error.tsx: loading and recoverable error UI without exposing internal errors.
- components/hospital/registry.ts: canonical page/navigation/hero/workspace inventory.
- components/hospital/page.tsx and experience.tsx: metadata, client shell, searchable sidebar, breadcrumbs, lazy workspace loading and shared CTA.
- components/hospital/heroes.tsx and hospital.module.css: 24 custom visual scenes, scoped design tokens, responsive layouts and reduced-motion support.
- components/hospital/ui.tsx: semantic labelled fields, buttons, table regions, notices, badges, source policy and resettable workspace shell.
- components/hospital/calculations.ts: validated pure preview calculations and bounded state transitions.
- components/hospital/workspaces/{analytics,front-desk,finance,operations,clinical,administration}.tsx: all 24 purpose-built interactive experiences.
- lib/apps-menu.ts: real Hospital routes derived from the registry, retaining all previous module routes.
- components/landing/MarqueeStrip.tsx: Hospital module icon.
- app/[locale]/apps/AppsPageClient.tsx: Hospital classified as a sector module.
- messages/{en,bn,zh,tr,ar,ja,ne,vi}.json: new Hospital namespace and native menu/page names; no unrelated values rewritten.
- tests/hospital.test.ts: meaningful route/identity, localization, pricing, coverage, expiry, occupancy, queue and reconciliation regressions.
- docs/hospital-ui-audit.md: this audit, completion inventory and explicit implementation gaps.

Generated next-env.d.ts and tsconfig.tsbuildinfo changes from build/typecheck are not intentional feature edits. No Prisma schema, API route, authentication logic, environment file or existing booking logic changed. No commit, push or deployment was performed.
