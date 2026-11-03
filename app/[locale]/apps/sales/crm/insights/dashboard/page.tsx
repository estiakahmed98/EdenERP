/**
 * Adon ERP public site: /apps/sales/crm/insights/dashboard
 * Copy lives in messages/*.json under pages.accountingShowcase.crDashboardPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Activity, BarChart3, Gauge, LayoutDashboard } from "lucide-react";

import { Card, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const tiles: [string, string, string][] = [
  ["kPipeline", "1.29 Cr", "text-primary"],
  ["kWeighted", "44.2 L", "text-[var(--chart-4)]"],
  ["kWon", "77.9 L", "text-[var(--teal)]"],
  ["kTarget", "83%", "text-foreground"],
  ["kReturns", "3 · 1.2 L", "text-destructive"],
  ["kCommission", "1.9 L", "text-foreground"],
  ["kCredit", "64.1 L", "text-foreground"],
];
/** Won value by week, in lakh, last 8 weeks. */
const weeks = [6.1, 8.4, 5.2, 9.8, 11.3, 7.6, 12.4, 10.9];
const regions: [string, number][] = [
  ["Dhaka North", 92],
  ["Dhaka South", 78],
  ["Chattogram", 64],
  ["Gazipur", 101],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crDashboardPage", "/apps/sales/crm/insights/dashboard");
}

export default function DashboardPage() {
  const max = Math.max(...weeks);
  return (
    <HrPage
      section="crDashboardPage"
      path="/apps/sales/crm/insights/dashboard"
      prefix="dash"
      appName="Dashboard"
      tool="crDashboard"
      group="crInsightsG"
      features={[
        "Open pipeline, weighted forecast and won value at a glance",
        "Target achievement for the period",
        "Approved returns, commission outstanding and credit exposure",
        "Won value week by week",
        "Achievement by region, with each figure opening its records",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crPipeline", "crTargets"] },
        { key: "after", tools: ["crForecast", "crScorecard"] },
        { key: "shows", tools: ["financialReports", "crAskAi"] },
      ]}
      icons={[LayoutDashboard, Gauge, BarChart3, Activity]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {tiles.map(([k, v, c]) => (
              <div key={k} className="rounded-xl border border-border bg-card px-3 py-2.5">
                <p className={`text-[15px] font-semibold tabular-nums ${c}`}>{v}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{ui[k]}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.weekly}>
              <div className="flex h-28 items-end gap-2" aria-hidden="true">
                {weeks.map((v, i) => (
                  <span key={i} className={`flex-1 rounded-t ${i === weeks.length - 1 ? "bg-primary" : "bg-primary/40"}`} style={{ height: `${(v / max) * 100}%` }} />
                ))}
              </div>
            </Card>
            <Card className="lg:col-span-5" title={ui.byRegion}>
              <ul className="space-y-2">
                {regions.map(([r, pct]) => (
                  <li key={r} className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-2 text-[11px]">
                    <span className="text-foreground">{r}</span>
                    <span className="relative block h-2.5 rounded-full bg-muted" aria-hidden="true">
                      <span className={`block h-2.5 rounded-full ${pct >= 100 ? "bg-[var(--teal)]" : pct >= 75 ? "bg-primary" : "bg-[var(--chart-4)]"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </span>
                    <span className="text-end tabular-nums text-muted-foreground">{pct}%</span>
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
