/**
 * Adon ERP public site: /[locale]/apps/accounting/bank-reconciliation
 * Copy lives in messages/*.json under pages.accountingShowcase.bankReconciliation.
 * ALL DATA ON THIS PAGE IS DUMMY. Account numbers are invented.
 *
 * Who is reading: the accountant who closes the month against the bank statement
 * The question:   "Does what the bank says match what our books say?"
 */
import type { Metadata } from "next";
import { CheckCheck, FileSpreadsheet, Landmark, ShieldCheck } from "lucide-react";
import { Upload } from "lucide-react";

import {
  Btn,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Col,
} from "../_template";

const LC = "LC & FC Account — Eastern Bank";
const OP = "Operating Account — Dutch-Bangla Bank";

/** DUMMY data. */
const statements = [
  { bank: LC, acc: "2436042621", period: "2026-08-01 → 2026-08-31", open: "3,559,000", close: "3,920,000", lines: "8", done: false },
  { bank: OP, acc: "7875317054", period: "2026-08-01 → 2026-08-31", open: "6,625,000", close: "6,586,000", lines: "8", done: false },
  { bank: LC, acc: "2436042621", period: "2026-07-01 → 2026-07-31", open: "6,084,000", close: "5,883,000", lines: "8", done: false },
  { bank: OP, acc: "7875317054", period: "2026-07-01 → 2026-07-31", open: "7,664,000", close: "6,947,000", lines: "10", done: false },
  { bank: LC, acc: "2436042621", period: "2026-06-01 → 2026-06-30", open: "3,005,000", close: "4,237,000", lines: "7", done: true },
  { bank: OP, acc: "7875317054", period: "2026-06-01 → 2026-06-30", open: "6,233,000", close: "8,348,000", lines: "11", done: true },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("bankReconciliation", "bank-reconciliation");
}

export default function BankReconciliationPage() {
  const content = useTemplateContent("bankReconciliation");
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thBank },
    { head: ui.thPeriod, className: "hidden md:table-cell" },
    { head: ui.thOpening, align: "end", className: "hidden sm:table-cell" },
    { head: ui.thClosing, align: "end" },
    { head: ui.thLines, className: "hidden sm:table-cell" },
    { head: ui.thStatus },
    { head: "", align: "end" },
  ];
  const rows = statements.map((r) => [
    <span key="b" className="block text-[11px] font-medium leading-snug">
      {r.bank}
      <span className="block text-[10px] font-normal text-muted-foreground">{r.acc}</span>
    </span>,
    <span key="p" className="font-mono text-[10.5px] text-muted-foreground">{r.period}</span>,
    <span key="o" className="font-mono text-[10.5px]">{r.open}</span>,
    <span key="c" className="font-mono text-[10.5px]">{r.close}</span>,
    <span key="l">{r.lines}</span>,
    <Pill key="s" tone={r.done ? "teal" : "blue"}>{r.done ? ui.reconciled : ui.imported}</Pill>,
    <Btn key="x">{ui.open}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="bank-reconciliation"
      prefix="br"
      appName="Bank Reconciliation"
      features={[
        "Import a bank statement as a CSV file",
        "Suggested matches against book transactions on the same account",
        "Confirm matches and mark the statement reconciled",
        "Reconciliation never changes the general ledger, it only flags transactions as cleared",
        "Opening balance, closing balance and line count for each statement",
      ]}
      content={content}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["bankAccounts", "receipts", "chequeRegister"] },
        { key: "after", tools: ["journalEntries", "ledgers"] },
        { key: "shows", tools: ["financialReports", "accountingHub"] },
      ]}
      localIcons={[FileSpreadsheet, CheckCheck, ShieldCheck, Landmark]}
      preview={
        <TemplatePreview
          prefix="br"
          toolKey="bankReconciliation"
          content={content}
          extraActions={
            <span className="btn-gradient inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium">
              <Upload className="h-3 w-3" /> {ui.importCsv}
            </span>
          }
          above={<p className="mt-3 rounded-md bg-[var(--gray-bg)] px-3 py-2 text-[11px] leading-snug text-muted-foreground">{ui.flowNote}</p>}
          cols={cols}
          rows={rows}
        />
      }
    />
  );
}
