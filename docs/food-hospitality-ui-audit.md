# Food & Hospitality industry redesign

The existing mega-menu has five routes under `/industries/food&hospitality/`:
Restaurant, Fast Food, Guest House, Beverage Distributor and Hotel. Each imports
a separate landing component from `components/landing/Industries/Food & Hospitality`.
The restaurant source retains its existing `Restaurant/RestaurentLanding.tsx`
spelling for compatibility.

All five repeat the same split hero, large script headings, testimonial/rating
blocks, mostly static mock screens and placeholder `#advisor` / `#get-started`
links. Metadata is exported in leaf components rather than route files. There
are no working input or submit handlers in these industry presentations.

Preserve the five URLs, leaf import paths, locale-aware site shell, translation
resources and shared booking flow. Use the established English industry copy,
brand palette, light/dark tokens, compact breadcrumbs, shared `LiveDemoButton`
and shared half-blurred `DemoPreview`. No environment, schema, backend, global
styles, existing app page or unrelated industry changes are needed.

| Industry             | Distinct hero story                                              | Local interactive example                                             |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| Restaurant           | Dining-room plan, place setting and table docket                 | Compare an entered party with fictional table seats                   |
| Fast Food            | Centred kitchen pass, layered burger and ticket rail             | Move fictional kitchen tickets through three explicit stages          |
| Guest House          | Reversed guest journal, key tag and illustrated doorway          | Calculate nights and an entered room-rate estimate from dates         |
| Beverage Distributor | Bottles/crates with dashed depot-to-outlet connectors            | Convert cartons to units against an entered unit-count limit          |
| Hotel                | Wide architectural facade with floor/room cells and service note | Change fictional room states and derive an example occupancy snapshot |

Amounts, rates, rooms, tables, tickets, dates and item quantities are fictional.
There is no live availability, reservation, kitchen integration, dispatch,
payment or inventory write. Remove unverified testimonial/rating presentation.
No dedicated hospitality booking/PMS app exists in the inspected menu; do not
invent one or claim that the local room/date examples provide that capability.
Link only to implemented and relevant existing POS, accounting and stock pages.

Repository guidance: read the installed Next.js Server/Client Components,
CSS Modules and metadata guides before implementation; keep route metadata
server-side and interaction state in separate client components. Apply the
Sites presentation guidance and React component-review checklist.

## Implementation

All five routes now render `HospitalityIndustryPage` through the retained leaf
component adapters. Each route has its own server-side metadata generator and
asynchronous locale alternates. The original literal `food&hospitality` route
segment is retained. English/LTR page content sits within the existing
locale-aware site shell; translation resources were retained for compatibility.

The five hero compositions use distinct code-native illustrations and layouts:
dining-room floor/table geometry and place setting; a layered burger, order
docket and kitchen pass; an open guest journal, doorway and floating key tag;
bottles/crates between depot/outlet nodes; and a room facade with service memo
and property-day ribbon. Handwritten curved annotations, dashed connectors,
tonal material surfaces and hover motion are applied selectively.

Each page adds three selectable workflow perspectives, its working local
exercise, four relevant existing product links, native FAQ disclosures and links
to the other hospitality industries. Hero, preview invitation and closing
section reuse the unmodified `LiveDemoButton`. The preview uses the existing
half-blur and focus-management implementation. Static illustrative records are
explicitly separate from the editable local exercise.

## Validation

- `node scripts/check-food-hospitality-industries.mjs`: passed. Covers seat-fit
  bounds, terminal ticket transitions, invalid stage keys, empty boards, UTC stay
  dates/leap years/year boundaries, stay limits, monetary cents, carton counts,
  count-limit overruns, all-ready/all-service/all-occupied room states, undefined
  zero-denominator occupancy and invalid inputs. Also checks all five route/leaf
  bindings and 11 unique implemented product destinations.
- Focused TypeScript across the new components, routes, retained adapters and
  their imports: zero diagnostics. Focused ESLint across 16 component/route
  source files plus the validation script: zero issues.
- PostCSS parsing and component CSS-class reference checks: passed. Source
  checks confirm five separate hero functions, scoped dark-theme overrides,
  responsive breakpoints and reduced-motion rules. Local form font resets
  exclude the shared CTA.
- All five original navigation URLs at `en`, `bn` and `ar` returned HTTP 200:
  one H1, matching industry identifier, local workspace, half-blurred preview,
  English/LTR scope and exactly three shared CTA instances per response.
- All 11 unique linked product navigation targets returned HTTP 200 in the final
  sequential destination check.
- React/source review covers separate client interaction components, derived
  calculations, functional state updates, native labelled date/number/select
  controls, disabled occupied example tables and terminal ticket actions, live
  results/errors, visible focus and labelled horizontally scrollable tables.
- Mobile source review reflows every composition and workspace, stacks hotel
  room selectors and kitchen tickets, uses at least 44px mobile form controls and
  16px mobile field text, and avoids a separate module navigation strip.
- `git diff --check`: passed. Environment files, schema, dependencies, global
  styles, booking API/popup and unrelated industries/app sources remain intact.
  No whole-project build or whole-project typecheck is claimed.

Browser visual and interaction QA remains unverified. The computer-use browser
inventory returned “The browser access host is unavailable.” HTTP checks and
source review do not establish desktop/mobile appearance, clipping or actual
browser click/keyboard behavior; no screenshots are claimed.
