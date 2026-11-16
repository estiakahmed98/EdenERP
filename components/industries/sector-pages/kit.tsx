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

export const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export function Crumbs({ s, tone = "" }: { s: LoadedSector; tone?: string }) {
  return (
    <nav aria-label={s.c.breadcrumb} className={`${wrap} pt-6 text-xs font-medium ${tone || "text-muted-foreground"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:underline">{s.c.home}</Link></li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li><Link href="/industries" className="hover:underline">{s.c.industries}</Link></li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li>{s.familyLabel}</li>
        <li aria-hidden><ChevronRight className="size-3" /></li>
        <li aria-current="page" className="font-semibold opacity-100">{s.pageLabel}</li>
      </ol>
    </nav>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${className}`}>{children}</p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  accent,
  center = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  accent: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow className={accent}>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

/** Illustrative record table. Every page labels it as fictional. */
export function SampleTable({
  s,
  head,
  frame,
  badge,
}: {
  s: LoadedSector;
  head: string;
  frame: string;
  badge: string;
}) {
  const { sample } = s.p;
  return (
    <figure className={`overflow-hidden rounded-2xl border ${frame}`}>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-inherit px-5 py-4">
        <span className="font-semibold text-foreground">{sample.title}</span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge}`}>{s.c.sampleBadge}</span>
      </figcaption>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label={`${sample.title}: ${s.c.tableScroll}`}>
        <table className="w-full min-w-[560px] text-start text-sm">
          <thead className={head}>
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
                  <td key={j} className={`px-5 py-3 ${j === 0 ? "font-mono text-xs text-foreground" : "text-muted-foreground"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-inherit px-5 py-3 text-xs text-muted-foreground">{sample.caption}</p>
    </figure>
  );
}

export function ModuleLinks({
  s,
  card,
  icon,
  columns = "sm:grid-cols-2 lg:grid-cols-4",
}: {
  s: LoadedSector;
  card: string;
  icon: string;
  columns?: string;
}) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {s.modules.map((m, i) => (
        <Link
          key={m.href}
          href={m.href}
          className={`group flex flex-col rounded-2xl border p-5 transition-colors ${card}`}
        >
          <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
          <span className="mt-3 flex items-start justify-between gap-3 font-semibold text-foreground">
            {m.label}
            <ArrowUpRight className={`size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 ${icon}`} aria-hidden />
          </span>
          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</span>
        </Link>
      ))}
    </div>
  );
}

export function Faqs({ s, accent, item }: { s: LoadedSector; accent: string; item: string }) {
  return (
    <div className="space-y-3">
      {s.p.faqs.map((f) => (
        <details key={f.q} className={`group rounded-2xl border p-5 ${item}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground">
            {f.q}
            <Plus className={`size-4 shrink-0 transition-transform group-open:rotate-45 ${accent}`} aria-hidden />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Related({ s, chip }: { s: LoadedSector; chip: string }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-foreground">
        {s.family === "fmcg" ? s.c.relatedFmcg : s.c.relatedGroup}
      </p>
      <div className="flex flex-wrap gap-2">
        {s.related.map((r) => (
          <Link key={r.href} href={r.href} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${chip}`}>
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Closing({ s, panel, accent }: { s: LoadedSector; panel: string; accent: string }) {
  return (
    <section className="py-16 sm:py-20">
      <div className={wrap}>
        <div className={`flex flex-col items-start justify-between gap-8 rounded-3xl p-8 sm:p-12 lg:flex-row lg:items-center ${panel}`}>
          <div className="max-w-2xl">
            <Eyebrow className={accent}>{s.c.ctaEyebrow}</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{s.p.cta.title}</h2>
            <p className="mt-3 leading-relaxed opacity-80">{s.p.cta.body}</p>
          </div>
          <LiveDemoButton />
        </div>
      </div>
    </section>
  );
}

/** Product links + FAQs + sibling pages, shared tail of every page. */
export function Tail({
  s,
  accent,
  card,
  icon,
  item,
  chip,
  surface = "",
}: {
  s: LoadedSector;
  accent: string;
  card: string;
  icon: string;
  item: string;
  chip: string;
  surface?: string;
}) {
  return (
    <>
      <section className={`py-16 sm:py-20 ${surface}`}>
        <div className={wrap}>
          <SectionHead eyebrow={s.c.modulesEyebrow} title={s.c.modulesTitle} accent={accent} />
          <ModuleLinks s={s} card={card} icon={icon} />
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.4fr]`}>
          <div>
            <SectionHead eyebrow={s.c.faqEyebrow} title={s.c.faqTitle} accent={accent} />
            <Related s={s} chip={chip} />
          </div>
          <Faqs s={s} accent={accent} item={item} />
        </div>
      </section>
    </>
  );
}
