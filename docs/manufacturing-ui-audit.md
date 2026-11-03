# Manufacturing UI audit and common design system

## Scope

Source audit of Accounting Hub, Chart of Accounts, Inventory Demand Forecast,
Inventory Warehouses, the Manufacturing shared template and all 19 subpage routes.
Production Orders was the first reviewed page. Following approval, the common
design now covers all **19 Manufacturing subpages**. Manufacturing content is
English-only, including when a subpage is visited through another locale route.

## Findings

| Reference | Useful pattern | Manufacturing decision |
| --- | --- | --- |
| Accounting Hub | Brand tokens, Rubik headings, contextual sample data, structured product preview, clear demo CTA | Keep the existing brand and show a readable, interactive production workspace |
| Chart of Accounts | Explain the concept before the workflow; diagrams make relationships concrete | Show BOM + Routing → Production Order → Finished Goods in the hero |
| Inventory Demand Forecast | Split hero, usable search, filters and practical data views | Use a working sample order table with selectable execution details |
| Inventory Warehouses | Operational information presented in a consistent product frame | Reuse the product-frame approach and restrained surface treatment |
| Existing Manufacturing template | Shared localized content and four-step workflows | Preserve existing translations and domain content; introduce opt-in visual components |

Before this change, six subpages used the screenshot-based template:
Work Centers, Bill of Materials, Routings, Production Orders, Quality Control,
and Standard Costing. The other thirteen use Coming Soon:
MRP Planning, Master Schedule MPS, Capacity Planning, Scheduling APS,
Line Planning Board, Order Allocation, Shop Floor, QC Templates,
Subcontracting, Batches/Lots, Serial Numbers, Scrap/Waste, Production Costing.

The old template uses a hardcoded mauve accent and handwritten headings,
which differ from the current blue/green ERP branding. Large screenshots
limit readability on phones and do not allow people to explore order states.
Repeated screenshot sections also give operational information less hierarchy.

## Common design foundations

- **Color:** Existing `primary`, `foreground`, `muted-foreground`, `border`,
  `card`, `--cream` and `--ink` tokens. No global palette changes.
- **Type:** Existing `showcase-heading` font stack for editorial headings;
  normal UI typography and tabular numbers inside the product workspace.
- **Layout:** 1240 px maximum container; 20/32 px horizontal gutters;
  64/96 px section spacing; one-column layout on smaller screens.
- **Surfaces:** Thin borders, 12/16 px corners and restrained shadows.
- **States:** Draft = neutral, confirmed = blue, in progress = amber,
  completed = green. Every state also has a text label.
- **Components:** Eyebrow, section heading, primary/secondary link action,
  metric and status badge in `components/manufacturing/design-system.tsx`.
- **Page rhythm:** Breadcrumb + split hero → section navigation → product
  workspace → four-step process → module connections → demo CTA.
- **Accessibility:** Visible keyboard focus, semantic table headers, named
  search and filter controls, pressed state, progress values, polite result
  count, and text descriptions of timeline states.
- **Language:** Per the approved English-only scope, all 19 subpage bodies use
  English text, numbers, metadata and left-to-right layout. A scoped English
  provider also keeps Production Orders in English. Other site sections and
  the surrounding navigation retain the site's selected locale.

## Production Orders behavior

The current preview reproduces the nine fully visible production-order rows
from the supplied software screenshot. The source reports 58 orders; unseen
rows are not inferred. Status filters and search operate on the supplied excerpt.
The lower half is blurred and a booking invitation leads to the existing demo
page. The preview has no backend mutations. Demo and module links use
locale-aware navigation.

The other 18 routes now use a shared, data-driven showcase shell. All thirteen
Coming Soon subpage placeholders are replaced. The old shared template remains
available for any other consumers but is no longer used by these subpages.

## Unique hero redesign

The follow-up audit found that 18 pages reused the same split hero, blueprint
card, isometric cubes and curved callout. Production Orders used a related
blueprint composition. Changing the labels did not give each function its own
visual story.

All 19 heroes now have dedicated compositions. The common system supplies
typography, brand colors, breadcrumbs and action controls. Each hero defines
its own layout, illustration, information emphasis and use of creative accents.

