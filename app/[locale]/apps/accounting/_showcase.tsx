import LiveDemoButton from "@/components/live-demo-button";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { NS, industryGroupHref, toolSlugs, useCommon, type ToolKey } from "./_shared";

/*
 * Pieces shared by the longer accounting showcase pages (Bills, Purchase
 * Orders). The older pages keep their own copies; the copy is the same.
 */

export type Faq = { q: string; a: string };

export const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
export const h2 =
  "showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]";
export const lead = "text-[17px] leading-[1.65] text-muted-foreground";
export const link =
  "rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Faint ruled-ledger lines behind the hero preview. */
export const ruled = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SecondaryButton({
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

export function JsonLd({ data }: { data: object | object[] }) {
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

export function faqSchema(items: Faq[]) {
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

/** Handwritten notes above the product preview (lg and up). They draw in once. */
export function HandNotes({
  prefix,
  notes,
  cols,
  itemClass,
}: {
  prefix: string;
  notes: string[];
  cols: string[];
  itemClass: (index: number) => string;
}) {
  return (
    <>
      <style>{`
        @keyframes ${prefix}-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes ${prefix}-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .${prefix}-note-arrow path { stroke-dasharray: 80; animation: ${prefix}-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .${prefix}-note-text { animation: ${prefix}-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) { .${prefix}-note-arrow path, .${prefix}-note-text { animation: none } }
      `}</style>
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:px-2" aria-hidden="true">
        {notes.map((text, i) => (
          <div
            key={text}
            className={`${cols[i]} flex flex-col ${itemClass(i)}`}
            style={{ ["--d" as string]: `${0.5 + i * 0.25}s` }}
          >
            <p
              className={`${prefix}-note-text showcase-heading-highlight max-w-[13rem] ps-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary`}
            >
              {text}
            </p>
            <div className="ps-6">
              <svg
                viewBox="0 0 40 46"
                className={`${prefix}-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary`}
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Groups of linked accounting tools. Names come from the common messages. */
export function ConnectSection({
  copy,
  structure,
}: {
  copy: { title: string; intro: string; groups: Record<string, string>; items: Record<string, string> };
  structure: { key: string; tools: ToolKey[] }[];
}) {
  const { tools } = useCommon();
  return (
    <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28">
      <div className={wrap}>
        <div className="max-w-[46rem]">
          <h2 id="tools-title" className={h2}>
            {copy.title}
          </h2>
          <p className={`${lead} mt-5`}>{copy.intro}</p>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {structure.map((g) => (
            <div key={g.key}>
              <h3 className="border-b-2 border-primary pb-3 text-[15px] font-semibold text-foreground">
                {copy.groups[g.key]}
              </h3>
              <ul className="mt-2">
                {g.tools.map((key) => (
                  <li key={key} className="border-b border-border/80 py-4 last:border-b-0">
                    <Link
                      href={toolSlugs[key].startsWith("/") ? toolSlugs[key] : `/apps/accounting/${toolSlugs[key]}`}
                      className={`${link} text-[15px] font-medium text-foreground`}
                    >
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

/** Dated steps with a vertical rule. Works in right-to-left too. */
export function StorySteps({ steps }: { steps: { time: string; text: string }[] }) {
  return (
    <ol>
      {steps.map((s, i) => (
        <li key={i} className="relative grid grid-cols-[5.25rem_1fr] gap-3 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span className="absolute bottom-[-6px] start-[6rem] top-[22px] w-px bg-primary/25" aria-hidden="true" />
          )}
          <time className="pt-0.5 text-[14px] font-semibold text-primary tabular-nums">{s.time}</time>
          <p className="relative ps-5 text-[15px] leading-[1.6] text-foreground/90 before:absolute before:start-[-4.5px] before:top-[9px] before:h-2 before:w-2 before:rounded-full before:bg-primary">
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

const industryRoutes = [
  "retail",
  "food-hospitality",
  "real-estate",
  "consulting",
  "manufacturing",
  "health-fitness",
  "trades",
  "others",
];

/** Last section: industries, FAQ and the closing call to action. */
export function FinalSection({
  industries,
  faq,
  closingTitle,
  exploreHref = "/apps/accounting",
  exploreLabel,
}: {
  industries: { title: string; angles: Record<string, string> };
  faq: { title: string; items: Faq[] };
  closingTitle: string;
  exploreHref?: string;
  exploreLabel?: string;
}) {
  const { t: common, groups } = useCommon();
  return (
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
                {closingTitle}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/75">{common("closingBody")}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <LiveDemoButton />
              <SecondaryButton href={exploreHref} inverted>
                {exploreLabel ?? common("exploreAccounting")}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Namespace hook for a showcase section, e.g. useSection("bills"). */
export function useSection(section: string) {
  return useTranslations(`${NS}.${section}`);
}
