# AdonERP ওয়েবসাইট বিশ্বাসযোগ্যতা ও মার্কেটিং প্রস্তুতি অডিট

তারিখ: ১৫ নভেম্বর ২০২৬। এই প্রতিবেদনের ফল repository, menu-backed route, translation, existing pricing configuration ও local browser পরীক্ষার ভিত্তিতে। এটি deployed ERP installation, paying customer বা business consent-এর যাচাই নয়।

## ১. মডিউল ও পেজের সঠিক হিসাব

আগে Homepage-এর হাতে লেখা তালিকায় ৪০টি app এবং অন্য CTA-তে ৫০+ tool বলা হতো। Apps menu-তে ছিল ২২টি group ও ২৫৪টি আলাদা route। একই বিষয় ভিন্নভাবে গণনা করাই বিভ্রান্তির কারণ।

এখন lib/product-inventory.ts থেকে Homepage, Apps directory ও Industries-এর count আসে: **২২টি মডিউল, ২৫৪টি Apps-directory page, ৮টি শিল্পখাত ও ৩৫টি industry-detail page**। Module মানে Apps-menu group; page মানে unique linked route। App/tool-কে আলাদা সংখ্যা হিসেবে দেখানো হচ্ছে না। এটি সব physical repository route, license বা live tenant feature-এর count নয়।

সব ২৫৪টি app ও ৩৫টি industry menu-link-এর route file আছে—automated regression-এ যাচাই হয়েছে।

## ২. Industries landing-এর নতুন ডিজাইন

আগে তিনটি retail card এবং প্রকাশ্য developer note ছিল। এখন সব existing industry-detail route নিয়ে নতুন directory: পরিচ্ছন্ন split hero, sector atlas, localized search, আটটি filter, sector description, সত্যিকারের app-workflow link এবং shared Live Demo CTA। Garments & Textile ও Manufacturing প্রথমে রাখা হয়েছে। কোনো নতুন placeholder detail page তৈরি হয়নি।

কভারেজ: Garments & Textile ৫; Manufacturing ৪; Retail ৬; Food & Hospitality ৫; Education ৪; Real Estate ৩; Consulting ৫; Others ৩। Desktop ১৪৪০px, বাংলা mobile ৩৯০px ও dark-mode পরীক্ষা হয়েছে; horizontal overflow নেই। নতুন directory-র axe WCAG A/AA পরীক্ষায় contrast সংশোধনের পর শূন্য violation। এটি পুরো website-এর accessibility certification নয়।

সমস্ত বিস্তারিত route:

- /industries/manufacturing/textile
- /industries/garments
- /industries/accessories
- /industries/buying-house
- /industries/merchandising
- /industries/steel
- /industries/manufacturing/metal
- /industries/manufacturing/furniture
- /industries/agro-rice
- /industries/retail/book-store
- /industries/retail/clothing-store
- /industries/retail/furniture-store
- /industries/retail/grocery-store
- /industries/retail/hardware-store
- /industries/retail/toy-store
- /industries/food&hospitality/restaurant
- /industries/food&hospitality/fast-food
- /industries/food&hospitality/guest-house
- /industries/food&hospitality/beverage-distributor
- /industries/food&hospitality/hotel
- /industries/school
- /industries/college
- /industries/university
- /industries/lms
- /industries/realestate/real-estate-agency
- /industries/realestate/architecture-firm
- /industries/realestate/construction
- /industries/consulting/accounting-firm
- /industries/consulting/marketing-agency
- /industries/consulting/talent-acquisition
- /industries/consulting/audit-certification
- /industries/consulting/travel-agency
- /industries/ecommerce
- /industries/ngo
- /industries/tv

## ৩. বাংলাদেশের জন্য Homepage demo

আগের $18.4K এবং raw Cr/L string-এর বদলে অর্থের নমুনা BDT-তে locale-aware formatter দিয়ে দেখানো হচ্ছে। Hero-তে উদাহরণ **৳১৮,৪০,০০০**; English Bangladesh-focused demo-তেও lakh grouping। এটি currency conversion বা প্রকৃত revenue নয়। AI preview-এর money-ও একই formatter ব্যবহার করে। Dates next-intl দিয়ে locale-aware; record count fictional dataset থেকে আসে।

