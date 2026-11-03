/**
 * Adon ERP public site: /[locale]/apps/accounting/financial-reports
 * Copy lives in messages/*.json under pages.accountingShowcase.financialReports.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner, the accountant and the bank or auditor who asks for statements
 * The question:   "Can I get the trial balance, balance sheet and income statement from the same books?"
 */
import type { Metadata } from "next";
import { BarChart3, Boxes, Scale, Users } from "lucide-react";

import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  money,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const trial = [
  { acc: "1010 - Cash", debit: "63,681,320.29" },
  { acc: "1100 - Accounts Receivable", debit: "12,466,330.91" },
  { acc: "1200 - Inventory", debit: "42,875,832.63" },
  { acc: "1610 - Buildings", debit: "18,500,000" },
  { acc: "1611 - Less: Buildings Accumulated Depreciation", credit: "509,034.91" },
  { acc: "1620 - Plant", debit: "21,280,000" },
  { acc: "1630 - Equipment", debit: "1,160,000" },
  { acc: "2010 - Accounts Payable", credit: "2,101,432.3" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("financialReports", "financial-reports");
}

export default function FinancialReportsPage() {
  const content = useTemplateContent("financialReports");
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thAccount },
    { head: ui.thDebit, align: "end" },
    { head: ui.thCredit, align: "end", className: "hidden sm:table-cell" },
  ];
  const dash = <span className="text-muted-foreground">—</span>;
  const rows = trial.map((r) => [
    <span key="a" className="block truncate">{r.acc}</span>,
    r.debit ? <span key="d" className="text-[var(--teal)] tabular-nums">BDT {r.debit}</span> : dash,
    r.credit ? <span key="c" className="text-destructive tabular-nums">BDT {r.credit}</span> : dash,
  ]);

  const tabs = [ui.tabTrial, ui.tabBalance, ui.tabIncome, ui.tabCash, ui.tabLedger, ui.tabAr, ui.tabAp, ui.tabSales, ui.tabPurchases, ui.tabProfit, ui.tabInventory];

  const income: { label: string; value: string; bold?: boolean; section?: boolean }[] = [
    { label: ui.revenues, value: "", section: true },
    { label: "4010 - Sales Income", value: "29,177,376.33" },
    { label: ui.cogs, value: "", section: true },
    { label: "5010 - Cost of Goods Sold", value: "20,972,450.81" },
    { label: ui.expenses, value: "", section: true },
    { label: "6030 - Auto Expense", value: "17,971" },
    { label: "6080 - Employee Benefits", value: "812,544" },
    { label: "6260 - Salaries", value: "13,148,160" },
  ];

  return (
    <TemplatePage
      slug="financial-reports"
      prefix="fr"
      appName="Financial Reports"
      features={[
        "Trial balance, balance sheet, income statement and cash flow",
        "Account ledger with a date range and running balance",
        "Receivables by customer and payables by vendor, with overdue counts",
        "Sales by product, purchases by product, product profitability and inventory summary",
        "Search, CSV and Excel export, print on every report",
      ]}
      content={content}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["journalEntries", "invoicesAr", "billsAp"] },
        { key: "after", tools: ["closingFy", "vatRegister"] },
        { key: "shows", tools: ["ledgers", "accountingHub", "itemsProducts"] },
      ]}
      localIcons={[Scale, Users, Boxes, BarChart3]}
      preview={
        <TemplatePreview
          prefix="fr"
          toolKey="financialReports"
          content={content}
          tabs={tabs.map((label, i) => ({ label, active: i === 0 }))}
          cols={cols}
          rows={rows}
          side={
            <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-[14px] font-semibold text-foreground">{ui.tabIncome}</p>
                <span className="rounded-md bg-primary px-2 py-0.5 text-[10.5px] font-medium text-white">{ui.selected}</span>
              </div>
              <div className="space-y-1.5 px-4 py-4 text-[11.5px]">
                {income.map((r) =>
                  r.section ? (
                    <p key={r.label} className="pt-2 text-[10px] font-semibold uppercase tracking-wide text-primary first:pt-0">
                      {r.label}
                    </p>
                  ) : (
                    <p key={r.label} className="flex justify-between gap-3">
                      <span className="text-foreground">{r.label}</span>
                      <span className={`${money} font-mono text-[10.5px]`}>BDT {r.value}</span>
                    </p>
                  ),
                )}
                <p className="mt-3 flex justify-between rounded-md bg-[var(--gray-bg)] px-3 py-2 text-[13px] font-semibold">
                  <span>{ui.netIncome}</span>
                  <span className="text-destructive tabular-nums">-BDT 5,773,749.48</span>
                </p>
              </div>
            </div>
          }
        />
      }
    />
  );
}
