/**
 * Adon ERP public site: /apps/education/students
 * Copy lives in messages/*.json under pages.accountingShowcase.edStudentsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Upload, UserPlus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Panel, Pill, Register, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [id, name, siblings, class, section, roll, guardian, phone]. */
const students: [string, string, number, string, string, string, string, string][] = [
  ["STU-2027-000134", "Adnan Rahman", 0, "Class V", "A", "4", "Rezaul Rahman", "01711 000 935"],
  ["STU-2027-000133", "Alina Chowdhury", 2, "Class V", "A", "5", "Kamrul Chowdhury", "01711 000 850"],
  ["STU-2027-000139", "Alina Khan", 0, "Class V", "B", "11", "Tanvir Khan", "01711 000 222"],
  ["STU-2027-000124", "Faiza Hossain", 0, "Class VI", "A", "9", "Nazmul Hossain", "01711 000 894"],
  ["STU-2027-000122", "Humaira Uddin", 0, "Class VI", "B", "14", "Nazmul Uddin", "01711 000 689"],
  ["STU-2027-000125", "Ilma Chowdhury", 1, "Class VII", "A", "2", "Rezaul Chowdhury", "01711 000 278"],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edStudentsPage", "/apps/education/students");
}

export default function EducationStudentsPage() {
  const ui = useUi("edStudentsPage");
  return (
    <SchoolPage
      section="edStudentsPage"
      path="/apps/education/students"
      tool="students"
      preview={
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12px] font-semibold text-muted-foreground">(634)</p>
            <div className="flex gap-2">
              <Btn icon={<Upload className="h-3 w-3" />}>{ui.import}</Btn>
              <Btn solid icon={<UserPlus className="h-3 w-3" />}>{ui.newStudent}</Btn>
            </div>
          </div>
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-5">
              <Field label={ui.fYear} value="2027–28" select />
              <Field label={ui.fClass} value={ui.all} select />
              <Field label={ui.fSection} value={ui.all} select />
              <Field label={ui.fStatus} value={ui.all} select />
              <Field label={ui.fSearch} value={ui.searchHint} />
            </div>
          </Panel>
          <Panel>
            <Register
              dense
              cols={[
                { head: ui.cId },
                { head: ui.cName },
                { head: ui.cClass },
                { head: ui.cSection },
                { head: ui.cRoll },
                { head: ui.cGuardian },
                { head: ui.cStatus },
              ]}
              rows={students.map(([id, name, sibs, cls, sec, roll, guardian, phone]) => [
                <span key={id} className="text-muted-foreground">
                  {id}
                </span>,
                <span key={name} className="flex items-center gap-1.5">
                  <b className="font-semibold text-primary">{name}</b>
                  {sibs > 0 && (
                    <Pill tone="navy">
                      {sibs} {ui.siblings}
                    </Pill>
                  )}
                </span>,
                cls,
                sec,
                roll,
                <span key={guardian}>
                  {guardian}
                  <span className="block text-[9.5px] text-muted-foreground">{phone}</span>
                </span>,
                <Pill key={`s${id}`} tone="green">
                  {ui.active}
                </Pill>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
