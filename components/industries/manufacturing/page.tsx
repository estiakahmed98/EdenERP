import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import { riceMassBalance, steelWeight } from "./calculations";
import {
  kg,
  pages,
  riceExample,
  steelExample,
  type IndustrySlug,
} from "./data";
import IndustryHero from "./heroes";
import IndustryWorkspace, { ProcessStory } from "./workspaces";
import { Badge, Metric, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
export async function manufacturingIndustryMetadata(slug: IndustrySlug): Promise<Metadata> {
  const t = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(t)[slug].title} | Manufacturing Industries`,
    description: pages(t)[slug].description,
    alternates: await getLocaleAlternates(`/industries/${slug}`),
  };
}
function ProductCanvas({ slug }: { slug: IndustrySlug }) {
  const t = useTranslations("pages.industriesApp");
  const steel = steelWeight(
    steelExample.gross,
    steelExample.tare,
    steelExample.orders.map((row) => row.weight),
  );
  const rice = riceMassBalance(riceExample.input, riceExample);
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          {t("manufacturing.page.eden")}<span>{t("manufacturing.page.erp")}</span>
        </b>
        <span>/ {pages(t)[slug].title}{" "}{t("manufacturing.page.illustrativeQuantityCanvas")}</span>
        <Badge>{t("manufacturing.page.exampleRecordsNotLiveErpData")}</Badge>
      </header>
      <div className={css.canvasBody}>
        <div className={css.canvasHeading}>
          <h3>
            {slug === "steel"
              ? t("manufacturing.page.materialWeightAndOrderContext")
              : t("manufacturing.page.inputLotAndRecordedOutputContext")}
          </h3>
          <span>
            {slug === "steel" ? steelExample.reference : riceExample.reference}
          </span>
        </div>
        <dl className={css.canvasMetrics}>
          {slug === "steel" ? (
            <>
              <Metric label={t("manufacturing.page.exampleNetWeight")} value={kg(steel.net)} />
              <Metric
                label={t("manufacturing.page.exampleAllocatedWeight")}
                value={kg(steel.allocated)}
              />
              <Metric
                label={t("manufacturing.page.exampleUnallocatedWeight")}
                value={kg(steel.remaining)}
              />
            </>
          ) : (
            <>
              <Metric
                label={t("manufacturing.page.examplePaddyInput")}
                value={kg(riceExample.input)}
              />
              <Metric
                label={t("manufacturing.page.exampleRecordedOutputs")}
                value={kg(rice.recorded)}
              />
              <Metric
                label={t("manufacturing.page.exampleUnassignedWeight")}
                value={kg(rice.unassigned)}
              />
            </>
          )}
        </dl>
        <div
          className={css.tableScroll}
          role="region"
          tabIndex={0}
          aria-label={`${pages(t)[slug].title} example table, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages(t)[slug].title}{" "}{t("manufacturing.page.illustrativeRecordsNoErpTransactions")}
            </caption>
            <thead>
              <tr>
                {(slug === "steel"
                  ? [
                      t("manufacturing.page.exampleOrder"),
                      t("manufacturing.page.materialReference"),
                      t("manufacturing.page.allocatedWeight"),
                      t("manufacturing.page.recordContext"),
                    ]
                  : [
                      t("manufacturing.page.exampleOutput"),
                      t("manufacturing.page.inputLot"),
                      t("manufacturing.page.recordedWeight"),
                      t("manufacturing.page.recordContext"),
                    ]
                ).map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slug === "steel"
                ? steelExample.orders.map((row) => (
                    <tr key={row.reference}>
                      <td>{row.reference}</td>
                      <td>{steelExample.reference}</td>
                      <td>{kg(row.weight)}</td>
                      <td>{t("manufacturing.page.localIllustrationNotReserved")}</td>
                    </tr>
                  ))
                : (
                    [
                      ["Head rice", riceExample.headRice],
                      ["Broken rice", riceExample.brokenRice],
                      ["Bran", riceExample.bran],
                      ["Husk", riceExample.husk],
                    ] as const
                  ).map(([label, weight]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{riceExample.reference}</td>
                      <td>{kg(weight)}</td>
                      <td>{t("manufacturing.page.localIllustrationNotPosted")}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <p className={css.canvasNote}>
          {t("manufacturing.page.staticConceptCanvasBasedOnThe")}
        </p>
      </div>
    </div>
  );
}
export function ManufacturingIndustryPage({ slug }: { slug: IndustrySlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  const other = slug === "steel" ? "agro-rice" : "steel";
  return (
    <main
      className={css.industry}
      lang="en"
      dir="ltr"
      data-production-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("manufacturing.page.breadcrumb")}>
          <Link href="/">{" "}{t("manufacturing.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{t("manufacturing.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{t("manufacturing.page.manufacturing")}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <IndustryHero slug={slug} />
      <ProcessStory slug={slug} />
      <IndustryWorkspace slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("manufacturing.page.bringTheSupportingWorkIntoView")}</p>
              <h2>{t("manufacturing.page.exploreTheRelevantProductPreviews")}</h2>
              <p>
                {t("manufacturing.page.startWithTheExistingErpPresentations")}
              </p>
            </div>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
                <span>0{i + 1}{" "}{t("manufacturing.page.productPresentation")}</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>{t("manufacturing.page.exploreThePreview")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("manufacturing.page.seeTheQuantityAndTheContext")}</p>
              <h2>{t("manufacturing.page.aCloserLookAtTheWorkspace")}</h2>
              <p>
                {t("manufacturing.page.illustrativeRecordsWithTheFullWorkflow")}
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description={t("manufacturing.page.exploreYourIntakeProductionAndInventory")}
          >
            <ProductCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("manufacturing.page.aFewUsefulDetails")}</p>
            <h2>{t("manufacturing.page.understandTheExample")}</h2>
            <Link href={`/industries/${other}`} className={css.otherIndustry}>
              {t("manufacturing.page.explore")}{" "}{pages(t)[other].title}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
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
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("manufacturing.page.yourOperationYourProcess")}</p>
            <h2>{t("manufacturing.page.bringYourProductionStoryToThe")}</h2>
            <p>
              {t("manufacturing.page.discussYourMaterialWeightQualityAnd")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
