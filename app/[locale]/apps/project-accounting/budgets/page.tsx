/**
 * Adon ERP public site: /[locale]/apps/project-accounting/budgets
 * Copy lives in messages/*.json under pages.accountingShowcase.pjBudgets.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Wallet, Layers, CalendarRange, TrendingUp } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, mono, money } from "../_project";

/** DUMMY data. Budget lines add up to the project cap of 45,00,000. */
const lines = [
  ["03", "material", "Conveyor and sorting line", "18,00,000", "7,00,000", "05/01/2026"],
  ["04", "material", "PLC panels and cabling", "9,00,000", "2,50,000", "05/15/2026"],
  ["02", "subcontract", "Floor and foundation works", "7,00,000", "2,50,000", "05/01/2026"],
  ["05", "labour", "Installation crew", "6,00,000", "0", "09/01/2026"],
  ["01", "other", "Site setup and permits", "5,00,000", "0", "05/01/2026"],
];

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjBudgets", "budgets");
}

export default function BudgetsPage() {
  return (
    <ProjectPage
      section="pjBudgets"
      slug="budgets"
      prefix="bu"
      appName="Budgets"
      tool="pjBudgets"
      features={[
        "Budget lines per cost code and cost type, with a description",
        "Budget and actual side by side on every line",
        "Optional period start and end dates",
        "A category for non-construction projects",
        "The cost type (labour, material, equipment, subcontract, other) set per budget line",
      ]}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["pjCostCodes", "pjOverview"] },
        { key: "after", tools: ["pjJobCost", "pjChangeOrders"] },
        { key: "shows", tools: ["pjPnl", "pjWip", "financialReports"] },
      ]}
      icons={[Wallet, Layers, CalendarRange, TrendingUp]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={5} action={ui.add}>
            <MiniTable
              cols={[
                { head: ui.thCode },
                { head: ui.thType, className: "hidden sm:table-cell" },
                { head: ui.thDesc },
                { head: ui.thBudget, align: "end" },
                { head: ui.thActual, align: "end" },
                { head: ui.thStart, className: "hidden xl:table-cell" },
              ]}
              rows={lines.map((l) => [
                <span key="c" className={mono}>{l[0]}</span>,
                <span key="t" className="text-muted-foreground">{l[1]}</span>,
                <span key="d" className="block max-w-[9rem] truncate">{l[2]}</span>,
                <span key="b" className={money}>{l[3]}</span>,
                <span key="a" className={money}>{l[4]}</span>,
                <span key="s" className="text-muted-foreground">{l[5]}</span>,
              ])}
            />
          </Panel>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fCostCode} value="—" kind="select" />
              <FormField label={ui.fCostType} value="—" kind="select" />
              <FormField label={ui.fCategory} value="materials" kind="select" />
              <FormField label={ui.fDesc} />
              <FormField label={ui.fAmount} />
              <FormField label={ui.fStart} value="mm/dd/yyyy" />
              <FormField label={ui.fEnd} value="mm/dd/yyyy" />
            </>
          ),
        },
      })}
    />
  );
}
