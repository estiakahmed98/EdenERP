/**
 * Adon ERP public site: /apps/inventory/warehouses
 * Copy lives in messages/*.json under pages.accountingShowcase.invWarehouses.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Warehouse, MapPin, Boxes, ArrowRightLeft } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Bullet, taka } from "../../budget-management/_budget";


/** DUMMY data: [name, location, capacity used %, item count, stock value in lakh taka]. Values add up to 352.4. */
const houses: [string, string, number, number, number][] = [
  ["Gazipur Main", "Gazipur", 78, 18, 240],
  ["Narayanganj Depot", "Narayanganj", 54, 9, 70],
  ["Chattogram Port Store", "Chattogram", 31, 6, 42.4],
];
const zones = ["zoneA", "zoneB", "zoneC", "zoneD"];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invWarehouses", "/apps/inventory/warehouses");
}

export default function WarehousesPage() {
  return (
    <ModulePage
      section="invWarehouses"
      path="/apps/inventory/warehouses"
      prefix="wh"
      appName="Warehouses"
      tool="invWarehouses"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "Several warehouses, each with a location and a capacity",
        "Zones and bins inside a warehouse",
        "Stock value and item count for each warehouse",
        "Bin occupancy shown as a heat grid",
        "Transfers between warehouses recorded as stock movements",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "scGoodsReceipts"] },
        { key: "after", tools: ["invMovements", "invGatePasses"] },
        { key: "shows", tools: ["invSummary", "financialReports", "scOverview"] },
      ]}
      icons={[Warehouse, MapPin, Boxes, ArrowRightLeft]}
      render={(ui) => (
        <>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {houses.map((h) => (
              <Card key={h[0]}>
                <p className="text-[12px] font-semibold text-foreground">{h[0]}</p>
                <p className="text-[10px] text-muted-foreground">{h[1]}</p>
                <p className="mt-3 flex items-baseline justify-between text-[10.5px]">
                  <span className="text-muted-foreground">{ui.capacity}</span>
                  <span className="font-semibold tabular-nums text-foreground">{h[2]}%</span>
                </p>
                <span className="mt-1 block"><Bullet pct={h[2]} marker={100} /></span>
                <p className="mt-3 flex justify-between text-[10.5px] text-muted-foreground">
                  <span>{h[3]} {ui.skus}</span>
                  <span className="tabular-nums text-foreground">{taka(h[4])}</span>
                </p>
              </Card>
            ))}
          </div>
          <Card
            title={ui.bins}
            right={<span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">{ui.empty}<span className="inline-block h-2 w-10 rounded bg-gradient-to-r from-primary/10 to-primary" />{ui.full}</span>}
          >
            <div className="space-y-1.5">
              {zones.map((z, zi) => (
                <div key={z} className="flex items-center gap-2">
                  <span className="w-28 shrink-0 truncate text-[10px] text-muted-foreground">{ui[z]}</span>
                  <div className="grid flex-1 grid-cols-10 gap-1">
                    {Array.from({ length: 10 }, (_, i) => {
                      const level = (zi * 29 + i * 37 + 13) % 101;
                      return <span key={i} className="h-4 rounded-sm bg-primary" style={{ opacity: 0.1 + level / 115 }} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    />
  );
}
