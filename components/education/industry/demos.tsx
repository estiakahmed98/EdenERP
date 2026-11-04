"use client";

import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, RotateCcw } from "lucide-react";
import { creditTotal, findConflicts } from "./calculations";
import {
  attendanceInitial,
  courses,
  learners,
  lessons,
  pages,
  sessions,
  type AttendanceStatus,
  type EducationIndustry,
} from "./data";
import { Badge, Metric, Note, css } from "./ui";

export function RolePerspective({ industry }: { industry: EducationIndustry }) {
  const [index, setIndex] = useState(0);
  const p = pages[industry];
  const journey = p.journeys[index];
  return (
    <section className={css.perspectiveSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>START WITH THE PEOPLE DOING THE WORK</p>
            <h2>{p.perspective}</h2>
          </div>
        </div>
        <div className={css.perspectiveLayout}>
          <div
            className={css.roleChoices}
            role="group"
            aria-label="Choose a perspective"
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
        <Badge>Fictional class · four anonymous learners</Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => setMarks({ ...attendanceInitial })}
        >
          <RotateCcw size={14} />
          Reset example
        </button>
      </div>
      <div className={css.attendanceLayout}>
        <div className={css.learnerList}>
          {learners.map((row) => (
            <div key={row.id}>
              <span className={css.learnerInitial}>{row.label.slice(-2)}</span>
              <div>
                <b>{row.label}</b>
                <small>{row.id} · fictional record</small>
              </div>
              <label>
                <span className={css.srOnly}>Attendance for {row.label}</span>
                <select
                  value={marks[row.id]}
                  onChange={(e) =>
                    setMarks((prev) => ({
                      ...prev,
                      [row.id]: e.target.value as AttendanceStatus,
                    }))
                  }
                >
                  <option value="unmarked">Unmarked</option>
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                </select>
              </label>
            </div>
          ))}
        </div>
        <div className={css.attendanceSummary}>
          <span>THIS LOCAL EXAMPLE</span>
          <h3>A register you can read at a glance.</h3>
          <dl className={css.metrics} aria-live="polite">
            <Metric label="Marked" value={`${marked} / 4`} />
            <Metric label="In attendance" value={attending} />
            <Metric
              label="Absent"
              value={values.filter((v) => v === "absent").length}
            />
            <Metric label="Still unmarked" value={4 - marked} />
          </dl>
          <Note>
            In attendance includes Present and Late. These marks update only the
            four fictional rows here; no register is submitted.
          </Note>
        </div>
      </div>
    </>
  );
}
function CollegeDemo() {
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
    error = e instanceof Error ? e.message : "Choose valid times.";
  }
  function update(field: keyof typeof proposal, value: string) {
    setProposal((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <div className={css.collegeDemo}>
      <div>
        <Badge>Three illustrative sessions · no live availability</Badge>
        <div className={css.exampleSessions}>
          {sessions.map((row) => (
            <article key={row.id}>
              <span>
                {row.day} · {row.start}—{row.end}
              </span>
              <h3>{row.title}</h3>
              <p>
                {row.room} · {row.tutor} · {row.group}
              </p>
            </article>
          ))}
        </div>
        <Note>
          Intervals that meet exactly at a boundary do not overlap. Only
          matching rooms, tutors or groups in these three rows are checked.
        </Note>
      </div>
      <section className={css.proposalPanel} aria-label="Local lesson proposal">
        <h3>Try a proposed lesson</h3>
        <div className={css.formGrid}>
          {[
            ["day", "Day", ["Sunday", "Monday", "Tuesday"]],
            ["room", "Room", ["Lab 01", "Hall B"]],
            ["tutor", "Tutor", ["Tutor A", "Tutor B"]],
            ["group", "Group", ["Science 1", "Humanities 1"]],
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
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          ))}
          <label className={css.field}>
            <span>Starts</span>
            <input
              type="time"
              value={proposal.start}
              onChange={(e) => update("start", e.target.value)}
            />
          </label>
          <label className={css.field}>
            <span>Ends</span>
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
              ? "Check the times"
              : conflicts.length
                ? `${conflicts.length} example overlaps`
                : "No overlaps in this example"}
          </strong>
          {error ? (
            <p>{error}</p>
          ) : conflicts.length ? (
            <ul>
              {conflicts.map((row) => (
                <li key={row.id}>
                  {row.id}: shared {row.reasons.join(", ")}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              The proposal does not conflict with the three visible sessions.
              This does not reserve a room or approve a full timetable.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
function UniversityDemo() {
  const [selected, setSelected] = useState([courses[0].id, courses[1].id]);
  const [budget, setBudget] = useState(12);
  const total = creditTotal(selected, courses);
  const difference = budget - total;
  return (
    <div className={css.creditDemo}>
      <div>
        <Badge>Fictional courses · illustrative credits</Badge>
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
                <small>credits</small>
              </strong>
            </label>
          ))}
        </div>
      </div>
      <section className={css.creditSummary}>
        <GraduationDrawing />
        <h3>An example semester, in view.</h3>
        <label className={css.field}>
          <span>Illustrative credit budget</span>
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          >
            {[9, 12, 15].map((value) => (
              <option key={value} value={value}>
                {value} example credits
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
              ? `${-difference} credits above the example budget.`
              : `${difference} credits remain within the example budget.`}
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
          Reset example plan
        </button>
        <Note>
          No prerequisite, degree, admission or academic-standing rules are
          checked. This is a planning illustration, not official registration.
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
  const [active, setActive] = useState(lessons[0].id);
  const [complete, setComplete] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const lesson = lessons.find((row) => row.id === active)!;
  return (
    <div className={css.learningDemo}>
      <aside className={css.lessonSidebar}>
        <Badge>Reading-based local preview</Badge>
        <h3>Thoughtful learning design</h3>
        <div
          role="group"
          aria-label="Choose a sample lesson"
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
          <span>{complete.length} of 3 lessons marked locally</span>
          <div
            role="progressbar"
            aria-label="Local lesson progress"
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
          Reset studio
        </button>
      </aside>
      <div className={css.lessonReader}>
        <article>
          <p className={css.eyebrow}>
            SAMPLE LESSON {lesson.number} / {lesson.duration.toUpperCase()}
          </p>
          <h3>{lesson.title}</h3>
          <p>{lesson.body}</p>
          <div className={css.practicePrompt}>
            <span>TRY A SMALL REFLECTION</span>
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
              ? "Marked complete locally"
              : "Mark this lesson complete locally"}
          </button>
        </article>
        <fieldset className={css.knowledgeCheck}>
          <legend>A sample knowledge check</legend>
          <p>Which activity gives a learner a chance to use an idea?</p>
          {[
            ["title", "Read only the course title."],
            ["explain", "Explain the idea in your own words with an example."],
            ["skip", "Skip directly to the next section."],
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
            Check example answer
          </button>
          {checked && (
            <p className={css.quizFeedback} role="status">
              {answer === "explain"
                ? "That fits the example goal: explaining and applying an idea gives the learner a way to practice."
                : "Try again. Look for an activity where the learner explains or applies the idea, rather than only navigating."}
            </p>
          )}
        </fieldset>
        <Note>
          Progress, answers and completion marks exist only in this page’s local
          state. No learning record, grade, enrolment or certificate is saved.
        </Note>
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
  const p = pages[industry];
  const Demo = demos[industry];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>TRY A SMALL PART OF THE EXPERIENCE</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>Local example · not connected</Badge>
        </div>
        <div className={css.demoSurface}>
          <Demo />
        </div>
      </div>
    </section>
  );
}
