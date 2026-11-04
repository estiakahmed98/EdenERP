/**
 * Adon ERP public site: /apps/university/faculty-workload
 * Copy lives in messages/*.json under pages.accountingShowcase.uniFacultyPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Briefcase } from "lucide-react";

import { Btn, Initials, Panel, PencilBar, Pill, Register, Sticker, Tabs, useUi, type Tone } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

const NORM = 12;
/** DUMMY data: [teacher, department, courses, credit hours]. */
const faculty: [string, string, number, number][] = [
  ["Dr. Kamal Uddin", "CSE", 4, 15],
  ["Dr. Shirin Sultana", "CSE", 3, 12],
  ["Md. Anwar Hossain", "EEE", 3, 11],
  ["Farhana Rahman", "BBA", 4, 14],
  ["Tahmina Akter", "English", 2, 8],
  ["Dr. Rezaul Karim", "Law", 3, 12],
];
/** DUMMY data: sections still without a teacher. */
const open: [string, string][] = [
  ["CSE 410, Section B", "Autumn 2027"],
  ["BBA 305, Section A", "Autumn 2027"],
  ["ENG 210, Section C", "Autumn 2027"],
  ["LAW 120, Section A", "Autumn 2027"],
];
const status = (h: number): { key: "over" | "within" | "under"; tone: Tone } =>
  h > NORM ? { key: "over", tone: "red" } : h < NORM - 2 ? { key: "under", tone: "brown" } : { key: "within", tone: "green" };

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniFacultyPage", "/apps/university/faculty-workload");
}

export default function UniversityFacultyPage() {
  const ui = useUi("uniFacultyPage");
  return (
    <UniversityPage
      section="uniFacultyPage"
      path="/apps/university/faculty-workload"
      tool="facultyWorkload"
      icon={Briefcase}
      preview={
        <>
          <Tabs items={[ui.tabLoad, ui.tabAssign, ui.tabDept, ui.tabVisiting]} />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Sticker label={ui.kFaculty} value="86" />
            <Sticker label={ui.kAvg} value="11.4" tone="blue" />
            <Sticker label={ui.kOver} value="7" tone="red" />
            <Sticker label={ui.kOpen} value="4" tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-8" title={ui.loadTitle} right={<span className="text-[10px] text-muted-foreground">{ui.norm} {NORM}</span>}>
              <Register
                dense
                cols={[
                  { head: ui.cName },
                  { head: ui.cDept },
                  { head: ui.cCourses, end: true },
                  { head: ui.cLoad, className: "w-32 ps-4" },
                  { head: ui.cStatus, className: "ps-4" },
                ]}
                rows={faculty.map(([name, dept, courses, hours], i) => {
                  const s = status(hours);
                  return [
                    <span key={name} className="flex items-center gap-2">
                      <Initials name={name.replace("Dr. ", "").replace("Md. ", "")} tone={i} />
                      <b className="font-semibold text-foreground">{name}</b>
                    </span>,
                    dept,
                    courses,
                    <span key={`h${name}`} className="flex items-center gap-2">
                      <PencilBar pct={(hours / 18) * 100} tone={s.tone} />
                      <span className="w-5 shrink-0 text-end text-[10px] tabular-nums text-muted-foreground">{hours}</span>
                    </span>,
                    <Pill key={`s${name}`} tone={s.tone}>{ui[s.key]}</Pill>,
                  ];
                })}
              />
            </Panel>
            <Panel className="lg:col-span-4" title={ui.openTitle} taped>
              <ul className="space-y-2">
                {open.map(([section, term]) => (
                  <li key={section} className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-[11px]">
                    <span>
                      <b className="block font-semibold text-foreground">{section}</b>
                      <span className="text-[10px] text-muted-foreground">{term}</span>
                    </span>
                    <Btn>{ui.tabAssign}</Btn>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </>
      }
    />
  );
}
