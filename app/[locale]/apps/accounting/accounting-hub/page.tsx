import LiveDemoButton from "@/components/live-demo-button";
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  Banknote,
  BarChart3,
  BookOpen,
  Building2,
  CalendarRange,
  ChevronDown,
  FileText,
  Globe,
  Landmark,
  Languages,
  LayoutGrid,
  Lock,
  Percent,
  Receipt,
  ReceiptText,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

import {
  NS,
  SITE_URL,
  accountingMetadata,
  industryGroups,
  toolSlugs,
  useCommon,
  type ToolKey,
} from "../_shared";

/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */

/*
 * All copy lives in messages/*.json under pages.accountingShowcase.hub
 * (and .common for the shared pieces). What stays here is the part that
 * is not text: sample figures, tones, icons and links.
 */

type Faq = { q: string; a: string };
type Unit = "cr" | "lakh";

const SAMPLE_COMPANY = "Nodi Polymer Industries";
const GROSS_MARGIN = "31.2%";

/** Sample company shown inside the product preview. Invented data. */
const kpis = [
  { key: "revenue", short: "3.46", unit: "cr", full: "BDT 34,621,845.50", tone: "positive" },
  { key: "net", short: "41.2", unit: "lakh", full: "BDT 4,118,320.75", tone: "positive" },
  { key: "ar", short: "1.84", unit: "cr", full: "BDT 18,402,960.00", tone: "warning" },
  { key: "ap", short: "26.7", unit: "lakh", full: "BDT 2,671,415.20", tone: "neutral" },
  { key: "assets", short: "12.9", unit: "cr", full: "BDT 129,384,602.10", tone: "neutral" },
] as const satisfies readonly {
  key: string;
  short: string;
  unit: Unit;
  full: string;
  tone: "positive" | "negative" | "warning" | "neutral";
}[];

/** Income statement in crore. Revenue - COGS = gross profit; - opex = net income. */
const incomeStatement = [
  { key: "revenue", value: 3.46, kind: "in" },
  { key: "cogs", value: 2.38, kind: "out" },
  { key: "grossProfit", value: 1.08, kind: "sub" },
  { key: "opex", value: 0.67, kind: "cost" },
  { key: "netIncome", value: 0.41, kind: "result" },
] as const;

/** Operating expenses in lakh, totals 67.0 L */
const opexItems = [
  { key: "salaries", value: 48.9 },
  { key: "utilities", value: 7.2 },
  { key: "transport", value: 5.6 },
  { key: "other", value: 5.3 },
] as const;

const toolGroups: { key: string; tools: ToolKey[] }[] = [
  { key: "keep", tools: ["chartOfAccounts", "journalEntries", "ledgers"] },
  { key: "sell", tools: ["customers", "deliveryChallans", "invoicesAr", "receipts"] },
  { key: "buy", tools: ["vendors", "purchaseOrders", "billsAp", "itemsProducts"] },
  { key: "cash", tools: ["bankAccounts", "chequeRegister", "pettyCash"] },
  { key: "close", tools: ["vatRegister", "financialReports", "closingFy"] },
];

const localKeys = ["receipt", "cheque", "lakh", "language", "companies", "calendar"] as const;

