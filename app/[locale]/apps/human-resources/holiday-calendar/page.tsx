/**
 * Adon ERP public site: /apps/human-resources/holiday-calendar
 * Copy lives in messages/*.json under pages.accountingShowcase.hrHolidayPage.
 * ALL DATA ON THIS PAGE IS DUMMY: the company holidays are sample entries.
 */
import type { Metadata } from "next";
import { CalendarHeart, CalendarPlus, Flag, Repeat } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../_hr";

/** December 2026 starts on a Tuesday. Fridays are the weekly holiday in this sample. */
const firstWeekday = 2; // 0 = Sunday
const daysInMonth = 31;
const holidays: Record<number, HrTone> = { 16: "primary", 25: "teal", 31: "brown" };
const list: [string, string, string, HrTone][] = [
  ["16 Dec", "Victory Day", "kindNational", "primary"],
  ["25 Dec", "Christmas Day", "kindPublic", "teal"],
  ["31 Dec", "Year-end stock count", "kindCompany", "brown"],
  ["21 Feb", "International Mother Language Day", "kindNational", "primary"],
  ["26 Mar", "Independence Day", "kindNational", "primary"],
];
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrHolidayPage", "/apps/human-resources/holiday-calendar");
}

export default function HolidayCalendarPage() {
  const cells = [...Array.from({ length: firstWeekday }, () => 0), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const tone: Record<HrTone, string> = {
    primary: "bg-primary text-white",
    teal: "bg-[var(--teal)] text-white",
    brown: "bg-[var(--chart-4)] text-white",
    navy: "",
    sky: "",
    red: "",
    muted: "",
  };

  return (
    <HrPage
      section="hrHolidayPage"
      path="/apps/human-resources/holiday-calendar"
      prefix="hol"
      appName="Holiday Calendar"
      tool="hrHolidays"
      group="time"
      features={[
        "National, public and company holidays for the year",
        "A weekly holiday set for the company or for each crew",
        "Holidays that move with the moon entered once the date is known",
        "Holiday work paid at the rate set in policy",
        "The same calendar used by attendance and leave",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrShifts"] },
        { key: "after", tools: ["hrAttendance", "hrLeaveApps", "hrPayrollRuns"] },
        { key: "shows", tools: ["epLeaves", "epAttendance"] },
      ]}
      icons={[Flag, CalendarHeart, Repeat, CalendarPlus]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={ui.month} right={<Chip tone="muted">{ui.friday}</Chip>}>
            <div className="grid grid-cols-7 gap-1 text-center text-[10.5px]">
              {week.map((d) => (
                <span key={d} className={`pb-1 text-[9.5px] font-semibold ${d === "Fri" ? "text-destructive" : "text-muted-foreground"}`}>
                  {d}
                </span>
              ))}
              {cells.map((day, i) => {
                const h = holidays[day];
                const friday = i % 7 === 5;
                return (
                  <span
                    key={i}
                    className={`grid h-8 place-items-center rounded-md tabular-nums ${
                      day === 0 ? "" : h ? `${tone[h]} font-semibold` : friday ? "bg-destructive/8 text-destructive" : "bg-[var(--gray-bg)] text-foreground"
                    }`}
                  >
                    {day || ""}
                  </span>
                );
              })}
            </div>
          </Card>
          <Card className="lg:col-span-5" title={ui.upcoming} right={<Chip tone="primary">{ui.add}</Chip>}>
            <ul className="space-y-2">
              {list.map(([date, name, kind, t]) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 rounded-md border border-border py-1 text-center text-[10px] font-semibold leading-tight text-foreground">{date}</span>
                  <span className="min-w-0 flex-1 truncate text-[11px] text-foreground">{name}</span>
                  <Chip tone={t}>{ui[kind]}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
