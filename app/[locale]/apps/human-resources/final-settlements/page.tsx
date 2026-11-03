/**
 * Adon ERP public site: /apps/human-resources/final-settlements
 * Copy lives in messages/*.json under pages.accountingShowcase.hrSettle.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Check, ClipboardCheck, DoorOpen, HandCoins, Scale } from "lucide-react";

import { Avatar, Card, Chip, HrPage, bdt, hrMetadata } from "../_hr";

/** DUMMY data: settlement lines in taka. Earnings 3,63,700, deductions 61,500, net 3,02,200. */
const earnings: [string, number][] = [
  ["lSalary", 38200],
  ["lLeave", 27500],
  ["lGratuity", 165000],
  ["lPf", 133000],
];
const deductions: [string, number][] = [
  ["lNotice", 45000],
  ["lAdvance", 10000],
  ["lTax", 6500],
];
const clearance: [string, boolean][] = [
  ["cIt", true],
  ["cStore", true],
  ["cAccounts", true],
  ["cAdmin", false],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrSettle", "/apps/human-resources/final-settlements");
}

export default function FinalSettlementsPage() {
  const e = earnings.reduce((a, l) => a + l[1], 0);
  const d = deductions.reduce((a, l) => a + l[1], 0);

  return (
    <HrPage
      section="hrSettle"
      path="/apps/human-resources/final-settlements"
      prefix="settle"
      appName="Final Settlements"
      tool="hrSettlements"
      group="statutory"
      features={[
        "Resignation, termination and retirement settled on one sheet",
        "Unpaid salary, leave encashment, gratuity and PF added up",
        "Notice pay, advances and tax deducted",
        "Clearance from each department before payment",
        "The employee's service record closed with the settlement",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["hrPolicy", "hrLeaveTypes", "hrServiceRecords"] },
        { key: "after", tools: ["hrApprovals", "bankAccounts", "journalEntries"] },
        { key: "shows", tools: ["hrReports", "hrForm108"] },
      ]}
      icons={[DoorOpen, HandCoins, Scale, ClipboardCheck]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <Avatar name="Mahmud Hossain" size={34} tone={3} />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-foreground">Mahmud Hossain</p>
                <p className="text-[10px] text-muted-foreground">{ui.who}</p>
              </div>
              <Chip tone="brown">{ui.resigned}</Chip>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <dl className="space-y-1.5 text-[11px]">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--teal)]">{ui.payable}</p>
                {earnings.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{ui[k]}</dt>
                    <dd className="tabular-nums text-foreground">{v.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
              </dl>
              <dl className="space-y-1.5 text-[11px]">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-destructive">{ui.recoverable}</p>
                {deductions.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{ui[k]}</dt>
                    <dd className="tabular-nums text-destructive">−{v.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--secondary)] px-3 py-2 text-white">
              <span className="text-[11.5px]">{ui.net}</span>
              <span className="text-[15px] font-semibold tabular-nums">{bdt(e - d)}</span>
            </div>
          </Card>
          <Card className="lg:col-span-4" title={ui.clearance}>
            <ul className="space-y-2">
              {clearance.map(([k, done]) => (
                <li key={k} className="flex items-center gap-2.5 text-[11px]">
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold ${done ? "bg-[var(--teal)] text-white" : "border border-border text-transparent"}`}
                    aria-hidden="true"
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  <span className={done ? "text-foreground" : "text-muted-foreground"}>{ui[k]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-[var(--gray-bg)] px-2.5 py-2 text-[10px] text-muted-foreground">{ui.waitNote}</p>
          </Card>
        </div>
      )}
    />
  );
}
