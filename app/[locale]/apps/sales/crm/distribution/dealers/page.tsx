/**
 * Adon ERP public site: /apps/sales/crm/distribution/dealers
 * Copy lives in messages/*.json under pages.accountingShowcase.crDealersPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Award, MapPinned, Store, Wallet } from "lucide-react";

import { Bar, Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [region, dealers]. */
const regions: [string, number][] = [
  ["Dhaka", 42],
  ["Chattogram", 18],
  ["Gazipur", 15],
  ["Narayanganj", 12],
  ["Khulna", 7],
  ["Rajshahi", 6],
];
/** DUMMY data: [dealer, area, tier, sales this year in lakh, credit used %]. */
const dealers: [string, string, string, number, number][] = [
  ["Rahman Packaging House", "Tongi", "Gold", 86, 62],
  ["Karim Traders", "Agrabad", "Silver", 41, 88],
  ["Hossain Enterprise", "Fatullah", "Gold", 72, 35],
  ["Mollah Paper & Poly", "Khulna", "Bronze", 18, 12],
];
const tierTone: Record<string, HrTone> = { Gold: "brown", Silver: "muted", Bronze: "sky" };

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crDealersPage", "/apps/sales/crm/distribution/dealers");
}

export default function DealersPage() {
  const max = Math.max(...regions.map((r) => r[1]));
  return (
    <HrPage
      section="crDealersPage"
      path="/apps/sales/crm/distribution/dealers"
      prefix="dlr"
      appName="Dealers"
      tool="crDealers"
      group="crDistributionG"
      features={[
        "Dealers and distributors by region and area",
        "A tier for each dealer, from sales and payment history",
        "Credit limit and how much of it is used",
        "Price list and schemes the dealer is entitled to",
        "Sales this year against last, dealer by dealer",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["customers", "crOrg"] },
        { key: "after", tools: ["crPricing", "crSchemes", "crSecondary"] },
        { key: "shows", tools: ["crCredit", "crDashboard"] },
      ]}
      icons={[Store, MapPinned, Award, Wallet]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-4" title={ui.byRegion} right={<Chip tone="primary">100</Chip>}>
            <ul className="space-y-1.5">
              {regions.map(([r, n]) => (
                <li key={r} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-2 text-[11px]">
                  <span className="text-foreground">{r}</span>
                  <span className="h-3 rounded bg-primary/80" style={{ width: `${(n / max) * 100}%` }} aria-hidden="true" />
                  <span className="text-end tabular-nums text-muted-foreground">{n}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-8" title={ui.listTitle}>
            <ul className="divide-y divide-border">
              {dealers.map(([name, area, tier, sales, credit]) => (
                <li key={name} className="grid items-center gap-3 py-2 text-[11px] sm:grid-cols-[1fr_4rem_5rem_7rem]">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{name}</span>
                    <span className="block text-[10px] text-muted-foreground">{area}</span>
                  </span>
                  <Chip tone={tierTone[tier]}>{tier}</Chip>
                  <span className="text-end tabular-nums text-foreground">{sales} L</span>
                  <span>
                    <span className="flex justify-between text-[9.5px] text-muted-foreground">
                      <span>{ui.credit}</span>
                      <span>{credit}%</span>
                    </span>
                    <Bar pct={credit} tone={credit > 80 ? "red" : "teal"} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
