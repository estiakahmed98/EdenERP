# Point of Sale — audit and design plan

The ten routes under `app/[locale]/apps/pos` are existing, menu-linked placeholders.
There is no POS API or POS Prisma model. The separate sales/retail landing pages
are different consumers and are outside this change. Existing routes and metadata
alternates will be retained. No database, payment or inventory mutations are added.

Accounting Hub contributes editorial Rubik headings, clear numbers and product
framing. Manufacturing contributes responsive illustrations and the shared
`LiveDemoButton` and lower-half `DemoPreview`. QMS contributes source provenance,
bounded demonstrations and page-specific visual stories. POS will share tokens
and primitives, rather than repeat one hero layout ten times.

| Page                | Visual composition                                            | Local interaction                                        |
| ------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Register (Till)     | Angled checkout terminal, product tile and receipt slip       | Product search, basket quantities, tender and change     |
| Shifts              | Editorial cash-drawer ledger with a horizontal shift timeline | Cash count against a supplied closed shift               |
| Receipts            | Tall paper receipt opposite the editorial title               | Item search and inclusive/exclusive tax breakdown        |
| Day Summary (Z)     | Centered closing statement and a large sales bridge           | Totals and waterfall-style accounting view               |
| Outlet Dashboard    | Asymmetric KPI/chart bento                                    | Sales vs stock-cover evidence views                      |
| Loyalty & Vouchers  | Centered membership card and perforated voucher               | Explicitly illustrative points redemption                |
| Transfers           | Wide dispatch-to-receive route diagram                        | Supplied transfer selection and local receiving variance |
| Stock Lots          | Bale-to-item sorting composition                              | Quantity vs retail-weighted cost apportionment           |
| Outlet Stock        | Full-width shelf composition and catalogue strip              | SKU search and local stock count                         |
| Outlets & Registers | Connected location network                                    | Read-only warehouse/register explorer                    |

## Supplied data and limits

Use Denim House Ltd and only fully visible records. Eight complete shifts are
transcribed; the truncated lower rows are not fabricated. The day summary supplies
one DH-6070 sale: gross/net sales BDT 3,450, VAT 450, cost 1,261.09 and margin
1,738.91. The dashboard supplies one receipt in its historical 14-day window; it
does not supply a full daily time series. Its on-hand 295 is a separate screenshot
from the outlet stock balance of 192, and is labelled separately.

The stock screenshot supplies six lines, 1,390 units, cost value BDT 853,556.98
and retail value BDT 2,531,860. Two received transfers and one posted 1,150-unit,
BDT 180,000 stock lot are supplied. Blank shortage/markdown fields remain unknown.
Six locations, two selling outlets and two registers are visible. The dashboard
supplies 27 loyalty accounts, 3,610 points, two active vouchers and BDT 3,770
outstanding voucher value; identities and redemption rules are absent.

No receipts or loyalty detail screenshot was supplied. Their examples, the checkout,
receiving/count exercises and stock-lot allocation inputs are explicitly local or
illustrative. They do not create production receipts, journal entries or changes
to warehouse stock. The shared booking CTA opens the existing request popup.

## Implementation

All ten route placeholders are replaced by the POS showcase. English content,
scoped light/dark tokens, independent hero compositions, a fully usable local
workspace, a clear-upper/blurred-lower supplied-data preview, page-specific workflow
and links to related POS pages form the page progression. There is no nested
translation provider, so the shared CTA retains the active site's translation.

## Validation

- Focused TypeScript compilation of the POS components, all ten routes, their
  imports and project declarations passes.
- Focused ESLint passes for the seven TypeScript/TSX implementation files, ten
  routes and two validation scripts, using the existing temporary lint tooling.
- `node scripts/check-pos.mjs` passes VAT-inclusive checkout, tender/change,
  invalid-input boundaries, integer-paisa cost allocation including rounding ties,
  independently summed supplied stock values and all ten route mappings.
- `node scripts/check-live-demo.mjs` passes 42 shared CTA placements across 23
  source files and all eight message catalogs. Its import check now resolves both
  alias and relative imports to the shared source, avoiding a false failure on an
  existing landing-page import. No production landing-page import was changed.
- All twenty POS route responses across `en` and `bn` return HTTP 200, with one
  H1, the correct route identity, the accessible local workspace, the half-blurred
  preview and three uses of the shared demo button.
- Scoped CSS parses and all static CSS-module class references resolve.
  `git diff --check` passes.

Browser discovery reports that the browser access host is unavailable. Therefore
desktop/mobile screenshot review and browser click/keyboard verification remain
incomplete. HTTP rendering and source checks are not visual QA. No full production
build, repository-wide lint or production POS backend integration is claimed.

The common `DemoPreview` accepts an optional domain-specific description. POS
uses retail copy; existing Manufacturing and QMS callers retain the same default
copy, styling, lower-half blur, focus handling and shared booking popup.
