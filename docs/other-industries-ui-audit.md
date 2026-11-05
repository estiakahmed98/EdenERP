# Others industries — E-commerce, NGO and TV

All three menu-linked routes `/industries/ecommerce`, `/industries/ngo` and
`/industries/tv` currently render `ComingSoonPage`. Preserve route paths, locale
alternates, global header/footer and the existing booking popup. Work locally in
the  Adon ERP checkout using the Sites presentation workflow; do not deploy a new
site or change unrelated app pages.

Existing product presentations cover commerce, inventory, fund accounting,
project schedules/budgets, fixed assets and invoicing. No dedicated broadcast,
playout or signal-control integration was found. TV is therefore presented as
programme/business-operation context with a local seconds-based rundown, not as
an implemented broadcast platform.

| Page       | Hero story                                                          | Working local example                                           |
| ---------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| E-commerce | Editorial storefront with custom notebook/mug/tote product art      | Basket quantities, delivery charge and flat-discount arithmetic |
| NGO        | Centred programme/fund dossier and connected purpose-to-record path | Example budget and three planning allocations                   |
| TV         | Panoramic programme frame, production notes and segment strip       | Editable five-segment rundown with start/end clocks             |

Maintain  Adon ERP typography, blue/navy/green, light/dark mode, compact breadcrumb
spacing and the same shared `LiveDemoButton` and half-blurred `DemoPreview`.
Keep each hero layout independent. Fully usable local examples sit outside the
blur. Do not introduce an extra module navigation strip.

The supplied image is a menu only: every product, programme label, amount,
segment and timing is illustrative. Do not invent real customer, donor,
beneficiary, charitable-impact, programme-rating or audience claims. The basket
collects no payment and assumes no tax. Budget arithmetic checks no grant
restrictions or compliance and approves no spending. TV timing uses whole
seconds, not broadcast frame/timecode standards, and plays or transmits no media.

Implemented all three routes through `components/industries/others`. The three
independent hero compositions have their own product artwork, programme dossier
and production/rundown visual stories. Workflow buttons change the supporting
context; product quantities, amount/share views, budget inputs and segment clocks
operate in local component state. Native FAQ controls and related-industry links
complete the page progression. APIs, database models, site navigation and the
existing booking popup are unchanged.

## Completed validation

- Focused TypeScript compilation passes for the six implementation files, three
  routes, imports and project declarations.
- Focused ESLint passes for all ten TypeScript/TSX/validation files.
- `node scripts/check-other-industries.mjs` passes cent-based basket arithmetic,
  empty baskets, discount/quantity boundaries, budget under/over-allocation,
  duration format/limits, a midnight rollover, invalid clocks/targets and total
  duration limits. It also checks all route mappings and implemented preview
  destinations.
- All nine sequential route requests across `en`, `bn` and `ar` return HTTP 200
  with the correct industry identity, one H1, English page content, the local
  demo section, the half-blurred canvas and three shared advisor CTA instances.
- All eleven unique linked product-preview destinations return HTTP 200 in English.
- CSS parses and static module references resolve. The first route check caught
  two product-art attribute selectors without a local class; both were scoped to
  `.industry` and all nine route requests then passed.
- The React best-practices review checked server/client boundaries, functional
  state updates, render-derived arithmetic, stable fixture IDs, deterministic
  SSR output, labelled native controls, keyboard-focusable table scrollers and
  live feedback. No client data-fetching effects, external integration, extra
  state library or unnecessary memoisation was introduced.
- Responsive rules cover desktop, tablet, mobile and narrow screens; light/dark
  tokens, reduced-motion treatment and visible keyboard focus are implemented.
  Local font rules explicitly exclude the shared demo CTA to preserve its
  global design. `git diff --check` passes.

The global `check-live-demo.mjs` scan still fails on an existing retired label in
`app/[locale]/apps/university/class-schedule/page.tsx`, outside these three routes.
That University page is unchanged. New hero actions and closing sections import
the global component directly; their preview invitation uses the existing shared
`DemoPreview` component.

Browser discovery reports that the browser access host is unavailable. Browser
desktop/mobile screenshots and actual click/keyboard/overflow/contrast review
remain incomplete. HTTP rendering and source checks do not replace visual QA.
No full production build or repository-wide lint result is claimed. The existing
development server was reused; no backend, server restart or cache repair was
required.
