/**
 * Adon ERP public site: /apps/real-estate/sales-dashboard
 * Copy lives in messages/*.json under pages.accountingShowcase.reDashboardPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Gauge, Layers, TrendingUp, Wallet } from "lucide-react";

import { Bar, Card, Legend, Ring, Stat, HrPage, bdt, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [project, units sold, target]. */
const projects: [string, number, number][] = [
  ["Riverside Heights", 18, 24],
  ["Green Valley Residences", 12, 20],
  ["Lakeview Tower", 7, 16],
  ["Skyline Plaza", 5, 8],
];
/** Available, booked, sold, handed over. */
const stock = [64, 38, 112, 46];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reDashboardPage", "/apps/real-estate/sales-dashboard");
}

export default function RealEstateSalesDashboardPage() {
  return (
    <HrPage
      section="reDashboardPage"
      path="/apps/real-estate/sales-dashboard"
      prefix="rsd"
      appName="Sales Dashboard"
      tool="reDashboard"
      group="re"
      features={[
        "Units sold and booking value across every project",
        "Collections against instalments due, month by month",
        "Overdue buyers listed, so the right person makes the call",
        "Stock by status: available, booked, sold, handed over",
        "Broker sales included from the day of booking",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings", "reCollections"] },
        { key: "after", tools: ["reUnits", "reProperties"] },
        { key: "shows", tools: ["reRevRec", "financialReports"] },
      ]}
      icons={[Gauge, TrendingUp, Wallet, Layers]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.kSold} value="42" sub={ui.kSoldSub} tone="primary" />
            <Stat label={ui.kBooking} value={bdt(386400000)} sub={ui.kBookingSub} tone="teal" />
            <Stat label={ui.kCollected} value={bdt(61250000)} sub={ui.kCollectedSub} tone="navy" />
            <Stat label={ui.kOverdue} value={bdt(8420000)} sub={ui.kOverdueSub} tone="red" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.projectsTitle}>
              <ul className="space-y-2.5">
                {projects.map(([name, sold, target]) => (
                  <li key={name} className="grid grid-cols-[9.5rem_1fr_3.5rem] items-center gap-3 text-[11px]">
                    <span className="truncate text-foreground">{name}</span>
                    <Bar pct={(sold / target) * 100} tone={sold / target < 0.5 ? "brown" : "primary"} />
                    <span className="text-end tabular-nums text-muted-foreground">
                      {sold}/{target}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lg:col-span-5" title={ui.stockTitle}>
              <div className="flex items-center gap-4">
                <Ring values={stock} centre="260" caption={ui.centreCaption} />
                <Legend items={[ui.sAvailable, ui.sBooked, ui.sSold, ui.sHanded]} />
              </div>
            </Card>
          </div>
        </>
      )}
    />
  );
}
