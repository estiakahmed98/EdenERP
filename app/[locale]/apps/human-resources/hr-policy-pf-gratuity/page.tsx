/**
 * Adon ERP public site: /apps/human-resources/hr-policy-pf-gratuity
 * Copy lives in messages/*.json under pages.accountingShowcase.hrPolicyPage.
 * ALL DATA ON THIS PAGE IS DUMMY: the rates are sample policy settings.
 */
import type { Metadata } from "next";
import { HandCoins, Landmark, ScrollText, Timer } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../_hr";

/** DUMMY data: years of service and the share of the employer PF the employee keeps. */
const vesting: [string, number][] = [
  ["< 3", 0],
  ["3", 50],
  ["4", 75],
  ["5+", 100],
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-block h-4 w-7 rounded-full ${on ? "bg-primary" : "bg-muted"}`} aria-hidden="true">
      <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow ${on ? "end-0.5" : "start-0.5"}`} />
    </span>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrPolicyPage", "/apps/human-resources/hr-policy-pf-gratuity");
}

export default function HrPolicyPage() {
  return (
    <HrPage
      section="hrPolicyPage"
      path="/apps/human-resources/hr-policy-pf-gratuity"
      prefix="pol"
      appName="HR Policy (PF/Gratuity)"
      tool="hrPolicy"
      group="statutory"
      features={[
        "Provident fund rates for employee and employer",
        "A vesting schedule for the employer's share",
        "Gratuity rules by years of service",
        "Eligibility after probation or a set number of months",
        "The same rules used by payroll and final settlements",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrComponents", "hrGrades"] },
        { key: "after", tools: ["hrPayrollRuns", "hrSettlements"] },
        { key: "shows", tools: ["epPf", "hrReports"] },
      ]}
      icons={[Landmark, Timer, HandCoins, ScrollText]}
      render={(ui) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Card title={ui.pfTitle} right={<Toggle on />}>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-[10px] text-muted-foreground">{ui.employee}</p>
                <p className="text-[20px] font-semibold tabular-nums text-primary">10%</p>
                <p className="text-[9.5px] text-muted-foreground">{ui.ofBasic}</p>
              </div>
              <div className="rounded-lg bg-[var(--teal)]/10 p-3 text-center">
                <p className="text-[10px] text-muted-foreground">{ui.employer}</p>
                <p className="text-[20px] font-semibold tabular-nums text-[var(--teal)]">10%</p>
                <p className="text-[9.5px] text-muted-foreground">{ui.ofBasic}</p>
              </div>
            </div>
            <p className="mt-3 text-[10.5px] font-semibold text-foreground">{ui.vesting}</p>
            <div className="mt-1.5 grid grid-cols-4 items-end gap-1.5">
              {vesting.map(([y, pct]) => (
                <div key={y} className="text-center">
                  <span className="mx-auto block w-full rounded-t bg-primary" style={{ height: `${8 + pct * 0.44}px`, opacity: pct ? 1 : 0.2 }} aria-hidden="true" />
                  <p className="mt-1 text-[10px] font-semibold tabular-nums text-foreground">{pct}%</p>
                  <p className="text-[9.5px] text-muted-foreground">
                    {y} {ui.yrs}
                  </p>
                </div>
              ))}
            </div>
          </Card>
          <Card title={ui.gratuityTitle} right={<Toggle on />}>
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2.5 text-center">
              <p className="text-[12px] font-semibold text-foreground">{ui.formula}</p>
              <p className="text-[10px] text-muted-foreground">{ui.formulaSub}</p>
            </div>
            <ul className="mt-3 space-y-2 text-[11px]">
              {["rule1", "rule2", "rule3"].map((k, i) => (
                <li key={k} className="flex items-center justify-between gap-3 rounded-lg bg-[var(--gray-bg)] px-3 py-2">
                  <span className="text-foreground">{ui[k]}</span>
                  <Toggle on={i !== 2} />
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Chip tone="navy">{ui.effective}</Chip> {ui.version}
            </p>
          </Card>
        </div>
      )}
    />
  );
}
