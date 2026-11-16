"use client";
import { useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Factory,
  Network,
  ShoppingBasket,
  Globe2,
  GraduationCap,
  Search,
  Shirt,
  Store,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import LiveDemoButton from "@/components/live-demo-button";
import { industrySolutions } from "@/lib/industry-solutions";
import { productCounts } from "@/lib/product-inventory";
import css from "./industry-directory.module.css";

const icons: Record<string, LucideIcon> = {
  garmentsTextile: Shirt,
  fmcg: ShoppingBasket,
  groupOfIndustries: Network,
  manufacturing: Factory,
  retail: Store,
  foodHospitality: UtensilsCrossed,
  education: GraduationCap,
  realEstate: Building2,
  consulting: BriefcaseBusiness,
  others: Globe2,
};

export default function IndustryDirectory() {
  const t = useTranslations("pages.industryDirectory");
  const header = useTranslations("layout.header");
  const apps = useTranslations("pages.apps.hub");
  const format = useFormatter();
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLocaleLowerCase();
  const visible = industrySolutions
    .filter((sector) => selected === "all" || selected === sector.id)
    .map((sector) => ({
      ...sector,
      matches:
        !q ||
        `${header(sector.titleKey)} ${t(`sectors.${sector.id}`)}`
          .toLocaleLowerCase()
          .includes(q)
          ? sector.links
          : sector.links.filter((link) =>
              header(link.labelKey).toLocaleLowerCase().includes(q),
            ),
    }))
    .filter((sector) => sector.matches.length > 0);

  return (
    <main className={css.page} data-industry-directory>
      <section
        className={`${css.wrap} ${css.hero}`}
        aria-labelledby="industry-title"
      >
        <div>
          <p className={css.eyebrow}>{t("eyebrow")}</p>
          <h1 id="industry-title">
            {t("title")}
            <span>{t("highlight")}</span>
          </h1>
          <p className={css.lead}>{t("lead")}</p>
          <div className={css.actions}>
            <LiveDemoButton />
            <a href="#industry-solutions">
              {t("explore")}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={css.facts}>
            <span>
              {t("sectorsCount", {
                count: format.number(productCounts.sectors),
              })}
            </span>
            <span>
              {t("solutionsCount", {
                count: format.number(productCounts.industryPages),
              })}
            </span>
          </div>
        </div>
        <div className={css.atlas} aria-hidden="true">
          <div className={css.atlasHeader}>
            <span>AdonERP</span>
            <Globe2 size={18} />
          </div>
          <div className={css.atlasGrid}>
            {industrySolutions.map((sector) => {
              const Icon = icons[sector.id];
              return (
                <div key={sector.id}>
                  <Icon size={24} strokeWidth={1.4} />
                  <span>{header(sector.titleKey)}</span>
                </div>
              );
            })}
          </div>
          <div className={css.atlasFooter}>
            <strong>{format.number(productCounts.industryPages)}</strong>
            <span>{t("directoryTitle")}</span>
            <ArrowUpRight size={25} />
          </div>
        </div>
      </section>

      <section
        id="industry-solutions"
        className={`${css.directory} ${css.wrap}`}
        aria-labelledby="directory-title"
      >
        <div className={css.directoryHeading}>
          <div>
            <p className={css.eyebrow}>{t("eyebrow")}</p>
            <h2 id="directory-title">{t("directoryTitle")}</h2>
          </div>
          <label className={css.search}>
            <Search size={18} aria-hidden="true" />
            <span className={css.srOnly}>{t("search")}</span>
            <input
              value={query}
              type="search"
              placeholder={t("search")}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls="industry-results"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                type="button"
                aria-label={apps("clear")}
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : null}
          </label>
        </div>
        <div
          className={css.filters}
          role="group"
          aria-label={t("directoryTitle")}
        >
          <button
            type="button"
            aria-pressed={selected === "all"}
            onClick={() => setSelected("all")}
          >
            {apps("all")}
            <span>{format.number(productCounts.industryPages)}</span>
          </button>
          {industrySolutions.map((sector) => (
            <button
              key={sector.id}
              type="button"
              aria-pressed={selected === sector.id}
              onClick={() => setSelected(sector.id)}
            >
              {header(sector.titleKey)}
            </button>
          ))}
        </div>
        <div id="industry-results" className={css.grid}>
          {visible.map((sector, index) => {
            const Icon = icons[sector.id];
            return (
              <article
                key={sector.id}
                className={css.sector}
                data-sector={sector.id}
              >
                <div className={css.sectorHeading}>
                  <span className={css.icon}>
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className={css.number}>
                    {format.number(index + 1, { minimumIntegerDigits: 2 })}
                  </span>
                </div>
                <h3>{header(sector.titleKey)}</h3>
                <p>{t(`sectors.${sector.id}`)}</p>
                <div className={css.workflow}>
                  <span>{t("workflow")}</span>
                  <div>
                    {sector.workflow.map((link, i) => (
                      <span key={link.href}>
                        {i > 0 ? (
                          <ArrowRight size={12} aria-hidden="true" />
                        ) : null}
                        <Link href={link.href}>{header(link.labelKey)}</Link>
                      </span>
                    ))}
                  </div>
                </div>
                <ul>
                  {sector.matches.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        {header(link.labelKey)}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        {visible.length === 0 ? (
          <div className={css.empty} role="status">
            <Search size={30} aria-hidden="true" />
            <p>{apps("noResults")}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelected("all");
              }}
            >
              {apps("clear")}
            </button>
          </div>
        ) : null}
      </section>
      <section className={`${css.wrap} ${css.closing}`}>
        <div>
          <p className={css.eyebrow}>{t("eyebrow")}</p>
          <h2>{apps("ctaTitle")}</h2>
          <p>{apps("ctaLead")}</p>
        </div>
        <LiveDemoButton />
      </section>
    </main>
  );
}
