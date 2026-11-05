# Retail industry redesign

## Audit and scope

The Retail mega-menu in `components/header.tsx` links to six existing routes:
`book-store`, `clothing-store`, `furniture-store`, `grocery-store`,
`hardware-store` and `toy-store`, under `/industries/retail/`.

The bookstore page contains its own large landing component; the other routes
import five similarly structured components in `components/landing/Industries/retail`.
They repeat a two-column hero, script headings, testimonial/star blocks,
decorative mock screens and `#get-started` / `#advisor` CTAs. Five export
metadata from a component rather than the route. Several sections use `any` for
translation records and have no meaningful local interaction.

Replace the presentation while preserving all six URLs, locale-aware site shell,
legacy component entry points and existing app pages. Use English page copy,
EdenERP blue/navy/green, compact breadcrumbs, shared `LiveDemoButton`, shared
half-blurred `DemoPreview`, responsive light/dark styles and reduced motion.
Retain translation resources for compatibility. Do not add backend/API changes.
Remove testimonial/rating presentation from these redesigned routes because no
verified customer evidence was supplied for the new design.

| Page            | Visual composition                                              | Working local example                                                          |
| --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Book Store      | Editorial spread, dimensional book spines and reading note      | Select books and quantities; basket arithmetic in BDT                          |
| Clothing Store  | Centred lookbook, garment flat and colour/size cards            | Choose a colour/size variant and compare requested quantity with example stock |
| Furniture Store | Reversed showroom composition with top-view room plan           | Assemble a furniture set, finish and entered delivery amount                   |
| Grocery Store   | Fresh-stock ledger, produce illustration and dated stock labels | Inspect batch dates relative to an editable example date                       |
| Hardware Store  | Technical pegboard, measured fastener drawing and pack ticket   | Convert a unit shortage into whole purchase packs                              |
| Toy Store       | Playful asymmetric display, block illustration and gift note    | Build an example gift basket against an entered budget                         |

New quantities, prices, dates and records are fictional. The examples perform
client-local calculations only: no sale, reservation, purchase, stock write-off,
invoice or real quote is created. Date labels are arithmetic observations, not
food-safety judgments. Toys have no invented age/safety certifications.
Preserve the existing booking API and global booking popup without modification.

## Implementation

All six routes now render `RetailIndustryPage` with individual hero compositions
and different working examples. The five legacy landing-component paths remain
as thin adapters, preserving existing imports. Each route now generates its own
metadata and asynchronous locale alternates. Existing English/Bangla/Arabic
translation resources, header links and site shell were retained; the redesigned
page content is explicitly English/LTR, consistent with the requested industry
pages. No unrelated industries, app workspaces or booking source were changed.

Supporting sections provide selectable operational perspectives, four relevant
existing product links per page, a shared half-blurred demo preview, native FAQ
disclosures and links to the other retail industries. Hero, preview invitation
and closing section reuse the same unmodified `LiveDemoButton`, label and popup.
The lower-half preview uses the existing component's blur and focus management.
The static preview is clearly distinguished from the editable local example.

Code-native illustrations include dimensional book covers, a garment flat and
swatches, a top-view furniture plan, produce crate, measured fixing study and
toy blocks/train/puzzle. Curved handwritten notes, dashed lines, material cards,
soft tonal surfaces and hover motion are used selectively. No external image
downloads, unverified customer quotations, star ratings or badge claims were added.

## Validation

- `node scripts/check-retail-industries.mjs`: passed. Tests monetary cents,
  basket bounds, empty selections, colour/size stock comparisons, finish pricing,
  empty furniture sets, delivery validation, UTC dates and leap years,
  whole-pack rounding, existing excess stock, budget overruns and invalid inputs.
  Also checks six route/legacy bindings, locale-metadata wiring and six unique
  implemented product destinations.
- Focused TypeScript across new components, route adapters, legacy adapters and
  their imports: zero diagnostics. Focused ESLint across 18 changed source/script
  files: zero errors or warnings.
- PostCSS parsing and every TSX CSS-class reference: passed.
- All six pages at `/en`, `/bn` and `/ar`: HTTP 200, exactly one H1, matching
  industry identifier, local workspace, half-blurred preview, English/LTR content
  scope and three shared CTA markers per page. All six unique product link
  destinations returned HTTP 200.
- React/source review: isolated client interaction components, derived render-time
  calculations, functional state updates, native labelled form controls, visible
  keyboard focus for styled radios/checkboxes, disabled quantity boundaries,
  live error/results, labelled scrollable tables and native FAQ controls.
- Responsive styles stack/reflow each hero and workspace, use at least 44px mobile
  input/quantity controls and 16px mobile field text, and retain scoped dark-theme
  and reduced-motion overrides. No local CTA font reset overrides its design.
- `git diff --check`: passed. No backend, schema, environment, dependency, booking
  API or unrelated source modifications were made. No whole-project build or
  whole-project typecheck is claimed.

Browser visual/interaction QA remains unverified. The computer-use inventory
reported “The browser access host is unavailable.” Server-rendering checks and
source review do not establish visual appearance, absence of mobile clipping or
actual click/keyboard behavior in a browser; no screenshots are claimed.
