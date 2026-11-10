# AdonERP Bangla style guide

This guide covers everyone who writes or reviews Bangla copy for AdonERP: product copywriters, translators, developers adding keys to `messages/bn.json`, and reviewers.

The 2026-11 rewrite used it, and `scripts/audit-bn-translations.mjs` and `tests/i18n-bn.test.ts` enforce parts of it.

## 1. Voice

The target mix is **70% professional, 20% modern, 10% Gen-Z**.

| Do | Don't |
|---|---|
| Write like a Bangladeshi product copywriter talking to a business owner. | Translate the English word by word. |
| Use short, active sentences: "পেরোল চালান কয়েক ক্লিকে।" | Use textbook or sadhu forms: হইবে, করিয়া, অনুগ্রহপূর্বক, নিমিত্তে, এতদ্বারা. |
| Use conversational verbs: সামলান, বানান, দেখুন, মিলিয়ে নিন. | Stack nouns: "দৈনন্দিন কাজের স্থিতিশীলতা". |
| Say what the product does, exactly as the English does. | Add claims: নিখুঁত, শতভাগ, বহুগুণ, স্মার্ট, আধুনিক, "free" or "AI expert" when the English doesn't say them. |
| Keep accounting, tax, HR and legal text precise and neutral. | Be playful in compliance, tax, payroll or error messages. |

Use the Gen-Z touch only in hero headlines, CTAs and section titles. Examples: "ব্যবসাকে নিয়ে যান পরের লেভেলে", "এক প্রয়োজন, এক অ্যাপ।", "গুছিয়ে কাজ করার আনন্দ". Never use it in a table header, a validation message or a tax explanation.

## 2. Terminology (approved)

| English | Use | Avoid / notes |
|---|---|---|
| Project | প্রজেক্ট | প্রকল্প (replaced everywhere) |
| Order / Purchase Order / Sales Order | অর্ডার / পারচেজ অর্ডার (PO) / সেলস অর্ডার | আদেশ, ক্রয় আদেশ, ক্রয়াদেশ, বিক্রয় আদেশ |
| Production Order / Work Order | প্রোডাকশন অর্ডার / ওয়ার্ক অর্ডার | উৎপাদন আদেশ, কার্যাদেশ |
| Manufacturing (module, industry) | ম্যানুফ্যাকচারিং | উৎপাদন শিল্প. উৎপাদন is fine as a verb or noun in prose. |
| Production (department, floor) | প্রোডাকশন | |
| Inventory / Stock | ইনভেন্টরি / স্টক | মজুদ ব্যবস্থাপনা. মজুত is acceptable in prose. |
| Invoice | ইনভয়েস | চালান. চালান means *challan*, e.g. ডেলিভারি চালান. |
| Bill (supplier) | বিল | |
| Report | রিপোর্ট | প্রতিবেদন. Exception: Financial Reports / Statements → আর্থিক প্রতিবেদন. |
| Accounting | অ্যাকাউন্টিং; হিসাব in prose | হিসাবরক্ষণ in UI labels |
| Dashboard | ড্যাশবোর্ড | |
| Supply Chain | সাপ্লাই চেইন | সরবরাহ শৃঙ্খল |
| Billing / Payment | বিলিং / পেমেন্ট; পরিশোধ is fine in accounting prose | অর্থপ্রদান, অর্থ প্রদান করা হয়েছে |
| Customer / Buyer | কাস্টমার or গ্রাহক / ক্রেতা | In merchandising, "Buyer" is a role: always ক্রেতা. |
| Supplier / Vendor | সাপ্লায়ার or সরবরাহকারী / ভেন্ডর | |
| Workflow | ওয়ার্কফ্লো | কর্মপ্রবাহ |
| Team | টিম | দল is acceptable in prose |
| Employee | কর্মী | কর্মকর্তা/কর্মচারী, এমপ্লয়ি |
| Attendance / Time Off / Payroll | উপস্থিতি / ছুটি / পেরোল | অ্যাটেনডেন্স |
| Implementation | ইমপ্লিমেন্টেশন; বাস্তবায়ন is acceptable in prose | |
| Overview | ওভারভিউ | সার্বিক চিত্র |
| Real-time | রিয়েল-টাইম | রিয়াল-টাইম, রিয়েল টাইম |
| Email | ইমেইল | ইমেল, ই-মেইল |
| Brand | **AdonERP** | Adon ERP, অ্যাডন, আডন ইআরপি |
| Acronyms | Keep in Latin: AI, ERP, CRM, HR, POS, VAT, PO, LC, BOM, MRP, QC, KPI, SLA, API, SMS, PF, TDS, NBR | এআই, ইআরপি, সিআরএম, এইচআর, পিওএস, এসএমএস |
| Brands, companies, people | Registered Latin form: GitHub, WhatsApp, bKash, Wonder Toys | Transliterating a company name, or adding a duplicate in parentheses |

