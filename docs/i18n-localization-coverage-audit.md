# Adon ERP: Page Localization Coverage

Generated from `messages/*.json` and the page/component source.

- **Coverage** = share of the page's English keys that exist in the locale file. "Localized" means ≥90%.
- The app merges English into every locale at runtime (`i18n/request.ts`), so a missing key silently shows English. Coverage here is measured on the raw locale files, not the merged output.
- Shared `common.*` keys are reported separately because they affect every page.

## Summary

| Category | Pages |
|---|---:|
| Fully localized, all 8 languages (≥90%) | 46 |
| Localized in bn + ne only (zh/tr/ar/ja/vi still English) | 174 |
| Localized in bn only | 27 |
| Partially localized | 5 |
| Forced English by code (bn/ne copy exists but is never shown) | 25 |
| English only, no translation | 82 |
| Localized via database + per-locale defaults | 1 |
| Redirect only (not counted) | 3 |
| **Total routes** | **363** |

## Language coverage (360 routes, redirects excluded)

| Locale | Localized (≥90%) | Partly localized | Still English |
|---|---:|---:|---:|
| Bengali (bn) | 250 | 5 | 105 |
| Nepali (ne) | 222 | 9 | 129 |
| Chinese (zh) | 67 | 2 | 291 |
| Turkish (tr) | 67 | 2 | 291 |
| Arabic (ar) | 67 | 2 | 291 |
| Japanese (ja) | 67 | 2 | 291 |
| Vietnamese (vi) | 67 | 2 | 291 |

"Still English" includes pages with no translation hook and pages whose keys are absent from that locale. zh, tr, ar, ja and vi have identical message coverage, so they produce identical numbers.

## Shared keys that affect every page

- `common.demoRequest` (34 keys, the demo-request form): **missing in all 7 non-English locales, including bn**. The demo form is English everywhere.
- `common.actions` and the rest of `common`: complete in every locale.
- `layout.*` (header, footer, navigation): complete in every locale.

## Message-file gaps

- `pages.accountingShowcase`: bn/ne about 91% complete; zh/tr/ar/ja/vi 0% for most sections. Exceptions at 100% for zh: ledgers, invoices, journal, hub, bills, purchaseOrders, itemsProducts, customers.
- Inside `pages.accountingShowcase`, bn/ne miss some list-valued keys (e.g. `flow.steps`, `faq.items`), so those lists show English even in bn/ne.
- bn 100% but ne and zh 0%: `pages.fundAccounting`, `pages.engineeringMaintenance`, `pages.analytics`, `pages.transportPool`, `pages.budgetManagement`, `pages.manufacturingShowcase`.
- `pages.university-students`: 0% in every locale, although its namespace exists.

## Fully localized, all 8 languages (≥90%) (46)

