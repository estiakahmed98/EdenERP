/**
 * Adon ERP public site: /apps/human-resources/grades-steps
 * Copy lives in messages/*.json under pages.accountingShowcase.hrGradesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Grid3x3, Scale, TrendingUp } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../_hr";

/** DUMMY data: grade and its basic salary at step 1. Each step adds 5%. */
const grades: [string, number][] = [
  ["G7", 145000],
  ["G6", 98000],
  ["G5", 72000],
  ["G4", 48000],
  ["G3", 32000],
  ["G2", 19500],
  ["G1", 12800],
];
const steps = 5;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrGradesPage", "/apps/human-resources/grades-steps");
}

export default function GradesStepsPage() {
  return (
    <HrPage
      section="hrGradesPage"
      path="/apps/human-resources/grades-steps"
      prefix="grd"
      appName="Grades & Steps"
      tool="hrGrades"
      group="org"
      features={[
        "A pay scale of grades and steps",
        "Basic salary for every grade and step",
        "A fixed increment from one step to the next",
        "Annual increments that move an employee one step",
        "Promotions that move an employee to a new grade",
      ]}
      stepTones={["purple", "teal", "purple"]}
      connectStructure={[
        { key: "before", tools: ["hrDesignations"] },
        { key: "after", tools: ["hrStructures", "hrEmployees", "hrPayrollRuns"] },
        { key: "shows", tools: ["hrServiceRecords", "hrSalaryBudgets"] },
      ]}
      icons={[Grid3x3, TrendingUp, ArrowUpRight, Scale]}
      render={(ui) => (
        <Card
          title={ui.scaleTitle}
          right={
            <span className="flex items-center gap-1.5">
              <Chip tone="teal">{ui.increment}</Chip>
              <Chip tone="muted">{ui.effective}</Chip>
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-separate border-spacing-1 text-[10.5px]">
              <thead>
                <tr className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="text-start">{ui.grade}</th>
                  {Array.from({ length: steps }, (_, s) => (
                    <th key={s} className="text-end">
                      {ui.step} {s + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map(([g, base], gi) => (
                  <tr key={g}>
                    <td className="font-semibold text-foreground">{g}</td>
                    {Array.from({ length: steps }, (_, s) => {
                      const amount = Math.round((base * Math.pow(1.05, s)) / 100) * 100;
                      const here = gi === 4 && s === 2;
                      return (
                        <td
                          key={s}
                          className={`rounded-md px-2 py-1.5 text-end tabular-nums ${
                            here ? "bg-primary font-semibold text-white" : "text-foreground"
                          }`}
                          style={here ? undefined : { background: `color-mix(in oklch, var(--primary) ${4 + (6 - gi) * 3}%, transparent)` }}
                        >
                          {amount.toLocaleString("en-IN")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 text-[10.5px] text-muted-foreground">{ui.note}</p>
        </Card>
      )}
    />
  );
}
