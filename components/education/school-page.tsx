import type { CSSProperties, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Award, Bell, Bus, Check, ChevronDown, GraduationCap, Plus, User, type LucideIcon } from "lucide-react";

import LiveDemoButton from "@/components/live-demo-button";
import { Link } from "@/i18n/navigation";

import css from "./school.module.css";
import { SAMPLE_SCHOOL } from "./school-ui";
import { educationTools, type EducationToolKey } from "./tools";

/*
 * Page template for the Education showcase pages. Each page file supplies its
 * product preview. Every page picks its own look from designFor(): a hero, a
 * steps layout, a FAQ layout, a preview frame, a closing and an accent, all
 * drawn with school motifs (exercise book, chalkboard, boarding pass,
 * certificate, corkboard, bus route). Colours come only from app/globals.css.
 * Copy lives in messages/*.json under pages.accountingShowcase.<section>, and
 * shared labels under pages.accountingShowcase.edCommon.
 */

const SITE_URL = "https://adonerp.com";
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 = "showcase-heading text-[1.8rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.3rem]";
const lede = "mt-3 max-w-2xl text-[16px] leading-[1.7] text-muted-foreground";
const accents = ["var(--primary)", "var(--teal)", "var(--chart-3)"];
const tilts = [css.tiltA, css.tiltB, css.tiltC, css.tiltB];

type Faq = { q: string; a: string };
type Step = { tag: string; title: string; body: string };

type Design = { hero: number; steps: number; faq: number; frame: number; closing: number; accent: number; other: number };

/** Spreads the variants so neighbouring pages differ in every section. */
function designFor(i: number): Design {
  return {
    hero: i % 6,
    steps: (i * 3 + 1) % 4,
    faq: (i * 5 + 2) % 4,
    frame: (i + Math.floor(i / 4)) % 4,
    closing: (i * 2 + 1) % 3,
    accent: i % 3,
    other: (i + Math.floor(i / 5)) % 2,
  };
}

type HeroData = {
  toolName: string;
  Icon: LucideIcon;
  title: string;
  mark: string;
  lead: string;
  cta: string;
  features: string[];
  module: string;
  onboarding: string;
  reportCard: string;
};

function Marked({ title, mark, markClass = css.mark }: { title: string; mark?: string; markClass?: string }) {
  const at = mark ? title.indexOf(mark) : -1;
  if (!mark || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className={`${markClass} showcase-heading-highlight text-[1.08em]`}>{mark}</span>
      {title.slice(at + mark.length)}
    </>
  );
}

