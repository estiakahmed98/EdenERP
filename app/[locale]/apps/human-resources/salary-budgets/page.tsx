/**
 * Adon ERP public site: /apps/human-resources/salary-budgets
 * Copy lives in messages/*.json under pages.accountingShowcase.hrBudget.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Gauge, Target, TrendingUp, UserPlus } from "lucide-react";

import { Card, Chip, HrPage, bdt, hrMetadata } from "../_hr";

/** DUMMY data: [department, annual budget in lakh, spent to date in lakh, planned heads, actual heads]. */
const rows: [string, number, number, number, number][] = [
  ["Production", 540, 412, 132, 128],
  ["Sales", 160, 96, 22, 22],
  ["Supply Chain", 120, 84, 26, 24],
  ["Quality", 96, 58, 18, 18],
  ["Finance & Accounts", 88, 50, 12, 12],
  ["HR & Admin", 52, 30, 8, 8],
];
/** Seven of twelve months have gone by. */
const elapsed = 58;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrBudget", "/apps/human-resources/salary-budgets");
}

export default function SalaryBudgetsPage() {
  return (
    <HrPage
      section="hrBudget"
      path="/apps/human-resources/salary-budgets"
      prefix="sbud"
      appName="Salary Budgets"
      tool="hrSalaryBudgets"
      group="pay"
      features={[
        "A salary budget for each department for the year",
        "Planned headcount against people on the payroll",
        "Spending to date from the payroll runs",
        "A marker for where spending should be by now",
        "Increments and new posts tested against the budget",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["hrDepartments", "hrGrades", "bmLines"] },
        { key: "after", tools: ["hrPayrollRuns", "hrRecruitment"] },
        { key: "shows", tools: ["bmVariance", "hrReports"] },
      ]}
      icons={[Target, Gauge, UserPlus, TrendingUp]}
      render={(ui) => (
        <Card title={ui.tableTitle} right={<Chip tone="muted">{ui.elapsed}</Chip>}>
          <ul className="space-y-2.5">
            {rows.map(([dept, budget, spent, plan, actual]) => {
              const pct = Math.round((spent / budget) * 100);
              const over = pct > elapsed + 12;
              return (
                <li key={dept} className="grid grid-cols-[8.5rem_1fr_6.5rem_4rem] items-center gap-3 text-[11px]">
                  <span className="truncate font-medium text-foreground">{dept}</span>
                  <span className="relative block h-2.5 rounded-full bg-muted" aria-hidden="true">
                    <span className={`block h-2.5 rounded-full ${over ? "bg-destructive" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                    <span className="absolute -top-1 h-[18px] w-0.5 rounded bg-foreground/70" style={{ left: `${elapsed}%` }} />
                  </span>
                  <span className="text-end tabular-nums text-muted-foreground">
                    {bdt(spent * 100000).replace("BDT ", "")} <span className="text-foreground">{pct}%</span>
                  </span>
                  <span className="text-end">
                    <Chip tone={actual < plan ? "brown" : "teal"}>
                      {actual}/{plan}
                    </Chip>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-2 text-[10px] text-muted-foreground">
            <span>{ui.legendBar}</span>
            <span>{ui.legendMarker}</span>
            <span>{ui.legendHeads}</span>
          </p>
        </Card>
      )}
    />
  );
}
