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
export async function retailMetadata(slug: RetailSlug): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Retail Industries | Adon ERP`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(`/industries/retail/${slug}`),
  };
}
function evidence(slug: RetailSlug): {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
} {
  if (slug === "book-store") {
    const quantity = [1, 0, 1],
      total = basketTotal(
        books.map((b, i) => ({ price: b.price, quantity: quantity[i] })),
      );
    return {
      stats: [
        ["Fictional titles", "3"],
        ["Selected example books", "2"],
        ["Example basket", money(total)],
      ],
      columns: [
        "Example title",
        "Identifier",
        "Illustrative price",
        "Selected quantity",
      ],
      rows: books.map((b, i) => [b.name, b.id, money(b.price), quantity[i]]),
    };
  }
  if (slug === "clothing-store") {
    const result = variantComparison(12, 3);
    return {
      stats: [
        ["Selected example variant", "Navy / M"],
        ["Fictional stock", "12 pieces"],
        ["Requested pieces", "3"],
      ],
      columns: [
        "Concept style",
        "Variant identifier",
        "Example request",
        "Fictional stock after request",
      ],
      rows: [
        ["Everyday overshirt", "EX-CL-NAVY-M", 3, result.remaining],
        [
          "Reservation state",
          "No reservation created",
          "Local comparison only",
          "No stock change",
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
        ["Example selected pieces", num(result.pieces)],
        ["Illustrative finish", "Natural"],
        ["Local estimate", money(result.total)],
      ],
      columns: [
        "Concept furniture",
        "Illustrative base price",
        "Example quantity",
        "Finish extra / piece",
      ],
      rows: furniture.map((f) => [f.name, money(f.price), 1, money(0)]),
    };
  }
  if (slug === "grocery-store") {
    const result = batchDates(referenceDate, 3, batches);
    return {
      stats: [
        ["Example reference", dateLabel(referenceDate)],
        ["Fictional batches", "4"],
        ["Example window", "3 calendar days"],
      ],
      columns: [
        "Fictional item",
        "Example batch",
        "Recorded date",
        "Days from reference",
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
        ["Example target", "240 units"],
        ["Entered pack size", "50 units"],
        ["Calculated packs", num(result.packs)],
      ],
      columns: [
        "Fictional item",
        "Example on hand",
        "Incoming units",
        "Units beyond target",
      ],
      rows: [
        ["EX-H01 / Concept fixing", 65, result.incoming, result.remaining],
        [
          "Purchase state",
          "No supplier selected",
          "No order created",
          "Local calculation only",
        ],
      ],
    };
  }
  const selection = [1, 0, 1],
    result = giftBudget(
      toys.map((t, i) => ({ price: t.price, quantity: selection[i] })),
      0,
      2000,
    );
  return {
    stats: [
      ["Example budget", money(2000)],
      ["Selected toy total", money(result.total)],
      ["Budget remaining", money(result.remaining)],
    ],
    columns: [
      "Fictional toy",
      "Identifier",
      "Illustrative price",
      "Example quantity",
    ],
    rows: toys.map((t, i) => [t.name, t.id, money(t.price), selection[i]]),
  };
}
function ConceptCanvas({ slug }: { slug: RetailSlug }) {
  const data = evidence(slug);
  return (
    <div className={css.previewCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>Retail / {pages[slug].title}</span>
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
            Static illustrative records based on this page’s initial example,
            separate from the editable workspace
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
        This is a static concept canvas. All identifiers, amounts, quantities
        and dates are fictional; the editable local example above does not
        update this canvas or create any real transaction.
      </Note>
    </div>
  );
}
export function RetailIndustryPage({ slug }: { slug: RetailSlug }) {
  const p = pages[slug];
  return (
    <main
      className={css.retail}
      lang="en"
      dir="ltr"
      data-retail-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Adon ERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Retail</span>
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
            <p className={css.eyebrow}>THE RETAIL PRODUCT CONVERSATION</p>
            <h2>Follow the detail into the product.</h2>
            <p>
              Explore the existing ERP presentations for your store’s checkout,
              item and stock questions.
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
            <h2>The record behind the retail story.</h2>
            <p>
              Illustrative records, with the complete workflow available in a
              guided advisor conversation.
            </p>
          </div>
          <DemoPreview
            title={`${p.title} retail experience`}
            description="Bring your catalogue, checkout and stock questions to an advisor for a guided conversation about your own store."
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
            <p className={css.eyebrow}>OTHER RETAIL PERSPECTIVES</p>
            <h2>A different shop. Its own story.</h2>
          </div>
          <div className={css.relatedGrid}>
            {retailSlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <Link key={s} href={`/industries/retail/${s}`}>
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
            <p className={css.eyebrow}>YOUR STORE. YOUR WAY OF WORKING.</p>
            <h2>Let’s bring your retail details into focus.</h2>
            <p>
              Share your catalogue, outlet and counter process with an advisor.
              Explore how the product conversation fits your operation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
