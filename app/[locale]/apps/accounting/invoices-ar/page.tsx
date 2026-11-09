import LiveDemoButton from "@/components/live-demo-button";
/**
 * Adon ERP public site: /[locale]/apps/accounting/invoices-ar
 * Single-file page. All copy lives in messages/*.json under
 * pages.accountingShowcase.invoices (and .common for the shared pieces).
 *
 * ALL DATA ON THIS PAGE IS DUMMY. Company "Your Company Ltd", buyers named
 * Alpha / Bravo / Charlie..., BIN 000000000-0000. Never put real client data here.
 *
 * Angle (Design Pattern Guide, section 5):
 *   Who is reading:  the accounts executive who raises invoices, and the owner
 *   The question:    "How do we bill a buyer, hand over a proper Mushak-6.3,
 *                     and know what is still owed?"
 *   The real story:  one order from a garments buyer, from delivery to paid
 */
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Download,
  FileText,
  Hash,
  Languages,
  Plus,
  Printer,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

import {
  NS,
  SITE_URL,
  accountingMetadata,
  industryGroupHref,
  toolSlugs,
  useCommon,
  type ToolKey,
} from "../_shared";

/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */

type Faq = { q: string; a: string };
type Status = "draft" | "approved" | "paid" | "canceled";

const SAMPLE_COMPANY = "Your Company Ltd";

/** DUMMY data for the product preview. Text comes from the messages. */
const sampleInvoices: { no: string; customer: string; status: Status; amount: string; paid: string }[] = [
  { no: "INV-2026-000120", customer: "Alpha Knit Ltd", status: "draft", amount: "312,400.00", paid: "0" },
  { no: "INV-2026-000119", customer: "Bravo Denim Ltd", status: "approved", amount: "256,000.00", paid: "150,000.00" },
  { no: "INV-2026-000118", customer: "Charlie Sweaters Ltd", status: "approved", amount: "74,750.00", paid: "0" },
  { no: "INV-2026-000117", customer: "Delta Apparels Ltd", status: "paid", amount: "115,000.00", paid: "115,000.00" },
  { no: "INV-2026-000116", customer: "Echo Fashions Ltd", status: "paid", amount: "48,300.00", paid: "48,300.00" },
  { no: "INV-2026-000115", customer: "Foxtrot Textiles", status: "canceled", amount: "0", paid: "0" },
];

const detail = {
  no: "INV-2026-000117",
  customer: "Delta Apparels Ltd",
  status: "paid" as Status,
  amountDue: "BDT 115,000.00",
  amountPaid: "BDT 115,000.00",
  dueDate: "11/12/2026",
  lines: [
    { qty: "10,000", vat: "15%", vatAmt: "12,000.00", total: "92,000.00" },
    { qty: "5,000", vat: "15%", vatAmt: "3,000.00", total: "23,000.00" },
  ],
};

const mushak = {
  supplier: "Your Company Ltd",
  bin: "000000000-0000",
  buyer: "Delta Apparels Ltd",
  invoiceNo: "INV-2026-000117",
  rows: [
    { qty: "10,000", value: "80,000.00", vat: "12,000.00", total: "92,000.00" },
    { qty: "5,000", value: "20,000.00", vat: "3,000.00", total: "23,000.00" },
  ],
  totals: { value: "1,00,000.00", vat: "15,000.00", total: "1,15,000.00" },
};

const noteCols = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-5"];
const localKeys = ["form", "bin", "lang", "words"] as const;
const lifecycleStatuses: Status[] = ["draft", "approved", "paid"];

const lifecycleSteps = lifecycleStatuses;
const connectGroups: { key: string; tools: ToolKey[] }[] = [
  { key: "before", tools: ["customers", "itemsProducts", "deliveryChallans"] },
  { key: "after", tools: ["receipts", "chequeRegister", "bankAccounts"] },
  { key: "shows", tools: ["vatRegister", "accountingHub", "financialReports"] },
];
const industryRoutes = ["retail", "food-hospitality", "real-estate", "consulting", "manufacturing", "health-fitness", "trades", "others"];

const statusStyle: Record<Status, string> = {
  draft: "bg-muted text-muted-foreground",
  approved: "bg-[var(--teal)]/12 text-[var(--teal)]",
  paid: "bg-[var(--teal)]/12 text-[var(--teal)]",
  canceled: "bg-muted text-muted-foreground",
};

