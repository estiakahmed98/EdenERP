# Real Estate and Consulting industry redesign

The Real Estate menu has Real Estate Agency, Architecture Firm and Construction.
Consulting has Accounting Firm, Marketing Agency, Talent Acquisition, Audit &
Certification and Travel Agency. Seven routes import older landing components;
Travel Agency renders `ComingSoonPage`. The old pages repeat a split hero,
script headings, testimonial/rating sections and placeholder advisor anchors.
No working submit or input handlers were found in the inspected presentations.

Preserve all eight URLs, existing landing import paths, locale-aware shell,
translation resources, shared demo CTA and booking popup. New copy is English,
with fictional examples and no backend changes. Retain scoped light/dark styling,
compact breadcrumbs, keyboard focus, responsive layout and reduced motion.
Remove unverified testimonials/ratings from the redesigned presentations.

| Page                  | Distinct hero composition                            | Local interaction                                                 |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| Real Estate Agency    | Property portfolio with architectural massing        | Filter fictional property records by type and entered price limit |
| Architecture Firm     | Centred drafting desk with layered plan sheets       | Adjust phase hours and an entered hourly fee                      |
| Construction          | Site/crane elevation beside a cost breakdown         | Calculate fictional BOQ line amounts against a budget             |
| Accounting Firm       | Reversed review ledger and closing checklist         | Track manually selected example review tasks                      |
| Marketing Agency      | Asymmetric creative/campaign board and budget ring   | Edit channel amounts and compare their total with a budget        |
| Talent Acquisition    | Wide candidate journey with stage cards              | Move anonymous fictional candidate IDs through explicit stages    |
| Audit & Certification | Evidence dossier and review connectors               | Change evidence states and filter the local review list           |
| Travel Agency         | Curved itinerary, waypoint stamps and travel dossier | Build an entered fare/room/transfer estimate                      |

All properties, rates, quantities, applicants, documents and amounts are
illustrative. No property availability, engineering estimate, accounting review,
campaign performance, hiring recommendation, compliance decision, certification,
travel availability or real booking is asserted by the examples. Link to
implemented product presentations only. Preserve APIs, schema, environment,
global styles, prior industry work and app workspaces.

Read the installed Next.js server/client and metadata guidance per AGENTS.md.
Apply the Sites presentation guidance and React component-review checklist.

## Implementation

All eight routes now render `ProfessionalIndustryPage`. The seven legacy
landing import paths remain as thin adapters; Travel Agency now has a complete
page in place of its placeholder. Route-level server metadata calls the shared
metadata helper with asynchronous locale alternates. Existing menus, locale
resources and site shell remain intact, with explicitly English/LTR industry
content as requested for the preceding industry work.

Eight different hero functions provide their own composition and illustration.
The architecture desk uses layered sheets, construction combines a site drawing
with a cost docket, and the accounting ledger uses manually tracked task rows.
The marketing board combines a typographic poster with a brand-colour allocation
ring; talent uses anonymous stage cards; audit uses document dossiers rather than
certification badges; travel uses a curved itinerary and assumption pass.

Each page provides a local working example, three selectable workflow
perspectives, four relevant existing product links, native FAQ disclosures and
links to other industries in its category. Hero, shared half-blurred preview and
closing section reuse the unmodified `LiveDemoButton` and global popup. The
static concept canvas is clearly distinct from the editable local example.

The allocation chart uses the same rounded calculation shares as the summary,
including zero allocations. Construction compares the calculated line total with
the budget separately, so large valid line amounts can produce an over-budget
result without being rejected as input allocations. All money arithmetic uses
integer cents before multiplication/summation where applicable.

## Validation

- `node scripts/check-realestate-consulting-industries.mjs`: passed. Covers
  inclusive property filters, empty filter results, whole-quantity/fee/cost
  arithmetic, monetary cents, large calculated totals, budget overruns, zero
  allocations, manual checklists, empty lists, candidate/evidence-state bounds,
  invalid object keys, trip component arithmetic and invalid inputs. Checks all
  eight metadata/route bindings, seven retained adapters and 23 unique implemented
  product destinations.
- Focused TypeScript across the new components, route files, retained adapters
  and their imports: zero diagnostics. Focused ESLint across 21 component/route
  source files plus the validation script: zero issues.
- PostCSS parsing and all component CSS-class references: passed. Source checks
  confirm eight distinct hero functions, scoped dark tokens, mobile rules,
  reduced-motion overrides and shared CTA styling isolation.
- All eight routes at `en`, `bn` and `ar` returned HTTP 200: 24 responses with
  one H1, the expected industry identifier, local workspace, half-blurred
  preview, English/LTR scope and three shared CTA instances each. All 23 unique
  linked product navigation targets returned HTTP 200.
- React/source review: separate client state, derived calculations, functional
  state updates, native labelled controls, clickable checkbox rows, live local
  result/error messages, chart labels, native progress/FAQ controls and labelled
  horizontally scrollable tables. No fake form submit or success flow was added.
- Responsive source review reflows each hero and workspace, stacks property and
  candidate cards, uses at least 44px mobile controls and 16px mobile field text,
  and retains visible keyboard focus. Local font resets exclude the shared CTA.
- `git diff --check`: passed. Environment files, schema, global styles, booking
  API/popup, dependencies, prior industry work and unrelated app pages were not
  changed. No whole-project build or whole-project typecheck is claimed.

Browser visual/interaction QA remains unverified: the computer-use browser
inventory reported “The browser access host is unavailable.” Source review and
server responses do not establish desktop/mobile appearance, clipping or actual
browser click/keyboard behavior; no screenshots are claimed.
