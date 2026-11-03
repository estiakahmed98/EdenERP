/**
 * Adon ERP public site: /apps/sales/crm/activities/tasks
 * Copy lives in messages/*.json under pages.accountingShowcase.crTasksPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Bell, CalendarCheck, Mail, Phone, Users } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: bucket key, then tasks as [type, text, linked to, time, done]. */
const buckets: [string, string, [string, string, string, string, boolean][]][] = [
  ["bOverdue", "text-destructive", [["call", "Call back about the 5-ply sample", "Maximo International", "Yesterday", false]]],
  [
    "bToday",
    "text-primary",
    [
      ["meeting", "Price review with the merchandiser", "Ananta Apparels", "11:00", false],
      ["email", "Send the revised quote", "Square Fashions", "14:00", true],
      ["call", "Confirm the delivery slot", "Babylon Group", "16:30", false],
    ],
  ],
  ["bUpcoming", "text-muted-foreground", [["meeting", "Quarterly business review", "Viyellatex Group", "Thu 10:00", false]]],
];
const icon = { call: Phone, meeting: Users, email: Mail } as const;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crTasksPage", "/apps/sales/crm/activities/tasks");
}

export default function TasksPage() {
  return (
    <HrPage
      section="crTasksPage"
      path="/apps/sales/crm/activities/tasks"
      prefix="task"
      appName="Tasks"
      tool="crTasks"
      group="crActivitiesG"
      features={[
        "Calls, meetings, emails and reminders in one list",
        "Overdue, today and upcoming, in that order",
        "Each task linked to a lead, an account or a deal",
        "A reminder before it is due",
        "Done tasks kept on the record's timeline",
      ]}
      stepTones={["red", "purple", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crLeads", "crDeals"] },
        { key: "after", tools: ["crVisits", "crSequences"] },
        { key: "shows", tools: ["cr360", "crScorecard"] },
      ]}
      icons={[CalendarCheck, Bell, Phone, Users]}
      render={(ui) => (
        <Card title={ui.myTasks} right={<Chip tone="primary">{ui.newTask}</Chip>}>
          <div className="space-y-3">
            {buckets.map(([key, color, tasks]) => (
              <div key={key}>
                <p className={`text-[10px] font-semibold uppercase tracking-wide ${color}`}>
                  {ui[key]} · {tasks.length}
                </p>
                <ul className="mt-1 divide-y divide-border rounded-lg border border-border">
                  {tasks.map(([type, text, link, time, done]) => {
                    const Icon = icon[type as keyof typeof icon];
                    return (
                      <li key={text} className="flex items-center gap-2.5 px-3 py-2 text-[11px]">
                        <span className={`h-3.5 w-3.5 shrink-0 rounded border ${done ? "border-[var(--teal)] bg-[var(--teal)]" : "border-border"}`} aria-hidden="true" />
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className={`min-w-0 flex-1 truncate ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>{text}</span>
                        <span className="hidden truncate text-[10px] text-primary sm:block">{link}</span>
                        <span className="w-16 shrink-0 text-end tabular-nums text-muted-foreground">{time}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    />
  );
}