function useInvoicesContent() {
  const t = useTranslations(`${NS}.invoices`);
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    sample: t.raw("sample") as { count: string; terms: string; lineItems: string[]; notes: string[] },
    status: t.raw("status") as Record<Status, string>,
    ui: t.raw("ui") as Record<string, string>,
    lifecycle: t.raw("lifecycle") as {
      title: string;
      intro: string;
      steps: { question: string; body: string }[];
      aside: { body: string };
      formTitle: string;
      form: { label: string; body: string }[];
    },
    connect: t.raw("connect") as {
      title: string;
      intro: string;
      groups: Record<string, string>;
      items: Record<string, string>;
    },
    local: t.raw("local") as {
      title: string;
      intro: string;
      points: { title: string; body: string }[];
      words: string;
      story: { title: string; intro: string; steps: { time: string; text: string }[] };
    },
    industries: t.raw("industries") as { title: string; angles: Record<string, string> },
    faq: t.raw("faq") as { title: string; items: Faq[] },
    closing: t.raw("closing") as { title: string },
    description: t("meta.description"),
  };
}

/* ================================================================== */
/* 2. SHARED PIECES                                                   */
/* ================================================================== */

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function SecondaryButton({ href, children, inverted = false }: { href: string; children: ReactNode; inverted?: boolean }) {
  return (
    <Link
      href={href}
      className={
        inverted
          ? `${base} border border-white/35 text-white hover:bg-white/10`
          : `${base} border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary`
      }
    >
      {children}
    </Link>
  );
}

