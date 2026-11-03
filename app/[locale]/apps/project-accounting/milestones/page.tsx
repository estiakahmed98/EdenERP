/**
 * Adon ERP public site: /[locale]/apps/project-accounting/milestones
 * Copy lives in messages/*.json under pages.accountingShowcase.pjMilestones.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Flag, CalendarCheck, Receipt, Target } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, Pill } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjMilestones", "milestones");
}

export default function MilestonesPage() {
  return (
    <ProjectPage
      section="pjMilestones"
      slug="milestones"
      prefix="ms"
      appName="Milestones"
      tool="pjMilestones"
      features={[
        "Milestones with a name, description and target date",
        "Pending and completed statuses",
        "A billable amount on each milestone, for milestone billing",
        "Invoiced amount shown beside the billable amount",
        "Completed milestones feed project revenue",
      ]}
      stepTones={["amber", "teal", "blue"]}
      connectStructure={[
        { key: "before", tools: ["pjSchedule", "pjOverview"] },
        { key: "after", tools: ["invoicesAr", "pjProgressBilling"] },
        { key: "shows", tools: ["pjPnl", "pjWip"] },
      ]}
      icons={[Flag, CalendarCheck, Receipt, Target]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={3} action={ui.add}>
            <MiniTable
              cols={[
                { head: ui.thName },
                { head: ui.thTarget, className: "hidden sm:table-cell" },
                { head: ui.thStatus },
                { head: ui.thBillable, align: "end" },
                { head: ui.thInvoiced, align: "end" },
              ]}
              rows={[
                ["Equipment delivered", "08/31/2026", <Pill key="a" tone="teal">{ui.completed}</Pill>, "10,00,000", "10,00,000"],
                ["Line installed", "11/30/2026", <Pill key="b" tone="amber">{ui.pending}</Pill>, "15,00,000", "0"],
                ["Commissioning complete", "02/28/2027", <Pill key="c" tone="amber">{ui.pending}</Pill>, "10,00,000", "0"],
              ]}
            />
          </Panel>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fName} />
              <FormField label={ui.fDesc} kind="area" />
              <FormField label={ui.fTarget} value="mm/dd/yyyy" />
              <FormField label={ui.fStatus} value="pending" kind="select" />
              <FormField label={ui.fBillable} />
              <FormField label={ui.fSort} value="0" />
            </>
          ),
        },
      })}
    />
  );
}
