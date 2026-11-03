/**
 * Adon ERP public site: /[locale]/apps/project-accounting/schedule
 * Copy lives in messages/*.json under pages.accountingShowcase.pjSchedule.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarRange, GanttChart, Gauge, ListTree } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, Stat, FormField } from "../_project";

/** DUMMY data. */
const tasks = [
  ["Site preparation", "05/01/2026", "05/31/2026", 100],
  ["Equipment delivery", "06/01/2026", "08/31/2026", 80],
  ["Installation", "09/01/2026", "11/30/2026", 10],
  ["Commissioning", "12/01/2026", "02/28/2027", 0],
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjSchedule", "schedule");
}

export default function SchedulePage() {
  return (
    <ProjectPage
      section="pjSchedule"
      slug="schedule"
      prefix="sc"
      appName="Schedule"
      tool="pjSchedule"
      features={[
        "A hierarchical task list (WBS) with planned dates and physical progress",
        "A lightweight Gantt timeline on every task",
        "Earned value: SPI for schedule and CPI for cost",
        "Parent tasks, weights, assignee, status and sort order on each task",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["pjOverview", "pjMilestones"] },
        { key: "after", tools: ["pjWip", "pjProgressBilling"] },
        { key: "shows", tools: ["pjPnl", "financialReports"] },
      ]}
      icons={[CalendarRange, GanttChart, Gauge, ListTree]}
      render={(ui) => ({
        main: (
          <>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Stat label={ui.physical} value="38%" />
              <Stat label={ui.planned} value="42%" />
              <Stat label={ui.spi} value="0.90" tone="text-amber-600 dark:text-amber-400" />
              <Stat label={ui.cpi} value="1.16" tone="text-[var(--teal)]" />
            </div>
            <Panel title={ui.title} count={4} action={ui.add} note={ui.note}>
              <MiniTable
                cols={[
                  { head: ui.thTask },
                  { head: ui.thStart, className: "hidden md:table-cell" },
                  { head: ui.thEnd, className: "hidden md:table-cell" },
                  { head: ui.thProg },
                  { head: ui.thTimeline, className: "hidden sm:table-cell" },
                ]}
                rows={tasks.map((t) => [
                  <span key="t" className="font-medium">{t[0]}</span>,
                  <span key="s" className="text-muted-foreground">{t[1]}</span>,
                  <span key="e" className="text-muted-foreground">{t[2]}</span>,
                  <span key="p">{t[3]}%</span>,
                  <span key="g" className="block h-1.5 w-28 rounded-full bg-muted">
                    <span className="block h-1.5 rounded-full bg-primary" style={{ width: `${t[3]}%` }} />
                  </span>,
                ])}
              />
            </Panel>
          </>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fName} />
              <FormField label={ui.fParent} value="—" kind="select" />
              <FormField label={ui.fStart} value="mm/dd/yyyy" />
              <FormField label={ui.fEnd} value="mm/dd/yyyy" />
              <FormField label={ui.fProgress} value="0" />
              <FormField label={ui.fWeight} />
              <FormField label={ui.fAssigned} />
              <FormField label={ui.fStatus} value="not_started" kind="select" />
            </>
          ),
        },
      })}
    />
  );
}
