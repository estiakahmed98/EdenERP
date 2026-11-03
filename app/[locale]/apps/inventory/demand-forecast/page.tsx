/**
 * Adon ERP public site: /apps/inventory/demand-forecast
 * Copy lives in messages/*.json under pages.accountingShowcase.invForecast.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { TrendingUp, CalendarClock, ShoppingCart, Gauge } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Tile, Bullet, Chip, taka } from "../../budget-management/_budget";


/** DUMMY data: monthly use of PP granules in tonnes, with the last three months forecast. */
const series: [string, number, boolean][] = [
  ["Jun", 38, false],
  ["Jul", 41, false],
  ["Aug", 44, false],
  ["Sep", 43, false],
  ["Oct", 47, false],
  ["Nov", 48, false],
  ["Dec", 51, true],
  ["Jan", 53, true],
  ["Feb", 50, true],
];
const maxV = 53;
/** DUMMY data: [item, on hand, forecast need for 30 days, rate per unit]. */
const stock: [string, number, number, number][] = [
  ["PP granules", 24000, 49000, 118],
  ["White masterbatch", 2100, 1800, 210],
  ["Black masterbatch", 1200, 2400, 198],
  ["Carton box 5-ply", 8200, 9000, 54],
  ["Flexo ink cyan", 310, 260, 620],
];
const rows = stock.map(([name, onHand, need, rate]) => {
  const cover = Math.round((onHand / need) * 30);
  const key = cover < 20 ? "orderNow" : cover < 30 ? "soon" : "ok";
  const tone = (cover < 20 ? "red" : cover < 30 ? "amber" : "teal") as "red" | "amber" | "teal";
  return { name, cover, key, tone, short: Math.max(need - onHand, 0), rate };
});
const atRisk = rows.filter((r) => r.cover < 20);
const suggested = atRisk.reduce((a, r) => a + r.short * r.rate, 0);

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invForecast", "/apps/inventory/demand-forecast");
}

export default function DemandForecastPage() {
  return (
    <ModulePage
      section="invForecast"
      path="/apps/inventory/demand-forecast"
      prefix="df"
      appName="Demand Forecast"
      tool="invForecast"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "A monthly demand forecast built from past issues, for each item",
        "Forecast accuracy against what was actually used",
        "Days of cover for every item at the forecast rate",
        "Items to reorder now, and an estimated order value",
        "A forecast horizon of ninety days",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "invMovements"] },
        { key: "after", tools: ["scRequisitions", "purchaseOrders"] },
        { key: "shows", tools: ["invSummary", "scOverview", "financialReports"] },
      ]}
      icons={[TrendingUp, CalendarClock, ShoppingCart, Gauge]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <Tile label={ui.accuracy} value="91%" accent="teal" sub={ui.accuracySub}>
              <Bullet pct={91} marker={100} />
            </Tile>
            <Tile label={ui.atRisk} value={String(atRisk.length)} accent="amber" sub={ui.atRiskSub} />
            <Tile label={ui.horizon} value={ui.horizonValue} accent="sky" sub={ui.horizonSub} />
            <Tile label={ui.suggested} value={taka(suggested / 100000)} sub={ui.suggestedSub} />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card
              title={ui.chart}
              className="lg:col-span-7"
              right={
                <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-sm bg-primary" /> {ui.actual}
                  <span className="inline-block h-2 w-2 rounded-sm border border-dashed border-primary bg-primary/20" /> {ui.forecast}
                </span>
              }
            >
              <div className="flex h-32 items-end gap-2">
                {series.map(([m, v, f]) => (
                  <div key={m} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[9.5px] tabular-nums text-muted-foreground">{v}</span>
                    <span
                      className={`w-full rounded-t-md ${f ? "border border-dashed border-primary bg-primary/20" : "bg-primary"}`}
                      style={{ height: Math.round((v / maxV) * 84) }}
                    />
                    <span className="text-[9.5px] text-muted-foreground">{m}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">{ui.chartNote}</p>
            </Card>
            <Card title={ui.cover} className="lg:col-span-5">
              <ul className="space-y-2.5">
                {rows.map((r) => (
                  <li key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 text-[11px]">
                    <span className="min-w-0">
                      <span className="flex items-center justify-between">
                        <span className="truncate font-medium text-foreground">{r.name}</span>
                        <span className="tabular-nums text-muted-foreground">{r.cover} {ui.days}</span>
                      </span>
                      <span className="mt-1 block">
                        <Bullet pct={Math.min((r.cover / 45) * 100, 100)} marker={67} />
                      </span>
                    </span>
                    <Chip tone={r.tone}>{ui[r.key]}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    />
  );
}
