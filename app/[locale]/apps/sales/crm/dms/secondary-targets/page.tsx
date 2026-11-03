/**
 * Adon ERP public site: /apps/sales/crm/dms/secondary-targets
 * Copy lives in messages/*.json under pages.accountingShowcase.crSecTargetsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Crosshair, Gauge, Medal, Store } from "lucide-react";

import { HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [distributor, target in lakh, achieved in lakh]. Two-thirds of the month has gone. */
const rows: [string, number, number][] = [
  ["Rahman Packaging", 14, 11.2],
  ["Hossain Enterprise", 10, 5.1],
  ["Karim Traders", 8, 6.4],
  ["Mollah Paper & Poly", 5, 3.9],
];

function Gauge180({ pct }: { pct: number }) {
  const color = pct >= 75 ? "var(--teal)" : pct >= 55 ? "var(--chart-4)" : "var(--destructive)";
  return (
    <div className="relative mx-auto h-[52px] w-[104px] overflow-hidden" aria-hidden="true">
      <div className="h-[104px] w-[104px] rounded-full" style={{ background: `conic-gradient(from -90deg, ${color} ${pct / 2}%, var(--muted) 0 50%, transparent 0)` }} />
      <div className="absolute inset-x-[12px] top-[12px] h-[80px] rounded-full bg-card" />
      <span className="absolute inset-x-0 bottom-0 text-center text-[13px] font-semibold tabular-nums text-foreground">{pct}%</span>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSecTargetsPage", "/apps/sales/crm/dms/secondary-targets");
}

export default function SecondaryTargetsPage() {
  return (
    <HrPage
      section="crSecTargetsPage"
      path="/apps/sales/crm/dms/secondary-targets"
      prefix="stgt"
      appName="Secondary Targets"
      tool="crSecTargets"
      group="crDmsG"
      features={[
        "Monthly targets for what each distributor sells to retailers",
        "Achievement from posted secondary sales, day by day",
        "Targets by item group as well as by value",
        "Where each distributor should be by today",
        "Incentives tied to reaching the target",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crDealers", "crSellThrough"] },
        { key: "after", tools: ["crRebates", "crPromotions"] },
        { key: "shows", tools: ["crTargets", "crDashboard"] },
      ]}
      icons={[Crosshair, Gauge, Store, Medal]}
      render={(ui) => (
        <>
          <p className="text-[10.5px] text-muted-foreground">{ui.period}</p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map(([d, target, done]) => {
              const pct = Math.round((done / target) * 100);
              return (
                <div key={d} className="rounded-xl border border-border bg-card p-3 text-center">
                  <p className="truncate text-[11.5px] font-semibold text-foreground">{d}</p>
                  <div className="mt-2">
                    <Gauge180 pct={pct} />
                  </div>
                  <p className="mt-2 text-[10.5px] tabular-nums text-muted-foreground">
                    {done} L / {target} L
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {ui.byToday} {(target * 0.67).toFixed(1)} L
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    />
  );
}
