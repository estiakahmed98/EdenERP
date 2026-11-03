/**
 * Adon ERP public site: /apps/sales/crm/pipeline/pipeline
 * Copy lives in messages/*.json under pages.accountingShowcase.crPipelinePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BarChart3, Columns3, Hand, Percent } from "lucide-react";

import { Chip, HrPage, Stat, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data per stage: [stage key, dot class, deals as [name, value in lakh, probability %]]. */
const stages: [string, string, [string, number, number][]][] = [
  ["sLead", "bg-primary", [["Alpha Print — Carton Box", 4.2, 10], ["PHI Tex BD — Poly Bag", 2.8, 10]]],
  ["sQualified", "bg-[var(--chart-5)]", [["Square Fashions — Carton 3-Ply", 2.6, 57], ["DBL Group — Poly Bag", 7.8, 31]]],
  ["sProposal", "bg-[var(--secondary)]", [["Viyellatex — Carton 5-Ply", 12.3, 20]]],
  ["sNegotiation", "bg-[var(--chart-4)]", [["Ananta Apparels — Carton 3-Ply", 23.6, 82], ["Nelima Fashion — Opportunity", 5.0, 75]]],
  ["sWon", "bg-[var(--teal)]", [["Asrotex — Carton 5-Ply", 13.6, 100], ["Mondol Group — Carton 3-Ply", 16.6, 100]]],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crPipelinePage", "/apps/sales/crm/pipeline/pipeline");
}

export default function PipelinePage() {
  return (
    <HrPage
      section="crPipelinePage"
      path="/apps/sales/crm/pipeline/pipeline"
      prefix="pipe"
      appName="Pipeline"
      tool="crPipeline"
      group="crPipelineG"
      features={[
        "Deals on a board by stage, dragged from one column to the next",
        "Open value, weighted forecast and won value at the top",
        "A probability on each deal, set by stage or by hand",
        "Weighted forecast by stage as a chart",
        "Won deals turned into quotes and orders on the same record",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crLeads", "crContacts"] },
        { key: "after", tools: ["crDeals", "crQuotes", "crSalesOrders"] },
        { key: "shows", tools: ["crForecast", "crDashboard"] },
      ]}
      icons={[Columns3, Percent, BarChart3, Hand]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.open} value="189" tone="navy" />
            <Stat label={ui.openValue} value="1,28,79,882" tone="primary" />
            <Stat label={ui.weighted} value="44,22,950" tone="brown" />
            <Stat label={ui.won} value="77,95,062" tone="teal" />
          </div>
          <div className="grid gap-2 overflow-x-auto sm:grid-cols-5">
            {stages.map(([key, dot, deals]) => (
              <div key={key} className="min-w-[9rem] rounded-xl bg-[var(--gray-bg)] p-2">
                <p className="flex items-center gap-1.5 px-1 text-[11px] font-semibold text-foreground">
                  <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                  {ui[key]}
                  <span className="ms-auto rounded-full bg-card px-1.5 text-[9.5px] text-muted-foreground">{deals.length}</span>
                </p>
                <ul className="mt-2 space-y-1.5">
                  {deals.map(([name, value, prob]) => (
                    <li key={name} className="rounded-lg border border-border bg-card p-2">
                      <p className="text-[10.5px] font-medium leading-tight text-foreground">{name}</p>
                      <p className="mt-1 flex items-center justify-between text-[10px]">
                        <span className="tabular-nums text-muted-foreground">BDT {value}L</span>
                        <Chip tone={prob === 100 ? "teal" : prob >= 50 ? "primary" : "muted"}>{prob}%</Chip>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">{ui.tip}</p>
        </>
      )}
    />
  );
}
