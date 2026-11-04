/**
 * Adon ERP public site: /apps/education/academics
 * Copy lives in messages/*.json under pages.accountingShowcase.edAcademicsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Panel, Register, Tabs, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [code, English name, Bangla name, group key, board, board code]. */
const subjects: [string, string, string, string, string, string][] = [
  ["AL-ACC", "Accounting", "হিসাববিজ্ঞান", "business", "Pearson Edexcel", "YAC11"],
  ["AL-BIO", "Biology", "জীববিজ্ঞান", "science", "Cambridge (CAIE)", "9700"],
  ["AL-BUS", "Business", "ব্যবসায়", "business", "Pearson Edexcel", "YBS11"],
  ["AL-CHEM", "Chemistry", "রসায়ন", "science", "Cambridge (CAIE)", "9701"],
  ["AL-MATH", "Mathematics", "গণিত", "", "Cambridge (CAIE)", "9709"],
  ["AL-PHY", "Physics", "পদার্থবিজ্ঞান", "science", "Cambridge (CAIE)", "9702"],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edAcademicsPage", "/apps/education/academics");
}

export default function EducationAcademicsPage() {
  const ui = useUi("edAcademicsPage");
  return (
    <SchoolPage
      section="edAcademicsPage"
      path="/apps/education/academics"
      tool="academics"
      preview={
        <>
          <Tabs active={3} items={[ui.tabSessions, ui.tabLevels, ui.tabSections, ui.tabSubjects, ui.tabCurriculum, ui.tabTeaching]} />
          <Panel>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div className="w-full max-w-xs">
                <Field label="" value={ui.searchHint} />
              </div>
              <Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newSubject}</Btn>
            </div>
            <Register
              dense
              cols={[
                { head: ui.cCode },
                { head: ui.cSubject },
                { head: ui.cKind },
                { head: ui.cGroup },
                { head: ui.cBoard },
                { head: ui.cBoardCode },
                { head: "-" },
              ]}
              rows={subjects.map(([code, en, bn, group, board, boardCode]) => [
                <span key={code} className="text-muted-foreground">
                  {code}
                </span>,
                <span key={en}>
                  {en}
                  <span className="block text-[10px] text-muted-foreground">{bn}</span>
                </span>,
                ui.elective,
                group ? ui[group] : "–",
                board,
                <span key={`c${code}`} className="text-muted-foreground">
                  {boardCode}
                </span>,
                <Btn key={`e${code}`}>{ui.edit}</Btn>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
