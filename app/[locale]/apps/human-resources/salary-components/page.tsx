/**
 * Adon ERP public site: /apps/human-resources/salary-components
 * Copy lives in messages/*.json under pages.accountingShowcase.hrComp.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Calculator, MinusCircle, PlusCircle, Receipt } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [code, name, rule key, taxable]. */
const earnings: [string, string, string, boolean][] = [
  ["BAS", "Basic salary", "ruleGrade", true],
  ["HRA", "House rent allowance", "rule50", true],
  ["MED", "Medical allowance", "ruleFixedMed", true],
  ["CON", "Conveyance", "ruleFixedCon", true],
  ["OT", "Overtime", "ruleOt", true],
  ["FES", "Festival bonus", "ruleBonus", true],
];
const deductions: [string, string, string, HrTone][] = [
  ["PF", "Provident fund", "rulePf", "navy"],
  ["TDS", "Income tax (TDS)", "ruleTax", "red"],
  ["ADV", "Salary advance", "ruleAdv", "brown"],
  ["ABS", "Absence", "ruleAbs", "muted"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrComp", "/apps/human-resources/salary-components");
}

export default function SalaryComponentsPage() {
  return (
    <HrPage
      section="hrComp"
      path="/apps/human-resources/salary-components"
      prefix="comp"
      appName="Salary Components"
      tool="hrComponents"
      group="pay"
      features={[
        "Earnings and deductions with a code each",
        "Fixed amounts, a percentage of basic, or a formula",
        "A taxable flag on every component",
        "A ledger account behind each component",
        "One list reused by every salary structure",
      ]}
      stepTones={["teal", "red", "purple"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "hrTax"] },
        { key: "after", tools: ["hrStructures", "hrPayrollRuns"] },
        { key: "shows", tools: ["epPayslips", "journalEntries"] },
      ]}
      icons={[PlusCircle, MinusCircle, Calculator, Receipt]}
      render={(ui) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Card title={ui.earnings} right={<Chip tone="teal">{earnings.length}</Chip>}>
            <ul className="divide-y divide-border">
              {earnings.map((e) => (
                <li key={e[0]} className="flex items-center gap-3 py-2">
                  <span className="grid h-7 w-9 place-items-center rounded-md bg-[var(--teal)]/12 font-mono text-[9.5px] font-semibold text-[var(--teal)]">{e[0]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-medium text-foreground">{e[1]}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{ui[e[2]]}</span>
                  </span>
                  {e[3] && <Chip tone="muted">{ui.taxable}</Chip>}
                </li>
              ))}
            </ul>
          </Card>
          <Card title={ui.deductions} right={<Chip tone="red">{deductions.length}</Chip>}>
            <ul className="divide-y divide-border">
              {deductions.map((d) => (
                <li key={d[0]} className="flex items-center gap-3 py-2">
                  <span className="grid h-7 w-9 place-items-center rounded-md bg-destructive/10 font-mono text-[9.5px] font-semibold text-destructive">{d[0]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-medium text-foreground">{d[1]}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{ui[d[2]]}</span>
                  </span>
                  <Chip tone={d[3]}>{ui.deduct}</Chip>
                </li>
              ))}
            </ul>
            <p className="mt-2 rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[10.5px] text-muted-foreground">{ui.ledgerNote}</p>
          </Card>
        </div>
      )}
    />
  );
}
