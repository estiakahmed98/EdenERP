/**
 * Adon ERP public site: /apps/human-resources/salary-structures
 * Copy lives in messages/*.json under pages.accountingShowcase.hrStruct.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Blocks, Copy, PieChart, UserCheck } from "lucide-react";

import { Avatar, Card, Chip, HrPage, bdt, hrColors, hrMetadata } from "../_hr";

/** DUMMY data: [component, share of gross %]. Shares add up to 100; gross is BDT 50,250. */
const parts: [string, number][] = [
  ["Basic", 60],
  ["House rent", 30],
  ["Medical", 6],
  ["Conveyance", 4],
];
const gross = 50250;
const structures: [string, number, boolean][] = [
  ["Worker", 141, false],
  ["Officer", 52, true],
  ["Manager", 17, false],
  ["Expatriate", 2, false],
];
const people = ["Shamima Akter", "Tanvir Hasan", "Nusrat Jahan", "Arif Chowdhury"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrStruct", "/apps/human-resources/salary-structures");
}

export default function SalaryStructuresPage() {
  return (
    <HrPage
      section="hrStruct"
      path="/apps/human-resources/salary-structures"
      prefix="struct"
      appName="Salary Structures"
      tool="hrStructures"
      group="pay"
      features={[
        "A structure built from salary components",
        "Each part as a share of gross or of basic",
        "One structure assigned to many employees",
        "Gross broken down the same way on every payslip",
        "A copy of a structure to start a new one",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrComponents", "hrGrades"] },
        { key: "after", tools: ["hrEmployees", "hrPayrollRuns"] },
        { key: "shows", tools: ["epPayslips", "hrSalaryBudgets"] },
      ]}
      icons={[Blocks, PieChart, UserCheck, Copy]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-4" title={ui.listTitle}>
            <ul className="space-y-1.5">
              {structures.map((s) => (
                <li
                  key={s[0]}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-[11.5px] ${s[2] ? "bg-primary text-white" : "bg-[var(--gray-bg)] text-foreground"}`}
                >
                  <span className="font-medium">{s[0]}</span>
                  <span className={`tabular-nums ${s[2] ? "text-white/80" : "text-muted-foreground"}`}>
                    {s[1]} {ui.people}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-8" title={`${ui.structure}: Officer`} right={<Chip tone="primary">{ui.example} {bdt(gross)}</Chip>}>
            <div className="flex h-8 overflow-hidden rounded-lg" aria-hidden="true">
              {parts.map((p, i) => (
                <span key={p[0]} className="flex items-center justify-center text-[10px] font-semibold text-white" style={{ width: `${p[1]}%`, background: hrColors[i] }}>
                  {p[1]}%
                </span>
              ))}
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-4">
              {parts.map((p, i) => (
                <li key={p[0]} className="rounded-lg border border-border px-2.5 py-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-sm" style={{ background: hrColors[i] }} aria-hidden="true" />
                    {p[0]}
                  </span>
                  <span className="mt-0.5 block text-[12px] font-semibold tabular-nums text-foreground">{bdt((gross * p[1]) / 100)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-2.5">
              <span className="text-[10.5px] text-muted-foreground">{ui.assigned}</span>
              <span className="flex -space-x-1.5">
                {people.map((n, i) => (
                  <span key={n} className="rounded-full ring-2 ring-card">
                    <Avatar name={n} size={22} tone={i} />
                  </span>
                ))}
              </span>
              <span className="text-[10.5px] text-muted-foreground">+48</span>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
