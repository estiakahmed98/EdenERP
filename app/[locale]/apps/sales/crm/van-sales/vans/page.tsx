/**
 * Adon ERP public site: /apps/sales/crm/van-sales/vans
 * Copy lives in messages/*.json under pages.accountingShowcase.crVansPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Gauge, MapPin, Truck, UserRound } from "lucide-react";

import { Avatar, Bar, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [code, name, driver, route, status key, tone, load %, trips this month]. */
const vans: [string, string, string, string, string, HrTone, number, number][] = [
  ["VAN-01", "Uttara van", "Abdul Karim", "Uttara · Tongi", "stOnRoute", "primary", 64, 22],
  ["VAN-02", "Mirpur van", "Jahid Hasan", "Mirpur · Gabtoli", "stLoading", "brown", 90, 19],
  ["VAN-03", "Savar van", "Kamal Uddin", "Savar · Ashulia", "stSettled", "teal", 8, 21],
  ["VAN-04", "Narayanganj van", "Rokon Mia", "Fatullah · Siddhirganj", "stIdle", "muted", 0, 14],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crVansPage", "/apps/sales/crm/van-sales/vans");
}

export default function VansPage() {
  return (
    <HrPage
      section="crVansPage"
      path="/apps/sales/crm/van-sales/vans"
      prefix="van"
      appName="Vans"
      tool="crVans"
      group="crVanG"
      features={[
        "Each van as a mobile sales unit with its own stock",
        "A driver, a salesman and a fixed route for every van",
        "Loading, on route, back and settled, at a glance",
        "Load used against the van's capacity",
        "Trips and sales by van, by month",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["invWarehouses", "crOrg"] },
        { key: "after", tools: ["crTrips", "crVanStock"] },
        { key: "shows", tools: ["crVanSales", "crDashboard"] },
      ]}
      icons={[Truck, UserRound, MapPin, Gauge]}
      render={(ui) => (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {vans.map(([code, name, driver, route, st, tone, load, trips], i) => (
            <div key={code} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-12 place-items-center rounded-lg ${i === 0 ? "bg-primary text-white" : "bg-[var(--gray-bg)] text-primary"}`} aria-hidden="true">
                  <Truck className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-foreground">
                    {name} <span className="font-mono text-[10px] font-normal text-muted-foreground">{code}</span>
                  </p>
                  <p className="truncate text-[10.5px] text-muted-foreground">{route}</p>
                </div>
                <Chip tone={tone}>{ui[st]}</Chip>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 text-[10.5px]">
                <span>
                  <span className="flex justify-between text-muted-foreground">
                    <span>{ui.load}</span>
                    <span className="tabular-nums">{load}%</span>
                  </span>
                  <Bar pct={load} tone={tone} />
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Avatar name={driver} size={18} tone={i} /> {driver}
                </span>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {trips} {ui.trips}
              </p>
            </div>
          ))}
        </div>
      )}
    />
  );
}
