/**
 * FMCG, Group of Industries and Health pages. Copy lives in messages/<locale>.json
 * under `pages.sectorFmcg.<key>` / `pages.sectorGroup.<key>` / `pages.sectorHealth.<key>` (server-only namespaces,
 * see SERVER_ONLY_PAGE_NAMESPACES in app/[locale]/layout.tsx).
 */
export const sectorFamilies = {
  fmcg: {
    namespace: "sectorFmcg",
    base: "/industries/fmcg",
    menuKey: "menu.industries.fmcg",
    pages: {
      food: { key: "food", menu: "fmcgFood" },
      beverages: { key: "beverages", menu: "fmcgBeverages" },
      "personal-care": { key: "personalCare", menu: "fmcgPersonalCare" },
      "home-care": { key: "homeCare", menu: "fmcgHomeCare" },
      "health-hygiene": { key: "healthHygiene", menu: "fmcgHealthHygiene" },
      "baby-care": { key: "babyCare", menu: "fmcgBabyCare" },
      tobacco: { key: "tobacco", menu: "fmcgTobacco" },
      "pet-care": { key: "petCare", menu: "fmcgPetCare" },
    },
  },
  group: {
    namespace: "sectorGroup",
    base: "/industries/group",
    menuKey: "menu.industries.groupOfIndustries",
    pages: {
      manufacturing: { key: "manufacturing", menu: "groupManufacturing" },
      textiles: { key: "textiles", menu: "groupTextiles" },
      pharmaceuticals: { key: "pharmaceuticals", menu: "groupPharmaceuticals" },
      "heavy-industry": { key: "heavyIndustry", menu: "groupHeavyIndustry" },
      "financial-services": { key: "financialServices", menu: "groupFinancialServices" },
    },
  },
  health: {
    namespace: "sectorHealth",
    base: "/industries/health",
    menuKey: "menu.industries.health",
    pages: {
      hospital: { key: "hospital", menu: "healthHospital" },
      "medical-center": { key: "medicalCenter", menu: "healthMedicalCenter" },
      "diagnostic-center": { key: "diagnosticCenter", menu: "healthDiagnosticCenter" },
      "medical-college": { key: "medicalCollege", menu: "healthMedicalCollege" },
      pharmacy: { key: "pharmacy", menu: "healthPharmacy" },
    },
  },
} as const;

export type SectorFamily = keyof typeof sectorFamilies;
export type FmcgSlug = keyof (typeof sectorFamilies)["fmcg"]["pages"];
export type GroupSlug = keyof (typeof sectorFamilies)["group"]["pages"];
export type HealthSlug = keyof (typeof sectorFamilies)["health"]["pages"];
export type SectorSlug<F extends SectorFamily> = F extends "fmcg"
  ? FmcgSlug
  : F extends "group"
    ? GroupSlug
    : HealthSlug;

/** Existing product pages each industry page links to (4 per page, same order as `modules` copy). */
export const sectorModules: Record<string, readonly string[]> = {
  "fmcg/food": [
    "/apps/manufacturing/batches-lots",
    "/apps/inventory/warehouses",
    "/apps/sales/crm/distribution/dispatch",
    "/apps/quality/quality-dashboard",
  ],
  "fmcg/beverages": [
    "/apps/sales/crm/distribution/dealers",
    "/apps/sales/crm/distribution/field",
    "/apps/transport-pool/trips",
    "/apps/sales/crm/distribution/schemes",
  ],
  "fmcg/personal-care": [
    "/apps/manufacturing/bill-of-materials",
    "/apps/sales/crm/distribution/pricing",
    "/apps/sales/crm/distribution/schemes",
    "/apps/inventory/inventory-summary",
  ],
  "fmcg/home-care": [
    "/apps/manufacturing/bill-of-materials",
    "/apps/manufacturing/production-costing",
    "/apps/manufacturing/scrap-waste",
    "/apps/supply-chain/procurement",
  ],
  "fmcg/health-hygiene": [
    "/apps/manufacturing/batches-lots",
    "/apps/manufacturing/qc-templates",
    "/apps/quality/capa",
    "/apps/sales/crm/orders/returns",
  ],
  "fmcg/baby-care": [
    "/apps/manufacturing/batches-lots",
    "/apps/quality/aql-sampling",
    "/apps/inventory/warehouses",
    "/apps/sales/crm/orders/customer-360",
  ],
  "fmcg/tobacco": [
    "/apps/accounting/vat-register",
    "/apps/inventory/gate-passes",
    "/apps/sales/crm/distribution/dealers",
    "/apps/accounting/financial-reports",
  ],
  "fmcg/pet-care": [
    "/apps/sales/crm/orders/sales-orders",
    "/apps/inventory/demand-forecast",
    "/apps/sales/crm/distribution/dealers",
    "/apps/pos/register-till",
  ],
  "group/manufacturing": [
    "/apps/analytics/executive-dashboard",
    "/apps/manufacturing/capacity-planning",
    "/apps/manufacturing/standard-costing",
    "/apps/engineering-maintenance/downtime",
  ],
  "group/textiles": [
    "/apps/merchandising/merchandising-dashboard",
    "/apps/manufacturing/order-allocation",
    "/apps/trade-finance/letters-of-credit",
    "/apps/trade-finance/export-shipments",
  ],
  "group/pharmaceuticals": [
    "/apps/manufacturing/batches-lots",
    "/apps/manufacturing/qc-templates",
    "/apps/quality/non-conformance",
    "/apps/inventory/warehouses",
  ],
  "group/heavy-industry": [
    "/apps/engineering-maintenance/equipment",
    "/apps/engineering-maintenance/pm-schedules",
    "/apps/engineering-maintenance/spare-parts",
    "/apps/inventory/weighbridge-scales",
  ],
  "group/financial-services": [
    "/apps/accounting/financial-reports",
    "/apps/accounting/bank-reconciliation",
    "/apps/accounting/loan-management",
    "/apps/budget-management/variance",
  ],
  "health/hospital": [
    "/apps/hospital/opd-serials",
    "/apps/hospital/admissions",
    "/apps/hospital/wards-beds",
    "/apps/hospital/billing",
  ],
  "health/medical-center": [
    "/apps/hospital/doctors-sittings",
    "/apps/hospital/opd-serials",
    "/apps/hospital/consultations",
    "/apps/hospital/day-close",
  ],
  "health/diagnostic-center": [
    "/apps/hospital/laboratory",
    "/apps/hospital/imaging",
    "/apps/hospital/billing",
    "/apps/hospital/doctors-money",
  ],
  "health/medical-college": [
    "/apps/medical-college/intake-admission",
    "/apps/medical-college/professional-exams",
    "/apps/medical-college/ward-placement",
    "/apps/medical-college/interns",
  ],
  "health/pharmacy": [
    "/apps/hospital/pharmacy",
    "/apps/pos/register-till",
    "/apps/inventory/inventory-summary",
    "/apps/supply-chain/procurement",
  ],
};

/** Shape of one page's copy in the messages file. */
export type SectorContent = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; highlight: string; lead: string };
  stats: { value: string; label: string }[];
  visual: Record<string, string>;
  pillars: { title: string; body: string }[];
  flow: { title: string; body: string }[];
  sample: { title: string; caption: string; columns: string[]; rows: string[][] };
  modules: string[];
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
};