| Route | bn | ne | zh/tr/ar/ja/vi |
|---|---|---|---|
| `/apps/accounting/accounting-hub` | ✅ | ✅ | ✅ |
| `/apps/accounting/bills-ap` | ✅ | ✅ | ✅ |
| `/apps/accounting/customers` | ✅ | ✅ | ✅ |
| `/apps/accounting/invoices-ar` | ✅ | ✅ | ✅ |
| `/apps/accounting/items-products` | ✅ | ✅ | ✅ |
| `/apps/accounting/journal-entries` | ✅ | ✅ | ✅ |
| `/apps/accounting/ledgers` | ✅ | ✅ | ✅ |
| `/apps/accounting/purchase-orders` | ✅ | ✅ | ✅ |
| `/apps/Finance/Accounting` | ✅ | ✅ | ✅ |
| `/apps/Finance/esign` | ✅ | ✅ | ✅ |
| `/apps/Finance/Expenses` | ✅ | ✅ | ✅ |
| `/apps/Finance/Invoicing` | ✅ | ✅ | ✅ |
| `/apps/human-resources/appraisals` | ✅ | ✅ | ✅ |
| `/apps/human-resources/attendance` | ✅ | ✅ | ✅ |
| `/apps/human-resources/employees` | ✅ | ✅ | ✅ |
| `/apps/human-resources/payroll` | ✅ | ✅ | ✅ |
| `/apps/human-resources/recruitment` | ✅ | ✅ | ✅ |
| `/apps/human-resources/time-off` | ✅ | ✅ | ✅ |
| `/apps/productivity/artificial-intelligence` | ✅ | ✅ | ✅ |
| `/apps/productivity/discuss` | ✅ | ✅ | ✅ |
| `/apps/productivity/iot` | ✅ | ✅ | ✅ |
| `/apps/sales/crm` | ✅ | ✅ | ✅ |
| `/apps/sales` | ✅ | ✅ | ✅ |
| `/apps/sales/pos` | ✅ | ✅ | ✅ |
| `/apps/sales/pos-restaurant` | ✅ | ✅ | ✅ |
| `/apps/sales/rental` | ✅ | ✅ | ✅ |
| `/apps/sales/subscriptions` | ✅ | ✅ | ✅ |
| `/apps/services/appointments` | ✅ | ✅ | ✅ |
| `/apps/services/helpdesk` | ✅ | ✅ | ✅ |
| `/apps/services/planning` | ✅ | ✅ | ✅ |
| `/apps/services/timesheets` | ✅ | ✅ | ✅ |
| `/apps/supply-chain/inventory` | ✅ | ✅ | ✅ |
| `/apps/supply-chain/maintenance` | ✅ | ✅ | ✅ |
| `/apps/supply-chain/procurement` | ✅ | ✅ | ✅ |
| `/apps/supply-chain/purchase` | ✅ | ✅ | ✅ |
| `/apps/supply-chain/quality` | ✅ | ✅ | ✅ |
| `/apps/website/blog` | ✅ | ✅ | ✅ |
| `/apps/website/ecommerce` | ✅ | ✅ | ✅ |
| `/apps/website/elearning` | ✅ | ✅ | ✅ |
| `/apps/website/forum` | ✅ | ✅ | ✅ |
| `/apps/website/live-chat` | ✅ | ✅ | ✅ |
| `/apps/website` | ✅ | ✅ | ✅ |
| `/checkout` | ✅ | ✅ | ✅ |
| `/community/learn/blog/[slug]` | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ |
| `/help` | ✅ | ✅ | ✅ |

## Localized in bn + ne only (zh/tr/ar/ja/vi still English) (174)

