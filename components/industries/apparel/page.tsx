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
export async function apparelMetadata(slug: ApparelSlug): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Garments & Textile Industries | EdenERP`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(`/industries/${slug}`),
  };
}
function canvasData(slug: ApparelSlug): {
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
        ["Example order pieces", "3,000"],
        ["Example sizes", "4"],
        ["Ratio units", "1 : 2 : 2 : 1"],
      ],
      columns: [
        "Example size",
        "Ratio units",
        "Allocated pieces",
        "Record context",
      ],
      rows: sizes.map((row, i) => [
        row.label,
        row.ratio,
        num(pieces[i]),
        "Local breakdown · not a cutting plan",
      ]),
    };
  }
  if (slug === "accessories") {
    const results = trimRequirements(1000, 2.5, trims);
    return {
      stats: [
        ["Example order pieces", "1,000"],
        ["Entered extra allowance", "2.5%"],
        ["Example accessory lines", "4"],
      ],
      columns: [
        "Example item",
        "Count / garment",
        "Example stock · pcs",
        "Required · pcs",
        "Short · pcs",
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
    });
    return {
      stats: [
        ["Example trading sales", money(trade.revenue)],
        ["Example purchase cost", money(trade.cost!)],
        ["Difference before other costs", money(trade.contribution!)],
      ],
      columns: [
        "Separate model",
        "Example basis",
        "Example gross amount",
        "Meaning",
      ],
      rows: [
        [
          "Margin trading",
          "10,000 pieces × USD 8.50",
          money(trade.revenue),
          "Selling value, before purchase and other costs",
        ],
        [
          "Commission fee",
          "10,000 pieces × USD 0.35",
          money(3500),
          "Gross fees only · operating costs unknown",
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
      ["Example cutting date", dateLabel(examplePcd)],
      ["Example milestones", "4"],
      ["Calendar basis", "Calendar days"],
    ],
    columns: [
      "Example milestone",
      "Days before PCD",
      "Calculated date",
      "Record context",
    ],
    rows: milestones.map((row, i) => [
      row.name,
      row.days,
      dateLabel(dates[i]),
      "Local assumption · not a saved TNA plan",
    ]),
  };
}
function ProductCanvas({ slug }: { slug: ApparelSlug }) {
  const evidence = canvasData(slug);
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>/ {pages[slug].title} / Concept canvas</span>
        <Badge>Illustrative records · no live connection</Badge>
      </header>
      <div className={css.canvasBody}>
        <h3>{pages[slug].demoTitle}</h3>
        <dl className={css.canvasMetrics}>
          {evidence.stats.map(([label, value]) => (
            <Metric key={label} label={label} value={value} />
          ))}
        </dl>
        <div
          className={css.tableScroll}
          tabIndex={0}
          role="region"
          aria-label={`${pages[slug].title} illustrative records, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages[slug].title} static illustrative records based on the
              initial local example
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
          Static concept canvas, separate from the editable example above. All
          figures and dates are illustrative. No order, reservation, purchase
          request, invoice or TNA milestone is created.
        </p>
      </div>
    </div>
  );
}
export function ApparelIndustryPage({ slug }: { slug: ApparelSlug }) {
  const p = pages[slug];
  const related = [
    { title: "Textile", href: "/industries/manufacturing/textile" },
    ...apparelSlugs
      .filter((item) => item !== slug)
      .map((item) => ({
        title: pages[item].title,
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
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Garments & Textile</span>
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
              <p className={css.eyebrow}>THE SUPPORTING PRODUCT CONVERSATION</p>
              <h2>Follow the relevant product detail.</h2>
              <p>
                Explore existing ERP presentations, then discuss your own order,
                material and commercial process with an advisor.
              </p>
            </div>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link href={tool.href} key={tool.href}>
                <span>0{i + 1} / PRODUCT PREVIEW</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>Explore the presentation</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>SEE THE RECORD AND THE CONTEXT</p>
              <h2>A closer look at the experience.</h2>
              <p>
                Illustrative records with the complete product context available
                in a guided advisor conversation.
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description="Explore your garment, material, factory and order-follow-up questions with an advisor in a guided product conversation."
          >
            <ProductCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
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
            <div>
              <p className={css.eyebrow}>
                THE WIDER GARMENTS & TEXTILE JOURNEY
              </p>
              <h2>Explore the next part of the process.</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {related.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>INDUSTRY / EXPLORE</span>
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
            <p className={css.eyebrow}>YOUR OPERATION. YOUR WORKFLOW.</p>
            <h2>Bring your order’s story to the conversation.</h2>
            <p>
              Discuss your style, factory, material and commercial-record
              questions with an advisor.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
