/**
 * Adon ERP public site: /[locale]/apps/accounting/petty-cash
 * Copy lives in messages/*.json under pages.accountingShowcase.pettyCash.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the office manager who hands out small cash, and the accountant
 * The question:   "How do we record small cash spends, like conveyance, with a signed voucher?"
 */
import type { Metadata } from "next";
import { Bus, FileCheck, Printer, Wallet } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  SectionLabel,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  money,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const vouchers = [
  { no: "PCV-2026-000018", date: "8/2/2026", payee: "Anika Rahman", role: "Executive", amount: "824" },
  { no: "PCV-2026-000017", date: "4/23/2026", payee: "Tania Chowdhury", role: "Executive", amount: "1,269" },
  { no: "PCV-2026-000016", date: "6/14/2026", payee: "Masud Karim", role: "Executive", amount: "419" },
  { no: "PCV-2026-000015", date: "6/20/2026", payee: "Shamim Hossain", role: "Officer", amount: "1,138" },
  { no: "PCV-2026-000014", date: "9/16/2026", payee: "Rafiq Mia", role: "Officer", amount: "452" },
  { no: "PCV-2026-000013", date: "5/14/2026", payee: "Sultana Haque", role: "Peon", amount: "983" },
  { no: "PCV-2026-000012", date: "8/12/2026", payee: "Nasir Uddin", role: "Officer", amount: "1,276" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("pettyCash", "petty-cash");
}

export default function PettyCashPage() {
  const content = useTemplateContent("pettyCash");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thNo },
    { head: ui.thDate, className: "hidden md:table-cell" },
    { head: ui.thType, className: "hidden sm:table-cell" },
    { head: ui.thPayee },
    { head: ui.thAmount, align: "end" },
    { head: ui.thStatus, className: "hidden sm:table-cell" },
    { head: "", align: "end", className: "hidden lg:table-cell" },
  ];
  const rows = vouchers.map((r) => [
    <span key="n" className="font-mono text-[10.5px] font-semibold">{r.no}</span>,
    <span key="d" className="text-muted-foreground tabular-nums">{r.date}</span>,
    <Pill key="t" tone="amber">{ui.conveyance}</Pill>,
    <span key="p" className="block truncate font-medium">
      {r.payee} <span className="text-[10px] font-normal text-muted-foreground">({r.role})</span>
    </span>,
    <span key="a" className={money}>BDT {r.amount}</span>,
    <Pill key="s" tone="blue">{ui.posted}</Pill>,
    <span key="b" className="inline-flex gap-1">
      <Btn>{ui.void}</Btn>
      <Btn>
        <Printer className="me-0.5 inline h-2.5 w-2.5" />
        {common("print")}
      </Btn>
      <Btn>{ui.project}</Btn>
    </span>,
  ]);

  return (
    <TemplatePage
      slug="petty-cash"
      prefix="pc"
      appName="Petty Cash"
      features={[
        "Numbered petty cash and conveyance vouchers",
        "Payee with designation, and a date for each voucher",
        "Expense lines with from, to, mode of travel, purpose and amount",
        "Voucher total worked out from the lines",
        "Void, print and tag to a project; search, CSV and Excel export",
      ]}
      content={content}
      stepTones={["amber", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "bankAccounts"] },
        { key: "after", tools: ["journalEntries", "ledgers"] },
        { key: "shows", tools: ["accountingHub", "financialReports"] },
      ]}
      localIcons={[Bus, Wallet, FileCheck, Printer]}
      preview={
        <TemplatePreview
          prefix="pc"
          toolKey="pettyCash"
          title={ui.title}
          content={content}
          newLabel={ui.newVoucher}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field label={ui.fDate} value="11/03/2026" />
              <Field label={ui.fType} value={ui.conveyanceFull} select />
              <Field label={ui.fPayee} value={ui.select} select />
              <Field label={ui.fDesignation} />
              <SectionLabel>{ui.lines}</SectionLabel>
              <Field label={ui.fFrom} value={ui.from} />
              <Field label={ui.fTo} value={ui.to} />
              <Field label={ui.fBy} value="CNG / Bus" />
              <Field label={ui.fAmount} value={ui.amount} />
            </>
          }
        />
      }
    />
  );
}
