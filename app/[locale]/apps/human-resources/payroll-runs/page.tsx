/**
 * Adon ERP public site: /apps/human-resources/payroll-runs
 * Copy lives in messages/*.json under pages.accountingShowcase.hrRuns.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Banknote, CalendarCheck, Check, CheckCheck, Cog } from "lucide-react";

import { Chip, HrPage, Stat, Table, bdt, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [month, employees, gross, deductions, status key]. Net is gross minus deductions. */
const runs: [string, number, number, number, string][] = [
  ["October 2026", 212, 6842000, 512400, "stComputed"],
  ["September 2026", 210, 6795500, 508900, "stPaid"],
  ["August 2026", 208, 6711200, 501300, "stPaid"],
  ["July 2026", 207, 6688000, 498700, "stPaid"],
];
const statusTone: Record<string, HrTone> = { stComputed: "brown", stPaid: "teal" };
const pipeline = ["stDraft", "stComputed", "stApproved", "stPaid"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrRuns", "/apps/human-resources/payroll-runs");
}

export default function PayrollRunsPage() {
  return (
    <HrPage
      section="hrRuns"
      path="/apps/human-resources/payroll-runs"
      prefix="runs"
      appName="Payroll Runs"
      tool="hrPayrollRuns"
      group="pay"
      features={[
        "One payroll run for each month",
        "Attendance, leave and overtime pulled in before computing",
        "Gross, deductions and net for every employee",
        "Approval before anything is paid",
        "A bank advice file and a journal entry when it is paid",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["hrAttendance", "hrLeaveApps", "hrStructures"] },
        { key: "after", tools: ["hrApprovals", "bankAccounts", "journalEntries"] },
        { key: "shows", tools: ["epPayslips", "hrReports", "hrForm108"] },
      ]}
      icons={[CalendarCheck, Cog, CheckCheck, Banknote]}
      render={(ui) => (
        <>
          <ol className="grid grid-cols-4 gap-1 text-[10.5px]" aria-hidden="true">
            {pipeline.map((s, i) => (
              <li
                key={s}
                className={`flex items-center justify-center gap-1.5 py-1.5 ${i === 0 ? "rounded-s-full" : ""} ${i === 3 ? "rounded-e-full" : ""} ${
                  i <= 1 ? "bg-primary font-semibold text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < 1 && <Check className="h-3 w-3" />}
                {ui[s]}
              </li>
            ))}
          </ol>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.employees} value="212" sub={ui.october} />
            <Stat label={ui.gross} value={bdt(6842000)} tone="primary" />
            <Stat label={ui.deductions} value={bdt(512400)} tone="red" />
            <Stat label={ui.net} value={bdt(6842000 - 512400)} tone="teal" />
          </div>
          <div className="rounded-xl border border-border bg-card p-3.5">
            <Table
              cols={[
                { head: ui.thMonth },
                { head: ui.thPeople, end: true },
                { head: ui.thGross, end: true },
                { head: ui.thDed, end: true },
                { head: ui.thNet, end: true },
                { head: ui.thStatus, end: true },
              ]}
              rows={runs.map((r) => [
                <span key="m" className="font-medium">{r[0]}</span>,
                r[1],
                bdt(r[2]),
                <span key="d" className="text-destructive">{bdt(r[3])}</span>,
                <span key="n" className="font-semibold">{bdt(r[2] - r[3])}</span>,
                <Chip key="s" tone={statusTone[r[4]]}>{ui[r[4]]}</Chip>,
              ])}
            />
          </div>
        </>
      )}
    />
  );
}
