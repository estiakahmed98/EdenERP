import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  basketTotals,
  formatDuration,
  programmeBudget,
  programmeRundown,
} from "./calculations";
import {
  initialBasket,
  money,
  otherIndustries,
  pages,
  products,
  programmeLines,
  segments,
  type OtherIndustry,
} from "./data";
import OtherIndustryHero from "./heroes";
import OtherIndustryDemo, { IndustryStory } from "./workspaces";
import { Badge, Metric, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
export async function otherIndustryMetadata(slug: OtherIndustry): Promise<Metadata> {
  const t = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(t)[slug].title} | Industries`,
    description: pages(t)[slug].description,
    alternates: await getLocaleAlternates(`/industries/${slug}`),
  };
}
function ProductCanvas({ slug }: { slug: OtherIndustry }) {
  const t = useTranslations("pages.industriesApp");
  const basket = basketTotals(
    products(t)
      .filter((row) => initialBasket[row.id])
      .map((row) => ({ ...row, qty: initialBasket[row.id] })),
    80,
    0,
  );
  const budget = programmeBudget(
    100000,
    programmeLines(t).map((row) => row.amount),
  );
  const rundown = programmeRundown("19:00", 30, segments(t));
  const columns =
    slug === "ecommerce"
      ? [t("others.page.exampleProduct"), t("others.page.reference"), t("others.page.quantity"), t("others.page.unitPrice")]
      : slug === "ngo"
        ? [
            t("others.page.examplePlanningLine"),
            t("others.page.reference"),
            t("others.page.planningAmount"),
            t("others.page.recordContext"),
          ]
        : [t("others.page.exampleSegment"), t("others.page.duration"), t("others.page.starts"), t("others.page.ends")];
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          {t("others.page.eden")}<span>{t("others.page.erp")}</span>
        </b>
        <span>/ {pages(t)[slug].title}{" "}{t("others.page.conceptCanvas")}</span>
        <Badge>{t("others.page.illustrativeRecordsNoLiveConnection")}</Badge>
      </header>
      <div className={css.canvasBody}>
        <h3>
          {slug === "ecommerce"
            ? t("others.page.theBasketAndBusinessContext")
            : slug === "ngo"
              ? t("others.page.theProgrammePlanningConversation")
              : t("others.page.theProgrammeRundownInView")}
        </h3>
        <dl className={css.canvasMetrics}>
          {slug === "ecommerce" ? (
            <>
              <Metric
                label={t("others.page.exampleItemSubtotal")}
                value={money(basket.subtotal)}
              />
              <Metric label={t("others.page.exampleDelivery")} value={money(basket.delivery)} />
              <Metric
                label={t("others.page.exampleTotalTaxNotCalculated")}
                value={money(basket.total)}
              />
            </>
          ) : slug === "ngo" ? (
            <>
              <Metric label={t("others.page.examplePlanningBudget")} value={money(100000)} />
              <Metric
                label={t("others.page.assignedInExample")}
                value={money(budget.assigned)}
              />
              <Metric
                label={t("others.page.unassignedInExample")}
                value={money(budget.remaining)}
              />
            </>
          ) : (
            <>
              <Metric label={t("others.page.exampleStart")} value="19:00:00" />
              <Metric
                label={t("others.page.exampleDuration")}
                value={formatDuration(rundown.total)}
              />
              <Metric
                label={t("others.page.belowExampleTarget")}
                value={formatDuration(rundown.remaining)}
              />
            </>
          )}
        </dl>
        <div
          className={css.tableScroll}
          tabIndex={0}
          role="region"
          aria-label={`${pages(t)[slug].title} illustrative table, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages(t)[slug].title}{" "}{t("others.page.staticIllustrativeRecordsBasedOnThe")}
            </caption>
            <thead>
              <tr>
                {columns.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slug === "ecommerce"
                ? products(t)
                    .filter((row) => initialBasket[row.id])
                    .map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.id}</td>
                        <td>{initialBasket[row.id]}</td>
                        <td>{money(row.price)}</td>
                      </tr>
                    ))
                : slug === "ngo"
                  ? programmeLines(t).map((row) => (
                      <tr key={row.id}>
                        <td>{row.label}</td>
                        <td>{t("others.page.exPlan")}{" "}{row.id}</td>
                        <td>{money(row.amount)}</td>
                        <td>{t("others.page.localPlanningExampleNotSpent")}</td>
                      </tr>
                    ))
                  : segments(t).map((row) => {
                      const timing = rundown.timings.find(
                        (item) => item.id === row.id,
                      )!;
                      return (
                        <tr key={row.id}>
                          <td>{row.title}</td>
                          <td>{row.duration}</td>
                          <td>{timing.start.time}</td>
                          <td>{timing.end.time}</td>
                        </tr>
                      );
                    })}
            </tbody>
          </table>
        </div>
        <p className={css.canvasNote}>
          {t("others.page.staticConceptCanvasSeparateFromThe")}
        </p>
      </div>
    </div>
  );
}
export function OtherIndustryPage({ slug }: { slug: OtherIndustry }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  return (
    <main
      lang="en"
      dir="ltr"
      className={css.industry}
      data-other-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("others.page.breadcrumb")}>
          <Link href="/">{" "}{t("others.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{t("others.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{t("others.page.others")}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <OtherIndustryHero slug={slug} />
      <IndustryStory slug={slug} />
      <OtherIndustryDemo slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("others.page.theSupportingProductConversation")}</p>
              <h2>{t("others.page.exploreTheRelevantBusinessRecords")}</h2>
              <p>
                {t("others.page.browseExistingProductPresentationsThenDi")}
              </p>
            </div>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link href={tool.href} key={tool.href}>
                <span>0{i + 1}{" "}{t("others.page.productPreview")}</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>{t("others.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("others.page.seeTheDetailAndTheContext")}</p>
              <h2>{t("others.page.aCloserLookAtTheExperience")}</h2>
              <p>
                {t("others.page.illustrativeRecordsWithAGuidedProduct")}
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description={t("others.page.bringYourOperationalQuestionsToAn")}
          >
            <ProductCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("others.page.aFewUsefulDetails")}</p>
            <h2>{t("others.page.knowWhatYouReExploring")}</h2>
          </div>
          <div className={css.faqList}>
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
      <section className={css.relatedSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>
                {t("others.page.differentIndustriesASharedBusinessFounda")}
              </p>
              <h2>{t("others.page.exploreAnotherOperationalStory")}</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {otherIndustries
              .filter((item) => item !== slug)
              .map((item) => (
                <Link href={`/industries/${item}`} key={item}>
                  <span>{t("others.page.industry")}{" "}{pages(t)[item].title.toUpperCase()}</span>
                  <h3>
                    {pages(t)[item].headline} {pages(t)[item].accent}
                    <ArrowRight size={18} aria-hidden="true" />
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("others.page.yourOrganisationYourWorkflow")}</p>
            <h2>{t("others.page.letSBeginWithTheWay")}</h2>
            <p>
              {t("others.page.bringYourRecordsPlanningAndOperational")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
