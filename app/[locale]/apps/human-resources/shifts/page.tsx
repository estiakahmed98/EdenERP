/**
 * Adon ERP public site: /apps/human-resources/shifts
 * Copy lives in messages/*.json under pages.accountingShowcase.hrShiftsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarDays, Clock3, MoonStar, RotateCw } from "lucide-react";

import { Card, Chip, HrPage, barTone, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [shift, start hour, end hour, headcount, tone]. Night runs past midnight. */
const shifts: [string, number, number, number, HrTone][] = [
  ["General", 9, 18, 46, "navy"],
  ["Shift A", 6, 14, 58, "primary"],
  ["Shift B", 14, 22, 52, "teal"],
  ["Shift C", 22, 30, 38, "sky"],
];
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
/** Weekly roster of one line: which shift each crew works, and a dash for the weekly day off. */
const roster: [string, string[]][] = [
  ["Crew 1", ["A", "A", "A", "A", "A", "A", "–"]],
  ["Crew 2", ["B", "B", "B", "B", "B", "–", "B"]],
  ["Crew 3", ["C", "C", "C", "C", "–", "C", "C"]],
];
const cellTone: Record<string, string> = { A: "bg-primary text-white", B: "bg-[var(--teal)] text-white", C: "bg-[var(--chart-5)] text-white", "–": "bg-muted text-muted-foreground" };

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrShiftsPage", "/apps/human-resources/shifts");
}

export default function ShiftsPage() {
  return (
    <HrPage
      section="hrShiftsPage"
      path="/apps/human-resources/shifts"
      prefix="shift"
      appName="Shifts"
      tool="hrShifts"
      group="time"
      features={[
        "Shifts with a start, an end and a grace period",
        "Night shifts that run past midnight",
        "Weekly rosters by crew or by person",
        "A weekly day off that can differ by crew",
        "Late, early leave and overtime measured against the shift",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrDepartments", "hrHolidays"] },
        { key: "after", tools: ["hrAttendance", "hrPayrollRuns"] },
        { key: "shows", tools: ["epAttendance", "hrReports"] },
      ]}
      icons={[Clock3, MoonStar, CalendarDays, RotateCw]}
      render={(ui) => (
        <>
          <Card title={ui.dayTitle}>
            <div className="relative ps-[4.5rem]">
              <div className="flex justify-between text-[9px] tabular-nums text-muted-foreground" aria-hidden="true">
                {[0, 4, 8, 12, 16, 20, 24].map((h) => (
                  <span key={h}>{String(h).padStart(2, "0")}:00</span>
                ))}
              </div>
            </div>
            <ul className="mt-1.5 space-y-1.5">
              {shifts.map(([name, start, end, count, tone]) => {
                const parts = end > 24 ? [[start, 24], [0, end - 24]] : [[start, end]];
                return (
                  <li key={name} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-[10.5px] font-medium text-foreground">{name}</span>
                    <span className="relative h-6 flex-1 rounded-md bg-[var(--gray-bg)]">
                      {parts.map(([a, b]) => (
                        <span
                          key={a}
                          className={`absolute inset-y-0.5 flex items-center justify-center rounded text-[9.5px] font-semibold text-white ${barTone[tone]}`}
                          style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%` }}
                        >
                          {a === start && `${count} ${ui.people}`}
                        </span>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card title={ui.rosterTitle} right={<Chip tone="primary">{ui.week}</Chip>}>
            <div className="grid grid-cols-[4.5rem_repeat(7,1fr)] gap-1 text-center text-[10px]">
              <span />
              {days.map((d) => (
                <span key={d} className="font-semibold text-muted-foreground">
                  {d}
                </span>
              ))}
              {roster.map(([crew, cells]) => (
                <div key={crew} className="contents">
                  <span className="text-start text-[10.5px] text-foreground">{crew}</span>
                  {cells.map((c, i) => (
                    <span key={i} className={`rounded py-1 font-semibold ${cellTone[c]}`}>
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    />
  );
}
