/**
 * Adon ERP public site: /apps/analytics/executive-dashboard
 * Copy lives in messages/*.json under pages.accountingShowcase.anExecPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Building2, Factory, Gauge, Landmark } from "lucide-react";

import { Card, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [label key, value, sub, colour class]. */
const kpis: [string, string, string, string][] = [
  ["kRevenue", "4.82 Cr", "kRevenueSub", "text-[var(--teal)]"],
  ["kNet", "61.4 L", "kNetSub", "text-[var(--teal)]"],
  ["kCash", "6.37 Cr", "kCashSub", "text-primary"],
  ["kInventory", "4.29 Cr", "kInventorySub", "text-foreground"],
  ["kAr", "2.10 Cr", "kArSub", "text-[var(--chart-4)]"],
  ["kAp", "21.0 L", "kApSub", "text-destructive"],
  ["kPipeline", "1.29 Cr", "kPipelineSub", "text-[var(--chart-5)]"],
  ["kHeadcount", "212", "kHeadcountSub", "text-foreground"],
];
/** Position in crore: assets, liabilities, equity. */
const position: [string, number, string][] = [
  ["pAssets", 15.4, "var(--primary)"],
  ["pLiabilities", 5.1, "var(--destructive)"],
  ["pEquity", 10.3, "var(--teal)"],
];
/** Line utilisation by week, %. */
const lines: [string, number][] = [
  ["W45", 86],
  ["W46", 91],
  ["W47", 78],
  ["W48", 64],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("anExecPage", "/apps/analytics/executive-dashboard");
}

export default function ExecutiveDashboardPage() {
  return (
    <HrPage
      section="anExecPage"
      path="/apps/analytics/executive-dashboard"
      prefix="exec"
      appName="Executive Dashboard"
      tool="anExec"
      group="an"
      features={[
        "Revenue, net income, cash, inventory, receivables and payables in one row",
        "Sales pipeline, headcount and active projects beside the money",
        "Production planning: on-time, behind plan and line utilisation",
        "Profit and loss and the financial position as charts",
        "Any period, exported to Excel or printed for the board",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["financialReports", "crDashboard"] },
        { key: "after", tools: ["anFinancial", "anExport"] },
        { key: "shows", tools: ["anHub", "bmVariance"] },
      ]}
      icons={[Gauge, Landmark, Factory, Building2]}
      render={(ui) => (
        <>
          <p className="text-[10.5px] text-muted-foreground">
            {ui.period} <span className="font-semibold text-foreground">{ui.mtd}</span> · 1 Nov – 3 Nov 2026
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpis.map(([k, v, sub, c]) => (
              <div key={k} className="rounded-xl border border-border bg-[var(--gray-bg)] px-3 py-2.5">
                <p className="text-[10px] font-medium text-muted-foreground">{ui[k]}</p>
                <p className={`text-[16px] font-semibold tabular-nums ${c}`}>{v}</p>
                <p className="text-[9.5px] text-muted-foreground">{ui[sub]}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.position}>
              <div className="flex h-28 items-end gap-6 px-4" aria-hidden="true">
                {position.map(([k, v, color]) => (
                  <div key={k} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] tabular-nums text-muted-foreground">{v} Cr</span>
                    <span className="w-full rounded-t" style={{ height: `${(v / 16) * 88}px`, background: color }} />
                  </div>
                ))}
              </div>
              <div className="mt-1 flex gap-6 px-4 text-center text-[10px] text-muted-foreground">
                {position.map(([k]) => (
                  <span key={k} className="flex-1">
                    {ui[k]}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="lg:col-span-5" title={ui.utilisation}>
              <ul className="space-y-2">
                {lines.map(([w, pct]) => (
                  <li key={w} className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 text-[10.5px]">
                    <span className="text-muted-foreground">{w}</span>
                    <span className="block h-2 rounded-full bg-muted" aria-hidden="true">
                      <span className={`block h-2 rounded-full ${pct < 70 ? "bg-[var(--chart-4)]" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-end tabular-nums text-foreground">{pct}%</span>
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
