/**
 * Adon ERP public site: /apps/analytics/hr-payroll
 * Copy lives in messages/*.json under pages.accountingShowcase.anHrPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Briefcase, HandCoins, Landmark, Users } from "lucide-react";

import { Card, Chip, HrPage, Stat, bdt, hrMetadata } from "../../human-resources/_hr";

const tabs = ["tProject", "tSalary", "tPf", "tGratuity", "tLeave", "tHeadcount"];
/** DUMMY data: [band of service years, employees, gratuity liability in taka]. */
const bands: [string, number, number][] = [
  ["< 1", 9, 0],
  ["1–3", 14, 0],
  ["3–5", 12, 1640000],
  ["5–8", 8, 2910000],
  ["8+", 5, 3420000],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("anHrPage", "/apps/analytics/hr-payroll");
}

export default function AnalyticsHrPage() {
  const total = bands.reduce((a, b) => a + b[2], 0);
  const max = Math.max(...bands.map((b) => b[2]));
  return (
    <HrPage
      section="anHrPage"
      path="/apps/analytics/hr-payroll"
      prefix="anhr"
      appName="HR & Payroll"
      tool="anHr"
      group="an"
      features={[
        "Project cost, salary register and PF statement",
        "Gratuity and leave liability worked out for every employee",
        "Headcount by department, grade and location",
        "Liabilities as at any date, for the accounts and the auditor",
        "Each report to CSV, Excel or print",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrPayrollRuns", "hrPolicy", "hrServiceRecords"] },
        { key: "after", tools: ["anExport", "journalEntries"] },
        { key: "shows", tools: ["anExec", "hrReports"] },
      ]}
      icons={[Users, Landmark, HandCoins, Briefcase]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap gap-1">
            {tabs.map((t, i) => (
              <span key={t} className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${i === 3 ? "border-primary bg-primary text-white" : "border-border bg-card text-foreground"}`}>
                {ui[t]}
              </span>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Stat label={ui.liability} value={bdt(total)} sub={ui.asOf} tone="brown" />
            <Stat label={ui.employees} value="48" sub={ui.eligible} tone="primary" />
            <Stat label={ui.accrual} value={bdt(98500)} sub={ui.accrualSub} tone="teal" />
          </div>
          <Card title={ui.byService}>
            <ul className="space-y-2">
              {bands.map(([band, n, amt]) => (
                <li key={band} className="grid grid-cols-[4rem_3.5rem_1fr_7.5rem] items-center gap-3 text-[11px]">
                  <span className="text-foreground">
                    {band} {ui.yrs}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{n}</span>
                  <span className="block h-3 rounded bg-muted" aria-hidden="true">
                    <span className="block h-3 rounded bg-[var(--chart-4)]" style={{ width: `${max ? (amt / max) * 100 : 0}%` }} />
                  </span>
                  <span className="text-end tabular-nums text-foreground">{amt ? amt.toLocaleString("en-IN") : <Chip tone="muted">{ui.notYet}</Chip>}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.note}</p>
          </Card>
        </>
      )}
    />
  );
}
