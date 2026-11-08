import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  milestoneDates,
  settlementScenario,
  sizeBreakdown,
  trimRequirements,
} from "./calculations";
import {
  apparelSlugs,
  dateLabel,
  examplePcd,
  milestones,
  money,
  num,
  pages,
  sizes,
  trims,
  type ApparelSlug,
} from "./data";
import ApparelHero from "./heroes";
import ApparelDemo, { ApparelStory } from "./workspaces";
import { Badge, Metric, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type TFn } from "@/lib/i18n/t-types";
export async function apparelMetadata(slug: ApparelSlug): Promise<Metadata> {
  const t = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(t)[slug].title} | Garments & Textile Industries | Adon ERP`,
    description: pages(t)[slug].description,
    alternates: await getLocaleAlternates(`/industries/${slug}`),
  };
}
function canvasData(slug: ApparelSlug, t: TFn): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "garments") {
    const pieces = sizeBreakdown(
      3000,
      sizes.map((row) => row.ratio),
    );
    return {
      stats: [
        [t("apparel.page.exampleOrderPieces"), "3,000"],
        [t("apparel.page.exampleSizes"), "4"],
        [t("apparel.page.ratioUnits"), "1 : 2 : 2 : 1"],
      ],
      columns: [
        t("apparel.page.exampleSize"),
        t("apparel.page.ratioUnits"),
        t("apparel.page.allocatedPieces"),
        t("apparel.page.recordContext"),
      ],
      rows: sizes.map((row, i) => [
        row.label,
        row.ratio,
        num(pieces[i]),
        t("apparel.page.localBreakdownNotACuttingPlan"),
      ]),
    };
  }
  if (slug === "accessories") {
    const results = trimRequirements(1000, 2.5, trims);
    return {
      stats: [
        [t("apparel.page.exampleOrderPieces"), "1,000"],
        [t("apparel.page.enteredExtraAllowance"), "2.5%"],
        [t("apparel.page.exampleAccessoryLines"), "4"],
      ],
      columns: [
        t("apparel.page.exampleItem"),
        t("apparel.page.countGarment"),
        t("apparel.page.exampleStockPcs"),
        t("apparel.page.requiredPcs"),
        t("apparel.page.shortPcs"),
      ],
      rows: trims.map((row, i) => [
        row.name,
        row.perPiece,
        num(row.stock),
        num(results[i].required),
        num(results[i].short),
      ]),
    };
  }
  if (slug === "buying-house") {
    const trade = settlementScenario({
      mode: "margin",
      quantity: 10000,
      selling: 8.5,
      buying: 7.2,
    }, t);
    return {
      stats: [
        [t("apparel.page.exampleTradingSales"), money(trade.revenue)],
        [t("apparel.page.examplePurchaseCost"), money(trade.cost!)],
        [t("apparel.page.differenceBeforeOtherCosts"), money(trade.contribution!)],
      ],
      columns: [
        t("apparel.page.separateModel"),
        t("apparel.page.exampleBasis"),
        t("apparel.page.exampleGrossAmount"),
        t("apparel.page.meaning"),
      ],
      rows: [
        [
          t("apparel.page.marginTrading"),
          t("apparel.page.n10000PiecesUsd850"),
          money(trade.revenue),
          t("apparel.page.sellingValueBeforePurchaseAndOther"),
        ],
        [
          t("apparel.page.commissionFee"),
          t("apparel.page.n10000PiecesUsd035"),
          money(3500),
          t("apparel.page.grossFeesOnlyOperatingCostsUnknown"),
        ],
      ],
    };
  }
  const dates = milestoneDates(
    examplePcd,
    milestones.map((row) => row.days),
  );
  return {
    stats: [
      [t("apparel.page.exampleCuttingDate"), dateLabel(examplePcd)],
      [t("apparel.page.exampleMilestones"), "4"],
      [t("apparel.page.calendarBasis"), t("apparel.page.calendarDays")],
    ],
    columns: [
      t("apparel.page.exampleMilestone"),
      t("apparel.page.daysBeforePcd"),
      t("apparel.page.calculatedDate"),
      t("apparel.page.recordContext"),
    ],
    rows: milestones.map((row, i) => [
      row.name,
      row.days,
      dateLabel(dates[i]),
      t("apparel.page.localAssumptionNotASavedTna"),
    ]),
  };
}
function ProductCanvas({ slug }: { slug: ApparelSlug }) {
  const t = useTranslations("pages.industriesApp");
  const evidence = canvasData(slug, t);
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          {t("apparel.page.eden")}<span>{t("apparel.page.erp")}</span>
        </b>
        <span>/ {pages(t)[slug].title}{" "}{t("apparel.page.conceptCanvas")}</span>
        <Badge>{t("apparel.page.illustrativeRecordsNoLiveConnection")}</Badge>
      </header>
      <div className={css.canvasBody}>
        <h3>{pages(t)[slug].demoTitle}</h3>
        <dl className={css.canvasMetrics}>
          {evidence.stats.map(([label, value]) => (
            <Metric key={label} label={label} value={value} />
          ))}
        </dl>
        <div
          className={css.tableScroll}
          tabIndex={0}
          role="region"
          aria-label={`${pages(t)[slug].title} illustrative records, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages(t)[slug].title}{" "}{t("apparel.page.staticIllustrativeRecordsBasedOnThe")}
            </caption>
            <thead>
              <tr>
                {evidence.columns.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidence.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={css.canvasNote}>
          {t("apparel.page.staticConceptCanvasSeparateFromThe")}
        </p>
      </div>
    </div>
  );
}
export function ApparelIndustryPage({ slug }: { slug: ApparelSlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  const related = [
    { title: t("apparel.page.textile"), href: "/industries/manufacturing/textile" },
    ...apparelSlugs
      .filter((item) => item !== slug)
      .map((item) => ({
        title: pages(t)[item].title,
        href: `/industries/${item}`,
      })),
  ];
  return (
    <main
      lang="en"
      dir="ltr"
      className={css.industry}
      data-apparel-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("apparel.page.breadcrumb")}>
          <Link href="/">{t("apparel.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{t("apparel.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{t("apparel.page.garmentsTextile")}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <ApparelHero slug={slug} />
      <ApparelStory slug={slug} />
      <ApparelDemo slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("apparel.page.theSupportingProductConversation")}</p>
              <h2>{t("apparel.page.followTheRelevantProductDetail")}</h2>
              <p>
                {t("apparel.page.exploreExistingErpPresentationsThenDiscu")}
              </p>
            </div>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link href={tool.href} key={tool.href}>
                <span>0{i + 1}{" "}{t("apparel.page.productPreview")}</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>{t("apparel.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("apparel.page.seeTheRecordAndTheContext")}</p>
              <h2>{t("apparel.page.aCloserLookAtTheExperience")}</h2>
              <p>
                {t("apparel.page.illustrativeRecordsWithTheCompleteProduc")}
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description={t("apparel.page.exploreYourGarmentMaterialFactoryAnd")}
          >
            <ProductCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("apparel.page.aFewUsefulDetails")}</p>
            <h2>{t("apparel.page.understandTheExample")}</h2>
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
                {t("apparel.page.theWiderGarmentsTextileJourney")}
              </p>
              <h2>{t("apparel.page.exploreTheNextPartOfThe")}</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {related.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{t("apparel.page.industryExplore")}</span>
                <h3>
                  {item.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("apparel.page.yourOperationYourWorkflow")}</p>
            <h2>{t("apparel.page.bringYourOrderSStoryTo")}</h2>
            <p>
              {t("apparel.page.discussYourStyleFactoryMaterialAnd")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
