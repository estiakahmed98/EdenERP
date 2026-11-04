"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BarChart3,
  Check,
  CheckCircle2,
  FileCheck2,
  HandCoins,
  HeartHandshake,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ShowcaseHeading, ShowcaseHighlight } from "@/components/showcase-typography";
import visual from "@/components/manufacturing/manufacturing-visuals.module.css";

/*
 * Page shell for the Fund Accounting showcase pages. The preview for each page
 * lives in fund-accounting-showcase.tsx; everything around it is drawn here,
 * and each page has its own look (see DESIGNS). Colours come from the tokens
 * in app/globals.css. ALL FIGURES ON THESE PAGES ARE SAMPLE DATA.
 */

export type FundPage = "dashboard" | "grants" | "donorsFunds" | "reports" | "beneficiaries" | "costAllocation";

type Item = { title: string; description: string };
type Metric = { label: string; value: string; detail: string };

type Design = { hero: number; features: number; steps: number; benefits: number; cta: number; preview: number };

/** One distinct combination for each page. */
const DESIGNS: Record<FundPage, Design> = {
  dashboard: { hero: 0, features: 0, steps: 0, benefits: 0, cta: 0, preview: 0 },
  grants: { hero: 1, features: 1, steps: 1, benefits: 1, cta: 1, preview: 1 },
  donorsFunds: { hero: 2, features: 3, steps: 2, benefits: 2, cta: 2, preview: 2 },
  reports: { hero: 3, features: 2, steps: 3, benefits: 3, cta: 3, preview: 3 },
  beneficiaries: { hero: 4, features: 4, steps: 4, benefits: 4, cta: 4, preview: 4 },
  costAllocation: { hero: 5, features: 5, steps: 5, benefits: 5, cta: 5, preview: 5 },
};

const featureIcons = [Layers3, ShieldCheck, BarChart3, UsersRound, FileCheck2, HandCoins];
const metricIcons = [Wallet, UsersRound, Banknote, ArrowUpRight];
const tones = [
  "bg-primary/10 text-primary",
  "bg-[var(--teal)]/12 text-[var(--teal)]",
  "bg-[var(--chart-3)]/12 text-[var(--chart-3)]",
  "bg-[var(--chart-4)]/12 text-[var(--chart-4)]",
];

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const mono = "font-mono tabular-nums";

