# Global typography audit

Updated: 8 November 2026.

## Findings and changes

| Area | Finding | Resolution |
| --- | --- | --- |
| Root layout | Rubik was loaded globally, but several page families bypassed it. | Keep one variable Rubik font with `display: swap`; use shared content and annotation tokens. |
| Homepage | Plus Jakarta Sans supplied body/UI text; Caveat supplied principal headings and animated headline text. | Remove the Jakarta import/download. Use Rubik for all main headings, descriptions, buttons, statistics and product UI. Preserve underlines and the typewriter interaction. |
| Legacy modules and community pages | 57 source files contained Segoe Print, often with Bradley Hand/Comic Sans fallbacks. Main headings could vary by operating system. | Replace platform font stacks with the shared content token. Retain explicitly decorative notes and the e-sign signature specimen with the annotation token. |
| Accounting, Manufacturing, QMS and Industries | Many pages already used Rubik; handwritten notes had duplicated fallback stacks. Some illustrative covers/posters used Georgia. | Route component fonts through the shared tokens; use Caveat for decorative notes, covers and illustrative lettering. Keep monospace document references and technical data. |
| Header, footer and shared demo CTA | Inherit the root font; no separate font family needed. | Inheritance now resolves to the same Rubik stack as page content. The booking dialog also uses the shared content token. |
| Bengali | A Tiro-first stack also changed Latin UI into serif text on Bengali routes. | Rubik remains first for Latin; Tiro Bangla supplies Bengali glyphs. Bengali annotations retain Tiro. Explicit English workspace scopes use Caveat for their annotations. |

## Shared typography contract

- `--font-primary`: Rubik, Tiro Bangla glyph fallback, then system sans-serif.
- `--font-content`: language-scoped content family, used by Tailwind `font-sans`, component roots and legacy font overrides.
- `--font-annotation`: Caveat for handwritten notes and decorative highlights; Tiro Bangla for Bengali annotations. Do not apply it to whole primary headings, paragraphs, controls or data tables.
- `showcase-heading` remains the shared bold heading style. `showcase-heading-highlight` is an intentional decorative accent, not a replacement for the primary heading family.
- Homepage main headings share weight 700, line height 1.12 and tracking -0.025em. Bengali headings use 1.3 line height and normal tracking to give glyphs room. The hero scales from 34px to 68px; section headings retain their existing responsive scales and hierarchy. Body copy uses a 1.65 default line height; compact controls and numeric displays retain their appropriate existing metrics.
- Keep deliberate monospace styles for codes and technical readings. Keep the actual logo artwork unchanged.
- Load primary fonts only in the root layout. Caveat stays public-site-only, without preloading an annotation font as the LCP font.

## Validation

- Repository source scan: no remaining Plus Jakarta Sans, Segoe Print, Bradley Hand, Comic Sans MS, Hauser Script or Georgia font overrides in app/component/style sources.
- Full project TypeScript check: `tsc --noEmit --incremental false` passed.
- ESLint comparison against HEAD: 58 changed TypeScript files, 308 existing findings before and after, zero new findings. The repository does not currently declare its own ESLint dependency/configuration, so the existing temporary TypeScript ESLint toolchain was used without changing dependencies.
- Browser QA: homepage at 1440px, 768px, 390px and 320px widths; Accounting Hub, Manufacturing Production Orders, QMS Dashboard and Steel; Bengali homepage and an English workspace on a Bengali route; light/dark theme and the shared demo form, including optional fields.
- Checked computed font families and horizontal overflow. Confirmed the desktop hero prefix fits one line, Bengali text renders, decorative Accounting notes retain Caveat, and primary UI text uses Rubik.
- No booking requests were submitted during this typography QA.

Screenshot artifacts are saved outside the source tree as `adon-typography-desktop.jpg` and `adon-typography-mobile.jpg` in the current Codex visualization directory.
