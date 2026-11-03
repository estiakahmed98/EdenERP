/**
 * Adon ERP public site: /apps/human-resources/leave-applications
 * Copy lives in messages/*.json under pages.accountingShowcase.hrLeaveAppsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarCheck2, CalendarX2, Send, UsersRound } from "lucide-react";

import { Avatar, Chip, HrPage, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data per column: [employee, leave type key, dates, days]. */
const columns: { key: string; tone: HrTone; cards: [string, string, string, number][] }[] = [
  {
    key: "colPending",
    tone: "brown",
    cards: [
      ["Rafiqul Islam", "earned", "12–15 Nov", 4],
      ["Sadia Rahman", "casual", "9 Nov", 1],
      ["Kamal Uddin", "sick", "7–8 Nov", 2],
    ],
  },
  {
    key: "colApproved",
    tone: "teal",
    cards: [
      ["Nusrat Jahan", "casual", "5 Nov", 1],
      ["Tanvir Hasan", "earned", "18–22 Nov", 5],
    ],
  },
  {
    key: "colRejected",
    tone: "red",
    cards: [["Jahid Hasan", "casual", "31 Dec", 1]],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrLeaveAppsPage", "/apps/human-resources/leave-applications");
}

export default function LeaveApplicationsPage() {
  return (
    <HrPage
      section="hrLeaveAppsPage"
      path="/apps/human-resources/leave-applications"
      prefix="lapp"
      appName="Leave Applications"
      tool="hrLeaveApps"
      group="time"
      features={[
        "Leave applied for from the portal or by HR",
        "The balance shown before the request is sent",
        "Approval by the line manager, then HR if needed",
        "Clashes with the team and with holidays shown",
        "Approved leave carried to attendance and payroll",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["hrLeaveTypes", "epLeaves"] },
        { key: "after", tools: ["hrApprovals", "hrAttendance", "hrPayrollRuns"] },
        { key: "shows", tools: ["hrReports"] },
      ]}
      icons={[Send, UsersRound, CalendarCheck2, CalendarX2]}
      render={(ui) => (
        <div className="grid gap-3 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.key} className="rounded-xl bg-[var(--gray-bg)] p-2.5">
              <p className="flex items-center justify-between px-1 pb-2 text-[11px] font-semibold text-foreground">
                {ui[col.key]}
                <Chip tone={col.tone}>{col.cards.length}</Chip>
              </p>
              <ul className="space-y-2">
                {col.cards.map(([name, type, dates, days], i) => (
                  <li key={name} className="rounded-lg border border-border bg-card p-2.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Avatar name={name} size={22} tone={i + 1} />
                      <span className="truncate text-[11px] font-medium text-foreground">{name}</span>
                    </div>
                    <p className="mt-1.5 flex items-center justify-between text-[10.5px] text-muted-foreground">
                      <span>{ui[type]}</span>
                      <span className="tabular-nums">
                        {dates} · {days} {ui.days}
                      </span>
                    </p>
                    {col.key === "colPending" && i === 0 && <p className="mt-1.5 rounded bg-[var(--chart-4)]/10 px-2 py-1 text-[9.5px] text-[var(--chart-4)]">{ui.clash}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    />
  );
}
