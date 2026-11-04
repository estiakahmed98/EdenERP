/**
 * Adon ERP public site: /apps/education/welfare-funds
 * Copy lives in messages/*.json under pages.accountingShowcase.edWelfarePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Printer } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Hint, Panel, Pill, Tabs, taka, useUi, type Tone } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [name key, who key, tone, balance, received count, received, paid out count, paid out, eligible]. */
const funds: [string, string, Tone, number, number, number, number, number, number | null][] = [
  ["general", "anyStudent", "blue", 425000, 14, 610000, 9, 185000, null],
  ["sadaqah", "anyStudent", "blue", 186000, 22, 264000, 11, 78000, null],
  ["zakat", "eligibleOnly", "navy", 310000, 31, 520000, 17, 210000, 18],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edWelfarePage", "/apps/education/welfare-funds");
}

export default function EducationWelfarePage() {
  const ui = useUi("edWelfarePage");
  return (
    <SchoolPage
      section="edWelfarePage"
      path="/apps/education/welfare-funds"
      tool="welfareFunds"
      preview={
        <>
          <Tabs items={[ui.tabFunds, ui.tabDonations, ui.tabZakat, ui.tabPay]} />
          <Hint>{ui.hint}</Hint>
          <div className="grid gap-3 md:grid-cols-3">
            {funds.map(([name, who, tone, balance, rc, received, pc, paid, eligible]) => (
              <Panel key={name} taped>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-semibold text-foreground">{ui[name]}</p>
                  <Pill tone={tone}>{ui[who]}</Pill>
                </div>
                <p className="mt-2 text-[22px] font-semibold tabular-nums text-foreground">{taka(balance)}</p>
                <p className="mt-1 text-[10.5px] text-muted-foreground">
                  {ui.received} {taka(received)} ({rc}) · {ui.paidOut} {taka(paid)} ({pc})
                  {eligible !== null && ` · ${eligible} ${ui.eligible}`}
                </p>
                <div className="mt-3">
                  <Btn icon={<Printer className="h-3 w-3" />}>{ui.statement}</Btn>
                </div>
              </Panel>
            ))}
          </div>
        </>
      }
    />
  );
}
