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
export async function professionalMetadata(
  slug: ProfessionalSlug,
): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | ${groupLabel(pages[slug].group)} Industries | EdenERP`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(routeFor(slug)),
  };
}
function evidence(slug: ProfessionalSlug): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "real-estate-agency")
    return {
      stats: [
        ["Fictional properties", "3"],
        ["Example types", "3"],
        ["Initial price filter", money(15000000)],
      ],
      columns: [
        "Fictional property",
        "Type",
        "Example area · sq ft",
        "Illustrative price",
      ],
      rows: properties.map((p) => [p.name, p.type, p.area, money(p.price)]),
    };
  if (slug === "architecture-firm") {
    const result = costLines(
      phases.map((p) => ({ quantity: p.hours, rate: 1500 })),
    );
    return {
      stats: [
        ["Example phases", "3"],
        ["Entered fee / hour", money(1500)],
        ["Local total", money(result.total)],
      ],
      columns: [
        "Fictional phase",
        "Whole hours",
        "Entered hourly fee",
        "Calculated amount",
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
        ["Fictional work lines", "3"],
        ["Entered line total", money(result.total)],
        ["Example budget", money(300000)],
      ],
      columns: [
        "Illustrative work item",
        "Whole quantity",
        "Entered unit rate",
        "Calculated amount",
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
        ["Fictional tasks", num(progress.total)],
        ["Manually selected", num(progress.done)],
        ["Example share", `${progress.percent}%`],
      ],
      columns: ["Example task", "Initial selection", "Context"],
      rows: reviewTasks.map((t, i) => [
        t,
        i === 0 ? "Selected" : "Unselected",
        "Manual example only",
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
        ["Entered budget", money(300000)],
        ["Allocated", money(result.assigned)],
        ["Unallocated", money(result.remaining)],
      ],
      columns: [
        "Fictional channel",
        "Entered amount",
        "Share of allocated amount",
        "Context",
      ],
      rows: channels.map((c, i) => [
        c.name,
        money(c.amount),
        `${result.shares[i].toFixed(1)}%`,
        "Allocation only · no forecast",
      ]),
    };
  }
  if (slug === "talent-acquisition") {
    const counts = candidateCounts(candidates.map((c) => c.stage));
    return {
      stats: [
        ["Example applied", num(counts.applied)],
        ["Example interview", num(counts.interview)],
        ["Example shortlisted", num(counts.shortlist)],
      ],
      columns: [
        "Anonymous fictional ID",
        "Role label",
        "Initial example stage",
        "Context",
      ],
      rows: candidates.map((c) => [
        c.id,
        c.role,
        candidateLabels[c.stage],
        "Manual stage only",
      ]),
    };
  }
  if (slug === "audit-certification") {
    const counts = evidenceCounts(evidenceRows.map((r) => r.state));
    return {
      stats: [
        ["Missing", num(counts.missing)],
        ["Provided", num(counts.provided)],
        ["Manually reviewed", num(counts.reviewed)],
      ],
      columns: [
        "Fictional document",
        "Example identifier",
        "Initial state",
        "Context",
      ],
      rows: evidenceRows.map((r) => [
        r.name,
        r.id,
        evidenceLabels[r.state],
        "Not a compliance decision",
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
      ["Example travellers", "2"],
      ["Example nights", "3"],
      ["Entered trip total", money(trip.total)],
    ],
    columns: ["Example service", "Entered basis", "Local amount"],
    rows: [
      ["Fares", "2 travellers × BDT 25,000", money(trip.fares)],
      ["Room stay", "1 room × 3 nights × BDT 5,000", money(trip.stay)],
      ["Transfer", "Entered once", money(trip.transfer)],
    ],
  };
}
function ConceptCanvas({ slug }: { slug: ProfessionalSlug }) {
  const data = evidence(slug);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>
          {groupLabel(pages[slug].group)} / {pages[slug].title}
        </span>
        <Badge>Concept canvas · fictional records</Badge>
      </header>
      <h3>{pages[slug].demoTitle}</h3>
      <dl className={css.previewStats}>
        {data.stats.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={`${pages[slug].title} fictional records, scroll horizontally`}
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
        Static concept canvas. All identifiers, selections, amounts and
        quantities are fictional. The editable local example above does not
        update this canvas or create a real transaction.
      </Note>
    </div>
  );
}
export function ProfessionalIndustryPage({ slug }: { slug: ProfessionalSlug }) {
  const p = pages[slug],
    related = professionalSlugs.filter(
      (s) => s !== slug && pages[s].group === p.group,
    );
  return (
    <main
      className={css.professional}
      lang="en"
      dir="ltr"
      data-professional-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{groupLabel(p.group)}</span>
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
            <p className={css.eyebrow}>FOLLOW THE DETAIL INTO THE PRODUCT</p>
            <h2>The supporting product conversation.</h2>
            <p>
              Explore the existing ERP presentations for your project, customer,
              accounting and operational questions.
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
            <h2>The record behind the work.</h2>
            <p>
              Illustrative records, with a full product walkthrough available in
              a guided advisor conversation.
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description="Bring your client, project and operational questions to an advisor and explore the relevant product workflows."
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
            <p className={css.eyebrow}>
              MORE {groupLabel(p.group).toUpperCase()} PERSPECTIVES
            </p>
            <h2>A different practice. Its own story.</h2>
          </div>
          <div className={css.relatedGrid} data-count={related.length}>
            {related.map((s) => (
              <Link key={s} href={routeFor(s)}>
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
            <p className={css.eyebrow}>YOUR WORK. YOUR WAY OF WORKING.</p>
            <h2>Let’s bring your operational details into focus.</h2>
            <p>
              Discuss your client, project and service process with an advisor
              and explore the product context for your own operation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
