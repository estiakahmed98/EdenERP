# Garments & Textile — remaining industry pages

The menu contains five routes. Textile at `/industries/manufacturing/textile`
already renders `TextileManufacturingLanding`; retain that page and its source.
Garments, Accessories, Buying House and Merchandising render `ComingSoonPage`.
Complete those four in menu order, preserving their URLs, locale alternates,
header/footer, existing app pages and the shared booking popup.

Preserve the previous Others industry work and the user's Git state. Keep the established English content,
Adon ERP brand palette, scoped light/dark styling, compact breadcrumb spacing,
shared `LiveDemoButton` and half-blurred `DemoPreview`. Add no module navigation
strip. Use the local Sites workflow and the React component-review checklist.

| Sequence | Industry      | Distinct visual story                                       | Working local example                                     |
| -------- | ------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| 1        | Garments      | Technical garment/pattern sheet and a size-set ribbon       | Largest-remainder whole-piece size allocation             |
| 2        | Accessories   | Exploded trim organiser with button, zip, label and tag art | Piece requirements, entered allowance and stock shortfall |
| 3        | Buying House  | Buyer/factory coordination map and commercial-mode dossier  | Separate margin-trading and commission-fee scenarios      |
| 4        | Merchandising | Style dossier, dated action spine and material note         | Calendar-day milestone offsets from an example PCD        |

The supplied image is a menu, not operational data. New records, quantities,
rates, size sets, programmes and dates are explicitly illustrative. Existing
Merchandising app presentations contain separately labelled source excerpts;
link to them without representing industry-page examples as those real records.
No customer logos, testimonials, certifications or performance claims are added.

The garment allocation is not a physical cutting plan. Accessory counts use
pieces only and the editable allowance is not an industry standard. Commission
fees are not full merchandise sales; unknown operating costs and net profit stay
unknown. Milestone offsets use calendar days, without holidays or capacity rules.
No new API, order, stock movement, purchase request, invoice or TNA plan is saved.

## Implementation and validation

Completed in menu order: Garments, Accessories, Buying House, then Merchandising.
Each placeholder route was replaced and fetched successfully before proceeding
to the next route. Textile and all existing app presentations were retained.

All four pages include their own hero composition and working local example,
three selectable workflow perspectives, relevant existing product links,
native FAQ disclosures and links to the other apparel industries. Shared
`LiveDemoButton` instances appear in the hero, the existing half-blurred
`DemoPreview`, and the closing section. No alternate CTA implementation or
booking flow was added. Existing locale alternates are generated asynchronously;
industry content is explicitly English/LTR within the locale-aware site shell.

Validation performed:

- `node scripts/check-apparel-industries.mjs`: passed. Covers proportional
  allocation conservation, zero ratios, stable remainder ties, whole-piece
  rounding, entered allowances, count bounds, trading/commission separation,
  unknown commission costs, negative trading differences, UTC dates, leap years,
  invalid inputs, all four routes and 15 unique implemented product destinations.
- Focused TypeScript across the new components, four routes and their imports:
  zero diagnostics. Focused ESLint across 11 source/script files: zero issues.
- PostCSS parsing and component-to-CSS class reference checks: passed.
- All four routes at `en`, `bn` and `ar` returned HTTP 200, each with a single
  H1, the expected industry identifier, local workspace, half-blurred preview,
  English/LTR content scope and exactly three shared CTA markers.
- All 15 unique linked product pages and the preserved Textile page returned
  HTTP 200 in the final sequential navigation-target check.
- Responsive source review includes stacked/reflowing hero compositions,
  horizontally scrollable labelled data tables, 44px mobile inputs, keyboard
  focus styles, native controls, scoped dark-theme tokens and reduced-motion
  overrides. Very small decorative mobile text was increased to at least 9px.
- `git diff --check`: passed. No API, database schema, environment, Textile or
  unrelated app source was changed.

Browser visual QA remains unverified: the computer-use browser inventory returned
“The browser access host is unavailable.” No desktop/mobile screenshots or live
click/keyboard interaction results are claimed. The rendering/HTTP checks are
server responses, not substitutes for an actual browser review.

The repository-wide `node scripts/check-live-demo.mjs` still fails on an existing
retired demo label/component in
`app/[locale]/apps/university/class-schedule/page.tsx`, outside this change.
The four new industry pages reuse the shared CTA throughout; the unrelated
University file was left intact. A whole-project build/typecheck was not claimed.
