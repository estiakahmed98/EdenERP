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
export async function merchandisingMetadata(slug: MerchandisingSlug): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Merchandising | EdenERP`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(`/apps/merchandising/${slug}`),
  };
}
export function MerchandisingPage({ slug }: { slug: MerchandisingSlug }) {
  const p = pages[slug];
  return (
    <main
      className={css.merchandising}
      lang="en"
      dir="ltr"
      data-merchandising-page={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/apps/merchandising/merchandising-dashboard">
            Merchandising
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
              <p className={css.eyebrow}>THE WORK, CONNECTED</p>
              <h2>Keep the next handoff clear.</h2>
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
              <p className={css.eyebrow}>FOLLOW THE ORDER’S STORY</p>
              <h2>The next detail is connected.</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {p.related.map((item) => (
              <Link key={item} href={`/apps/merchandising/${item}`}>
                <span>MERCHANDISING / EXPLORE</span>
                <h3>
                  {pages[item].title}
                  <ArrowRight size={18} aria-hidden="true" />
                </h3>
                <p>{pages[item].description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>
              BRING YOUR PROCESS TO THE CONVERSATION
            </p>
            <h2>From a style question to a clearer workflow.</h2>
            <p>
              Explore your costing, material and order-follow-up questions with
              an advisor.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
