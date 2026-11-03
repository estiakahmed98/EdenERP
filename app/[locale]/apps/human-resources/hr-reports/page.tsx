/**
 * Adon ERP public site: /apps/human-resources/hr-reports
 * Copy lives in messages/*.json under pages.accountingShowcase.hrReportsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BarChart3, Download, Filter, LineChart } from "lucide-react";

import { Card, Chip, HrPage, Ring, hrMetadata } from "../_hr";

/** DUMMY data: monthly series for the mini charts, May to October. */
const headcount = [201, 203, 207, 208, 210, 212];
const cost = [64.1, 64.9, 66.9, 67.1, 68.0, 68.4];
const absence = [3.1, 2.8, 4.2, 3.6, 2.9, 2.4];
const reports = ["rMuster", "rBank", "rPf", "rTax", "rLeave", "rTurnover"];

function Columns({ values, tone }: { values: number[]; tone: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.9;
  return (
    <span className="flex h-14 items-end gap-1" aria-hidden="true">
      {values.map((v, i) => (
        <span key={i} className={`w-full rounded-t ${tone}`} style={{ height: `${((v - min) / (max - min)) * 85 + 15}%`, opacity: i === values.length - 1 ? 1 : 0.35 }} />
      ))}
    </span>
  );
}

function Line({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${40 - (v / max) * 34}`).join(" ");
  return (
    <svg viewBox="0 0 100 42" className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" stroke="var(--chart-5)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrReportsPage", "/apps/human-resources/hr-reports");
}

export default function HrReportsPage() {
  return (
    <HrPage
      section="hrReportsPage"
      path="/apps/human-resources/hr-reports"
      prefix="hrrep"
      appName="HR Reports"
      tool="hrReports"
      group="pay"
      features={[
        "Headcount, payroll cost, absence and turnover on one page",
        "Muster roll, bank advice, PF and tax reports ready to print",
        "Filters by department, grade, location and month",
        "Every figure opens the employees behind it",
        "Export to Excel or PDF",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrPayrollRuns", "hrAttendance", "hrLeaveApps"] },
        { key: "after", tools: ["hrSalaryBudgets", "hrForm108"] },
        { key: "shows", tools: ["financialReports", "bmVariance"] },
      ]}
      icons={[BarChart3, Filter, LineChart, Download]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap gap-1.5 text-[10.5px]">
            {[ui.fAll, ui.fMonth, ui.fLocation].map((f, i) => (
              <span key={f} className={`rounded-md border px-2 py-0.5 ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                {f} ▾
              </span>
            ))}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <Card title={ui.headcount}>
              <p className="text-[17px] font-semibold tabular-nums text-foreground">212</p>
              <Columns values={headcount} tone="bg-primary" />
            </Card>
            <Card title={ui.cost}>
              <p className="text-[17px] font-semibold tabular-nums text-foreground">68.4L</p>
              <Columns values={cost} tone="bg-[var(--teal)]" />
            </Card>
            <Card title={ui.absence}>
              <p className="text-[17px] font-semibold tabular-nums text-foreground">2.4%</p>
              <Line values={absence} />
            </Card>
            <Card title={ui.gender}>
              <div className="flex justify-center">
                <Ring values={[142, 70]} centre="33%" caption={ui.women} size={74} />
              </div>
            </Card>
          </div>
          <Card title={ui.library}>
            <ul className="grid gap-1.5 sm:grid-cols-3">
              {reports.map((r) => (
                <li key={r} className="flex items-center justify-between rounded-lg bg-[var(--gray-bg)] px-3 py-1.5 text-[11px] text-foreground">
                  {ui[r]}
                  <Chip tone="muted">PDF · XLS</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    />
  );
}
