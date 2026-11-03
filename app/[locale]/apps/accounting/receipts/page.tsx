/**
 * Adon ERP public site: /[locale]/apps/accounting/receipts
 * Copy lives in messages/*.json under pages.accountingShowcase.receipts.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the cashier and the accountant who record money in and out
 * The question:   "How do I record a payment received or made, and keep a numbered trail?"
 */
import type { Metadata } from "next";
import { Banknote, CalendarCheck, Hash, Undo2 } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Col,
  type Tone,
} from "../_template";

type Kind = "sales" | "expense";
const kindTone: Record<Kind, Tone> = { sales: "teal", expense: "red" };

/** DUMMY data. */
const receipts: { no: string; kind: Kind; amount: string; date: string }[] = [
  { no: "RCP-2026-000094", kind: "sales", amount: "15,000", date: "10/19/2026" },
  { no: "RCP-2026-000095", kind: "expense", amount: "50,000", date: "10/19/2026" },
  { no: "RCP-2026-000093", kind: "sales", amount: "100,000", date: "10/19/2026" },
  { no: "RCP-2026-000096", kind: "expense", amount: "20,000", date: "10/19/2026" },
  { no: "RCP-2026-000044", kind: "expense", amount: "37,545.2", date: "9/7/2026" },
  { no: "RCP-2026-000092", kind: "sales", amount: "179,019.47", date: "9/1/2026" },
  { no: "RCP-2026-000090", kind: "sales", amount: "246,972.76", date: "8/23/2026" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("receipts", "receipts");
}

export default function ReceiptsPage() {
  const content = useTemplateContent("receipts");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thNo },
    { head: ui.thType },
    { head: ui.thAmount, align: "end" },
    { head: ui.thDate, className: "hidden md:table-cell" },
    { head: ui.thStatus, className: "hidden sm:table-cell" },
    { head: "", align: "end" },
  ];
  const rows = receipts.map((r) => [
    <span key="n" className="font-medium text-primary tabular-nums">{r.no}</span>,
    <Pill key="t" tone={kindTone[r.kind]}>{r.kind === "sales" ? ui.typeSales : ui.typeExpense}</Pill>,
    <span key="a" className="text-[var(--teal)] tabular-nums">BDT {r.amount}</span>,
    <span key="d" className="text-muted-foreground tabular-nums">{r.date}</span>,
    <Pill key="s" tone="teal">{ui.posted}</Pill>,
    <span key="b" className="inline-flex gap-1">
      <Btn>{ui.view}</Btn>
      <Btn danger>{ui.void}</Btn>
    </span>,
  ]);

  return (
    <TemplatePage
      slug="receipts"
      prefix="rc"
      appName="Receipts"
      features={[
        "Sales receipts and expense receipts with numbered entries",
        "Customer, amount, receivable account and cash account on each receipt",
        "Optional project on every receipt",
        "Posted status, with Void to reverse a mistake",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      stepTones={["teal", "red", "muted"]}
      connectStructure={[
        { key: "before", tools: ["customers", "invoicesAr", "bankAccounts"] },
        { key: "after", tools: ["journalEntries", "ledgers"] },
        { key: "shows", tools: ["accountingHub", "financialReports", "vatRegister"] },
      ]}
      localIcons={[Hash, Banknote, Undo2, CalendarCheck]}
      preview={
        <TemplatePreview
          prefix="rc"
          toolKey="receipts"
          content={content}
          newLabel={ui.newReceipt}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field wide label={ui.fType} value={ui.typeSalesFull} select />
              <Field wide label={ui.fCustomer} value={ui.selectCustomer} select />
              <Field wide label={ui.fAmount} value="0.00" />
              <Field wide label={ui.fAr} value="1100 - Accounts Receivable" select />
              <Field wide label={ui.fCashAcc} value="1010 - Cash" select />
              <Field wide label={ui.fProject} value={ui.noProject} select />
            </>
          }
        />
      }
    />
  );
}
