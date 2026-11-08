import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import { pages, type MerchandisingSlug } from "./data";
import MerchandisingHero from "./heroes";
import MerchandisingWorkspace from "./workspaces";
import MerchandisingSnapshot from "./snapshots";
import { css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
export async function merchandisingMetadata(slug: MerchandisingSlug): Promise<Metadata> {
  const t = await getTranslations("pages.merchandisingApp");
  return {
    title: `${pages(t)[slug].title} | Merchandising`,
    description: pages(t)[slug].description,
    alternates: await getLocaleAlternates(`/apps/merchandising/${slug}`),
  };
}
export function MerchandisingPage({ slug }: { slug: MerchandisingSlug }) {
  const t = useTranslations("pages.merchandisingApp");
  const p = pages(t)[slug];
  return (
    <main
      className={css.merchandising}
      lang="en"
      dir="ltr"
      data-merchandising-page={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("page.breadcrumb")}>
          <Link href="/">{" "}{t("page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/apps/merchandising/merchandising-dashboard">
            {t("page.merchandising")}
          </Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <MerchandisingHero slug={slug} />
      <MerchandisingWorkspace slug={slug} />
      <section className={css.workflowSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("page.theWorkConnected")}</p>
              <h2>{t("page.keepTheNextHandoffClear")}</h2>
            </div>
          </div>
          <ol className={css.workflow}>
            {p.steps.map(([title, description], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {i < 3 && <ArrowRight size={17} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <MerchandisingSnapshot slug={slug} />
      <section className={css.relatedSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("page.followTheOrderSStory")}</p>
              <h2>{t("page.theNextDetailIsConnected")}</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {p.related.map((item) => (
              <Link key={item} href={`/apps/merchandising/${item}`}>
                <span>{t("page.merchandisingExplore")}</span>
                <h3>
                  {pages(t)[item].title}
                  <ArrowRight size={18} aria-hidden="true" />
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
            <p className={css.eyebrow}>
              {t("page.bringYourProcessToTheConversation")}
            </p>
            <h2>{t("page.fromAStyleQuestionToA")}</h2>
            <p>
              {t("page.exploreYourCostingMaterialAndOrder")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
