import type { Metadata } from "next";
import { ArrowRight, BookOpen, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  courses,
  educationIndustries,
  learners,
  lessons,
  pages,
  sessions,
  type EducationIndustry,
} from "./data";
import IndustryHero from "./heroes";
import IndustryDemo, { RolePerspective } from "./demos";
import { Badge, Metric, css } from "./ui";

export async function educationIndustryMetadata(
  industry: EducationIndustry,
): Promise<Metadata> {
  const p = pages[industry];
  return {
    title: `${p.title} Management | Education Industries | EdenERP`,
    description: p.description,
    alternates: await getLocaleAlternates(`/industries/${industry}`),
  };
}
function ProductCanvas({ industry }: { industry: EducationIndustry }) {
  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          Eden<span>ERP</span>
        </b>
        <span>/ {pages[industry].title} / Concept canvas</span>
        <Badge>Fictional example data</Badge>
      </header>
      <div className={css.canvasBody}>
        <h3>
          {industry === "school"
            ? "The school-day register"
            : industry === "college"
              ? "The session overview"
              : industry === "university"
                ? "The academic planning conversation"
                : "The learning outline"}
        </h3>
        <dl className={css.canvasMetrics}>
          {industry === "school" ? (
            <>
              <Metric label="Fictional learners" value="4" />
              <Metric label="Initial marks" value="3 / 4" />
              <Metric label="Register state" value="Local only" />
            </>
          ) : industry === "college" ? (
            <>
              <Metric label="Example sessions" value="3" />
              <Metric label="Rooms in example" value="2" />
              <Metric label="Planner state" value="Local only" />
            </>
          ) : industry === "university" ? (
            <>
              <Metric label="Fictional courses" value="5" />
              <Metric label="Example credit budget" value="12" />
              <Metric label="Registration" value="Not performed" />
            </>
          ) : (
            <>
              <Metric label="Sample readings" value="3" />
              <Metric label="Knowledge check" value="1 example" />
              <Metric label="Official learning records" value="None created" />
            </>
          )}
        </dl>
        <div className={css.canvasRows}>
          {industry === "school"
            ? learners.map((row, i) => (
                <div key={row.id}>
                  <span>{row.id}</span>
                  <b>{row.label}</b>
                  <small>
                    {i < 2 ? "Present" : i === 2 ? "Late" : "Unmarked"} ·
                    initial example
                  </small>
                </div>
              ))
            : industry === "college"
              ? sessions.map((row) => (
                  <div key={row.id}>
                    <span>
                      {row.day} · {row.start}
                    </span>
                    <b>{row.title}</b>
                    <small>
                      {row.room} · {row.group}
                    </small>
                  </div>
                ))
              : industry === "university"
                ? courses.map((row) => (
                    <div key={row.id}>
                      <span>{row.id}</span>
                      <b>{row.title}</b>
                      <small>{row.credits} example credits</small>
                    </div>
                  ))
                : lessons.map((row) => (
                    <div key={row.id}>
                      <span>Lesson {row.number}</span>
                      <b>{row.title}</b>
                      <small>Short reading · example content</small>
                    </div>
                  ))}
        </div>
        <p className={css.canvasNote}>
          Illustrative composition, not a screenshot of a connected institution.
          The working example above is separate from this static canvas.
        </p>
      </div>
    </div>
  );
}
export function EducationIndustryPage({
  industry,
}: {
  industry: EducationIndustry;
}) {
  const p = pages[industry];
  return (
    <main
      className={css.industry}
      lang="en"
      dir="ltr"
      data-education-industry={industry}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">EdenERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">Industries</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>Education</span>
          <ChevronRight size={11} aria-hidden="true" />
          <span aria-current="page">{p.title}</span>
        </nav>
      </div>
      <IndustryHero industry={industry} />
      <RolePerspective industry={industry} />
      <IndustryDemo industry={industry} />
      <section className={css.modulesSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>THE WIDER PRODUCT CONVERSATION</p>
              <h2>{p.toolsTitle}</h2>
              <p>
                Browse existing product presentations, then bring your
                institution’s process to a guided demo.
              </p>
            </div>
            <BookOpen size={27} className={css.moduleIcon} aria-hidden="true" />
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
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
              <p className={css.eyebrow}>SEE THE PARTS TOGETHER</p>
              <h2>A closer look at the experience.</h2>
              <p>
                Concept canvas with fictional records. Continue the conversation
                with an advisor to explore your own workflow.
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={`${p.title} experience`}
            description="Explore your institution’s records, learning context and everyday workflows in a guided product conversation."
          >
            <ProductCanvas industry={industry} />
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
              <p className={css.eyebrow}>EDUCATION, IN DIFFERENT CONTEXTS</p>
              <h2>Explore another part of the journey.</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {educationIndustries
              .filter((item) => item !== industry)
              .map((item) => (
                <Link key={item} href={`/industries/${item}`}>
                  <span>EDUCATION / {pages[item].title.toUpperCase()}</span>
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
            <p className={css.eyebrow}>YOUR INSTITUTION. YOUR WORKFLOW.</p>
            <h2>Let’s begin with the way you work.</h2>
            <p>
              Bring your academic and administrative questions to an advisor
              conversation.
            </p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
