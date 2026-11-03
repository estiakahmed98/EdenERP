/**
 * Adon ERP public site: /[locale]/apps/project-accounting/job-cost
 * Copy lives in messages/*.json under pages.accountingShowcase.pjJobCost.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Calculator, Tags, TrendingDown, ReceiptText } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, mono } from "../_project";

/** DUMMY data. Variance is budget less forecast. */
const report = [
  ["01", "Preliminaries", "5,00,000", "0", "0", "0", "5,00,000"],
  ["02", "Civil works", "7,00,000", "1,12,000", "2,50,000", "3,62,000", "3,38,000"],
  ["03", "Equipment & machinery", "18,00,000", "3,82,000", "7,00,000", "10,82,000", "7,18,000"],
  ["04", "Electrical & controls", "9,00,000", "2,76,000", "2,50,000", "5,26,000", "3,74,000"],
  ["05", "Commissioning", "6,00,000", "0", "0", "0", "6,00,000"],
];
const pos = [
  ["PO-2026-000009", "3,82,000.00", "03 Equipment & machinery"],
  ["PO-2026-000008", "2,76,000.00", "04 Electrical & controls"],
  ["PO-2026-000006", "1,12,000.00", "02 Civil works"],
];

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjJobCost", "job-cost");
}

export default function JobCostPage() {
  return (
    <ProjectPage
      section="pjJobCost"
      slug="job-cost"
      prefix="jc"
      appName="Job Cost"
      tool="pjJobCost"
      features={[
        "A job cost report per cost code: budget, committed, actual, forecast and variance",
        "Committed cost from open purchase orders and subcontracts",
        "Actual cost from supplier bills",
        "Forecast as actual plus committed, and variance as budget less forecast, red when over budget",
        "Assign a cost code to each bill, subcontract and purchase order",
      ]}
      stepTones={["blue", "amber", "red"]}
      connectStructure={[
        { key: "before", tools: ["pjCostCodes", "pjBudgets", "purchaseOrders", "billsAp"] },
        { key: "after", tools: ["pjChangeOrders", "pjWip"] },
        { key: "shows", tools: ["pjPnl", "financialReports"] },
      ]}
      icons={[Calculator, Tags, TrendingDown, ReceiptText]}
      render={(ui) => ({
        main: (
          <>
            <Panel title={ui.reportTitle} note={ui.reportNote}>
              <MiniTable
                cols={[
                  { head: ui.thCode },
                  { head: ui.thName, className: "hidden sm:table-cell" },
                  { head: ui.thBudget, align: "end" },
                  { head: ui.thCommitted, align: "end", className: "hidden md:table-cell" },
                  { head: ui.thActual, align: "end" },
                  { head: ui.thForecast, align: "end", className: "hidden sm:table-cell" },
                  { head: ui.thVariance, align: "end" },
                ]}
                rows={report.map((r) => [
                  <span key="c" className={mono}>{r[0]}</span>,
                  <span key="n">{r[1]}</span>,
                  <span key="b">{r[2]}</span>,
                  <span key="m">{r[3]}</span>,
                  <span key="a">{r[4]}</span>,
                  <span key="f">{r[5]}</span>,
                  <span key="v" className="text-[var(--teal)]">{r[6]}</span>,
                ])}
              />
            </Panel>
            <Panel title={ui.assignTitle} note={ui.assignNote}>
              <p className="mb-1.5 text-[10.5px] font-semibold text-foreground">
                {ui.openPos} <span className="font-normal text-muted-foreground">· 3</span>
              </p>
              <MiniTable
                cols={[{ head: ui.thDoc }, { head: ui.thAmount, align: "end" }, { head: ui.thStatus, className: "hidden sm:table-cell" }, { head: ui.thCostCode }]}
                rows={pos.map((p) => [
                  <span key="d" className={mono}>{p[0]}</span>,
                  <span key="a">BDT {p[1]}</span>,
                  <span key="s" className="text-muted-foreground">{ui.approved}</span>,
                  <span key="c" className="rounded border border-border bg-[var(--gray-bg)] px-1.5 py-0.5">{p[2]}</span>,
                ])}
              />
            </Panel>
          </>
        ),
      })}
    />
  );
}
