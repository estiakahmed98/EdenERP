/**
 * Adon ERP public site: /apps/sales/crm/distribution/pricing
 * Copy lives in messages/*.json under pages.accountingShowcase.crPricingPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarRange, Layers3, Tags, TrendingDown } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const tiers = ["tMrp", "tDealer", "tDistributor", "tKey"];
/** DUMMY data: [item, unit, MRP in taka]. Tiers take 0%, 12%, 18% and 22% off MRP. */
const items: [string, string, number][] = [
  ["Carton box 3-ply 18×12×10", "pc", 34],
  ["Carton box 5-ply 24×16×14", "pc", 82],
  ["Poly bag PE 26×44", "pc", 9.5],
  ["Zipper poly bag 10×12", "pc", 5],
  ["Shirt back board", "pc", 2.4],
];
const off = [0, 12, 18, 22];
const slabs: [string, string][] = [
  ["10,000+", "−2%"],
  ["50,000+", "−3.5%"],
  ["1,00,000+", "−5%"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crPricingPage", "/apps/sales/crm/distribution/pricing");
}

export default function PricingPage() {
  return (
    <HrPage
      section="crPricingPage"
      path="/apps/sales/crm/distribution/pricing"
      prefix="price"
      appName="Pricing"
      tool="crPricing"
      group="crDistributionG"
      features={[
        "Price lists by channel: MRP, dealer, distributor and key account",
        "Volume slabs that lower the price as quantity grows",
        "A start and end date on every price list",
        "Customer-specific prices that override the list",
        "The right price filled in on quotes and orders",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "crDealers"] },
        { key: "after", tools: ["crQuotes", "crSalesOrders", "crSchemes"] },
        { key: "shows", tools: ["crDashboard", "financialReports"] },
      ]}
      icons={[Tags, Layers3, TrendingDown, CalendarRange]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.listTitle} right={<Chip tone="muted">{ui.validity}</Chip>}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-[11px]">
                <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="pb-1.5 text-start">{ui.thItem}</th>
                    {tiers.map((t, i) => (
                      <th key={t} className={`pb-1.5 text-end ${i === 2 ? "text-primary" : ""}`}>
                        {ui[t]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(([name, , mrp]) => (
                    <tr key={name} className="border-b border-border/60">
                      <td className="py-1.5 text-foreground">{name}</td>
                      {off.map((o, i) => (
                        <td key={i} className={`py-1.5 text-end tabular-nums ${i === 2 ? "bg-primary/5 font-semibold text-primary" : "text-foreground"}`}>
                          {(mrp * (1 - o / 100)).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="lg:col-span-4" title={ui.slabTitle}>
            <ul className="space-y-1.5">
              {slabs.map(([q, d], i) => (
                <li key={q} className="flex items-center justify-between rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[11px]">
                  <span className="text-foreground">
                    {q} {ui.pcs}
                  </span>
                  <span className="font-semibold text-[var(--teal)]" style={{ opacity: 0.6 + i * 0.2 }}>
                    {d}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[10px] text-muted-foreground">{ui.slabNote}</p>
          </Card>
        </div>
      )}
    />
  );
}