function Eyebrow({ d, light = false }: { d: HeroData; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        light ? "border-white/35 text-white" : "border-border bg-background text-(--ed)"
      }`}
    >
      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
      {d.module} · {d.toolName}
    </p>
  );
}

function CtaRow({ d, light = false, center = false }: { d: HeroData; light?: boolean; center?: boolean }) {
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

const featureDots = ["bg-primary", "bg-[var(--teal)]", "bg-[var(--chart-3)]", "bg-[var(--chart-4)]", "bg-primary"];

/* ------------------------------------------------------------------ */
/* Heroes                                                              */
/* ------------------------------------------------------------------ */

/** 0. A page of an exercise book, with a report card beside it. */
function HeroNotebook({ d }: { d: HeroData }) {
  const Icon = d.Icon;
  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className={`${css.paper} ${css.holes} relative rounded-3xl border border-border py-8 pe-6 ps-16 shadow-sm sm:pe-10 sm:ps-[4.6rem]`}>
          <Eyebrow d={d} />
          <h1 className="showcase-heading mt-5 text-[2rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.9rem]">
            <Marked title={d.title} mark={d.mark} />
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
          <CtaRow d={d} />
          <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
        </div>
        <aside className="relative rounded-3xl border border-border bg-card p-6 shadow-sm">
          <span className={css.tape} aria-hidden="true" />
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--ed)/10 text-(--ed)" aria-hidden="true">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-foreground">{d.reportCard}</p>
              <p className="text-[12px] text-muted-foreground">{d.toolName}</p>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-dashed divide-border">
            {d.features.map((f) => (
              <li key={f} className="flex items-start gap-3 py-2.5 text-[14px] leading-snug text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--teal)]/15 text-[var(--teal)]" aria-hidden="true">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/** 1. A chalkboard: centred title, features as chalk-edged chips. */
function HeroChalkboard({ d }: { d: HeroData }) {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-8">
      <div className={`${css.chalkboard} mx-auto max-w-[1240px] rounded-[2rem] p-3 sm:p-4`}>
        <div className={`${css.chalkEdge} px-5 py-10 text-center sm:px-12 sm:py-14`}>
          <Eyebrow d={d} light />
          <h1 className="showcase-heading mx-auto mt-6 max-w-4xl text-[2rem] leading-[1.12] tracking-[-0.02em] sm:text-[3.1rem]">
            <Marked title={d.title} mark={d.mark} markClass={css.markLight} />
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.75] text-white/80">{d.lead}</p>
          <CtaRow d={d} light center />
          <ul className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {d.features.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded-full border border-dashed border-white/35 px-3.5 py-1.5 text-[13px] text-white/90">
                <Check className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={3} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-9 flex w-40 items-center justify-center gap-2" aria-hidden="true">
            <span className="h-2 w-8 rounded-full bg-white/70" />
            <span className="h-2 w-5 rounded-full bg-white/40" />
            <span className="h-2 w-3 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** 2. A boarding pass for the school bus, with a perforated divider. */
function HeroTicket({ d }: { d: HeroData }) {
  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <div className={`${css.ticket} grid overflow-hidden rounded-3xl border-2 border-border shadow-sm lg:grid-cols-[1.25fr_auto_0.85fr]`}>
        <div className="p-7 sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <Eyebrow d={d} />
            <Bus className="h-6 w-6 text-(--ed)" aria-hidden="true" />
          </div>
          <h1 className="showcase-heading mt-6 text-[2rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.8rem]">
            <Marked title={d.title} mark={d.mark} />
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
          <CtaRow d={d} />
          <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
        </div>
        <div className={`${css.ticketDivider} mx-6 my-0 hidden lg:block`} aria-hidden="true" />
        <div className="border-t-2 border-dashed border-border bg-(--ed)/6 p-7 sm:p-10 lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ed)">{d.reportCard}</p>
          <ol className="mt-4 space-y-3.5">
            {d.features.map((f, i) => (
              <li key={f} className="flex items-start gap-3 text-[14px] leading-snug text-foreground">
                <span className="font-mono text-[12px] font-semibold text-(--ed)">0{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** 3. A certificate: double frame, seal, centred. */
function HeroCertificate({ d }: { d: HeroData }) {
  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <div className={`${css.certificate} px-6 py-12 text-center sm:px-14 sm:py-16`}>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-(--ed)/50 bg-(--ed)/10 text-(--ed)" aria-hidden="true">
          <Award className="h-7 w-7" />
        </span>
        <div className="mt-5">
          <Eyebrow d={d} />
        </div>
        <h1 className="showcase-heading mx-auto mt-6 max-w-4xl text-[2rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[3rem]">
          <Marked title={d.title} mark={d.mark} />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-x-8 gap-y-2.5 text-start sm:grid-cols-2">
          {d.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--ed)" strokeWidth={3} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <CtaRow d={d} center />
        <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
      </div>
    </div>
  );
}

/** 4. A weekly timetable: the features are the periods of the day. */
function HeroTimetable({ d }: { d: HeroData }) {
  const times = ["08:00", "08:45", "09:30", "10:40", "11:25"];
  const tint = ["bg-primary/8 border-primary/30", "bg-[var(--teal)]/8 border-[var(--teal)]/30", "bg-[var(--chart-3)]/8 border-[var(--chart-3)]/30", "bg-[var(--chart-4)]/8 border-[var(--chart-4)]/30", "bg-primary/8 border-primary/30"];
  return (
    <div className={`${wrap} py-10 sm:py-14`}>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Eyebrow d={d} />
          <h1 className="showcase-heading mt-5 text-[2rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.9rem]">
            <Marked title={d.title} mark={d.mark} />
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted-foreground">{d.lead}</p>
          <CtaRow d={d} />
          <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <p className="mb-3 text-[12px] font-semibold text-foreground">{d.reportCard}</p>
          <ol className="space-y-2">
            {d.features.map((f, i) => (
              <li key={f} className={`grid grid-cols-[3.6rem_1fr] items-center gap-3 rounded-xl border px-3 py-2.5 ${tint[i]}`}>
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">{times[i]}</span>
                <span className="text-[13.5px] leading-snug text-foreground">{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** 5. A corkboard with a paper title strip and sticky notes. */
function HeroCorkboard({ d }: { d: HeroData }) {
  const notes = [
    "bg-[color-mix(in_oklch,var(--primary)_20%,var(--card))] -rotate-2",
    "bg-[color-mix(in_oklch,var(--teal)_20%,var(--card))] rotate-1",
    "bg-[color-mix(in_oklch,var(--chart-4)_20%,var(--card))] -rotate-1",
    "bg-[color-mix(in_oklch,var(--chart-3)_20%,var(--card))] rotate-2",
    "bg-[color-mix(in_oklch,var(--primary)_20%,var(--card))] -rotate-1",
  ];
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-8">
      <div className={`${css.cork} mx-auto max-w-[1240px] rounded-[2rem] border border-border px-5 py-10 sm:px-10 sm:py-14`}>
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="relative -rotate-1 rounded-xl border border-border bg-card px-5 py-5 shadow-sm sm:px-7">
              <span className={css.tape} aria-hidden="true" />
              <Eyebrow d={d} />
              <h1 className="showcase-heading mt-4 text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.6rem]">
                <Marked title={d.title} mark={d.mark} />
              </h1>
            </div>
            <p className="mt-6 max-w-[34rem] text-[16.5px] leading-[1.75] text-foreground/80">{d.lead}</p>
            <CtaRow d={d} />
            <p className="mt-4 text-[12.5px] text-muted-foreground">{d.onboarding}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {d.features.map((f, i) => (
              <li
                key={f}
                className={`${css.sticky} relative rounded-md px-4 pb-4 pt-6 text-[14px] leading-snug text-foreground ${notes[i]} ${i === 4 ? "sm:col-span-2 sm:mx-10" : ""}`}
              >
                <span className={`${css.pin} ${featureDots[i]}`} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Hero({ v, d }: { v: number; d: HeroData }) {
  return [HeroNotebook, HeroChalkboard, HeroTicket, HeroCertificate, HeroTimetable, HeroCorkboard][v]({ d });
}

/* ------------------------------------------------------------------ */
/* Preview frames                                                      */
/* ------------------------------------------------------------------ */

function RouteNav({ active }: { active: EducationToolKey }) {
  const t = useTranslations("layout.header.modules.education.links");
  const common = useTranslations("pages.accountingShowcase.edCommon");
  return (
    <div className="relative overflow-x-auto pb-2.5" aria-hidden="true">
      <div className="flex min-w-max items-center gap-1.5 pt-1">
        <span className="me-1 inline-flex items-center gap-1.5 rounded-full bg-(--ed)/10 px-2.5 py-1 text-[10.5px] font-semibold text-(--ed)">
          <Bus className="h-3.5 w-3.5" />
          {common("route")}
        </span>
        {educationTools.map(({ key, icon: Icon }) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium ${
              key === active ? "border-(--ed) bg-(--ed) text-white" : "border-border bg-card text-muted-foreground"
            }`}
          >
            <Icon className="h-3 w-3" />
            {t(key)}
          </span>
        ))}
      </div>
      <span className={`${css.road} absolute inset-x-0 bottom-0 block h-0.5`} />
    </div>
  );
}

