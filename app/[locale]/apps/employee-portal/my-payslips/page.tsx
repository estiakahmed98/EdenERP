/**
 * Adon ERP public site: /apps/employee-portal/my-payslips
 * Copy lives in messages/*.json under pages.accountingShowcase.epPayslipsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Download, FileText, History, ShieldCheck } from "lucide-react";

import { HR_COMPANY, HrPage, bdt, hrMetadata } from "../../human-resources/_hr";

const months = ["October 2026", "September 2026", "August 2026", "July 2026", "June 2026"];
/** DUMMY data in taka. Earnings 41,000, deductions 3,050, net 37,950. */
const earnings: [string, number][] = [
  ["Basic salary", 24600],
  ["House rent", 12300],
  ["Medical", 2460],
  ["Conveyance", 1640],
];
const deductions: [string, number][] = [
  ["Provident fund", 2460],
  ["Income tax (TDS)", 590],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("epPayslipsPage", "/apps/employee-portal/my-payslips");
}

export default function MyPayslipsPage() {
  const e = earnings.reduce((a, l) => a + l[1], 0);
  const d = deductions.reduce((a, l) => a + l[1], 0);

  return (
    <HrPage
      section="epPayslipsPage"
      path="/apps/employee-portal/my-payslips"
      prefix="slip"
      appName="My Payslips"
      tool="epPayslips"
      group="portal"
      features={[
        "Every payslip since joining, month by month",
        "Earnings and deductions line by line",
        "A PDF to download or share with a bank",
        "Available the day the payroll is approved",
        "Only the employee and HR can see it",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrPayrollRuns", "hrStructures"] },
        { key: "after", tools: ["epPf"] },
        { key: "shows", tools: ["hrTax", "hrForm108"] },
      ]}
      icons={[FileText, History, Download, ShieldCheck]}
      render={(ui) => (
        <div className="grid gap-3 sm:grid-cols-[11rem_1fr]">
          <ul className="space-y-1">
            {months.map((m, i) => (
              <li
                key={m}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-[11px] ${i === 0 ? "bg-primary font-semibold text-white" : "border border-border bg-card text-foreground"}`}
              >
                {m}
                {i === 0 && <span className="rounded bg-white/20 px-1 text-[9px]">{ui.latest}</span>}
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-[12.5px] font-semibold text-foreground">{ui.slipTitle}</p>
                <p className="text-[10px] text-muted-foreground">{HR_COMPANY} · Farhana Akter · EMP-0089</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10.5px] font-medium text-foreground"><Download className="h-3 w-3" aria-hidden="true" /> PDF</span>
            </div>
            <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
              <dl className="space-y-1 text-[11px]">
                <p className="pb-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.earnings}</p>
                {earnings.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="tabular-nums text-foreground">{v.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-1 font-semibold">
                  <dt className="text-foreground">{ui.gross}</dt>
                  <dd className="tabular-nums text-foreground">{e.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
              <dl className="space-y-1 text-[11px]">
                <p className="pb-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.deductions}</p>
                {deductions.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="tabular-nums text-destructive">{v.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-1 font-semibold">
                  <dt className="text-foreground">{ui.totalDed}</dt>
                  <dd className="tabular-nums text-destructive">{d.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
            </div>
            <div className="flex items-center justify-between rounded-b-xl bg-[var(--teal)] px-4 py-2.5 text-white">
              <span className="text-[11.5px]">{ui.netPay}</span>
              <span className="text-[16px] font-semibold tabular-nums">{bdt(e - d)}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
}
