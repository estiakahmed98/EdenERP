# Steel and Agro Rice industry audit

The two existing Manufacturing-menu industry routes `/industries/steel` and
`/industries/agro-rice` are placeholders. The separately implemented Metal
Fabrication route `/industries/manufacturing/metal` remains outside this change.
Keep the URLs, locale alternates, site header/footer and shared booking popup.

Relevant existing presentations include weighbridge/scales, production orders,
batches/lots, quality control, BOMs, warehouses and stock movements. They are
product previews, not evidence of a new mill integration. Existing Manufacturing
source excerpts include user-supplied steel records, while inventory examples
are labelled dummy. These industry pages use their own clearly illustrative
weight records instead of presenting invented operational measurements as source
records or live readings. No new customer data was supplied for this task.

Steel uses a rolling-line composition, coil illustration, material identity and
order-weight allocation. Agro Rice uses a paddy-to-output composition with a
grain illustration and a separate milling mass-balance exercise. Share  Adon ERP
brand tokens, Rubik typography, light/dark foundations and accessibility; avoid
repeating the same hero layout. Keep compact breadcrumb spacing and omit an
extra module navigation strip.

The local Steel calculator subtracts tare from gross and compares example order
allocations with the result. It does not reserve stock or calculate a physical
cutting plan. Agro Rice compares entered paddy weight with head rice, broken
rice, bran and husk. Fractions are arithmetic examples, not industry benchmarks;
unassigned weight is not automatically process loss. Neither calculator reads
hardware, supplies a quality decision or posts an ERP transaction.

Both pages develop from an independent hero into selectable process context,
a working local example, links to relevant implemented previews, a half-blurred
illustrative canvas, practical FAQs and the existing shared advisor CTA.

Implemented both routes through `components/industries/manufacturing`. Steel has
its own material-passport/rolling-line hero; Agro Rice has a paddy-sheet/output-
ticket hero. Native process buttons update the supporting context. Weight inputs,
allocation comparisons, mass-balance calculations and reset controls operate in
local component state. The fully usable exercises sit outside the shared lower-
half blur. No backend, device, schema, reservation or production API is changed.

Completed checks:

- Focused TypeScript compilation passes for the six implementation files, both
  routes, imports and project declarations.
- Focused ESLint passes for all nine TypeScript/TSX/validation files.
- `node scripts/check-production-industries.mjs` passes gram-rounded arithmetic,
  allocation shortfall, zero net weight, invalid tare/negative/non-finite inputs,
  rice output over-balance, zero-output cases, sub-gram input limits and route/
  implemented-product-link checks. Fractions and deficits are preserved rather
  than hidden by chart clamping.
- Six sequential industry requests across `en`, `bn` and `ar` return HTTP 200
  with the correct route identity, one H1, English page content, a local workspace,
  the half-blurred canvas and three shared advisor CTAs.
- All seven unique linked product-preview destinations return HTTP 200 in English.
- CSS parses and all static module-class references resolve. Light/dark styles,
  desktop/tablet/mobile/narrow-screen rules, labelled native inputs, focusable
  horizontal tables, native FAQ details and reduced-motion handling are present.
  `git diff --check` passes.

The repository-wide `check-live-demo.mjs` scan does not pass: it finds the retired
hardcoded label in the existing `app/[locale]/apps/university/class-schedule/page.tsx`
(line 294 at audit time). That unrelated University source is unchanged by this
task. The two new industry pages import the global `LiveDemoButton` directly in
their shared actions and closing, and use the existing `DemoPreview` invitation.

Browser discovery still reports that the browser access host is unavailable.
Desktop/mobile screenshot review and actual browser keyboard/click/overflow QA
remain incomplete; HTTP and source checks are not visual QA. No full production
build or repository-wide lint result is claimed. The existing development server
was reused; no server restart or manifest repair was needed.
