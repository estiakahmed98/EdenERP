# Arabic translation completion report

Target file: `messages/ar.json`. Reference file: `messages/en.json`, which was not changed.

## Result

- `ar.json` has the same 37,467 keys as `en.json`: 0 missing, 0 extra, 0 type mismatches.
- No placeholder differs from the English string (`{count}`, `{name}`, `{format}` and so on).
- The file is strict JSON, written with CRLF line endings and no trailing newline, as before.
- Nothing was committed or pushed.

## How it was done

1. Compared `en.json` and `ar.json` key by key and wrote down what was done and what was not (`docs/arabic-translation-status.md`).
2. Translated the missing strings in batches of about 420 unique English strings, section by section, in formal Modern Standard Arabic.
3. Each batch was merged through a script that rejects any line whose placeholders differ from the English, then applied to every key that was missing or still identical to English.
4. After each batch, the file was re-parsed as JSON and an Arabic sample string was searched for in the file, to catch the file being overwritten.

## Terminology used

- Ledger = دفتر الأستاذ, depreciation = الإهلاك, receivables = الذمم المدينة, payables = الذمم الدائنة.
- Warehouse = مستودع, delivery challan = إشعار التسليم, purchase requisition = طلب شراء.
- University pages: GPA = المعدل الفصلي, CGPA = المعدل التراكمي, transcript = كشف الدرجات, credit hours = الساعات المعتمدة.
- Lakh and crore are written as لاخ and كرور; Taka stays as BDT or ৳ where `en.json` uses it.

## What is intentionally left in English

Icon names, person and company names in demo data, CSS tokens, URLs, CLI output, plan ids, CSV column headers and non-English sample sentences. See `docs/arabic-translation-status.md` for the counts.

## Known limits

- Right-to-left layout, line breaks and highlighted title fragments were not checked in the browser.
- Three strings got a small wording fix after they were applied (typos in the school and Budget Management showcase pages), and one plural string was written by hand. All four were edited directly in `ar.json`.
- Literary quality was reviewed while writing, not by a second reader. A native-speaker pass over the marketing pages is advisable.
