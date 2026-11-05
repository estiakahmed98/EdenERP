# Global live demo button audit

**Current behavior:** the shared component opens a compact demo-request popup
with three required fields and optional additional details. Submissions are
stored in PostgreSQL and managed in the Admin inbox. All 39 placements in 20
source files still share the component. See [the current request flow and
validation](live-demo-popup-ui.md). The inventory and navigation checks below
record the earlier link-based refactor rather than the current popup behavior.

## Findings

The repository audit covered application and component source, shared templates,
translation catalogs and routing. It found 37 CTA placements in 18 source files.
These placements render on many pages through the shared Accounting,
Manufacturing and QMS templates.

| Source                                      | Placements | Previous implementation                                                      |
| ------------------------------------------- | ---------: | ---------------------------------------------------------------------------- |
| Accounting `accounting-hub/page.tsx`        |          3 | Preview link and local primary buttons                                       |
| Accounting `bills-ap/page.tsx`              |          2 | Preview link and shared primary button                                       |
| Accounting `chart-of-accounts/page.tsx`     |          2 | Hardcoded demo links                                                         |
| Accounting `invoices-ar/page.tsx`           |          3 | Preview link and local primary buttons                                       |
| Accounting `journal-entries/page.tsx`       |          3 | Preview link and local primary buttons                                       |
| Accounting `ledgers/page.tsx`               |          3 | Preview link and local primary buttons                                       |
| Accounting `purchase-orders/page.tsx`       |          2 | Preview link and shared primary button                                       |
| Accounting `_designs.tsx`                   |          5 | Hero/section primary buttons                                                 |
| Accounting `_showcase.tsx`                  |          1 | Shared closing primary button                                                |
| Accounting `_template.tsx`                  |          1 | Shared preview link                                                          |
| University `university-dashboard/page.tsx`  |          3 | Inactive buttons: Book a demo / Book a live demo                             |
| University `university-admissions/page.tsx` |          3 | Inactive buttons: Request a Demo / Book a live demo / Schedule a Walkthrough |
| Manufacturing `production-orders.tsx`       |          1 | Module-specific demo component                                               |
| Manufacturing `module-showcase.tsx`         |          1 | Module-specific demo component                                               |
| Manufacturing `heroes/hero-parts.tsx`       |          1 | Module-specific demo component                                               |
| Manufacturing `demo-preview.tsx`            |          1 | Module-specific demo component                                               |
| QMS `ui.tsx`                                |          1 | Alias of Manufacturing demo component                                        |
| QMS `heroes.tsx`                            |          1 | Alias of Manufacturing demo component                                        |

The old `/[locale]/demo` URLs returned HTTP 404. The repository already has an
advisor destination at `/[locale]/community/get-services/meet-advisor`.
University's demo buttons had no click handler or navigation destination.

Video/demo players and their “Watch Demo” links are separate actions. Existing
advisor section anchors and general sales/contact links retain their own purpose.
FAQ prose mentioning a demo is not a button label.

## Shared implementation

- `components/live-demo-button.tsx` owns the markup, translated label, icon,
  locale-aware navigation and stable `data-live-demo-cta` attribute. Consumers
  render `<LiveDemoButton />`; it accepts no label, URL or styling overrides.
- `components/live-demo-button.module.css` owns sizing, wrapping, focus outline,
  hover lift and reduced-motion handling. The existing global `btn-gradient`
  retains the  Adon ERP blue gradient and hover brightness. The icon cannot shrink;
  long translations wrap within the available width, with a 44 px minimum height.
- `common.actions.liveDemo` is the sole label key in all eight catalogs. Its English
  value is **Meet an Advisor with Live Demo**. Retired Accounting and Manufacturing
  demo-label keys and redundant button implementations have been removed.
- `lib/live-demo.ts` owns the advisor destination. `app/[locale]/demo/page.tsx`
  redirects legacy links to that same destination using the requested locale.
- English-only Manufacturing and QMS providers include the shared English label.
  The button reads the route locale separately so their English copy does not
  change a Bengali or Arabic booking URL into an English URL.
- Hero, preview-overlay and closing placements use the same component and design.
  Existing half-blur previews remain in place. No booking submission logic or
  appointment-page content is changed.

Change the component/CSS to update design and behavior everywhere; edit the one
catalog key per language to update its label. Change `LIVE_DEMO_HREF` to update
both current navigation and the legacy redirect destination.

## Validation

`node scripts/check-live-demo.mjs` checks all source placements, direct imports,
absence of old labels/components and direct `/demo` links, absence of per-instance
overrides, coverage of the four module families and all eight translation keys.

The repository has an `eslint` script but no installed ESLint package or config.
Validation uses temporary tooling outside the checkout: ESLint 9 with the
TypeScript ESLint 8 parser/plugin and its recommended rules. Dependencies and
package-manager files are unchanged. The first comparison identified six unused
University imports already present before this task; those imports were removed
from the page being refactored.

Completed validation:

- Source audit guard passes: 37 placements in 18 files, all eight catalogs, no
  retired labels/components, direct `/demo` links or per-instance overrides.
- All 50 affected module subpages return HTTP 200: 24 Accounting, 19
  Manufacturing, five QMS and the two University pages with demo invitations.
  Their 149 rendered CTA instances have the same CSS classes, English label and
  advisor destination. University placeholder routes are outside this migration.
- Accounting Hub renders the translated shared label and correct destination in
  all eight locales (24 CTA instances).
- Manufacturing and QMS retain English labels while preserving the requested
  booking locale on 16 representative pages across all eight locales.
- All eight legacy `/[locale]/demo` URLs redirect to the corresponding advisor
  page and finish with HTTP 200.
- ESLint recommended TypeScript rules pass on all 25 changed/new source files,
  with zero errors or warnings, using the temporary tooling described above.
- The focused TypeScript check for the shared button, locale providers, redirect
  and their imports passes. `git diff --check` also passes.

The full TypeScript check has the same two baseline errors in
`app/[locale]/community/collaborate/events/EventsPage.tsx`, at lines 273 and 384.
There are no TypeScript diagnostics from this refactor.

Browser visual/click testing remains unavailable because the browser access host
is unavailable. Rendered HTML, HTTP navigation and source checks are recorded
separately; they do not establish screenshot or keyboard-interaction QA.
