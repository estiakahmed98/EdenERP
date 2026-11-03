/**
 * Adon ERP public site: /apps/human-resources/leave-types
 * Copy lives in messages/*.json under pages.accountingShowcase.hrLeaveTypesPage.
 * ALL DATA ON THIS PAGE IS DUMMY: the entitlements are sample policy settings.
 */
import type { Metadata } from "next";
import { Baby, BriefcaseMedical, Plane, Sun } from "lucide-react";

import { Chip, HrPage, barTone, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [name key, days, basis key, rules keys, tone, paid]. */
const types: [string, string, string, string[], HrTone, boolean][] = [
  ["casual", "10", "perYear", ["noCarry", "max3"], "primary", true],
  ["sick", "14", "perYear", ["certificate"], "teal", true],
  ["earned", "1 / 18", "perDays", ["carry", "encash"], "navy", true],
  ["maternity", "112", "perEvent", ["twoChildren"], "sky", true],
  ["festival", "11", "perYear", ["calendar"], "brown", true],
  ["unpaid", "—", "onApproval", ["deducted"], "muted", false],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrLeaveTypesPage", "/apps/human-resources/leave-types");
}

export default function LeaveTypesPage() {
  return (
    <HrPage
      section="hrLeaveTypesPage"
      path="/apps/human-resources/leave-types"
      prefix="ltype"
      appName="Leave Types"
      tool="hrLeaveTypes"
      group="time"
      features={[
        "Casual, sick, earned, maternity, festival and unpaid leave",
        "Days per year, or days earned for days worked",
        "Carry forward and encashment rules",
        "Paid or unpaid, so payroll knows what to deduct",
        "Balances that update when a leave is approved",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrPolicy", "hrHolidays"] },
        { key: "after", tools: ["hrLeaveApps", "hrPayrollRuns"] },
        { key: "shows", tools: ["epLeaves", "hrSettlements"] },
      ]}
      icons={[Sun, BriefcaseMedical, Plane, Baby]}
      render={(ui) => (
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {types.map(([key, days, basis, rules, tone, paid]) => (
            <div key={key} className="relative overflow-hidden rounded-xl border border-border bg-card p-3.5">
              <span className={`absolute inset-y-0 start-0 w-1 ${barTone[tone]}`} aria-hidden="true" />
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] font-semibold text-foreground">{ui[key]}</p>
                <Chip tone={paid ? "teal" : "red"}>{paid ? ui.paid : ui.unpaidTag}</Chip>
              </div>
              <p className="mt-2 text-[22px] font-semibold leading-none tabular-nums text-foreground">{days}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{ui[basis]}</p>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {rules.map((r) => (
                  <Chip key={r} tone="muted">
                    {ui[r]}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
}
