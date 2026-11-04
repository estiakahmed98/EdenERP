/**
 * Adon ERP public site: /apps/university/exams-attendance
 * Copy lives in messages/*.json under pages.accountingShowcase.uniExamsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";

import { Panel, PencilBar, Pill, Register, Sticker, Tabs, useUi, type Tone } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [course, date, time, room, seats]. */
const schedule: [string, string, string, string, number][] = [
  ["CSE 301 Algorithms", "12 Dec", "10:00 to 13:00", "Hall A", 124],
  ["EEE 205 Circuits", "13 Dec", "10:00 to 13:00", "Hall B", 98],
  ["MAT 201 Calculus III", "15 Dec", "14:00 to 17:00", "Hall A", 142],
  ["ENG 102 Composition", "16 Dec", "10:00 to 12:00", "Room 305", 66],
  ["BUS 210 Accounting", "18 Dec", "10:00 to 13:00", "Hall C", 110],
];
/** DUMMY data: [course, average attendance %]. */
const attendance: [string, number][] = [
  ["CSE 301", 91], ["EEE 205", 84], ["MAT 201", 79], ["ENG 102", 93], ["BUS 210", 72],
];
/** DUMMY data: [student, attendance %, decision key]. */
const students: [string, number, "eligible" | "condonation" | "barred"][] = [
  ["Rafiq Ahmed", 94, "eligible"],
  ["Sumaiya Akter", 78, "eligible"],
  ["Imran Hossain", 73, "condonation"],
  ["Farzana Karim", 61, "barred"],
];
const decisionTone: Record<string, Tone> = { eligible: "green", condonation: "brown", barred: "red" };

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniExamsPage", "/apps/university/exams-attendance");
}

export default function UniversityExamsPage() {
  const ui = useUi("uniExamsPage");
  return (
    <UniversityPage
      section="uniExamsPage"
      path="/apps/university/exams-attendance"
      tool="examsAttendance"
      icon={ClipboardCheck}
      preview={
        <>
          <Tabs items={[ui.tabSchedule, ui.tabAttendance, ui.tabEligibility, ui.tabSeats]} />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Sticker label={ui.kExams} value="18" />
            <Sticker label={ui.kAttendance} value="86%" tone="green" />
            <Sticker label={ui.kBelow} value="23" tone="red" />
            <Sticker label={ui.kSeats} value="1,240" tone="blue" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-7" title={ui.scheduleTitle}>
              <Register
                dense
                cols={[
                  { head: ui.cCourse },
                  { head: ui.cDate },
                  { head: ui.cTime },
                  { head: ui.cRoom },
                  { head: ui.cSeats, end: true },
                ]}
                rows={schedule.map(([course, date, time, room, seats]) => [
                  <b key={course} className="font-semibold text-foreground">{course}</b>,
                  date,
                  time,
                  room,
                  seats,
                ])}
              />
            </Panel>
            <Panel className="lg:col-span-5" title={ui.attendanceTitle} right={<span className="text-[10px] text-muted-foreground">{ui.minLabel}</span>}>
              <ul className="space-y-2.5">
                {attendance.map(([course, pct]) => (
                  <li key={course} className="grid grid-cols-[4.5rem_1fr_2.2rem] items-center gap-3 text-[11px]">
                    <span className="text-foreground">{course}</span>
                    <PencilBar pct={pct} tone={pct < 75 ? "red" : "green"} />
                    <span className="text-end tabular-nums text-muted-foreground">{pct}%</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <Panel title={ui.eligibilityTitle}>
            <Register
              dense
              cols={[{ head: ui.cStudent }, { head: ui.cPercent, end: true }, { head: ui.cDecision, className: "ps-4" }]}
              rows={students.map(([name, pct, decision]) => [
                <b key={name} className="font-semibold text-foreground">{name}</b>,
                `${pct}%`,
                <Pill key={`d${name}`} tone={decisionTone[decision]}>{ui[decision]}</Pill>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
