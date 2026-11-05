import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import { siteConfig } from "@/lib/site";
import LiveDemoButton from "@/components/live-demo-button";
import CommunityHero from "./heroes";
import CommunityContent, {
  type ContactInfo,
  type TranslationLabels,
} from "./content";
import BlogJournal from "./blog-journal";
import { menuSlugs, pages, type CommunitySlug } from "./data";
import { base, css } from "./ui";
export async function communityMetadata(
  slug: CommunitySlug,
): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | EdenERP Community`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(pages[slug].path),
  };
}
export async function CommunityPage({ slug }: { slug: CommunitySlug }) {
  const p = pages[slug],
    business = siteConfig.business;
  const contact: ContactInfo = {
    supportEmail: business.supportEmail,
    salesEmail: business.salesEmail,
    phone: business.phone,
    phoneDisplay: business.phoneDisplay,
  };
  let labels: TranslationLabels | undefined;
  if (slug === "translations") {
    const translators = await Promise.all(
      ["en", "bn", "ar"].map((locale) =>
        getTranslations({ locale, namespace: "common.actions" }),
      ),
    );
    labels = {
      en: translators[0]("liveDemo"),
      bn: translators[1]("liveDemo"),
      ar: translators[2]("liveDemo"),
    };
  }
  const related = menuSlugs
    .filter(
      (s) => s !== slug && (slug === "home" || pages[s].group === p.group),
    )
    .slice(0, 4);
  return (
    <main
      className={`${base.professional} ${css.community}`}
      lang="en"
      dir="ltr"
      data-community-page={slug}
    >
      <div className={base.wrap}>
        <nav className={base.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          {slug === "home" ? (
            <span aria-current="page">Community</span>
          ) : (
            <>
              <Link href="/community">Community</Link>
              <ChevronRight size={11} aria-hidden="true" />
              <span>{p.group}</span>
              <ChevronRight size={11} aria-hidden="true" />
              <span aria-current="page">{p.title}</span>
            </>
          )}
        </nav>
      </div>
      <CommunityHero slug={slug} />
      <section id="community-content" className={css.contentSection}>
        <div className={base.wrap}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>
              {p.group === "Community"
                ? "THE COMMUNITY DIRECTORY"
                : p.group.toUpperCase()}
            </p>
            <h2>{p.sectionTitle}</h2>
            <p>{p.sectionDescription}</p>
          </div>
          {slug === "blog" ? (
            <BlogJournal />
          ) : (
            <CommunityContent slug={slug} contact={contact} labels={labels} />
          )}
        </div>
      </section>
      <section className={base.faqSection}>
        <div className={`${base.wrap} ${base.faqLayout}`}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>A LITTLE USEFUL CONTEXT</p>
            <h2>Before the next step.</h2>
          </div>
          <div className={base.faqList}>
            {p.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={17} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className={base.relatedSection}>
        <div className={base.wrap}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>KEEP EXPLORING</p>
            <h2>A few connected places to go.</h2>
          </div>
          <div className={base.relatedGrid}>
            {related.map((s) => (
              <Link key={s} href={pages[s].path}>
                {pages[s].title}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={base.closing} id="community-next-step">
        <div className={base.wrap}>
          <div>
            <p className={base.eyebrow}>YOUR WORKFLOW. YOUR QUESTIONS.</p>
            <h2>Bring the next conversation into focus.</h2>
            <p>
              Share your process with an advisor and explore the product context
              that matters to your team.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
