import LiveDemoButton from "@/components/live-demo-button";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { toolSlugs, useCommon, type ToolKey } from "./_shared";
import { SecondaryButton, StorySteps, h2, lead, link, ruled, wrap, type Faq } from "./_showcase";

/*
 * Layout variants for the template showcase pages. A page's look is a
 * combination of one variant per section (hero, flow, connect, local, final),
 * a preview frame and an accent colour. Every page slug gets its own
 * combination from designRegistry, so no two template pages look alike.
 */

/* ------------------------------------------------------------------ */
/* Accents                                                             */
/* ------------------------------------------------------------------ */

export type Accent = {
  /** Solid text colour. */
  text: string;
  /** Solid background. */
  solid: string;
  /** Soft tinted background. */
  soft: string;
  /** Border colour. */
  border: string;
  /** Raw colour, for gradients and inline styles. */
  raw: string;
};

/** Only colours from app/globals.css, so the theme classes recolour them too. */
const accents: Accent[] = [
  { text: "text-primary", solid: "bg-primary", soft: "bg-primary/10", border: "border-primary", raw: "var(--primary)" },
  { text: "text-[var(--teal)]", solid: "bg-[var(--teal)]", soft: "bg-[var(--teal)]/10", border: "border-[var(--teal)]", raw: "var(--teal)" },
  {
    text: "text-[var(--secondary)] dark:text-[var(--chart-3)]",
    solid: "bg-[var(--secondary)]",
    soft: "bg-[var(--secondary)]/10 dark:bg-[var(--chart-3)]/10",
    border: "border-[var(--secondary)] dark:border-[var(--chart-3)]",
    raw: "var(--secondary)",
  },
  { text: "text-[var(--chart-5)]", solid: "bg-[var(--chart-5)]", soft: "bg-[var(--chart-5)]/10", border: "border-[var(--chart-5)]", raw: "var(--chart-5)" },
  { text: "text-[var(--chart-4)]", solid: "bg-[var(--chart-4)]", soft: "bg-[var(--chart-4)]/10", border: "border-[var(--chart-4)]", raw: "var(--chart-4)" },
];

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export type Design = {
  hero: number;
  flow: number;
  connect: number;
  local: number;
  final: number;
  frame: number;
  /** Layout of the in-app navigation inside the preview. */
  shell: number;
  accent: Accent;
};

export const HERO_VARIANTS = 8;
export const FLOW_VARIANTS = 6;
export const CONNECT_VARIANTS = 4;
export const LOCAL_VARIANTS = 4;
export const FINAL_VARIANTS = 4;
export const FRAME_VARIANTS = 3;
export const SHELL_VARIANTS = 3;

/** Template pages in sidebar order. The position picks the combination. */
const pageOrder = [
  // Accounting
  "bank-accounts",
  "customers",
  "vendors",
  "items-products",
  "receipts",
  "delivery-challans",
  "petty-cash",
  "cheque-register",
  "closing-fy",
  "financial-reports",
  "vat-register",
  "discounts-coupons",
  "loan-management",
  "fixed-asset-register",
  "exchange-rates",
  "ar-ap-aging",
  "bank-reconciliation",
  // Project Accounting
  "/apps/project-accounting/projects",
  "/apps/project-accounting/cost-codes",
  "/apps/project-accounting/budgets",
  "/apps/project-accounting/job-cost",
  "/apps/project-accounting/change-orders",
  "/apps/project-accounting/wip",
  "/apps/project-accounting/progress-billing",
  "/apps/project-accounting/schedule",
  "/apps/project-accounting/risks-issues",
  "/apps/project-accounting/documents",
  "/apps/project-accounting/milestones",
  "/apps/project-accounting/boq",
  "/apps/project-accounting/bill-allocations",
  "/apps/project-accounting/p-and-l",
  // Budget Management
  "/apps/budget-management/lines",
  "/apps/budget-management/requisitions",
  "/apps/budget-management/variance",
  "/apps/budget-management/approvals",
  "/apps/budget-management/rbrf",
  // Supply Chain
  "/apps/supply-chain/overview",
  "/apps/supply-chain/goods-receipts",
  "/apps/supply-chain/landed-cost",
  "/apps/supply-chain/procurement/purchase-requisitions",
  "/apps/supply-chain/procurement/comparative-statements",
  "/apps/supply-chain/tender-management",
  // Inventory
  "/apps/inventory/demand-forecast",
  "/apps/inventory/warehouses",
  "/apps/inventory/stock-movements",
  "/apps/inventory/inventory-summary",
  "/apps/inventory/gate-passes",
  "/apps/inventory/weighbridge-scales",
  // Open Platform
  "/apps/open-platform/tax-rates",
  "/apps/open-platform/migration-studio",
  "/apps/open-platform/export-takeout",
  // HR & Payroll
  "/apps/human-resources/departments",
  "/apps/human-resources/designations",
  "/apps/human-resources/grades-steps",
  "/apps/human-resources/salary-components",
  "/apps/human-resources/salary-structures",
  "/apps/human-resources/payroll-runs",
  "/apps/human-resources/approvals-inbox",
  "/apps/human-resources/tax-brackets-nbr",
  "/apps/human-resources/form-108-annual",
  "/apps/human-resources/hr-policy-pf-gratuity",
  "/apps/human-resources/shifts",
  "/apps/human-resources/holiday-calendar",
  "/apps/human-resources/leave-types",
  "/apps/human-resources/leave-applications",
  "/apps/human-resources/projects",
  "/apps/human-resources/final-settlements",
  "/apps/human-resources/service-records",
  "/apps/human-resources/wppf-welfare",
  "/apps/human-resources/salary-budgets",
  "/apps/human-resources/hr-reports",
  // Employee Portal
  "/apps/employee-portal/my-profile",
  "/apps/employee-portal/my-payslips",
  "/apps/employee-portal/my-leaves",
  "/apps/employee-portal/my-attendance",
  "/apps/employee-portal/my-pf-gratuity",
];

