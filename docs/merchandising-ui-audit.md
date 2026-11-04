# Merchandising — source audit and design plan

The nine menu-linked routes under `app/[locale]/apps/merchandising` currently render
`ComingSoonPage`. There is no merchandising API, production integration or Prisma
model in this checkout. The industry landing page is a separate consumer. Preserve
all route URLs, alternates, the global header and shared booking popup.

Accounting, Manufacturing, QMS and POS establish Rubik typography, EdenERP blue,
navy and green, scoped light/dark styles and a 1240px content frame. Reuse the
global `LiveDemoButton` and `DemoPreview`, with merchandising-specific copy.
Keep breadcrumb spacing compact. Do not add a module navigation strip.

| Page                    | Hero composition                                          | Interactive workspace                                             |
| ----------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Merchandising Dashboard | Editorial morning brief with a priority mosaic            | Source risk/material/owner evidence views                         |
| Styles & Costing        | Fashion specification board, garment drawing and swatches | Source style search and local FOB/cost scenario                   |
| TNA Calendar            | Wide typographic calendar with a milestone rail           | Calendar/matrix excerpt and local date comparison                 |
| Material Booking        | Material swatch library and order-readiness bars          | Search, shortages filter and material-line readiness              |
| Production Follow-up    | Panoramic sewing-to-packing progress lanes                | Source order selection, raw completion and local pace scenario    |
| Factories               | Offset facility dossier and capacity/compliance ledger    | Factory selection, certificate flags and local load exercise      |
| In-house Receipts       | Vertical goods-received docket with carton composition    | Ownership-mode filter and receipt detail selection                |
| Profitability           | Centered financial statement and revenue decomposition    | Source order excerpt and currency-separated local margin scenario |
| Buyer Portal            | Access window with buyer/role boundary illustration       | Supplied user selection and labelled permission preview           |

## Supplied data boundaries

Dashboard figures are a historical **4 November 2026** snapshot: 16 open orders,
14 at risk, 64 late TNA milestones, eight orders with shortages, nine behind plan,
three open shipments, USD 71,848 advances, four unpaid invoices (USD 388,787), two
open export LCs, 12.8% confirmed average margin. TNA status counts total 510;
the six owner late counts sum to 64. Preserve source aggregates separately from
the cropped record excerpts.

Transcribe five fully visible style rows, seven fully visible TNA milestone rows,
seven material-booking rows, five production rows, two factories, three receipt
rows and four complete profitability rows. Do not create the missing styles,
remaining milestones, raw daily output curves or unseen order details.

Receipt totals reconcile to 8,400 pieces and 750 cartons: 3,000 own-stock pieces
and 5,400 memo pieces. The own-stock value is 1,920,000; its currency is absent
from that screenshot and must remain unspecified. Memo values are unknown.
Factory figures reconcile to 6,440 pieces in progress and three certificate alerts.
Buyer Portal supplies four active logins in the summary but only three visible
user rows. Do not invent the fourth user. Individual email/phone/contact fields
are not necessary for these showcase interactions.

Some source states do not agree with a fresh date calculation (for example the
selected TNA order's September/October plans still show On track/Pending). Source
status labels remain historical evidence. Date comparisons use explicitly entered
local dates and do not overwrite them. Preserve production over-completion values
above 100%; cap only the decorative bar width. Preserve the style 26002 source
9.1% margin without deriving hidden price precision from rounded costs.

The profitability figures use BDT for aggregate actuals and order currency for
per-piece values. Do not infer exchange rates or merge commission fees with FOB
sales. Local calculators are illustrative, unsaved and disconnected; there are no
fake production syncs, purchase requisitions, receipt postings or access grants.

## Validation

Implemented all nine existing routes with separate hero compositions and local
workspaces under `components/merchandising`. The shared source-preview component
retains its clear upper half, blurred lower half and existing booking popup.
Local controls remain outside the blur. There is no module navigation strip;
breadcrumb-to-hero spacing is 30px on desktop and 18px on small screens before
any internal hero composition. The site header, menus, industry page, APIs,
database schema and other modules are unchanged.

Completed checks:

- Focused TypeScript compilation of the new components, nine routes, their
  imports and project declarations passes.
- Focused ESLint passes for all 17 new TypeScript/TSX and validation-script
  files. Keyboard-scroll refinements were checked again after implementation.
- `node scripts/check-merchandising.mjs` passes margin/currency arithmetic,
  negative-margin and sub-cent-price boundaries, zero-capacity and over-complete
  production cases, UTC date differences including leap years and invalid dates,
  independent source totals, unknown-value preservation and all nine routes.
- `node scripts/check-live-demo.mjs` passes 44 shared CTA placements across 25
  source files and all eight translation catalogs.
- All 27 sequential HTTP checks (nine routes across `en`, `bn` and `ar`) return
  200 with the correct route identity, one H1, English page content, the workspace,
  the half-blurred preview and three identical shared demo CTA components.
- CSS parses and all static CSS-module references resolve. Responsive rules,
  focus treatments, native labelled controls, focusable horizontal tables and
  reduced-motion treatment are implemented. `git diff --check` passes.

During HTTP verification the running development server's generated
`.next/dev/prerender-manifest.json` contained nine invalid trailing characters.
The valid manifest object and its 224 routes were preserved; only the generated
trailing corruption was removed, with a backup retained in the ignored development
directory. All 27 route checks passed sequentially afterwards. This did not change
application data, environment configuration or backend code.

Browser discovery reports that the browser access host is unavailable. Desktop
and mobile screenshot review, browser keyboard/click verification and visual
overflow/contrast checks therefore remain incomplete. Source and HTTP checks do
not replace visual QA. No repository-wide lint, full production build or real
Merchandising backend integration is claimed.
