import type { CSSProperties, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, ChevronDown, ChevronRight, GraduationCap, Plus, User, type LucideIcon } from "lucide-react";

import LiveDemoButton from "@/components/live-demo-button";
import { Link } from "@/i18n/navigation";
import { appsMegaMenu } from "@/lib/apps-menu";
import visual from "@/components/manufacturing/manufacturing-visuals.module.css";

/*
 * Page template for the University showcase pages. Each page file supplies its
 * product preview; the hero, preview frame, steps, FAQ and closing change from
 * page to page (see DESIGNS), drawn with university motifs: transcript,
 * lecture hall, campus map, syllabus outline, student ID card and the weeks of
 * a term. Colours come only from app/globals.css.
 * Copy lives in messages/*.json under pages.accountingShowcase.<section> and
 * pages.accountingShowcase.uniCommon. ALL DATA SHOWN IS DUMMY.
 */

export const SAMPLE_UNIVERSITY = "Meghna University";

const SITE_URL = "https://adonerp.com";
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 = "showcase-heading text-[1.8rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.3rem]";
const lede = "mt-3 max-w-2xl text-[16px] leading-[1.7] text-muted-foreground";
const accents = ["var(--primary)", "var(--teal)", "var(--chart-3)"];
const mono = "font-mono tabular-nums";

export type UniversityTool = "gradesResults" | "examsAttendance" | "outcomesObe" | "facultyWorkload" | "campusServices" | "graduation";

/** The six pages, in menu order; the index picks the design. */
export const universityTools: { key: UniversityTool; slug: string }[] = [
  { key: "gradesResults", slug: "grades-results" },
  { key: "examsAttendance", slug: "exams-attendance" },
  { key: "outcomesObe", slug: "outcomes-obe" },
  { key: "facultyWorkload", slug: "faculty-workload" },
  { key: "campusServices", slug: "campus-services" },
  { key: "graduation", slug: "graduation" },
];

type Design = { hero: number; frame: number; steps: number; faq: number; closing: number; accent: number };
const DESIGNS: Design[] = [
  { hero: 0, frame: 0, steps: 0, faq: 0, closing: 0, accent: 0 },
  { hero: 1, frame: 1, steps: 1, faq: 1, closing: 1, accent: 1 },
  { hero: 2, frame: 2, steps: 2, faq: 2, closing: 2, accent: 2 },
  { hero: 3, frame: 3, steps: 3, faq: 3, closing: 0, accent: 0 },
  { hero: 4, frame: 0, steps: 1, faq: 2, closing: 1, accent: 1 },
  { hero: 5, frame: 1, steps: 2, faq: 3, closing: 2, accent: 2 },
];

type Faq = { q: string; a: string };
type Step = { tag: string; title: string; body: string };
type HeroData = {
  toolName: string;
  Icon: LucideIcon;
  title: string;
  mark: string;
  lead: string;
  cta: string;
  features: string[];
  module: string;
  term: string;
  onboarding: string;
  featuresTitle: string;
};

function Marked({ title, mark, light = false }: { title: string; mark?: string; light?: boolean }) {
  const at = mark ? title.indexOf(mark) : -1;
  if (!mark || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className={`showcase-heading-highlight text-[1.08em] ${light ? "text-[color-mix(in_oklch,var(--teal)_65%,white)]" : "text-(--ed)"}`}>{mark}</span>
      {title.slice(at + mark.length)}
    </>
  );
}

function Eyebrow({ d, light = false }: { d: HeroData; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        light ? "border-white/35 text-white" : "border-border bg-card text-(--ed)"
      }`}
    >
      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
      {d.module} · {d.toolName}
    </p>
  );
}

function Ctas({ d, light = false, center = false }: { d: HeroData; light?: boolean; center?: boolean }) {
  return (
    <div className={`mt-7 flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
      <LiveDemoButton />
      <a
        href="#preview"
        className={`rounded-xl border px-4 py-2.5 text-[14px] font-semibold transition ${
          light ? "border-white/40 text-white hover:bg-white/10" : "border-border bg-card text-foreground hover:border-(--ed)/40 hover:text-(--ed)"
        }`}
      >
        {d.cta}
      </a>
    </div>
  );
}

const h1 = "showcase-heading text-balance leading-[1.1] tracking-tight";

/* ------------------------------------------------------------------ */
/* Heroes                                                              */
/* ------------------------------------------------------------------ */

