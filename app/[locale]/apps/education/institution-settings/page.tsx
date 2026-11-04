/**
 * Adon ERP public site: /apps/education/institution-settings
 * Copy lives in messages/*.json under pages.accountingShowcase.edSettingsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Building2 } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Panel, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edSettingsPage", "/apps/education/institution-settings");
}

export default function EducationSettingsPage() {
  const ui = useUi("edSettingsPage");
  const days: [string, boolean][] = [
    ["sat", true], ["sun", false], ["mon", false], ["tue", false], ["wed", false], ["thu", false], ["fri", true],
  ];
  return (
    <SchoolPage
      section="edSettingsPage"
      path="/apps/education/institution-settings"
      tool="institutionSettings"
      preview={
        <>
          <Panel>
            <p className="text-[10px] text-muted-foreground">{ui.typeLabel}</p>
            <p className="text-[13px] font-semibold text-foreground">{ui.typeValue}</p>
            <p className="text-[10.5px] text-muted-foreground">{ui.boards}</p>
          </Panel>
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label={ui.fRevenue} value={ui.revenueValue} select />
              <Field label={ui.fAnnual} value={ui.annualValue} select />
              <Field label={ui.fRolls} value={ui.rollsValue} select />
              <Field label={ui.fCalendar} value={ui.calendarValue} select />
              <Field label={ui.fCash} value={ui.cashValue} select />
              <Field label={ui.fFine} value={ui.fineValue} />
              <Field label={ui.fAttendance} value={ui.attendanceValue} select />
              <Field label={ui.fMin} value={ui.minValue} />
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">{ui.offDays}</p>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5">
              {days.map(([key, on]) => (
                <Box key={key} on={on} label={ui[key]} />
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              <Box on label={ui.textAbsent} />
              <Box label={ui.mpo} />
            </div>
            <p className="mt-2 text-[10px] leading-snug text-muted-foreground">{ui.mpoNote}</p>
            <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">{ui.accrualNote}</p>
            <div className="mt-3">
              <Btn solid>{ui.save}</Btn>
            </div>
          </Panel>
          <Panel title={ui.addTitle}>
            <p className="text-[10.5px] text-muted-foreground">{ui.addHint}</p>
            <div className="mt-2.5 flex items-end gap-2">
              <div className="w-56">
                <Field label="" value="–" select />
              </div>
              <Btn icon={<Building2 className="h-3 w-3" />}>{ui.apply}</Btn>
            </div>
          </Panel>
        </>
      }
    />
  );
}