function Frame({ v, Icon, toolName, children }: { v: number; Icon: LucideIcon; toolName: string; children: ReactNode }) {
  if (v === 0) {
    // Folder with a tab
    return (
      <>
        <div className="flex items-end ps-5">
          <div className={`${css.folderTab} inline-flex items-center gap-2 border border-b-0 border-border bg-card px-4 py-2 text-[12.5px] font-semibold text-foreground`}>
            <Icon className="h-4 w-4 text-(--ed)" aria-hidden="true" />
            {toolName}
          </div>
        </div>
        <div className="rounded-3xl rounded-ss-none border border-border bg-card p-3 shadow-[0_24px_60px_-34px_color-mix(in_oklch,var(--foreground)_45%,transparent)] sm:p-5">
          {children}
        </div>
      </>
    );
  }
  if (v === 1) {
    // Blackboard in a wooden frame, with a chalk tray
    return (
      <div className="rounded-3xl p-3 shadow-lg sm:p-4" style={{ background: "color-mix(in oklch, var(--chart-4) 62%, var(--card))" }}>
        <div className="rounded-2xl bg-card p-3 sm:p-5">{children}</div>
        <div className="mx-auto mt-2.5 flex h-3 w-3/5 items-center gap-2 rounded-full bg-black/15 px-3" aria-hidden="true">
          <span className="h-1.5 w-6 rounded-full bg-white/80" />
          <span className="h-1.5 w-4 rounded-full bg-white/55" />
          <span className="h-1.5 w-5 rounded-full bg-[var(--teal)]/80" />
        </div>
      </div>
    );
  }
  if (v === 2) {
    // Spiral notebook
    return (
      <div className="relative pt-3">
        <div className="absolute inset-x-8 top-0 z-10 flex justify-between" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="h-6 w-2.5 rounded-full border-2 border-muted-foreground/45 bg-background" />
          ))}
        </div>
        <div className="rounded-3xl border border-border bg-card p-3 pt-8 shadow-[0_24px_60px_-34px_color-mix(in_oklch,var(--foreground)_45%,transparent)] sm:p-5 sm:pt-9">
          {children}
        </div>
      </div>
    );
  }
  // Projector screen on a rod
  return (
    <div>
      <div className="mx-auto h-2.5 w-[96%] rounded-full bg-foreground/70" aria-hidden="true" />
      <div className="mx-auto w-[94%] rounded-b-2xl border-x-4 border-b-4 border-foreground/10 bg-card p-3 shadow-xl sm:p-5">{children}</div>
      <div className="mx-auto mt-1 flex w-[40%] justify-between" aria-hidden="true">
        <span className="h-5 w-0.5 rotate-12 bg-foreground/25" />
        <span className="h-5 w-0.5 -rotate-12 bg-foreground/25" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

function StepCard({ step, className = "", style }: { step: Step; className?: string; style?: CSSProperties }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`} style={style}>
      <span className="inline-block rounded-full bg-(--ed)/10 px-2.5 py-0.5 text-[11px] font-semibold text-(--ed)">{step.tag}</span>
      <h3 className="mt-3 text-[17px] font-semibold leading-snug text-foreground">{step.title}</h3>
      <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{step.body}</p>
    </div>
  );
}

function Steps({ v, steps }: { v: number; steps: Step[] }) {
  if (v === 0) {
    // Stops on a bus route
    return (
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => (
          <li key={step.title}>
            <div className="relative flex items-center">
              <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-(--ed) bg-card text-[15px] font-semibold text-(--ed) shadow-sm">{i + 1}</span>
              {i < steps.length - 1 && <span className={`${css.road} absolute inset-x-0 start-11 hidden h-0.5 md:block`} aria-hidden="true" />}
            </div>
            <StepCard step={step} className="mt-4" />
          </li>
        ))}
      </ol>
    );
  }
  if (v === 1) {
    // The school day, hour by hour
    const times = ["08:00", "10:15", "12:30"];
    return (
      <ol className="mt-10">
        {steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[4rem_1.5rem_1fr] gap-x-3 md:grid-cols-[6rem_2rem_1fr]">
            <span className="pt-5 text-end font-mono text-[14px] font-semibold text-(--ed)">{times[i]}</span>
            <span className="relative flex justify-center">
              <span className={`${css.roadV} absolute inset-y-0 ${i === 0 ? "top-6" : ""} ${i === steps.length - 1 ? "bottom-1/2" : ""} w-0.5`} aria-hidden="true" />
              <span className="relative z-10 mt-[1.35rem] h-3.5 w-3.5 rounded-full border-[3px] border-(--ed) bg-card" />
            </span>
            <div className="pb-6">
              <StepCard step={step} />
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (v === 2) {
    // Climbing classes
    const heights = ["md:min-h-[12rem]", "md:min-h-[15rem]", "md:min-h-[18rem]"];
    return (
      <ol className="mt-10 grid items-end gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="h-full md:flex md:items-end">
            <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-card p-5 ${heights[i]}`}>
              <span className="showcase-heading-highlight pointer-events-none absolute -end-1 -top-3 text-[5.5rem] leading-none text-(--ed)/15" aria-hidden="true">
                {i + 1}
              </span>
              <span className="relative inline-block rounded-full bg-(--ed)/10 px-2.5 py-0.5 text-[11px] font-semibold text-(--ed)">{step.tag}</span>
              <h3 className="relative mt-3 text-[17px] font-semibold leading-snug text-foreground">{step.title}</h3>
              <p className="relative mt-2 text-[14px] leading-[1.7] text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  // Folder tabs
  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative pt-8">
          <span className={`${css.folderTab} absolute start-4 top-0 border border-b-0 border-border bg-(--ed)/10 px-3.5 py-1.5 text-[11.5px] font-semibold text-(--ed)`}>
            {i + 1}. {step.tag}
          </span>
          <div className="rounded-2xl rounded-ss-none border border-border bg-card p-5">
            <h3 className="text-[17px] font-semibold leading-snug text-foreground">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqBlock({ v, faq, title }: { v: number; faq: Faq[]; title: string }) {
  if (v === 0) {
    // Notices pinned to a board
    return (
      <>
        <h2 className={h2}>{title}</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {faq.map((item, i) => (
            <details key={item.q} className={`group relative rounded-2xl border border-border bg-card p-5 pt-6 ${css.lift} ${tilts[i % tilts.length]}`}>
              <span className={css.pin} aria-hidden="true" />
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[15px] font-semibold leading-snug text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-[14px] leading-[1.75] text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </>
    );
  }
  if (v === 1) {
    // An exam paper: numbered questions on ruled paper
    return (
      <>
        <h2 className={h2}>{title}</h2>
        <div className={`${css.paper} mt-9 rounded-3xl border border-border px-5 py-6 ps-[4.4rem] sm:px-8 sm:ps-[5rem]`}>
          <ol className="space-y-1">
            {faq.map((item, i) => (
              <li key={item.q}>
                <details className="group py-2" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start gap-3 text-[15.5px] font-semibold leading-snug text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="-ms-[3.2rem] w-10 shrink-0 text-end font-mono text-[13px] text-destructive sm:-ms-[3.6rem]">Q{i + 1}</span>
                    <span className="flex-1">{item.q}</span>
                    <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-2 text-[14px] leading-[1.8] text-muted-foreground">{item.a}</p>
                </details>
              </li>
            ))}
          </ol>
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
  // A conversation: the question from the guardian, the answer from the school
  return (
    <>
      <h2 className={h2}>{title}</h2>
      <div className="mt-9 grid gap-x-8 gap-y-9 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.q} className="space-y-3.5">
            <div className="flex items-end gap-2.5">
              <span className="mb-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground" aria-hidden="true">
                <User className="h-4 w-4" />
              </span>
              <p className={`${css.bubbleQ} rounded-2xl rounded-es-sm border border-border bg-card px-4 py-3 text-[14.5px] font-semibold leading-snug text-foreground`}>{item.q}</p>
            </div>
            <div className="flex flex-row-reverse items-end gap-2.5">
              <span className="mb-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-(--ed) text-white" aria-hidden="true">
                <GraduationCap className="h-4 w-4" />
              </span>
              <p className={`${css.bubbleA} rounded-2xl rounded-ee-sm border border-(--ed)/30 bg-(--ed)/8 px-4 py-3 text-[14px] leading-[1.7] text-foreground`}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The rest of the module                                              */
/* ------------------------------------------------------------------ */

function Others({ v, tool }: { v: number; tool: EducationToolKey }) {
  const links = useTranslations("layout.header.modules.education.links");
  if (v === 0) {
    return (
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {educationTools.map(({ key, slug, icon: ToolIcon }) => (
          <li key={key}>
            <Link
              href={`/apps/education/${slug}`}
              aria-current={key === tool ? "page" : undefined}
              className={`flex items-center gap-3 rounded-2xl border p-3.5 transition hover:border-(--ed)/40 ${key === tool ? "border-(--ed) bg-(--ed)/5" : "border-border bg-card"}`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-(--ed)/10 text-(--ed)" aria-hidden="true">
                <ToolIcon className="h-4 w-4" />
              </span>
              <span className="text-[14px] font-medium text-foreground">{links(key)}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  // Bus stops along a road
  return (
    <div className="relative mt-10 overflow-x-auto pb-3">
      <ul className="relative flex min-w-max gap-3 px-1 pt-2">
        {educationTools.map(({ key, slug, icon: ToolIcon }) => (
          <li key={key} className="w-28 shrink-0">
            <Link href={`/apps/education/${slug}`} aria-current={key === tool ? "page" : undefined} className="group flex flex-col items-center text-center">
              <span
                className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 bg-card transition group-hover:border-(--ed) ${
                  key === tool ? "border-(--ed) bg-(--ed) text-white" : "border-border text-(--ed)"
                }`}
              >
                <ToolIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className={`${css.road} mt-0 block h-0.5 w-full`} aria-hidden="true" />
              <span className="mt-2 text-[12.5px] font-medium leading-tight text-foreground">{links(key)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Closings                                                            */
/* ------------------------------------------------------------------ */

function Closing({ v, title, exploreAll }: { v: number; title: string; exploreAll: string }) {
  if (v === 0) {
    // The school bell
    return (
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-12 text-center text-white sm:px-12">
        <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/10" aria-hidden="true">
          <Bell className="h-6 w-6" />
        </span>
        <h2 className="showcase-heading mx-auto max-w-3xl text-[1.8rem] leading-[1.15] sm:text-[2.4rem]">{title}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LiveDemoButton />
          <Link href="/apps/education/education-dashboard" className="rounded-xl border border-white/40 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/10">
            {exploreAll}
          </Link>
        </div>
      </div>
    );
  }
  if (v === 1) {
    // A certificate of the demo
    return (
      <div className={`${css.certificate} mx-auto max-w-[1000px] px-6 py-12 text-center sm:px-14`}>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-(--ed)/50 bg-(--ed)/10 text-(--ed)" aria-hidden="true">
          <Award className="h-7 w-7" />
        </span>
        <h2 className="showcase-heading mx-auto mt-5 max-w-3xl text-[1.8rem] leading-[1.15] text-foreground sm:text-[2.4rem]">{title}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LiveDemoButton />
          <Link href="/apps/education/education-dashboard" className="rounded-xl border border-border bg-card px-4 py-2.5 text-[14px] font-semibold text-foreground transition hover:border-(--ed)/40 hover:text-(--ed)">
            {exploreAll}
          </Link>
        </div>
      </div>
    );
  }
  // The bus arrives
  return (
    <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--secondary),var(--primary))] px-6 pb-16 pt-12 text-white sm:px-12">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <h2 className="showcase-heading max-w-2xl text-[1.8rem] leading-[1.15] sm:text-[2.4rem]">{title}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <LiveDemoButton />
          <Link href="/apps/education/education-dashboard" className="rounded-xl border border-white/40 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/10">
            {exploreAll}
          </Link>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5" aria-hidden="true">
        <span className="absolute -top-5 start-[12%] grid h-9 w-14 place-items-center rounded-lg bg-white/90 text-secondary">
          <Bus className="h-5 w-5" />
        </span>
        <span className={`${css.road} block h-0.5 w-full opacity-70`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function SchoolPage({
  section,
  path,
  tool,
  preview,
}: {
  section: string;
  path: string;
  tool: EducationToolKey;
  preview: ReactNode;
}) {
  const locale = useLocale();
  const t = useTranslations(`pages.accountingShowcase.${section}`);
  const common = useTranslations("pages.accountingShowcase.edCommon");
  const links = useTranslations("layout.header.modules.education.links");

  const features = t.raw("features") as string[];
  const steps = t.raw("steps") as Step[];
  const faq = t.raw("faq") as Faq[];
  const toolName = links(tool);
  const index = educationTools.findIndex((x) => x.key === tool);
  const Icon = educationTools[index].icon;
  const design = designFor(index);

  const hero: HeroData = {
    toolName,
    Icon,
    title: t("hero.title"),
    mark: t("hero.mark"),
    lead: t("hero.lead"),
    cta: t("hero.cta"),
    features,
    module: common("module"),
    onboarding: common("onboarding"),
    reportCard: common("reportCard"),
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Adon ERP ${toolName}`,
      url: `${SITE_URL}/${locale}${path}`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "School management software",
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
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const inner = (
    <>
      <RouteNav active={tool} />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2" aria-hidden="true">
        <p className="text-[18px] font-semibold text-foreground">{toolName}</p>
        <p className="text-[10.5px] text-muted-foreground">
          {SAMPLE_SCHOOL} · {common("year")}
        </p>
      </div>
      <div className="mt-3 space-y-3">{preview}</div>
    </>
  );

  const stepsOnGray = design.steps !== 3;

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
            <Frame v={design.frame} Icon={Icon} toolName={toolName}>
              {inner}
            </Frame>
            <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{common("caption", { page: toolName })}</figcaption>
          </figure>
        </div>
      </section>

      <section className={`${stepsOnGray ? "bg-[var(--gray-bg)]" : "border-y border-border bg-card"} py-14 sm:py-16`}>
        <div className={wrap}>
          <h2 className={h2}>{common("howTitle")}</h2>
          <p className={lede}>{common("howIntro")}</p>
          <Steps v={design.steps} steps={steps} />
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
          <Others v={design.other} tool={tool} />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <Closing v={design.closing} title={t("closing.title")} exploreAll={common("exploreAll")} />
      </section>
    </main>
  );
}