| Route | bn | ne | zh/tr/ar/ja/vi |
|---|---|---|---|
| `/apps/accounting/ar-ap-aging` | ✅ | ✅ | ❌ |
| `/apps/accounting/bank-accounts` | ✅ | ✅ | ❌ |
| `/apps/accounting/bank-reconciliation` | ✅ | ✅ | ❌ |
| `/apps/accounting/cheque-register` | ✅ | ✅ | ❌ |
| `/apps/accounting/closing-fy` | ✅ | ✅ | ❌ |
| `/apps/accounting/delivery-challans` | ✅ | ✅ | ❌ |
| `/apps/accounting/discounts-coupons` | ✅ | ✅ | ❌ |
| `/apps/accounting/exchange-rates` | ✅ | ✅ | ❌ |
| `/apps/accounting/financial-reports` | ✅ | ✅ | ❌ |
| `/apps/accounting/fixed-asset-register` | ✅ | ✅ | ❌ |
| `/apps/accounting/loan-management` | ✅ | ✅ | ❌ |
| `/apps/accounting/petty-cash` | ✅ | ✅ | ❌ |
| `/apps/accounting/receipts` | ✅ | ✅ | ❌ |
| `/apps/accounting/vat-register` | ✅ | ✅ | ❌ |
| `/apps/accounting/vendors` | ✅ | ✅ | ❌ |
| `/apps/analytics/demand-forecast` | ✅ | ✅ | ❌ |
| `/apps/analytics/executive-dashboard` | ✅ | ✅ | ❌ |
| `/apps/analytics/export-takeout` | ✅ | ✅ | ❌ |
| `/apps/analytics/financial-reports` | ✅ | ✅ | ❌ |
| `/apps/analytics/hr-payroll` | ✅ | ✅ | ❌ |
| `/apps/budget-management/approvals` | ✅ | ✅ | ❌ |
| `/apps/budget-management/lines` | ✅ | ✅ | ❌ |
| `/apps/budget-management/rbrf` | ✅ | ✅ | ❌ |
| `/apps/budget-management/requisitions` | ✅ | ✅ | ❌ |
| `/apps/budget-management/variance` | ✅ | ✅ | ❌ |
| `/apps/education/academics` | ✅ | ✅ | ❌ |
| `/apps/education/admissions` | ✅ | ✅ | ❌ |
| `/apps/education/boarding-mess` | ✅ | ✅ | ❌ |
| `/apps/education/education-dashboard` | ✅ | ✅ | ❌ |
| `/apps/education/exams-results` | ✅ | ✅ | ❌ |
| `/apps/education/fee-reports` | ✅ | ✅ | ❌ |
| `/apps/education/fees` | ✅ | ✅ | ❌ |
| `/apps/education/hifz` | ✅ | ✅ | ❌ |
| `/apps/education/institution-settings` | ✅ | ✅ | ❌ |
| `/apps/education/library` | ✅ | ✅ | ❌ |
| `/apps/education/notices` | ✅ | ✅ | ❌ |
| `/apps/education/online-payments` | ✅ | ✅ | ❌ |
| `/apps/education/promotion-certificates` | ✅ | ✅ | ❌ |
| `/apps/education/rooms` | ✅ | ✅ | ❌ |
| `/apps/education/school-bus` | ✅ | ✅ | ❌ |
| `/apps/education/store-issues` | ✅ | ✅ | ❌ |
| `/apps/education/student-attendance` | ✅ | ✅ | ❌ |
| `/apps/education/students` | ✅ | ✅ | ❌ |
| `/apps/education/timetable` | ✅ | ✅ | ❌ |
| `/apps/education/welfare-funds` | ✅ | ✅ | ❌ |
| `/apps/employee-portal/my-attendance` | ✅ | ✅ | ❌ |
| `/apps/employee-portal/my-leaves` | ✅ | ✅ | ❌ |
| `/apps/employee-portal/my-payslips` | ✅ | ✅ | ❌ |
| `/apps/employee-portal/my-pf-gratuity` | ✅ | ✅ | ❌ |
| `/apps/employee-portal/my-profile` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/calibration` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/downtime` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/equipment` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/pm-schedules` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/spare-parts` | ✅ | ✅ | ❌ |
| `/apps/engineering-maintenance/work-orders` | ✅ | ✅ | ❌ |
| `/apps/Finance/budget-management` | ✅ | ✅ | ❌ |
| `/apps/human-resources/approvals-inbox` | ✅ | ✅ | ❌ |
| `/apps/human-resources/departments` | ✅ | ✅ | ❌ |
| `/apps/human-resources/designations` | ✅ | ✅ | ❌ |
| `/apps/human-resources/final-settlements` | ✅ | ✅ | ❌ |
| `/apps/human-resources/form-108-annual` | ✅ | ✅ | ❌ |
| `/apps/human-resources/grades-steps` | ✅ | ✅ | ❌ |
| `/apps/human-resources/holiday-calendar` | ✅ | ✅ | ❌ |
| `/apps/human-resources/hr-policy-pf-gratuity` | ✅ | ✅ | ❌ |
| `/apps/human-resources/hr-reports` | ✅ | ✅ | ❌ |
| `/apps/human-resources/leave-applications` | ✅ | ✅ | ❌ |
| `/apps/human-resources/leave-types` | ✅ | ✅ | ❌ |
| `/apps/human-resources/payroll-runs` | ✅ | ✅ | ❌ |
| `/apps/human-resources/salary-budgets` | ✅ | ✅ | ❌ |
| `/apps/human-resources/salary-components` | ✅ | ✅ | ❌ |
| `/apps/human-resources/salary-structures` | ✅ | ✅ | ❌ |
| `/apps/human-resources/service-records` | ✅ | ✅ | ❌ |
| `/apps/human-resources/shifts` | ✅ | ✅ | ❌ |
| `/apps/human-resources/tax-brackets-nbr` | ✅ | ✅ | ❌ |
| `/apps/human-resources/wppf-welfare` | ✅ | ✅ | ❌ |
| `/apps/inventory/demand-forecast` | ✅ | ✅ | ❌ |
| `/apps/inventory/gate-passes` | ✅ | ✅ | ❌ |
| `/apps/inventory/inventory-summary` | ✅ | ✅ | ❌ |
| `/apps/inventory/stock-movements` | ✅ | ✅ | ❌ |
| `/apps/inventory/warehouses` | ✅ | ✅ | ❌ |
| `/apps/inventory/weighbridge-scales` | ✅ | ✅ | ❌ |
| `/apps/medical-centre/clinic-visits` | ✅ | ✅ | ❌ |
| `/apps/medical-centre/health-checkups` | ✅ | ✅ | ❌ |
| `/apps/medical-centre/medical-centre` | ✅ | ✅ | ❌ |
| `/apps/medical-centre/pharmacy` | ✅ | ✅ | ❌ |
| `/apps/open-platform/export-takeout` | ✅ | ✅ | ❌ |
| `/apps/open-platform/migration-studio` | ✅ | ✅ | ❌ |
| `/apps/open-platform/tax-rates` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/bill-allocations` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/boq` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/budgets` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/change-orders` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/cost-codes` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/documents` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/job-cost` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/milestones` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/p-and-l` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/progress-billing` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/projects` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/risks-issues` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/schedule` | ✅ | ✅ | ❌ |
| `/apps/project-accounting/wip` | ✅ | ✅ | ❌ |
| `/apps/real-estate/bookings` | ✅ | ✅ | ❌ |
| `/apps/real-estate/brokers` | ✅ | ✅ | ❌ |
| `/apps/real-estate/buyer-portal` | ✅ | ✅ | ❌ |
| `/apps/real-estate/collections` | ✅ | ✅ | ❌ |
| `/apps/real-estate/handover` | ✅ | ✅ | ❌ |
| `/apps/real-estate/leases` | ✅ | ✅ | ❌ |
| `/apps/real-estate/properties` | ✅ | ✅ | ❌ |
| `/apps/real-estate/revenue-recognition` | ✅ | ✅ | ❌ |
| `/apps/real-estate/sales-dashboard` | ✅ | ✅ | ❌ |
| `/apps/real-estate/units` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/accounts/account-plans` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/accounts/objections` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/accounts/playbook` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/activities/tasks` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/activities/visit-log` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/distribution/dealers` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/distribution/field` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/distribution/org-access` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/distribution/pricing` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/distribution/schemes` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/dms/distributor-stock` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/dms/market-returns` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/dms/secondary-sales` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/dms/sell-through` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/engage-ai/ask-ai` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/engage-ai/capture` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/engage-ai/sequences` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/finance/collections` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/finance/commissions` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/finance/credit` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/insights/am-scorecard` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/insights/dashboard` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/insights/forecast` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/insights/relationships` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/orders/customer-360` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/orders/quotes` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/orders/returns` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/orders/sales-orders` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/pipeline/contacts` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/pipeline/deals` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/pipeline/leads` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/pipeline/pipeline` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/trade-promo/claims` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/trade-promo/promotions` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/trade-promo/rebates` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/van-sales/trips` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/van-sales/van-sales` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/van-sales/van-stock` | ✅ | ✅ | ❌ |
| `/apps/sales/crm/van-sales/vans` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/goods-receipts` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/landed-cost` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/overview` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/procurement/comparative-statements` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/procurement/purchase-requisitions` | ✅ | ✅ | ❌ |
| `/apps/supply-chain/tender-management` | ✅ | ✅ | ❌ |
| `/apps/trade-finance/bd-export-papers` | ✅ | ✅ | ❌ |
| `/apps/trade-finance/export-shipments` | ✅ | ✅ | ❌ |
| `/apps/trade-finance/letters-of-credit` | ✅ | ✅ | ❌ |
| `/apps/trade-finance/sales-contracts` | ✅ | ✅ | ❌ |
| `/apps/trade-finance/tt-remittances` | ✅ | ✅ | ❌ |
| `/apps/transport-pool/fuel-log` | ✅ | ✅ | ❌ |
| `/apps/transport-pool/maintenance` | ✅ | ✅ | ❌ |
| `/apps/transport-pool/trips` | ✅ | ✅ | ❌ |
| `/apps/transport-pool/vehicles` | ✅ | ✅ | ❌ |
| `/apps/university/campus-services` | ✅ | ✅ | ❌ |
| `/apps/university/exams-attendance` | ✅ | ✅ | ❌ |
| `/apps/university/faculty-workload` | ✅ | ✅ | ❌ |
| `/apps/university/grades-results` | ✅ | ✅ | ❌ |
| `/apps/university/graduation` | ✅ | ✅ | ❌ |
| `/apps/university/outcomes-obe` | ✅ | ✅ | ❌ |

## Localized in bn only (27)

| Route | bn | ne | zh/tr/ar/ja/vi |
|---|---|---|---|
| `/apps/analytics/bi-analytics-reporting` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/beneficiaries-me` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/cost-allocation` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/dashboard` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/donors-funds` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/grants` | ✅ | ❌ | ❌ |
| `/apps/fund-accounting/reports` | ✅ | ❌ | ❌ |
| `/apps/transport-pool/transport-pool` | ✅ | ❌ | ❌ |
| `/community/collaborate/github` | ✅ | ◐ 50% | ✅ |
| `/community/collaborate` | ✅ | ❌ | ✅ |
| `/community/empower-education/education-program` | ✅ | ❌ | ✅ |
| `/community/empower-education` | ✅ | ❌ | ✅ |
| `/community/empower-education/scale-up-business-game` | ✅ | ❌ | ✅ |
| `/community/empower-education/visit-odoo` | ✅ | ❌ | ✅ |
| `/community/get-services/find-an-accountant` | ✅ | ❌ | ✅ |
| `/community/get-services/find-partner` | ✅ | ◐ 50% | ✅ |
| `/community/get-services/implementation` | ✅ | ❌ | ✅ |
| `/community/get-services` | ✅ | ❌ | ✅ |
| `/community/get-services/upgrades` | ✅ | ❌ | ✅ |
| `/community/get-the-software/compare-editions` | ✅ | ❌ | ✅ |
| `/community/get-the-software/download` | ✅ | ❌ | ✅ |
| `/community/get-the-software` | ✅ | ❌ | ✅ |
| `/community/get-the-software/releases` | ✅ | ❌ | ✅ |
| `/community/learn/blog` | ✅ | ◐ 50% | ✅ |
| `/community/learn/certifications` | ✅ | ❌ | ✅ |
| `/community/learn` | ✅ | ❌ | ✅ |
| `/community/learn/podcast` | ✅ | ❌ | ✅ |

