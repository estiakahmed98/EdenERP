/**
 * Adon ERP public site: /[locale]/apps/project-accounting/projects
 * Copy lives in messages/*.json under pages.accountingShowcase.projects.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Briefcase, CalendarRange, Coins, Layers } from "lucide-react";
import { ProjectPage, projectMetadata, Stat } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("projects", "projects");
}

export default function ProjectsPage() {
  return (
    <ProjectPage
      section="projects"
      slug="projects"
      prefix="pj"
      appName="Projects"
      tool="pjOverview"
      features={[
        "A project record with type, budget method, status, start and end dates and currency",
        "A total budget cap and the contracted revenue on every project",
        "Fourteen tabs on one project: cost codes, budgets, job cost, change orders, WIP, billing, schedule and more",
        "Every figure ties back to the same books as the rest of Adon ERP",
      ]}
      stepTones={["teal", "blue", "amber"]}
      connectStructure={[
        { key: "before", tools: ["customers", "chartOfAccounts"] },
        { key: "after", tools: ["pjCostCodes", "pjBudgets", "pjSchedule"] },
        { key: "shows", tools: ["pjPnl", "pjWip", "financialReports"] },
      ]}
      icons={[Briefcase, CalendarRange, Coins, Layers]}
      render={(ui) => ({
        main: (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Stat label={ui.type} value="rd_capex" />
              <Stat label={ui.budgetMethod} value="cost_plus" />
              <Stat label={ui.status} value="active" />
              <Stat label={ui.start} value="01/05/2026" />
              <Stat label={ui.end} value="03/01/2027" />
              <Stat label={ui.currency} value="BDT" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Stat label={ui.totalBudget} value="BDT 45,00,000.00" />
              <Stat label={ui.totalRevenue} value="BDT 52,00,000.00" />
            </div>
          </>
        ),
      })}
    />
  );
}
