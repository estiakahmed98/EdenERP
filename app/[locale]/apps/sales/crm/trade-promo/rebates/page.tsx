/**
 * Adon ERP public site: /apps/sales/crm/trade-promo/rebates
 * Copy lives in messages/*.json under pages.accountingShowcase.crRebatesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Award, Layers, Percent, TrendingUp } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** Slabs on yearly purchases, in lakh taka, and the rebate %. */
const slabs: [number, number][] = [
  [50, 1],
  [100, 2],
  [150, 3],
  [200, 4],
];
const top = 220;
/** DUMMY data: [distributor, purchases so far in lakh]. */
const dist: [string, number][] = [
  ["Rahman Packaging", 168],
  ["Hossain Enterprise", 92],
  ["Karim Traders", 61],
];

function slabFor(v: number) {
  return slabs.filter(([s]) => v >= s).pop();
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crRebatesPage", "/apps/sales/crm/trade-promo/rebates");
}

export default function RebatesPage() {
  return (
    <HrPage
      section="crRebatesPage"
      path="/apps/sales/crm/trade-promo/rebates"
      prefix="reb"
      appName="Rebates"
      tool="crRebates"
      group="crPromoG"
      features={[
        "Volume rebates on yearly purchases, in slabs",
        "Each distributor's purchases against the next slab",
        "The rebate earned so far, provided for every month",
        "Paid as a credit note at the end of the period",
        "Retrospective or step slabs, as your policy says",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crSalesOrders", "crDealers"] },
        { key: "after", tools: ["receipts", "journalEntries"] },
        { key: "shows", tools: ["crSecTargets", "financialReports"] },
      ]}
      icons={[Layers, TrendingUp, Percent, Award]}
      render={(ui) => (
        <Card title={ui.title2} right={<Chip tone="muted">{ui.period}</Chip>}>
          <div className="relative ms-[8.5rem] h-4" aria-hidden="true">
            {slabs.map(([s, r]) => (
              <span key={s} className="absolute -translate-x-1/2 text-[9.5px] font-semibold text-primary" style={{ left: `${(s / top) * 100}%` }}>
                {r}%
              </span>
            ))}
          </div>
          <ul className="space-y-3">
            {dist.map(([d, v]) => {
              const now = slabFor(v);
              const next = slabs.find(([s]) => s > v);
              return (
                <li key={d}>
                  <div className="grid grid-cols-[8rem_1fr] items-center gap-2 text-[11px]">
                    <span className="truncate font-medium text-foreground">{d}</span>
                    <span className="relative block h-4 rounded-full bg-muted" aria-hidden="true">
                      <span className="block h-4 rounded-full bg-gradient-to-r from-primary/60 to-primary" style={{ width: `${(v / top) * 100}%` }} />
                      {slabs.map(([s]) => (
                        <span key={s} className="absolute -top-0.5 h-5 w-0.5 bg-foreground/50" style={{ left: `${(s / top) * 100}%` }} />
                      ))}
                    </span>
                  </div>
                  <p className="ms-[8.5rem] mt-0.5 flex flex-wrap gap-x-3 text-[10px] text-muted-foreground">
                    <span>{v} L</span>
                    <span>
                      {ui.earned} {now ? `${now[1]}%` : "0%"}
                    </span>
                    {next && (
                      <span className="text-primary">
                        {next[0] - v} L {ui.toNext} {next[1]}%
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    />
  );
}
