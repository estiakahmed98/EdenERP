import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  allocation,
  candidateCounts,
  checklist,
  costLines,
  evidenceCounts,
  tripEstimate,
} from "./calculations";
import {
  candidateLabels,
  candidates,
  channels,
  evidenceLabels,
  evidenceRows,
  groupLabel,
  money,
  num,
  pages,
  phases,
  professionalSlugs,
  properties,
  reviewTasks,
  routeFor,
  workItems,
  type ProfessionalSlug,
} from "./data";
import ProfessionalHero from "./heroes";
import ProfessionalWorkspace, { ProfessionalWorkflow } from "./workspaces";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type TFn } from "@/lib/i18n/t-types";
export async function professionalMetadata(
  slug: ProfessionalSlug,
): Promise<Metadata> {
  const tx = await getTranslations("pages.industriesApp");
  return {
    title: `${pages(tx)[slug].title} | ${groupLabel(pages(tx)[slug].group, tx)} Industries | Adon ERP`,
    description: pages(tx)[slug].description,
    alternates: await getLocaleAlternates(routeFor(slug, tx)),
  };
}
function evidence(slug: ProfessionalSlug, tx: TFn): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "real-estate-agency")
    return {
      stats: [
        [tx("professional.page.fictionalProperties"), "3"],
        [tx("professional.page.exampleTypes"), "3"],
        [tx("professional.page.initialPriceFilter"), money(15000000)],
      ],
      columns: [
        tx("professional.page.fictionalProperty"),
        tx("professional.page.type"),
        tx("professional.page.exampleAreaSqFt"),
        tx("professional.page.illustrativePrice"),
      ],
      rows: properties.map((p) => [p.name, p.type, p.area, money(p.price)]),
    };
  if (slug === "architecture-firm") {
    const result = costLines(
      phases.map((p) => ({ quantity: p.hours, rate: 1500 })),
    );
    return {
      stats: [
        [tx("professional.page.examplePhases"), "3"],
        [tx("professional.page.enteredFeeHour"), money(1500)],
        [tx("professional.page.localTotal"), money(result.total)],
      ],
      columns: [
        tx("professional.page.fictionalPhase"),
        tx("professional.page.wholeHours"),
        tx("professional.page.enteredHourlyFee"),
        tx("professional.page.calculatedAmount"),
      ],
      rows: phases.map((p, i) => [
        p.name,
        p.hours,
        money(1500),
        money(result.lines[i]),
      ]),
    };
  }
  if (slug === "construction") {
    const result = costLines(
      workItems.map((w) => ({ quantity: w.quantity, rate: w.rate })),
    );
    return {
      stats: [
        [tx("professional.page.fictionalWorkLines"), "3"],
        [tx("professional.page.enteredLineTotal"), money(result.total)],
        [tx("professional.page.exampleBudget"), money(300000)],
      ],
      columns: [
        tx("professional.page.illustrativeWorkItem"),
        tx("professional.page.wholeQuantity"),
        tx("professional.page.enteredUnitRate"),
        tx("professional.page.calculatedAmount"),
      ],
      rows: workItems.map((w, i) => [
        w.name,
        `${w.quantity} ${w.unit}`,
        money(w.rate),
        money(result.lines[i]),
      ]),
    };
  }
  if (slug === "accounting-firm") {
    const progress = checklist([true, false, false, false]);
    return {
      stats: [
        [tx("professional.page.fictionalTasks"), num(progress.total)],
        [tx("professional.page.manuallySelected"), num(progress.done)],
        [tx("professional.page.exampleShare"), `${progress.percent}%`],
      ],
      columns: [tx("professional.page.exampleTask"), tx("professional.page.initialSelection"), tx("professional.page.context")],
      rows: reviewTasks(tx).map((t, i) => [
        t,
        i === 0 ? tx("professional.page.selected") : tx("professional.page.unselected"),
        tx("professional.page.manualExampleOnly"),
      ]),
    };
  }
  if (slug === "marketing-agency") {
    const result = allocation(
      channels.map((c) => c.amount),
      300000,
    );
    return {
      stats: [
        [tx("professional.page.enteredBudget"), money(300000)],
        [tx("professional.page.allocated"), money(result.assigned)],
        [tx("professional.page.unallocated"), money(result.remaining)],
      ],
      columns: [
        tx("professional.page.fictionalChannel"),
        tx("professional.page.enteredAmount"),
        tx("professional.page.shareOfAllocatedAmount"),
        tx("professional.page.context"),
      ],
      rows: channels.map((c, i) => [
        c.name,
        money(c.amount),
        `${result.shares[i].toFixed(1)}%`,
        tx("professional.page.allocationOnlyNoForecast"),
      ]),
    };
  }
  if (slug === "talent-acquisition") {
    const counts = candidateCounts(candidates.map((c) => c.stage));
    return {
      stats: [
        [tx("professional.page.exampleApplied"), num(counts.applied)],
        [tx("professional.page.exampleInterview"), num(counts.interview)],
        [tx("professional.page.exampleShortlisted"), num(counts.shortlist)],
      ],
      columns: [
        tx("professional.page.anonymousFictionalId"),
        tx("professional.page.roleLabel"),
        tx("professional.page.initialExampleStage"),
        tx("professional.page.context"),
      ],
      rows: candidates.map((c) => [
        c.id,
        c.role,
        candidateLabels(tx)[c.stage],
        tx("professional.page.manualStageOnly"),
      ]),
    };
  }
  if (slug === "audit-certification") {
    const counts = evidenceCounts(evidenceRows.map((r) => r.state));
    return {
      stats: [
        [tx("professional.page.missing"), num(counts.missing)],
        [tx("professional.page.provided"), num(counts.provided)],
        [tx("professional.page.manuallyReviewed"), num(counts.reviewed)],
      ],
      columns: [
        tx("professional.page.fictionalDocument"),
        tx("professional.page.exampleIdentifier"),
        tx("professional.page.initialState"),
        tx("professional.page.context"),
      ],
      rows: evidenceRows.map((r) => [
        r.name,
        r.id,
        evidenceLabels(tx)[r.state],
        tx("professional.page.notAComplianceDecision"),
      ]),
    };
  }
  const trip = tripEstimate({
    travellers: 2,
    fare: 25000,
    rooms: 1,
    nights: 3,
    nightly: 5000,
    transfer: 3000,
  });
  return {
    stats: [
      [tx("professional.page.exampleTravellers"), "2"],
      [tx("professional.page.exampleNights"), "3"],
      [tx("professional.page.enteredTripTotal"), money(trip.total)],
    ],
    columns: [tx("professional.page.exampleService"), tx("professional.page.enteredBasis"), tx("professional.page.localAmount")],
    rows: [
      [tx("professional.page.fares"), tx("professional.page.n2TravellersBdt25000"), money(trip.fares)],
      [tx("professional.page.roomStay"), tx("professional.page.n1Room3NightsBdt5"), money(trip.stay)],
      [tx("professional.page.transfer"), tx("professional.page.enteredOnce"), money(trip.transfer)],
    ],
  };
}
function ConceptCanvas({ slug }: { slug: ProfessionalSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const data = evidence(slug, tx);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          {tx("professional.page.eden")}<span>{tx("professional.page.erp")}</span>
        </b>
        <span>
          {groupLabel(pages(tx)[slug].group, tx)} / {pages(tx)[slug].title}
        </span>
        <Badge>{tx("professional.page.conceptCanvasFictionalRecords")}</Badge>
      </header>
      <h3>{pages(tx)[slug].demoTitle}</h3>
      <dl className={css.previewStats}>
        {data.stats.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={`${pages(tx)[slug].title} fictional records, scroll horizontally`}
      >
        <table>
          <caption className={css.srOnly}>
            {tx("professional.page.staticIllustrativeRecordsBasedOnThe")}
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
        {tx("professional.page.staticConceptCanvasAllIdentifiersSelecti")}
      </Note>
    </div>
  );
}
export function ProfessionalIndustryPage({ slug }: { slug: ProfessionalSlug }) {
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug],
    related = professionalSlugs.filter(
      (s) => s !== slug && pages(tx)[s].group === p.group,
    );
  return (
    <main
      className={css.professional}
      lang="en"
      dir="ltr"
      data-professional-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={tx("professional.page.breadcrumb")}>
          <Link href="/">{tx("professional.page.adonErp")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{tx("professional.page.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{groupLabel(p.group, tx)}</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <ProfessionalHero slug={slug} />
      <ProfessionalWorkflow slug={slug} />
      <ProfessionalWorkspace slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("professional.page.followTheDetailIntoTheProduct")}</p>
            <h2>{tx("professional.page.theSupportingProductConversation")}</h2>
            <p>
              {tx("professional.page.exploreTheExistingErpPresentationsFor")}
            </p>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((t, i) => (
              <Link key={t.href} href={t.href}>
                <span>0{i + 1}{" "}{tx("professional.page.productPreview")}</span>
                <h3>
                  {t.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{t.body}</p>
                <small>{tx("professional.page.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("professional.page.aCloserLookAtTheExperience")}</p>
            <h2>{tx("professional.page.theRecordBehindTheWork")}</h2>
            <p>
              {tx("professional.page.illustrativeRecordsWithAFullProduct")}
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description={tx("professional.page.bringYourClientProjectAndOperational")}
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={`${css.wrap} ${css.faqLayout}`}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>{tx("professional.page.aFewUsefulDetails")}</p>
            <h2>{tx("professional.page.understandTheExample")}</h2>
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
            <p className={css.eyebrow}>
              {tx("professional.page.more")}{" "}{groupLabel(p.group, tx).toUpperCase()}{" "}{tx("professional.page.perspectives")}
            </p>
            <h2>{tx("professional.page.aDifferentPracticeItsOwnStory")}</h2>
          </div>
          <div className={css.relatedGrid} data-count={related.length}>
            {related.map((s) => (
              <Link key={s} href={routeFor(s, tx)}>
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
            <p className={css.eyebrow}>{tx("professional.page.yourWorkYourWayOfWorking")}</p>
            <h2>{tx("professional.page.letSBringYourOperationalDetails")}</h2>
            <p>
              {tx("professional.page.discussYourClientProjectAndService")}
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
