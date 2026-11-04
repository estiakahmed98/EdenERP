import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import { riceMassBalance, steelWeight } from "./calculations";
import {
  kg,
  pages,
  riceExample,
  steelExample,
  type IndustrySlug,
} from "./data";
import IndustryHero from "./heroes";
import IndustryWorkspace, { ProcessStory } from "./workspaces";
import { Badge, Metric, css } from "./ui";
export function manufacturingIndustryMetadata(slug: IndustrySlug): Metadata {
  return {
    title: `${pages[slug].title} | Manufacturing Industries | EdenERP`,
    description: pages[slug].description,
    alternates: getLocaleAlternates(`/industries/${slug}`),
  };
}
function ProductCanvas({ slug }: { slug: IndustrySlug }) {
  const steel = steelWeight(
    steelExample.gross,
    steelExample.tare,
    steelExample.orders.map((row) => row.weight),
  );
  const rice = riceMassBalance(riceExample.input, riceExample);
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>/ {pages[slug].title} / Illustrative quantity canvas</span>
        <Badge>Example records · not live ERP data</Badge>
      </header>
      <div className={css.canvasBody}>
        <div className={css.canvasHeading}>
          <h3>
            {slug === "steel"
              ? "Material, weight and order context"
              : "Input lot and recorded output context"}
          </h3>
          <span>
            {slug === "steel" ? steelExample.reference : riceExample.reference}
          </span>
        </div>
        <dl className={css.canvasMetrics}>
          {slug === "steel" ? (
            <>
              <Metric label="Example net weight" value={kg(steel.net)} />
              <Metric
                label="Example allocated weight"
                value={kg(steel.allocated)}
              />
              <Metric
                label="Example unallocated weight"
                value={kg(steel.remaining)}
              />
            </>
          ) : (
            <>
              <Metric
                label="Example paddy input"
                value={kg(riceExample.input)}
              />
              <Metric
                label="Example recorded outputs"
                value={kg(rice.recorded)}
              />
              <Metric
                label="Example unassigned weight"
                value={kg(rice.unassigned)}
              />
            </>
          )}
        </dl>
        <div
          className={css.tableScroll}
          role="region"
          tabIndex={0}
          aria-label={`${pages[slug].title} example table, scroll horizontally`}
        >
          <table>
            <caption className={css.srOnly}>
              {pages[slug].title} illustrative records, no ERP transactions
            </caption>
            <thead>
              <tr>
                {(slug === "steel"
                  ? [
                      "Example order",
                      "Material reference",
                      "Allocated weight",
                      "Record context",
                    ]
                  : [
                      "Example output",
                      "Input lot",
                      "Recorded weight",
                      "Record context",
                    ]
                ).map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slug === "steel"
                ? steelExample.orders.map((row) => (
                    <tr key={row.reference}>
                      <td>{row.reference}</td>
                      <td>{steelExample.reference}</td>
                      <td>{kg(row.weight)}</td>
                      <td>Local illustration · not reserved</td>
                    </tr>
                  ))
                : (
                    [
                      ["Head rice", riceExample.headRice],
                      ["Broken rice", riceExample.brokenRice],
                      ["Bran", riceExample.bran],
                      ["Husk", riceExample.husk],
                    ] as const
                  ).map(([label, weight]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{riceExample.reference}</td>
                      <td>{kg(weight)}</td>
                      <td>Local illustration · not posted</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <p className={css.canvasNote}>
          Static concept canvas based on the initial example. Editable inputs
          above have separate local state. This is not a live weighment,
          physical cutting plan, quality decision or production record.
        </p>
      </div>
    </div>
  );
}
export function ManufacturingIndustryPage({ slug }: { slug: IndustrySlug }) {
  const p = pages[slug];
  const other = slug === "steel" ? "agro-rice" : "steel";
  return (
    <main
      className={css.industry}
      lang="en"
      dir="ltr"
      data-production-industry={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Manufacturing</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <IndustryHero slug={slug} />
      <ProcessStory slug={slug} />
      <IndustryWorkspace slug={slug} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>BRING THE SUPPORTING WORK INTO VIEW</p>
              <h2>Explore the relevant product previews.</h2>
              <p>
                Start with the existing ERP presentations, then discuss the
                requirements of your own operation in a guided demo.
              </p>
            </div>
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
                <span>0{i + 1} / PRODUCT PRESENTATION</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>Explore the preview</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>SEE THE QUANTITY AND THE CONTEXT</p>
              <h2>A closer look at the workspace.</h2>
              <p>
                Illustrative records, with the full workflow available as an
                advisor conversation.
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} workflow`}
            description="Explore your intake, production and inventory questions with an advisor in a guided product conversation."
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
            <Link href={`/industries/${other}`} className={css.otherIndustry}>
              Explore {pages[other].title}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
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
      <section className={css.closing}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>YOUR OPERATION. YOUR PROCESS.</p>
            <h2>Bring your production story to the conversation.</h2>
            <p>
              Discuss your material, weight, quality and inventory workflows
              with an advisor.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
