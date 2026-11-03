/**
 * Adon ERP public site: /apps/human-resources/projects
 * Copy lives in messages/*.json under pages.accountingShowcase.hrProjectsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Briefcase, Clock4, Percent, Split } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrColors, hrMetadata } from "../_hr";

const projects = ["Line Automation", "ERP Roll-out", "New Mould Shop"];
/** DUMMY data: [employee, share of time on each project %, rest is regular work]. */
const people: [string, number[]][] = [
  ["Arif Chowdhury", [60, 20, 0]],
  ["Shamima Akter", [10, 50, 0]],
  ["Kamal Uddin", [40, 0, 40]],
  ["Tanvir Hasan", [0, 30, 20]],
  ["Sadia Rahman", [0, 0, 70]],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrProjectsPage", "/apps/human-resources/projects");
}

export default function HrProjectsPage() {
  return (
    <HrPage
      section="hrProjectsPage"
      path="/apps/human-resources/projects"
      prefix="hrproj"
      appName="Projects"
      tool="hrProjects"
      group="org"
      features={[
        "People assigned to projects with a share of their time",
        "Allocation over 100% flagged",
        "Salary cost split by project from the same shares",
        "Project cost sent to Project Accounting",
        "A person's projects kept in the service record",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "pjOverview"] },
        { key: "after", tools: ["hrPayrollRuns", "pjJobCost"] },
        { key: "shows", tools: ["pjPnl", "hrReports"] },
      ]}
      icons={[Briefcase, Percent, Split, Clock4]}
      render={(ui) => (
        <Card
          title={ui.allocTitle}
          right={
            <span className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
              {projects.map((p, i) => (
                <span key={p} className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: hrColors[i] }} aria-hidden="true" />
                  {p}
                </span>
              ))}
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-muted" aria-hidden="true" />
                {ui.regular}
              </span>
            </span>
          }
        >
          <ul className="space-y-2">
            {people.map(([name, shares], i) => {
              const used = shares.reduce((a, b) => a + b, 0);
              return (
                <li key={name} className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <Avatar name={name} size={22} tone={i} />
                    <span className="truncate text-[11px] text-foreground">{name}</span>
                  </span>
                  <span className="flex h-5 overflow-hidden rounded-md bg-muted" aria-hidden="true">
                    {shares.map((s, j) =>
                      s ? (
                        <span key={j} className="flex items-center justify-center text-[9px] font-semibold text-white" style={{ width: `${s}%`, background: hrColors[j] }}>
                          {s}%
                        </span>
                      ) : null,
                    )}
                  </span>
                  <span className="text-end">
                    <Chip tone={used >= 80 ? "brown" : "teal"}>{used}%</Chip>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-border pt-2 text-[10.5px] text-muted-foreground">{ui.costNote}</p>
        </Card>
      )}
    />
  );
}
