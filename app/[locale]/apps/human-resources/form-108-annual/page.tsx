/**
 * Adon ERP public site: /apps/human-resources/form-108-annual
 * Copy lives in messages/*.json under pages.accountingShowcase.hrF108.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarRange, FileDown, FileText, ListChecks } from "lucide-react";

import { Bar, Card, Chip, HR_COMPANY, HrPage, bdt, hrMetadata } from "../_hr";

/** DUMMY data: [employee, TIN (masked), salary paid, tax deducted]. */
const rows: [string, string, number, number][] = [
  ["Shamima Akter", "•••• 4471", 1176000, 64200],
  ["Tanvir Hasan", "•••• 0932", 984000, 41100],
  ["Nusrat Jahan", "•••• 7215", 912000, 33900],
  ["Arif Chowdhury", "•••• 3368", 1680000, 152000],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrF108", "/apps/human-resources/form-108-annual");
}

export default function Form108Page() {
  return (
    <HrPage
      section="hrF108"
      path="/apps/human-resources/form-108-annual"
      prefix="f108"
      appName="Form 108 (Annual)"
      tool="hrForm108"
      group="statutory"
      features={[
        "The annual return of salaried employees prepared from payroll",
        "Salary paid and tax deducted for each employee for the income year",
        "Employees without a TIN flagged before filing",
        "Totals that agree with the twelve payroll runs",
        "Export for filing and a copy kept on the record",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["hrPayrollRuns", "hrTax"] },
        { key: "after", tools: ["financialReports"] },
        { key: "shows", tools: ["epPayslips", "hrReports"] },
      ]}
      icons={[CalendarRange, ListChecks, FileText, FileDown]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="rounded-xl border border-border bg-card p-4 lg:col-span-8">
            <div className="flex items-start justify-between border-b-2 border-foreground/80 pb-2">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wide text-foreground">{ui.formName}</p>
                <p className="text-[10px] text-muted-foreground">{ui.formSub}</p>
              </div>
              <div className="text-end text-[10px] text-muted-foreground">
                <p className="font-semibold text-foreground">{HR_COMPANY}</p>
                <p>{ui.year}</p>
              </div>
            </div>
            <table className="mt-2 w-full text-[10.5px]">
              <thead className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-1 text-start">#</th>
                  <th className="py-1 text-start">{ui.thName}</th>
                  <th className="py-1 text-start">{ui.thTin}</th>
                  <th className="py-1 text-end">{ui.thSalary}</th>
                  <th className="py-1 text-end">{ui.thTax}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r[0]} className="border-b border-dashed border-border">
                    <td className="py-1.5 text-muted-foreground">{i + 1}</td>
                    <td className="py-1.5 text-foreground">{r[0]}</td>
                    <td className="py-1.5 font-mono text-muted-foreground">{r[1]}</td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">{r[2].toLocaleString("en-IN")}</td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">{r[3].toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td colSpan={3} className="py-1.5 text-foreground">{ui.total}</td>
                  <td className="py-1.5 text-end tabular-nums text-foreground">{bdt(80412000)}</td>
                  <td className="py-1.5 text-end tabular-nums text-foreground">{bdt(2361800)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3 lg:col-span-4">
            <Card title={ui.readiness}>
              <p className="flex justify-between text-[10.5px]">
                <span className="text-muted-foreground">{ui.withTin}</span>
                <span className="font-semibold tabular-nums text-foreground">203 / 212</span>
              </p>
              <span className="mt-1.5 block">
                <Bar pct={96} tone="teal" />
              </span>
              <p className="mt-3 flex items-center justify-between text-[10.5px]">
                <span className="text-muted-foreground">{ui.runsMatched}</span>
                <Chip tone="teal">12 / 12</Chip>
              </p>
              <p className="mt-2 flex items-center justify-between text-[10.5px]">
                <span className="text-muted-foreground">{ui.missingTin}</span>
                <Chip tone="red">9</Chip>
              </p>
            </Card>
            <span className="btn-gradient block rounded-lg px-3 py-2 text-center text-[11.5px] font-medium">{ui.generate}</span>
          </div>
        </div>
      )}
    />
  );
}
