/**
 * Adon ERP public site: /apps/sales/crm/dms/sell-through
 * Copy lives in messages/*.json under pages.accountingShowcase.crSellThroughPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowDownUp, BarChart3, Layers, TrendingUp } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
/** DUMMY data in lakh taka: sell-in to distributors and sell-through to retailers. */
const sellIn = [42, 48, 51, 46, 55, 49];
const sellOut = [38, 41, 47, 45, 48, 46];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSellThroughPage", "/apps/sales/crm/dms/sell-through");
}

export default function SellThroughPage() {
  const max = Math.max(...sellIn);
  return (
    <HrPage
      section="crSellThroughPage"
      path="/apps/sales/crm/dms/sell-through"
      prefix="sthr"
      appName="Sell-Through"
      tool="crSellThrough"
      group="crDmsG"
      features={[
        "What you sold to distributors against what they sold on",
        "Sell-through rate by distributor, item and month",
        "Stock building up in the channel, seen early",
        "Primary targets set from real market demand",
        "The same figures for every level of the sales tree",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["crSalesOrders", "crSecondary"] },
        { key: "after", tools: ["crSecTargets", "crForecast"] },
        { key: "shows", tools: ["crDistStock", "crDashboard"] },
      ]}
      icons={[ArrowDownUp, BarChart3, Layers, TrendingUp]}
      render={(ui) => (
        <Card
          title={ui.chartTitle}
          right={
            <span className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-primary/35" /> {ui.sellIn}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[var(--teal)]" /> {ui.sellOut}
              </span>
            </span>
          }
        >
          <div className="flex h-40 items-end gap-4" aria-hidden="true">
            {months.map((m, i) => (
              <div key={m} className="flex h-full flex-1 items-end gap-1">
                <span className="flex-1 rounded-t bg-primary/35" style={{ height: `${(sellIn[i] / max) * 100}%` }} />
                <span className="flex-1 rounded-t bg-[var(--teal)]" style={{ height: `${(sellOut[i] / max) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-4 text-center text-[10px]">
            {months.map((m, i) => {
              const rate = Math.round((sellOut[i] / sellIn[i]) * 100);
              return (
                <span key={m} className="flex-1">
                  <span className="block text-muted-foreground">{m}</span>
                  <Chip tone={rate >= 90 ? "teal" : "brown"}>{rate}%</Chip>
                </span>
              );
            })}
          </div>
          <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.note}</p>
        </Card>
      )}
    />
  );
}
