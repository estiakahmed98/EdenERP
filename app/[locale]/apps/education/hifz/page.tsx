/**
 * Adon ERP public site: /apps/education/hifz
 * Copy lives in messages/*.json under pages.accountingShowcase.edHifzPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Save } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Hint, Panel, Pill, Register, Tabs, useUi, type Tone } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [roll, student, para, next page, sabaq to page, grade key, sabqi, manzil, mistakes]. */
const rows: [number, string, number, number, string, string, string, string, string][] = [
  [1, "Hamza Rahman", 12, 4, "7", "excellent", "10 to 11", "1 to 5", "0"],
  [2, "Zayd Karim", 3, 15, "17", "good", "2 to 3", "1 to 1", "2"],
  [3, "Ibrahim Hossain", 29, 1, "1", "repeat", "27 to 28", "1 to 20", "5"],
  [4, "Yusuf Ahmed", 30, 1, "3", "good", "30 to 30", "20 to 28", "1"],
];
const grade: Record<string, Tone> = { excellent: "green", good: "blue", repeat: "brown" };

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edHifzPage", "/apps/education/hifz");
}

export default function EducationHifzPage() {
  const ui = useUi("edHifzPage");
  return (
    <SchoolPage
      section="edHifzPage"
      path="/apps/education/hifz"
      tool="hifz"
      preview={
        <>
          <Tabs items={[ui.tabLog, ui.tabBoard]} />
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Field label={ui.fSection} value={ui.sectionValue} select />
              <Field label={ui.fDate} value={ui.dateValue} />
            </div>
          </Panel>
          <Panel>
            <Hint>{ui.hint}</Hint>
            <div className="mt-3">
              <Register
                dense
                cols={[
                  { head: ui.cRoll },
                  { head: ui.cStudent },
                  { head: ui.cPara },
                  { head: ui.cAttendance },
                  { head: ui.cSabaq, end: true },
                  { head: ui.cGrade, className: "ps-3" },
                  { head: ui.cSabqi },
                  { head: ui.cManzil },
                  { head: ui.cMistakes, end: true },
                ]}
                rows={rows.map(([roll, name, para, page, to, g, sabqi, manzil, mistakes]) => [
                  roll,
                  <b key={name} className="font-semibold text-foreground">
                    {name}
                  </b>,
                  `${ui.para} ${para}, ${ui.fromPage} ${page}`,
                  <Pill key={`a${roll}`} tone="green">
                    {ui.present}
                  </Pill>,
                  to,
                  <Pill key={`g${roll}`} tone={grade[g]}>
                    {ui[g]}
                  </Pill>,
                  sabqi,
                  manzil,
                  mistakes,
                ])}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Btn solid icon={<Save className="h-3 w-3" />}>{ui.save}</Btn>
            </div>
          </Panel>
        </>
      }
    />
  );
}
