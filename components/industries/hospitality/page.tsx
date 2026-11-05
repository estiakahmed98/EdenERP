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
export async function hospitalityMetadata(
  slug: HospitalitySlug,
): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Food & Hospitality | EdenERP`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(
      `/industries/food&hospitality/${slug}`,
    ),
  };
}
function evidence(slug: HospitalitySlug): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "restaurant") {
    const fit = seatFit(4, 4);
    return {
      stats: [
        ["Example table", "T02"],
        ["Entered party size", "4 people"],
        ["Example spare seats", num(fit.spare)],
      ],
      columns: [
        "Fictional table",
        "Example seats",
        "Fictional state",
        "Record context",
      ],
      rows: tables.map((t) => [
        t.id,
        t.seats,
        t.state,
        "Concept only · no reservation",
      ]),
    };
  }
  if (slug === "fast-food") {
    const counts = ticketCounts(tickets.map((t) => t.stage));
    return {
      stats: [
        ["Example queued", num(counts.queued)],
        ["Example preparing", num(counts.preparing)],
        ["Example ready", num(counts.ready)],
      ],
      columns: [
        "Fictional ticket",
        "Example items",
        "Initial stage",
        "Record context",
      ],
      rows: tickets.map((t) => [
        t.id,
        t.items.join(" · "),
        ticketLabels[t.stage],
        "Static concept · not a kitchen feed",
      ]),
    };
  }
  if (slug === "guest-house") {
    const stay = stayEstimate(arrivalDate, departureDate, 4000);
    return {
      stats: [
        ["Example nights", num(stay.nights)],
        ["Entered rate / night", money(stay.nightly)],
        ["Example room charge", money(stay.total)],
      ],
      columns: [
        "Fictional stay",
        "Example arrival",
        "Example departure",
        "Record context",
      ],
      rows: [
        [
          "EX-STAY-01",
          dateLabel(arrivalDate),
          dateLabel(departureDate),
          "Local estimate · no booking",
        ],
      ],
    };
  }
  if (slug === "beverage-distributor") {
    const load = cartonLoad(drinks, 600);
    return {
      stats: [
        ["Example cartons", num(load.cartons)],
        ["Individual units", num(load.units)],
        ["Entered count limit", "600 units"],
      ],
      columns: [
        "Fictional beverage",
        "Example cartons",
        "Units / carton",
        "Calculated units",
      ],
      rows: drinks.map((d, i) => [d.name, d.cartons, d.units, load.lines[i]]),
    };
  }
  const snapshot = hotelSnapshot(rooms);
  return {
    stats: [
      ["Fictional occupied rooms", num(snapshot.occupied)],
      ["Declared denominator", num(snapshot.denominator)],
      ["Illustrative occupancy", `${snapshot.occupancy?.toFixed(1)}%`],
    ],
    columns: [
      "Fictional room",
      "Example floor",
      "Initial state",
      "Illustrative daily rate",
    ],
    rows: rooms.map((r) => [r.id, r.floor, roomLabels[r.state], money(r.rate)]),
  };
}
function ConceptCanvas({ slug }: { slug: HospitalitySlug }) {
  const data = evidence(slug);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>Food & Hospitality / {pages[slug].title}</span>
        <Badge>Concept canvas · fictional records</Badge>
      </header>
      <h3>{pages[slug].demoTitle}</h3>
      <dl className={css.previewStats}>
        {data.stats.map(([label, amount]) => (
          <Metric key={label} label={label} value={amount} />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={`${pages[slug].title} fictional example records, scroll horizontally`}
      >
        <table>
          <caption className={css.srOnly}>
            Static illustrative records based on the initial example, separate
            from the editable workspace
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
        Static concept canvas. All identifiers, states, amounts, quantities and
        dates are fictional. The editable local exercise above does not update
        this canvas or create a real transaction.
      </Note>
    </div>
  );
}
export function HospitalityIndustryPage({ slug }: { slug: HospitalitySlug }) {
  const p = pages[slug];
  return (
    <main
      className={css.hospitality}
      lang="en"
      dir="ltr"
      data-hospitality-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Food & Hospitality</span>
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
            <p className={css.eyebrow}>FOLLOW THE DETAIL INTO THE PRODUCT</p>
            <h2>The supporting product conversation.</h2>
            <p>
              Explore existing ERP presentations for the item, service, stock
              and accounting questions behind your operation.
            </p>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((t, i) => (
              <Link key={t.href} href={t.href}>
                <span>0{i + 1} / PRODUCT PREVIEW</span>
                <h3>
                  {t.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{t.body}</p>
                <small>Explore the presentation</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>A CLOSER LOOK AT THE EXPERIENCE</p>
            <h2>The record behind the welcome.</h2>
            <p>
              Illustrative records, with a full product walkthrough available in
              a guided advisor conversation.
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description="Bring your service, guest, stock or accounting questions to an advisor and explore the product context for your own operation."
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={`${css.wrap} ${css.faqLayout}`}>
          <div className={css.sectionHeading}>
            <p className={css.eyebrow}>A FEW USEFUL DETAILS</p>
            <h2>Understand the example.</h2>
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
            <p className={css.eyebrow}>MORE FOOD & HOSPITALITY PERSPECTIVES</p>
            <h2>A different operation. Its own story.</h2>
          </div>
          <div className={css.relatedGrid}>
            {hospitalitySlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <Link key={s} href={`/industries/food&hospitality/${s}`}>
                  {pages[s].title}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>YOUR OPERATION. YOUR WAY OF WORKING.</p>
            <h2>Let’s bring your service details into focus.</h2>
            <p>
              Share your dining-room, counter, property or distribution process
              with an advisor and explore the relevant product workflows.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
