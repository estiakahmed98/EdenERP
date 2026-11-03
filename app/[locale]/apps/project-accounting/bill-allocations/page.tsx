/**
 * Adon ERP public site: /[locale]/apps/project-accounting/bill-allocations
 * Copy lives in messages/*.json under pages.accountingShowcase.pjBillAllocations.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Split, ReceiptText, Percent, Layers } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, mono } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjBillAllocations", "bill-allocations");
}

export default function BillAllocationsPage() {
  return (
    <ProjectPage
      section="pjBillAllocations"
      slug="bill-allocations"
      prefix="bl"
      appName="Bill Allocations"
      tool="pjBillAllocations"
      features={[
        "Allocate one supplier bill across several projects",
        "Each row stores the share of the bill's pre-VAT subtotal given to this project",
        "Per-bill totals across all projects must add up to 100% or less",
        "Allocated amount and notes on every row",
        "Allocated bills flow into the project cost and profit",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["billsAp", "vendors"] },
        { key: "after", tools: ["pjJobCost", "pjWip"] },
        { key: "shows", tools: ["pjPnl", "financialReports"] },
      ]}
      icons={[Split, ReceiptText, Percent, Layers]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={1} action={ui.add} note={ui.note}>
            <MiniTable
              cols={[
                { head: ui.thBill },
                { head: ui.thTotal, align: "end" },
                { head: ui.thShare, align: "end", className: "hidden sm:table-cell" },
                { head: ui.thAllocated, align: "end" },
                { head: ui.thNotes, className: "hidden md:table-cell" },
              ]}
              rows={[[<span key="b" className={mono}>BILL-2026-000055 · City Hardware</span>, "2,50,000", "40%", "1,00,000", "Shared tools"]]}
            />
          </Panel>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fBill} value={ui.pickBill} kind="select" />
              <FormField label={ui.fShare} value="40" />
              <FormField label={ui.fNotes} kind="area" />
            </>
          ),
        },
      })}
    />
  );
}
