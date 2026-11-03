import LiveDemoButton from "@/components/live-demo-button";
/**
 * Adon ERP public site: /[locale]/apps/accounting/ledgers
 * Single-file page. All copy lives in messages/*.json under
 * pages.accountingShowcase.ledgers (and .common for the shared pieces).
 *
 * Angle (Design Pattern Guide, section 5):
 *   Who is reading:  the owner or accountant setting up the books
 *   The question:    "How do we keep different streams of entries apart,
 *                     without opening a second company?"
 *   The real story:  a food company separating local sales, export, payroll
 *                    and a new warehouse project
 *
 * 3 sections: 1. Hero + preview  2. What a ledger is for + ideas  3. FAQ + next step
 */
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { ChevronDown, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";

import { Link } from "@/i18n/navigation";

import {
  NS,
  SITE_URL,
  accountingMetadata,
  toolSlugs,
  useCommon,
  type ToolKey,
} from "../_shared";

/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */

type Item = { title: string; body: string };
type Row = { label: string; question: string; body: string };
type Faq = { q: string; a: string };

/** Non-translatable parts of the sample data. Names come from the messages. */
const sampleLedgers = [
  { jes: "3,418", created: "07/01/2026" },
  { jes: "12,906", created: "07/01/2026" },
  { jes: "1,204", created: "07/01/2026" },
  { jes: "864", created: "07/01/2026" },
  { jes: "142", created: "07/03/2026" },
  { jes: "0", created: "10/28/2026" },
];

const SAMPLE_COMPANY = "Meghla Agro Foods Ltd";
const noteCols = ["lg:col-span-5", "lg:col-span-3", "lg:col-span-4"];
const relatedTools: ToolKey[] = ["journalEntries", "chartOfAccounts", "financialReports", "accountingHub"];

function useLedgersContent() {
  const t = useTranslations(`${NS}.ledgers`);
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    sample: t.raw("sample") as { ledgerNames: string[]; newName: string; notes: string[] },
    ui: t.raw("ui") as Record<string, string>,
    explain: t.raw("explain") as {
      title: string;
      intro: string;
      rows: Row[];
      ideasTitle: string;
      ideasIntro: string;
      ideas: Item[];
    },
    related: t.raw("related") as Record<string, string>,
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

/* ================================================================== */
/* 3. PRODUCT PREVIEW                                                 */
/* ================================================================== */

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 46"
      className="lg-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary"
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

function LedgersPreview() {
  const { sample, ui } = useLedgersContent();
  const { t: common, tools } = useCommon();

  return (
    <figure className="relative">
      <style>{`
        @keyframes lg-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes lg-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .lg-note-arrow path { stroke-dasharray: 80; animation: lg-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .lg-note-text { animation: lg-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) { .lg-note-arrow path, .lg-note-text { animation: none } }
      `}</style>

      {/* Handwritten notes (lg and up): name column, JEs column, the New Ledger form */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:px-2" aria-hidden="true">
        {sample.notes.map((text, i) => (
          <div
            key={text}
            className={`${noteCols[i]} flex flex-col ${i === 1 ? "items-end" : "items-start"} ${i === 2 ? "pl-12" : ""}`}
            style={{ ["--d" as string]: `${0.5 + i * 0.25}s` }}
          >
            <p className="lg-note-text showcase-heading-highlight max-w-[13rem] pl-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary">
              {text}
            </p>
            <div className="pl-6">
              <Arrow />
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        <div className="relative max-h-[560px] overflow-hidden sm:max-h-[460px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ml-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools.ledgers}</span>
            </div>
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] font-medium text-foreground">
              <span className="truncate">{SAMPLE_COMPANY}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12">
            {/* the list */}
            <div className="min-w-0 lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-semibold text-foreground">{tools.ledgers}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    {ui.showDocLedgers}
                  </span>
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
                    <Plus className="h-3 w-3" /> {ui.newLedger}
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card px-3">
                <table className="w-full table-fixed text-[12px]">
                  <thead className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="px-2 py-2.5 text-start">{ui.colName}</th>
                      <th className="w-[4.5rem] px-2 py-2.5 text-end">{ui.colJes}</th>
                      <th className="hidden w-[6rem] px-2 py-2.5 text-start sm:table-cell">{ui.colCreated}</th>
                      <th className="w-[4rem] px-2 py-2.5 text-start">{ui.colActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleLedgers.map((l, i) => (
                      <tr key={sample.ledgerNames[i]}>
                        <td className="truncate px-2 py-3 text-foreground">{sample.ledgerNames[i]}</td>
                        <td className="px-2 py-3 text-end text-foreground tabular-nums">{l.jes}</td>
                        <td className="hidden px-2 py-3 text-muted-foreground tabular-nums sm:table-cell">{l.created}</td>
                        <td className="px-2 py-3">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Pencil className="h-3.5 w-3.5" aria-label={ui.edit} />
                            {l.jes === "0" && <Trash2 className="h-3.5 w-3.5" aria-label={ui.delete} />}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* the New Ledger form */}
            <div className="order-first lg:order-none lg:col-span-4">
              <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{ui.newLedger}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="px-4 py-4">
                  <p className="mb-1.5 text-[11.5px] font-medium text-muted-foreground">{ui.colName}</p>
                  <div className="rounded-md border border-border bg-[var(--gray-bg)] px-3 py-2 text-[12.5px] text-foreground">
                    {sample.newName}
                  </div>
                  <div className="mt-4 flex justify-end gap-2 text-[12.5px] font-medium">
                    <span className="rounded-md border border-border px-3 py-1.5 text-foreground">{common("cancel")}</span>
                    <span className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">{ui.createLedger}</span>
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

/* ================================================================== */
/* 4. PAGE                                                            */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("ledgers", "ledgers");
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

export default function LedgersPage() {
  const locale = useLocale();
  const { hero, explain, related, faq, closing, description } = useLedgersContent();
  const { t: common, tools } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Ledgers",
    url: `${SITE_URL}/${locale}/apps/accounting/ledgers`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section aria-labelledby="ledgers-title" className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="ledgers-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <LiveDemoButton />
                <SecondaryButton href="#ideas">{hero.secondaryCta}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">{common("onboardingNote")}</p>
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <LedgersPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. What a ledger is for + ideas ============ */}
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
                <div key={r.label} className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]">
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

            <div id="ideas" className="mt-16 scroll-mt-24 rounded-2xl bg-[var(--gray-bg)] p-6 sm:p-10">
              <h3 className="text-[1.4rem] font-semibold text-foreground">{explain.ideasTitle}</h3>
              <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">{explain.ideasIntro}</p>
              <ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {explain.ideas.map((idea) => (
                  <li key={idea.title} className="border-s-2 border-primary/30 ps-5">
                    <h4 className="text-[16px] font-semibold text-foreground">{idea.title}</h4>
                    <p className="mt-1.5 text-[14.5px] leading-[1.65] text-muted-foreground">{idea.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. Related tools, FAQ, next step ============ */}
      <section aria-labelledby="faq-title" className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className={wrap}>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((key) => (
              <div key={key} className="border-t-2 border-primary pt-4">
                <Link href={`/apps/accounting/${toolSlugs[key]}`} className={`${link} text-[16px] font-semibold text-foreground`}>
                  {tools[key]}
                </Link>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-muted-foreground">{related[key]}</p>
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