| Subpage | Hero concept | Composition and visual story |
| --- | --- | --- |
| Work Centers | Factory resource atlas | Floor map leads on the left; resource story and actions sit on the right |
| Routings | Operation journey | Editorial header above a staggered, numbered production route |
| Bill of Materials | Recipe anatomy | Centered product story framed by material inputs and layered finished output |
| MRP Planning | Material balance | Demand and available supply resolve into a cut-out shortage quantity |
| Capacity Planning | Constraint gauge | Centered headline; recorded utilization and an undated-order exception form a three-part composition |
| Master Schedule (MPS) | Production calendar | A tilted calendar sheet and planning target accompany the master-plan story |
| Scheduling (APS) | Time as a resource | Wide editorial header over full-width scheduling lanes |
| Line Planning Board | Production landscape | Centered headline above a description rail and ready/running/attention lanes |
| Order Allocation | Quantity split | An order quantity branches into allocated and unassigned portions; supporting copy sits below |
| Production Orders | Production traveler | A wide job ticket with identity, perforation, operation states and output progress |
| Shop Floor | Operator console | Navy station display, circular output readout and next-handoff strip |
| Batches / Lots | Batch identity tree | Product and batch references branch into manufacturing date and recorded quantity |
| Serial Numbers | Unit passport | Centered title, wide barcode identity document and unit-level production checks |
| QC Templates | Inspection specification | Layered inspection sheets with one purposeful handwritten annotation |
| Quality Control | Inspection lens | Enlarged measurement illustration and acceptance context beside the quality story |
| Scrap / Waste | Material recovery cycle | Recoverable and disposal streams surround a circular recovery illustration |
| Subcontracting | Production boundary bridge | Internal and external resources are joined by sent/returned processing flows |
| Standard Costing | Cost foundation | A versioned cost ledger layers materials, labor, machine and overhead assumptions |
| Production Costing | Variance bridge | A prominent cost difference and a wide standard-to-actual cost bridge |

The hero registry is in `components/manufacturing/heroes/manufacturing-hero.tsx`.
Compositions are grouped by production foundation, planning, execution,
traceability/quality and costing. `heroes.module.css` scopes their visual rules.
The old shared blueprint hero is no longer rendered.

Responsive rules reflow compositions below 1100 px and 768 px. Complex timing
and cost diagrams scroll inside their own figures when needed. Smaller layouts
prioritize the introduction, readable controls and the function-specific visual.
SVG illustrations have accessible labels; finite animations honor reduced motion.
Seven hero illustrations now use the supplied steel-software references.
Other hero examples remain illustrative.

## Supplied software data and demo invitation

The screenshots are reference material for rebuilt HTML previews, rather than
bitmap images pasted into the pages. Actual visible values are transcribed in
`recorded-demo-data.ts`, and `recorded-demo-workspace.tsx` renders the snapshots.
The company shown is the supplied **Alif Steel Mills Ltd** record context.

| Page | Supplied excerpt |
| --- | --- |
| Work Centers | Eight resources; seven machines and one labor group; missing capacity/efficiency stay blank |
| Routings | Three routes plus the four RT-CCL operations; run minutes total 1,225 |
| Bill of Materials | Ten BOMs, 1,000 kg output basis and 98% configured yield; plain-sheet detail includes BDT 143,858, 1,006 kg input and 6 kg scrap |
| Capacity Planning | Eight work centers, W45–W52, zero overloads, one undated order and eight visible examples from 28 reported overrides |
| Master Schedule (MPS) | Two colour-coil products; on-hand figures 47,903.06 and 34,935.63; reorder points 2,000 |
| Production Orders | Nine fully visible rows from a source view reporting 58 orders; missing start dates stay blank |
| Batches / Lots | Ten fully visible batch rows from a source view reporting 200; manufacturing dates and quantities preserved |

Routing and BOM previews include register/detail switches. Search and status
filters are local read-only preview interactions. Unseen source rows, dates,
capacities, supplier references and inspection history are not fabricated.

All 19 workspace previews use `demo-preview.tsx`: the upper half remains clear,
the lower half uses an 8 px backdrop blur and a readable booking card links to
`/demo`. Covered controls are removed from keyboard navigation with `inert`.
The surface clips vertical overflow, and new page navigation resets preview
state. Existing distinct hero compositions are retained; seven hero data
illustrations now match the steel records. These are static marketing previews,
not a connection to the production database.

