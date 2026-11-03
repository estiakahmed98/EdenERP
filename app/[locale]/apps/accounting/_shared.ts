import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import { getLocaleAlternates } from "@/i18n/metadata";

/** Message namespace for the long-form accounting showcase pages. */
export const NS = "pages.accountingShowcase";

export const SITE_URL = "https://adonerp.com";

/** Accounting tool key -> route slug under /apps/accounting. */
export const toolSlugs = {
  accountingHub: "accounting-hub",
  chartOfAccounts: "chart-of-accounts",
  journalEntries: "journal-entries",
  ledgers: "ledgers",
  invoicesAr: "invoices-ar",
  billsAp: "bills-ap",
  purchaseOrders: "purchase-orders",
  customers: "customers",
  vendors: "vendors",
  bankAccounts: "bank-accounts",
  deliveryChallans: "delivery-challans",
  pettyCash: "petty-cash",
  closingFy: "closing-fy",
  financialReports: "financial-reports",
  vatRegister: "vat-register",
  receipts: "receipts",
  chequeRegister: "cheque-register",
  itemsProducts: "items-products",
  discountsCoupons: "discounts-coupons",
  loanManagement: "loan-management",
  fixedAssetRegister: "fixed-asset-register",
  exchangeRates: "exchange-rates",
  arApAging: "ar-ap-aging",
  bankReconciliation: "bank-reconciliation",
  /** Project Accounting tools. A leading slash means a full path. */
  pjOverview: "/apps/project-accounting/projects",
  pjCostCodes: "/apps/project-accounting/cost-codes",
  pjBudgets: "/apps/project-accounting/budgets",
  pjJobCost: "/apps/project-accounting/job-cost",
  pjChangeOrders: "/apps/project-accounting/change-orders",
  pjWip: "/apps/project-accounting/wip",
  pjProgressBilling: "/apps/project-accounting/progress-billing",
  pjSchedule: "/apps/project-accounting/schedule",
  pjRisks: "/apps/project-accounting/risks-issues",
  pjDocuments: "/apps/project-accounting/documents",
  pjMilestones: "/apps/project-accounting/milestones",
  pjBoq: "/apps/project-accounting/boq",
  pjBillAllocations: "/apps/project-accounting/bill-allocations",
  pjPnl: "/apps/project-accounting/p-and-l",
  /** Budget Management tools. */
  bmOverview: "/apps/Finance/budget-management",
  bmLines: "/apps/budget-management/lines",
  bmRequisitions: "/apps/budget-management/requisitions",
  bmVariance: "/apps/budget-management/variance",
  bmApprovals: "/apps/budget-management/approvals",
  bmRbrf: "/apps/budget-management/rbrf",
  /** Supply Chain tools. */
  scOverview: "/apps/supply-chain/overview",
  scRequisitions: "/apps/supply-chain/procurement/purchase-requisitions",
  scComparative: "/apps/supply-chain/procurement/comparative-statements",
  scTender: "/apps/supply-chain/tender-management",
  scGoodsReceipts: "/apps/supply-chain/goods-receipts",
  scLandedCost: "/apps/supply-chain/landed-cost",
  scProcurement: "/apps/supply-chain/procurement",
  /** Inventory and Open Platform tools. */
  invForecast: "/apps/inventory/demand-forecast",
  invWarehouses: "/apps/inventory/warehouses",
  invMovements: "/apps/inventory/stock-movements",
  invSummary: "/apps/inventory/inventory-summary",
  invGatePasses: "/apps/inventory/gate-passes",
  invWeighbridge: "/apps/inventory/weighbridge-scales",
  opTaxRates: "/apps/open-platform/tax-rates",
  opMigration: "/apps/open-platform/migration-studio",
  opExport: "/apps/open-platform/export-takeout",
  /** HR & Payroll and Employee Portal tools. */
  hrDepartments: "/apps/human-resources/departments",
  hrDesignations: "/apps/human-resources/designations",
  hrGrades: "/apps/human-resources/grades-steps",
  hrComponents: "/apps/human-resources/salary-components",
  hrStructures: "/apps/human-resources/salary-structures",
  hrEmployees: "/apps/human-resources/employees",
  hrPayrollRuns: "/apps/human-resources/payroll-runs",
  hrApprovals: "/apps/human-resources/approvals-inbox",
  hrTax: "/apps/human-resources/tax-brackets-nbr",
  hrForm108: "/apps/human-resources/form-108-annual",
  hrPolicy: "/apps/human-resources/hr-policy-pf-gratuity",
  hrShifts: "/apps/human-resources/shifts",
  hrHolidays: "/apps/human-resources/holiday-calendar",
  hrLeaveTypes: "/apps/human-resources/leave-types",
  hrLeaveApps: "/apps/human-resources/leave-applications",
  hrAttendance: "/apps/human-resources/attendance",
  hrProjects: "/apps/human-resources/projects",
  hrSettlements: "/apps/human-resources/final-settlements",
  hrServiceRecords: "/apps/human-resources/service-records",
  hrRecruitment: "/apps/human-resources/recruitment",
  hrAppraisals: "/apps/human-resources/appraisals",
  hrWppf: "/apps/human-resources/wppf-welfare",
  hrSalaryBudgets: "/apps/human-resources/salary-budgets",
  hrReports: "/apps/human-resources/hr-reports",
  epProfile: "/apps/employee-portal/my-profile",
  epPayslips: "/apps/employee-portal/my-payslips",
  epLeaves: "/apps/employee-portal/my-leaves",
  epAttendance: "/apps/employee-portal/my-attendance",
  epPf: "/apps/employee-portal/my-pf-gratuity",
} as const;

