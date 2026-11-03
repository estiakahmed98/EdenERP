/**
 * Adon ERP public site: /apps/budget-management/requisitions
 * Copy lives in messages/*.json under pages.accountingShowcase.bmRequisitions.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardList, Wallet, UserRound, Stamp } from "lucide-react";
import { BudgetPage, budgetMetadata, Avatar, Chip, taka } from "../_budget";

/** DUMMY data: [number, type, title, department, prepared by, total in lakh taka, priority stars]. */
const columns: { key: string; cards: [string, string, string, string, string, number, number][] }[] = [
  { key: "colDraft", cards: [["REQ-014", "opex", "Office stationery, Q4", "Administration", "S. Akter", 1.2, 1], ["REQ-015", "capex", "Standby generator", "Maintenance", "R. Hasan", 18, 2]] },
  { key: "colSubmitted", cards: [["REQ-012", "opex", "Machine spares", "Maintenance", "R. Hasan", 6.5, 2], ["REQ-013", "capex", "Forklift", "Logistics", "T. Mia", 22, 3]] },
  { key: "colApproved", cards: [["REQ-010", "opex", "Trade fair booth", "Sales & Marketing", "N. Khan", 8, 1]] },
];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmRequisitions", "/apps/budget-management/requisitions");
}

export default function BudgetRequisitionsPage() {
  return (
    <BudgetPage
      section="bmRequisitions"
      path="/apps/budget-management/requisitions"
      prefix="bq"
      appName="Requisitions"
      tool="bmRequisitions"
      features={[
        "Departmental requisitions of type opex or capex",
        "Prepared-by, total and status on each requisition",
        "Draft, submitted and approved stages as kanban columns",
        "Notes on each requisition",
        "Spending requests checked against the budget",
      ]}
      stepTones={["muted", "blue", "teal"]}
      connectStructure={[
        { key: "before", tools: ["bmLines", "bmOverview"] },
        { key: "after", tools: ["bmApprovals", "purchaseOrders"] },
        { key: "shows", tools: ["bmVariance", "financialReports"] },
      ]}
      icons={[ClipboardList, Wallet, UserRound, Stamp]}
      render={(ui) => (
        <div className="grid gap-3 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.key} className="rounded-2xl bg-[var(--gray-bg)] p-2">
              <div className="flex items-center justify-between px-1.5 pb-2 pt-1">
                <p className="text-[11.5px] font-semibold text-foreground">
                  {ui[col.key]} <span className="font-normal text-muted-foreground">· {col.cards.length}</span>
                </p>
                <span className="text-[10px] tabular-nums text-muted-foreground">{taka(col.cards.reduce((a, c) => a + c[5], 0))}</span>
              </div>
              <div className="space-y-2">
                {col.cards.map((c) => (
                  <div key={c[0]} className={`rounded-xl border border-border border-s-4 bg-card p-2.5 text-[10.5px] ${c[1] === "capex" ? "border-s-primary" : "border-s-sky-500"}`}>
                    <p className="font-medium text-foreground">{c[2]}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
                      <span className="font-mono text-[9.5px]">{c[0]}</span>
                      <Chip tone={c[1] === "capex" ? "purple" : "blue"}>{c[1]}</Chip>
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-amber-500" aria-hidden="true">{"★".repeat(c[6])}<span className="text-muted-foreground/40">{"★".repeat(3 - c[6])}</span></span>
                      <span className="flex items-center gap-1.5">
                        <span className="tabular-nums text-foreground">{taka(c[5])}</span>
                        <Avatar name={c[4]} tone={c[6]} />
                      </span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{c[3]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 px-1.5 pb-1 text-[11px] text-primary">+ {ui.add}</p>
            </div>
          ))}
        </div>
      )}
    />
  );
}
