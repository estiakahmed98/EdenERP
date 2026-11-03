/**
 * Adon ERP public site: /[locale]/apps/project-accounting/p-and-l
 * Copy lives in messages/*.json under pages.accountingShowcase.pjPnl.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { TrendingUp, Coins, BarChart3, Scale } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, KV } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjPnl", "p-and-l");
}

export default function ProjectPnlPage() {
  return (
    <ProjectPage
      section="pjPnl"
      slug="p-and-l"
      prefix="pl"
      appName="P&L"
      tool="pjPnl"
      features={[
        "Revenue from invoices (pre-VAT) and completed billable milestones",
        "Cost from direct bills, allocated bills, payroll, stock movements and talent fees",
        "Net profit and margin for the project",
        "Budget against actual, by category",
      ]}
      stepTones={["teal", "red", "blue"]}
      connectStructure={[
        { key: "before", tools: ["pjJobCost", "pjProgressBilling", "pjMilestones", "pjBillAllocations"] },
        { key: "after", tools: ["pjWip", "financialReports"] },
        { key: "shows", tools: ["ledgers", "accountingHub"] },
      ]}
      icons={[TrendingUp, Coins, BarChart3, Scale]}
      render={(ui) => ({
        main: (
          <div className="grid gap-3 sm:grid-cols-2">
            <Panel title={ui.revenue}>
              <KV
                rows={[
                  { label: ui.invoiced, value: "BDT 15,00,000" },
                  { label: ui.milestones, value: "BDT 10,00,000" },
                  { label: ui.totalRevenue, value: "BDT 25,00,000", bold: true },
                ]}
              />
            </Panel>
            <Panel title={ui.cost}>
              <KV
                rows={[
                  { label: ui.direct, value: "BDT 12,00,000" },
                  { label: ui.allocated, value: "BDT 1,00,000" },
                  { label: ui.directSub, value: "BDT 13,00,000", bold: true },
                  { label: ui.payroll, value: "BDT 3,50,000" },
                  { label: ui.stock, value: "BDT 1,50,000" },
                  { label: ui.indirectSub, value: "BDT 5,00,000", bold: true },
                  { label: ui.totalCost, value: "BDT 18,00,000", bold: true },
                ]}
              />
            </Panel>
            <Panel title={ui.net}>
              <KV
                rows={[
                  { label: ui.netProfit, value: "BDT 7,00,000", bold: true, tone: "text-[var(--teal)]" },
                  { label: ui.marginLabel, value: "28%" },
                ]}
              />
            </Panel>
            <Panel title={ui.bva}>
              <MiniTable
                cols={[{ head: ui.thCategory }, { head: ui.thBudget, align: "end" }, { head: ui.thActual, align: "end" }]}
                rows={[
                  [ui.catMaterials, "27,00,000", "9,50,000"],
                  [ui.catSub, "7,00,000", "2,50,000"],
                  [ui.catLabour, "6,00,000", "3,50,000"],
                  [ui.catOther, "5,00,000", "2,50,000"],
                  [<b key="t">{ui.totalBudget}</b>, <b key="b">45,00,000</b>, <b key="a">18,00,000</b>],
                ]}
              />
            </Panel>
          </div>
        ),
      })}
    />
  );
}