/**
 * Spreads the variants so that neighbouring pages differ in every section and
 * no two pages share the same hero, flow and accent together.
 */
export function designFor(slug: string): Design {
  const found = pageOrder.indexOf(slug);
  const i = found === -1 ? [...slug].reduce((n, c) => n + c.charCodeAt(0), 0) : found;
  return {
    hero: i % HERO_VARIANTS,
    flow: (i + Math.floor(i / HERO_VARIANTS)) % FLOW_VARIANTS,
    connect: (i * 3 + 1) % CONNECT_VARIANTS,
    local: (i + 2 + Math.floor(i / 4)) % LOCAL_VARIANTS,
    final: (i * 3 + Math.floor(i / 5)) % FINAL_VARIANTS,
    frame: (i + Math.floor(i / 3)) % FRAME_VARIANTS,
    shell: i % SHELL_VARIANTS,
    accent: accents[(i * 2 + Math.floor(i / 8)) % accents.length],
  };
}

export const designPageOrder = pageOrder;

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const dots: CSSProperties = {
  backgroundImage: "radial-gradient(color-mix(in oklch, var(--ink) 13%, transparent) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

const grid: CSSProperties = {
  backgroundImage:
    "linear-gradient(color-mix(in oklch, var(--ink) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--ink) 7%, transparent) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

function glow(raw: string, at: string): CSSProperties {
  return { background: `radial-gradient(ellipse at ${at}, color-mix(in oklch, ${raw} 22%, transparent), transparent 60%)` };
}

function Eyebrow({ accent, children, light = false }: { accent: Accent; children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] ${
        light ? "border-white/25 text-white/85" : `border-border bg-card ${accent.text}`
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-white" : accent.solid}`} aria-hidden="true" />
      {children}
    </p>
  );
}

function FeatureTicks({ features, accent, light = false, max = 4 }: { features: string[]; accent: Accent; light?: boolean; max?: number }) {
  return (
    <ul className={`grid gap-2.5 text-[14.5px] ${light ? "text-white/85" : "text-foreground/85"}`}>
      {features.slice(0, max).map((f) => (
        <li key={f} className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${light ? "bg-white/15 text-white" : `${accent.soft} ${accent.text}`}`}
            aria-hidden="true"
          >
            <Check className="h-3 w-3" />
          </span>
          {f}
        </li>
      ))}
    </ul>
  );
}

function toolHref(key: ToolKey) {
  return toolSlugs[key].startsWith("/") ? toolSlugs[key] : `/apps/accounting/${toolSlugs[key]}`;
}

/* ------------------------------------------------------------------ */
/* Preview frames                                                      */
/* ------------------------------------------------------------------ */

/** Wraps the product preview. Variant 0 is the plain card used before. */
export function PreviewFrame({ variant, accent, children }: { variant: number; accent: Accent; children: ReactNode }) {
  if (variant === 1) {
    return (
      <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[0_40px_80px_-40px_oklch(0.3_0.08_257/0.5)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-[var(--gray-bg)] px-4 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="mx-auto h-4 w-48 rounded bg-background/80" />
        </div>
        <div className="bg-background">{children}</div>
      </div>
    );
  }
  if (variant === 2) {
    return (
      <div className="rounded-[20px] p-2 sm:p-3" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${accent.raw} 35%, transparent), transparent 55%, color-mix(in oklch, ${accent.raw} 20%, transparent))` }}>
        <div className="overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_30px_60px_-30px_oklch(0.3_0.08_257/0.45)]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export type HeroProps = {
  variant: number;
  accent: Accent;
  prefix: string;
  appName: string;
  title: string;
  leadText: string;
  secondaryCta: string;
  features: string[];
  preview: ReactNode;
};

function HeroCtas({ secondaryCta, light = false, center = false }: { secondaryCta: string; light?: boolean; center?: boolean }) {
  const { t: common } = useCommon();
  return (
    <>
      <div className={`mt-7 flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
        <LiveDemoButton />
        <SecondaryButton href="#flow" inverted={light}>
          {secondaryCta}
        </SecondaryButton>
      </div>
      <p className={`mt-4 text-[13px] ${light ? "text-white/65" : "text-muted-foreground"}`}>{common("onboardingNote")}</p>
    </>
  );
}

const heroTitle = "showcase-heading leading-[1.04] tracking-[-0.03em]";

export function Hero(p: HeroProps) {
  const id = `${p.prefix}-title`;
  const { accent } = p;

  switch (p.variant) {
    /* Centered over a soft glow. */
    case 1:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-background pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="absolute inset-0" style={glow(accent.raw, "50% 0%")} aria-hidden="true" />
          <div className={`${wrap} relative`}>
            <div className="mx-auto max-w-[52rem] text-center">
              <Eyebrow accent={accent}>{p.appName}</Eyebrow>
              <h1 id={id} className={`${heroTitle} mt-6 text-[2.4rem] text-[var(--ink)] sm:text-[3.3rem] lg:text-[3.9rem]`}>
                {p.title}
              </h1>
              <p className={`${lead} mx-auto mt-6 max-w-[40rem]`}>{p.leadText}</p>
              <HeroCtas secondaryCta={p.secondaryCta} center />
            </div>
            <div className="mt-14">{p.preview}</div>
          </div>
        </section>
      );

    /* Dark band; the preview overlaps into the page below. */
    case 2:
      return (
        <section aria-labelledby={id} className="relative">
          <div className="relative overflow-hidden bg-[var(--purple-dark)] pb-48 pt-16 text-white sm:pb-56 sm:pt-20">
            <div className="absolute inset-0 opacity-40" style={glow(accent.raw, "85% 20%")} aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.07]" style={{ ...grid, filter: "invert(1)" }} aria-hidden="true" />
            <div className={`${wrap} relative grid gap-10 lg:grid-cols-12 lg:items-end`}>
              <div className="lg:col-span-7">
                <Eyebrow accent={accent} light>
                  {p.appName}
                </Eyebrow>
                <h1 id={id} className={`${heroTitle} mt-6 text-[2.4rem] sm:text-[3.3rem] lg:text-[3.8rem]`}>
                  {p.title}
                </h1>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[17px] leading-[1.65] text-white/80">{p.leadText}</p>
                <HeroCtas secondaryCta={p.secondaryCta} light />
              </div>
            </div>
          </div>
          <div className={`${wrap} relative -mt-36 pb-16 sm:-mt-44 sm:pb-24`}>{p.preview}</div>
        </section>
      );

    /* Text on the left, preview on the right, dotted paper. */
    case 3:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-12 sm:pb-24 sm:pt-16">
          <div className="absolute inset-0 opacity-70" style={dots} aria-hidden="true" />
          <div className={`${wrap} relative grid gap-12 lg:grid-cols-12 lg:items-center`}>
            <div className="lg:col-span-5">
              <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${accent.text}`}>{p.appName}</p>
              <h1 id={id} className={`${heroTitle} mt-4 text-[2.3rem] text-[var(--ink)] sm:text-[3rem]`}>
                {p.title}
              </h1>
              <p className={`${lead} mt-6`}>{p.leadText}</p>
              <div className="mt-7">
                <FeatureTicks features={p.features} accent={accent} max={3} />
              </div>
              <HeroCtas secondaryCta={p.secondaryCta} />
            </div>
            {/* The preview keeps its full width and runs off the page edge. */}
            <div className="min-w-0 lg:col-span-7">
              <div className="lg:w-[150%]">{p.preview}</div>
            </div>
          </div>
        </section>
      );

    /* Preview first, the words underneath in two columns. */
    case 4:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-[var(--gray-bg)] pb-16 pt-12 sm:pb-24">
          <div className="absolute inset-x-0 top-0 h-[60%]" style={glow(accent.raw, "20% 0%")} aria-hidden="true" />
          <div className={`${wrap} relative`}>
            <Eyebrow accent={accent}>{p.appName}</Eyebrow>
            <div className="mt-8">{p.preview}</div>
            <div className="mt-14 grid gap-8 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
              <h1 id={id} className={`${heroTitle} text-[2.3rem] text-[var(--ink)] sm:text-[3rem] lg:col-span-7`}>
                {p.title}
              </h1>
              <div className="lg:col-span-5">
                <p className={lead}>{p.leadText}</p>
                <HeroCtas secondaryCta={p.secondaryCta} />
              </div>
            </div>
          </div>
        </section>
      );

    /* Editorial: very large title with an accent rule and a feature row. */
    case 5:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-background pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className={`${wrap} relative`}>
            <div className={`border-s-4 ${accent.border} ps-6 sm:ps-10`}>
              <p className="text-[13px] font-medium text-muted-foreground">{p.appName}</p>
              <h1 id={id} className={`${heroTitle} mt-3 max-w-[20ch] text-[2.5rem] text-[var(--ink)] sm:text-[3.6rem] lg:text-[4.4rem]`}>
                {p.title}
              </h1>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className={lead}>{p.leadText}</p>
                <HeroCtas secondaryCta={p.secondaryCta} />
              </div>
              <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:col-span-6">
                {p.features.slice(0, 4).map((f, i) => (
                  <li key={f} className="bg-card p-5">
                    <span className={`text-[12px] font-semibold tabular-nums ${accent.text}`}>0{i + 1}</span>
                    <p className="mt-1.5 text-[14.5px] leading-[1.5] text-foreground">{f}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-14">{p.preview}</div>
          </div>
        </section>
      );

    /* Title on white, preview sitting on a coloured band. */
    case 6:
      return (
        <section aria-labelledby={id} className="relative">
          <div className={`${wrap} pb-12 pt-14 sm:pt-20`}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <span className={`inline-block rounded-md px-2.5 py-1 text-[12.5px] font-semibold ${accent.soft} ${accent.text}`}>{p.appName}</span>
                <h1 id={id} className={`${heroTitle} mt-5 text-[2.4rem] text-[var(--ink)] sm:text-[3.3rem] lg:text-[3.8rem]`}>
                  {p.title}
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pt-12">
                <p className={lead}>{p.leadText}</p>
              </div>
            </div>
            <HeroCtas secondaryCta={p.secondaryCta} />
          </div>
          <div className="relative pb-16 pt-14 sm:pb-24" style={{ background: `linear-gradient(180deg, color-mix(in oklch, ${accent.raw} 16%, var(--background)), var(--background))` }}>
            <div className="absolute inset-x-0 top-0 h-px bg-border" aria-hidden="true" />
            <div className={wrap}>{p.preview}</div>
          </div>
        </section>
      );

    /* Everything in a framed card on a grid. */
    case 7:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-10 sm:pb-24 sm:pt-14">
          <div className="absolute inset-0 opacity-60" style={grid} aria-hidden="true" />
          <div className={`${wrap} relative`}>
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-card p-6 sm:p-10 lg:p-14">
              <div className="absolute -end-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl" style={{ background: accent.raw }} aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <Eyebrow accent={accent}>{p.appName}</Eyebrow>
                  <h1 id={id} className={`${heroTitle} mt-6 text-[2.3rem] text-[var(--ink)] sm:text-[3.1rem]`}>
                    {p.title}
                  </h1>
                  <p className={`${lead} mt-6 max-w-[38rem]`}>{p.leadText}</p>
                  <HeroCtas secondaryCta={p.secondaryCta} />
                </div>
                <div className="lg:col-span-5">
                  <div className={`rounded-2xl border border-border bg-background/70 p-6 backdrop-blur`}>
                    <FeatureTicks features={p.features} accent={accent} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">{p.preview}</div>
          </div>
        </section>
      );

    /* 0: the original split layout over ruled paper. */
    default:
      return (
        <section aria-labelledby={id} className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
          <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
          <div className={`${wrap} relative`}>
            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
              <h1 id={id} className={`${heroTitle} text-[2.4rem] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]`}>
                {p.title}
              </h1>
              <div className="lg:col-span-5 lg:pb-2">
                <p className={lead}>{p.leadText}</p>
                <HeroCtas secondaryCta={p.secondaryCta} />
              </div>
            </div>
            <div className="mt-12 lg:mt-16">{p.preview}</div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Flow                                                                */
/* ------------------------------------------------------------------ */

type FlowCopy = {
  title: string;
  intro: string;
  steps: { tag: string; question: string; body: string }[];
  aside?: { tag: string; body: string };
  formTitle: string;
  form: { label: string; body: string }[];
};

export function Flow({
  variant,
  accent,
  flow,
  pill,
}: {
  variant: number;
  accent: Accent;
  flow: FlowCopy;
  /** Renders a step tag in the page's tone. */
  pill: (i: number, tag: string) => ReactNode;
}) {
  const heading = (
    <h2 id="flow-title" className={h2}>
      {flow.title}
    </h2>
  );
  const aside = (light = false) =>
    flow.aside && (
      <p
        className={`mt-8 flex max-w-[62ch] items-start gap-3 rounded-xl border p-4 text-[15px] leading-[1.65] ${
          light ? "border-white/15 text-white/80" : "border-destructive/20 bg-destructive/5 text-muted-foreground"
        }`}
      >
        <span className="shrink-0 rounded bg-destructive/15 px-1.5 py-0.5 text-[10.5px] font-medium text-destructive">{flow.aside.tag}</span>
        <span>{flow.aside.body}</span>
      </p>
    );

  switch (variant) {
    /* Numbered cards in a grid; the form as a bordered table. */
    case 1:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={wrap}>
            <div className="max-w-[46rem]">
              {heading}
              <p className={`${lead} mt-5`}>{flow.intro}</p>
            </div>
            <ol className="mt-14 grid gap-5 md:grid-cols-3">
              {flow.steps.map((s, i) => (
                <li key={s.question} className="relative overflow-hidden rounded-2xl border border-border bg-card p-7">
                  <span className={`absolute -end-2 -top-6 text-[7rem] font-bold leading-none opacity-[0.08] ${accent.text}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  {pill(i, s.tag)}
                  <h3 className="mt-4 text-[1.25rem] font-semibold leading-snug text-foreground">{s.question}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            {aside()}
            <div className="mt-16 overflow-hidden rounded-2xl border border-border">
              <h3 className="border-b border-border bg-[var(--gray-bg)] px-6 py-4 text-[1.1rem] font-semibold text-foreground">{flow.formTitle}</h3>
              <dl className="divide-y divide-border">
                {flow.form.map((f) => (
                  <div key={f.label} className="grid gap-2 px-6 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                    <dt className="text-[15px] font-semibold text-foreground">{f.label}</dt>
                    <dd className="text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );

    /* Horizontal timeline with dots on a line. */
    case 2:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28">
          <div className={wrap}>
            <div className="mx-auto max-w-[46rem] text-center">
              {heading}
              <p className={`${lead} mt-5`}>{flow.intro}</p>
            </div>
            <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              <span className={`absolute start-0 end-0 top-[15px] hidden h-0.5 opacity-30 md:block ${accent.solid}`} aria-hidden="true" />
              {flow.steps.map((s, i) => (
                <li key={s.question} className="relative">
                  <span className={`relative grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold text-white ring-8 ring-[var(--gray-bg)] ${accent.solid}`}>
                    {i + 1}
                  </span>
                  <div className="mt-6">{pill(i, s.tag)}</div>
                  <h3 className="mt-3 text-[1.25rem] font-semibold leading-snug text-foreground">{s.question}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            {aside()}
            <h3 className="mt-20 text-center text-[1.25rem] font-semibold text-foreground">{flow.formTitle}</h3>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {flow.form.map((f) => (
                <div key={f.label} className="rounded-xl bg-card p-5 shadow-[0_1px_0_0_var(--border)]">
                  <dt className={`text-[15px] font-semibold ${accent.text}`}>{f.label}</dt>
                  <dd className="mt-1.5 text-[14.5px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      );

    /* Zigzag rows with large step numbers. */
    case 3:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={wrap}>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">{heading}</div>
              <p className={`${lead} lg:col-span-5`}>{flow.intro}</p>
            </div>
            <ol className="mt-14 space-y-4">
              {flow.steps.map((s, i) => (
                <li
                  key={s.question}
                  className={`grid items-center gap-6 rounded-3xl p-7 sm:p-10 md:grid-cols-12 ${i % 2 ? `${accent.soft}` : "bg-[var(--gray-bg)]"}`}
                >
                  <span className={`showcase-heading text-[4.5rem] leading-none md:col-span-2 ${accent.text} ${i % 2 ? "md:order-last md:text-end" : ""}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-4">
                    {pill(i, s.tag)}
                    <h3 className="mt-3 text-[1.4rem] font-semibold leading-snug text-foreground">{s.question}</h3>
                  </div>
                  <p className="text-[15.5px] leading-[1.7] text-muted-foreground md:col-span-6">{s.body}</p>
                </li>
              ))}
            </ol>
            {aside()}
            <div className="mt-16 grid gap-10 lg:grid-cols-12">
              <h3 className="text-[1.3rem] font-semibold text-foreground lg:col-span-4">{flow.formTitle}</h3>
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                {flow.form.map((f, i) => (
                  <div key={f.label} className="flex gap-4">
                    <span className={`mt-1 text-[12px] font-semibold tabular-nums ${accent.text}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <dt className="text-[16px] font-semibold text-foreground">{f.label}</dt>
                      <dd className="mt-1 text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );

    /* Dark section with a vertical timeline. */
    case 4:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 bg-[var(--ink)] py-20 text-[var(--cream)] sm:py-28 dark:bg-[var(--gray-bg)] dark:text-foreground">
          <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <h2 id="flow-title" className="showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.4rem]">
                  {flow.title}
                </h2>
                <p className="mt-5 text-[17px] leading-[1.65] opacity-75">{flow.intro}</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ol className="relative border-s border-current/20 ps-8">
                {flow.steps.map((s, i) => (
                  <li key={s.question} className="relative pb-12 last:pb-0">
                    <span className={`absolute -start-[41px] top-0 grid h-5 w-5 place-items-center rounded-full ring-4 ring-[var(--ink)] dark:ring-[var(--gray-bg)] ${accent.solid}`} aria-hidden="true" />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] opacity-60">
                      {String(i + 1).padStart(2, "0")} · {s.tag}
                    </p>
                    <h3 className="mt-2 text-[1.4rem] font-semibold leading-snug">{s.question}</h3>
                    <p className="mt-3 text-[15.5px] leading-[1.7] opacity-75">{s.body}</p>
                  </li>
                ))}
              </ol>
              {aside(true)}
              <h3 className="mt-16 text-[1.2rem] font-semibold">{flow.formTitle}</h3>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {flow.form.map((f) => (
                  <div key={f.label} className="rounded-xl border border-current/15 p-5">
                    <dt className="text-[15px] font-semibold">{f.label}</dt>
                    <dd className="mt-1.5 text-[14.5px] leading-[1.65] opacity-70">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );

    /* Stacked panels with the tag on the side; the form as chips. */
    case 5:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={wrap}>
            <div className="mx-auto max-w-[44rem] text-center">
              {heading}
              <p className={`${lead} mt-5`}>{flow.intro}</p>
            </div>
            <ol className="mx-auto mt-14 max-w-[64rem] space-y-3">
              {flow.steps.map((s, i) => (
                <li key={s.question} className={`grid gap-4 rounded-2xl border border-border border-s-4 ${accent.border} bg-card p-6 sm:grid-cols-[11rem_1fr] sm:p-8`}>
                  <div>
                    <p className={`showcase-heading text-[2rem] leading-none ${accent.text}`}>{String(i + 1).padStart(2, "0")}</p>
                    <div className="mt-2">{pill(i, s.tag)}</div>
                  </div>
                  <div>
                    <h3 className="text-[1.3rem] font-semibold leading-snug text-foreground">{s.question}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-[1.7] text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mx-auto max-w-[64rem]">{aside()}</div>
            <div className="mx-auto mt-16 max-w-[64rem] rounded-3xl bg-[var(--cream)] p-7 sm:p-10">
              <h3 className="text-[1.25rem] font-semibold text-foreground">{flow.formTitle}</h3>
              <dl className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-2">
                {flow.form.map((f) => (
                  <div key={f.label}>
                    <dt>
                      <span className={`inline-block rounded-full px-3 py-1 text-[13.5px] font-semibold ${accent.soft} ${accent.text}`}>{f.label}</span>
                    </dt>
                    <dd className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );

    /* 0: the original sticky heading with ruled rows. */
    default:
      return (
        <section id="flow" aria-labelledby="flow-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                {heading}
                <p className={`${lead} mt-5`}>{flow.intro}</p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-b border-border">
                {flow.steps.map((s, i) => (
                  <li key={s.question} className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]">
                    <div>
                      {pill(i, s.tag)}
                      <h3 className="mt-2.5 text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">{s.question}</h3>
                    </div>
                    <p className="text-[15.5px] leading-[1.7] text-muted-foreground">{s.body}</p>
                  </li>
                ))}
              </ol>
              {aside()}
              <h3 className="mt-16 text-[1.25rem] font-semibold text-foreground">{flow.formTitle}</h3>
              <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {flow.form.map((f) => (
                  <div key={f.label} className={`border-s-2 ${accent.border} ps-5`} style={{ borderColor: `color-mix(in oklch, ${accent.raw} 35%, transparent)` }}>
                    <dt className="text-[16px] font-semibold text-foreground">{f.label}</dt>
                    <dd className="mt-1.5 text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Connect                                                             */
/* ------------------------------------------------------------------ */

type ConnectCopy = { title: string; intro: string; groups: Record<string, string>; items: Record<string, string> };

export function Connect({
  variant,
  accent,
  copy,
  structure,
}: {
  variant: number;
  accent: Accent;
  copy: ConnectCopy;
  structure: { key: string; tools: ToolKey[] }[];
}) {
  const { tools } = useCommon();
  const head = (center = false) => (
    <div className={`max-w-[46rem] ${center ? "mx-auto text-center" : ""}`}>
      <h2 id="tools-title" className={h2}>
        {copy.title}
      </h2>
      <p className={`${lead} mt-5`}>{copy.intro}</p>
    </div>
  );

  switch (variant) {
    /* Card per group with linked rows. */
    case 1:
      return (
        <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={wrap}>
            {head()}
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {structure.map((g, gi) => (
                <div key={g.key} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className={`flex items-center gap-3 px-6 py-4 ${accent.soft}`}>
                    <span className={`grid h-7 w-7 place-items-center rounded-lg text-[12px] font-bold text-white ${accent.solid}`}>{gi + 1}</span>
                    <h3 className="text-[15px] font-semibold text-foreground">{copy.groups[g.key]}</h3>
                  </div>
                  <ul className="divide-y divide-border">
                    {g.tools.map((key) => (
                      <li key={key}>
                        <Link href={toolHref(key)} className="group flex items-start justify-between gap-4 px-6 py-4 hover:bg-[var(--gray-bg)] focus-visible:outline-2 focus-visible:outline-ring">
                          <span>
                            <span className="text-[15px] font-medium text-foreground group-hover:text-primary">{tools[key]}</span>
                            <span className="mt-1 block text-[13.5px] leading-[1.55] text-muted-foreground">{copy.items[key]}</span>
                          </span>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    /* Groups as rows: the group name on the left, tool tiles on the right. */
    case 2:
      return (
        <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 bg-[var(--cream)] py-20 sm:py-28">
          <div className={wrap}>
            {head()}
            <div className="mt-14 divide-y divide-border border-y border-border">
              {structure.map((g) => (
                <div key={g.key} className="grid gap-6 py-8 lg:grid-cols-12">
                  <h3 className={`text-[1.15rem] font-semibold lg:col-span-3 ${accent.text}`}>{copy.groups[g.key]}</h3>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                    {g.tools.map((key) => (
                      <li key={key} className="rounded-xl border border-border bg-card p-4">
                        <Link href={toolHref(key)} className={`${link} inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground`}>
                          {tools[key]} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">{copy.items[key]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    /* Accent-coloured band with pill links, descriptions underneath. */
    case 3:
      return (
        <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 py-20 sm:py-28">
          <div className={wrap}>
            <div className="rounded-[28px] p-7 sm:p-12" style={{ background: `color-mix(in oklch, ${accent.raw} 9%, var(--background))` }}>
              {head(true)}
              <div className="mt-12 grid gap-10 lg:grid-cols-3">
                {structure.map((g) => (
                  <div key={g.key}>
                    <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{copy.groups[g.key]}</h3>
                    <ul className="mt-4 space-y-4">
                      {g.tools.map((key) => (
                        <li key={key}>
                          <Link
                            href={toolHref(key)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-[14px] font-medium text-foreground hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${accent.solid}`} aria-hidden="true" />
                            {tools[key]}
                          </Link>
                          <p className="mt-1.5 ps-1 text-[13.5px] leading-[1.55] text-muted-foreground">{copy.items[key]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    /* 0: the original three columns on grey. */
    default:
      return (
        <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28">
          <div className={wrap}>
            {head()}
            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {structure.map((g) => (
                <div key={g.key}>
                  <h3 className={`border-b-2 ${accent.border} pb-3 text-[15px] font-semibold text-foreground`}>{copy.groups[g.key]}</h3>
                  <ul className="mt-2">
                    {g.tools.map((key) => (
                      <li key={key} className="border-b border-border/80 py-4 last:border-b-0">
                        <Link href={toolHref(key)} className={`${link} text-[15px] font-medium text-foreground`}>
                          {tools[key]}
                        </Link>
                        <p className="mt-1 text-[13.5px] leading-[1.55] text-muted-foreground">{copy.items[key]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Local                                                               */
/* ------------------------------------------------------------------ */

type LocalCopy = {
  title: string;
  intro: string;
  points: { title: string; body: string }[];
  story: { title: string; intro: string; steps: { time: string; text: string }[] };
};

export function Local({ variant, accent, local, icons }: { variant: number; accent: Accent; local: LocalCopy; icons: LucideIcon[] }) {
  const head = (
    <div className="max-w-[46rem]">
      <h2 id="local-title" className={h2}>
        {local.title}
      </h2>
      <p className={`${lead} mt-5`}>{local.intro}</p>
    </div>
  );
  const icon = (i: number, cls: string) => {
    const Icon = icons[i];
    return Icon ? <Icon className={cls} /> : null;
  };

  switch (variant) {
    /* Story first on the left, points as a numbered list on the right. */
    case 1:
      return (
        <section aria-labelledby="local-title" className="bg-[var(--gray-bg)] py-20 sm:py-28">
          <div className={wrap}>
            {head}
            <div className="mt-14 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-card p-6 shadow-[0_20px_40px_-28px_oklch(0.3_0.08_257/0.45)] sm:p-8 lg:sticky lg:top-24">
                  <h3 className="text-[1.3rem] font-semibold text-foreground">{local.story.title}</h3>
                  <p className="mt-1.5 text-[14px] text-muted-foreground">{local.story.intro}</p>
                  <div className="mt-6">
                    <StorySteps steps={local.story.steps} />
                  </div>
                </div>
              </div>
              <ol className="divide-y divide-border lg:col-span-7">
                {local.points.map((p, i) => (
                  <li key={p.title} className="flex gap-5 py-7 first:pt-0">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${accent.solid}`} aria-hidden="true">
                      {icon(i, "h-5 w-5")}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      );

    /* Point cards in a row, then the story as a horizontal strip. */
    case 2:
      return (
        <section aria-labelledby="local-title" className="py-20 sm:py-28">
          <div className={wrap}>
            {head}
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {local.points.map((p, i) => (
                <li key={p.title} className="rounded-2xl border border-border bg-card p-6">
                  <span className={`grid h-10 w-10 place-items-center rounded-full ${accent.soft} ${accent.text}`} aria-hidden="true">
                    {icon(i, "h-[18px] w-[18px]")}
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-3xl border border-border bg-[var(--cream)] p-7 sm:p-10">
              <h3 className="text-[1.3rem] font-semibold text-foreground">{local.story.title}</h3>
              <p className="mt-1.5 text-[14px] text-muted-foreground">{local.story.intro}</p>
              <ol className="mt-8 grid gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(12rem, 1fr))` }}>
                {local.story.steps.map((s, i) => (
                  <li key={i} className={`border-t-2 ${accent.border} pt-4`}>
                    <time className={`text-[14px] font-semibold tabular-nums ${accent.text}`}>{s.time}</time>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-foreground/90">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      );

    /* Dark story card beside a bordered points list. */
    case 3:
      return (
        <section aria-labelledby="local-title" className="py-20 sm:py-28">
          <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-6">
              {head}
              <ul className="mt-10 overflow-hidden rounded-2xl border border-border">
                {local.points.map((p, i) => (
                  <li key={p.title} className="flex gap-4 border-b border-border p-5 last:border-b-0">
                    <span className={`mt-0.5 shrink-0 ${accent.text}`} aria-hidden="true">
                      {icon(i, "h-5 w-5")}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-[1.65] text-muted-foreground">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl bg-[var(--purple-dark)] p-7 text-white sm:p-10 lg:sticky lg:top-24">
                <div className="absolute inset-0 opacity-50" style={glow(accent.raw, "100% 0%")} aria-hidden="true" />
                <div className="relative">
                  <h3 className="text-[1.4rem] font-semibold">{local.story.title}</h3>
                  <p className="mt-1.5 text-[14px] text-white/70">{local.story.intro}</p>
                  <ol className="mt-8 space-y-5">
                    {local.story.steps.map((s, i) => (
                      <li key={i} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-white/15 pt-5 first:border-t-0 first:pt-0">
                        <time className="text-[14px] font-semibold tabular-nums text-white">{s.time}</time>
                        <p className="text-[15px] leading-[1.6] text-white/85">{s.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    /* 0: the original points grid beside a cream story card. */
    default:
      return (
        <section aria-labelledby="local-title" className="py-20 sm:py-28">
          <div className={wrap}>
            {head}
            <div className="mt-14 grid gap-14 lg:grid-cols-12">
              <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
                {local.points.map((p, i) => (
                  <li key={p.title}>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${accent.soft} ${accent.text}`} aria-hidden="true">
                      {icon(i, "h-[18px] w-[18px]")}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ul>
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8 lg:sticky lg:top-24">
                  <h3 className="text-[1.3rem] font-semibold text-foreground">{local.story.title}</h3>
                  <p className="mt-1.5 text-[14px] text-muted-foreground">{local.story.intro}</p>
                  <div className="mt-6">
                    <StorySteps steps={local.story.steps} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Final: industries, FAQ, closing                                     */
/* ------------------------------------------------------------------ */

const industryRoutes = ["retail", "food-hospitality", "real-estate", "consulting", "manufacturing", "health-fitness", "trades", "others"];

function FaqList({ items, boxed = false }: { items: Faq[]; boxed?: boolean }) {
  return (
    <div className={boxed ? "space-y-3" : "divide-y divide-border border-y border-border"}>
      {items.map((f) => (
        <details
          key={f.q}
          className={`group [&_summary::-webkit-details-marker]:hidden ${boxed ? "rounded-xl border border-border bg-card px-5 py-4 open:shadow-sm" : "py-5"}`}
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
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Final({
  variant,
  accent,
  industries,
  faq,
  closingTitle,
  exploreHref = "/apps/accounting",
  exploreLabel,
}: {
  variant: number;
  accent: Accent;
  industries: { title: string; angles: Record<string, string> };
  faq: { title: string; items: Faq[] };
  closingTitle: string;
  exploreHref?: string;
  exploreLabel?: string;
}) {
  const { t: common, groups } = useCommon();
  const explore = exploreLabel ?? common("exploreAccounting");

  const industriesTitle = (cls = "") => (
    <h2 id="industries-title" className={`${h2} ${cls}`}>
      {industries.title}
    </h2>
  );

  switch (variant) {
    /* Industry cards, two-column FAQ, centered gradient closing. */
    case 1:
      return (
        <section aria-labelledby="industries-title" className="bg-[var(--gray-bg)] pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className={wrap}>
            {industriesTitle("text-center")}
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industryRoutes.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/industries/${slug}`}
                    className="group block h-full rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <span className={`inline-flex items-center gap-1.5 text-[16px] font-semibold ${accent.text}`}>
                      {groups[slug]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">{industries.angles[slug]}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <h2 id="faq-title" className={`${h2} mt-24 text-center`}>
              {faq.title}
            </h2>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <FaqList items={faq.items} boxed />
            </div>

            <div
              className="mt-24 overflow-hidden rounded-[28px] px-6 py-14 text-center text-white sm:px-12 sm:py-20"
              style={{ background: `linear-gradient(135deg, var(--purple-dark), color-mix(in oklch, ${accent.raw} 70%, var(--purple-dark)))` }}
            >
              <h2 className="showcase-heading mx-auto max-w-[24ch] text-[1.9rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem]">{closingTitle}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/80">{common("closingBody")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LiveDemoButton />
                <SecondaryButton href={exploreHref} inverted>
                  {explore}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>
      );

    /* FAQ first with a sticky title, industries as chips, split closing. */
    case 2:
      return (
        <section aria-labelledby="faq-title" className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id="faq-title" className={`${h2} lg:sticky lg:top-24`}>
                  {faq.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={faq.items} />
              </div>
            </div>

            <div className="mt-24 rounded-3xl border border-border p-7 sm:p-10">
              {industriesTitle()}
              <ul className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2">
                {industryRoutes.map((slug) => (
                  <li key={slug} className="flex items-start gap-4">
                    <Link
                      href={`/industries/${slug}`}
                      className={`shrink-0 rounded-full px-3 py-1 text-[14px] font-semibold ${accent.soft} ${accent.text} hover:underline focus-visible:outline-2 focus-visible:outline-ring`}
                    >
                      {groups[slug]}
                    </Link>
                    <p className="text-[14px] leading-[1.6] text-muted-foreground">{industries.angles[slug]}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-24 grid overflow-hidden rounded-3xl border border-border lg:grid-cols-2">
              <div className="bg-card p-8 sm:p-12">
                <h2 className="showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]">{closingTitle}</h2>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.6] text-muted-foreground">{common("closingBody")}</p>
              </div>
              <div className={`flex flex-wrap items-center gap-3 p-8 sm:p-12 ${accent.solid}`}>
                <LiveDemoButton />
                <SecondaryButton href={exploreHref} inverted>
                  {explore}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>
      );

    /* Industries as a compact table, FAQ in two columns, slim closing bar. */
    case 3:
      return (
        <section aria-labelledby="industries-title" className="pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">{industriesTitle()}</div>
              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border lg:col-span-8">
                {industryRoutes.map((slug) => (
                  <div key={slug} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <dt>
                      <Link href={`/industries/${slug}`} className={`${link} text-[15px] font-semibold ${accent.text}`}>
                        {groups[slug]}
                      </Link>
                    </dt>
                    <dd className="text-[14px] leading-[1.6] text-muted-foreground">{industries.angles[slug]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-24 rounded-3xl bg-[var(--cream)] p-7 sm:p-12">
              <h2 id="faq-title" className={h2}>
                {faq.title}
              </h2>
              <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
                {faq.items.map((f) => (
                  <div key={f.q} className={`border-t-2 ${accent.border} pt-4`}>
                    <h3 className="text-[16.5px] font-semibold text-foreground">{f.q}</h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-6 rounded-2xl bg-[var(--ink)] px-7 py-8 text-[var(--cream)] sm:px-10 lg:flex-row lg:items-center lg:justify-between dark:bg-[var(--gray-bg)] dark:text-foreground">
              <div>
                <h2 className="showcase-heading text-[1.6rem] leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{closingTitle}</h2>
                <p className="mt-2 max-w-[56ch] text-[15.5px] leading-[1.6] opacity-75">{common("closingBody")}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <LiveDemoButton />
                <SecondaryButton href={exploreHref}>{explore}</SecondaryButton>
              </div>
            </div>
          </div>
        </section>
      );

    /* 0: the original layout. */
    default:
      return (
        <section aria-labelledby="industries-title" className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className={wrap}>
            {industriesTitle()}
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {industryRoutes.map((slug) => (
                <li key={slug} className={`border-t-2 pt-4`} style={{ borderColor: `color-mix(in oklch, ${accent.raw} 45%, transparent)` }}>
                  <Link href={`/industries/${slug}`} className={`${link} text-[16px] font-semibold ${accent.text}`}>
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
              <div className="lg:col-span-8">
                <FaqList items={faq.items} />
              </div>
            </div>

            <div className="mt-24 overflow-hidden rounded-2xl bg-[var(--purple-dark)] px-6 py-12 text-white sm:px-12 sm:py-16 dark:bg-[var(--purple-light)]">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <h2 className="showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem]">{closingTitle}</h2>
                  <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/75">{common("closingBody")}</p>
                </div>
                <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                  <LiveDemoButton />
                  <SecondaryButton href={exploreHref} inverted>
                    {explore}
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* In-app shell                                                        */
/* ------------------------------------------------------------------ */

export type ShellNavItem = { key: string; label: string; icon?: LucideIcon; badge?: string };

/**
 * The module navigation inside a preview, in one of two alternative layouts:
 * 1 is a left sidebar, 2 is a coloured header bar with the tabs in a
 * dropdown and as compact pills. Variant 0 is drawn by each module's own shell.
 */
export function AppShell({
  variant,
  accent,
  moduleName,
  title,
  meta,
  nav,
  active,
  children,
}: {
  variant: number;
  accent: Accent;
  moduleName: string;
  title: string;
  /** Small content beside the title, such as a status. */
  meta?: ReactNode;
  nav: ShellNavItem[];
  active: string;
  children: ReactNode;
}) {
  const current = nav.find((n) => n.key === active);

  if (variant === 1) {
    return (
      <div className="grid gap-4 sm:grid-cols-[10.5rem_1fr]">
        <nav className="hidden rounded-xl border border-border bg-[var(--gray-bg)] p-2 sm:block" aria-hidden="true">
          <p className="px-2 pb-2 pt-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{moduleName}</p>
          <ul className="space-y-0.5">
            {nav.map(({ key, label, icon: Icon, badge }) => {
              const on = key === active;
              return (
                <li
                  key={key}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                    on ? `${accent.solid} font-semibold text-white` : "text-muted-foreground"
                  }`}
                >
                  {Icon ? <Icon className="h-3 w-3 shrink-0" /> : <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "bg-white" : "bg-border"}`} />}
                  <span className="truncate">{label}</span>
                  {badge && <span className="ms-auto rounded-full bg-amber-500 px-1.5 text-[9px] font-semibold text-white">{badge}</span>}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">
                {moduleName} / <span className="text-foreground">{current?.label}</span>
              </p>
              <p className="mt-0.5 truncate text-[15px] font-semibold text-foreground sm:text-[17px]">{title}</p>
            </div>
            {meta}
          </div>
          <div className="mt-3 space-y-3">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="-mx-4 -mt-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-white sm:-mx-5 sm:-mt-5 sm:px-5"
        style={{ background: `linear-gradient(90deg, color-mix(in oklch, ${accent.raw} 85%, var(--purple-dark)), var(--purple-dark))` }}
      >
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/70">{moduleName}</p>
          <p className="mt-0.5 truncate text-[15px] font-semibold sm:text-[17px]">{title}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-medium" aria-hidden="true">
          {current?.icon && <current.icon className="h-3 w-3" />}
          {current?.label}
          <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-hidden="true">
        {nav.map(({ key, label, badge }) => (
          <span
            key={key}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${
              key === active ? `${accent.border} ${accent.soft} font-semibold ${accent.text}` : "border-border text-muted-foreground"
            }`}
          >
            {label}
            {badge && <span className="ms-1 font-semibold text-amber-600">{badge}</span>}
          </span>
        ))}
        {meta && <span className="ms-auto">{meta}</span>}
      </div>
      <div className="mt-3.5 space-y-3">{children}</div>
    </div>
  );
}
