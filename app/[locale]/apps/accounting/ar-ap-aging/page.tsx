/**
 * Adon ERP public site: /[locale]/apps/accounting/ar-ap-aging
 * Copy lives in messages/*.json under pages.accountingShowcase.arApAging.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner and the accountant who chase payments and plan what to pay
 * The question:   "Who owes us, how late are they, and which of our own bills are overdue?"
 */
import type { Metadata } from "next";
import { BellRing, CalendarClock, Clock3, Users } from "lucide-react";
import { Calendar, RefreshCw } from "lucide-react";

import {
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
} from "../_template";

/** DUMMY data. 0 means nothing in that column; amounts are BDT. */
const rows = [
  { name: "Padma Knitwear Ltd.", b: ["0", "0", "0", "17,200", "4,413,985.99"], total: "4,431,185.99", open: 4 },
  { name: "Jamuna Apparel", b: ["0", "0", "0", "0", "3,213,370.46"], total: "3,213,370.46", open: 3 },
  { name: "Surma Textile Limited", b: ["0", "0", "0", "0", "2,451,909.81"], total: "2,451,909.81", open: 3 },
  { name: "Rupsha Sweater Ltd", b: ["0", "0", "406,305.72", "0", "1,361,088.7"], total: "1,767,394.42", open: 5 },
  { name: "Teesta International", b: ["0", "0", "0", "0", "1,450,019.33"], total: "1,450,019.33", open: 4 },
  { name: "Karnaphuli Fashion", b: ["0", "0", "106,223.05", "0", "1,176,319.75"], total: "1,282,542.8", open: 4 },
];
const bucketTone = ["text-muted-foreground", "text-muted-foreground", "text-amber-500", "text-amber-500", "text-destructive"];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("arApAging", "ar-ap-aging");
}

function Bucket({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg bg-[var(--gray-bg)] px-2.5 py-2">
      <p className="text-[9.5px] text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-[12px] font-semibold tabular-nums sm:text-[13px] ${tone}`}>{value}</p>
    </div>
  );
}

export default function ArApAgingPage() {
  const content = useTemplateContent("arApAging");
  const { ui } = content;
  const heads = [ui.notDue, ui.d030, ui.d3160, ui.d6190, ui.d90];

  const body = (
    <div>
      <p className="text-lg font-semibold text-foreground">{ui.title}</p>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <span className="rounded-md bg-primary px-2.5 py-1 text-[11.5px] font-medium text-white">{ui.tabAr}</span>
        <span className="rounded-md border border-border bg-card px-2.5 py-1 text-[11.5px] font-medium text-foreground">{ui.tabAp}</span>
        <div className="ms-1">
          <p className="text-[10px] text-muted-foreground">{ui.asOf}</p>
          <div className="mt-0.5 flex items-center gap-2 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1 font-mono text-[11px] text-foreground">
            11/03/2026 <Calendar className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11.5px] font-medium text-foreground">
          <RefreshCw className="h-3 w-3" /> {ui.refresh}
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Bucket label={ui.notDue} value="0" tone="text-[var(--teal)]" />
          <Bucket label={ui.d030} value="0" tone="text-foreground" />
          <Bucket label={ui.d3160} value="587,424.2" tone="text-amber-500" />
          <Bucket label={ui.d6190} value="17,200" tone="text-amber-500" />
          <Bucket label={ui.d90Over} value="20,422,582.42" tone="text-destructive" />
          <div className="rounded-lg bg-primary/10 px-2.5 py-2">
            <p className="text-[9.5px] uppercase text-muted-foreground">{ui.totalOpenCaps}</p>
            <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-primary sm:text-[13px]">BDT 21,027,206.62</p>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-[11px]">
          <thead className="bg-[var(--gray-bg)] text-[10px] font-semibold text-foreground">
            <tr>
              <th className="px-3 py-2 text-start">{ui.thCustomer}</th>
              {heads.map((h, i) => (
                <th key={h} className={`px-2.5 py-2 text-end ${i < 3 ? "hidden md:table-cell" : i === 3 ? "hidden sm:table-cell" : ""}`}>
                  {h}
                </th>
              ))}
              <th className="bg-primary/10 px-2.5 py-2 text-end">{ui.totalOpen}</th>
              <th className="hidden px-2.5 py-2 text-end sm:table-cell">{ui.openNo}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/40" : ""}`}>
                <td className="px-3 py-2 font-medium text-foreground">
                  {r.name} <Pill tone="purple">{ui.buyer}</Pill>
                </td>
                {r.b.map((v, k) => (
                  <td
                    key={k}
                    className={`px-2.5 py-2 text-end font-mono text-[10.5px] ${
                      v === "0" ? "text-muted-foreground" : bucketTone[k]
                    } ${k < 3 ? "hidden md:table-cell" : k === 3 ? "hidden sm:table-cell" : ""}`}
                  >
                    {v}
                  </td>
                ))}
                <td className="bg-primary/5 px-2.5 py-2 text-end font-mono text-[10.5px] text-primary">{r.total}</td>
                <td className="hidden px-2.5 py-2 text-end sm:table-cell">{r.open}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <TemplatePage
      slug="ar-ap-aging"
      prefix="ag"
      appName="AR / AP Aging"
      features={[
        "Receivables aging by customer and payables aging by vendor",
        "As-of date, so you can look at any day",
        "Buckets for not yet due, 0-30, 31-60, 61-90 and 90+ days",
        "Total open amount and number of open documents for each party",
        "Summary cards for each bucket and the total open",
      ]}
      content={content}
      stepTones={["teal", "amber", "red"]}
      connectStructure={[
        { key: "before", tools: ["invoicesAr", "billsAp", "customers", "vendors"] },
        { key: "after", tools: ["receipts", "chequeRegister"] },
        { key: "shows", tools: ["financialReports", "accountingHub", "ledgers"] },
      ]}
      localIcons={[Users, Clock3, BellRing, CalendarClock]}
      preview={<TemplatePreview prefix="ag" toolKey="arApAging" content={content} cols={[]} rows={[]} body={body} />}
    />
  );
}
