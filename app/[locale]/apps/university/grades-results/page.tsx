/**
 * Adon ERP public site: /apps/university/grades-results
 * Copy lives in messages/*.json under pages.accountingShowcase.uniGradesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Award, Printer } from "lucide-react";

import { Btn, Panel, Pill, Register, Sticker, Tabs, useUi, type Tone } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [student ID, name, marks, grade, points, published?]. */
const rows: [string, string, number, string, string, boolean][] = [
  ["2021-1-60-012", "Rafiq Ahmed", 91, "A+", "4.00", true],
  ["2021-1-60-018", "Nusrat Jahan", 86, "A", "3.75", true],
  ["2021-1-60-024", "Tanvir Hasan", 78, "A-", "3.50", true],
  ["2021-1-60-031", "Sumaiya Akter", 72, "B+", "3.25", true],
  ["2021-1-60-040", "Imran Hossain", 64, "B", "3.00", false],
  ["2021-1-60-047", "Farzana Karim", 55, "C", "2.50", false],
];
/** Grade distribution for the section, as [grade, students]. */
const dist: [string, number][] = [
  ["A+", 12], ["A", 22], ["A-", 28], ["B+", 25], ["B", 18], ["C", 11], ["F", 8],
];
const tone = (g: string): Tone => (g.startsWith("A") ? "green" : g.startsWith("B") ? "blue" : "brown");

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniGradesPage", "/apps/university/grades-results");
}

export default function UniversityGradesPage() {
  const ui = useUi("uniGradesPage");
  const max = Math.max(...dist.map((d) => d[1]));
  return (
    <UniversityPage
      section="uniGradesPage"
      path="/apps/university/grades-results"
      tool="gradesResults"
      icon={Award}
      preview={
        <>
          <Tabs items={[ui.tabSheet, ui.tabScale, ui.tabModeration, ui.tabTranscripts]} />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Sticker label={ui.kStudents} value="124" />
            <Sticker label={ui.kGpa} value="3.21" tone="blue" />
            <Sticker label={ui.kPass} value="94.4%" tone="green" />
            <Sticker label={ui.kPending} value="2" tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel
              className="lg:col-span-8"
              title={`${ui.sheetTitle}: ${ui.course}, ${ui.section}`}
              right={<Btn solid>{ui.publish}</Btn>}
            >
              <Register
                dense
                cols={[
                  { head: ui.cId },
                  { head: ui.cName },
                  { head: ui.cMarks, end: true },
                  { head: ui.cGrade, className: "ps-4" },
                  { head: ui.cPoints, end: true },
                  { head: ui.cStatus, className: "ps-4" },
                ]}
                rows={rows.map(([id, name, marks, grade, points, done]) => [
                  <span key={id} className="text-muted-foreground">{id}</span>,
                  <b key={name} className="font-semibold text-foreground">{name}</b>,
                  marks,
                  <Pill key={`g${id}`} tone={tone(grade)}>{grade}</Pill>,
                  points,
                  <Pill key={`s${id}`} tone={done ? "green" : "muted"}>{done ? ui.published : ui.review}</Pill>,
                ])}
              />
              <div className="mt-3">
                <Btn icon={<Printer className="h-3 w-3" />}>{ui.print}</Btn>
              </div>
            </Panel>
            <Panel className="lg:col-span-4" title={ui.distTitle}>
              <div className="flex h-40 items-end gap-2" aria-hidden="true">
                {dist.map(([grade, n]) => (
                  <div key={grade} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <span className="text-[10px] tabular-nums text-muted-foreground">{n}</span>
                    <span
                      className={`w-full rounded-t-md ${grade === "F" ? "bg-destructive/70" : "bg-primary/70"}`}
                      style={{ height: `${(n / max) * 100}%` }}
                    />
                    <span className="text-[10px] font-medium text-foreground">{grade}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </>
      }
    />
  );
}
