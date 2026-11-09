# Arabic translation status (ar.json vs en.json)

Status: **complete** (checked by script, see below).

| Check | Result |
|---|---|
| Keys in `en.json` | 37,467 |
| Keys in `ar.json` | 37,467 |
| Missing keys | 0 |
| Extra keys | 0 |
| Type mismatches | 0 |
| Placeholder mismatches | 0 |
| Values in a foreign script | 84, all legitimate (see notes) |
| `ar.json` parses as strict JSON | yes |

Translatable unique English strings handled: 14,493 at the start of this phase, 0 remaining.

## Notes

- 83 of the foreign-script values are Taka amounts that use the ৳ sign (for example `৳142.42M`). They are currency figures and are kept as in `en.json`.
- 1 value is the Bangla language-switcher label `বাংলা` (`common.languageSwitcher.options.bn`). A language name stays in its own script.
- About 1,498 values are identical to English on purpose. They are icon names, person and company names in demo data, CSS class tokens, URLs, CLI output, plan ids (`starter`, `basic`, …), CSV column headers (`dataset`, `metric`, `value`, `unit`), and sample sentences in Spanish, French and German.
- The ICU plural string `pages.budgetManagement.table.rowsCount` uses the six Arabic plural forms (zero, one, two, few, many, other). It was written directly into the file because the merge tool's placeholder check only accepts the English two-form shape.
- Latin digits and the brand name "Adon ERP" are kept as they are.
- Highlight fragments (split titles such as "Every milestone." / "A date with purpose.") were translated so each Arabic fragment reads correctly when the page joins them.
- Not checked: how each page looks in the browser (right-to-left layout, line breaks, highlight rendering). That needs a manual pass in the running app.
