"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, LayoutGrid, Search, X } from "lucide-react";

import LiveDemoButton from "@/components/live-demo-button";
import { MODULE_ICONS } from "@/components/landing/MarqueeStrip";
import { ICON_TONES } from "@/components/landing/landing-ui";
import { ShowcaseHeading, ShowcaseHighlight } from "@/components/showcase-typography";
import { Link } from "@/i18n/navigation";
import { appsMegaMenu } from "@/lib/apps-menu";

/** Which group each module sits in on this page. */
const CATEGORY_OF: Record<string, string> = {
  accounting: "finance",
  projectAccounting: "finance",
  budgetManagement: "finance",
  fundAccounting: "finance",
  tradeFinance: "finance",
  supplyChain: "operations",
  inventory: "operations",
  manufacturing: "operations",
  quality: "operations",
  engineeringMaintenance: "operations",
  transportPool: "operations",
  merchandising: "operations",
  hrPayroll: "people",
  employeePortal: "people",
  salesCrm: "sales",
  pos: "sales",
  realEstate: "sales",
  education: "sector",
  university: "sector",
  medicalCentre: "sector",
  analytics: "platform",
  openPlatform: "platform",
};

const CATEGORIES = ["finance", "operations", "people", "sales", "sector", "platform"] as const;
const PREVIEW_LINKS = 4;

type ModuleCard = {
  id: string;
  category: string;
  title: string;
  Icon: (typeof MODULE_ICONS)[string];
  links: { label: string; href: string }[];
};

export default function AppsPageClient() {
  const t = useTranslations("pages.apps.hub");
  const tHeader = useTranslations("layout.header");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const modules = useMemo<ModuleCard[]>(
    () =>
      appsMegaMenu.map((column) => {
        const id = column.titleKey.split(".")[1];
        return {
          id,
          category: CATEGORY_OF[id] ?? "platform",
          title: tHeader(column.titleKey),
          Icon: MODULE_ICONS[column.titleKey] ?? LayoutGrid,
          links: column.links.map((link) => ({ label: tHeader(link.labelKey), href: link.href })),
        };
      }),
    [tHeader],
  );

  const totalPages = modules.reduce((n, m) => n + m.links.length, 0);
  const q = query.trim().toLowerCase();

  const visible = modules
    .filter((m) => category === "all" || m.category === category)
    .map((m) => {
      if (!q) return { module: m, links: m.links, matched: false };
      const titleHit = m.title.toLowerCase().includes(q);
      const hits = m.links.filter((l) => l.label.toLowerCase().includes(q));
      // A module whose own name matches shows all its pages; otherwise only the pages that matched.
      return { module: m, links: titleHit ? m.links : hits, matched: titleHit || hits.length > 0 };
    })
    .filter((x) => !q || x.matched);

  const grouped = !q && category === "all";

  const renderCard = ({ module: m, links }: { module: ModuleCard; links: ModuleCard["links"] }, index: number) => {
    const shown = q ? links : links.slice(0, PREVIEW_LINKS);
    const rest = links.length - shown.length;
    return (
      <li key={m.id} className="group/card flex flex-col rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_40px_-28px_color-mix(in_oklch,var(--foreground)_45%,transparent)]">
        <div className="flex items-start justify-between gap-3">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${ICON_TONES[index % ICON_TONES.length]}`} aria-hidden="true">
            <m.Icon className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t("pagesCount", { count: m.links.length })}</span>
        </div>
        <h3 className="mt-4 text-[17px] font-semibold leading-snug text-foreground">
          <Link href={m.links[0].href} className="hover:text-primary">
            {m.title}
          </Link>
        </h3>
        <ul className="mt-3 space-y-0.5">
          {shown.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group/link flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13.5px] text-muted-foreground transition hover:bg-primary/8 hover:text-primary"
              >
                <span className="truncate">{link.label}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition group-hover/link:translate-x-0 group-hover/link:opacity-100 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          {rest > 0 && <span className="text-[12px] font-medium text-muted-foreground">{t("more", { count: rest })}</span>}
          {rest <= 0 && <span className="invisible text-[12px]">.</span>}
        </div>
        <Link href={m.links[0].href} className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
          {t("open")}
          <ArrowRight className="h-3.5 w-3.5 transition group-hover/card:translate-x-0.5 rtl:rotate-180 rtl:group-hover/card:-translate-x-0.5" aria-hidden="true" />
        </Link>
      </li>
    );
  };

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[var(--cream)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70 [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          style={{ backgroundImage: "radial-gradient(color-mix(in oklch, var(--primary) 16%, transparent) 1px, transparent 1.4px)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold tracking-wide text-primary shadow-sm">
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <ShowcaseHeading as="h1" className="mx-auto mt-6 max-w-4xl text-balance text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            {t("title")} <ShowcaseHighlight className="text-primary">{t("highlight")}</ShowcaseHighlight>
          </ShowcaseHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{t("lead")}</p>

          <div className="mx-auto mt-8 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">{t("searchLabel")}</span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-2xl border border-border bg-card py-4 ps-12 pe-12 text-[15px] text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("clear")}
                  className="absolute end-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <p className="mt-3 text-[13px] text-muted-foreground">{t("summary", { modules: modules.length, pages: totalPages })}</p>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="sticky top-[88px] z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {["all", ...CATEGORIES].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              aria-pressed={category === key}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-semibold transition ${
                category === key ? "border-primary bg-primary text-white" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {key === "all" ? t("all") : t(`categories.${key}.title`)}
            </button>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        {visible.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-[15px] text-muted-foreground">{t("noResults")}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 rounded-lg border border-border px-4 py-2 text-[13px] font-semibold text-primary transition hover:bg-primary/8"
            >
              {t("clear")}
            </button>
          </div>
        ) : grouped ? (
          <div className="space-y-14">
            {CATEGORIES.map((key) => {
              const group = visible.filter((x) => x.module.category === key);
              if (group.length === 0) return null;
              return (
                <section key={key} aria-labelledby={`cat-${key}`}>
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-dashed border-border pb-3">
                    <div>
                      <h2 id={`cat-${key}`} className="showcase-heading text-2xl tracking-tight text-foreground">
                        {t(`categories.${key}.title`)}
                      </h2>
                      <p className="mt-1 text-[14px] text-muted-foreground">{t(`categories.${key}.blurb`)}</p>
                    </div>
                    <span className="text-[12px] font-medium text-muted-foreground">{group.length}</span>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.map((x, i) => renderCard(x, i))}</ul>
                </section>
              );
            })}
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((x, i) => renderCard(x, i))}</ul>
        )}
      </div>

      {/* Closing */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-10 text-white sm:px-12">
          <div className="max-w-2xl">
            <ShowcaseHeading className="text-balance text-3xl tracking-tight sm:text-4xl">{t("ctaTitle")}</ShowcaseHeading>
            <p className="mt-3 text-[15px] leading-7 text-white/80">{t("ctaLead")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LiveDemoButton />
            <Link href="/contact" className="rounded-xl border border-white/40 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/10">
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
