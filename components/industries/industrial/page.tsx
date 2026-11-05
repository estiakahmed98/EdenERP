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
export async function industrialMetadata(
  slug: IndustrialSlug,
): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Adon ERP Industries`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(routeFor(slug)),
  };
}
function evidence(slug: IndustrialSlug): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "textile") {
    const fabric = fabricLength(1000, defaultLosses);
    return {
      stats: [
        ["Example incoming length", "1,000 m"],
        ["Calculated final length", `${num(fabric.finished, 3)} m`],
        ["Example retained share", `${fabric.retainedPercent.toFixed(2)}%`],
      ],
      columns: [
        "Fictional stage",
        "Entered loss",
        "Removed length · m",
        "Remaining length · m",
      ],
      rows: textileStages.map((stage, i) => [
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
        ["Example stock length", "6,000 mm"],
        ["Requested pieces", "12"],
        ["Calculated bars", num(cut.bars)],
      ],
      columns: [
        "Grouped example pattern",
        "Number of bars",
        "Pieces / bar",
        "Remaining length / bar",
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
      ["Example requested chairs", "24"],
      ["Component-only kit equivalents", num(kits.available)],
      ["Requested kit shortfall", num(kits.short)],
    ],
    columns: [
      "Fictional component",
      "Pieces / chair",
      "Example stock · pcs",
      "Required · pcs",
      "Short · pcs",
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
  const data = evidence(slug);
  return (
    <div className={base.previewCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>
          {pages[slug].category} / {pages[slug].title}
        </span>
        <Badge>Concept canvas · fictional records</Badge>
      </header>
      <h3>{pages[slug].demoTitle}</h3>
      <dl className={base.previewStats}>
        {data.stats.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </dl>
      <div
        className={base.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={`${pages[slug].title} fictional records, scroll horizontally`}
      >
        <table>
          <caption className={base.srOnly}>
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
        Static concept canvas. Every identifier, length, count and process
        assumption is fictional. The editable local example above does not
        update this canvas or create a production transaction.
      </Note>
    </div>
  );
}
export function IndustrialIndustryPage({ slug }: { slug: IndustrialSlug }) {
  const p = pages[slug];
  return (
    <main
      className={`${base.professional} ${css.industrial}`}
      lang="en"
      dir="ltr"
      data-industrial-industry={slug}
    >
      <div className={base.wrap}>
        <nav className={base.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Adon ERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
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
            <p className={base.eyebrow}>FOLLOW THE DETAIL INTO THE PRODUCT</p>
            <h2>The supporting manufacturing conversation.</h2>
            <p>
              Explore existing ERP presentations for the material, component,
              production and quality questions behind your operation.
            </p>
          </div>
          <div className={base.moduleGrid}>
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
      <section className={base.previewSection}>
        <div className={base.wrap}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>A CLOSER LOOK AT THE EXPERIENCE</p>
            <h2>The record behind the making.</h2>
            <p>
              Illustrative records, with a full product walkthrough available in
              a guided advisor conversation.
            </p>
          </div>
          <DemoPreview
            title={`${p.title} industry experience`}
            description="Bring your material, process, component and production questions to an advisor and explore your operation’s product context."
          >
            <ConceptCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={base.faqSection}>
        <div className={`${base.wrap} ${base.faqLayout}`}>
          <div className={base.sectionHeading}>
            <p className={base.eyebrow}>A FEW USEFUL DETAILS</p>
            <h2>Understand the example.</h2>
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
            <p className={base.eyebrow}>CONNECTED INDUSTRY PERSPECTIVES</p>
            <h2>A different process. Its own story.</h2>
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
              YOUR PRODUCTION. YOUR WAY OF WORKING.
            </p>
            <h2>Let’s bring your manufacturing details into focus.</h2>
            <p>
              Discuss your material, process and assembly workflow with an
              advisor, using the questions that matter to your operation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
