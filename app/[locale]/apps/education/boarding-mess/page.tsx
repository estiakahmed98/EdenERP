/**
 * Adon ERP public site: /apps/education/boarding-mess
 * Copy lives in messages/*.json under pages.accountingShowcase.edBoardingPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Hint, Panel, Pill, Register, Sticker, Tabs, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [student, class, room, bed, since, meals included?]. */
const boarders: [string, string, string, string, string, boolean][] = [
  ["Hamza Rahman", "Class VII", "B-101", "1", "Jan 2027", true],
  ["Zayd Karim", "Class VII", "B-101", "2", "Jan 2027", true],
  ["Ibrahim Hossain", "Class VIII", "B-203", "4", "Feb 2027", true],
  ["Yusuf Ahmed", "Class IX", "B-204", "1", "Jan 2027", false],
  ["Ayaan Chowdhury", "Class VI", "B-102", "3", "Mar 2027", true],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edBoardingPage", "/apps/education/boarding-mess");
}

export default function EducationBoardingPage() {
  const ui = useUi("edBoardingPage");
  return (
    <SchoolPage
      section="edBoardingPage"
      path="/apps/education/boarding-mess"
      tool="boardingMess"
      preview={
        <>
          <Tabs active={1} items={[ui.tabRooms, ui.tabBoarders, ui.tabMealOff]} />
          <div className="grid gap-2 sm:grid-cols-3">
            <Sticker label={ui.sBoarders} value="64" />
            <Sticker label={ui.sFree} value="16" tone="green" />
            <Sticker label={ui.sMealOff} value="3" tone="brown" />
          </div>
          <Panel right={<Btn solid icon={<Plus className="h-3 w-3" />}>{ui.giveSeat}</Btn>}>
            <Hint>{ui.hint}</Hint>
            <div className="mt-3">
              <Register
                dense
                cols={[
                  { head: ui.cStudent },
                  { head: ui.cClass },
                  { head: ui.cRoom },
                  { head: ui.cBed },
                  { head: ui.cSince },
                  { head: ui.cMess },
                ]}
                rows={boarders.map(([name, cls, room, bed, since, meals]) => [
                  <b key={name} className="font-semibold text-foreground">
                    {name}
                  </b>,
                  cls,
                  room,
                  bed,
                  since,
                  <Pill key={`m${name}`} tone={meals ? "green" : "muted"}>
                    {meals ? ui.included : ui.notIncluded}
                  </Pill>,
                ])}
              />
            </div>
          </Panel>
        </>
      }
    />
  );
}
