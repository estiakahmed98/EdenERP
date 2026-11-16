"use client";
import {
  ArrowDownRight,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import { css, useCollege } from "./ui";
import CollegeArt from "./art";
import { type CollegeSlug } from "./registry";
function Title({ slug }: { slug: CollegeSlug }) {
  const { t } = useCollege();
  return (
    <div className={css.heroCopy}>
      <p className={css.eyebrow}>{t("ui.college")}</p>
      <h1>{t(`pages.${slug}.title`)}</h1>
      <p>{t(`pages.${slug}.description`)}</p>
    </div>
  );
}
function Figure({ slug }: { slug: CollegeSlug }) {
  const { t } = useCollege();
  return (
    <figure className={css.heroArt}>
      <CollegeArt slug={slug} />
      <figcaption>{t("ui.concept")}</figcaption>
    </figure>
  );
}
function Sketch({ label }: { label: string }) {
  const { t } = useCollege();
  return (
    <div className={css.sketch}>
      <svg viewBox="0 0 70 30" fill="none" aria-hidden="true">
        <path
          d="M2 3c15 31 45 27 61 7m-13 4 14-6-2 15"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span>{t(`ui.${label}`)}</span>
    </div>
  );
}
export default function CollegeHero({ slug }: { slug: CollegeSlug }) {
  const { t, number } = useCollege();
  let content;
  switch (slug) {
    case "intake-admission":
      content = (
        <div className={css.intakeHeader}>
          <div>
            <Title slug={slug} />
            <div className={css.heroCta}>
              <LiveDemoButton />
              <Sketch label="seatSketch" />
            </div>
          </div>
          <Figure slug={slug} />
        </div>
      );
      break;
    case "cards-items":
      content = (
        <div className={css.assessmentHeader}>
          <div className={css.assessmentHeading}>
            <BookOpen size={30} strokeWidth={1.2} aria-hidden="true" />
            <Title slug={slug} />
          </div>
          <Figure slug={slug} />
          <div className={css.assessmentHeaderFoot}>
            <Sketch label="marksSketch" />
            <LiveDemoButton />
          </div>
        </div>
      );
      break;
    case "professional-exams":
      content = (
        <>
          <div className={css.examHeader}>
            <Title slug={slug} />
            <LiveDemoButton />
          </div>
          <div className={css.examGates}>
            <span>{t("ui.currentPhase")}</span>
            <Figure slug={slug} />
            <span>{t("ui.nextPhase")}</span>
          </div>
        </>
      );
      break;
    case "ward-placement":
      content = (
        <div className={css.wardHeader}>
          <div className={css.wardHeading}>
            <Title slug={slug} />
            <LiveDemoButton />
          </div>
          <div className={css.wardHeaderPlan}>
            <span>
              {t("ui.weekMarker", { value: number(1).padStart(2, number(0)) })}
            </span>
            <Figure slug={slug} />
            <Sketch label="wardSketch" />
          </div>
        </div>
      );
      break;
    case "interns":
      content = (
        <div className={css.internHeader}>
          <div className={css.internTitle}>
            <GraduationCap size={31} strokeWidth={1.2} aria-hidden="true" />
            <Title slug={slug} />
            <LiveDemoButton />
          </div>
          <div className={css.internRoute}>
            <Figure slug={slug} />
            <div>
              {["posting", "logbook", "supervision"].map((s) => (
                <span key={s}>{t(`ui.${s}`)}</span>
              ))}
            </div>
          </div>
        </div>
      );
      break;
    case "postgraduate-trainees":
      content = (
        <div className={css.pgHeader}>
          <div className={css.degreeEdition}>
            <span>FCPS</span>
            <span>MD</span>
            <span>MS</span>
          </div>
          <div>
            <Title slug={slug} />
            <div className={css.heroCta}>
              <LiveDemoButton />
            </div>
          </div>
          <Figure slug={slug} />
        </div>
      );
      break;
    case "governance":
      content = (
        <div className={css.governanceHeader}>
          <Figure slug={slug} />
          <div>
            <Title slug={slug} />
            <Sketch label="governanceSketch" />
          </div>
          <LiveDemoButton />
        </div>
      );
      break;
    case "college-settings":
      content = (
        <div className={css.settingsHeader}>
          <div className={css.settingsTitle}>
            <SlidersHorizontal size={29} strokeWidth={1.2} aria-hidden="true" />
            <Title slug={slug} />
          </div>
          <Figure slug={slug} />
          <div className={css.settingsHeaderFoot}>
            <span>
              <ClipboardCheck size={16} aria-hidden="true" />
              {t("ui.validation")}
              <ArrowDownRight size={16} aria-hidden="true" />
            </span>
            <LiveDemoButton />
          </div>
        </div>
      );
      break;
  }
  return (
    <header
      className={`${css.hero} ${css[slug] ?? ""}`}
      data-college-hero={slug}
    >
      {content}
    </header>
  );
}
