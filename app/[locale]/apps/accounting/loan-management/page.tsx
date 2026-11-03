/**
 * Adon ERP public site: /[locale]/apps/accounting/loan-management
 * Copy lives in messages/*.json under pages.accountingShowcase.loanManagement.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner and the accountant who carry bank loans
 * The question:   "What do we owe each lender, what is the monthly instalment, and what has been paid?"
 */
import type { Metadata } from "next";
import { CalendarClock, Landmark, Percent, ScrollText } from "lucide-react";

import {
  Btn,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  money,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const loans = [
  { no: "LOAN-000005", lender: "Eastern Bank Ltd", type: "working capital", principal: "15,000,000", rate: "13%", emi: "505,409.28", out: "10,500,000" },
  { no: "LOAN-000006", lender: "Dutch-Bangla Bank Ltd", type: "term loan", principal: "25,000,000", rate: "11.5%", emi: "549,815.18", out: "17,500,000" },
];

const schedule = [
  { n: 1, due: "10/26/2024", principal: "342,909.28", interest: "162,500", out: "14,657,090.72" },
  { n: 2, due: "11/25/2024", principal: "346,624.13", interest: "158,785.15", out: "14,310,466.59" },
  { n: 3, due: "12/25/2024", principal: "350,379.23", interest: "155,030.05", out: "13,960,087.36" },
  { n: 4, due: "1/24/2025", principal: "354,175", interest: "151,234.28", out: "13,605,912.36" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("loanManagement", "loan-management");
}

export default function LoanManagementPage() {
  const content = useTemplateContent("loanManagement");
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thNo },
    { head: ui.thLender },
    { head: ui.thType, className: "hidden xl:table-cell" },
    { head: ui.thPrincipal, align: "end", className: "hidden sm:table-cell" },
    { head: ui.thRate, align: "end", className: "hidden md:table-cell" },
    { head: ui.thOutstanding, align: "end" },
    { head: ui.thStatus, className: "hidden sm:table-cell" },
    { head: "", align: "end" },
  ];
  const rows = loans.map((r) => [
    <span key="n" className="font-mono text-[10.5px] font-semibold text-sky-600 dark:text-sky-400">{r.no}</span>,
    <span key="l" className="block truncate font-medium">{r.lender}</span>,
    <span key="t" className="text-muted-foreground">{r.type}</span>,
    <span key="p" className="tabular-nums text-primary">BDT {r.principal}</span>,
    <span key="r" className={money}>{r.rate}</span>,
    <span key="o" className="tabular-nums text-destructive">BDT {r.out}</span>,
    <Pill key="s" tone="blue">{ui.active}</Pill>,
    <Btn key="v">{ui.view}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="loan-management"
      prefix="lm"
      appName="Loan Management"
      features={[
        "A register of bank loans with lender, type, principal, interest rate and EMI",
        "Active, closed, defaulted and restructured statuses",
        "A full EMI schedule for each loan with principal, interest and outstanding balance",
        "Total paid and outstanding on every loan",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      stepTones={["blue", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["bankAccounts", "chartOfAccounts"] },
        { key: "after", tools: ["journalEntries", "ledgers"] },
        { key: "shows", tools: ["financialReports", "accountingHub"] },
      ]}
      localIcons={[Landmark, Percent, CalendarClock, ScrollText]}
      preview={
        <TemplatePreview
          prefix="lm"
          toolKey="loanManagement"
          content={content}
          newLabel={ui.newLoan}
          tabs={[
            { label: ui.tabAll, active: true },
            { label: ui.active },
            { label: ui.closed },
            { label: ui.defaulted },
            { label: ui.restructured },
          ]}
          cols={cols}
          rows={rows}
          side={
            <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
              <div className="border-b border-border px-4 py-3">
                <p className="text-[14px] font-semibold text-foreground">{ui.detailTitle}</p>
              </div>
              <div className="space-y-3 px-4 py-4">
                <dl className="grid grid-cols-3 gap-x-3 gap-y-2 rounded-lg bg-[var(--gray-bg)] p-3 text-[11px]">
                  <div>
                    <dt className="text-[10px] text-muted-foreground">{ui.lender}</dt>
                    <dd className="font-semibold text-foreground">Eastern Bank Ltd</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">{ui.principal}</dt>
                    <dd className="font-semibold text-primary tabular-nums">BDT 15,000,000</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">{ui.emi}</dt>
                    <dd className="font-semibold text-foreground tabular-nums">BDT 505,409.28</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-muted-foreground">{ui.totalPaid}</dt>
                    <dd className="font-semibold text-[var(--teal)] tabular-nums">BDT 0</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[10px] text-muted-foreground">{ui.thOutstanding}</dt>
                    <dd className="font-semibold text-destructive tabular-nums">BDT 10,500,000</dd>
                  </div>
                </dl>
                <p className="text-[12px] font-semibold text-foreground">{ui.scheduleTitle}</p>
                <table className="w-full text-[10.5px]">
                  <thead className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="py-1.5 text-start">#</th>
                      <th className="py-1.5 text-start">{ui.thDue}</th>
                      <th className="py-1.5 text-end">{ui.thPrincipalCol}</th>
                      <th className="hidden py-1.5 text-end sm:table-cell">{ui.thInterest}</th>
                      <th className="py-1.5 text-end">{ui.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((r) => (
                      <tr key={r.n} className="border-b border-border/60">
                        <td className="py-1.5 font-semibold text-primary">{r.n}</td>
                        <td className="py-1.5 text-muted-foreground tabular-nums">{r.due}</td>
                        <td className="py-1.5 text-end tabular-nums text-sky-600 dark:text-sky-400">{r.principal}</td>
                        <td className={`hidden py-1.5 text-end tabular-nums sm:table-cell ${money}`}>{r.interest}</td>
                        <td className="py-1.5 text-end">
                          <Pill tone="teal">{ui.paid}</Pill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      }
    />
  );
}