## Rollout across the remaining 18 pages

| Workspace layout | Pages |
| --- | --- |
| Supplied-data register/detail preview | Work Centers, Routings, Bill of Materials, Production Orders, Batches / Lots |
| Supplied-data weekly matrix | Capacity Planning, Master Schedule (MPS) |
| Searchable illustrative register | MRP Planning, QC Templates, Scrap / Waste |
| Status board + register | Line Planning Board, Order Allocation, Shop Floor, Quality Control, Subcontracting |
| Planning timeline + register | Scheduling (APS) |
| Trace structure + register | Serial Numbers |
| Cost breakdown + register | Standard Costing, Production Costing |

Each page has its own English hero, domain-specific explanatory copy, workflow
and connected-module links. Twelve pages retain four illustrative records each;
seven use the supplied software excerpts above. Original illustrative workspace
search, filters, view switching, selection and detail behavior remain beneath
the new preview treatment. Filtered cost shares use visible records.
Timeline placements are labeled illustrative and do not claim to be computed
schedules. No MRP engine, scheduling engine or backend mutations are introduced.

Implementation is split between `module-content.ts` (typed page content),
`module-showcase.tsx` (shared presentation), `module-workspace.tsx` (interactive
previews), `module-page.tsx` (server entry/metadata) and `english-content.tsx`
(scoped language policy). Route files select a typed module key.

## Creative visual refinement

The shared visual toolkit is applied selectively in the heroes:

- A handwritten annotation explains the QC specification sheet; a sticky note
  belongs to the MPS calendar. They are not a repeated hero requirement.
- A sketch ring emphasizes capacity and recoverable scrap; a recipe underline
  belongs to the BOM output. Other heroes use precise typography and geometry.
- A finite barcode scan appears on the unit passport; operation progress belongs
  to the traveler and operator console; scheduling lanes have their own reveal.
- Material equations, paper specifications, genealogy branches, calendars and
  cost layers replace the common isometric blueprint illustration.
- The previously approved lower-section markers, notes, connectors, status
  colors, selection behavior and micro-interactions remain unchanged.

Meaningful hero diagrams have accessible labels. Decorative SVGs are hidden
from assistive technology. All animation and motion
transitions respect reduced-motion preferences. These additions use scoped
CSS and existing theme/font tokens, with scoped English typography overrides.
Sketch animations use normalized SVG path lengths so both short arrows and
long underlines finish drawing completely.

## Verification

- All 19 English subpage routes and two additional locale routes passed the
  unique-hero response checks: HTTP 200, expected hero identity, exactly one H1,
  retained sample workspace and working workspace anchor. All 21 checks passed
  without missing-message or Next.js error markers.
- All 18 new module configurations and 72 sample records passed structural
  validation: route mapping, unique record IDs, progress ranges, focus statuses,
  workflow counts and connected-module links. Standard and actual sample cost
  totals reconcile to BDT 25,000 and BDT 26,000 respectively.
- Full TypeScript check found two existing errors in
  `app/[locale]/community/collaborate/events/EventsPage.tsx` (lines 273 and 384),
  with no errors reported for the Manufacturing changes.
- The current Manufacturing implementation passed a focused TypeScript
  check covering 36 source files and their imports.
- During the hero-only redesign, preservation checks compared the baselines and confirmed that
  all 19 route files, shared workspace/data files, Production Orders interaction
  code and both lower-section trees were unchanged. The subsequent approved
  demo-data pass replaces seven previews and updates their hero data as described
  above; routing and the distinct hero compositions remain intact.
- The hero registry resolves to 19 distinct component implementations. All 176
  referenced hero CSS classes resolve to scoped style rules.
- Supplied-data validation passed for all seven excerpts: visible row counts,
  missing values, source totals, routing/BOM relationships, operation run time,
  production quantities and MPS stock figures.
- All 19 routes plus two locale routes passed the half-blur/data response
  checks. Preview CSS references, the 50% blur boundary, booking destination and
  covered-control focus handling passed source checks.
- Browser visual/interaction verification was unavailable: the browser access
  host was unavailable, and native browser inspection stopped because the
  automation tool could not confidently determine the browser URL.
