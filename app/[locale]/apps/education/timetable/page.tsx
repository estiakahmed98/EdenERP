/**
 * Adon ERP public site: /apps/education/timetable
 * Copy lives in messages/*.json under pages.accountingShowcase.edTimetablePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Printer } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Panel, Tabs, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

type Lesson = [string, string] | null;

/** DUMMY data: [period label, time, five days of [subject key, teacher] or null for a free cell]. */
const grid: [string, string, Lesson[]][] = [
  ["1", "08:00–08:45", [["science", "Afroza Sultana"], ["science", "Afroza Sultana"], ["science", "Afroza Sultana"], ["english", "Jesmin Ara"], null]],
  ["2", "08:45–09:30", [["english", "Selina Parvin"], ["english", "Selina Parvin"], ["english", "Selina Parvin"], null, null]],
  ["3", "09:30–10:15", [["maths", "Anisur Rahman"], ["maths", "Anisur Rahman"], ["maths", "Anisur Rahman"], ["maths", "Anisur Rahman"], ["maths", "Anisur Rahman"]]],
  ["tiffin", "10:15–10:40", []],
  ["4", "10:40–11:25", [["english", "Jahidul Islam"], ["english", "Jahidul Islam"], ["english", "Jahidul Islam"], ["english", "Jahidul Islam"], ["english", "Jahidul Islam"]]],
  ["5", "11:25–12:10", [["bangla", "Kamrul Hasan"], ["bangla", "Kamrul Hasan"], ["bangla", "Kamrul Hasan"], ["bangla", "Kamrul Hasan"], ["bangla", "Kamrul Hasan"]]],
  ["6", "12:10–12:55", [["bgs", "Rashedul Hasan"], ["bgs", "Rashedul Hasan"], ["bgs", "Rashedul Hasan"], null, null]],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edTimetablePage", "/apps/education/timetable");
}

export default function EducationTimetablePage() {
  const ui = useUi("edTimetablePage");
  const days = [ui.sun, ui.mon, ui.tue, ui.wed, ui.thu];
  return (
    <SchoolPage
      section="edTimetablePage"
      path="/apps/education/timetable"
      tool="timetable"
      preview={
        <>
          <Tabs items={[ui.tabClass, ui.tabTeacher, ui.tabBell, ui.tabAuto, ui.tabSubs]} />
          <Panel>
            <div className="flex flex-wrap items-end gap-2">
              <div className="w-full max-w-xs">
                <Field label={ui.fSection} value={ui.sectionValue} select />
              </div>
              <Btn icon={<Printer className="h-3 w-3" />}>{ui.print}</Btn>
            </div>
            <p className="mt-2 text-[10.5px] text-muted-foreground">{ui.hint}</p>
            <div className="mt-2 overflow-x-auto">
              <div className="grid min-w-[40rem] grid-cols-[6.5rem_repeat(5,1fr)] gap-1.5 text-[10.5px]">
                <span />
                {days.map((d) => (
                  <span key={d} className="pb-1 text-center text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {d}
                  </span>
                ))}
                {grid.map(([period, time, lessons]) =>
                  period === "tiffin" ? (
                    <div key={period} className="col-span-6 flex items-center gap-3 rounded-lg bg-[var(--gray-bg)] px-2.5 py-1.5">
                      <span className="w-[5.5rem] shrink-0">
                        <b className="block font-semibold text-foreground">{ui.tiffin}</b>
                        <span className="text-[9.5px] text-muted-foreground">{time}</span>
                      </span>
                      <span className="flex-1 text-center italic text-muted-foreground">{ui.tiffin}</span>
                    </div>
                  ) : (
                    <div key={period} className="contents">
                      <span className="py-1">
                        <b className="block font-semibold text-foreground">
                          {ui.period} {period}
                        </b>
                        <span className="text-[9.5px] text-muted-foreground">{time}</span>
                      </span>
                      {lessons.map((lesson, i) =>
                        lesson ? (
                          <span key={i} className="rounded-lg border border-primary/25 bg-primary/8 px-2 py-1.5">
                            <b className="block truncate font-semibold text-foreground">{ui[lesson[0]]}</b>
                            <span className="block truncate text-[9.5px] text-muted-foreground">{lesson[1]}</span>
                          </span>
                        ) : (
                          <span key={i} className="grid place-items-center rounded-lg border border-dashed border-border py-1.5 text-primary">
                            +
                          </span>
                        ),
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </Panel>
        </>
      }
    />
  );
}
