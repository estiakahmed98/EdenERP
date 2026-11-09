import LiveDemoButton from "@/components/live-demo-button";
/**
 * Adon ERP public site: /[locale]/apps/accounting/journal-entries
 * Single-file page. All copy lives in messages/*.json under
 * pages.accountingShowcase.journal (and .common for the shared pieces).
 * Needs: Next.js App Router, Tailwind v4 with the Adon global CSS, lucide-react.
 *
 * Angle for this page (see the Design Pattern Guide, section 5):
 *   Who is reading:   the accountant, and the owner who signs off month-end
 *   The question:     "How do we record what an invoice or bill can't, and know it balances?"
 *   The real story:   closing October at a food processing company in Dhaka
 *
 * File order:
 *   1. Content (sample data that is not text + message hook)
 *   2. Small shared pieces (buttons, JSON-LD)
 *   3. Product preview (coded copy of the Journal Entries screen)
 *   4. The page (5 sections)
 */
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  CalendarClock,
  Check,
  ChevronDown,
  Download,
  Factory,
  Gift,
  Landmark,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Undo2,
  X,
  Zap,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

import {
  NS,
  SITE_URL,
  accountingMetadata,
  industryGroupHref,
  industryGroups,
  industryItemHref,
  toolSlugs,
  useCommon,
  type ToolKey,
} from "../_shared";

/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */

type Faq = { q: string; a: string };
type Row = { label: string; question: string; body: string };

const SAMPLE_COMPANY = "Meghla Agro Foods Ltd";
const FORM_TOTAL = "185,000";

/** Non-translatable parts of the sample data. Text comes from the messages. */
const sampleEntries = [
  { no: "JE-2026-004318", amount: "185,000" },
  { no: "JE-2026-004317", amount: "1,264,500" },
  { no: "JE-2026-004316", amount: "86,420" },
  { no: "JE-2026-004315", amount: "210,000" },
  { no: "JE-2026-004314", amount: "120,000" },
  { no: "JE-2026-004313", amount: "120,000" },
  { no: "JE-2026-004312", amount: "3,000" },
];

const formLines = [
  { amount: "185,000", side: "dr" as const },
  { amount: "185,000", side: "cr" as const },
];

const noteCols = ["lg:col-span-3", "lg:col-span-4", "lg:col-span-5"];

const localKeys = ["salary", "bonus", "power", "bank", "machine", "reverse"] as const;

const connectGroups: { key: string; tools: ToolKey[] }[] = [
  { key: "setUp", tools: ["chartOfAccounts"] },
  { key: "recorded", tools: ["invoicesAr", "receipts", "billsAp", "pettyCash"] },
  { key: "shows", tools: ["ledgers", "financialReports", "accountingHub", "closingFy"] },
];

function useJournalContent() {
  const t = useTranslations(`${NS}.journal`);
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    sample: t.raw("sample") as {
      total: string;
      entries: string[];
      form: { description: string; ledger: string; project: string; accounts: string[] };
      notes: string[];
    },
    ui: t.raw("ui") as Record<string, string>,
    explain: t.raw("explain") as {
      title: string;
      intro: string;
      rows: Row[];
      refresher: { title: string; intro: string; head: string[]; rows: string[][]; tip: string };
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
      points: { title: string; body: string; entry: string }[];
      day: { title: string; intro: string; steps: { time: string; text: string }[] };
    },
    industries: t.raw("industries") as {
      title: string;
      intro: string;
      angles: Record<string, string>;
    },
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

function SecondaryButton({
  href,
  children,
  inverted = false,
}: {
  href: string;
  children: ReactNode;
  inverted?: boolean;
}) {
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

/** Renders one or more JSON-LD blocks. Server component, no client JS. */
function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here; we escape "<" to avoid </script> injection.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(d).replace(/</g, "\\u003c"),
          }}
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

/* ================================================================== */
/* 3. PRODUCT PREVIEW                                                 */
/* ================================================================== */

/**
 * A coded (not screenshot) preview of the Journal Entries screen:
 * the list on the left, the New Journal Entry form on the right.
 * Handwritten notes above it on large screens draw in once on load.
 */

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 46"
      className="je-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary"
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

function FakeSelect({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-[var(--gray-bg)] px-3 py-2 text-[12.5px] text-foreground">
      <span className="truncate">{value}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </div>
  );
}

function FormLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 text-[11.5px] font-medium text-muted-foreground">{children}</p>;
}