function useHubContent() {
  const t = useTranslations(`${NS}.hub`);
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    units: t.raw("units") as Record<Unit, string>,
    sample: t.raw("sample") as {
      language: string;
      kpis: Record<string, { label: string; note: string }>;
      statement: Record<string, string>;
      opex: Record<string, string>;
    },
    ui: t.raw("ui") as Record<string, string>,
    numbers: t.raw("numbers") as {
      title: string;
      intro: string;
      comesFrom: string;
      rows: { label: string; question: string; body: string; source: string }[];
      chartsTitle: string;
      charts: { title: string; body: string }[];
    },
    tools: t.raw("tools") as {
      title: string;
      intro: string;
      groups: Record<string, string>;
      items: Record<string, string>;
    },
    local: t.raw("local") as {
      title: string;
      intro: string;
      points: { title: string; body: string }[];
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
 * A coded (not screenshot) preview of the real Accounting Hub screen.
 * Crisp on every screen, follows light/dark/theme tokens, and the text
 * inside it is readable by search engines.
 *
 * Handwritten notes sit above the five figures on large screens: the one
 * "human" moment of the page. They draw in once on load.
 */

const sidebar: { key: ToolKey; icon: typeof LayoutGrid; active?: boolean }[] = [
  { key: "accountingHub", icon: LayoutGrid, active: true },
  { key: "chartOfAccounts", icon: BookOpen },
  { key: "journalEntries", icon: FileText },
  { key: "ledgers", icon: BookOpen },
  { key: "invoicesAr", icon: FileText },
  { key: "billsAp", icon: Receipt },
  { key: "purchaseOrders", icon: ShoppingCart },
  { key: "customers", icon: Users },
  { key: "vendors", icon: Users },
  { key: "bankAccounts", icon: Landmark },
  { key: "deliveryChallans", icon: Truck },
  { key: "pettyCash", icon: Wallet },
  { key: "closingFy", icon: Lock },
  { key: "financialReports", icon: BarChart3 },
  { key: "vatRegister", icon: Percent },
];

const toneClass = {
  positive: "text-foreground",
  negative: "text-destructive",
  warning: "text-foreground",
  neutral: "text-foreground",
} as const;

const topBorder = {
  revenue: "before:bg-[var(--teal)]",
  net: "before:bg-[var(--teal)]",
  ar: "before:bg-amber-500",
  ap: "before:bg-destructive",
  assets: "before:bg-primary",
} as const;

const barColor = {
  in: "bg-[var(--teal)]",
  out: "bg-destructive/85",
  sub: "bg-primary",
  cost: "bg-amber-500",
  result: "bg-[var(--teal)]",
} as const;

const donutColors = [
  "var(--primary)",
  "var(--teal)",
  "oklch(0.77 0.16 70)",
  "var(--muted-foreground)",
];

function Donut() {
  const total = opexItems.reduce((s, d) => s + d.value, 0);
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-32 w-32 -rotate-90"
      aria-hidden="true"
    >
      {opexItems.map((d, i) => {
        const len = (d.value / total) * c;
        const el = (
          <circle
            key={d.key}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={donutColors[i]}
            strokeWidth="14"
            strokeDasharray={`${len - 0.8} ${c - len + 0.8}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 46"
      className="hub-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary"
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

function HubPreview() {
  const { units, sample, ui } = useHubContent();
  const { tools } = useCommon();

  const max = Math.max(...incomeStatement.map((d) => d.value));
  const opexTotal = opexItems.reduce((s, d) => s + d.value, 0);

  return (
    <figure className="relative">
      <style>{`
        @keyframes hub-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes hub-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .hub-note-arrow path { stroke-dasharray: 80; animation: hub-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .hub-note-text { animation: hub-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) {
          .hub-note-arrow path, .hub-note-text { animation: none }
        }
      `}</style>

      {/* Handwritten notes, aligned with the five KPI cards (xl and up) */}
      <div
        className="hidden xl:grid xl:grid-cols-[208px_1fr]"
        aria-hidden="true"
      >
        <div />
        <div className="grid grid-cols-5 gap-3 px-6 pb-1">
          {kpis.map((k, i) => (
            <div
              key={k.key}
              className="flex flex-col items-start"
              style={{ ["--d" as string]: `${0.5 + i * 0.18}s` }}
            >
              <p className="hub-note-text showcase-heading-highlight max-w-[11rem] ps-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary">
                {sample.kpis[k.key].note}
              </p>
              <div className="ps-6">
                <Arrow />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The product frame — clipped with a fade mask */}
      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        {/* content wrapper that fades out */}
        <div className="relative max-h-[420px] overflow-hidden sm:max-h-[480px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">
                ERP
              </span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">
                {tools.accountingHub}
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-2 text-[12px]">
              <span className="hidden items-center gap-1 rounded-md border border-border px-2 py-1 text-muted-foreground sm:inline-flex">
                <Globe className="h-3.5 w-3.5" /> {sample.language}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 font-medium text-foreground">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{SAMPLE_COMPANY}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            </div>
          </div>

          <div className="grid xl:grid-cols-[208px_1fr]">
            {/* sidebar — visible but fading toward the bottom */}
            <nav
              className="hidden border-e border-border bg-card px-3 py-4 xl:block"
              aria-label={ui.sidebarAria}
            >
              <ul className="space-y-0.5 text-[12.5px]">
                {sidebar.map(({ key, icon: Icon, active }, i) => (
                  <li
                    key={key}
                    className={
                      active
                        ? "flex items-center gap-2.5 rounded-md bg-primary px-2.5 py-1.5 font-medium text-primary-foreground"
                        : `flex items-center gap-2.5 px-2.5 py-1.5 text-muted-foreground ${
                            i > 7 ? "opacity-40" : ""
                          }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {tools[key]}
                  </li>
                ))}
              </ul>
            </nav>

            {/* main — only top portion visible */}
            <div className="relative min-w-0 px-4 py-5 sm:px-6">
              <div className="mb-4">
                <p className="text-lg font-semibold text-foreground">
                  {tools.accountingHub}
                </p>
                <p className="text-[12.5px] text-muted-foreground">
                  {ui.subtitle}
                </p>
              </div>

              {/* five KPI cards — visible, but lower part fades */}
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {kpis.map((k) => (
                  <div
                    key={k.key}
                    className={`relative overflow-hidden rounded-lg border border-border bg-card px-3.5 pb-3 pt-4 before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${topBorder[k.key]}`}
                  >
                    <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {sample.kpis[k.key].label}
                    </dt>
                    <dd>
                      <span
                        className={`mt-1.5 block text-[1.6rem] font-semibold leading-none tabular-nums ${toneClass[k.tone]}`}
                      >
                        {k.short} {units[k.unit]}
                      </span>
                      <span className="mt-1.5 block text-[10.5px] text-muted-foreground tabular-nums">
                        {k.full}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* charts — only top strip visible, rest cut by container */}
              <div className="mt-3 grid gap-3 lg:grid-cols-[1.55fr_1fr]">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[13px] font-semibold text-foreground">
                      {ui.incomeStatement}
                    </p>
                    <p className="text-[11.5px] text-muted-foreground">
                      {ui.grossMargin}{" "}
                      <span className="font-semibold text-[var(--teal)]">
                        {GROSS_MARGIN}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex h-40 items-end gap-3 border-b border-border sm:gap-5">
                    {incomeStatement.map((d) => (
                      <div
                        key={d.key}
                        className="flex h-full flex-1 flex-col justify-end"
                      >
                        <span className="mb-1 text-center text-[10.5px] text-muted-foreground tabular-nums">
                          {d.value.toFixed(2)} {units.cr}
                        </span>
                        <span
                          className={`block rounded-t-[3px] ${barColor[d.kind]}`}
                          style={{ height: `${(d.value / max) * 82}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-3 sm:gap-5">
                    {incomeStatement.map((d) => (
                      <span
                        key={d.key}
                        className="flex-1 text-center text-[10.5px] leading-tight text-muted-foreground"
                      >
                        {sample.statement[d.key]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-[13px] font-semibold text-foreground">
                    {ui.opexTitle}
                  </p>
                  <div className="mt-3 flex items-center gap-5">
                    <Donut />
                    <ul className="space-y-1.5 text-[11.5px]">
                      {opexItems.map((d, i) => (
                        <li
                          key={d.key}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-[2px]"
                            style={{ background: donutColors[i] }}
                          />
                          {sample.opex[d.key]}
                          <span className="ms-auto ps-2 font-medium text-foreground tabular-nums">
                            {d.value} {units.lakh}
                          </span>
                        </li>
                      ))}
                      <li className="border-t border-border pt-1.5 text-muted-foreground">
                        {ui.total}{" "}
                        <span className="float-end font-medium text-foreground">
                          {opexTotal.toFixed(1)} {units.lakh}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fade mask over the cut edge */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/95 to-transparent"
            aria-hidden="true"
          />

          {/* demo overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 pt-16">
            <p className="text-center text-[13.5px] text-muted-foreground">
              {ui.previewNote}
            </p>
            <LiveDemoButton />
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">
        {ui.caption}
      </figcaption>
    </figure>
  );
}

/* ================================================================== */
/* 4. PAGE                                                            */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("hub", "accounting-hub");
}

/* Small helpers kept local: they only make sense on this page's rhythm. */
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 =
  "showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]";
const lead = "text-[17px] leading-[1.65] text-muted-foreground";
const link =
  "rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Faint ruled-ledger lines, used behind the hero preview and the day timeline. */
const ruled = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
};

const localIcons = {
  receipt: ReceiptText,
  cheque: Banknote,
  language: Languages,
  companies: Building2,
  calendar: CalendarRange,
};

export default function AccountingHubPage() {
  const locale = useLocale();
  const { hero, numbers, tools: toolsCopy, local, industries, faq, closing, description } = useHubContent();
  const { t: common, tools, groups, items } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Accounting Hub",
    url: `${SITE_URL}/${locale}/apps/accounting/accounting-hub`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: toolGroups.flatMap((g) => g.tools.map((key) => tools[key])),
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section
        aria-labelledby="hub-title"
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
              id="hub-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <LiveDemoButton />
                <SecondaryButton href="#tools">{hero.secondaryCta}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">
                {common("onboardingNote")}
              </p>
            </div>
          </div>

          <div className="mt-12 lg:mt-16">
            <HubPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. What the numbers mean ============ */}
      <section aria-labelledby="numbers-title" className="py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="numbers-title" className={h2}>
                {numbers.title}
              </h2>
              <p className={`${lead} mt-5`}>{numbers.intro}</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-b border-border">
              {numbers.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]"
                >
                  <dt>
                    <span className="block text-[14px] font-medium text-primary">
                      {r.label}
                    </span>
                    <span className="mt-1.5 block text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {r.question}
                    </span>
                  </dt>
                  <dd className="text-[15.5px] leading-[1.7] text-muted-foreground">
                    {r.body}
                    <span className="mt-3 block text-[13.5px]">
                      {numbers.comesFrom}{" "}
                      <span className="text-foreground">{r.source}</span>
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-16 text-[1.25rem] font-semibold text-foreground">
              {numbers.chartsTitle}
            </h3>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {numbers.charts.map((c) => (
                <div
                  key={c.title}
                  className="border-s-2 border-primary/25 ps-5"
                >
                  <h4 className="text-[16px] font-semibold text-foreground">
                    {c.title}
                  </h4>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. The tools behind the hub ============ */}
      <section
        id="tools"
        aria-labelledby="tools-title"
        className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28"
      >
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="tools-title" className={h2}>
              {toolsCopy.title}
            </h2>
            <p className={`${lead} mt-5`}>{toolsCopy.intro}</p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {toolGroups.map((g) => (
              <div key={g.key}>
                <h3 className="border-b-2 border-primary pb-3 text-[15px] font-semibold text-foreground">
                  {toolsCopy.groups[g.key]}
                </h3>
                <ul className="mt-2">
                  {g.tools.map((key) => (
                    <li
                      key={key}
                      className="border-b border-border/80 py-4 last:border-b-0"
                    >
                      <Link
                        href={`/apps/accounting/${toolSlugs[key]}`}
                        className={`${link} text-[15px] font-medium text-foreground`}
                      >
                        {tools[key]}
                      </Link>
                      <p className="mt-1 text-[13.5px] leading-[1.55] text-muted-foreground">
                        {toolsCopy.items[key]}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. Made for Bangladesh ============ */}
      <section aria-labelledby="local-title" className="py-20 sm:py-28">
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
                const iconKey = localKeys[i];
                const Icon = iconKey === "lakh" ? null : localIcons[iconKey];
                return (
                  <li key={p.title}>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--purple-light)] text-primary"
                      aria-hidden="true"
                    >
                      {Icon ? (
                        <Icon className="h-[18px] w-[18px]" />
                      ) : (
                        <span
                          className="text-[22px] font-semibold leading-none"
                          style={{
                            fontFamily:
                              'var(--font-tiro-bangla), var(--font-rubik), sans-serif',
                          }}
                        >
                          ৳
                        </span>
                      )}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">
                      {p.body}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8">
                <h3 className="text-[1.3rem] font-semibold text-foreground">
                  {local.day.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground">
                  {local.day.intro}
                </p>
                <ol className="mt-6 space-y-0">
                  {local.day.steps.map((s, i) => (
                    <li
                      key={s.time}
                      className="relative grid grid-cols-[5.25rem_1fr] gap-3 pb-6 last:pb-0"
                    >
                      {i < local.day.steps.length - 1 && (
                        <span
                          className="absolute bottom-[-6px] start-[6rem] top-[22px] w-px bg-primary/25"
                          aria-hidden="true"
                        />
                      )}
                      <time className="pt-0.5 text-[14px] font-semibold text-primary tabular-nums">
                        {s.time}
                      </time>
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
                  <Link href={`/industries/${g.slug}`} className={link}>
                    {groups[g.slug]}
                  </Link>
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {industries.angles[g.slug]}
                </p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/industries/${g.slug}/${item}`}
                        className={`${link} text-[14.5px] text-foreground/85`}
                      >
                        {items[item]}
                      </Link>
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
                <details
                  key={f.q}
                  className="group py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm text-[17px] font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    <h3>{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-muted-foreground">
                    {f.a}
                  </p>
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
                <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/75">
                  {common("closingBody")}
                </p>
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