নমুনার business name ও financial figure কাল্পনিক—Hero, AI এবং ২৪টি legacy app preview-তে স্পষ্ট disclosure আছে। International pricing currency/FX calculation পরিবর্তন হয়নি। Reduced-motion-এ preview লুকিয়ে থাকা এবং animated headline-এর বদলে খালি text দেখানোর ঝুঁকিও সংশোধন হয়েছে।

## ৪. Pricing-এর সত্যতা

Default fees ০/unset হলে existing getPlanPrice null ফেরত দেয়—এটি free plan নয়। Local Pricing page-এ ছয়টি plan quote mode-এ পাওয়া গেছে। তাই published price না থাকলে hero ও description-এ consultation/quotation-এর কথা বলা হয়। সর্বজনীন ৩৫% savings, নিশ্চিত payment methods এবং সব plan-এ unlimited সুবিধার অপ্রমাণিত copy সরানো হয়েছে।

Admin/database-backed price, plan features, monthly/yearly/quarterly calculation, FX, setup fee, billing ও checkout-এর আচরণ অক্ষত। Configured BDT/USD calculation ও quote-only path regression test পাস করেছে। Production database-এ কোনো write করা হয়নি; quotation-এর চূড়ান্ত মূল্য, scope ও payment terms ব্যবসায়িক দল নিশ্চিত করবে।

## ৫. Testimonial ও marketing claim

Net Reputation, Reputation Prime, Gravionne, 70% faster billing, 3× growth এবং customer/adoption/ratings-এর জন্য repository-তে প্রকাশের অনুমতি ও যাচাইযোগ্য evidence পাওয়া যায়নি। Source code-এ quote থাকা approval নয়।

Homepage-এর testimonial carousel-এর বদলে Accounting, Inventory ও Manufacturing-এর তিনটি existing product walkthrough এসেছে। ২৫টি legacy testimonial surface এবং আরও ৮টি rating/adoption/certification/activity block evidence gate-এর পেছনে রাখা হয়েছে। Partner listing-ও অনুমোদিত evidence ছাড়া public affiliation দাবি করে না; empty state থেকে shared Live Demo খোলা যায়। এখন approved registry খালি।

এগুলোকে যাচাইকৃত testimonial বলা হয়নি। Business team evidence-reference, publication consent, approver ও approval date সরবরাহ করলে নির্দিষ্ট claim পুনরায় প্রকাশ করা যাবে। পুরোনো translation keys/archived quote strings মুছে JSON structure ভাঙা হয়নি; guarded content আর public UI-তে render হয় না।

## ৬. বাংলা landing ও WhatsApp

বাংলা campaign path: **/bn**। Local preview: http://localhost:3000/bn। Runtime canonical বর্তমানে localhost—তাই এটিকে production ad destination হিসেবে ব্যবহার করবেন না। সঠিক deployed public domain-এর সঙ্গে /bn ব্যবহার করতে হবে এবং site URL configuration যাচাই করতে হবে। এই কাজে environment বা live advertising বদলানো হয়নি।

বর্তমান shared WhatsApp destination: **+880 1842-781978**। URL-এ country code-সহ digits-only number, lossless বাংলা encoding এবং localized accessible label আছে। নতুন message:

> হ্যালো, আমাদের ব্যবসার জন্য AdonERP-এর একটি ডেমো দেখতে চাই। প্রয়োজনীয় মডিউল, খরচ ও ইমপ্লিমেন্টেশন নিয়ে বিস্তারিত জানাবেন?