function JournalPreview() {
  const { sample, ui } = useJournalContent();
  const { t: common, tools } = useCommon();
  const f = sample.form;

  return (
    <figure className="relative">
      <style>{`
        @keyframes je-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes je-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .je-note-arrow path { stroke-dasharray: 80; animation: je-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .je-note-text { animation: je-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) {
          .je-note-arrow path, .je-note-text { animation: none }
        }
      `}</style>

      {/* Handwritten notes (lg and up): JE number, Dr/Cr columns, the form's totals */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:px-2" aria-hidden="true">
        {sample.notes.map((text, i) => (
          <div
            key={text}
            className={`${noteCols[i]} flex flex-col items-start ${i === 1 ? "items-end pe-16" : ""} ${i === 2 ? "ps-10" : ""}`}
            style={{ ["--d" as string]: `${0.5 + i * 0.25}s` }}
          >
            <p className="je-note-text showcase-heading-highlight max-w-[13rem] ps-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary">
              {text}
            </p>
            <div className="ps-6">
              <Arrow />
            </div>
          </div>
        ))}
      </div>

      {/* The product frame, clipped with a fade mask */}
      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        <div className="relative max-h-[560px] overflow-hidden sm:max-h-[520px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools.journalEntries}</span>
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
                <p className="text-lg font-semibold text-foreground">{tools.journalEntries}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
                    <Plus className="h-3 w-3" /> {ui.newEntry}
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
                  <span className="inline-flex w-40 items-center gap-1.5 rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[11.5px] text-muted-foreground">
                    <Search className="h-3 w-3" /> {common("search")}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="me-1">{sample.total}</span>
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
                      <th className="w-[6.6rem] px-3 py-2 text-start">{ui.thJe}</th>
                      <th className="px-3 py-2 text-start">{ui.thDescription}</th>
                      <th className="hidden w-[5.6rem] px-3 py-2 text-end sm:table-cell">{ui.thDebits}</th>
                      <th className="w-[5.6rem] px-3 py-2 text-end">{ui.thCredits}</th>
                      <th className="hidden w-[4.2rem] px-3 py-2 text-start md:table-cell">{ui.thPosted}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleEntries.map((e, i) => (
                      <tr key={e.no} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                        <td className="px-3 py-2.5 align-top font-medium leading-tight text-primary tabular-nums">{e.no}</td>
                        <td className="truncate px-3 py-2.5 text-foreground">{sample.entries[i]}</td>
                        <td className="hidden px-3 py-2.5 text-end text-[var(--teal)] tabular-nums sm:table-cell">{e.amount}</td>
                        <td className="px-3 py-2.5 text-end text-destructive tabular-nums">{e.amount}</td>
                        <td className="hidden px-3 py-2.5 md:table-cell">
                          <span className="rounded bg-[var(--teal)]/12 px-1.5 py-0.5 text-[10px] font-medium text-[var(--teal)]">
                            {ui.posted}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* the New Journal Entry form */}
            <div className="order-first lg:order-none lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{ui.formTitle}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="space-y-3 px-4 py-4">
                  <div>
                    <FormLabel>{ui.description}</FormLabel>
                    <div className="rounded-md border border-border bg-[var(--gray-bg)] px-3 py-2 text-[12.5px] text-foreground">
                      {f.description}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FormLabel>{ui.ledger}</FormLabel>
                      <FakeSelect value={f.ledger} />
                    </div>
                    <div>
                      <FormLabel>{ui.project}</FormLabel>
                      <FakeSelect value={f.project} />
                    </div>
                  </div>
                  <div>
                    <FormLabel>{ui.lines}</FormLabel>
                    <div className="space-y-2">
                      {formLines.map((l, i) => (
                        <div key={i} className="grid grid-cols-[1fr_5.5rem_3.6rem] gap-2">
                          <FakeSelect value={f.accounts[i]} />
                          <div className="rounded-md border border-border bg-[var(--gray-bg)] px-2 py-2 text-end text-[12.5px] text-foreground tabular-nums">
                            {l.amount}
                          </div>
                          <FakeSelect value={ui[l.side]} />
                        </div>
                      ))}
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11.5px] font-medium text-foreground">
                      <Plus className="h-3 w-3" /> {ui.addLine}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 border-t border-border pt-3 text-[12px] tabular-nums">
                    <span className="text-[var(--teal)]">{ui.drTotal.replace("{total}", FORM_TOTAL)}</span>
                    <span className="text-destructive">{ui.crTotal.replace("{total}", FORM_TOTAL)}</span>
                    <Check className="h-4 w-4 text-[var(--teal)]" aria-label={ui.balanced} />
                  </div>
                  <div className="flex justify-end gap-2 pt-1 text-[12.5px] font-medium">
                    <span className="rounded-md border border-border px-3 py-1.5 text-foreground">{common("cancel")}</span>
                    <span className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">{ui.createJe}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fade mask over the cut edge */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent"
            aria-hidden="true"
          />

          {/* demo overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-7 pt-12">
            <p className="text-center text-[13.5px] text-muted-foreground">{ui.previewNote}</p>
            <LiveDemoButton />
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{ui.caption}</figcaption>
    </figure>
  );
}

/* ================================================================== */
/* 4. PAGE                                                            */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("journal", "journal-entries");
}

/* Small helpers kept local: they only make sense on this page's rhythm. */
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 =
  "showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]";
const lead = "text-[17px] leading-[1.65] text-muted-foreground";
const link =
  "rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Faint ruled-ledger lines behind the hero preview. */
const ruled = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
};

const localIcons = {
  salary: CalendarClock,
  bonus: Gift,
  power: Zap,
  bank: Landmark,
  machine: Factory,
  reverse: Undo2,
};

export default function JournalEntriesPage() {
  const locale = useLocale();
  const { hero, explain, connect, local, industries, faq, closing, description } = useJournalContent();
  const { t: common, tools, groups, items } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Journal Entries",
    url: `${SITE_URL}/${locale}/apps/accounting/journal-entries`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: [
      "Double-entry journal entries with multiple lines",
      "Live debit and credit totals with balance check",
      "Optional project tagging",
      "Year-based entry numbering",
      "Search, CSV and Excel export, print",
    ],
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section
        aria-labelledby="je-title"
        className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24"
      >
        <div
          className="absolute inset-x-0 bottom-0 top-[46%] opacity-80"
          style={ruled}
          aria-hidden="true"
        />
        <div className={`${wrap} relative`}>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="je-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <LiveDemoButton />
                <SecondaryButton href="#month-end">{hero.secondaryCta}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">{common("onboardingNote")}</p>
            </div>
          </div>

          <div className="mt-12 lg:mt-16">
            <JournalPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. The entry, field by field ============ */}
      <section aria-labelledby="explain-title" className="py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="explain-title" className={h2}>
                {explain.title}
              </h2>
              <p className={`${lead} mt-5`}>{explain.intro}</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-b border-border">
              {explain.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]"
                >
                  <dt>
                    <span className="block text-[14px] font-medium text-primary">{r.label}</span>
                    <span className="mt-1.5 block text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {r.question}
                    </span>
                  </dt>
                  <dd className="text-[15.5px] leading-[1.7] text-muted-foreground">{r.body}</dd>
                </div>
              ))}
            </dl>

            {/* Debit and credit refresher */}
            <div className="mt-16">
              <h3 className="text-[1.25rem] font-semibold text-foreground">{explain.refresher.title}</h3>
              <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">
                {explain.refresher.intro}
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-y border-border text-start text-[14.5px]">
                  <thead>
                    <tr className="text-[13px] text-muted-foreground">
                      {explain.refresher.head.map((h) => (
                        <th key={h} scope="col" className="py-3 pe-4 text-start font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {explain.refresher.rows.map((row) => (
                      <tr key={row[0]} className="border-t border-border">
                        <th scope="row" className="py-3 pe-4 text-start font-semibold text-foreground">
                          {row[0]}
                        </th>
                        <td className="py-3 pe-4 text-[var(--teal)]">{row[1]}</td>
                        <td className="py-3 pe-4 text-destructive">{row[2]}</td>
                        <td className="py-3 text-muted-foreground">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 flex max-w-[62ch] gap-3 text-[15px] leading-[1.65] text-muted-foreground">
                <ArrowLeftRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {explain.refresher.tip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. Where journals sit among the tools ============ */}
      <section
        id="tools"
        aria-labelledby="tools-title"
        className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28"
      >
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

      {/* ============ 4. Month-end in Bangladesh ============ */}
      <section id="month-end" aria-labelledby="local-title" className="scroll-mt-20 py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="local-title" className={h2}>
              {local.title}
            </h2>
            <p className={`${lead} mt-5`}>{local.intro}</p>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
              {local.points.map((p, i) => {
                const Icon = localIcons[localKeys[i]];
                return (
                  <li key={p.title}>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--purple-light)] text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                    <p className="mt-3 border-s-2 border-primary/30 ps-3 text-[13.5px] font-medium text-foreground/85">
                      {p.entry}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8 lg:sticky lg:top-24">
                <h3 className="text-[1.3rem] font-semibold text-foreground">{local.day.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground">{local.day.intro}</p>
                <ol className="mt-6 space-y-0">
                  {local.day.steps.map((s, i) => (
                    <li key={s.time} className="relative grid grid-cols-[5.25rem_1fr] gap-3 pb-6 last:pb-0">
                      {i < local.day.steps.length - 1 && (
                        <span
                          className="absolute bottom-[-6px] start-[6rem] top-[22px] w-px bg-primary/25"
                          aria-hidden="true"
                        />
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
        </div>
      </section>

      {/* ============ 5. Industries, FAQ, next step ============ */}
      <section
        aria-labelledby="industries-title"
        className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28"
      >
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="industries-title" className={h2}>
              {industries.title}
            </h2>
            <p className={`${lead} mt-5`}>{industries.intro}</p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {industryGroups.map((g) => (
              <div key={g.slug}>
                <h3 className="border-b border-border pb-3 text-[16px] font-semibold text-primary">
                  <Link href={industryGroupHref} className={link}>
                    {groups[g.slug]}
                  </Link>
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-muted-foreground">{industries.angles[g.slug]}</p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((item) => (
                    <li key={item}>
                      {industryItemHref(g.slug, item) ? (<Link href={industryItemHref(g.slug, item)!} className={`${link} text-[14.5px] text-foreground/85`}>{items[item]}</Link>) : (<span className="text-[14.5px] text-foreground/85">{items[item]}</span>)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

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