## Partially localized (5)

| Route | bn | ne | zh/tr/ar/ja/vi |
|---|---|---|---|
| `/apps/human-resources/projects` | ◐ 89% | ◐ 89% | ❌ |
| `/apps` | ◐ 67% | ◐ 67% | ◐ 67% |
| `/apps/sales/crm/distribution/dispatch` | ◐ 89% | ◐ 89% | ❌ |
| `/apps/sales/crm/dms/secondary-targets` | ◐ 89% | ◐ 89% | ❌ |
| `/apps/sales/crm/insights/targets` | ◐ 89% | ◐ 89% | ❌ |

## Forced English by code (bn/ne copy exists but is never shown) (25)

- `/apps/manufacturing/batches-lots`
- `/apps/manufacturing/bill-of-materials`
- `/apps/manufacturing/capacity-planning`
- `/apps/manufacturing/line-planning-board`
- `/apps/manufacturing/master-schedule-mps`
- `/apps/manufacturing/mrp-planning`
- `/apps/manufacturing/order-allocation`
- `/apps/manufacturing`
- `/apps/manufacturing/production-costing`
- `/apps/manufacturing/production-orders`
- `/apps/manufacturing/qc-templates`
- `/apps/manufacturing/quality-control`
- `/apps/manufacturing/routings`
- `/apps/manufacturing/scheduling-aps`
- `/apps/manufacturing/scrap-waste`
- `/apps/manufacturing/serial-numbers`
- `/apps/manufacturing/shop-floor`
- `/apps/manufacturing/standard-costing`
- `/apps/manufacturing/subcontracting`
- `/apps/manufacturing/work-centers`
- `/apps/quality/aql-sampling`
- `/apps/quality/capa`
- `/apps/quality/non-conformance`
- `/apps/quality/quality-dashboard`
- `/apps/quality/spc`