## 3. Recurring CTAs (one string each)

| English | Bangla |
|---|---|
| Start now | এখনই শুরু করুন |
| Meet an advisor | পরামর্শকের সঙ্গে কথা বলুন |
| Request a demonstration | ডেমোর অনুরোধ করুন |
| Start Free Trial | ফ্রি ট্রায়াল শুরু করুন |
| Watch a demo | ডেমো দেখুন |
| See all apps / features | সব অ্যাপ দেখুন / সব ফিচার দেখুন |
| Contact Sales | সেলস টিমে যোগাযোগ করুন |
| Try it free (nav) | ফ্রি ট্রাই করুন |
| Free, forever, with unlimited users | আনলিমিটেড ব্যবহারকারী, চিরদিন ফ্রি |
| Expand as you grow. | ব্যবসা বাড়লে, অ্যাপও বাড়ান। |
| Unleash · your · growth · potential | আপনার · ব্যবসার · গ্রোথের পুরো সম্ভাবনা · কাজে লাগান |

## 4. Headlines

- Keep them short and punchy, and keep the English idea. Don't swap it for a generic one. Examples:

  | English | Correct | Wrong |
  |---|---|---|
  | Customer Relationship *Magic* | কাস্টমার রিলেশনশিপের *জাদু* | "গ্রাহক সম্পর্ক ব্যবস্থাপনা সহজ করুন" |
  | Don't waste time. Track it. | সময় নষ্ট নয়, ট্র্যাক করুন। | "সময়ের অবচয় রোধে" (অবচয় = depreciation) |
  | Being organized never felt so good | গুছিয়ে কাজ করার আনন্দ / আগে কখনো এত ভালো লাগেনি | |

- **Split headlines.** Many headings are stored as fragments: `title`, `titleHighlight`, `titleEnd`, `subtitle`, `titlePrefix`. Components render them in a fixed order, often with a coloured or circled middle part.
  - Write the whole Bangla sentence first, then cut it into the same number of fragments.
  - Bangla word order may move words between fragments. The concatenation must read naturally.
  - The highlighted fragment should carry the key word.
  - Keep every leading or trailing space exactly as in English (the test suite checks this).
  - Never leave a fragment empty, and never add or remove fragments.
- **Hero `typeWords` on the home page are owner-approved.** Don't change them without the product owner.

## 5. UI text

- Buttons: a verb in the polite imperative, ending in করুন / দেখুন / নিন. Keep the label near the English length; nav buttons must not wrap on mobile.
- Labels and table headers: nouns, no verb, no full stop. "X by Y" becomes "Y-ভিত্তিক X" (কাস্টমারভিত্তিক AR), never "Y দ্বারা X".
- Status words: খসড়া, অপেক্ষমাণ, চলমান, অনুমোদিত, বাতিল, সম্পন্ন, মেয়াদোত্তীর্ণ.
- Validation and errors: polite and specific. অনুগ্রহ করে is fine once; never use অনুগ্রহপূর্বক.

## 6. Punctuation, numbers, dates

- **Sentences end with দাঁড়ি "।" (U+0964).** Never use "৷" (U+09F7, a Google-Translate artefact) or an ASCII full stop after Bangla text. Keep abbreviations like "মো.", "লি.", "কো." and step numbers like "১." as they are.
- **Digits:** Bangla digits (০-৯) in prose and amounts, e.g. ৳২,৪০,০০,০০০. Keep ASCII digits in codes, IDs and versions: PO-679183, SC-2026-000003, v2, ISO 9001, Form 108, FY 2026-27, A4.
- **Number grouping:** lakh/crore grouping (১২,৩৪,৫৬৭). "Million" becomes লাখ or কোটি (15 million = ১.৫ কোটি).
- **Currency:** ৳ or টাকা in prose. Keep BDT/USD where the UI shows a currency code.
- **Dates** (from code, `Intl` with `bn`) appear as ৩ নভেম্বর ২০২৬. Short month labels are acceptable in charts: অক্টো, সেপ্টে.

## 7. Technical rules (never break)

- Only values change. Keys, nesting, array lengths and order stay as in `en.json`.
- Keep ICU placeholders (`{count}`, `{name}`), plural/select syntax, rich-text tags (`<highlight>…</highlight>`, `<accent>`), `**bold**` markers and `\n` line breaks.
- Don't translate identifiers or technical values: icon names, colours, Tailwind classes, ids, status codes, URLs, file paths, e-mail addresses, CLI commands.
- Apply changes with `node scripts/apply-bn-patch.mjs <patch.json>`. It validates placeholders, tags and edge whitespace, edits values in place without reformatting the file, and logs every change to `docs/localization/translation-changes.jsonl`.
- Before committing, run `npm run i18n:check`, `npm test` and `node scripts/audit-bn-translations.mjs`.
