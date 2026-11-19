import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import { appsMegaMenu } from "@/lib/apps-menu";
import {
  sectorFamilies,
  sectorModules,
  type SectorContent,
  type SectorFamily,
  type SectorSlug,
} from "./data";
import sector from "./sector.module.css";

const appLabels = new Map(
  appsMegaMenu.flatMap((column) => column.links.map((link) => [link.href, link.labelKey] as const)),
);

export type SectorCommon = Record<string, string>;

export type LoadedSector = {
  p: SectorContent;
  c: SectorCommon;
  href: string;
  family: SectorFamily;
  familyLabel: string;
  pageLabel: string;
  modules: { href: string; label: string; body: string }[];
  related: { href: string; label: string }[];
};

/** Loads one page's copy plus everything shared (labels, links, siblings). */
export async function loadSector<F extends SectorFamily>(
  family: F,
  slug: SectorSlug<F>,
): Promise<LoadedSector> {
  const def = sectorFamilies[family];
  const pages = def.pages as Record<string, { key: string; menu: string }>;
  const entry = pages[slug];
  const [t, common, header] = await Promise.all([
    getTranslations(`pages.${def.namespace}`),
    getTranslations("pages"),
    getTranslations("layout.header"),
  ]);
  const p = t.raw(entry.key) as SectorContent;
  const hrefs = sectorModules[`${family}/${slug}`] ?? [];

  return {
    p,
    c: common.raw("sectorCommon") as SectorCommon,
    href: `${def.base}/${slug}`,
    family,
    familyLabel: header(def.menuKey),
    pageLabel: header(`menu.industries.${entry.menu}`),
    modules: hrefs.map((href, i) => ({
      href,
      label: appLabels.has(href) ? header(appLabels.get(href)!) : href,
      body: p.modules[i] ?? "",
    })),
    related: Object.entries(pages)
      .filter(([other]) => other !== slug)
      .map(([other, value]) => ({
        href: `${def.base}/${other}`,
        label: header(`menu.industries.${value.menu}`),
      })),
  };
}

export async function sectorMetadata<F extends SectorFamily>(
  family: F,
  slug: SectorSlug<F>,
): Promise<Metadata> {
  const def = sectorFamilies[family];
  const entry = (def.pages as Record<string, { key: string }>)[slug];
  const t = await getTranslations(`pages.${def.namespace}`);
  const meta = t.raw(`${entry.key}.meta`) as SectorContent["meta"];
  return {
    title: meta.title, // root layout template appends the brand
    description: meta.description,
    alternates: await getLocaleAlternates(`${def.base}/${slug}`),
  };
}

/* ------------------------------ building blocks ------------------------------ */
/*
 * Colours follow the other industry pages (see ./sector.module.css):
 *   --sector-blue   eyebrows, links, icons, highlighted words
 *   --sector-wash   light blue surfaces (badges, closing band)
 *   --cream         alternating section bands, framed by --border
 *   --sector-sage / --sector-sand / --sector-green / --sector-amber
 *                   supporting tints in illustrations and statuses only
 */

/** Root class for every sector page: scopes the shared semantic palette. */
export const sectorRoot = sector.sector;

export const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export function Crumbs({ s }: { s: LoadedSector }) {
  return (
    <nav aria-label={s.c.breadcrumb} className={`${wrap} pt-6 text-xs font-medium text-muted-foreground`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-(--sector-blue)">{s.c.home}</Link></li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li><Link href="/industries" className="hover:text-(--sector-blue)">{s.c.industries}</Link></li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li>{s.familyLabel}</li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li aria-current="page" className="font-semibold text-(--ink)">{s.pageLabel}</li>
      </ol>
    </nav>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.18em] text-(--sector-blue) ${className}`}>{children}</p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-(--ink) sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

/** Illustrative record table. Every page labels it as fictional. */
export function SampleTable({ s }: { s: LoadedSector }) {
  const { sample } = s.p;
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <span className="font-semibold text-(--ink)">{sample.title}</span>
        <span className="rounded-full border border-border bg-(--sector-wash) px-2.5 py-1 text-[11px] font-semibold text-(--sector-blue)">
          {s.c.sampleBadge}
        </span>
      </figcaption>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label={`${sample.title}: ${s.c.tableScroll}`}>
        <table className="w-full min-w-[560px] text-start text-sm">
          <thead className="bg-(--cream) text-muted-foreground">
            <tr>
              {sample.columns.map((col) => (
                <th key={col} scope="col" className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sample.rows.map((row, i) => (
              <tr key={i} className="bg-card">
                {row.map((cell, j) => (
                  <td key={j} className={`px-5 py-3 ${j === 0 ? "font-mono text-xs text-(--sector-blue)" : "text-muted-foreground"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground">{sample.caption}</p>
    </figure>
  );
}

export function ModuleLinks({ s }: { s: LoadedSector }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {s.modules.map((m, i) => (
        <Link
          key={m.href}
          href={m.href}
          className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary"
        >
          <span className="text-xs font-semibold text-(--sector-blue)">0{i + 1}</span>
          <span className="mt-3 flex items-start justify-between gap-3 font-semibold text-(--ink)">
            {m.label}
            <ArrowUpRight className="size-4 shrink-0 text-(--sector-blue) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
          </span>
          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</span>
        </Link>
      ))}
    </div>
  );
}

export function Faqs({ s }: { s: LoadedSector }) {
  return (
    <div className="border-t border-border">
      {s.p.faqs.map((f) => (
        <details key={f.q} className="group border-b border-border py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-(--ink)">
            {f.q}
            <Plus className="size-4 shrink-0 text-(--sector-blue) transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

const relatedLabel: Record<SectorFamily, string> = {
  fmcg: "relatedFmcg",
  group: "relatedGroup",
  health: "relatedHealth",
};

export function Related({ s }: { s: LoadedSector }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-(--ink)">
        {s.c[relatedLabel[s.family]]}
      </p>
      <div className="flex flex-wrap gap-2">
        {s.related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-(--sector-blue)"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Closing band, same as the other industry pages: light blue wash between borders. */
export function Closing({ s }: { s: LoadedSector }) {
  return (
    <section className="border-y border-border bg-(--sector-wash) py-14">
      <div className={`${wrap} flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center`}>
        <div className="max-w-2xl">
          <Eyebrow>{s.c.ctaEyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-(--ink) sm:text-3xl">{s.p.cta.title}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{s.p.cta.body}</p>
        </div>
        <LiveDemoButton />
      </div>
    </section>
  );
}

/** Product links (cream band) + FAQs + sibling pages: shared tail of every page. */
export function Tail({ s }: { s: LoadedSector }) {
  return (
    <>
      <section className="border-y border-border bg-(--cream) py-16 sm:py-20">
        <div className={wrap}>
          <SectionHead eyebrow={s.c.modulesEyebrow} title={s.c.modulesTitle} />
          <ModuleLinks s={s} />
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.4fr]`}>
          <div>
            <SectionHead eyebrow={s.c.faqEyebrow} title={s.c.faqTitle} />
            <Related s={s} />
          </div>
          <Faqs s={s} />
        </div>
      </section>
    </>
  );
}