## English only, no translation (82)

- `/apps/accounting/chart-of-accounts`
- `/apps/Finance/Documents`
- `/apps/Finance/Spreadsheet`
- `/apps/merchandising/buyer-portal`
- `/apps/merchandising/factories`
- `/apps/merchandising/in-house-receipts`
- `/apps/merchandising/material-booking`
- `/apps/merchandising/merchandising-dashboard`
- `/apps/merchandising/production-follow-up`
- `/apps/merchandising/profitability`
- `/apps/merchandising/styles-costing`
- `/apps/merchandising/tna-calendar`
- `/apps/pos/day-summary-z`
- `/apps/pos/loyalty-vouchers`
- `/apps/pos/outlet-dashboard`
- `/apps/pos/outlet-stock`
- `/apps/pos/outlets-registers`
- `/apps/pos/receipts`
- `/apps/pos/register-till`
- `/apps/pos/shifts`
- `/apps/pos/stock-lots`
- `/apps/pos/transfers`
- `/apps/supply-chain/barcode`
- `/apps/university/class-schedule`
- `/apps/university/courses-curriculum`
- `/apps/university/faculties-programmes`
- `/apps/university/registration`
- `/apps/university/student-accounts`
- `/apps/university/terms`
- `/apps/university/university-admissions`
- `/apps/university/university-dashboard`
- `/apps/university/university-settings`
- `/apps/university/university-students`
- `/auth/signin`
- `/auth/signup`
- `/community/collaborate/become-a-partner`
- `/community/collaborate/events`
- `/community/collaborate/forum`
- `/community/collaborate/translations`
- `/community/get-services/customer-stories`
- `/community/get-services/meet-advisor`
- `/community/get-services/support`
- `/community/learn/documentation`
- `/community/learn/training`
- `/community/learn/tutorials`
- `/community`
- `/industries/accessories`
- `/industries/agro-rice`
- `/industries/buying-house`
- `/industries/college`
- `/industries/consulting/accounting-firm`
- `/industries/consulting/audit-certification`
- `/industries/consulting/marketing-agency`
- `/industries/consulting/talent-acquisition`
- `/industries/consulting/travel-agency`
- `/industries/ecommerce`
- `/industries/food&hospitality/beverage-distributor`
- `/industries/food&hospitality/fast-food`
- `/industries/food&hospitality/guest-house`
- `/industries/food&hospitality/hotel`
- `/industries/food&hospitality/restaurant`
- `/industries/garments`
- `/industries/lms`
- `/industries/manufacturing/furniture`
- `/industries/manufacturing/metal`
- `/industries/manufacturing/textile`
- `/industries/merchandising`
- `/industries/ngo`
- `/industries`
- `/industries/realestate/architecture-firm`
- `/industries/realestate/construction`
- `/industries/realestate/real-estate-agency`
- `/industries/retail/book-store`
- `/industries/retail/clothing-store`
- `/industries/retail/furniture-store`
- `/industries/retail/grocery-store`
- `/industries/retail/hardware-store`
- `/industries/retail/toy-store`
- `/industries/school`
- `/industries/steel`
- `/industries/tv`
- `/industries/university`

