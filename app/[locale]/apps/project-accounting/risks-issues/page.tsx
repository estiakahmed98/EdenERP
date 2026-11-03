/**
 * Adon ERP public site: /[locale]/apps/project-accounting/risks-issues
 * Copy lives in messages/*.json under pages.accountingShowcase.pjRisks.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ShieldAlert, TriangleAlert, UserRound, ClipboardCheck } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, Pill } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjRisks", "risks-issues");
}

export default function RisksIssuesPage() {
  return (
    <ProjectPage
      section="pjRisks"
      slug="risks-issues"
      prefix="ri"
      appName="Risks & Issues"
      tool="pjRisks"
      features={[
        "A risk register with category, probability, impact, owner and status",
        "A separate issue log with severity, owner, status and resolution",
        "A mitigation plan written on each risk",
        "Open, closed and in-progress statuses",
      ]}
      stepTones={["amber", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["pjOverview"] },
        { key: "after", tools: ["pjSchedule", "pjChangeOrders"] },
        { key: "shows", tools: ["pjWip", "pjPnl"] },
      ]}
      icons={[ShieldAlert, TriangleAlert, UserRound, ClipboardCheck]}
      render={(ui) => ({
        main: (
          <>
            <Panel title={ui.risksTitle} count={2} action={ui.add}>
              <MiniTable
                cols={[
                  { head: ui.thRisk },
                  { head: ui.thCategory, className: "hidden sm:table-cell" },
                  { head: ui.thProb },
                  { head: ui.thImpact },
                  { head: ui.thOwner, className: "hidden md:table-cell" },
                  { head: ui.thStatus },
                ]}
                rows={[
                  ["Imported PLC held at customs", "supply", <Pill key="a" tone="amber">{ui.high}</Pill>, <Pill key="b" tone="amber">{ui.medium}</Pill>, "Purchasing", <Pill key="c" tone="blue">{ui.open}</Pill>],
                  ["Power cut during commissioning", "site", <Pill key="d" tone="muted">{ui.low}</Pill>, <Pill key="e" tone="red">{ui.highImpact}</Pill>, "Plant manager", <Pill key="f" tone="blue">{ui.open}</Pill>],
                ]}
              />
            </Panel>
            <Panel title={ui.issuesTitle} count={1} action={ui.add}>
              <MiniTable
                cols={[{ head: ui.thIssue }, { head: ui.thSeverity }, { head: ui.thOwner, className: "hidden md:table-cell" }, { head: ui.thStatus }]}
                rows={[["Cracks in floor near line 2", <Pill key="g" tone="amber">{ui.medium}</Pill>, "Site engineer", <Pill key="h" tone="blue">{ui.open}</Pill>]]}
              />
            </Panel>
          </>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fTitle} />
              <FormField label={ui.fCategory} />
              <FormField label={ui.fProb} value="medium" kind="select" />
              <FormField label={ui.fImpact} value="medium" kind="select" />
              <FormField label={ui.fOwner} />
              <FormField label={ui.fStatus} value="open" kind="select" />
              <FormField label={ui.fMitigation} kind="area" />
            </>
          ),
        },
      })}
    />
  );
}
