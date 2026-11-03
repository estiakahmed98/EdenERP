/**
 * Adon ERP public site: /apps/sales/crm/van-sales/trips
 * Copy lives in messages/*.json under pages.accountingShowcase.crTripsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Clock, MapPinned, Route, Wallet } from "lucide-react";

import { Card, Chip, HrPage, Stat, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [time, stop, sale in taka, collected in taka]. Sales 38,950; collected 31,400. */
const stops: [string, string, number, number][] = [
  ["08:10", "Load-out at Gazipur Main", 0, 0],
  ["09:05", "Uttara Sector 7 Poly House", 8400, 8400],
  ["10:20", "Abdullahpur Box Store", 12650, 6000],
  ["11:45", "Tongi Station Road Traders", 6200, 6200],
  ["13:30", "Cherag Ali Market shop 4", 11700, 10800],
  ["15:00", "Back at depot · settlement", 0, 0],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crTripsPage", "/apps/sales/crm/van-sales/trips");
}

export default function TripsPage() {
  const sales = stops.reduce((a, s) => a + s[2], 0);
  const cash = stops.reduce((a, s) => a + s[3], 0);
  return (
    <HrPage
      section="crTripsPage"
      path="/apps/sales/crm/van-sales/trips"
      prefix="trip"
      appName="Trips"
      tool="crTrips"
      group="crVanG"
      features={[
        "A trip from load-out to settlement, stop by stop",
        "Sales and cash collected at every stop",
        "Credit given on the road kept against each outlet",
        "Time at each stop, for route planning",
        "A trip closed only when stock and cash are settled",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crVans", "crVanStock"] },
        { key: "after", tools: ["crVanSales", "receipts"] },
        { key: "shows", tools: ["crCollections", "crDashboard"] },
      ]}
      icons={[Route, MapPinned, Clock, Wallet]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={`TRP-2026-0412 · ${ui.vanName}`} right={<Chip tone="primary">{ui.onRoute}</Chip>}>
            <ol className="relative ms-2 border-s-2 border-primary/30">
              {stops.map(([t, stop, sale, got], i) => {
                const edge = i === 0 || i === stops.length - 1;
                return (
                  <li key={t} className="relative flex items-center gap-3 pb-2.5 ps-4 last:pb-0 text-[11px]">
                    <span className={`absolute -start-[7px] top-1 h-3 w-3 rounded-full ring-2 ring-card ${edge ? "bg-[var(--secondary)]" : "bg-primary"}`} aria-hidden="true" />
                    <span className="w-10 shrink-0 text-[10px] tabular-nums text-muted-foreground">{t}</span>
                    <span className={`min-w-0 flex-1 truncate ${edge ? "font-medium" : ""} text-foreground`}>{stop}</span>
                    {sale > 0 && (
                      <span className="shrink-0 text-end tabular-nums">
                        <span className="text-foreground">{sale.toLocaleString("en-IN")}</span>
                        {got < sale && <span className="ms-1 text-[10px] text-[var(--chart-4)]">({ui.credit} {(sale - got).toLocaleString("en-IN")})</span>}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Card>
          <div className="grid content-start gap-2 lg:col-span-5">
            <Stat label={ui.sales} value={`BDT ${sales.toLocaleString("en-IN")}`} tone="primary" />
            <Stat label={ui.cash} value={`BDT ${cash.toLocaleString("en-IN")}`} tone="teal" />
            <Stat label={ui.creditGiven} value={`BDT ${(sales - cash).toLocaleString("en-IN")}`} tone="brown" />
            <Stat label={ui.stops} value="4 / 4" sub={ui.stopsSub} tone="navy" />
          </div>
        </div>
      )}
    />
  );
}
