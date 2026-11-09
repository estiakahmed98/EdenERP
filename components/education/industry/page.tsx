import { choiceLabel } from "./labels";
import { getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, ChevronRight, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleAlternates } from "@/i18n/metadata";
import LiveDemoButton from "@/components/live-demo-button";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  getCourses,
  educationIndustries,
  getLearners,
  getLessons,
  getPages,
  getSessions,
  type EducationIndustry,
} from "./data";
import IndustryHero from "./heroes";
import IndustryDemo, { RolePerspective } from "./demos";
import { Badge, Metric, css } from "./ui";

export async function educationIndustryMetadata(
  industry: EducationIndustry,
): Promise<Metadata> {
  const t = await getTranslations("pages.educationIndustries");
  const pages = getPages(t);

  const p = pages[industry];
  return {
    title: t("ui.metadataTitle", { name: p.title }),
    description: p.description,
    alternates: await getLocaleAlternates(`/industries/${industry}`),
  };
}
function ProductCanvas({ industry }: { industry: EducationIndustry }) {
  const t = useTranslations("pages.educationIndustries");
  const pages = getPages(t);
  const learners = getLearners(t);
  const courses = getCourses(t);
  const lessons = getLessons(t);
  const sessions = getSessions(t);

  return (
    <div className={css.productCanvas}>
      <header>
        <b>
          Adon<span>ERP</span>
        </b>
        <span>{t("ui.canvasTitle", { name: pages[industry].title })}</span>
        <Badge>{t("copy.fictionalExampleData")}</Badge>
      </header>
      <div className={css.canvasBody}>
        <h3>
          {industry === "school"
            ? t("copy.theSchoolDayRegister")
            : industry === "college"
              ? t("copy.theSessionOverview")
              : industry === "university"
                ? t("copy.theAcademicPlanningConversation")
                : t("copy.theLearningOutline")}
        </h3>
        <dl className={css.canvasMetrics}>
          {industry === "school" ? (
            <>
              <Metric label={t("copy.fictionalLearners")} value="4" />
              <Metric label={t("copy.initialMarks")} value="3 / 4" />
              <Metric
                label={t("copy.registerState")}
                value={t("copy.localOnly")}
              />
            </>
          ) : industry === "college" ? (
            <>
              <Metric label={t("copy.exampleSessions")} value="3" />
              <Metric label={t("copy.roomsInExample")} value="2" />
              <Metric
                label={t("copy.plannerState")}
                value={t("copy.localOnly")}
              />
            </>
          ) : industry === "university" ? (
            <>
              <Metric label={t("copy.fictionalCourses")} value="5" />
              <Metric label={t("copy.exampleCreditBudget")} value="12" />
              <Metric
                label={t("copy.registration")}
                value={t("copy.notPerformed")}
              />
            </>
          ) : (
            <>
              <Metric label={t("copy.sampleReadings")} value="3" />
              <Metric
                label={t("copy.knowledgeCheck")}
                value={t("copy.1Example")}
              />
              <Metric
                label={t("copy.officialLearningRecords")}
                value={t("copy.noneCreated")}
              />
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
                    {t("ui.initialMark", {
                      status:
                        i < 2
                          ? t("ui.present")
                          : i === 2
                            ? t("ui.late")
                            : t("ui.unmarked"),
                    })}
                  </small>
                </div>
              ))
            : industry === "college"
              ? sessions.map((row) => (
                  <div key={row.id}>
                    <span>
                      {choiceLabel(t, row.day)} · <bdi>{row.start}</bdi>
                    </span>
                    <b>{row.title}</b>
                    <small>
                      {choiceLabel(t, row.room)} · {choiceLabel(t, row.group)}
                    </small>
                  </div>
                ))
              : industry === "university"
                ? courses.map((row) => (
                    <div key={row.id}>
                      <span>{row.id}</span>
                      <b>{row.title}</b>
                      <small>
                        {t("ui.exampleCredits", { count: row.credits })}
                      </small>
                    </div>
                  ))
                : lessons.map((row) => (
                    <div key={row.id}>
                      <span>
                        {t("ui.lessonNumber", { number: row.number })}
                      </span>
                      <b>{row.title}</b>
                      <small>{t("copy.shortReadingExampleContent")}</small>
                    </div>
                  ))}
        </div>
        <p className={css.canvasNote}>
          {t("copy.illustrativeCompositionNotAScreenshotOfAConnected")}
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
  const t = useTranslations("pages.educationIndustries");
  const pages = getPages(t);
  const locale = useLocale();

  const p = pages[industry];
  return (
    <main
      className={css.industry}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-education-industry={industry}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("copy.breadcrumb")}>
          <Link href="/">AdonERP</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <Link href="/industries">{t("copy.industries")}</Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span>{t("copy.education")}</span>
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
              <p className={css.eyebrow}>
                {t("copy.theWiderProductConversation")}
              </p>
              <h2>{p.toolsTitle}</h2>
              <p>
                {t(
                  "copy.browseExistingProductPresentationsThenBringYourInstitutions",
                )}
              </p>
            </div>
            <BookOpen size={27} className={css.moduleIcon} aria-hidden="true" />
          </div>
          <div className={css.moduleGrid}>
            {p.tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
                <span>{t("ui.productPreviewNumber", { number: i + 1 })}</span>
                <h3>
                  {tool.title}
                  <ArrowRight size={17} aria-hidden="true" />
                </h3>
                <p>{tool.body}</p>
                <small>{t("copy.exploreThePresentation")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={css.previewSection}>
        <div className={css.wrap}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>{t("copy.seeThePartsTogether")}</p>
              <h2>{t("copy.aCloserLookAtTheExperience")}</h2>
              <p>
                {t(
                  "copy.conceptCanvasWithFictionalRecordsContinueTheConversation",
                )}
              </p>
            </div>
            <Badge />
          </div>
          <DemoPreview
            title={t("ui.experience", { name: p.title })}
            invitation={{
              regionLabel: t("ui.previewRegion", { name: p.title }),
              eyebrow: t("ui.walkthrough", { name: p.title }),
              heading: t("ui.fullWorkflow"),
            }}
            description={t(
              "copy.exploreYourInstitutionsRecordsLearningContextAndEveryday",
            )}
          >
            <ProductCanvas industry={industry} />
          </DemoPreview>
        </div>
      </section>
      <section className={css.faqSection}>
        <div className={css.wrap}>
          <div>
            <p className={css.eyebrow}>{t("copy.aFewUsefulDetails")}</p>
            <h2>{t("copy.knowWhatYoureExploring")}</h2>
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
                {t("copy.educationInDifferentContexts")}
              </p>
              <h2>{t("copy.exploreAnotherPartOfTheJourney")}</h2>
            </div>
          </div>
          <div className={css.relatedGrid}>
            {educationIndustries
              .filter((item) => item !== industry)
              .map((item) => (
                <Link key={item} href={`/industries/${item}`}>
                  <span>
                    {t("ui.educationCategory", { name: pages[item].title })}
                  </span>
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
            <p className={css.eyebrow}>
              {t("copy.yourInstitutionYourWorkflow")}
            </p>
            <h2>{t("copy.letsBeginWithTheWayYouWork")}</h2>
            <p>{t("copy.bringYourAcademicAndAdministrativeQuestionsToAn")}</p>
          </div>
          <LiveDemoButton />
        </div>
      </section>
    </main>
  );
}
