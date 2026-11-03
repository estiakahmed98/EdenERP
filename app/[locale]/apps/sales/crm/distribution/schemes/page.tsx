/**
 * Adon ERP public site: /apps/sales/crm/distribution/schemes
 * Copy lives in messages/*.json under pages.accountingShowcase.crSchemesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarDays, Gift, Percent, Ticket } from "lucide-react";

import { Bar, Chip, HrPage, hrColors, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [name, kind key, rule, valid, used %, status key, tone]. */
const schemes: [string, string, string, string, number, string, HrTone][] = [
  ["Winter carton push", "kFree", "Buy 100 cartons, get 5 free", "1 Nov – 31 Dec", 38, "stActive", "teal"],
  ["Poly bag slab", "kSlab", "3% off above 50,000 pcs", "1 Oct – 31 Mar", 61, "stActive", "teal"],
  ["New dealer welcome", "kFlat", "BDT 2,000 off the first order", "All year", 24, "stActive", "teal"],
  ["Eid display bonus", "kDisplay", "BDT 500 per shelf display", "15 Feb – 15 Mar", 0, "stUpcoming", "brown"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSchemesPage", "/apps/sales/crm/distribution/schemes");
}

export default function SchemesPage() {
  return (
    <HrPage
      section="crSchemesPage"
      path="/apps/sales/crm/distribution/schemes"
      prefix="sch"
      appName="Schemes"
      tool="crSchemes"
      group="crDistributionG"
      features={[
        "Free goods, slab discounts, flat discounts and display bonuses",
        "A start and end date, and the channels each scheme is for",
        "Applied on the order without a calculator",
        "A budget, and how much of it has been used",
        "The cost of each scheme, by dealer and by month",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crPricing", "crDealers"] },
        { key: "after", tools: ["crSalesOrders", "crClaims"] },
        { key: "shows", tools: ["crPromotions", "crDashboard"] },
      ]}
      icons={[Gift, Percent, CalendarDays, Ticket]}
      render={(ui) => (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {schemes.map(([name, kind, rule, valid, used, st, tone], i) => (
            <div key={name} className="relative overflow-hidden rounded-xl border border-border bg-card p-3.5">
              <span className="absolute -end-6 -top-6 h-16 w-16 rounded-full opacity-15" style={{ background: hrColors[i] }} aria-hidden="true" />
              <div className="flex items-center justify-between gap-2">
                <Chip tone="navy">{ui[kind]}</Chip>
                <Chip tone={tone}>{ui[st]}</Chip>
              </div>
              <p className="mt-2 text-[12.5px] font-semibold text-foreground">{name}</p>
              <p className="text-[11px] text-foreground">{rule}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{valid}</p>
              <p className="mt-2.5 flex justify-between text-[10px] text-muted-foreground">
                <span>{ui.budgetUsed}</span>
                <span className="tabular-nums text-foreground">{used}%</span>
              </p>
              <Bar pct={used} tone="primary" />
            </div>
          ))}
        </div>
      )}
    />
  );
}
