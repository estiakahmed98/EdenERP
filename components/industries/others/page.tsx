import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  basketTotals,
  formatDuration,
  programmeBudget,
  programmeRundown,
} from "./calculations";
import {
  initialBasket,
  money,
  otherIndustries,
  pages,
  products,
  programmeLines,
  segments,
  type OtherIndustry,
} from "./data";
import OtherIndustryHero from "./heroes";
import OtherIndustryDemo, { IndustryStory } from "./workspaces";
import { Badge, Metric, css } from "./ui";
export async function otherIndustryMetadata(slug: OtherIndustry): Promise<Metadata> {
  return {
    title: `${pages[slug].title} | Industries`,
    description: pages[slug].description,
    alternates: await getLocaleAlternates(`/industries/${slug}`),
  };
}
function ProductCanvas({ slug }: { slug: OtherIndustry }) {
  const basket = basketTotals(
    products
      .filter((row) => initialBasket[row.id])
      .map((row) => ({ ...row, qty: initialBasket[row.id] })),
    80,
    0,
  );
  const budget = programmeBudget(
    100000,
    programmeLines.map((row) => row.amount),
  );
  const rundown = programmeRundown("19:00", 30, segments);
  const columns =
    slug === "ecommerce"
      ? ["Example product", "Reference", "Quantity", "Unit price"]
      : slug === "ngo"
        ? [
            "Example planning line",
            "Reference",
            "Planning amount",
            "Record context",
          ]
        : ["Example segment", "Duration", "Starts", "Ends"];
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
        <h3>
          {slug === "ecommerce"
            ? "The basket and business context"
            : slug === "ngo"
              ? "The programme-planning conversation"
              : "The programme rundown, in view"}
        </h3>
        <dl className={css.canvasMetrics}>
          {slug === "ecommerce" ? (
            <>
              <Metric
                label="Example item subtotal"
                value={money(basket.subtotal)}
              />
              <Metric label="Example delivery" value={money(basket.delivery)} />
              <Metric
                label="Example total · tax not calculated"
                value={money(basket.total)}
              />
            </>
          ) : slug === "ngo" ? (
            <>
              <Metric label="Example planning budget" value={money(100000)} />
              <Metric
                label="Assigned in example"
                value={money(budget.assigned)}
              />
              <Metric
                label="Unassigned in example"
                value={money(budget.remaining)}
              />
            </>
          ) : (
            <>
              <Metric label="Example start" value="19:00:00" />
              <Metric
                label="Example duration"
                value={formatDuration(rundown.total)}
              />
              <Metric
                label="Below example target"
                value={formatDuration(rundown.remaining)}
              />
            </>
          )}
        </dl>
        <div
          className={css.tableScroll}
          tabIndex={0}
          role="region"
          aria-label={`${pages[slug].title} illustrative table, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages[slug].title} static illustrative records based on the
              initial example
            </caption>
            <thead>
              <tr>
                {columns.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slug === "ecommerce"
                ? products
                    .filter((row) => initialBasket[row.id])
                    .map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.id}</td>
                        <td>{initialBasket[row.id]}</td>
                        <td>{money(row.price)}</td>
                      </tr>
                    ))
                : slug === "ngo"
                  ? programmeLines.map((row) => (
                      <tr key={row.id}>
                        <td>{row.label}</td>
                        <td>EX-PLAN / {row.id}</td>
                        <td>{money(row.amount)}</td>
                        <td>Local planning example · not spent</td>
                      </tr>
                    ))
                  : segments.map((row) => {
                      const timing = rundown.timings.find(
                        (item) => item.id === row.id,
                      )!;
                      return (
                        <tr key={row.id}>
                          <td>{row.title}</td>
                          <td>{row.duration}</td>
                          <td>{timing.start.time}</td>
                          <td>{timing.end.time}</td>
                        </tr>
                      );
                    })}
            </tbody>
          </table>
        </div>
        <p className={css.canvasNote}>
          Static concept canvas, separate from the editable local example above.
          No shop order, donor or beneficiary record, expenditure approval,
          media playback or transmission is created.
        </p>
      </div>
    </div>
  );
}
export function OtherIndustryPage({ slug }: { slug: OtherIndustry }) {
  const p = pages[slug];
  return (
    <main
      lang="en"
      dir="ltr"
      className={css.industry}
      data-other-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/"> Adon ERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Others</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <OtherIndustryHero slug={slug} />
      <IndustryStory slug={slug} />
      <OtherIndustryDemo slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>THE SUPPORTING PRODUCT CONVERSATION</p>
              <h2>Explore the relevant business records.</h2>
              <p>
                Browse existing product presentations, then discuss the workflow
                and configuration your organisation needs.
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
              <p className={css.eyebrow}>SEE THE DETAIL AND THE CONTEXT</p>
              <h2>A closer look at the experience.</h2>
              <p>
                Illustrative records with a guided product conversation
                available through the shared advisor button.
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description="Bring your operational questions to an advisor and explore the complete product context in a guided conversation."
          >
            <ProductCanvas slug={slug} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>A FEW USEFUL DETAILS</p>
            <h2>Know what you’re exploring.</h2>
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
                DIFFERENT INDUSTRIES. A SHARED BUSINESS FOUNDATION.
              </p>
              <h2>Explore another operational story.</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {otherIndustries
              .filter((item) => item !== slug)
              .map((item) => (
                <Link href={`/industries/${item}`} key={item}>
                  <span>INDUSTRY / {pages[item].title.toUpperCase()}</span>
                  <h3>
                    {pages[item].headline} {pages[item].accent}
                    <ArrowRight size={18} aria-hidden="true" />
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>YOUR ORGANISATION. YOUR WORKFLOW.</p>
            <h2>Let’s begin with the way you work.</h2>
            <p>
              Bring your records, planning and operational questions to an
              advisor conversation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
