/**
 * Adon ERP public site: /apps/education/student-attendance
 * Copy lives in messages/*.json under pages.accountingShowcase.edAttendancePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Save } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Hint, Panel, Pill, Tabs, useUi, type Tone } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

type State = "p" | "l" | "a" | "v";

/** DUMMY data: [roll, name, state, attendance %]. */
const students: [number, string, State, number][] = [
  [1, "Abir Khan", "p", 82],
  [2, "Afsana Rahman", "p", 100],
  [3, "Anika Khan", "l", 91],
  [4, "Ankita Das", "p", 100],
  [5, "Ashik Mia", "a", 73],
  [6, "Fahad Prodhan", "p", 90],
  [7, "Fatema Ahmed", "p", 73],
  [8, "Jannatul Ahmed", "v", 91],
  [9, "Jubayer Islam", "p", 91],
  [10, "Lamiya Ahmed", "p", 91],
  [11, "Maliha Sarker", "p", 100],
  [12, "Mehedi Akter", "p", 91],
];
const look: Record<State, { box: string; dot: string; tone: Tone }> = {
  p: { box: "border-[var(--teal)]/45 bg-[var(--teal)]/8", dot: "bg-[var(--teal)]", tone: "green" },
  l: { box: "border-[var(--chart-4)]/45 bg-[var(--chart-4)]/10", dot: "bg-[var(--chart-4)]", tone: "brown" },
  a: { box: "border-destructive/45 bg-destructive/8", dot: "bg-destructive", tone: "red" },
  v: { box: "border-[var(--secondary)]/40 bg-[var(--secondary)]/8", dot: "bg-[var(--secondary)] dark:bg-[var(--chart-3)]", tone: "navy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edAttendancePage", "/apps/education/student-attendance");
}

export default function EducationAttendancePage() {
  const ui = useUi("edAttendancePage");
  const label: Record<State, string> = { p: ui.present, l: ui.late, a: ui.absent, v: ui.leave };
  // The preview shows 12 of 32 students; the counts are for the whole section.
  const count = (s: State) => students.filter((x) => x[2] === s).length + (s === "p" ? 20 : 0);
  return (
    <SchoolPage
      section="edAttendancePage"
      path="/apps/education/student-attendance"
      tool="studentAttendance"
      preview={
        <>
          <Tabs items={[ui.tabTake, ui.tabToday, ui.tabMonth, ui.tabLeave, ui.tabLow]} />
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Field label={ui.fSection} value={ui.sectionValue} select />
              <Field label={ui.fDate} value={ui.dateValue} />
            </div>
          </Panel>
          <Panel>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {(["p", "l", "a", "v"] as State[]).map((s) => (
                <Pill key={s} tone={look[s].tone}>
                  {label[s]} {count(s)}
                </Pill>
              ))}
              <Btn>{ui.allPresent}</Btn>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {students.map(([roll, name, state, pct]) => (
                <div key={roll} className={`flex items-center gap-2.5 rounded-xl border-2 px-2.5 py-2 ${look[state].box}`}>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${look[state].dot}`}>
                    {roll}
                  </span>
                  <span className="min-w-0 text-[11px]">
                    <b className="block truncate font-semibold text-foreground">{name}</b>
                    <span className="text-[9.5px] text-muted-foreground">
                      {label[state]} · {pct}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <Btn solid icon={<Save className="h-3 w-3" />}>{ui.save}</Btn>
            </div>
          </Panel>
          <Hint>{ui.hint}</Hint>
        </>
      }
    />
  );
}
