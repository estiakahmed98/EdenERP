/**
 * Adon ERP public site: /apps/employee-portal/my-attendance
 * Copy lives in messages/*.json under pages.accountingShowcase.epAttendancePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Clock, Fingerprint, MapPin, TimerReset } from "lucide-react";

import { Card, HrPage, Stat, hrMetadata } from "../../human-resources/_hr";

/** October 2026 starts on a Thursday. P present, L late, A absent, V leave, W weekly holiday. */
const firstWeekday = 4;
const exceptions: Record<number, string> = { 6: "L", 19: "V", 20: "V", 26: "A", 31: "L" };
const marks = Array.from({ length: 31 }, (_, i) => ((firstWeekday + i) % 7 === 5 ? "W" : (exceptions[i + 1] ?? "P"))).join("");
const tone: Record<string, string> = {
  P: "bg-[var(--teal)] text-white",
  L: "bg-[var(--chart-4)] text-white",
  A: "bg-destructive text-white",
  V: "bg-[var(--chart-5)] text-white",
  W: "bg-muted text-muted-foreground",
};
const punches: [string, string, string, string][] = [
  ["Sat 31 Oct", "09:14", "18:03", "8h 49m"],
  ["Thu 29 Oct", "08:52", "17:41", "8h 49m"],
  ["Wed 28 Oct", "08:47", "17:35", "8h 48m"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("epAttendancePage", "/apps/employee-portal/my-attendance");
}

export default function MyAttendancePage() {
  const cells = [...Array.from({ length: firstWeekday }, () => ""), ...marks.split("")];
  const count = (c: string) => marks.split("").filter((m) => m === c).length;

  return (
    <HrPage
      section="epAttendancePage"
      path="/apps/employee-portal/my-attendance"
      prefix="myatt"
      appName="My Attendance"
      tool="epAttendance"
      group="portal"
      features={[
        "Every day of the month marked present, late, absent or on leave",
        "In and out times from the machine or the phone",
        "Late minutes and overtime worked out against the shift",
        "A correction request when a punch is missing",
        "The same record payroll uses",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrShifts", "hrHolidays"] },
        { key: "after", tools: ["hrAttendance", "hrPayrollRuns"] },
        { key: "shows", tools: ["epPayslips", "epLeaves"] },
      ]}
      icons={[Fingerprint, Clock, TimerReset, MapPin]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.present} value={String(count("P") + count("L"))} tone="teal" />
            <Stat label={ui.late} value={String(count("L"))} tone="brown" />
            <Stat label={ui.absent} value={String(count("A"))} tone="red" />
            <Stat label={ui.leave} value={String(count("V"))} tone="sky" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-6" title={ui.month}>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i} className="text-[9.5px] font-semibold text-muted-foreground">
                    {d}
                  </span>
                ))}
                {cells.map((m, i) => (
                  <span key={i} className={`grid h-6 place-items-center rounded tabular-nums ${m ? tone[m] : ""}`}>
                    {m ? i - firstWeekday + 1 : ""}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="lg:col-span-6" title={ui.punches}>
              <ul className="divide-y divide-border">
                {punches.map(([day, inT, outT, dur]) => (
                  <li key={day} className="grid grid-cols-4 py-1.5 text-[11px]">
                    <span className="text-foreground">{day}</span>
                    <span className="flex items-center gap-1 tabular-nums text-[var(--teal)]"><ArrowDownRight className="h-3 w-3" aria-hidden="true" />{inT}</span>
                    <span className="flex items-center gap-1 tabular-nums text-primary"><ArrowUpRight className="h-3 w-3" aria-hidden="true" />{outT}</span>
                    <span className="text-end tabular-nums text-muted-foreground">{dur}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-2.5 block rounded-md border border-dashed border-primary/40 px-3 py-1.5 text-center text-[10.5px] text-primary">{ui.correction}</span>
            </Card>
          </div>
        </>
      )}
    />
  );
}
