/**
 * Adon ERP public site: /[locale]/apps/accounting/cheque-register
 * Copy lives in messages/*.json under pages.accountingShowcase.chequeRegister.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the accountant who issues cheques and the owner who signs them
 * The question:   "Which cheques have we written, and which have actually been paid?"
 */
import type { Metadata } from "next";
import { CalendarClock, ClipboardCheck, Landmark, Ban } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  money,
  useTemplateContent,
  type Col,
  type Tone,
} from "../_template";

type Status = "issued" | "cleared";
const statusTone: Record<Status, Tone> = { issued: "blue", cleared: "teal" };

const OPERATING = "Operating Account — Dutch-Bangla Bank";
const LC = "LC & FC Account — Eastern Bank";

/** DUMMY data. */
const cheques: { no: string; date: string; payee: string; bank: string; amount: string; status: Status }[] = [
  { no: "6946422", date: "8/4/2026", payee: "Sundarban Traders", bank: OPERATING, amount: "309,000", status: "issued" },
  { no: "5027939", date: "6/25/2026", payee: "Reliance Polymers", bank: LC, amount: "109,000", status: "cleared" },
  { no: "5643280", date: "6/9/2026", payee: "Unique Masterbatch", bank: OPERATING, amount: "350,000", status: "cleared" },
  { no: "2625420", date: "5/2/2026", payee: "Sundarban Cement", bank: LC, amount: "25,000", status: "cleared" },
  { no: "9450313", date: "4/3/2026", payee: "Polymer Corp BD", bank: OPERATING, amount: "143,000", status: "cleared" },
  { no: "2508944", date: "3/7/2026", payee: "Eastern Chemicals", bank: LC, amount: "414,000", status: "issued" },
  { no: "1886381", date: "2/6/2026", payee: "Eastern Chemicals", bank: LC, amount: "21,000", status: "cleared" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("chequeRegister", "cheque-register");
}

export default function ChequeRegisterPage() {
  const content = useTemplateContent("chequeRegister");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thNo },
    { head: ui.thDate, className: "hidden md:table-cell" },
    { head: ui.thPayee },
    { head: ui.thBank, className: "hidden xl:table-cell" },
    { head: ui.thAmount, align: "end" },
    { head: ui.thStatus },
    { head: "", align: "end", className: "hidden sm:table-cell" },
  ];
  const rows = cheques.map((r) => [
    <span key="n" className="font-mono text-[10.5px] font-semibold">{r.no}</span>,
    <span key="d" className="text-muted-foreground tabular-nums">{r.date}</span>,
    <span key="p" className="block truncate font-medium">{r.payee}</span>,
    <span key="b" className="block max-w-[11rem] text-[10.5px] leading-snug text-muted-foreground">{r.bank}</span>,
    <span key="a" className={money}>BDT {r.amount}</span>,
    <Pill key="s" tone={statusTone[r.status]}>{r.status === "issued" ? ui.issued : ui.cleared}</Pill>,
    r.status === "issued" ? (
      <span key="x" className="inline-flex gap-1">
        <span className="rounded border border-[var(--teal)]/30 bg-[var(--teal)]/10 px-1.5 py-0.5 text-[10.5px] font-medium text-[var(--teal)]">
          {ui.markCleared}
        </span>
        <Btn danger>{ui.markBounced}</Btn>
      </span>
    ) : (
      <span key="x" />
    ),
  ]);

  return (
    <TemplatePage
      slug="cheque-register"
      prefix="cr"
      appName="Cheque Register"
      features={[
        "A register of every cheque issued, with number, date, payee and bank",
        "Issued, cleared, bounced, cancelled and stopped statuses",
        "Mark an issued cheque as cleared or bounced in one click",
        "Bank account picked from your own list",
        "Search, filter by status, CSV and Excel export, print",
      ]}
      content={content}
      stepTones={["blue", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["bankAccounts", "vendors", "billsAp"] },
        { key: "after", tools: ["ledgers", "journalEntries"] },
        { key: "shows", tools: ["accountingHub", "financialReports"] },
      ]}
      localIcons={[CalendarClock, Landmark, ClipboardCheck, Ban]}
      preview={
        <TemplatePreview
          prefix="cr"
          toolKey="chequeRegister"
          content={content}
          newLabel={ui.newCheque}
          tabs={[
            { label: ui.tabAll, active: true },
            { label: ui.issued },
            { label: ui.cleared },
            { label: ui.bounced },
            { label: ui.cancelled },
            { label: ui.stopped },
          ]}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field label={ui.fBank} value={ui.selectBank} select />
              <Field label={ui.fNo} value="123456" />
              <Field label={ui.fDate} value="11/03/2026" />
              <Field label={ui.fPayee} />
              <Field label={ui.fAmount} />
              <Field label={ui.fPurpose} />
            </>
          }
        />
      }
    />
  );
}