[WhatsApp campaign destination](https://wa.me/8801842781978?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%B8%E0%A6%BE%E0%A6%B0%20%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF%20AdonERP-%E0%A6%8F%E0%A6%B0%20%E0%A6%8F%E0%A6%95%E0%A6%9F%E0%A6%BF%20%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A7%8B%20%E0%A6%A6%E0%A7%87%E0%A6%96%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%9F%E0%A7%8B%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A7%9F%20%E0%A6%AE%E0%A6%A1%E0%A6%BF%E0%A6%89%E0%A6%B2%2C%20%E0%A6%96%E0%A6%B0%E0%A6%9A%20%E0%A6%93%20%E0%A6%87%E0%A6%AE%E0%A6%AA%E0%A7%8D%E0%A6%B2%E0%A6%BF%E0%A6%AE%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%9F%E0%A7%87%E0%A6%B6%E0%A6%A8%20%E0%A6%A8%E0%A6%BF%E0%A7%9F%E0%A7%87%20%E0%A6%AC%E0%A6%BF%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%A4%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A7%87%E0%A6%A8%3F)

Shared Live Demo component ও lead API/database অপরিবর্তিত। Desktop/mobile-এ CTA একই dialog খুলছে; কোনো test lead submit করা হয়নি। WhatsApp URL/message যাচাই হয়েছে; বাস্তব account ownership, message delivery বা customer response এই পরীক্ষায় দাবি করা হয়নি।

## যাচাইয়ের ফলাফল

- Production build: PASS; compilation, TypeScript এবং ২৯১৮টি generated page সম্পন্ন।
- আলাদা npm run typecheck: PASS।
- নতুন marketing regression ৯টি ও security test ৯টি: **১৮/১৮ PASS**।
- সম্পূর্ণ npm test: **২০ PASS, ৩ FAIL**। তিনটি failure আগের baseline-এও ছিল: ১টি split-headline whitespace, ৬১২টি legacy Bangla style/encoding candidate এবং ২টি TransportPool CTA mismatch। এই কাজের বাইরে গণহারে বাংলা পাল্টানো হয়নি।
- npm run i18n:check: PASS। নতুন namespaces সব ৮ ভাষায় সমান structure/ICU-সহ আছে। Site-wide পুরোনো fallback বাকি: zh/tr/ar/ja/vi-তে ২১টি করে ও ne-তে ২২টি missing key; bn-তে ০ missing ও ১৪ extra। এগুলোকে ১০০% global parity বলা হয়নি।
- Bangla audit: structure, missing key, placeholder ও HTML mismatch শূন্য। Site-wide heuristic report-এ ২৯৪৬টি review candidate আছে; এগুলো confirmed error-এর সংখ্যা নয়।
- npm run lint: standard command চালানো যায়নি—repository-তে ESLint executable/dependency অনুপস্থিত। Available temporary ESLint দিয়ে ১৪টি নতুন/মূল TSX/TS file এবং আরও ৫টি সংশ্লিষ্ট component পরীক্ষা: PASS। পুরো repository-কে lint-clean বলা হয়নি।
- Browser: Industries filter/search/reset, বাংলা Homepage, Apps count, quote-mode Pricing ও withheld partner state PASS। নতুন directory-তে desktop/mobile/dark axe violation শূন্য; page runtime error পাওয়া যায়নি।
- সব ৩৫টি industry route-এর source-file parity PASS। Local production server-এ সব ৩৫টি route HTTP 200 দিয়েছে। Dev server-এর generated-cache JSON parsing error restart-এর পর সেরেছে; /bn, /en/industries এবং /en/industries/garments পুনরায় HTTP 200 দিয়েছে।

## পরিবর্তিত ফাইল ও উদ্দেশ্য

নিচের তালিকা এই কাজ শুরুর file hash-এর সঙ্গে মিলিয়ে তৈরি; আগে থেকে থাকা footer/contact/help-এর অসংশ্লিষ্ট কাজ রাখা হয়েছে। next-env.d.ts build দ্বারা স্বয়ংক্রিয়ভাবে update হতে পারে; এটি ইচ্ছাকৃত feature change নয়।

- `docs/marketing-readiness-audit.md` — সমস্যা, পরিবর্তন, route coverage, validation ও প্রকাশের শর্তের এই বাংলা প্রতিবেদন।
- `app/[locale]/apps/AppsPageClient.tsx` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `app/[locale]/apps/Finance/Accounting/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/Finance/Expenses/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/Finance/Invoicing/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/human-resources/payroll/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/human-resources/recruitment/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/human-resources/time-off/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/manufacturing/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/productivity/artificial-intelligence/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/productivity/discuss/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/sales/rental/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/services/appointments/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/services/helpdesk/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/services/planning/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/services/timesheets/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/supply-chain/inventory/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/supply-chain/procurement/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/supply-chain/purchase/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/supply-chain/quality/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/blog/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/ecommerce/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/elearning/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/forum/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/live-chat/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/apps/website/page.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/community/collaborate/github/GithubPage.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/contact/ContactClient.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `app/[locale]/industries/page.tsx` — নতুন directory mount; existing locale route/metadata রাখা।
- `components/floating-actions.tsx` — যাচাইকৃত public number, বাংলা message, accessible label এবং নিরাপদ URL encoding।
- `components/header.tsx` — একই existing industry menu পুনর্ব্যবহার; URL অপরিবর্তিত।
- `components/landing/AppsSection.tsx` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `components/landing/Hero.tsx` — BDT/localized fictional preview ও স্পষ্ট sample disclosure।
- `components/landing/NativeAISection.tsx` — BDT/localized fictional preview ও স্পষ্ট sample disclosure।
- `components/landing/ServiceSection.tsx` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `components/landing/StatsSection.tsx` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `components/landing/TestimonialsSection.tsx` — অনুমোদনহীন testimonial-এর বদলে বাস্তব product walkthrough ও navigation।
- `components/landing/community/get services/find-a-partner/PartnersPage.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `components/landing/community/get services/implementation/ImplementationPage.tsx` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `components/landing/landing-data.ts` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `components/landing/landing-ui.tsx` — Reduced-motion অবস্থায় reveal content দৃশ্যমান রাখা ও static headline।
- `components/landing/native-ai/stage-cards.tsx` — BDT/localized fictional preview ও স্পষ্ট sample disclosure।
- `components/pricing/PricingPage.tsx` — প্রকাশিত দাম না থাকলে honest quotation copy; হিসাব/checkout অক্ষত।
- `lib/pricing/validation.ts` — ইনস্টল করা Zod-এর record signature অনুযায়ী schema ঠিক করা; গ্রহণযোগ্য data অপরিবর্তিত।
- `lib/site.ts` — প্রমাণহীন customer-adoption দাবি metadata থেকে সরানো।
- `messages/ar.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/bn.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/en.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/ja.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/ne.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/tr.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/vi.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `messages/zh.json` — সব সমর্থিত ভাষায় নতুন labels এবং সংশোধিত counts, pricing, disclosure ও evidence-ভিত্তিক copy।
- `package.json` — Windows/Node-এ test-directory discovery ঠিক করে সব test file চালানো।
- `components/industries/industry-directory.module.css` — নতুন responsive industry directory, search, sector filters, workflows, light/dark ও accessibility।
- `components/industries/industry-directory.tsx` — নতুন responsive industry directory, search, sector filters, workflows, light/dark ও accessibility।
- `components/landing/demo-money.tsx` — BDT/localized fictional preview ও স্পষ্ট sample disclosure।
- `components/sample-data-note.tsx` — পুরোনো product demo-তেও নমুনা data-র disclosure।
- `lib/demo-format.ts` — BDT/localized fictional preview ও স্পষ্ট sample disclosure।
- `lib/industries-menu.ts` — একই existing industry menu পুনর্ব্যবহার; URL অপরিবর্তিত।
- `lib/industry-solutions.ts` — প্রমাণহীন testimonial/rating/adoption/affiliation withholding; প্রাসঙ্গিক sample disclosure ও existing CTA সংরক্ষণ।
- `lib/marketing-evidence.ts` — Evidence ও publication-consent ছাড়া promotional claim render বন্ধ।
- `lib/product-inventory.ts` — মেনুভিত্তিক inventory ও একটি source থেকে সঠিক count দেখানো।
- `lib/whatsapp.ts` — যাচাইকৃত public number, বাংলা message, accessible label এবং নিরাপদ URL encoding।
- `tests/marketing-readiness.test.ts` — Inventory, routes, ICU, evidence gate, money, WhatsApp ও pricing regression।
- `docs/localization/translation-changes.jsonl` — বদলানো বিদ্যমান বাংলা অনুবাদের review ledger।

## প্রকাশের আগে যা নিশ্চিত করতে হবে

১. Production public domain/site URL ঠিক করে বাংলা campaign canonical পরীক্ষা।
২. Customer quote, logo, rating বা measured outcome প্রকাশ করতে evidence ও consent সংগ্রহ।
৩. Quotation, scope, payment methods ও support terms ব্যবসায়িকভাবে অনুমোদন।
৪. আলাদা localization maintenance-এ baseline Bangla QA findings এবং অন্য ভাষার existing fallback নিষ্পত্তি।
৫. Repository-তে ESLint dependency/configuration স্থায়ীভাবে যোগ করে সম্পূর্ণ lint চালানো।

কোনো commit, push, deploy, production data write, environment পরিবর্তন বা Facebook/Google Ads পরিবর্তন করা হয়নি।
