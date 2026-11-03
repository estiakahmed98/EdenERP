/**
 * Adon ERP public site: /apps/human-resources/departments
 * Copy lives in messages/*.json under pages.accountingShowcase.hrDept.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Building2, Network, UserRound, Wallet } from "lucide-react";

import { Avatar, Card, Chip, HR_COMPANY, HrPage, hrMetadata } from "../_hr";

/** DUMMY data: [department, head, headcount, cost centre]. Headcounts add up to 212. */
const depts: [string, string, number, string][] = [
  ["Production", "Rafiqul Islam", 128, "CC-110"],
  ["Quality", "Nusrat Jahan", 18, "CC-120"],
  ["Supply Chain", "Tanvir Hasan", 24, "CC-130"],
  ["Finance & Accounts", "Shamima Akter", 12, "CC-210"],
  ["Sales", "Mahmud Hossain", 22, "CC-310"],
  ["HR & Admin", "Farhana Akter", 8, "CC-220"],
];
const subs = ["Moulding line", "Printing line", "Maintenance"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrDept", "/apps/human-resources/departments");
}

export default function DepartmentsPage() {
  return (
    <HrPage
      section="hrDept"
      path="/apps/human-resources/departments"
      prefix="dept"
      appName="Departments"
      tool="hrDepartments"
      group="org"
      features={[
        "Departments and sub-departments in a tree",
        "A head of department for approvals",
        "Headcount for each department",
        "A cost centre so salary lands in the right place",
        "Moves between departments kept in service records",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrDesignations", "hrGrades"] },
        { key: "after", tools: ["hrEmployees", "hrPayrollRuns", "hrApprovals"] },
        { key: "shows", tools: ["hrSalaryBudgets", "hrReports", "ledgers"] },
      ]}
      icons={[Network, UserRound, Wallet, Building2]}
      render={(ui) => (
        <>
          <div className="flex justify-center">
            <div className="rounded-xl border-2 border-primary bg-primary/5 px-4 py-2 text-center">
              <p className="text-[12px] font-semibold text-foreground">{HR_COMPANY}</p>
              <p className="text-[10px] text-muted-foreground">212 {ui.people} · 6 {ui.departments}</p>
            </div>
          </div>
          <div className="relative mx-auto h-4 w-px bg-border" aria-hidden="true" />
          <div className="relative grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <span className="absolute inset-x-[8%] -top-0 hidden h-px bg-border lg:block" aria-hidden="true" />
            {depts.map((d, i) => (
              <Card key={d[0]} className={i === 0 ? "ring-2 ring-primary/30" : ""}>
                <p className="truncate text-[11.5px] font-semibold text-foreground">{d[0]}</p>
                <p className="mt-0.5 font-mono text-[9.5px] text-muted-foreground">{d[3]}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Avatar name={d[1]} size={20} tone={i} />
                  <span className="truncate text-[10px] text-muted-foreground">{d[1]}</span>
                </div>
                <p className="mt-2 text-[15px] font-semibold tabular-nums text-foreground">
                  {d[2]} <span className="text-[10px] font-normal text-muted-foreground">{ui.people}</span>
                </p>
              </Card>
            ))}
          </div>
          <Card title={`${ui.subTitle} · Production`} right={<Chip tone="primary">{ui.newSub}</Chip>}>
            <div className="grid gap-2 sm:grid-cols-3">
              {subs.map((s, i) => (
                <div key={s} className="flex items-center justify-between rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[11px]">
                  <span className="text-foreground">{s}</span>
                  <span className="tabular-nums text-muted-foreground">{[74, 38, 16][i]}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    />
  );
}
