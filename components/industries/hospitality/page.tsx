import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  cartonLoad,
  hotelSnapshot,
  seatFit,
  stayEstimate,
  ticketCounts,
} from "./calculations";
import {
  arrivalDate,
  dateLabel,
  departureDate,
  drinks,
  hospitalitySlugs,
  money,
  num,
  pages,
  roomLabels,
  rooms,
  tables,
  ticketLabels,
  tickets,
  type HospitalitySlug,
} from "./data";
import HospitalityHero from "./heroes";
import HospitalityWorkspace, { HospitalityStory } from "./workspaces";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type TFn } from "@/lib/i18n/t-types";
export async function hospitalityMetadata(
  slug: HospitalitySlug,
): Promise<Metadata> {
  const tx = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(tx)[slug].title} | Food & Hospitality | Adon ERP`,
    description: pages(tx)[slug].description,
    alternates: await getLocaleAlternates(
      `/industries/food&hospitality/${slug}`,
    ),
  };
}
function evidence(slug: HospitalitySlug, tx: TFn): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "restaurant") {
    const fit = seatFit(4, 4);
    return {
      stats: [
        [tx("hospitality.page.exampleTable"), "T02"],
        [tx("hospitality.page.enteredPartySize"), tx("hospitality.page.n4People")],
        [tx("hospitality.page.exampleSpareSeats"), num(fit.spare)],
      ],
      columns: [
        tx("hospitality.page.fictionalTable"),
        tx("hospitality.page.exampleSeats"),
        tx("hospitality.page.fictionalState"),
        tx("hospitality.page.recordContext"),
      ],
      rows: tables.map((t) => [
        t.id,
        t.seats,
        t.state,
        tx("hospitality.page.conceptOnlyNoReservation"),
      ]),
    };
  }
  if (slug === "fast-food") {
    const counts = ticketCounts(tickets(tx).map((t) => t.stage));
    return {
      stats: [
        [tx("hospitality.page.exampleQueued"), num(counts.queued)],
        [tx("hospitality.page.examplePreparing"), num(counts.preparing)],
        [tx("hospitality.page.exampleReady"), num(counts.ready)],
      ],
      columns: [
        tx("hospitality.page.fictionalTicket"),
        tx("hospitality.page.exampleItems"),
        tx("hospitality.page.initialStage"),
        tx("hospitality.page.recordContext"),
      ],
      rows: tickets(tx).map((t) => [
        t.id,
        t.items.join(" · "),
        ticketLabels(tx)[t.stage],
        tx("hospitality.page.staticConceptNotAKitchenFeed"),
      ]),
    };
  }
  if (slug === "guest-house") {
    const stay = stayEstimate(arrivalDate, departureDate, 4000);
    return {
      stats: [
        [tx("hospitality.page.exampleNights"), num(stay.nights)],
        [tx("hospitality.page.enteredRateNight"), money(stay.nightly)],
        [tx("hospitality.page.exampleRoomCharge"), money(stay.total)],
      ],
      columns: [
        tx("hospitality.page.fictionalStay"),
        tx("hospitality.page.exampleArrival"),
        tx("hospitality.page.exampleDeparture"),
        tx("hospitality.page.recordContext"),
      ],
      rows: [
        [
          "EX-STAY-01",
          dateLabel(arrivalDate),
          dateLabel(departureDate),
          tx("hospitality.page.localEstimateNoBooking"),
        ],
      ],
    };
  }
  if (slug === "beverage-distributor") {
    const load = cartonLoad(drinks, 600);
    return {
      stats: [
        [tx("hospitality.page.exampleCartons"), num(load.cartons)],
        [tx("hospitality.page.individualUnits"), num(load.units)],
        [tx("hospitality.page.enteredCountLimit"), tx("hospitality.page.n600Units")],
      ],
      columns: [
        tx("hospitality.page.fictionalBeverage"),
        tx("hospitality.page.exampleCartons"),
        tx("hospitality.page.unitsCarton"),
        tx("hospitality.page.calculatedUnits"),
      ],
      rows: drinks.map((d, i) => [d.name, d.cartons, d.units, load.lines[i]]),
    };
  }
  const snapshot = hotelSnapshot(rooms);
  return {
    stats: [
      [tx("hospitality.page.fictionalOccupiedRooms"), num(snapshot.occupied)],
      [tx("hospitality.page.declaredDenominator"), num(snapshot.denominator)],
      [tx("hospitality.page.illustrativeOccupancy"), `${snapshot.occupancy?.toFixed(1)}%`],
    ],
    columns: [
      tx("hospitality.page.fictionalRoom"),
      tx("hospitality.page.exampleFloor"),
      tx("hospitality.page.initialState"),
      tx("hospitality.page.illustrativeDailyRate"),
    ],
    rows: rooms.map((r) => [r.id, r.floor, roomLabels(tx)[r.state], money(r.rate)]),
  };
}
function ConceptCanvas({ slug }: { slug: HospitalitySlug }) {
  const tx = useTranslations("pages.industriesApp");
  const data = evidence(slug, tx);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          {tx("hospitality.page.eden")}<span>{tx("hospitality.page.erp")}</span>
        </b>
        <span>{tx("hospitality.page.foodHospitality")}{" "}{pages(tx)[slug].title}</span>
        <Badge>{tx("hospitality.page.conceptCanvasFictionalRecords")}</Badge>
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
            {tx("hospitality.page.staticIllustrativeRecordsBasedOnThe")}
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
        {tx("hospitality.page.staticConceptCanvasAllIdentifiersStates")}
      </Note>
    </div>
  );
}
export function HospitalityIndustryPage({ slug }: { slug: HospitalitySlug }) {
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug];
  return (
    <main
      className={css.hospitality}
      lang="en"
      dir="ltr"
      data-hospitality-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={tx("hospitality.page.breadcrumb")}>
          <Link href="/">{tx("hospitality.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{tx("hospitality.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{tx("hospitality.page.foodHospitality2")}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <HospitalityHero slug={slug} />
      <HospitalityStory slug={slug} />
      <HospitalityWorkspace slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("hospitality.page.followTheDetailIntoTheProduct")}</p>
            <h2>{tx("hospitality.page.theSupportingProductConversation")}</h2>
            <p>
              {tx("hospitality.page.exploreExistingErpPresentationsForThe")}
            </p>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((t, i) => (
              <Link key={t.href} href={t.href}>
                <span>0{i + 1}{" "}{tx("hospitality.page.productPreview")}</span>
                <h3>
                  {t.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{t.body}</p>
                <small>{tx("hospitality.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("hospitality.page.aCloserLookAtTheExperience")}</p>
            <h2>{tx("hospitality.page.theRecordBehindTheWelcome")}</h2>
            <p>
              {tx("hospitality.page.illustrativeRecordsWithAFullProduct")}
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description={tx("hospitality.page.bringYourServiceGuestStockOr")}
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={`${css.wrap} ${css.faqLayout}`}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("hospitality.page.aFewUsefulDetails")}</p>
            <h2>{tx("hospitality.page.understandTheExample")}</h2>
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
            <p className={css.eyebrow}>{tx("hospitality.page.moreFoodHospitalityPerspectives")}</p>
            <h2>{tx("hospitality.page.aDifferentOperationItsOwnStory")}</h2>
          </div>
          <div className={css.relatedGrid}>
            {hospitalitySlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <Link key={s} href={`/industries/food&hospitality/${s}`}>
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
            <p className={css.eyebrow}>{tx("hospitality.page.yourOperationYourWayOfWorking")}</p>
            <h2>{tx("hospitality.page.letSBringYourServiceDetails")}</h2>
            <p>
              {tx("hospitality.page.shareYourDiningRoomCounterProperty")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