/** 0. A transcript: letterhead, double rule, rows. */
function HeroTranscript({ d }: { d: HeroData }) {
  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-(--ed)/50 bg-(--ed)/10 text-(--ed)" aria-hidden="true">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-foreground">{SAMPLE_UNIVERSITY}</p>
              <p className="text-[12px] text-muted-foreground">{d.module} · {d.toolName}</p>
            </div>
          </div>
          <span className={`${mono} rounded-md border border-border px-2.5 py-1 text-[12px] text-muted-foreground`}>{d.term}</span>
        </div>
        <div className="mt-5 border-t-4 border-double border-foreground/70" aria-hidden="true" />
        <h1 className={`${h1} mt-8 text-[2rem] text-foreground sm:text-[3rem]`}>
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mt-5 max-w-3xl text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <ol className="mt-7 divide-y divide-border border-y border-border">
          {d.features.map((f, i) => (
            <li key={f} className="grid grid-cols-[2.5rem_1fr_1.25rem] items-center gap-3 py-2.5 text-[14px] text-foreground">
              <span className={`${mono} text-[12px] font-semibold text-(--ed)`}>{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
              <Check className="h-4 w-4 text-[var(--teal)]" strokeWidth={3} aria-hidden="true" />
            </li>
          ))}
        </ol>
        <Ctas d={d} />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
    </div>
  );
}

