/**
 * Adon ERP public site: /apps/sales/crm/distribution/dispatch
 * Copy lives in messages/*.json under pages.accountingShowcase.crDispatchPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardList, Route, Truck, Weight } from "lucide-react";

import { Bar, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [vehicle, driver, route, capacity kg, orders as [order, customer, kg]]. */
const trucks: [string, string, string, number, [string, string, number][]][] = [
  ["DM-TA 14-2281", "Abdul Karim", "Tongi · Gazipur", 3000, [["SO-00421", "Ananta Apparels", 1450], ["SO-00429", "Rahman Packaging", 980]]],
  ["DM-NA 11-7730", "Jahid Hasan", "Narayanganj", 2000, [["SO-00423", "DBL Group", 1260], ["SO-00431", "Hossain Enterprise", 640]]],
  ["CTG-TA 12-0418", "Kamal Uddin", "Chattogram", 5000, [["SO-00427", "Fakir Fashion", 1900]]],
];

function load(pct: number): HrTone {
  if (pct > 95) return "red";
  if (pct > 75) return "teal";
  return "brown";
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crDispatchPage", "/apps/sales/crm/distribution/dispatch");
}

export default function DispatchPage() {
  return (
    <HrPage
      section="crDispatchPage"
      path="/apps/sales/crm/distribution/dispatch"
      prefix="dsp"
      appName="Dispatch"
      tool="crDispatch"
      group="crDistributionG"
      features={[
        "Confirmed orders grouped onto trucks by route",
        "Weight against each truck's capacity",
        "Driver and vehicle on every load",
        "Delivery challans printed for the whole load",
        "Delivered, short and returned recorded at the door",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crSalesOrders", "invWarehouses"] },
        { key: "after", tools: ["deliveryChallans", "invGatePasses"] },
        { key: "shows", tools: ["invoicesAr", "crDashboard"] },
      ]}
      icons={[ClipboardList, Truck, Weight, Route]}
      render={(ui) => (
        <div className="grid gap-3 md:grid-cols-3">
          {trucks.map(([plate, driver, route, cap, orders]) => {
            const kg = orders.reduce((a, o) => a + o[2], 0);
            const pct = Math.round((kg / cap) * 100);
            return (
              <div key={plate} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[10.5px] font-semibold text-foreground">{plate}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {driver} · {route}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 flex justify-between text-[10px]">
                  <span className="text-muted-foreground">
                    {kg.toLocaleString("en-IN")} / {cap.toLocaleString("en-IN")} kg
                  </span>
                  <Chip tone={load(pct)}>{pct}%</Chip>
                </p>
                <span className="mt-1 block">
                  <Bar pct={pct} tone={load(pct)} />
                </span>
                <ul className="mt-2.5 space-y-1">
                  {orders.map(([no, cust, w]) => (
                    <li key={no} className="flex justify-between rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[10.5px]">
                      <span className="truncate text-foreground">
                        <span className="font-mono">{no}</span> · {cust}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">{w} kg</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-2.5 block rounded-md border border-dashed border-primary/40 py-1 text-center text-[10px] text-primary">{ui.dropHere}</span>
              </div>
            );
          })}
        </div>
      )}
    />
  );
}
