/**
 * Adon ERP public site: /apps/analytics/financial-reports
 * Copy lives in messages/*.json under pages.accountingShowcase.anFinancialPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BookOpenCheck, FileSpreadsheet, Scale, Search } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

const reports = ["rTb", "rBs", "rIs", "rCf", "rLedger", "rArCust", "rApVend", "rSalesProd", "rProfit", "rInvSummary"];
/** DUMMY data: [account, debit, credit]. Debits and credits are equal. */
const rows: [string, number, number][] = [
  ["1010 · Cash", 63681320, 0],
  ["1100 · Accounts receivable", 12466331, 0],
  ["1200 · Inventory", 42875833, 0],
  ["1620 · Plant", 21280000, 0],
  ["1621 · Plant accumulated depreciation", 0, 6121367],
  ["2010 · Accounts payable", 0, 2101432],
  ["3000 · Share capital", 0, 110000000],
  ["4000 · Sales", 0, 48200000],
  ["5000 · Cost of sales", 21780716, 0],
  ["6000 · Operating expenses", 4338599, 0],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("anFinancialPage", "/apps/analytics/financial-reports");
}

export default function AnalyticsFinancialReportsPage() {
  const dr = rows.reduce((a, r) => a + r[1], 0);
  const cr = rows.reduce((a, r) => a + r[2], 0);
  return (
    <HrPage
      section="anFinancialPage"
      path="/apps/analytics/financial-reports"
      prefix="anfin"
      appName="Financial Reports"
      tool="anFinancial"
      group="an"
      features={[
        "Trial balance, balance sheet, income statement and cash flow",
        "Ledger, receivables by customer and payables by vendor",
        "Sales and purchases by product, and product profitability",
        "Search any account and open the entries behind it",
        "Every report to CSV, Excel or print",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["journalEntries", "ledgers", "chartOfAccounts"] },
        { key: "after", tools: ["anExport", "closingFy"] },
        { key: "shows", tools: ["anExec", "financialReports"] },
      ]}
      icons={[Scale, BookOpenCheck, Search, FileSpreadsheet]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap gap-1">
            {reports.map((r, i) => (
              <span key={r} className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${i === 0 ? "border-primary bg-primary text-white" : "border-border bg-card text-foreground"}`}>
                {ui[r]}
              </span>
            ))}
          </div>
          <Card title={ui.tbTitle} right={<Chip tone={dr === cr ? "teal" : "red"}>{dr === cr ? ui.balanced : ui.off}</Chip>}>
            <table className="w-full text-[11px]">
              <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-1.5 text-start">{ui.thAccount}</th>
                  <th className="pb-1.5 text-end">{ui.thDebit}</th>
                  <th className="pb-1.5 text-end">{ui.thCredit}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([acc, d, c]) => (
                  <tr key={acc} className="border-b border-border/60">
                    <td className="py-1.5 text-foreground">{acc}</td>
                    <td className="py-1.5 text-end font-mono text-[10.5px] text-[var(--teal)]">{d ? d.toLocaleString("en-IN") : "—"}</td>
                    <td className="py-1.5 text-end font-mono text-[10.5px] text-destructive">{c ? c.toLocaleString("en-IN") : "—"}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="py-1.5 text-foreground">{ui.total}</td>
                  <td className="py-1.5 text-end font-mono text-[10.5px] text-foreground">{dr.toLocaleString("en-IN")}</td>
                  <td className="py-1.5 text-end font-mono text-[10.5px] text-foreground">{cr.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </>
      )}
    />
  );
}
