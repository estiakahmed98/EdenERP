/**
 * Adon ERP public site: /apps/engineering-maintenance/pm-schedules
 * Copy lives in messages/*.json under pages.accountingShowcase.emPmPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, Check, ClipboardList, Gauge, Repeat } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

const weeks = ["W44", "W45", "W46", "W47", "W48", "W49", "W50", "W51"];
/** DUMMY data: [machine, plan, a mark per week: d done, o overdue, p planned, blank none]. */
const plans: [string, string, string][] = [
  ["IM-01", "Monthly", "d   p   "],
  ["IM-04", "Monthly", "o   p   "],
  ["PP-02", "Every 2 weeks", "d p p p "],
  ["AC-01", "Every 500 h", "  d    p"],
  ["BL-01", "Quarterly", " p      "],
  ["FL-02", "Every 250 h", "d  p  p "],
  ["CH-01", "Weekly", "dppppppp"],
];
const cell: Record<string, string> = {
  d: "bg-[var(--teal)] text-white",
  o: "bg-destructive text-white",
  p: "bg-primary/15 text-primary ring-1 ring-primary/40",
};

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emPmPage", "/apps/engineering-maintenance/pm-schedules");
}

export default function PmSchedulesPage() {
  return (
    <HrPage
      section="emPmPage"
      path="/apps/engineering-maintenance/pm-schedules"
      prefix="pm"
      appName="PM Schedules"
      tool="emPm"
      group="maint"
      features={[
        "Preventive maintenance by calendar, running hours or counter",
        "A checklist and the spare parts each plan needs",
        "Work orders raised on their own when a plan falls due",
        "Overdue plans flagged before the machine fails",
        "Compliance: planned against done, by month",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment", "emSpares"] },
        { key: "after", tools: ["emWorkOrders"] },
        { key: "shows", tools: ["emOverview", "emDowntime"] },
      ]}
      icons={[Repeat, Gauge, ClipboardList, CalendarClock]}
      render={(ui) => (
        <Card
          title={ui.planTitle}
          right={
            <span className="flex gap-1.5">
              <Chip tone="teal">{ui.compliance}</Chip>
              <Chip tone="red">{ui.overdue}</Chip>
            </span>
          }
        >
          <div className="overflow-x-auto">
            <div className="grid min-w-[34rem] grid-cols-[4rem_7rem_repeat(8,1fr)] gap-1 text-[10.5px]">
              <span className="text-[9.5px] font-semibold uppercase text-muted-foreground">{ui.machine}</span>
              <span className="text-[9.5px] font-semibold uppercase text-muted-foreground">{ui.plan}</span>
              {weeks.map((w, i) => (
                <span key={w} className={`text-center text-[9.5px] font-semibold ${i === 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {w}
                </span>
              ))}
              {plans.map(([m, plan, marks]) => (
                <div key={m} className="contents">
                  <span className="font-mono font-semibold text-foreground">{m}</span>
                  <span className="truncate text-muted-foreground">{plan}</span>
                  {marks.split("").map((c, i) => (
                    <span key={i} className={`grid h-6 place-items-center rounded text-[10px] font-bold ${c.trim() ? cell[c] : i === 1 ? "bg-primary/5" : "bg-[var(--gray-bg)]"}`}>
                      {c === "d" ? <Check className="h-3 w-3" /> : c === "o" ? "!" : ""}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 flex flex-wrap gap-x-4 text-[10px] text-muted-foreground">
            <span>{ui.legendDone}</span>
            <span>{ui.legendPlanned}</span>
            <span>{ui.legendOverdue}</span>
          </p>
        </Card>
      )}
    />
  );
}
