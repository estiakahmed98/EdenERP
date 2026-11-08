import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import { barPattern, componentKits, fabricLength } from "./calculations";
import {
  components,
  defaultLosses,
  num,
  pages,
  routeFor,
  textileStages,
  type IndustrialSlug,
} from "./data";
import IndustrialHero from "./heroes";
import IndustrialWorkspace, { IndustrialWorkflow } from "./workspaces";
import { Badge, Metric, Note, base, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type TFn } from "@/lib/i18n/t-types";
export async function industrialMetadata(
  slug: IndustrialSlug,
): Promise<Metadata> {
  const tx = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(tx)[slug].title} | Adon ERP Industries`,
    description: pages(tx)[slug].description,
    alternates: await getLocaleAlternates(routeFor(slug)),
  };
}
function evidence(slug: IndustrialSlug, tx: TFn): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "textile") {
    const fabric = fabricLength(1000, defaultLosses);
    return {
      stats: [
        [tx("industrial.page.exampleIncomingLength"), "1,000 m"],
        [tx("industrial.page.calculatedFinalLength"), `${num(fabric.finished, 3)} m`],
        [tx("industrial.page.exampleRetainedShare"), `${fabric.retainedPercent.toFixed(2)}%`],
      ],
      columns: [
        tx("industrial.page.fictionalStage"),
        tx("industrial.page.enteredLoss"),
        tx("industrial.page.removedLengthM"),
        tx("industrial.page.remainingLengthM"),
      ],
      rows: textileStages(tx).map((stage, i) => [
        stage,
        `${fabric.stages[i].percent}%`,
        num(fabric.stages[i].loss, 3),
        num(fabric.stages[i].after, 3),
      ]),
    };
  }
  if (slug === "metal") {
    const cut = barPattern(6000, 1200, 3, 12);
    return {
      stats: [
        [tx("industrial.page.exampleStockLength"), tx("industrial.page.n6000Mm")],
        [tx("industrial.page.requestedPieces"), "12"],
        [tx("industrial.page.calculatedBars"), num(cut.bars)],
      ],
      columns: [
        tx("industrial.page.groupedExamplePattern"),
        tx("industrial.page.numberOfBars"),
        tx("industrial.page.piecesBar"),
        tx("industrial.page.remainingLengthBar"),
      ],
      rows: cut.patterns.map((pattern, i) => [
        `EX-PATTERN-0${i + 1}`,
        pattern.bars,
        pattern.pieces,
        `${num(pattern.remaining)} mm`,
      ]),
    };
  }
  const kits = componentKits(24, components);
  return {
    stats: [
      [tx("industrial.page.exampleRequestedChairs"), "24"],
      [tx("industrial.page.componentOnlyKitEquivalents"), num(kits.available)],
      [tx("industrial.page.requestedKitShortfall"), num(kits.short)],
    ],
    columns: [
      tx("industrial.page.fictionalComponent"),
      tx("industrial.page.piecesChair"),
      tx("industrial.page.exampleStockPcs"),
      tx("industrial.page.requiredPcs"),
      tx("industrial.page.shortPcs"),
    ],
    rows: components.map((row, i) => [
      row.name,
      row.perUnit,
      row.stock,
      kits.lines[i].required,
      kits.lines[i].short,
    ]),
  };
}
function ConceptCanvas({ slug }: { slug: IndustrialSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const data = evidence(slug, tx);
  return (
    <div className={base.previewCanvas}>
      <header>
        <b>
          {tx("industrial.page.eden")}<span>{tx("industrial.page.erp")}</span>
        </b>
        <span>
          {pages(tx)[slug].category} / {pages(tx)[slug].title}
        </span>
        <Badge>{tx("industrial.page.conceptCanvasFictionalRecords")}</Badge>
      </header>
      <h3>{pages(tx)[slug].demoTitle}</h3>
      <dl className={base.previewStats}>
        {data.stats.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </dl>
      <div
        className={base.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={`${pages(tx)[slug].title} fictional records, scroll horizontally`}
      >
        <table>
          <caption className={base.srOnly}>
            {tx("industrial.page.staticIllustrativeRecordsBasedOnThe")}
          </caption>
          <thead>
            <tr>
              {data.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>
        {tx("industrial.page.staticConceptCanvasEveryIdentifierLength")}
      </Note>
    </div>
  );
}
export function IndustrialIndustryPage({ slug }: { slug: IndustrialSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug];
  return (
    <main
      className={`${base.professional} ${css.industrial}`}
      lang="en"
      dir="ltr"
      data-industrial-industry={slug}
    >
      <div className={base.wrap}>
        <nav className={base.breadcrumb} aria-label={tx("industrial.page.breadcrumb")}>
          <Link href="/">{tx("industrial.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{tx("industrial.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{p.category}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <IndustrialHero slug={slug} />
      <IndustrialWorkflow slug={slug} />
      <IndustrialWorkspace slug={slug} />
      <section className={base.modulesSection}>
        <div className={base.wrap}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>{tx("industrial.page.followTheDetailIntoTheProduct")}</p>
            <h2>{tx("industrial.page.theSupportingManufacturingConversation")}</h2>
            <p>
              {tx("industrial.page.exploreExistingErpPresentationsForThe")}
            </p>
          </div>
          <div className={base.moduleGrid}>
            {p.tools.map((t, i) => (
              <Link key={t.href} href={t.href}>
                <span>0{i + 1}{" "}{tx("industrial.page.productPreview")}</span>
                <h3>
                  {t.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{t.body}</p>
                <small>{tx("industrial.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={base.previewSection}>
        <div className={base.wrap}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>{tx("industrial.page.aCloserLookAtTheExperience")}</p>
            <h2>{tx("industrial.page.theRecordBehindTheMaking")}</h2>
            <p>
              {tx("industrial.page.illustrativeRecordsWithAFullProduct")}
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description={tx("industrial.page.bringYourMaterialProcessComponentAnd")}
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={base.faqSection}>
        <div className={`${base.wrap} ${base.faqLayout}`}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>{tx("industrial.page.aFewUsefulDetails")}</p>
            <h2>{tx("industrial.page.understandTheExample")}</h2>
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
            <p className={base.eyebrow}>{tx("industrial.page.connectedIndustryPerspectives")}</p>
            <h2>{tx("industrial.page.aDifferentProcessItsOwnStory")}</h2>
          </div>
          <div className={base.relatedGrid}>
            {p.related.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={base.closing}>
        <div className={base.wrap}>
          <div>
            <p className={base.eyebrow}>
              {tx("industrial.page.yourProductionYourWayOfWorking")}
            </p>
            <h2>{tx("industrial.page.letSBringYourManufacturingDetails")}</h2>
            <p>
              {tx("industrial.page.discussYourMaterialProcessAndAssembly")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
