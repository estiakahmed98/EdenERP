import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Layers,
  Lightbulb,
  NotebookPen,
  Users,
} from "lucide-react";
import { pages, type EducationIndustry } from "./data";
import { Actions, Arrow, Badge, css } from "./ui";
function Copy({ industry }: { industry: EducationIndustry }) {
  const p = pages[industry];
  return (
    <>
      <p className={css.eyebrow}>{p.eyebrow}</p>
      <h1>
        {p.headline}
        <br />
        <em>{p.accent}</em>
      </h1>
      <p className={css.lead}>{p.description}</p>
    </>
  );
}
function SchoolDrawing() {
  return (
    <svg
      viewBox="0 0 440 230"
      fill="none"
      className={css.schoolDrawing}
      aria-hidden="true"
    >
      <path d="M17 206h406" stroke="currentColor" strokeOpacity=".25" />
      <path
        d="M56 110h112v96H56zM272 110h112v96H272z"
        fill="var(--industry-wash)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="m48 110 64-42 65 42m86 0 64-42 65 42"
        stroke="currentColor"
        strokeOpacity=".6"
        strokeWidth="2"
      />
      <path
        d="M163 83h114v123H163z"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".65"
      />
      <path
        d="m152 83 68-58 68 58"
        fill="var(--industry-wash)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="220"
        cy="101"
        r="16"
        stroke="currentColor"
        strokeOpacity=".6"
      />
      <path d="M220 90v12l8 5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M201 206v-40a19 19 0 0 1 38 0v40"
        fill="var(--industry-wash)"
        stroke="currentColor"
      />
      <path
        d="M220 25V6h31l-8 9 8 8h-31"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <g stroke="currentColor" strokeOpacity=".5" fill="var(--card)">
        {[77, 124, 293, 340].map((x) => (
          <g key={x}>
            <path d={`M${x} 133h18v22h-18zM${x} 171h18v22h-18z`} />
          </g>
        ))}
      </g>
      <path
        d="M30 205v-45m-8 8 8-22 9 22m-15-2-6 20h23l-7-20M410 205v-40m-10 6 10-25 10 25m-17-2-5 18h24l-8-18"
        stroke="var(--industry-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M197 227h46l-8-21h-29z" fill="var(--industry-wash)" />
    </svg>
  );
}
function SchoolHero() {
  return (
    <section className={css.schoolHero}>
      <div className={`${css.wrap} ${css.schoolLayout}`}>
        <div>
          <Copy industry="school" />
          <Actions />
          <div className={css.schoolPrinciples}>
            <span>
              <Users size={15} />
              Learner context
            </span>
            <span>
              <BookOpen size={15} />
              Classroom rhythm
            </span>
          </div>
        </div>
        <figure className={css.schoolNotebook}>
          <div className={css.bindingDots} />
          <header>
            <span>THE SCHOOL DAY / ILLUSTRATED</span>
            <Badge />
          </header>
          <SchoolDrawing />
          <div className={css.dayCards}>
            <div>
              <span className={css.dayIcon}>
                <ClipboardCheck size={20} />
              </span>
              <div>
                <b>A considered morning</b>
                <span>Class register → Attendance → Follow-up</span>
              </div>
              <Check size={15} />
            </div>
            <div>
              <span className={css.dayIcon}>
                <Bell size={20} />
              </span>
              <div>
                <b>The office stays in context</b>
                <span>Notices, learner records and fee questions</span>
              </div>
            </div>
          </div>
          <span className={css.schoolCallout}>
            make the day feel connected
            <Arrow />
          </span>
          <figcaption>
            Conceptual campus and school-day canvas · no real school data
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function CollegeHero() {
  return (
    <section className={css.collegeHero}>
      <div className={css.wrap}>
        <div className={css.collegeHeading}>
          <div>
            <Copy industry="college" />
            <Actions />
          </div>
          <aside className={css.sessionProspectus}>
            <header>
              <Compass size={24} />
              <span>THE ACADEMIC SESSION</span>
            </header>
            <div>
              <span>01</span>
              <p>
                The programme
                <br />
                <b>gives the structure.</b>
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                The timetable
                <br />
                <b>gives the rhythm.</b>
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                The college office
                <br />
                <b>keeps the context.</b>
              </p>
            </div>
          </aside>
        </div>
        <figure className={css.collegeRibbon}>
          <header>
            <CalendarDays size={18} />
            <span>A SESSION IN VIEW</span>
            <Badge>Illustrative Sunday timetable</Badge>
          </header>
          <div className={css.scheduleRibbon}>
            <div>
              <span>09:00—10:00</span>
              <b>Applied science</b>
              <small>Lab 01 · Science 1</small>
              <i />
            </div>
            <ArrowRight size={19} />
            <div>
              <span>10:00—11:00</span>
              <b>Communication</b>
              <small>Hall B · Humanities 1</small>
              <i />
            </div>
            <div className={css.ribbonNote}>
              <NotebookPen size={26} />
              <span>
                Each slot has a room,
                <br />a group and a tutor.
              </span>
            </div>
          </div>
          <figcaption>
            Two of three fictional sessions used in the local planning exercise
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function UniversityHero() {
  return (
    <section className={css.universityHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy industry="university" />
          <Actions />
        </div>
        <figure className={css.campusScene}>
          <div className={css.academicThread}>
            <span>APPLICATION</span>
            <i />
            <span>ACADEMIC CONTEXT</span>
            <i />
            <span>STUDENT JOURNEY</span>
          </div>
          <div className={css.campusLineArt}>
            <svg viewBox="0 0 740 220" fill="none" aria-hidden="true">
              <path
                d="M25 196h690M140 196V99h460v97"
                stroke="currentColor"
                strokeOpacity=".45"
              />
              <path
                d="m122 100 248-74 248 74H122Z"
                fill="var(--industry-wash)"
                stroke="currentColor"
                strokeOpacity=".65"
              />
              <path
                d="M165 111h410M151 184h438"
                stroke="currentColor"
                strokeOpacity=".5"
              />
              {[190, 265, 340, 415, 490, 565].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 116v60m-8-60h16m-16 60h16`}
                    stroke="currentColor"
                    strokeOpacity=".65"
                    strokeWidth="3"
                  />
                </g>
              ))}
              <circle
                cx="370"
                cy="68"
                r="17"
                stroke="currentColor"
                strokeOpacity=".5"
              />
              <path
                d="m358 67 12-7 12 7-12 7-12-7Zm5 4v7l7 4 7-4v-7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M69 195v-30m-14 0 14-35 14 35m-24-5-9 20h38l-10-20M673 195v-30m-14 0 14-35 14 35m-24-5-9 20h38l-10-20"
                stroke="var(--industry-green)"
                strokeWidth="2"
              />
              <path
                d="M299 215h142m-122-10h102"
                stroke="currentColor"
                strokeOpacity=".4"
              />
            </svg>
          </div>
          <div className={css.campusDossier}>
            <GraduationCap size={22} />
            <span>EXAMPLE ACADEMIC MAP</span>
            <div>
              <b>Structure</b>
              <small>Programme & term context</small>
            </div>
            <div>
              <b>Choices</b>
              <small>Courses & credit conversation</small>
            </div>
          </div>
          <div className={css.campusBookmark}>
            <BookOpen size={20} />
            <span>Begin with the student’s journey.</span>
          </div>
          <figcaption>
            Conceptual campus illustration · no institution or accreditation
            implied
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function LmsHero() {
  return (
    <section className={css.lmsHero}>
      <div className={`${css.wrap} ${css.lmsLayout}`}>
        <figure className={css.studioWindow}>
          <header>
            <span className={css.windowDots}>
              <i />
              <i />
              <i />
            </span>
            <span>THE LEARNING STUDIO</span>
            <Badge>Interactive example below</Badge>
          </header>
          <div className={css.studioBody}>
            <div className={css.studioOutline}>
              <span>THE SHORT COURSE</span>
              <h3>
                Thoughtful
                <br />
                learning design
              </h3>
              {[
                { number: "01", title: "A clear goal", Icon: Lightbulb },
                { number: "02", title: "Room to practice", Icon: NotebookPen },
                { number: "03", title: "A useful next step", Icon: Compass },
              ].map(({ number, title, Icon }) => (
                <div key={number}>
                  <span>{number}</span>
                  <Icon size={16} />
                  <b>{title}</b>
                </div>
              ))}
            </div>
            <div className={css.lessonCanvas}>
              <span>LESSON / PRACTICE / REFLECTION</span>
              <div className={css.learningOrbit}>
                <span>
                  <BookOpen size={38} />
                </span>
                <i />
                <b>Start with an idea.</b>
              </div>
              <div className={css.practiceTile}>
                <Layers size={21} />
                <span>
                  Make the practice
                  <br />
                  part of the lesson.
                </span>
              </div>
            </div>
          </div>
          <figcaption>
            Reading-based sample studio · no video, enrolment or certificate
            claim
          </figcaption>
        </figure>
        <div>
          <Copy industry="lms" />
          <Actions />
          <p className={css.lmsFootnote}>
            A small example of a more considered learning flow.
          </p>
        </div>
      </div>
    </section>
  );
}
const heroes = {
  school: SchoolHero,
  college: CollegeHero,
  university: UniversityHero,
  lms: LmsHero,
};
export default function IndustryHero({
  industry,
}: {
  industry: EducationIndustry;
}) {
  const Hero = heroes[industry];
  return <Hero />;
}