function Head({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-white/70" : "text-[var(--teal)]"}`}>{eyebrow}</p>
      <ShowcaseHeading className={`mt-4 text-balance text-3xl tracking-tight sm:text-4xl ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </ShowcaseHeading>
      <p className={`mt-4 text-base leading-7 ${light ? "text-white/75" : "text-muted-foreground"}`}>{description}</p>
    </div>
  );
}

type HeroData = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  sampleNote: string;
  metrics: Metric[];
};

function Ctas({ d, light = false, center = false }: { d: HeroData; light?: boolean; center?: boolean }) {
  return (
    <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}>
      <Link
        href="/contact"
        className="btn-gradient inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {d.primaryCta}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href="#showcase"
        className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${
          light ? "border-white/35 text-white hover:bg-white/10" : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
        }`}
      >
        {d.secondaryCta}
        <ArrowDownRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Title({ d, light = false, className = "" }: { d: HeroData; light?: boolean; className?: string }) {
  return (
    <ShowcaseHeading as="h1" className={`text-balance leading-[1.12] tracking-tight ${light ? "text-white" : "text-foreground"} ${className}`}>
      {d.title}{" "}
      <ShowcaseHighlight className={light ? "text-[color-mix(in_oklch,var(--teal)_65%,white)]" : "text-primary"}>{d.highlight}</ShowcaseHighlight>
    </ShowcaseHeading>
  );
}

function Pill({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold ${
        light ? "border-white/30 text-white" : "border-border bg-card text-foreground shadow-sm"
      }`}
    >
      <Sparkles className={`h-3.5 w-3.5 ${light ? "text-white" : "text-[var(--teal)]"}`} />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Heroes                                                              */
/* ------------------------------------------------------------------ */

/** 0. Control room: a dark band with a row of gauge tiles. */
function HeroControl({ d }: { d: HeroData }) {
  const fill = [62, 44, 81, 36, 70, 55, 90];
  return (
    <section className="bg-secondary text-white">
      <div className={`${wrap} py-14 sm:py-20`}>
        <Pill light>{d.eyebrow}</Pill>
        <Title d={d} light className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-[3.4rem]" />
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{d.description}</p>
        <Ctas d={d} light />
        <p className="mt-4 text-[11px] text-white/55">{d.sampleNote}</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7">
          {d.metrics.map((m, i) => (
            <div key={m.label} className="min-w-0 rounded-xl border border-white/15 bg-white/5 p-3.5">
              <p className="truncate text-[10px] font-medium uppercase tracking-wide text-white/60">{m.label}</p>
              <p className={`${mono} mt-2 truncate text-xl font-semibold`}>{m.value}</p>
              <span className="mt-2.5 block h-1 rounded-full bg-white/15" aria-hidden="true">
                <span className="block h-1 rounded-full bg-[color-mix(in_oklch,var(--teal)_70%,white)]" style={{ width: `${fill[i % fill.length]}%` }} />
              </span>
              <p className="mt-2 truncate text-[10px] text-white/55">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 1. Award letter: a framed certificate with milestones on a dotted line. */
function HeroAward({ d }: { d: HeroData }) {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className={wrap}>
        <div className="relative mx-auto max-w-5xl rounded-[2rem] border-2 border-primary/35 bg-card p-2 shadow-sm">
          <div className="rounded-[1.5rem] border border-dashed border-primary/30 px-5 py-12 text-center sm:px-14">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-primary/40 bg-primary/10 text-primary" aria-hidden="true">
              <ShieldCheck className="h-8 w-8" />
            </span>
            <div className="mt-5">
              <Pill>{d.eyebrow}</Pill>
            </div>
            <Title d={d} className="mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{d.description}</p>
            <Ctas d={d} center />
            <p className="mt-4 text-[11px] text-muted-foreground">{d.sampleNote}</p>
          </div>
        </div>
        <div className="relative mx-auto mt-10 max-w-5xl">
          <span className="absolute inset-x-[12%] top-4 hidden border-t-2 border-dotted border-primary/35 lg:block" aria-hidden="true" />
          <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
            {d.metrics.map((m, i) => (
              <div key={m.label} className="text-center">
                <span className="relative z-10 mx-auto grid h-8 w-8 place-items-center rounded-full border-2 border-primary bg-card text-xs font-bold text-primary">{i + 1}</span>
                <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                  <p className="truncate text-[11px] text-muted-foreground">{m.label}</p>
                  <p className="mt-1 truncate text-xl font-bold text-foreground">{m.value}</p>
                  <p className="mt-1 truncate text-[10px] text-muted-foreground">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 2. Donor jars: the figures sit in jars filled to a level. */
function HeroJars({ d }: { d: HeroData }) {
  const level = [58, 82, 44, 70];
  return (
    <section className="bg-[linear-gradient(180deg,color-mix(in_oklch,var(--teal)_9%,var(--background)),var(--background))]">
      <div className={`${wrap} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1fr]`}>
        <div>
          <Pill>{d.eyebrow}</Pill>
          <Title d={d} className="mt-6 text-4xl sm:text-5xl" />
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{d.description}</p>
          <Ctas d={d} />
          <p className="mt-4 text-[11px] text-muted-foreground">{d.sampleNote}</p>
        </div>
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {d.metrics.map((m, i) => (
            <div key={m.label} className="w-full max-w-[8.5rem]">
              <div className="mx-auto h-2.5 w-3/4 rounded-t-md border-2 border-b-0 border-primary/35 bg-card" aria-hidden="true" />
              <div className="relative h-56 overflow-hidden rounded-b-[1.6rem] rounded-t-lg border-2 border-primary/35 bg-card">
                <span
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--teal)]/45 to-primary/15"
                  style={{ height: `${level[i % level.length]}%` }}
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col items-center justify-center px-2 text-center">
                  <p className="text-xl font-bold text-foreground">{m.value}</p>
                  <p className="mt-1 text-[11px] font-medium text-foreground/80">{m.label}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{m.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 3. Statement: figures as rows with dotted leaders, like a financial statement. */
function HeroStatement({ d }: { d: HeroData }) {
  return (
    <section className="border-b border-border bg-background">
      <div className={`${wrap} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]`}>
        <div>
          <p className="border-b-2 border-foreground pb-2 text-xs font-bold uppercase tracking-[0.22em] text-foreground">{d.eyebrow}</p>
          <Title d={d} className="mt-6 text-4xl sm:text-5xl" />
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{d.description}</p>
          <Ctas d={d} />
          <p className="mt-4 text-[11px] text-muted-foreground">{d.sampleNote}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ul className="space-y-5">
            {d.metrics.map((m) => (
              <li key={m.label}>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="font-medium text-foreground">{m.label}</span>
                  <span className="flex-1 border-b border-dotted border-muted-foreground/50" aria-hidden="true" />
                  <span className={`${mono} text-lg font-semibold text-foreground`}>{m.value}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{m.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t-4 border-double border-foreground/70" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/** 4. Community: overlapping avatars and round badges. */
function HeroCommunity({ d }: { d: HeroData }) {
  const faces = [UsersRound, HeartHandshake, HandCoins, UsersRound, HeartHandshake];
  return (
    <section className="bg-[radial-gradient(color-mix(in_oklch,var(--primary)_14%,transparent)_1px,transparent_1.4px)] [background-size:18px_18px]">
      <div className={`${wrap} py-14 text-center sm:py-20`}>
        <div className="flex justify-center" aria-hidden="true">
          {faces.map((Icon, i) => (
            <span key={i} className={`-ms-3 grid h-14 w-14 place-items-center rounded-full border-4 border-background first:ms-0 ${tones[i % tones.length]}`}>
              <Icon className="h-6 w-6" />
            </span>
          ))}
        </div>
        <div className="mt-6">
          <Pill>{d.eyebrow}</Pill>
        </div>
        <Title d={d} className="mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{d.description}</p>
        <Ctas d={d} center />
        <p className="mt-4 text-[11px] text-muted-foreground">{d.sampleNote}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {d.metrics.map((m, i) => (
            <div key={m.label} className="w-36 text-center">
              <div className={`mx-auto grid h-32 w-32 place-items-center rounded-full border-2 border-current bg-card ${tones[i % tones.length].split(" ")[1]}`}>
                <div>
                  <p className="text-2xl font-bold text-foreground">{m.value}</p>
                  <p className="mx-auto mt-0.5 max-w-[6.5rem] text-[10px] leading-tight text-muted-foreground">{m.label}</p>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 5. Blueprint: the figures are nodes of a flow. */
function HeroBlueprint({ d }: { d: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className={`${visual.blueprintGrid} pointer-events-none absolute inset-0 opacity-70`} aria-hidden="true" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Pill>{d.eyebrow}</Pill>
        <Title d={d} className="mt-6 max-w-4xl text-4xl sm:text-5xl" />
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{d.description}</p>
        <Ctas d={d} />
        <p className="mt-4 text-[11px] text-muted-foreground">{d.sampleNote}</p>
        <div className="mt-12 flex flex-wrap items-stretch gap-y-4">
          {d.metrics.map((m, i) => {
            const Icon = metricIcons[i % metricIcons.length];
            return (
              <div key={m.label} className="flex items-center">
                <div className="w-44 rounded-xl border-2 border-dashed border-primary/45 bg-card p-4">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${tones[i % tones.length]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 truncate text-[11px] text-muted-foreground">{m.label}</p>
                  <p className={`${mono} mt-1 truncate text-lg font-bold text-foreground`}>{m.value}</p>
                  <p className="mt-1 truncate text-[10px] text-muted-foreground">{m.detail}</p>
                </div>
                {i < d.metrics.length - 1 && (
                  <span className="mx-1 hidden items-center text-primary/60 sm:flex" aria-hidden="true">
                    <span className="w-5 border-t-2 border-dashed border-primary/50" />
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Hero({ v, d }: { v: number; d: HeroData }) {
  return [HeroControl, HeroAward, HeroJars, HeroStatement, HeroCommunity, HeroBlueprint][v]({ d });
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

function Features({ v, items }: { v: number; items: Item[] }) {
  if (v === 0) {
    // Bento: one large tile and five small ones
    return (
      <div className="mt-10 grid gap-3 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
        {items.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          const big = i === 0;
          return (
            <div key={f.title} className={`rounded-2xl border border-border bg-card p-5 ${big ? "bg-primary/5 lg:col-span-2 lg:row-span-2 lg:p-8" : ""}`}>
              <span className={`grid place-items-center rounded-xl ${tones[i % tones.length]} ${big ? "h-14 w-14" : "h-10 w-10"}`}>
                <Icon className={big ? "h-7 w-7" : "h-5 w-5"} />
              </span>
              <h3 className={`mt-4 font-bold text-foreground ${big ? "text-xl" : "text-sm"}`}>{f.title}</h3>
              <p className={`mt-2 leading-6 text-muted-foreground ${big ? "max-w-md text-sm" : "text-xs"}`}>{f.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (v === 1) {
    // Numbered rule list
    return (
      <ol className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((f, i) => (
          <li key={f.title} className="grid gap-2 px-5 py-5 sm:grid-cols-[3.5rem_0.9fr_1.6fr] sm:items-baseline sm:gap-6">
            <span className={`${mono} text-sm font-semibold text-primary`}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
            <p className="text-xs leading-6 text-muted-foreground">{f.description}</p>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 2) {
    // Two columns of text under heavy rules
    return (
      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {items.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <div key={f.title} className="border-t-2 border-foreground/80 pt-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {f.title}
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{f.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (v === 3) {
    // Large icon circles
    return (
      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <div key={f.title} className="text-center">
              <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${tones[i % tones.length]}`}>
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-foreground">{f.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-muted-foreground">{f.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  if (v === 4) {
    // Staggered cards
    return (
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <div key={f.title} className={`flex gap-4 rounded-3xl border border-border bg-card p-5 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[i % tones.length]}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // Spec sheet
  return (
    <div className="mt-10 overflow-hidden rounded-xl border-2 border-dashed border-primary/35 bg-card">
      {items.map((f, i) => {
        const Icon = featureIcons[i % featureIcons.length];
        return (
          <div key={f.title} className={`grid items-center gap-3 px-4 py-4 sm:grid-cols-[2.5rem_0.9fr_1.8fr] sm:gap-5 ${i % 2 ? "bg-primary/4" : ""}`}>
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
            <p className="text-xs leading-6 text-muted-foreground">{f.description}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Workflow steps                                                      */
/* ------------------------------------------------------------------ */

function Steps({ v, items }: { v: number; items: Item[] }) {
  if (v === 0) {
    // A progress rail
    return (
      <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <span className="absolute inset-x-[10%] top-5 hidden h-1 rounded-full bg-border lg:block" aria-hidden="true">
          <span className="block h-1 w-full rounded-full bg-primary" />
        </span>
        {items.map((s, i) => (
          <div key={s.title} className="relative text-center">
            <span className="relative z-10 mx-auto grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-card text-xs font-bold text-primary">
              {i === items.length - 1 ? <Check className="h-5 w-5" /> : i + 1}
            </span>
            <h3 className="mt-3 text-xs font-bold text-foreground">{s.title}</h3>
            <p className="mx-auto mt-1.5 max-w-[190px] text-[11px] leading-5 text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    );
  }
  if (v === 1) {
    // Stage columns, like a pipeline board
    return (
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((s, i) => (
          <div key={s.title} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border bg-primary/8 px-3 py-2.5">
              <span className={`${mono} text-[11px] font-bold text-primary`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="truncate text-xs font-bold text-foreground">{s.title}</h3>
            </div>
            <p className="p-3.5 text-[11px] leading-5 text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    );
  }
  if (v === 2) {
    // Vertical timeline of coins
    return (
      <ol className="relative mx-auto mt-10 max-w-2xl">
        <span className="absolute inset-y-2 start-5 w-0.5 bg-[var(--teal)]/30" aria-hidden="true" />
        {items.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0">
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[var(--teal)] bg-card text-xs font-bold text-[var(--teal)]">{i + 1}</span>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 3) {
    // Table of contents with dotted leaders
    return (
      <ol className="mx-auto mt-10 max-w-3xl space-y-5">
        {items.map((s, i) => (
          <li key={s.title}>
            <div className="flex items-baseline gap-2">
              <h3 className="text-sm font-bold text-foreground">
                <span className={`${mono} me-2 text-primary`}>{i + 1}.</span>
                {s.title}
              </h3>
              <span className="flex-1 border-b border-dotted border-muted-foreground/50" aria-hidden="true" />
              <span className={`${mono} text-xs text-muted-foreground`}>{String((i + 1) * 3).padStart(2, "0")}</span>
            </div>
            <p className="mt-1 ps-6 text-xs leading-5 text-muted-foreground">{s.description}</p>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 4) {
    // A winding path
    return (
      <ol className="relative mx-auto mt-12 max-w-4xl">
        <span className="absolute inset-y-0 start-5 w-0.5 bg-border md:start-1/2 md:-translate-x-1/2" aria-hidden="true" />
        {items.map((s, i) => (
          <li key={s.title} className="relative mb-8 last:mb-0 md:grid md:grid-cols-2 md:gap-14">
            <span className="absolute start-5 top-3 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-primary text-xs font-bold text-white md:start-1/2" aria-hidden="true">
              {i + 1}
            </span>
            <div className={`ms-14 rounded-2xl border border-border bg-card p-4 md:ms-0 ${i % 2 ? "md:col-start-2" : "md:text-end"}`}>
              <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  // A flow diagram
  return (
    <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
      {items.map((s, i) => (
        <div key={s.title} className="flex flex-col items-center lg:flex-1 lg:flex-row">
          <div className="w-full flex-1 rounded-xl border-2 border-dashed border-primary/45 bg-card p-4 lg:h-full">
            <span className={`${mono} text-[11px] font-bold text-primary`}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 text-xs font-bold text-foreground">{s.title}</h3>
            <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">{s.description}</p>
          </div>
          {i < items.length - 1 && <ArrowRight className="my-1 h-5 w-5 shrink-0 rotate-90 text-primary/60 lg:mx-1.5 lg:my-0 lg:rotate-0" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

function Benefits({ v, items }: { v: number; items: Item[] }) {
  if (v === 0) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((b, i) => (
          <div key={b.title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${i % 2 ? "text-primary" : "text-[var(--teal)]"}`} />
            <div>
              <h3 className="text-xs font-bold text-foreground">{b.title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (v === 1) {
    // Clauses in a letter
    return (
      <ol className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
        {items.map((b, i) => (
          <li key={b.title} className="flex gap-4 px-5 py-4">
            <span className={`${mono} text-xs font-bold text-primary`}>{i + 1}.</span>
            <div>
              <h3 className="text-xs font-bold text-foreground">{b.title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{b.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 2) {
    // Staggered gift tags
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((b, i) => (
          <div key={b.title} className={`rounded-2xl border border-[var(--teal)]/25 bg-[var(--teal)]/6 p-4 ${i % 2 ? "sm:translate-y-5" : ""}`}>
            <h3 className="flex items-center gap-2 text-xs font-bold text-foreground">
              <HeartHandshake className="h-4 w-4 text-[var(--teal)]" />
              {b.title}
            </h3>
            <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>
    );
  }
  if (v === 3) {
    // Footnotes
    return (
      <ol className="space-y-4 border-t-2 border-foreground/80 pt-5">
        {items.map((b, i) => (
          <li key={b.title} className="text-xs leading-6 text-muted-foreground">
            <sup className={`${mono} me-1.5 font-bold text-primary`}>{i + 1}</sup>
            <b className="text-foreground">{b.title}.</b> {b.description}
          </li>
        ))}
      </ol>
    );
  }
  if (v === 4) {
    // Quote cards
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((b) => (
          <figure key={b.title} className="relative rounded-3xl border border-border bg-card p-5 pt-8">
            <Quote className="absolute start-4 top-3 h-5 w-5 text-primary/35" aria-hidden="true" />
            <figcaption className="text-xs font-bold text-foreground">{b.title}</figcaption>
            <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">{b.description}</p>
          </figure>
        ))}
      </div>
    );
  }
  // A checklist table
  return (
    <div className="overflow-hidden rounded-xl border-2 border-dashed border-primary/35 bg-card">
      {items.map((b, i) => (
        <div key={b.title} className={`grid gap-1 px-4 py-3 sm:grid-cols-[1fr_1.7fr] sm:gap-4 ${i % 2 ? "bg-primary/4" : ""}`}>
          <h3 className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Check className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={3} />
            {b.title}
          </h3>
          <p className="text-[11px] leading-5 text-muted-foreground">{b.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

function Cta({ v, title, description, button }: { v: number; title: string; description: string; button: string }) {
  const link = (cls: string) => (
    <Link href="/contact" className={`mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 ${cls}`}>
      {button}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
  if (v === 0) {
    return (
      <section className="bg-secondary px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <ShowcaseHeading className="text-balance text-3xl tracking-tight sm:text-4xl">{title}</ShowcaseHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">{description}</p>
          {link("bg-white text-secondary")}
        </div>
      </section>
    );
  }
  if (v === 1) {
    return (
      <section className="px-4 py-16 sm:py-20">
        <div className="relative mx-auto max-w-3xl rounded-[2rem] border-2 border-primary/35 bg-card p-2 text-center">
          <div className="rounded-[1.5rem] border border-dashed border-primary/30 px-6 py-12">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-primary/40 bg-primary/10 text-primary">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <ShowcaseHeading className="mt-5 text-balance text-3xl tracking-tight text-foreground sm:text-4xl">{title}</ShowcaseHeading>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
            {link("btn-gradient text-white")}
          </div>
        </div>
      </section>
    );
  }
  if (v === 2) {
    return (
      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 rounded-[2rem] bg-[linear-gradient(135deg,var(--teal),var(--primary))] px-6 py-10 text-white sm:px-12">
          <div className="max-w-2xl">
            <HandCoins className="h-8 w-8 text-white/80" />
            <ShowcaseHeading className="mt-3 text-balance text-3xl tracking-tight sm:text-4xl">{title}</ShowcaseHeading>
            <p className="mt-3 text-sm leading-7 text-white/85">{description}</p>
          </div>
          {link("bg-white text-primary")}
        </div>
      </section>
    );
  }
  if (v === 3) {
    return (
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl border-y-4 border-double border-foreground/70 py-10 text-center">
          <ShowcaseHeading className="text-balance text-3xl tracking-tight text-foreground sm:text-4xl">{title}</ShowcaseHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
          {link("btn-gradient text-white")}
        </div>
      </section>
    );
  }
  if (v === 4) {
    const faces = [UsersRound, HeartHandshake, HandCoins, UsersRound];
    return (
      <section className="bg-[color-mix(in_oklch,var(--primary)_7%,var(--background))] px-4 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center" aria-hidden="true">
            {faces.map((Icon, i) => (
              <span key={i} className={`-ms-3 grid h-12 w-12 place-items-center rounded-full border-4 border-background first:ms-0 ${tones[i % tones.length]}`}>
                <Icon className="h-5 w-5" />
              </span>
            ))}
          </div>
          <ShowcaseHeading className="mt-5 text-balance text-3xl tracking-tight text-foreground sm:text-4xl">{title}</ShowcaseHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
          {link("btn-gradient text-white")}
        </div>
      </section>
    );
  }
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className={`${visual.blueprintGrid} pointer-events-none absolute inset-0 opacity-70`} aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-primary/45 bg-card px-6 py-12 text-center">
        <ShowcaseHeading className="text-balance text-3xl tracking-tight text-foreground sm:text-4xl">{title}</ShowcaseHeading>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        {link("btn-gradient text-white")}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const ruled: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
};
const dotted: CSSProperties = {
  backgroundImage: "radial-gradient(color-mix(in oklch, var(--primary) 14%, transparent) 1px, transparent 1.4px)",
  backgroundSize: "18px 18px",
};

function PreviewBand({ v, children }: { v: number; children: ReactNode }) {
  const base = "scroll-mt-20 py-16 sm:py-20";
  if (v === 0) return <section id="showcase" className={`${base} bg-[var(--gray-bg)]`}>{children}</section>;
  if (v === 1) return <section id="showcase" className={`${base} border-y border-border bg-card`} style={ruled}>{children}</section>;
  if (v === 2)
    return <section id="showcase" className={`${base} bg-[color-mix(in_oklch,var(--teal)_6%,var(--background))]`}>{children}</section>;
  if (v === 3) return <section id="showcase" className={`${base} border-y-4 border-double border-border bg-background`}>{children}</section>;
  if (v === 4) return <section id="showcase" className={`${base} bg-background`} style={dotted}>{children}</section>;
  return (
    <section id="showcase" className={`${base} relative bg-background`}>
      <div className={`${visual.blueprintGrid} pointer-events-none absolute inset-0 opacity-60`} aria-hidden="true" />
      <div className="relative">{children}</div>
    </section>
  );
}

export function FundShell({ page, preview }: { page: FundPage; preview: ReactNode }) {
  const t = useTranslations(`pages.fundAccounting.${page}`);
  const design = DESIGNS[page];

  const hero: HeroData = {
    eyebrow: t("hero.eyebrow"),
    title: t("hero.title"),
    highlight: t("hero.titleHighlight"),
    description: t("hero.description"),
    primaryCta: t("hero.primaryCta"),
    secondaryCta: t("hero.secondaryCta"),
    sampleNote: t("hero.sampleNote"),
    metrics: t.raw("hero.metrics") as Metric[],
  };
  const features = t.raw("features.items") as Item[];
  const steps = t.raw("workflow.steps") as Item[];
  const benefits = t.raw("benefits.items") as Item[];

  // The benefits sit beside their heading for most pages, under it for the statement and spec layouts.
  const stacked = design.benefits === 3 || design.benefits === 5;

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Hero v={design.hero} d={hero} />

      <PreviewBand v={design.preview}>
        <div className={wrap}>
          <Head eyebrow={t("previewSection.eyebrow")} title={t("previewSection.title")} description={t("previewSection.description")} />
          <div className="mt-10">{preview}</div>
          {page === "dashboard" && <p className="mt-4 text-center text-[10px] text-muted-foreground">{t("previewSection.note")}</p>}
        </div>
      </PreviewBand>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <Head
            eyebrow={t("features.eyebrow")}
            title={t("features.title")}
            description={t("features.description")}
            align={design.features === 2 || design.features === 5 ? "left" : "center"}
          />
          <Features v={design.features} items={features} />
        </div>
      </section>

      <section className="border-y border-border bg-[var(--gray-bg)] py-16 sm:py-20">
        <div className={wrap}>
          <Head eyebrow={t("workflow.eyebrow")} title={t("workflow.title")} description={t("workflow.description")} align={design.steps === 3 ? "left" : "center"} />
          <Steps v={design.steps} items={steps} />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          {stacked ? (
            <>
              <Head eyebrow={t("benefits.eyebrow")} title={t("benefits.title")} description={t("benefits.description")} align="left" />
              <div className="mt-8">
                <Benefits v={design.benefits} items={benefits} />
              </div>
            </>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <Head eyebrow={t("benefits.eyebrow")} title={t("benefits.title")} description={t("benefits.description")} align="left" />
              <Benefits v={design.benefits} items={benefits} />
            </div>
          )}
        </div>
      </section>

      <Cta v={design.cta} title={t("finalCta.title")} description={t("finalCta.description")} button={t("finalCta.button")} />
    </main>
  );
}
