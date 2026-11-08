import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import { pages, posSlugs, type PosSlug } from "./data";
import PosHero from "./heroes";
import PosWorkspace from "./workspaces";
import PosSnapshot from "./snapshots";
import { css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function posMetadata(slug: PosSlug): Promise<Metadata> {
  const t = await getTranslations("pages.posApp");
  return {
    title: `${pages(t)[slug].title} | Point of Sale`,
    description: pages(t)[slug].description,
    alternates: await getLocaleAlternates(`/apps/pos/${slug}`),
  };
}
export function PosPage({ slug }: { slug: PosSlug }) {
  const t = useTranslations("pages.posApp");
  const p = pages(t)[slug];
  return (
    <main lang="en" dir="ltr" className={css.pos} data-pos-page={slug}>
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("page.breadcrumb")}>
          <Link href="/">{" "}{t("page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/apps/pos/register-till">{t("page.pointOfSale")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <PosHero slug={slug} />
      <PosWorkspace slug={slug} />
      <section className={css.workflowSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("page.theWorkflowInContext")}</p>
              <h2>{t("page.fromTheFirstActionToA")}</h2>
            </div>
          </div>
          <ol className={css.workflow}>
            {p.steps.map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {index < p.steps.length - 1 && (
                  <ArrowRight size={17} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <PosSnapshot slug={slug} />
      <section className={css.relatedSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("page.connectedByDesign")}</p>
              <h2>{t("page.followTheNextPartOfRetail")}</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {p.related.map((item) => (
              <Link href={`/apps/pos/${item}`} key={item}>
                <span>
                  {t("page.pointOfSale2")}{" "}
                  {String(posSlugs.indexOf(item) + 1).padStart(2, "0")}
                </span>
                <h3>
                  {pages(t)[item].title}
                  <ArrowRight size={18} />
                </h3>
                <p>{pages(t)[item].description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("page.yourCounterYourWorkflow")}</p>
            <h2>{t("page.letSPutYourRetailProcess")}</h2>
            <p>
              {t("page.bringYourCheckoutOutletAndStock")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
