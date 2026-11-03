# QMS audit and design plan

## Repository audit

All five existing routes under `app/[locale]/apps/quality` render
`ComingSoonPage`: Quality Dashboard, Non-Conformance, CAPA, AQL Sampling and SPC.
Their URLs already appear in the application menu. There is no QMS API,
database model or calculation engine in the current repository to replace.
The existing supply-chain Quality landing page is a separate consumer and will
remain unchanged.

Accounting Hub establishes the current brand tokens, Rubik editorial headings,
1240 px content width, clear product framing and explainable metrics.
Manufacturing adds dedicated hero compositions, scoped styles, English content,
responsive diagrams and a single reusable demo CTA. Its common hero originally
made pages look repetitive; QMS therefore starts with five separate compositions.

## Five visual concepts

| Page              | Hero identity                                                        | Interactive workspace                                                                                          |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Quality Dashboard | Asymmetric quality observatory with a bento evidence mosaic          | Snapshot KPIs, severity/source breakdown, monthly NC signal and case-excerpt filtering                         |
| Non-Conformance   | Wide exception case file with a corrugation tolerance illustration   | Search, source/severity filters, case selection and a clearly labeled local demo NC form                       |
| CAPA              | Closed-loop action architecture with raised isometric evidence tiles | Source register, selected case, illustrative action checklist, verification stage and local demo CAPA form     |
| AQL Sampling      | Sampling laboratory: a lot becomes a representative sample           | Bounded plan lookup, accept/reject evaluation, selectable source matrix and validation                         |
| SPC               | Navy process-control observatory with a modeled capability curve     | Supplied summary plus separate simulated/custom readings, I/MR charts, capability metrics and point inspection |

Shared foundations are brand colors, typography, spacing, focus treatment and
the existing `ManufacturingDemoButton`. Heroes do not share a layout template.
Local workspaces stay usable, with no production mutations or automatic NC/CAPA
claims. All source excerpts and illustrative additions are explicitly identified.

## Supplied data policy

- Dashboard: six raised NCs, four open, one critical; five CAPAs, four open,
  zero overdue and one closed; 92% first-pass yield. AQL pass rate is unknown
  because the screenshot reports zero AQL inspections.
- Severity: minor 1, major 4, critical 1. Source: inspection 2, supplier 2,
  production 2. The monthly chart supplies October 2026 only. No defect Pareto
  classifications are supplied.
- NC register: four visible records, NC-0005 through NC-0002. The two unseen
  records are not invented. Quantities remain zero as shown.
- CAPA register: four visible open records; owner and due date remain blank.
  The fifth, closed record is a source summary count, not a fabricated row.
- AQL: implement the fully visible General II, normal single-sampling AQL 2.5
  excerpt for lots 2–500. The default demo uses lot 500: code H, sample 50,
  accept 3, reject 4. Other AQL/level combinations and uncovered lots report
  missing plan data rather than extrapolating the table's lookup arrows.
- SPC: preserve Cp 0.621, Cpk 0.578, mean 23.3958, within sigma 0.8053,
  100 analyzed readings, three out-of-control points, specifications 22–25,
  target 23.5 and limits 20.9799–25.8117. The selector reports 351 available
  readings; their raw values are not supplied. Simulated readings are labeled
  separately and their metrics are recalculated from those simulated values.

## Technical references

SPC uses successive moving ranges, sigma = mean moving range / 1.128,
three-sigma Individuals limits, and the corresponding Cp/Cpk formulas. See
[NIST Individuals charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc322.htm)
and [NIST capability indices](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm).
The sampling demo reproduces the supplied excerpt; it does not infer a complete
standards table from the [ISO sampling overview](https://www.iso.org/standard/2859-1).

## Implementation and validation

Implemented all five existing routes with separate hero compositions and
page-specific client workspaces. Shared primitives, source records and scoped
light/dark styles live in `components/quality/`; pure sampling and SPC calculations
live in `components/quality/calculations.ts`. Routing, the application menu,
Accounting, Manufacturing and the separate supply-chain Quality page are unchanged.

The NC and CAPA forms create clearly marked session-only demo records. CAPA
checklists are illustrative and do not change the supplied case status. SPC can
switch between the supplied summary, simulated readings and pasted local input;
chart inspection also supports arrow keys and a native point-selection slider.
The original raw readings are not reconstructed. All demo CTAs reuse the existing
Manufacturing button, including its styling and destination.

Each QMS workspace now uses the shared Manufacturing `DemoPreview`: the upper
half stays clear, while the lower half has the existing responsive blur and a
centered "Book a live demo" invitation. Its existing focus management makes
covered controls inert. The hero, preview invitation and closing section use the
same button component. The preview wrapper owns the border and shadow, avoiding
stacked frames around the QMS workspace.

Completed checks:

- Focused TypeScript check: all 15 QMS TypeScript files and their imports pass.
- `node scripts/check-qms.mjs`: supplied counts and excerpts, every supported AQL
  range boundary, accept/reject decisions, unsupported combinations, the published
  NIST Individuals-chart example, zero variation, numeric overflow and reading
  parser edge cases pass.
- All 15 route responses (five pages across `en`, `bn` and `ar`) return HTTP 200.
  Each contains its own hero, one H1, an interactive-workspace section, expected
  source content, English copy and three identically styled demo CTAs, including
  the lower-half preview invitation.
- Scoped CSS class references, dynamic status palettes, five separate hero
  compositions, mobile breakpoints and reduced-motion rules pass source checks.
- `git diff --check` passes.

Browser visual review and in-browser interaction testing could not run because
the browser access host is unavailable. HTTP rendering and source checks do not
replace viewport, contrast or click verification. No full production build or
repository-wide lint result is claimed. The AQL coverage and absent SPC raw data
remain explicitly disclosed in the interface rather than filled with invented
values.
