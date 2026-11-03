/**
 * Adon ERP public site: /apps/inventory/inventory-summary
 * Copy lives in messages/*.json under pages.accountingShowcase.invSummary.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Boxes, PieChart, RotateCw, Coins } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Tile, Spark, Donut, Bullet, taka, donutColors } from "../../budget-management/_budget";


/** DUMMY data: stock value by month in lakh taka, ending at the current value. */
const trend = [281, 296, 301, 315, 322, 340, 352];
/** DUMMY data: [category key, share %]. */
const cats: [string, number][] = [
  ["catRaw", 58],
  ["catFinished", 24],
  ["catConsumable", 12],
  ["catOther", 6],
];
/** DUMMY data: [item, quantity, unit, landed cost per unit]. */
const items: [string, number, string, number][] = [
  ["PP granules", 38850, "kg", 161.5],
  ["Kraft paper roll", 92000, "kg", 95],
  ["Duplex board", 41000, "kg", 88],
  ["Black masterbatch", 5150, "kg", 215],
  ["Flexo ink cyan", 310, "kg", 620],
];
const top = items
  .map(([name, qty, unit, cost]) => ({ name, qty, unit, cost, value: Math.round(qty * cost) }))
  .sort((a, b) => b.value - a.value);

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invSummary", "/apps/inventory/inventory-summary");
}

export default function InventorySummaryPage() {
  return (
    <ModulePage
      section="invSummary"
      path="/apps/inventory/inventory-summary"
      prefix="is"
      appName="Inventory Summary"
      tool="invSummary"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "Total stock value and item count across all warehouses",
        "Stock value split by category",
        "Top items by value, with quantity and average cost",
        "Inventory turnover and dead stock",
        "Stock valued at landed cost",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["scGoodsReceipts", "scLandedCost", "invMovements"] },
        { key: "after", tools: ["invForecast", "scRequisitions"] },
        { key: "shows", tools: ["financialReports", "ledgers", "accountingHub"] },
      ]}
      icons={[Boxes, PieChart, RotateCw, Coins]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <Tile label={ui.value} value="BDT 3,52,40,000" sub={ui.valueSub}>
              <Spark values={trend} />
            </Tile>
            <Tile label={ui.skus} value="27" accent="sky" sub={ui.skusSub} />
            <Tile label={ui.turnover} value="5.8×" accent="teal" sub={ui.turnoverSub} />
            <Tile label={ui.dead} value="BDT 4,10,000" accent="amber" sub={ui.deadSub} />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card title={ui.byCategory} className="lg:col-span-4">
              <Donut values={cats.map((c) => c[1] as number)} centre="3.5 Cr" caption={ui.inStock} />
              <ul className="mt-3 space-y-1 text-[10.5px]">
                {cats.map((c, i) => (
                  <li key={c[0]} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ background: donutColors[i] }} />
                      {ui[c[0]]}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{c[1]}%</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title={ui.top} className="lg:col-span-8">
              <ul className="space-y-2.5">
                {top.map((t) => (
                  <li key={t.name} className="grid grid-cols-[8rem_1fr_6.5rem] items-center gap-x-3 text-[11px]">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{t.name}</span>
                      <span className="block text-[10px] tabular-nums text-muted-foreground">{t.qty.toLocaleString("en-IN")} {t.unit} @ {t.cost}</span>
                    </span>
                    <Bullet pct={(t.value / top[0].value) * 100} marker={100} />
                    <span className="text-end tabular-nums text-foreground">{t.value.toLocaleString("en-IN")}</span>
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
