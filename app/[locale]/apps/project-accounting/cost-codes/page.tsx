/**
 * Adon ERP public site: /[locale]/apps/project-accounting/cost-codes
 * Copy lives in messages/*.json under pages.accountingShowcase.pjCostCodes.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ListTree, Layers, Tags, ClipboardList } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, Pill, mono } from "../_project";

/** DUMMY data. */
const codes = [
  ["01", "Preliminaries"],
  ["02", "Civil works"],
  ["03", "Equipment & machinery"],
  ["03-100", "Conveyor and sorting line"],
  ["04", "Electrical & controls"],
  ["05", "Commissioning"],
];

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjCostCodes", "cost-codes");
}

export default function CostCodesPage() {
  return (
    <ProjectPage
      section="pjCostCodes"
      slug="cost-codes"
      prefix="cc"
      appName="Cost Codes"
      tool="pjCostCodes"
      features={[
        "Cost codes as the job-costing backbone, a WBS or phase dimension",
        "Nested codes, with a parent and a sort order",
        "Active and inactive codes, with notes",
        "Budgets and postings tagged to a cost code, so Job Cost becomes a code by cost-type matrix",
      ]}
      stepTones={["blue", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["pjOverview"] },
        { key: "after", tools: ["pjBudgets", "pjJobCost", "billsAp"] },
        { key: "shows", tools: ["pjPnl", "pjWip"] },
      ]}
      icons={[ListTree, Layers, Tags, ClipboardList]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={6} action={ui.add} note={ui.note}>
            <MiniTable
              cols={[{ head: ui.thCode }, { head: ui.thName }, { head: ui.thActive }]}
              rows={codes.map((c) => [
                <span key="c" className={mono}>{c[0]}</span>,
                <span key="n" className={c[0].includes("-") ? "ps-4" : "font-medium"}>{c[1]}</span>,
                <Pill key="a" tone="teal">{ui.yes}</Pill>,
              ])}
            />
          </Panel>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fCode} />
              <FormField label={ui.fName} />
              <FormField label={ui.fParent} value="—" kind="select" />
              <FormField label={ui.fSort} value="0" />
              <FormField label={ui.fActive} value={ui.active} kind="select" />
              <FormField label={ui.fNotes} kind="area" />
            </>
          ),
        },
      })}
    />
  );
}
