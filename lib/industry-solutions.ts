import { productInventory } from "./product-inventory";

const order = [
  "garmentsTextile",
  "fmcg",
  "groupOfIndustries",
  "manufacturing",
  "retail",
  "foodHospitality",
  "education",
  "realEstate",
  "health",
  "consulting",
  "others",
];
const paths: Record<string, string[]> = {
  garmentsTextile: [
    "/apps/merchandising/styles-costing",
    "/apps/merchandising/material-booking",
    "/apps/merchandising/production-follow-up",
  ],
  fmcg: [
    "/apps/sales/crm/distribution/dealers",
    "/apps/inventory/demand-forecast",
    "/apps/manufacturing/batches-lots",
  ],
  groupOfIndustries: [
    "/apps/analytics/executive-dashboard",
    "/apps/accounting/financial-reports",
    "/apps/budget-management/variance",
  ],
  manufacturing: [
    "/apps/inventory/stock-movements",
    "/apps/manufacturing/production-orders",
    "/apps/quality/quality-dashboard",
  ],
  retail: [
    "/apps/pos/register-till",
    "/apps/pos/outlet-stock",
    "/apps/pos/outlet-dashboard",
  ],
  foodHospitality: [
    "/apps/inventory/stock-movements",
    "/apps/pos/register-till",
    "/apps/accounting/invoices-ar",
  ],
  education: [
    "/apps/education/admissions",
    "/apps/education/students",
    "/apps/education/fees",
  ],
  realEstate: [
    "/apps/real-estate/properties",
    "/apps/accounting/invoices-ar",
    "/apps/accounting/financial-reports",
  ],
  health: [
    "/apps/hospital/opd-serials",
    "/apps/hospital/laboratory",
    "/apps/hospital/billing",
  ],
  consulting: [
    "/apps/accounting/customers-ar",
    "/apps/accounting/invoices-ar",
    "/apps/accounting/financial-reports",
  ],
  others: [
    "/apps/inventory/stock-movements",
    "/apps/accounting/invoices-ar",
    "/apps/accounting/financial-reports",
  ],
};
const appLinks = productInventory.modules.flatMap((module) => module.links);

export const industrySolutions = [...productInventory.sectors]
  .sort(
    (a, b) =>
      order.indexOf(a.titleKey.split(".").at(-1)!) -
      order.indexOf(b.titleKey.split(".").at(-1)!),
  )
  .map((sector) => {
    const id = sector.titleKey.split(".").at(-1)!;
    return {
      ...sector,
      id,
      // Only menu-backed product pages are offered as connected workflows.
      workflow: (paths[id] ?? []).flatMap((href) => {
        const link = appLinks.find((item) => item.href === href);
        return link ? [link] : [];
      }),
    };
  });
