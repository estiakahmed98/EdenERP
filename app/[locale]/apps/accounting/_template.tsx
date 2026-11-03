import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { ChevronDown, Download, Plus, Printer, RefreshCw, Search, X, type LucideIcon } from "lucide-react";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { SITE_URL, accountingMetadata, useCommon, type ToolKey } from "./_shared";
import { Connect, Final, Flow, Hero, Local, PreviewFrame, designFor, type Accent } from "./_designs";
import { HandNotes, JsonLd, faqSchema, useSection, type Faq } from "./_showcase";

/*
 * Template for the master-data and register showcase pages (Items, Customers,
 * Vendors, Bank Accounts, Receipts, Delivery Challans). Each page file supplies
 * its own product preview; the sections around it come from _designs, and
 * every page slug gets its own combination of section layouts and accent.
 * All copy lives in messages/*.json under pages.accountingShowcase.<section>.
 * ALL DATA ON THESE PAGES IS DUMMY.
 */

export const SAMPLE_COMPANY = "Nodi Polymer Industries";

export function accountingPageMetadata(section: string, slug: string): Promise<Metadata> {
  return accountingMetadata(section, slug);
}

export type TemplateContent = {
  hero: { title: string; lead: string; secondaryCta: string };
  sample: { count: string; notes: string[] };
  ui: Record<string, string>;
  flow: {
    title: string;
    intro: string;
    steps: { tag: string; question: string; body: string }[];
    aside?: { tag: string; body: string };
    formTitle: string;
    form: { label: string; body: string }[];
  };
  connect: { title: string; intro: string; groups: Record<string, string>; items: Record<string, string> };
  local: {
    title: string;
    intro: string;
    points: { title: string; body: string }[];
    story: { title: string; intro: string; steps: { time: string; text: string }[] };
  };
  industries: { title: string; angles: Record<string, string> };
  faq: { title: string; items: Faq[] };
  closing: { title: string };
  description: string;
};

export function useTemplateContent(section: string): TemplateContent {
  const t = useSection(section);
  return {
    hero: t.raw("hero"),
    sample: t.raw("sample"),
    ui: t.raw("ui"),
    flow: t.raw("flow"),
    connect: t.raw("connect"),
    local: t.raw("local"),
    industries: t.raw("industries"),
    faq: t.raw("faq"),
    closing: t.raw("closing"),
    description: t("meta.description"),
  };
}

/* ------------------------------------------------------------------ */
/* Small pieces used inside the previews                               */
/* ------------------------------------------------------------------ */

export type Tone = "teal" | "red" | "amber" | "muted" | "blue" | "purple";

