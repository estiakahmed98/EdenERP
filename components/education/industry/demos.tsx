"use client";
import { choiceLabel } from "./labels";
import { useTranslations, useFormatter } from "next-intl";

import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, RotateCcw } from "lucide-react";
import { creditTotal, findConflicts } from "./calculations";
import {
  attendanceInitial,
  getCourses,
  getLearners,
  getLessons,
  getPages,
  getSessions,
  type AttendanceStatus,
  type EducationIndustry,
} from "./data";
import { Badge, Metric, Note, css } from "./ui";

export function RolePerspective({ industry }: { industry: EducationIndustry }) {
  const t = useTranslations("pages.educationIndustries");
  const pages = getPages(t);

  const [index, setIndex] = useState(0);
  const p = pages[industry];
  const journey = p.journeys[index];
  return (
    <section className={css.perspectiveSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>
              {t("copy.startWithThePeopleDoingTheWork")}
            </p>
            <h2>{p.perspective}</h2>
          </div>
        </div>
        <div className={css.perspectiveLayout}>
          <div
            className={css.roleChoices}
            role="group"
            aria-label={t("copy.chooseAPerspective")}
          >
            {p.journeys.map((item, i) => (
              <button
                type="button"
                key={item.role}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <span>0{i + 1}</span>
                {item.role}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={css.roleStory} aria-live="polite">
            <h3>{journey.title}</h3>
            <p>{journey.body}</p>
            <ol>
              {journey.steps.map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  <b>{step}</b>
                  {i < 2 && <ArrowRight size={15} aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
function SchoolDemo() {
  const t = useTranslations("pages.educationIndustries");
  const learners = getLearners(t);

  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({
    ...attendanceInitial,
  });
  const values = Object.values(marks);
  const marked = values.filter((v) => v !== "unmarked").length;
  const attending = values.filter(
    (v) => v === "present" || v === "late",
  ).length;
  return (
    <>
      <div className={css.demoToolbar}>
        <Badge>{t("copy.fictionalClassFourAnonymousLearners")}</Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => setMarks({ ...attendanceInitial })}
        >
          <RotateCcw size={14} />
          {t("copy.resetExample")}
        </button>
      </div>
      <div className={css.attendanceLayout}>
        <div className={css.learnerList}>
          {learners.map((row) => (
            <div key={row.id}>
              <span className={css.learnerInitial}>{row.label.slice(-2)}</span>
              <div>
                <b>{row.label}</b>
                <small>{t("ui.fictionalRecord", { id: row.id })}</small>
              </div>
              <label>
                <span className={css.srOnly}>
                  {t("ui.attendanceFor", { name: row.label })}
                </span>
                <select
                  value={marks[row.id]}
                  onChange={(e) =>
                    setMarks((prev) => ({
                      ...prev,
                      [row.id]: e.target.value as AttendanceStatus,
                    }))
                  }
                >
                  <option value="unmarked">{t("ui.unmarked")}</option>
                  <option value="present">{t("ui.present")}</option>
                  <option value="late">{t("ui.late")}</option>
                  <option value="absent">{t("ui.absent")}</option>
                </select>
              </label>
            </div>
          ))}
        </div>
        <div className={css.attendanceSummary}>
          <span>{t("copy.thisLocalExample")}</span>
          <h3>{t("copy.aRegisterYouCanReadAtAGlance")}</h3>
          <dl className={css.metrics} aria-live="polite">
            <Metric label={t("copy.marked")} value={`${marked} / 4`} />
            <Metric label={t("copy.inAttendance")} value={attending} />
            <Metric
              label={t("ui.absent")}
              value={values.filter((v) => v === "absent").length}
            />
            <Metric label={t("copy.stillUnmarked")} value={4 - marked} />
          </dl>
          <Note>{t("copy.inAttendanceIncludesPresentAndLateTheseMarks")}</Note>
        </div>
      </div>
    </>
  );
}
function CollegeDemo() {
  const t = useTranslations("pages.educationIndustries");
  const sessions = getSessions(t);
  const formatter = useFormatter();

  const [proposal, setProposal] = useState({
    day: "Sunday",
    start: "09:30",
    end: "10:30",
    room: "Lab 01",
    tutor: "Tutor B",
    group: "Humanities 1",
  });
  let conflicts: ReturnType<typeof findConflicts> = [];
  let error = "";
  try {
    conflicts = findConflicts(proposal, sessions);
  } catch (e) {
    error = t(
      e instanceof Error && e.message === "End time must be after start time."
        ? "ui.endAfterStart"
        : "ui.validTimes",
    );
  }
  function update(field: keyof typeof proposal, value: string) {
    setProposal((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <div className={css.collegeDemo}>
      <div>
        <Badge>{t("copy.threeIllustrativeSessionsNoLiveAvailability")}</Badge>
        <div className={css.exampleSessions}>
          {sessions.map((row) => (
            <article key={row.id}>
              <span>
                {choiceLabel(t, row.day)} ·{" "}
                <bdi>
                  {row.start}—{row.end}
                </bdi>
              </span>
              <h3>{row.title}</h3>
              <p>
                {choiceLabel(t, row.room)} · {choiceLabel(t, row.tutor)} ·{" "}
                {choiceLabel(t, row.group)}
              </p>
            </article>
          ))}
        </div>
        <Note>{t("copy.intervalsThatMeetExactlyAtABoundaryDo")}</Note>
      </div>
      <section
        className={css.proposalPanel}
        aria-label={t("copy.localLessonProposal")}
      >
        <h3>{t("copy.tryAProposedLesson")}</h3>
        <div className={css.formGrid}>
          {[
            ["day", t("copy.day"), ["Sunday", "Monday", "Tuesday"]],
            ["room", t("copy.room"), ["Lab 01", "Hall B"]],
            ["tutor", t("copy.tutor"), ["Tutor A", "Tutor B"]],
            ["group", t("copy.group"), ["Science 1", "Humanities 1"]],
          ].map(([field, label, options]) => (
            <label className={css.field} key={String(field)}>
              <span>{String(label)}</span>
              <select
                value={proposal[field as keyof typeof proposal]}
                onChange={(e) =>
                  update(field as keyof typeof proposal, e.target.value)
                }
              >
                {(options as string[]).map((value) => (
                  <option key={value} value={value}>
                    {choiceLabel(t, value)}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label className={css.field}>
            <span>{t("copy.starts")}</span>
            <input
              type="time"
              value={proposal.start}
              onChange={(e) => update("start", e.target.value)}
            />
          </label>
          <label className={css.field}>
            <span>{t("copy.ends")}</span>
            <input
              type="time"
              value={proposal.end}
              onChange={(e) => update("end", e.target.value)}
            />
          </label>
        </div>
        <div
          className={css.conflictResult}
          role="status"
          data-warning={!!error || conflicts.length > 0}
        >
          <strong>
            {error
              ? t("copy.checkTheTimes")
              : conflicts.length
                ? t("ui.overlaps", { count: conflicts.length })
                : t("copy.noOverlapsInThisExample")}
          </strong>
          {error ? (
            <p>{error}</p>
          ) : conflicts.length ? (
            <ul>
              {conflicts.map((row) => (
                <li key={row.id}>
                  {t("ui.sharedResources", {
                    id: row.id,
                    resources: formatter.list(
                      row.reasons.map((reason) => t(`choices.${reason}`)),
                      { type: "conjunction" },
                    ),
                  })}
                </li>
              ))}
            </ul>
          ) : (
            <p>{t("copy.theProposalDoesNotConflictWithTheThree")}</p>
          )}
        </div>
      </section>
    </div>
  );
}
function UniversityDemo() {
  const t = useTranslations("pages.educationIndustries");
  const courses = getCourses(t);

  const [selected, setSelected] = useState([courses[0].id, courses[1].id]);
  const [budget, setBudget] = useState(12);
  const total = creditTotal(selected, courses);
  const difference = budget - total;
  return (
    <div className={css.creditDemo}>
      <div>
        <Badge>{t("copy.fictionalCoursesIllustrativeCredits")}</Badge>
        <div className={css.courseList}>
          {courses.map((course) => (
            <label key={course.id} data-selected={selected.includes(course.id)}>
              <input
                type="checkbox"
                checked={selected.includes(course.id)}
                onChange={(e) =>
                  setSelected((prev) =>
                    e.target.checked
                      ? [...prev, course.id]
                      : prev.filter((id) => id !== course.id),
                  )
                }
              />
              <span>
                <small>
                  {course.id} · {course.area}
                </small>
                <b>{course.title}</b>
              </span>
              <strong>
                {course.credits}
                <small>{t("copy.credits")}</small>
              </strong>
            </label>
          ))}
        </div>
      </div>
      <section className={css.creditSummary}>
        <GraduationDrawing />
        <h3>{t("copy.anExampleSemesterInView")}</h3>
        <label className={css.field}>
          <span>{t("copy.illustrativeCreditBudget")}</span>
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          >
            {[9, 12, 15].map((value) => (
              <option key={value} value={value}>
                {t("ui.exampleCredits", { count: value })}
              </option>
            ))}
          </select>
        </label>
        <div
          className={css.creditNumber}
          role="status"
          data-warning={difference < 0}
        >
          <strong>
            {total}
            <span> / {budget}</span>
          </strong>
          <p>
            {difference < 0
              ? t("ui.creditsAbove", { count: -difference })
              : t("ui.creditsRemaining", { count: difference })}
          </p>
        </div>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setSelected([courses[0].id, courses[1].id]);
            setBudget(12);
          }}
        >
          <RotateCcw size={14} />
          {t("copy.resetExamplePlan")}
        </button>
        <Note>
          {t("copy.noPrerequisiteDegreeAdmissionOrAcademicStandingRules")}
        </Note>
      </section>
    </div>
  );
}
function GraduationDrawing() {
  return (
    <svg
      className={css.creditDrawing}
      viewBox="0 0 150 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m15 24 60-20 60 20-60 21-60-21Z"
        fill="var(--industry-wash)"
        stroke="currentColor"
      />
      <path
        d="M43 36v20c20 12 44 12 64 0V36M131 26v29m-3 5 3-5 3 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M75 26v16" stroke="currentColor" strokeOpacity=".3" />
    </svg>
  );
}
function LmsDemo() {
  const t = useTranslations("pages.educationIndustries");
  const lessons = getLessons(t);

  const [active, setActive] = useState(lessons[0].id);
  const [complete, setComplete] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const lesson = lessons.find((row) => row.id === active)!;
  return (
    <div className={css.learningDemo}>
      <aside className={css.lessonSidebar}>
        <Badge>{t("copy.readingBasedLocalPreview")}</Badge>
        <h3>{t("copy.thoughtfulLearningDesign")}</h3>
        <div
          role="group"
          aria-label={t("copy.chooseASampleLesson")}
          className={css.lessonChoices}
        >
          {lessons.map((row) => (
            <button
              key={row.id}
              type="button"
              aria-pressed={active === row.id}
              onClick={() => setActive(row.id)}
            >
              <span>
                {complete.includes(row.id) ? <Check size={14} /> : row.number}
              </span>
              <b>{row.title}</b>
            </button>
          ))}
        </div>
        <div className={css.localProgress}>
          <span>
            {t("ui.lessonsCompleted", {
              count: complete.length,
              total: lessons.length,
            })}
          </span>
          <div
            role="progressbar"
            aria-label={t("copy.localLessonProgress")}
            aria-valuenow={complete.length}
            aria-valuemin={0}
            aria-valuemax={3}
          >
            <i style={{ width: `${(complete.length / 3) * 100}%` }} />
          </div>
        </div>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setActive(lessons[0].id);
            setComplete([]);
            setAnswer("");
            setChecked(false);
          }}
        >
          <RotateCcw size={14} />
          {t("copy.resetStudio")}
        </button>
      </aside>
      <div className={css.lessonReader}>
        <article>
          <p className={css.eyebrow}>
            {t("ui.sampleLesson", {
              number: lesson.number,
              duration: lesson.duration,
            })}
          </p>
          <h3>{lesson.title}</h3>
          <p>{lesson.body}</p>
          <div className={css.practicePrompt}>
            <span>{t("copy.tryASmallReflection")}</span>
            <p>{lesson.prompt}</p>
          </div>
          <p className={css.lessonTakeaway}>{lesson.takeaway}</p>
          <button
            type="button"
            className={`${css.button} ${css.primaryButton}`}
            disabled={complete.includes(lesson.id)}
            onClick={() =>
              setComplete((prev) => [...new Set([...prev, lesson.id])])
            }
          >
            <CheckCircle2 size={16} />
            {complete.includes(lesson.id)
              ? t("copy.markedCompleteLocally")
              : t("copy.markThisLessonCompleteLocally")}
          </button>
        </article>
        <fieldset className={css.knowledgeCheck}>
          <legend>{t("copy.aSampleKnowledgeCheck")}</legend>
          <p>{t("copy.whichActivityGivesALearnerAChanceTo")}</p>
          {[
            ["title", t("copy.readOnlyTheCourseTitle")],
            ["explain", t("copy.explainTheIdeaInYourOwnWordsWith")],
            ["skip", t("copy.skipDirectlyToTheNextSection")],
          ].map(([id, label]) => (
            <label key={id}>
              <input
                type="radio"
                name="learning-example-answer"
                checked={answer === id}
                onChange={() => {
                  setAnswer(id);
                  setChecked(false);
                }}
              />
              {label}
            </label>
          ))}
          <button
            className={css.button}
            type="button"
            disabled={!answer}
            onClick={() => setChecked(true)}
          >
            {t("copy.checkExampleAnswer")}
          </button>
          {checked && (
            <p className={css.quizFeedback} role="status">
              {answer === "explain"
                ? t("copy.thatFitsTheExampleGoalExplainingAndApplying")
                : t("copy.tryAgainLookForAnActivityWhereThe")}
            </p>
          )}
        </fieldset>
        <Note>{t("copy.progressAnswersAndCompletionMarksExistOnlyIn")}</Note>
      </div>
    </div>
  );
}
const demos = {
  school: SchoolDemo,
  college: CollegeDemo,
  university: UniversityDemo,
  lms: LmsDemo,
};
export default function IndustryDemo({
  industry,
}: {
  industry: EducationIndustry;
}) {
  const t = useTranslations("pages.educationIndustries");
  const pages = getPages(t);

  const p = pages[industry];
  const Demo = demos[industry];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>
              {t("copy.tryASmallPartOfTheExperience")}
            </p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>{t("copy.localExampleNotConnected")}</Badge>
        </div>
        <div className={css.demoSurface}>
          <Demo />
        </div>
      </div>
    </section>
  );
}