## Localized via database + per-locale defaults (1)

- `/pricing`

## Redirect only (not counted) (3)

- `/apps/services/project`
- `/demo`
- `/`


---

## Update: English extraction done for the English-only pages

The 80 routes that were "English only" (industries, POS, merchandising, university, community, and 4 app pages) now read their text from `messages/en.json`. The 2 auth pages are the only English-only pages left (see "Not extracted").

| Namespace in `en.json` | Messages | Pages |
|---|---:|---|
| `pages.posApp` | 564 | POS (10) |
| `pages.merchandisingApp` | 589 | Merchandising (9) |
| `pages.industriesApp` | 2,369 | Industries (36) |
| `pages.communityApp` | 423 | Community (11) |
| `pages.universityApp` | 1,014 | University (10) |
| `pages.appPages` | 276 | Chart of accounts, Finance documents/spreadsheet, barcode (4) |
| **Total** | **5,235** | **80** |

### How the code reads the text now

- JSX text and text attributes use `t("<file>.<key>")` with `useTranslations("pages.<ns>")`, or `getTranslations` in async functions.
- Data constants that hold prose (page copy, FAQs, steps, table labels) became factories, `memoT((t) => data)`, defined in `lib/i18n/t-types.ts`. Call sites read `pages(t)[slug]`. `memoT` caches per `t`, so identity checks such as `list.indexOf(item)` still work.
- Small lowercase helpers that need text take `t` as an explicit last parameter (for example `routeFor(slug, t)`). They never call a hook, because some of them run in metadata functions.
- Page metadata (`title`, `description`) comes from the same files. `chart-of-accounts` now uses `generateMetadata`.
- Group names such as "Learn" and "Get Services" are identifiers used for filtering. Only their display goes through `groupLabel(group, t)`.