const toneStyle: Record<Tone, string> = {
  teal: "bg-[var(--teal)]/12 text-[var(--teal)]",
  red: "bg-destructive/10 text-destructive",
  amber: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
  muted: "bg-muted text-muted-foreground",
  blue: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
  purple: "bg-primary/10 text-primary",
};

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[10.5px] font-medium ${toneStyle[tone]}`}>{children}</span>
  );
}

export function Btn({ children, danger = false }: { children: ReactNode; danger?: boolean }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[10.5px] font-medium ${
        danger ? "border-destructive/25 bg-destructive/10 text-destructive" : "border-border bg-card text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export const money = "text-amber-600 tabular-nums dark:text-amber-400";
export const mono = "font-mono text-[10.5px] text-muted-foreground";

export type Col = { head: string; className?: string; align?: "start" | "end" };

/** Mock of an input in the "new record" dialog. */
export function Field({ label, value, select = false, wide = false }: { label: string; value?: string; select?: boolean; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10.5px] font-medium text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-2 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-[11.5px] text-muted-foreground">
        <span className="truncate">{value ?? ""}</span>
        {select && <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />}
      </div>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="col-span-2 mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>;
}

/* ------------------------------------------------------------------ */
/* Preview frame                                                       */
/* ------------------------------------------------------------------ */

const defaultAccent: Accent = designFor("").accent;

export function TemplatePreview({
  prefix,
  toolKey,
  content,
  title,
  newLabel,
  extraActions,
  tabs,
  cols,
  rows,
  dialogTitle,
  dialog,
  dialogActions,
  side,
  emptyText,
  body,
  above,
  frame = 0,
  accent,
  hideNotes = false,
}: {
  prefix: string;
  toolKey: ToolKey;
  content: TemplateContent;
  title?: string;
  newLabel?: string;
  extraActions?: ReactNode;
  tabs?: { label: string; active?: boolean }[];
  cols: Col[];
  rows: ReactNode[][];
  dialogTitle?: string;
  dialog?: ReactNode;
  dialogActions?: [string, string];
  /** Custom right-hand panel, used instead of the dialog. */
  side?: ReactNode;
  /** Shown instead of rows when the list is empty. */
  emptyText?: string;
  /** Free-form content that replaces the list and panel. */
  body?: ReactNode;
  /** Content between the header and the table, such as a note or summary cards. */
  above?: ReactNode;
  /** Set by TemplatePage from the page's design. */
  frame?: number;
  accent?: Accent;
  hideNotes?: boolean;
}) {
  const hasPanel = Boolean(dialog || side);
  const { sample, ui } = content;
  const { t: common, tools } = useCommon();

  return (
    <figure className="relative">
      {!hideNotes && (
        <HandNotes
          prefix={prefix}
          notes={sample.notes}
          cols={["lg:col-span-4", "lg:col-span-4", "lg:col-span-4"]}
          itemClass={(i) => (i === 0 ? "items-start" : i === 1 ? "items-end pe-10" : "items-start ps-16")}
        />
      )}

      <PreviewFrame variant={frame} accent={accent ?? defaultAccent}>
        <div className="relative max-h-[600px] overflow-hidden sm:max-h-[500px]">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools[toolKey]}</span>
            </div>
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] font-medium text-foreground">
              <span className="truncate">{SAMPLE_COMPANY}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </div>

          {body ? (
            <div className="p-4 sm:p-5">{body}</div>
          ) : (
          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12">
            <div className={`min-w-0 ${hasPanel ? "lg:col-span-7" : "lg:col-span-12"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-foreground">{title ?? tools[toolKey]}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  {extraActions}
                  {newLabel && (
                    <span className="btn-gradient inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium">
                      <Plus className="h-3 w-3" /> {newLabel}
                    </span>
                  )}
                </div>
              </div>

              {tabs && (
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
                  {tabs.map((tab) => (
                    <span
                      key={tab.label}
                      className={`rounded-md border px-2 py-0.5 ${
                        tab.active ? "border-primary bg-primary text-white" : "border-border bg-card text-foreground"
                      }`}
                    >
                      {tab.label}
                    </span>
                  ))}
                </div>
              )}

              {above}

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

                <table className="w-full text-[11.5px]">
                  <thead className="bg-[var(--gray-bg)] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      {cols.map((c) => (
                        <th
                          key={c.head}
                          className={`px-3 py-2 ${c.align === "end" ? "text-end" : "text-start"} ${c.className ?? ""}`}
                        >
                          {c.head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-3 py-2.5 text-foreground ${cols[j].align === "end" ? "text-end" : ""} ${cols[j].className ?? ""}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {rows.length === 0 && emptyText && (
                      <tr className="border-t border-border">
                        <td colSpan={cols.length} className="px-3 py-8 text-center italic text-muted-foreground">
                          {emptyText}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {hasPanel && (
            <div className="order-first lg:order-none lg:col-span-5">
              {side ?? <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{dialogTitle}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-4 py-4">{dialog}</div>
                {dialogActions && (
                  <div className="flex justify-end gap-2 px-4 pb-4 text-[11.5px] font-medium">
                    <span className="rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-foreground">
                      {dialogActions[0]}
                    </span>
                    <span className="btn-gradient rounded-md px-2.5 py-1.5">{dialogActions[1]}</span>
                  </div>
                )}
              </div>}
            </div>
            )}
          </div>
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/90 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6 pt-10">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg btn-gradient px-5 py-2.5 text-[14px] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {common("bookLiveDemo")}
            </Link>
          </div>
        </div>
      </PreviewFrame>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{ui.caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page body                                                           */
/* ------------------------------------------------------------------ */

export function TemplatePage({
  slug,
  prefix,
  appName,
  features,
  content,
  preview,
  connectStructure,
  localIcons,
  stepTones = ["teal", "teal", "teal"],
  exploreHref,
  exploreLabel,
}: {
  slug: string;
  prefix: string;
  appName: string;
  features: string[];
  content: TemplateContent;
  preview: ReactNode;
  connectStructure: { key: string; tools: ToolKey[] }[];
  localIcons: LucideIcon[];
  stepTones?: Tone[];
  exploreHref?: string;
  exploreLabel?: string;
}) {
  const locale = useLocale();
  const { hero, flow, connect, local, industries, faq, closing, description } = content;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Adon ERP ${appName}`,
    url: `${SITE_URL}/${locale}${slug.startsWith("/") ? slug : `/apps/accounting/${slug}`}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: features,
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  const design = designFor(slug);
  const { accent } = design;
  // Hand-drawn notes clash with the dark band (2) and the side-by-side hero (3).
  const framed = isValidElement(preview)
    ? cloneElement(preview as ReactElement<{ frame?: number; accent?: Accent; hideNotes?: boolean }>, {
        frame: design.frame,
        accent,
        hideNotes: design.hero === 2 || design.hero === 3,
      })
    : preview;

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      <Hero
        variant={design.hero}
        accent={accent}
        prefix={prefix}
        appName={appName}
        title={hero.title}
        leadText={hero.lead}
        secondaryCta={hero.secondaryCta}
        features={features}
        preview={framed}
      />

      <Flow
        variant={design.flow}
        accent={accent}
        flow={flow}
        pill={(i, tag) => <Pill tone={stepTones[i] ?? "teal"}>{tag}</Pill>}
      />

      <Connect variant={design.connect} accent={accent} copy={connect} structure={connectStructure} />

      <Local variant={design.local} accent={accent} local={local} icons={localIcons} />

      <Final
        variant={design.final}
        accent={accent}
        industries={industries}
        faq={faq}
        closingTitle={closing.title}
        exploreHref={exploreHref}
        exploreLabel={exploreLabel}
      />
    </main>
  );
}
