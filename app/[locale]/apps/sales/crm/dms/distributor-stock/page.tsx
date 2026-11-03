/**
 * Adon ERP public site: /apps/sales/crm/dms/distributor-stock
 * Copy lives in messages/*.json under pages.accountingShowcase.crDistStockPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { AlertTriangle, Boxes, CalendarRange, Warehouse } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const items = ["Carton 3-ply", "Carton 5-ply", "Poly bag", "Zipper bag", "Back board"];
/** DUMMY data: [distributor, days of cover for each item]. */
const cover: [string, number[]][] = [
  ["Rahman Packaging", [18, 6, 24, 41, 12]],
  ["Hossain Enterprise", [9, 3, 15, 22, 30]],
  ["Karim Traders", [27, 14, 4, 11, 19]],
  ["Mollah Paper & Poly", [35, 21, 28, 60, 8]],
];

function tone(days: number) {
  if (days < 7) return "bg-destructive text-white";
  if (days < 14) return "bg-[var(--chart-4)] text-white";
  if (days > 45) return "bg-[var(--chart-5)] text-white";
  return "bg-[var(--teal)]/20 text-foreground";
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crDistStockPage", "/apps/sales/crm/dms/distributor-stock");
}

export default function DistributorStockPage() {
  return (
    <HrPage
      section="crDistStockPage"
      path="/apps/sales/crm/dms/distributor-stock"
      prefix="dst"
      appName="Distributor Stock"
      tool="crDistStock"
      group="crDmsG"
      features={[
        "Each distributor's stock, built from primary and secondary sales",
        "Days of cover for every item at every distributor",
        "Stock-outs and overstock shown before they happen",
        "Physical counts entered to correct the book stock",
        "Suggested orders from cover and the sales rate",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crSalesOrders", "crSecondary"] },
        { key: "after", tools: ["crDispatch", "crMarketReturns"] },
        { key: "shows", tools: ["crSellThrough", "crDashboard"] },
      ]}
      icons={[Warehouse, CalendarRange, AlertTriangle, Boxes]}
      render={(ui) => (
        <Card title={ui.gridTitle} right={<Chip tone="red">{ui.stockOuts}</Chip>}>
          <div className="overflow-x-auto">
            <div className="grid min-w-[30rem] grid-cols-[8rem_repeat(5,1fr)] gap-1 text-[10.5px]">
              <span />
              {items.map((i) => (
                <span key={i} className="text-center text-[9.5px] font-semibold text-muted-foreground">
                  {i}
                </span>
              ))}
              {cover.map(([d, days]) => (
                <div key={d} className="contents">
                  <span className="self-center truncate text-foreground">{d}</span>
                  {days.map((n, i) => (
                    <span key={i} className={`grid h-8 place-items-center rounded font-semibold tabular-nums ${tone(n)}`}>
                      {n} {ui.d}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
            <span>{ui.lRed}</span>
            <span>{ui.lBrown}</span>
            <span>{ui.lGreen}</span>
            <span>{ui.lBlue}</span>
          </p>
        </Card>
      )}
    />
  );
}