### How to add a language

1. Copy the `pages.posApp`, `pages.merchandisingApp`, `pages.industriesApp`, `pages.communityApp`, `pages.universityApp` and `pages.appPages` objects from `en.json` into the locale file.
2. Translate the values only. Keep `{placeholders}` and the keys unchanged.
3. Missing keys fall back to English automatically, so partial files are safe.

### Not extracted (still hardcoded English)

- 107 validation messages and field labels in 10 pure modules: `components/industries/*/calculations.ts`, `components/merchandising/calculations.ts`, `components/pos/calculations.ts`, `components/community/redesign/logic.ts`. They are thrown as errors and shown through `e.message`, so translating them means passing `t` through every calculator.
- Community topic categories ("Finance", "Operations", "People") and page-group ids. They are used as filter ids.
- About 14 sample IDs and format values such as `DH-6070` and `2-digit`. These are data, not prose.
- `/auth/signin` and `/auth/signup`. They sit outside locale routing (`proxy.ts` excludes `/auth`), so they need a routing change first.
- `lang="en" dir="ltr"` is still set on these pages' wrappers. Remove it when you translate them, especially for Arabic (RTL).
- Sentences split around inline elements (for example "Page {x} of {y}") became separate keys. A translator may want to merge them.
- Manufacturing and quality pages were not touched. They are forced to English by their wrapper, and their copy already exists in `en.json`.

### Verification

- Every one of the 80 routes was fetched before and after the change. The `<head>` metadata (title, description, Open Graph, canonical, hreflang) and the visible body text are **identical** in English.
- All 80 routes return 200 in all 8 locales (en, bn, zh, tr, ar, ja, ne, vi), with no missing-message, format or hook errors in the dev log.
- `tsc --noEmit` reports 0 errors, and all 5,235 messages parse as valid ICU.