/** 1. A lecture hall: rings of seats around the stage. */
function HeroLecture({ d }: { d: HeroData }) {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-8">
      <div
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-secondary px-5 py-14 text-center text-white sm:px-12 sm:py-20"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 135%, transparent 0 58px, color-mix(in oklch, white 7%, transparent) 58px 60px)",
        }}
      >
        <Eyebrow d={d} light />
        <h1 className={`${h1} mx-auto mt-6 max-w-4xl text-[2rem] sm:text-[3.2rem]`}>
          <Marked title={d.title} mark={d.mark} light />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.75] text-white/80">{d.lead}</p>
        <Ctas d={d} light center />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {d.features.map((f) => (
            <li key={f} className="rounded-full border border-white/25 bg-white/8 px-4 py-1.5 text-[13px] text-white/90">
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[12px] text-white/55">{d.onboarding}</p>
      </div>
    </div>
  );
}

/** 2. A campus map with numbered buildings and a legend. */
function HeroCampus({ d }: { d: HeroData }) {
  const blocks = [
    "col-span-2 row-span-2 bg-(--ed)/12",
    "bg-[var(--teal)]/14",
    "bg-[var(--chart-3)]/12",
    "col-span-2 bg-[var(--chart-4)]/12",
    "bg-(--ed)/10",
  ];
  return (
    <div className={`${wrap} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr]`}>
      <div>
        <Eyebrow d={d} />
        <h1 className={`${h1} mt-5 text-[2rem] text-foreground sm:text-[2.9rem]`}>
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <Ctas d={d} />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div
          className="relative grid grid-cols-4 gap-2.5 rounded-2xl border border-dashed border-border p-3"
          style={{ backgroundImage: "radial-gradient(color-mix(in oklch, var(--primary) 16%, transparent) 1px, transparent 1.4px)", backgroundSize: "16px 16px" }}
        >
          {blocks.map((cls, i) => (
            <div key={i} className={`flex min-h-[4.2rem] items-start rounded-xl border border-border p-2 ${cls}`}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-card text-[11px] font-bold text-(--ed) shadow-sm">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="mb-2 mt-4 text-[12px] font-semibold text-foreground">{d.featuresTitle}</p>
        <ol className="space-y-2">
          {d.features.map((f, i) => (
            <li key={f} className="flex items-start gap-3 text-[13.5px] leading-snug text-foreground">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-(--ed) text-[10px] font-bold text-white">{i + 1}</span>
              {f}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** 3. A syllabus: the title on one side, an outline on the other. */
function HeroSyllabus({ d }: { d: HeroData }) {
  return (
    <div className={`${wrap} grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1fr]`}>
      <div className="lg:pt-6">
        <p className="border-b-2 border-foreground pb-2 text-xs font-bold uppercase tracking-[0.22em] text-foreground">
          {d.module} · {d.toolName}
        </p>
        <h1 className={`${h1} mt-6 text-[2rem] text-foreground sm:text-[2.9rem]`}>
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <Ctas d={d} />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
      <div className="self-start rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
          <span className={`${mono} text-(--ed)`}>1.0</span>
          {d.featuresTitle}
        </p>
        <ol className="mt-4 space-y-3 border-s-2 border-(--ed)/30 ps-5">
          {d.features.map((f, i) => (
            <li key={f} className="relative text-[14px] leading-snug text-foreground">
              <span className="absolute -start-[1.55rem] top-1.5 h-2 w-2 rounded-full bg-(--ed)" aria-hidden="true" />
              <span className={`${mono} me-2 text-[12px] font-semibold text-muted-foreground`}>1.{i + 1}</span>
              {f}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** 4. A student ID card on a lanyard, with the features beside it. */
function HeroIdCard({ d }: { d: HeroData }) {
  return (
    <div className={`${wrap} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]`}>
      <div>
        <Eyebrow d={d} />
        <h1 className={`${h1} mt-5 text-[2rem] text-foreground sm:text-[2.9rem]`}>
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <ul className="mt-6 space-y-2.5">
          {d.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14.5px] leading-snug text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--ed)" strokeWidth={3} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <Ctas d={d} />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
      <div className="relative mx-auto flex w-full max-w-xs flex-col items-center">
        <span className="h-16 w-3 bg-(--ed)/70" aria-hidden="true" />
        <div className="w-full rotate-2 overflow-hidden rounded-3xl border-2 border-border bg-card shadow-xl">
          <div className="flex justify-center bg-(--ed) py-3" aria-hidden="true">
            <span className="h-2 w-14 rounded-full bg-white/60" />
          </div>
          <div className="p-6 text-center">
            <span className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-(--ed)/30 bg-muted text-muted-foreground" aria-hidden="true">
              <User className="h-12 w-12" />
            </span>
            <p className="mt-4 text-[17px] font-semibold text-foreground">Nusrat Jahan</p>
            <p className={`${mono} text-[12px] text-muted-foreground`}>2021-1-60-034</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">BSc in Computer Science</p>
            <div className="mt-5 flex h-9 items-stretch justify-center gap-[3px]" aria-hidden="true">
              {[3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2].map((w, i) => (
                <span key={i} className="bg-foreground/80" style={{ width: w + 1 }} />
              ))}
            </div>
          </div>
          <p className="border-t border-border bg-muted/50 py-2 text-center text-[11px] font-medium text-muted-foreground">{SAMPLE_UNIVERSITY}</p>
        </div>
      </div>
    </div>
  );
}

/** 5. The weeks of a term, with each feature flagged at a week. */
function HeroTerm({ d }: { d: HeroData }) {
  const at = [6, 28, 50, 72, 94];
  return (
    <div className={`${wrap} py-12 sm:py-16`}>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow d={d} />
        <h1 className={`${h1} mt-5 text-[2rem] text-foreground sm:text-[3rem]`}>
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <Ctas d={d} center />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
      {/* Desktop: flags on a ruler of sixteen weeks */}
      <div className="relative mt-14 hidden h-56 lg:block" aria-hidden="false">
        <div className="absolute inset-x-0 top-28 flex items-center justify-between px-1" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-border" />
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className={`relative z-10 block rounded-full ${i % 4 === 0 ? "h-3 w-3 bg-(--ed)" : "h-2 w-2 bg-muted-foreground/40"}`} />
          ))}
        </div>
        {d.features.map((f, i) => (
          <div key={f} className="absolute flex w-[18%] -translate-x-1/2 flex-col" style={{ left: `${at[i]}%`, top: i % 2 === 0 ? 0 : "7rem" }}>
            <div className="rounded-xl border border-border bg-card p-3 text-[12.5px] leading-snug text-foreground shadow-sm">{f}</div>
            <span className={`mx-auto block w-px bg-(--ed)/50 ${i % 2 === 0 ? "h-14" : "order-first h-8"}`} aria-hidden="true" />
          </div>
        ))}
      </div>
      {/* Smaller screens: a plain list */}
      <ul className="mx-auto mt-10 grid max-w-xl gap-2.5 lg:hidden">
        {d.features.map((f, i) => (
          <li key={f} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-[14px] leading-snug text-foreground">
            <span className={`${mono} text-[12px] font-bold text-(--ed)`}>{String(i + 1).padStart(2, "0")}</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero({ v, d }: { v: number; d: HeroData }) {
  return [HeroTranscript, HeroLecture, HeroCampus, HeroSyllabus, HeroIdCard, HeroTerm][v]({ d });
}

/* ------------------------------------------------------------------ */
/* Preview frames                                                      */
/* ------------------------------------------------------------------ */

function Frame({ v, path, children }: { v: number; path: string; children: ReactNode }) {
  if (v === 0) {
    // A browser window
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-34px_color-mix(in_oklch,var(--foreground)_45%,transparent)]">
        <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-4)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--teal)]/70" />
          </span>
          <span className="flex-1 truncate rounded-md bg-card px-3 py-1 text-[11px] text-muted-foreground">adonerp.com{path}</span>
        </div>
        <div className="p-3 sm:p-5">{children}</div>
      </div>
    );
  }
  if (v === 1) {
    // A laptop
    return (
      <div>
        <div className="mx-auto rounded-t-3xl border-x-[10px] border-t-[10px] border-foreground/80 bg-card p-3 shadow-xl sm:p-5">{children}</div>
        <div className="mx-auto h-3 rounded-b-3xl bg-foreground/80" style={{ width: "108%", marginInline: "-4%" }} aria-hidden="true" />
        <div className="mx-auto h-1.5 w-1/4 rounded-b-xl bg-foreground/30" aria-hidden="true" />
      </div>
    );
  }
  if (v === 2) {
    // A clipboard
    return (
      <div className="relative rounded-3xl bg-[color-mix(in_oklch,var(--chart-4)_30%,var(--muted))] p-3 pt-9 shadow-lg sm:p-5 sm:pt-10">
        <span className="absolute inset-x-0 top-0 mx-auto flex h-8 w-40 items-center justify-center rounded-b-xl bg-foreground/75" aria-hidden="true">
          <span className="h-3 w-16 rounded-full bg-background/70" />
        </span>
        <div className="rounded-2xl bg-card p-3 sm:p-5">{children}</div>
      </div>
    );
  }
  // A stack of cards
  return (
    <div className="relative">
      <span className="absolute inset-x-4 -bottom-3 top-3 -rotate-1 rounded-3xl border border-border bg-card/80" aria-hidden="true" />
      <span className="absolute inset-x-2 -bottom-1.5 top-1.5 rotate-[0.6deg] rounded-3xl border border-border bg-card/90" aria-hidden="true" />
      <div className="relative rounded-3xl border border-border bg-card p-3 shadow-lg sm:p-5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

function Steps({ v, steps, label }: { v: number; steps: Step[]; label: string }) {
  if (v === 0) {
    // Large ordinals between rules
    return (
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {steps.map((s, i) => (
          <li key={s.title} className="md:px-8 md:first:ps-0 md:last:pe-0">
            <span className="showcase-heading-highlight block text-[4.5rem] leading-none text-(--ed)/35" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 inline-block rounded-full bg-(--ed)/10 px-2.5 py-0.5 text-[11px] font-semibold text-(--ed)">{s.tag}</span>
            <h3 className="mt-3 text-[17px] font-semibold leading-snug text-foreground">{s.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 1) {
    // A chain: each step leads to the next
    return (
      <ol className="mt-10 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col items-center md:flex-1 md:flex-row">
            <div className="w-full flex-1 rounded-2xl border border-border bg-card p-5 md:h-full">
              <p className={`${mono} text-[11px] font-semibold uppercase tracking-wide text-(--ed)`}>
                {label} {i + 1} · {s.tag}
              </p>
              <h3 className="mt-2 text-[17px] font-semibold leading-snug text-foreground">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{s.body}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="my-1 h-5 w-5 shrink-0 rotate-90 text-(--ed)/60 md:mx-2 md:my-0 md:rotate-0 rtl:md:rotate-180" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    );
  }
  if (v === 2) {
    // A credit ladder: each step is taller than the last
    const heights = ["md:min-h-[11rem]", "md:min-h-[14rem]", "md:min-h-[17rem]"];
    return (
      <ol className="mt-10 grid items-end gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className={`flex flex-col justify-between rounded-2xl border border-border bg-card p-5 ${heights[i]}`}>
            <div>
              <span className="inline-block rounded-full bg-(--ed)/10 px-2.5 py-0.5 text-[11px] font-semibold text-(--ed)">{s.tag}</span>
              <h3 className="mt-3 text-[17px] font-semibold leading-snug text-foreground">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{s.body}</p>
            </div>
            <span className="mt-4 block h-1.5 rounded-full bg-muted" aria-hidden="true">
              <span className="block h-1.5 rounded-full bg-(--ed)" style={{ width: `${(i + 1) * 33.3}%` }} />
            </span>
          </li>
        ))}
      </ol>
    );
  }
  // A checklist with progress
  return (
    <ol className="mx-auto mt-10 max-w-3xl space-y-3">
      {steps.map((s, i) => {
        const done = i < steps.length - 1;
        return (
          <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${done ? "border-(--ed) bg-(--ed) text-white" : "border-(--ed) text-(--ed)"}`}
              aria-hidden="true"
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="h-2 w-2 rounded-full bg-(--ed)" />}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-(--ed)">{s.tag}</p>
              <h3 className="mt-0.5 text-[17px] font-semibold leading-snug text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.7] text-muted-foreground">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqBlock({ v, faq, title }: { v: number; faq: Faq[]; title: string }) {
  if (v === 0) {
    // A numbered outline
    return (
      <>
        <h2 className={h2}>{title}</h2>
        <ol className="mt-9 divide-y divide-border rounded-2xl border border-border bg-card">
          {faq.map((item, i) => (
            <li key={item.q}>
              <details className="group px-5 py-4" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4 text-[15.5px] font-semibold leading-snug text-foreground [&::-webkit-details-marker]:hidden">
                  <span className={`${mono} mt-0.5 text-[13px] text-(--ed)`}>{i + 1}.0</span>
                  <span className="flex-1">{item.q}</span>
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-2 ps-[2.6rem] text-[14px] leading-[1.8] text-muted-foreground">{item.a}</p>
              </details>
            </li>
          ))}
        </ol>
      </>
    );
  }
  if (v === 1) {
    // Cards, all open
    return (
      <>
        <h2 className={h2}>{title}</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
              <p className="flex items-start gap-3 text-[15px] font-semibold leading-snug text-foreground">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-(--ed)/10 text-[12px] font-bold text-(--ed)">?</span>
                {item.q}
              </p>
              <p className="mt-3 ps-9 text-[14px] leading-[1.75] text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (v === 2) {
    // Heading beside a stack of rows
    return (
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-(--ed)/10 text-(--ed)" aria-hidden="true">
            <GraduationCap className="h-6 w-6" />
          </span>
          <h2 className={`${h2} mt-5`}>{title}</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <details key={item.q} className="group rounded-2xl border border-border border-s-4 border-s-(--ed) bg-card px-5 py-4" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold leading-snug text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="h-4 w-4 shrink-0 text-(--ed) transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-[14px] leading-[1.75] text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    );
  }
  // A table of questions and answers
  return (
    <>
      <h2 className={h2}>{title}</h2>
      <dl className="mt-9 divide-y divide-border border-y-2 border-foreground/80">
        {faq.map((item) => (
          <div key={item.q} className="grid gap-2 py-5 md:grid-cols-[0.9fr_1.4fr] md:gap-10">
            <dt className="text-[15px] font-semibold leading-snug text-foreground">{item.q}</dt>
            <dd className="text-[14px] leading-[1.75] text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

function Closing({ v, title, exploreAll }: { v: number; title: string; exploreAll: string }) {
  const buttons = (light: boolean) => (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <LiveDemoButton />
      <Link
        href="/apps/university/university-dashboard"
        className={`rounded-xl border px-4 py-2.5 text-[14px] font-semibold transition ${
          light ? "border-white/40 text-white hover:bg-white/10" : "border-border bg-card text-foreground hover:border-(--ed)/40 hover:text-(--ed)"
        }`}
      >
        {exploreAll}
      </Link>
    </div>
  );
  if (v === 0) {
    return (
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-12 text-center text-white sm:px-12">
        <GraduationCap className="mx-auto h-10 w-10 text-white/80" aria-hidden="true" />
        <h2 className="showcase-heading mx-auto mt-4 max-w-3xl text-[1.8rem] leading-[1.15] sm:text-[2.4rem]">{title}</h2>
        {buttons(true)}
      </div>
    );
  }
  if (v === 1) {
    return (
      <div
        className="mx-auto max-w-[1000px] rounded-[2rem] border border-border bg-card px-6 py-12 text-center sm:px-12"
        style={{ backgroundImage: "radial-gradient(color-mix(in oklch, var(--primary) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "18px 18px" }}
      >
        <h2 className="showcase-heading mx-auto max-w-3xl text-[1.8rem] leading-[1.15] text-foreground sm:text-[2.4rem]">{title}</h2>
        {buttons(false)}
      </div>
    );
  }
  return (
    <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-secondary px-6 py-12 text-center text-white sm:px-12">
      <GraduationCap className="pointer-events-none absolute -end-6 -top-6 h-48 w-48 text-white/6" aria-hidden="true" />
      <h2 className="showcase-heading relative mx-auto max-w-3xl text-[1.8rem] leading-[1.15] sm:text-[2.4rem]">{title}</h2>
      <div className="relative">{buttons(true)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function UniversityPage({
  section,
  path,
  tool,
  icon: Icon,
  preview,
}: {
  section: string;
  path: string;
  tool: UniversityTool;
  icon: LucideIcon;
  preview: ReactNode;
}) {
  const locale = useLocale();
  const t = useTranslations(`pages.accountingShowcase.${section}`);
  const common = useTranslations("pages.accountingShowcase.uniCommon");
  const header = useTranslations("layout.header");

  const features = t.raw("features") as string[];
  const steps = t.raw("steps") as Step[];
  const faq = t.raw("faq") as Faq[];
  const toolName = header(`modules.university.links.${tool}`);
  const index = universityTools.findIndex((x) => x.key === tool);
  const design = DESIGNS[index];

  const hero: HeroData = {
    toolName,
    Icon,
    title: t("hero.title"),
    mark: t("hero.mark"),
    lead: t("hero.lead"),
    cta: t("hero.cta"),
    features,
    module: common("module"),
    term: common("term"),
    onboarding: common("onboarding"),
    featuresTitle: common("featuresTitle"),
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Adon ERP ${toolName}`,
      url: `${SITE_URL}/${locale}${path}`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "University management software",
      operatingSystem: "Web browser",
      inLanguage: locale,
      description: t("meta.description"),
      featureList: features,
      areaServed: { "@type": "City", name: "Dhaka" },
      publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  // Every page of the University module, for the catalogue at the bottom.
  const universityLinks = appsMegaMenu.find((c) => c.titleKey === "modules.university.title")?.links ?? [];

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-2" aria-hidden="true">
        <p className="flex items-center gap-2 text-[18px] font-semibold text-foreground">
          <Icon className="h-5 w-5 text-(--ed)" />
          {toolName}
        </p>
        <p className="text-[10.5px] text-muted-foreground">
          {SAMPLE_UNIVERSITY} · {common("term")}
        </p>
      </div>
      <div className="mt-4 space-y-3">{preview}</div>
    </>
  );

  return (
    <main className="bg-background text-foreground" style={{ "--ed": accents[design.accent] } as CSSProperties}>
      {schema.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}

      <section>
        <Hero v={design.hero} d={hero} />
      </section>

      <section id="preview" className="scroll-mt-24 pb-14">
        <div className={wrap}>
          <figure>
            <Frame v={design.frame} path={path}>
              {inner}
            </Frame>
            <figcaption className="mt-4 text-[12.5px] text-muted-foreground">{common("caption", { page: toolName })}</figcaption>
          </figure>
        </div>
      </section>

      <section className="relative border-y border-border bg-[var(--gray-bg)] py-14 sm:py-16">
        {design.steps === 3 && <div className={`${visual.blueprintGrid} pointer-events-none absolute inset-0 opacity-40`} aria-hidden="true" />}
        <div className={`${wrap} relative`}>
          <h2 className={h2}>{common("howTitle")}</h2>
          <p className={lede}>{common("howIntro")}</p>
          <Steps v={design.steps} steps={steps} label={common("stepLabel")} />
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className={wrap}>
          <FaqBlock v={design.faq} faq={faq} title={common("faqTitle")} />
        </div>
      </section>

      <section className="border-y border-border bg-[var(--gray-bg)] py-14 sm:py-16">
        <div className={wrap}>
          <h2 className={h2}>{common("otherTitle")}</h2>
          <p className={lede}>{common("otherIntro")}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
            {universityLinks.map((link, i) => {
              const current = link.href === path;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`group flex items-center gap-3 border-b border-dashed border-border py-3 text-[14.5px] transition hover:text-(--ed) ${current ? "font-semibold text-(--ed)" : "text-foreground"}`}
                  >
                    <span className={`${mono} w-7 text-[12px] text-muted-foreground`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{header(link.labelKey)}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <Closing v={design.closing} title={t("closing.title")} exploreAll={common("exploreAll")} />
      </section>
    </main>
  );
}
