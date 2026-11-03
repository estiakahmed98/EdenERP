/**
 * Adon ERP public site: /[locale]/apps/accounting/exchange-rates
 * Copy lives in messages/*.json under pages.accountingShowcase.exchangeRates.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the accountant at an importer or exporter
 * The question:   "Which dollar rate did we use on that invoice, and where did it come from?"
 */
import type { Metadata } from "next";
import { ArrowLeftRight, CalendarClock, FileText, Globe } from "lucide-react";

import {
  Btn,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const rates = [
  { date: "2026-11-04", from: "USD", to: "BDT", rate: "124.0000", source: "bb_api" },
  { date: "2026-10-01", from: "USD", to: "BDT", rate: "123.5000", source: "bb_api" },
  { date: "2026-09-01", from: "USD", to: "BDT", rate: "122.7500", source: "manual" },
  { date: "2026-08-01", from: "EUR", to: "BDT", rate: "133.2000", source: "manual" },
  { date: "2026-07-01", from: "USD", to: "BDT", rate: "121.9000", source: "bb_api" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("exchangeRates", "exchange-rates");
}

export default function ExchangeRatesPage() {
  const content = useTemplateContent("exchangeRates");
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thDate },
    { head: ui.thFrom },
    { head: ui.thTo },
    { head: ui.thRate, align: "end" },
    { head: ui.thSource, className: "hidden sm:table-cell" },
    { head: ui.thNotes, className: "hidden md:table-cell" },
    { head: "", align: "end" },
  ];
  const rows = rates.map((r) => [
    <span key="d" className="font-mono text-[10.5px]">{r.date}</span>,
    <span key="f" className="font-semibold">{r.from}</span>,
    <span key="t" className="font-semibold">{r.to}</span>,
    <span key="r" className="font-mono text-[11px] text-primary">{r.rate}</span>,
    <span key="s" className="text-muted-foreground">{r.source}</span>,
    <span key="n" className="text-muted-foreground">—</span>,
    <Btn key="x" danger>{ui.delete}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="exchange-rates"
      prefix="er"
      appName="Exchange Rates"
      features={[
        "Dated exchange rates between a from currency and a to currency",
        "Rate defined as the amount of the to currency per one unit of the from currency",
        "Latest rate on or before the transaction date used on foreign-currency invoices and bills",
        "Source and notes on every rate, such as a Bangladesh Bank feed or a manual entry",
        "Delete a rate entered in error",
      ]}
      content={content}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts"] },
        { key: "after", tools: ["invoicesAr", "billsAp", "purchaseOrders"] },
        { key: "shows", tools: ["ledgers", "financialReports", "accountingHub"] },
      ]}
      localIcons={[Globe, ArrowLeftRight, CalendarClock, FileText]}
      preview={
        <TemplatePreview
          prefix="er"
          toolKey="exchangeRates"
          content={content}
          newLabel={ui.newRate}
          above={<p className="mt-3 rounded-md bg-[var(--gray-bg)] px-3 py-2 text-[11px] leading-snug text-muted-foreground">{ui.convention}</p>}
          cols={cols}
          rows={rows}
        />
      }
    />
  );
}