export type ToolKey = keyof typeof toolSlugs;

/** Industry groups and their items. Slugs double as message keys and URL parts. */
export const industryGroups = [
  { slug: "retail", items: ["book-store", "clothing-store", "furniture-store", "grocery-store", "hardware-store", "toy-store"] },
  { slug: "food-hospitality", items: ["bar-and-pub", "restaurant", "fast-food", "guest-house", "beverage-distributor", "hotel"] },
  { slug: "real-estate", items: ["real-estate-agency", "architecture-firm", "construction", "property-management", "gardening", "property-owner-association"] },
  { slug: "consulting", items: ["accounting-firm", "it-consultancy", "marketing-agency", "law-firm", "talent-acquisition", "audit-and-certification"] },
  { slug: "manufacturing", items: ["textile", "metal", "furnitures", "food", "brewery", "corporate-gifts"] },
  { slug: "health-fitness", items: ["sports-club", "eyewear-store", "fitness-center", "wellness-practitioners", "pharmacy", "hair-salon"] },
  { slug: "trades", items: ["handyman", "it-hardware-and-support", "solar-energy-systems", "electronic-store", "cleaning-services", "hvac-services"] },
  { slug: "others", items: ["nonprofit-organization", "environmental-agency", "billboard-rental", "photography", "bike-leasing", "software-reseller"] },
] as const;

const openGraphLocales: Record<string, string> = {
  en: "en_BD",
  bn: "bn_BD",
  zh: "zh_CN",
  tr: "tr_TR",
  ar: "ar_AR",
  ja: "ja_JP",
  ne: "ne_NP",
  vi: "vi_VN",
};

/** Metadata for one showcase page, read from `${NS}.<section>.meta`. */
export async function accountingMetadata(
  section: string,
  slug: string,
): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations(`${NS}.${section}.meta`),
    getLocale(),
  ]);
  const title = t("title");
  const description = t("description");
  const path = slug.startsWith("/") ? slug : `/apps/accounting/${slug}`;
  const alternates = getLocaleAlternates(path);

  return {
    title,
    description,
    keywords: t.raw("keywords") as string[],
    alternates,
    openGraph: {
      type: "website",
      url: `/${locale}${path}`,
      siteName: "Adon ERP",
      title,
      description,
      locale: openGraphLocales[locale] ?? "en_BD",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

/** Strings shared by every showcase page: buttons, tool names, industries. */
export function useCommon() {
  const t = useTranslations(`${NS}.common`);
  return {
    t,
    tools: t.raw("tools") as Record<ToolKey, string>,
    groups: t.raw("industryGroups") as Record<string, string>,
    items: t.raw("industryItems") as Record<string, string>,
  };
}