function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function StatusPill({ status }: { status: Status }) {
  const t = useTranslations(`${NS}.invoices.status`);
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${statusStyle[status]}`}>{t(status)}</span>
  );
}

/* ================================================================== */
/* 3. PRODUCT PREVIEW                                                 */
/* ================================================================== */

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 46"
      className="inv-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3c10 6 16 14 13 24-1.5 5-3.5 9-5 14" />
      <path d="M10.5 36.5 16 42l4.5-6.5" />
    </svg>
  );
}

function InvoicesPreview() {
  const { sample, ui } = useInvoicesContent();
  const { t: common, tools } = useCommon();
  const d = detail;

  return (
    <figure className="relative">
      <style>{`
        @keyframes inv-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes inv-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .inv-note-arrow path { stroke-dasharray: 80; animation: inv-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .inv-note-text { animation: inv-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) { .inv-note-arrow path, .inv-note-text { animation: none } }
      `}</style>

      {/* Handwritten notes (lg and up): Status column, Paid column, VAT in the detail panel */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:px-2" aria-hidden="true">
        {sample.notes.map((text, i) => (
          <div
            key={text}
            className={`${noteCols[i]} flex flex-col ${i === 0 ? "items-end pe-6" : "items-start"} ${i === 2 ? "ps-24" : ""}`}
            style={{ ["--d" as string]: `${0.5 + i * 0.25}s` }}
          >
            <p className="inv-note-text showcase-heading-highlight max-w-[13rem] ps-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary">
              {text}
            </p>
            <div className="ps-6">
              <Arrow />
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        <div className="relative max-h-[600px] overflow-hidden sm:max-h-[520px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/ {ui.crumb} /</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools.invoicesAr}</span>
            </div>
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] font-medium text-foreground">
              <span className="truncate">{SAMPLE_COMPANY}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12">
            {/* the list */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-foreground">{ui.listTitle}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
                    <Plus className="h-3 w-3" /> {ui.newInvoice}
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
                  <span className="inline-flex w-36 items-center gap-1.5 rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[11.5px] text-muted-foreground">
                    <Search className="h-3 w-3" /> {common("search")}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="me-1">{sample.count}</span>
                    <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground">
                      <Download className="h-3 w-3" /> {common("csv")}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground">
                      <Download className="h-3 w-3" /> {common("excel")}
                    </span>
                    <span className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground sm:inline-flex">
                      <Printer className="h-3 w-3" /> {common("print")}
                    </span>
                  </div>
                </div>

                <table className="w-full table-fixed text-[11.5px]">
                  <thead className="bg-[var(--gray-bg)] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="hidden w-[7rem] px-3 py-2 text-start sm:table-cell">{ui.thInvoiceNo}</th>
                      <th className="px-3 py-2 text-start">{ui.thCustomer}</th>
                      <th className="w-[4.6rem] px-2 py-2 text-start">{ui.thStatus}</th>
                      <th className="w-[5.6rem] px-2 py-2 text-end">{ui.thAmount}</th>
                      <th className="w-[5.6rem] px-3 py-2 text-end">{ui.thPaid}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleInvoices.map((inv, i) => (
                      <tr key={inv.no} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                        <td className="hidden px-3 py-2.5 font-medium text-primary tabular-nums sm:table-cell">{inv.no}</td>
                        <td className="truncate px-3 py-2.5 text-foreground">{inv.customer}</td>
                        <td className="px-2 py-2.5">
                          <StatusPill status={inv.status} />
                        </td>
                        <td className="px-2 py-2.5 text-end text-[var(--teal)] tabular-nums">{inv.amount}</td>
                        <td className="px-3 py-2.5 text-end text-primary tabular-nums">{inv.paid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* invoice detail panel */}
            <div className="order-first lg:order-none lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{ui.detailTitle.replace("{no}", d.no)}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="px-4 py-4">
                  <dl className="grid grid-cols-3 gap-x-3 gap-y-3 text-[11.5px]">
                    <div>
                      <dt className="text-muted-foreground">{ui.customer}</dt>
                      <dd className="mt-0.5 font-medium text-foreground">{d.customer}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.status}</dt>
                      <dd className="mt-1">
                        <StatusPill status={d.status} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.terms}</dt>
                      <dd className="mt-0.5 text-foreground">{sample.terms}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.amountDue}</dt>
                      <dd className="mt-0.5 font-semibold text-[var(--teal)] tabular-nums">{d.amountDue}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.amountPaid}</dt>
                      <dd className="mt-0.5 font-semibold text-primary tabular-nums">{d.amountPaid}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.dueDate}</dt>
                      <dd className="mt-0.5 text-foreground tabular-nums">{d.dueDate}</dd>
                    </div>
                  </dl>

                  <table className="mt-4 w-full text-[11px]">
                    <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-start">{ui.thItem}</th>
                        <th className="py-1.5 text-end">{ui.thQty}</th>
                        <th className="py-1.5 text-end">{ui.thVat}</th>
                        <th className="py-1.5 text-end">{ui.thVatAmt}</th>
                        <th className="py-1.5 text-end">{ui.thTotal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.lines.map((l, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="py-2 pe-2 text-foreground">{sample.lineItems[i]}</td>
                          <td className="py-2 text-end tabular-nums text-foreground">{l.qty}</td>
                          <td className="py-2 text-end tabular-nums text-muted-foreground">{l.vat}</td>
                          <td className="py-2 text-end tabular-nums text-amber-600 dark:text-amber-400">{l.vatAmt}</td>
                          <td className="py-2 text-end font-medium tabular-nums text-foreground">{l.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex justify-end gap-2 text-[11.5px] font-medium">
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-foreground">
                      <Printer className="h-3 w-3" /> {ui.printBill}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-foreground">
                      <Printer className="h-3 w-3" /> {ui.mushak}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/90 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6 pt-10">
            <LiveDemoButton />
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{ui.caption}</figcaption>
    </figure>
  );
}

/** A small, paper-like copy of the Mushak-6.3 (dummy data). The form itself is bilingual by law, so its headings stay as printed. */
function MushakPreview() {
  const { sample, local, ui } = useInvoicesContent();
  const m = mushak;
  return (
    <figure>
      <div className="rounded-xl border border-border bg-white p-5 text-[#1b1b1b] shadow-[0_30px_60px_-34px_oklch(0.3_0.08_257/0.4)] sm:p-7" dir="ltr">
        <div className="text-center text-[11px] leading-snug">
          <p className="font-semibold">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার / Government of the People’s Republic of Bangladesh</p>
          <p>জাতীয় রাজস্ব বোর্ড / National Board of Revenue</p>
          <p className="mx-auto mt-3 inline-block border-2 border-[#1b1b1b] px-4 py-1 text-[14px] font-bold">
            মূসক-৬.৩ / MUSHAK-6.3
          </p>
          <p className="mt-1 font-semibold">কর চালানপত্র / TAX INVOICE</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 border border-[#1b1b1b]/40 text-[10.5px]">
          <div className="border-b border-r border-[#1b1b1b]/40 p-2">
            <dt className="font-semibold">সরবরাহকারীর নাম / Supplier</dt>
            <dd>{m.supplier}</dd>
          </div>
          <div className="border-b border-[#1b1b1b]/40 p-2">
            <dt className="font-semibold">চালানপত্র নম্বর / Invoice No.</dt>
            <dd className="tabular-nums">{m.invoiceNo}</dd>
          </div>
          <div className="border-r border-[#1b1b1b]/40 p-2">
            <dt className="font-semibold">BIN নম্বর / Registration No.</dt>
            <dd className="tabular-nums">{m.bin}</dd>
          </div>
          <div className="p-2">
            <dt className="font-semibold">ক্রেতার নাম / Buyer</dt>
            <dd>{m.buyer}</dd>
          </div>
        </dl>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[26rem] border border-[#1b1b1b]/40 text-[10.5px]">
            <thead className="bg-[#f1f1f1]">
              <tr>
                <th className="border border-[#1b1b1b]/40 p-1.5 text-left">পণ্য / Goods</th>
                <th className="border border-[#1b1b1b]/40 p-1.5 text-right">Qty</th>
                <th className="border border-[#1b1b1b]/40 p-1.5 text-right">মূল্য / Value</th>
                <th className="border border-[#1b1b1b]/40 p-1.5 text-right">ভ্যাট / VAT 15%</th>
                <th className="border border-[#1b1b1b]/40 p-1.5 text-right">মোট / Total</th>
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r, i) => (
                <tr key={i}>
                  <td className="border border-[#1b1b1b]/40 p-1.5">{sample.lineItems[i]}</td>
                  <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{r.qty}</td>
                  <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{r.value}</td>
                  <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{r.vat}</td>
                  <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{r.total}</td>
                </tr>
              ))}
              <tr className="bg-[#f1f1f1] font-semibold">
                <td colSpan={2} className="border border-[#1b1b1b]/40 p-1.5 text-right">মোট / Total</td>
                <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{m.totals.value}</td>
                <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{m.totals.vat}</td>
                <td className="border border-[#1b1b1b]/40 p-1.5 text-right tabular-nums">{m.totals.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3 border border-[#1b1b1b]/40 p-2 text-[10.5px]">
          <span className="font-semibold">সর্বমোট মূল্য (কথায়) / Grand Total (in words): </span>
          {local.words}
        </p>
        <p className="mt-2 text-[9.5px] text-[#555]">{ui.preparedUnder}</p>
      </div>
      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{ui.mushakCaption}</figcaption>
    </figure>
  );
}

/* ================================================================== */
/* 4. PAGE                                                            */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("invoices", "invoices-ar");
}

const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 = "showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]";
const lead = "text-[17px] leading-[1.65] text-muted-foreground";
const link =
  "rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const ruled = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
};

const localIcons = { form: FileText, bin: Hash, lang: Languages, words: BadgeCheck };

export default function InvoicesPage() {
  const locale = useLocale();
  const { hero, lifecycle, connect, local, industries, faq, closing, description } = useInvoicesContent();
  const { t: common, tools, groups } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Invoices (AR)",
    url: `${SITE_URL}/${locale}/apps/accounting/invoices-ar`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: [
      "Customer invoices with VAT per line",
      "Mushak-6.3 tax invoice in Bangla and English",
      "Commercial bill with amount in words",
      "Draft, approved, paid and canceled statuses",
      "Part payments tracked against each invoice",
      "Search, CSV and Excel export, print",
    ],
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section aria-labelledby="inv-title" className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="inv-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <LiveDemoButton />
                <SecondaryButton href="#mushak">{hero.secondaryCta}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">{common("onboardingNote")}</p>
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <InvoicesPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. The life of an invoice ============ */}
      <section aria-labelledby="life-title" className="py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="life-title" className={h2}>
                {lifecycle.title}
              </h2>
              <p className={`${lead} mt-5`}>{lifecycle.intro}</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {lifecycle.steps.map((s, i) => (
                <li key={lifecycleSteps[i]} className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]">
                  <div>
                    <StatusPill status={lifecycleSteps[i]} />
                    <h3 className="mt-2.5 text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {s.question}
                    </h3>
                  </div>
                  <p className="text-[15.5px] leading-[1.7] text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex max-w-[62ch] items-start gap-3 text-[15px] leading-[1.65] text-muted-foreground">
              <StatusPill status="canceled" />
              <span>{lifecycle.aside.body}</span>
            </p>

            <h3 className="mt-16 text-[1.25rem] font-semibold text-foreground">{lifecycle.formTitle}</h3>
            <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {lifecycle.form.map((f) => (
                <div key={f.label} className="border-s-2 border-primary/25 ps-5">
                  <dt className="text-[16px] font-semibold text-foreground">{f.label}</dt>
                  <dd className="mt-1.5 text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 3. Connected tools ============ */}
      <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="tools-title" className={h2}>
              {connect.title}
            </h2>
            <p className={`${lead} mt-5`}>{connect.intro}</p>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {connectGroups.map((g) => (
              <div key={g.key}>
                <h3 className="border-b-2 border-primary pb-3 text-[15px] font-semibold text-foreground">{connect.groups[g.key]}</h3>
                <ul className="mt-2">
                  {g.tools.map((key) => (
                    <li key={key} className="border-b border-border/80 py-4 last:border-b-0">
                      <Link
                        href={`/apps/accounting/${toolSlugs[key]}`}
                        className={`${link} text-[15px] font-medium text-foreground`}
                      >
                        {tools[key]}
                      </Link>
                      <p className="mt-1 text-[13.5px] leading-[1.55] text-muted-foreground">{connect.items[key]}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. Mushak-6.3 + one order's story ============ */}
      <section id="mushak" aria-labelledby="local-title" className="scroll-mt-20 py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="local-title" className={h2}>
              {local.title}
            </h2>
            <p className={`${lead} mt-5`}>{local.intro}</p>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MushakPreview />
            </div>
            <ul className="grid content-start gap-y-9 lg:col-span-5">
              {local.points.map((p, i) => {
                const Icon = localIcons[localKeys[i]];
                return (
                  <li key={p.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--purple-light)] text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-20 rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h3 className="text-[1.4rem] font-semibold text-foreground">{local.story.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{local.story.intro}</p>
              </div>
              <ol className="lg:col-span-8">
                {local.story.steps.map((s, i) => (
                  <li key={i} className="relative grid grid-cols-[5.25rem_1fr] gap-3 pb-6 last:pb-0">
                    {i < local.story.steps.length - 1 && (
                      <span className="absolute bottom-[-6px] start-[6rem] top-[22px] w-px bg-primary/25" aria-hidden="true" />
                    )}
                    <time className="pt-0.5 text-[14px] font-semibold text-primary tabular-nums">{s.time}</time>
                    <p className="relative ps-5 text-[15px] leading-[1.6] text-foreground/90 before:absolute before:start-[-4.5px] before:top-[9px] before:h-2 before:w-2 before:rounded-full before:bg-primary">
                      {s.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. Industries, FAQ, next step ============ */}
      <section aria-labelledby="industries-title" className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className={wrap}>
          <h2 id="industries-title" className={h2}>
            {industries.title}
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {industryRoutes.map((slug) => (
              <li key={slug} className="border-t border-border pt-4">
                <Link href={industryGroupHref} className={`${link} text-[16px] font-semibold text-primary`}>
                  {groups[slug]}
                </Link>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-muted-foreground">{industries.angles[slug]}</p>
              </li>
            ))}
          </ul>

          <div className="mt-24 grid gap-10 lg:grid-cols-12">
            <h2 id="faq-title" className={`${h2} lg:col-span-4`}>
              {faq.title}
            </h2>
            <div className="divide-y divide-border border-y border-border lg:col-span-8">
              {faq.items.map((f) => (
                <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm text-[17px] font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    <h3>{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-24 overflow-hidden rounded-2xl bg-[var(--purple-dark)] px-6 py-12 text-white sm:px-12 sm:py-16 dark:bg-[var(--purple-light)]">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem]">
                  {closing.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/75">{common("closingBody")}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <LiveDemoButton />
                <SecondaryButton href="/apps/accounting" inverted>
                  {common("exploreAccounting")}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
