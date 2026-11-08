import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  basketTotal,
  batchDates,
  furnitureTotal,
  giftBudget,
  purchasePacks,
  variantComparison,
} from "./calculations";
import {
  batches,
  books,
  dateLabel,
  furniture,
  money,
  num,
  pages,
  referenceDate,
  retailSlugs,
  toys,
  type RetailSlug,
} from "./data";
import RetailHero from "./heroes";
import RetailWorkspace, { RetailStory } from "./workspaces";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type TFn } from "@/lib/i18n/t-types";
export async function retailMetadata(slug: RetailSlug): Promise<Metadata> {
  const tx = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(tx)[slug].title} | Retail Industries | Adon ERP`,
    description: pages(tx)[slug].description,
    alternates: await getLocaleAlternates(`/industries/retail/${slug}`),
  };
}
function evidence(slug: RetailSlug, tx: TFn): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "book-store") {
    const quantity = [1, 0, 1],
      total = basketTotal(
        books(tx).map((b, i) => ({ price: b.price, quantity: quantity[i] })),
      );
    return {
      stats: [
        [tx("retail.page.fictionalTitles"), "3"],
        [tx("retail.page.selectedExampleBooks"), "2"],
        [tx("retail.page.exampleBasket"), money(total)],
      ],
      columns: [
        tx("retail.page.exampleTitle"),
        tx("retail.page.identifier"),
        tx("retail.page.illustrativePrice"),
        tx("retail.page.selectedQuantity"),
      ],
      rows: books(tx).map((b, i) => [b.name, b.id, money(b.price), quantity[i]]),
    };
  }
  if (slug === "clothing-store") {
    const result = variantComparison(12, 3);
    return {
      stats: [
        [tx("retail.page.selectedExampleVariant"), tx("retail.page.navyM")],
        [tx("retail.page.fictionalStock"), tx("retail.page.n12Pieces")],
        [tx("retail.page.requestedPieces"), "3"],
      ],
      columns: [
        tx("retail.page.conceptStyle"),
        tx("retail.page.variantIdentifier"),
        tx("retail.page.exampleRequest"),
        tx("retail.page.fictionalStockAfterRequest"),
      ],
      rows: [
        [tx("retail.page.everydayOvershirt"), "EX-CL-NAVY-M", 3, result.remaining],
        [
          tx("retail.page.reservationState"),
          tx("retail.page.noReservationCreated"),
          tx("retail.page.localComparisonOnly"),
          tx("retail.page.noStockChange"),
        ],
      ],
    };
  }
  if (slug === "furniture-store") {
    const result = furnitureTotal(
      furniture.map((f) => ({ price: f.price, quantity: 1 })),
      0,
      1000,
    );
    return {
      stats: [
        [tx("retail.page.exampleSelectedPieces"), num(result.pieces)],
        [tx("retail.page.illustrativeFinish"), tx("retail.page.natural")],
        [tx("retail.page.localEstimate"), money(result.total)],
      ],
      columns: [
        tx("retail.page.conceptFurniture"),
        tx("retail.page.illustrativeBasePrice"),
        tx("retail.page.exampleQuantity"),
        tx("retail.page.finishExtraPiece"),
      ],
      rows: furniture.map((f) => [f.name, money(f.price), 1, money(0)]),
    };
  }
  if (slug === "grocery-store") {
    const result = batchDates(referenceDate, 3, batches);
    return {
      stats: [
        [tx("retail.page.exampleReference"), dateLabel(referenceDate)],
        [tx("retail.page.fictionalBatches"), "4"],
        [tx("retail.page.exampleWindow"), tx("retail.page.n3CalendarDays")],
      ],
      columns: [
        tx("retail.page.fictionalItem"),
        tx("retail.page.exampleBatch"),
        tx("retail.page.recordedDate"),
        tx("retail.page.daysFromReference"),
      ],
      rows: batches.map((b, i) => [
        b.name,
        b.id,
        dateLabel(b.date),
        `${result[i].days > 0 ? "+" : ""}${result[i].days}`,
      ]),
    };
  }
  if (slug === "hardware-store") {
    const result = purchasePacks(240, 65, 50);
    return {
      stats: [
        [tx("retail.page.exampleTarget"), tx("retail.page.n240Units")],
        [tx("retail.page.enteredPackSize"), tx("retail.page.n50Units")],
        [tx("retail.page.calculatedPacks"), num(result.packs)],
      ],
      columns: [
        tx("retail.page.fictionalItem"),
        tx("retail.page.exampleOnHand"),
        tx("retail.page.incomingUnits"),
        tx("retail.page.unitsBeyondTarget"),
      ],
      rows: [
        [tx("retail.page.exH01ConceptFixing"), 65, result.incoming, result.remaining],
        [
          tx("retail.page.purchaseState"),
          tx("retail.page.noSupplierSelected"),
          tx("retail.page.noOrderCreated"),
          tx("retail.page.localCalculationOnly"),
        ],
      ],
    };
  }
  const selection = [1, 0, 1],
    result = giftBudget(
      toys(tx).map((t, i) => ({ price: t.price, quantity: selection[i] })),
      0,
      2000,
    );
  return {
    stats: [
      [tx("retail.page.exampleBudget"), money(2000)],
      [tx("retail.page.selectedToyTotal"), money(result.total)],
      [tx("retail.page.budgetRemaining"), money(result.remaining)],
    ],
    columns: [
      tx("retail.page.fictionalToy"),
      tx("retail.page.identifier"),
      tx("retail.page.illustrativePrice"),
      tx("retail.page.exampleQuantity"),
    ],
    rows: toys(tx).map((t, i) => [t.name, t.id, money(t.price), selection[i]]),
  };
}
function ConceptCanvas({ slug }: { slug: RetailSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const data = evidence(slug, tx);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          {tx("retail.page.eden")}<span>{tx("retail.page.erp")}</span>
        </b>
        <span>{tx("retail.page.retail")}{" "}{pages(tx)[slug].title}</span>
        <Badge>{tx("retail.page.conceptCanvasFictionalRecords")}</Badge>
      </header>
      <h3>{pages(tx)[slug].demoTitle}</h3>
      <dl className={css.previewStats}>
        {data.stats.map(([label, amount]) => (
          <Metric key={label} label={label} value={amount} />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={`${pages(tx)[slug].title} fictional example records, scroll horizontally`}
      >
        <table>
          <caption className={css.srOnly}>
            {tx("retail.page.staticIllustrativeRecordsBasedOnThis")}
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
        {tx("retail.page.thisIsAStaticConceptCanvas")}
      </Note>
    </div>
  );
}
export function RetailIndustryPage({ slug }: { slug: RetailSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug];
  return (
    <main
      className={css.retail}
      lang="en"
      dir="ltr"
      data-retail-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={tx("retail.page.breadcrumb")}>
          <Link href="/">{tx("retail.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{tx("retail.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{tx("retail.page.retail2")}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <RetailHero slug={slug} />
      <RetailStory slug={slug} />
      <RetailWorkspace slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("retail.page.theRetailProductConversation")}</p>
            <h2>{tx("retail.page.followTheDetailIntoTheProduct")}</h2>
            <p>
              {tx("retail.page.exploreTheExistingErpPresentationsFor")}
            </p>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((t, i) => (
              <Link key={t.href} href={t.href}>
                <span>0{i + 1}{" "}{tx("retail.page.productPreview")}</span>
                <h3>
                  {t.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{t.body}</p>
                <small>{tx("retail.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("retail.page.aCloserLookAtTheExperience")}</p>
            <h2>{tx("retail.page.theRecordBehindTheRetailStory")}</h2>
            <p>
              {tx("retail.page.illustrativeRecordsWithTheCompleteWorkfl")}
            </p>
          </div>
          <DemoPreview
            title={`${p.title} retail experience`}
            description={tx("retail.page.bringYourCatalogueCheckoutAndStock")}
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={`${css.wrap} ${css.faqLayout}`}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("retail.page.aFewUsefulDetails")}</p>
            <h2>{tx("retail.page.understandTheExample")}</h2>
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
            <p className={css.eyebrow}>{tx("retail.page.otherRetailPerspectives")}</p>
            <h2>{tx("retail.page.aDifferentShopItsOwnStory")}</h2>
          </div>
          <div className={css.relatedGrid}>
            {retailSlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <Link key={s} href={`/industries/retail/${s}`}>
                  {pages(tx)[s].title}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{tx("retail.page.yourStoreYourWayOfWorking")}</p>
            <h2>{tx("retail.page.letSBringYourRetailDetails")}</h2>
            <p>
              {tx("retail.page.shareYourCatalogueOutletAndCounter")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
