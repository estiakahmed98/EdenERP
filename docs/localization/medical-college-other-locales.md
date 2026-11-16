# Medical College — remaining locale coverage

Completed 16 November 2026, following the English/Bengali content audit.

## Translation scope

All eight Medical College pages now have a complete `pages.medicalCollegeApp` namespace in each of the remaining six catalogues:

- `tr.json` — Turkish: 216 shared UI messages and 24 page/metadata messages.
- `ar.json` — Arabic: 216 shared UI messages and 24 page/metadata messages.
- `zh.json` — Simplified Chinese: 216 shared UI messages and 24 page/metadata messages.
- `ja.json` — Japanese: 216 shared UI messages and 24 page/metadata messages.
- `ne.json` — Nepali: 216 shared UI messages and 24 page/metadata messages.
- `vi.json` — Vietnamese: 216 shared UI messages and 24 page/metadata messages.

Total: **1,440 newly translated messages**, covering intake/admission, cards/items, professional exams, ward placement, interns, postgraduate trainees, governance and college settings. Existing global Medical College menu labels were checked against the page titles; two Nepali and seven Vietnamese labels were synchronized. The other four menus already matched.

Translated content includes page titles, descriptions/SEO, stored headlines, annotations, form labels, placeholders, accessible names, filters, status badges, dialogs, empty states, errors, local-review feedback, loading/retry messages and all programme tabs. The stored headline fields remain unused by the current hero implementation, but are translated too.

## Meaning and terminology

- DGME, BMDC, BCPS, MBBS, BDS, FCPS, MD, MS, API, BDT, unit identifiers and user-entered codes remain technical identifiers.
- The copy consistently distinguishes a local planning preview from a real admission, exam eligibility decision, signature, published result, financial approval or saved record.
- “Affiliation” remains an institutional relationship, not an accreditation claim.
- Turkish stipend wording uses **eğitim ödeneği**, avoiding an unsupported scholarship meaning. Japanese and Vietnamese quota wording remains neutral rather than implying a special-priority admission scheme.
- Existing numeric constraints, academic thresholds, financial calculations, programme values and validation rules were not changed.
- `{unit} · {date}` intentionally remains identical across locales: it contains only localized substitutions and a separator, not English prose.

## Nepali hydration correction

Browser QA exposed a real server/client mismatch: Node's ICU rendered Nepali digits as `०१`, while the browser's default numbering system rendered `01` in the week marker. The Medical College formatter now explicitly uses `numberingSystem: "deva"` for Nepali numbers and currency. This browser also fell back to English month abbreviations for Nepali, so application dates use stable Gregorian `YYYY-MM-DD` / compact `MM-DD` with Devanagari digits. The academic calendar and ISO date values are unchanged; no Bikram Sambat conversion is implied. These changes prevent that hydration mismatch and English date fallback without affecting other locales or calculation logic.

## Validation and visual QA

- All six Medical College namespaces have **100% key parity** with English: 240/240 messages each.
- JSON syntax, duplicate-key scan, ICU compilation, placeholder/tag signatures, whitespace and untranslated-value checks pass. The placeholder-only session composition is intentionally exempt from the identical-value check.
- English and Bengali catalogue files were compared byte-for-byte with the start-of-task snapshots: unchanged during this follow-up.
- A structural comparison confirms that changes in the six language files are confined to `pages.medicalCollegeApp` and their Medical College menu labels.
- Medical College unit/localization tests: **12/12 PASS**.
- TypeScript and scoped ESLint: PASS.
- Global i18n checker: PASS. It still reports 70 unrelated missing branches for most non-English locales and 71 for Nepali; those remain outside this Medical College task. Bengali's existing 14 extra keys are also unchanged.
- Full repository tests: **54 PASS, 3 existing FAIL**. The failures concern unrelated Bengali split-headline whitespace, legacy artefacts and TransportPool CTA consistency; none was suppressed or edited here.
- Browser coverage: **96 final route/interaction cases** — eight pages × six locales × desktop 1440px/mobile 390px. Checks include HTTP status, translated title/description, no raw namespace keys, direction, runtime errors, viewport overflow, local validation, workflow controls and scoped axe WCAG A/AA findings.
- Additional checks exercise all six actual language-menu selections, 320px planning dialogs, required-field feedback, keyboard focus/return, the existing shared demo modal, and dark-mode governance at 768px.
- Wide assessment/calendar tables retain their existing focusable horizontal scrolling; they do not force page-level overflow. Native date/number input editing widgets follow the browser/OS; application output uses the locale formatter.
- QA blocks API writes. Expected console failures from the deliberately blocked analytics collector are separated from application errors; no real booking or academic record was submitted.

Local screenshots and machine-readable results are in:
`C:/Users/zisan/AppData/Local/Temp/adon-college-locales-20261116/`.

Final evidence files: `final-results.json`, `extra-results.json`, `coverage.json`, and screenshots named `<slug>-<locale>-<width>-light.png` / `-workspace.png`. Per-locale review sheets show all eight page headers and mobile workspace states. Initial failed QA attempts are retained separately; final results include the rerun after correcting the Nepali hydration issue and test-harness assumptions about browser number formatting and the mobile language-menu location.

## Remaining scope

No English fallback is needed for the detailed Medical College namespace in any supported locale. Unrelated missing translations elsewhere on the website are not claimed complete. English/Bengali copy, routing, permissions, backend, booking behavior and module ordering remain unchanged. The Medical College module continues to be the existing, explicitly labelled local planning preview.
