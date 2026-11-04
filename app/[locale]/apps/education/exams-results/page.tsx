/**
 * Adon ERP public site: /apps/education/exams-results
 * Copy lives in messages/*.json under pages.accountingShowcase.edExamsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Panel, Pill, Register, Sticker, Tabs, num, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [exam, dates, kind key, term, weight, classes, papers, marks, published?, pass rate]. */
const exams: [string, string, string, string, number, number, number, number, boolean, string][] = [
  ["First term examination", "19 Apr to 29 Apr 2027", "termExam", "First term", 25, 15, 153, 13197, true, "89.5%"],
  ["Half-yearly examination", "14 Jun to 25 Jun 2027", "termExam", "Half-yearly", 25, 15, 153, 13197, true, "88.5%"],
  ["Annual examination", "22 Nov to 03 Dec 2027", "finalExam", "Annual", 50, 15, 153, 0, false, "–"],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edExamsPage", "/apps/education/exams-results");
}

export default function EducationExamsPage() {
  const ui = useUi("edExamsPage");
  return (
    <SchoolPage
      section="edExamsPage"
      path="/apps/education/exams-results"
      tool="examsResults"
      preview={
        <>
          <Tabs items={[ui.tabExams, ui.tabMarks, ui.tabResults, ui.tabGrading]} />
          <div className="grid gap-2 sm:grid-cols-3">
            <Sticker label={ui.kExams} value="3" />
            <Sticker label={ui.kPublished} value="2" tone="green" />
            <Sticker label={ui.kPassRate} value="–" sub={ui.kPassRateSub} />
          </div>
          <Panel title={ui.tableTitle} right={<Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newExam}</Btn>}>
            <Register
              dense
              cols={[
                { head: ui.cExam },
                { head: ui.cKind },
                { head: ui.cTerm },
                { head: ui.cWeight, end: true },
                { head: ui.cClasses, end: true },
                { head: ui.cPapers, end: true },
                { head: ui.cMarks, end: true },
                { head: ui.cStatus, className: "ps-4" },
                { head: ui.cPass, end: true },
                { head: "-" },
              ]}
              rows={exams.map(([name, dates, kind, term, weight, classes, papers, marks, done, pass]) => [
                <span key={name}>
                  <b className="font-semibold text-foreground">{name}</b>
                  <span className="block text-[9.5px] text-muted-foreground">{dates}</span>
                </span>,
                ui[kind],
                term,
                `${weight}%`,
                classes,
                papers,
                num(marks),
                <Pill key={`s${name}`} tone={done ? "green" : "muted"}>
                  {done ? ui.published : ui.setup}
                </Pill>,
                pass,
                <Btn key={`m${name}`}>{ui.manage}</Btn>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
