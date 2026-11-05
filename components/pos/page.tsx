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

export async function posMetadata(slug: PosSlug): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Point of Sale`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(`/apps/pos/${slug}`),
  };
}
export function PosPage({ slug }: { slug: PosSlug }) {
  const p = pages[slug];
  return (
    <main lang="en" dir="ltr" className={css.pos} data-pos-page={slug}>
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/"> Adon ERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/apps/pos/register-till">Point of Sale</Link>
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
              <p className={css.eyebrow}>THE WORKFLOW, IN CONTEXT</p>
              <h2>From the first action to a clear outcome.</h2>
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
              <p className={css.eyebrow}>CONNECTED BY DESIGN</p>
              <h2>Follow the next part of retail.</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {p.related.map((item) => (
              <Link href={`/apps/pos/${item}`} key={item}>
                <span>
                  POINT OF SALE /{" "}
                  {String(posSlugs.indexOf(item) + 1).padStart(2, "0")}
                </span>
                <h3>
                  {pages[item].title}
                  <ArrowRight size={18} />
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
            <p className={css.eyebrow}>YOUR COUNTER. YOUR WORKFLOW.</p>
            <h2>Let’s put your retail process in the picture.</h2>
            <p>
              Bring your checkout, outlet and stock questions to a guided
              product conversation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
