/**
 * Adon ERP public site: /apps/supply-chain/landed-cost
 * Copy lives in messages/*.json under pages.accountingShowcase.scLandedCost.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Ship, Calculator, Percent, Boxes } from "lucide-react";
import { SupplyPage, supplyMetadata } from "../_supply";
import { Card, Chip, taka } from "../../budget-management/_budget";

/** DUMMY data: [cost component key, taka]. The goods value is the sum of the items below. */
const comps: [string, number][] = [
  ["cGoods", 2784000],
  ["cFreight", 200000],
  ["cInsurance", 40000],
  ["cDuty", 696000],
  ["cClearing", 60000],
  ["cPort", 30000],
];
const colors = ["var(--primary)", "#0ea5e9", "#a1a1aa", "#f59e0b", "var(--teal)", "#ec4899"];
const total = comps.reduce((a, c) => a + c[1], 0);
const extraTotal = total - comps[0][1];

/** DUMMY data: [item, quantity kg, invoice rate per kg]. */
const goods: [string, number, number][] = [
  ["PP granules", 15000, 118],
  ["White masterbatch", 2000, 210],
  ["Black masterbatch", 3000, 198],
];
const goodsValue = goods.reduce((a, g) => a + g[1] * g[2], 0);
const alloc = goods.map(([name, qty, rate]) => {
  const value = qty * rate;
  const extra = Math.round((extraTotal * value) / goodsValue);
  return { name, rate, value, extra, landedUnit: (value + extra) / qty };
});

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scLandedCost", "/apps/supply-chain/landed-cost");
}

export default function LandedCostPage() {
  return (
    <SupplyPage
      section="scLandedCost"
      path="/apps/supply-chain/landed-cost"
      prefix="lc"
      appName="Landed Cost"
      tool="scLandedCost"
      features={[
        "Freight, insurance, customs duty, clearing and port charges added to the goods value",
        "Extra cost spread over the items by value",
        "A landed unit cost for every item, beside the invoice rate",
        "A cost build-up bar for the whole shipment",
        "Stock valued at the landed cost, not just the supplier price",
      ]}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["scGoodsReceipts", "purchaseOrders", "exchangeRates"] },
        { key: "after", tools: ["itemsProducts", "billsAp", "journalEntries"] },
        { key: "shows", tools: ["scOverview", "financialReports", "ledgers"] },
      ]}
      icons={[Ship, Calculator, Percent, Boxes]}
      render={(ui) => (
        <>
          <Card title={`${ui.build} · SHP-014`} right={<span className="text-[11px] font-semibold tabular-nums text-foreground">{taka(total / 100000)}</span>}>
            <span className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
              {comps.map((c, i) => (
                <span key={c[0]} style={{ width: `${(c[1] / total) * 100}%`, background: colors[i] }} />
              ))}
            </span>
            <ul className="mt-3 grid gap-x-4 gap-y-1 text-[10.5px] sm:grid-cols-2">
              {comps.map((c, i) => (
                <li key={c[0]} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} />
                    {ui[c[0]]}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{taka(c[1] / 100000)}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={ui.allocation} right={<Chip tone="purple">{ui.byValue}</Chip>}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-[11px]">
                <thead className="text-[10px] text-muted-foreground">
                  <tr>
                    <th className="pb-1.5 text-start font-semibold">{ui.thItem}</th>
                    <th className="pb-1.5 text-end font-semibold">{ui.thInvoice}</th>
                    <th className="pb-1.5 text-end font-semibold">{ui.thExtra}</th>
                    <th className="pb-1.5 text-end font-semibold">{ui.thLanded}</th>
                    <th className="pb-1.5 text-end font-semibold">{ui.thUnit}</th>
                  </tr>
                </thead>
                <tbody>
                  {alloc.map((a) => (
                    <tr key={a.name} className="border-t border-border">
                      <td className="py-1.5 font-medium text-foreground">{a.name}</td>
                      <td className="py-1.5 text-end tabular-nums text-muted-foreground">{a.value.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums text-amber-600 dark:text-amber-400">+{a.extra.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{(a.value + a.extra).toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums font-semibold text-foreground">
                        {a.landedUnit.toFixed(1)} <span className="font-normal text-muted-foreground">/ {a.rate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    />
  );
}
