# Textile, Metal and Furniture Manufacturing redesign

## Audit

The three existing routes import `TextileManufacturingLanding`,
`MetalFabricationLanding` and `CustomFurnitureProductionLanding`. Each repeats
the older split hero, script headings, static screens, testimonial/rating blocks
and placeholder `#advisor` / `#get-started` links. Metadata lives in the landing
components rather than route files. No working input or submit handlers were
found in these three presentations.

Retain the exact `/industries/manufacturing/textile`, `/metal` and `/furniture`
routes and all three legacy import paths. Textile's breadcrumb belongs to
Garments & Textile; the other two belong to Manufacturing. Preserve translation
resources, site shell, other industry work, global styles and booking backend.
Use English content and the shared demo button and half-blurred preview.

## Design and local examples

| Page                 | Hero identity                                                  | Local example                                                              |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Textile              | Woven material study, fabric roll and processing ribbons       | Sequential entered length loss through three fictional stages              |
| Metal                | Wide technical beam drawing, dimension grid and cutting docket | Whole-millimetre bar/piece arithmetic with an explicit per-piece allowance |
| Furniture Production | Reversed exploded chair assembly and component labels          | Component-only kit coverage against an entered production quantity         |

Reuse the existing Professional industry presentation primitives and stylesheet
for typography, containers, form controls and supporting sections. Add only
scoped industrial hero/workspace styles; do not modify earlier pages or copy
another complete shell stylesheet. Reuse its `Actions` anchor together with the
matching local workspace ID. All live-demo controls remain `LiveDemoButton`.

Records, quantities and assumptions are fictional. Textile calculations keep
metres throughout, round each stage to millimetres and do not convert yarn mass
to fabric length. Metal uses an entered allowance per piece, including final
separation, and excludes end trim/tool/material constraints. Furniture counts
component pieces only and does not infer labour, machine capacity or completed
product availability. No forecast, production order, stock reservation or saved
cutting/BOM plan is created. Remove unverified testimonial/rating presentation.

Read the installed Next.js server/client and metadata guidance per AGENTS.md;
follow the Sites presentation guidance and React review checklist. Validation
results are recorded below.

## Implementation

All three routes now render `IndustrialIndustryPage` through their retained
legacy landing adapters, with route-level metadata and asynchronous locale
alternates. Existing menus and translations remain intact. Content is explicitly
English/LTR inside the existing locale-aware shell.

The Textile hero combines a fabric-roll drawing, woven lines, process ribbons
and a handwritten curved note. Metal uses a measured beam illustration,
dimension grid and a separate cutting-assumption docket. Furniture Production
uses a reversed exploded chair illustration, part labels, a component-kit note
and an assembly connector. New styles are scoped to these pages.

Common presentation primitives, controls and supporting-section styles are
imported from the existing Professional industry foundation without modifying
that foundation. Local examples use the existing `Actions` workspace ID/anchor.
Hero, shared half-blurred `DemoPreview` and closing section reuse the unmodified
`LiveDemoButton` and global popup. Static concept records are explicitly separate
from the editable examples. The three pages also provide selectable workflow
perspectives, relevant product links, native FAQ disclosures and related industry
links. No unverified ratings, testimonials or live production claims were added.

## Validation

- `node scripts/check-textile-metal-furniture-industries.mjs`: passed. Covers
  sequential length loss, millimetre rounding, conservation, zero/100% loss,
  invalid inputs, exact and partial bar patterns, maximum quantities, grouped
  patterns bounded to two rows, piece/allowance/remainder conservation,
  component shortfalls, stock boundaries and all three route/legacy bindings.
  Also checks seven implemented product targets and ten related industry targets.
- Focused TypeScript across new components, all three routes, retained adapters
  and imported presentation primitives: zero diagnostics. Focused ESLint across
  12 source files plus the validation script: zero issues.
- PostCSS parsing and every local/shared CSS-class reference: passed. Source
  checks confirm three distinct hero functions, responsive rules, reduced-motion
  support, inherited dark tokens and shared CTA font isolation.
- All three routes at `en`, `bn` and `ar` returned HTTP 200: nine responses with
  one H1, the matching industry identifier, workspace and shared explore anchor,
  half-blurred preview, English/LTR scope and three shared CTA instances each.
- All 14 distinct external product/industry navigation targets returned HTTP 200.
  The three new pages' cross-links are covered by the route checks above.
- React/source review covers separate client state, functional state updates,
  derived calculations, labelled number inputs, live results/errors, explicit
  grouped-pattern descriptions and labelled horizontally scrollable tables.
  Mobile styles stack the material and assembly compositions, reflow process
  ribbons and controls, and inherit 16px mobile fields and visible focus.
- `git diff --check`: passed. No existing presentation foundation, other industry
  page, app workspace, global style, environment file, schema, dependency or
  booking API/popup source was changed. No whole-project build/typecheck is claimed.

Browser visual/interaction QA remains unverified. The computer-use browser
inventory returned “The browser access host is unavailable.” Source and HTTP
checks do not establish desktop/mobile appearance, absence of clipping or actual
browser click/keyboard behavior; no screenshots are claimed.
