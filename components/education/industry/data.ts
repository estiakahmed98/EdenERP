import type { TFn } from "@/lib/i18n/t-types";
export const educationIndustries = [
  "school",
  "college",
  "university",
  "lms",
] as const;
export type EducationIndustry = (typeof educationIndustries)[number];
type Journey = { role: string; title: string; body: string; steps: string[] };
type Tool = { title: string; body: string; href: string };
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  perspective: string;
  demoTitle: string;
  demoDescription: string;
  toolsTitle: string;
  tools: Tool[];
  journeys: Journey[];
  faqs: [string, string][];
};
export function getPages(t: TFn): Record<EducationIndustry, Content> {
  return {
    school: {
      title: t("pages.school.title"),
      eyebrow: t("pages.school.eyebrow"),
      headline: t("pages.school.headline"),
      accent: t("pages.school.accent"),
      description: t("pages.school.description"),
      perspective: t("pages.school.perspective"),
      demoTitle: t("pages.school.demoTitle"),
      demoDescription: t("pages.school.demoDescription"),
      toolsTitle: t("pages.school.toolsTitle"),
      tools: [
        {
          title: t("pages.school.tools.0.title"),
          body: t("pages.school.tools.0.body"),
          href: "/apps/education/admissions",
        },
        {
          title: t("pages.school.tools.1.title"),
          body: t("pages.school.tools.1.body"),
          href: "/apps/education/student-attendance",
        },
        {
          title: t("pages.school.tools.2.title"),
          body: t("pages.school.tools.2.body"),
          href: "/apps/education/fees",
        },
        {
          title: t("pages.school.tools.3.title"),
          body: t("pages.school.tools.3.body"),
          href: "/apps/education/notices",
        },
      ],
      journeys: [
        {
          role: t("pages.school.journeys.0.role"),
          title: t("pages.school.journeys.0.title"),
          body: t("pages.school.journeys.0.body"),
          steps: [
            t("pages.school.journeys.0.steps.0"),
            t("pages.school.journeys.0.steps.1"),
            t("pages.school.journeys.0.steps.2"),
          ],
        },
        {
          role: t("pages.school.journeys.1.role"),
          title: t("pages.school.journeys.1.title"),
          body: t("pages.school.journeys.1.body"),
          steps: [
            t("pages.school.journeys.1.steps.0"),
            t("pages.school.journeys.1.steps.1"),
            t("pages.school.journeys.1.steps.2"),
          ],
        },
        {
          role: t("pages.school.journeys.2.role"),
          title: t("pages.school.journeys.2.title"),
          body: t("pages.school.journeys.2.body"),
          steps: [
            t("pages.school.journeys.2.steps.0"),
            t("pages.school.journeys.2.steps.1"),
            t("pages.school.journeys.2.steps.2"),
          ],
        },
      ],
      faqs: [
        [t("pages.school.faqs.0.0"), t("pages.school.faqs.0.1")],
        [t("pages.school.faqs.1.0"), t("pages.school.faqs.1.1")],
        [t("pages.school.faqs.2.0"), t("pages.school.faqs.2.1")],
      ],
    },
    college: {
      title: t("pages.college.title"),
      eyebrow: t("pages.college.eyebrow"),
      headline: t("pages.college.headline"),
      accent: t("pages.college.accent"),
      description: t("pages.college.description"),
      perspective: t("pages.college.perspective"),
      demoTitle: t("pages.college.demoTitle"),
      demoDescription: t("pages.college.demoDescription"),
      toolsTitle: t("pages.college.toolsTitle"),
      tools: [
        {
          title: t("pages.college.tools.0.title"),
          body: t("pages.college.tools.0.body"),
          href: "/apps/education/academics",
        },
        {
          title: t("pages.college.tools.1.title"),
          body: t("pages.college.tools.1.body"),
          href: "/apps/education/timetable",
        },
        {
          title: t("pages.college.tools.2.title"),
          body: t("pages.college.tools.2.body"),
          href: "/apps/education/exams-results",
        },
        {
          title: t("pages.college.tools.3.title"),
          body: t("pages.college.tools.3.body"),
          href: "/apps/education/fee-reports",
        },
      ],
      journeys: [
        {
          role: t("pages.college.journeys.0.role"),
          title: t("pages.college.journeys.0.title"),
          body: t("pages.college.journeys.0.body"),
          steps: [
            t("pages.college.journeys.0.steps.0"),
            t("pages.college.journeys.0.steps.1"),
            t("pages.college.journeys.0.steps.2"),
          ],
        },
        {
          role: t("pages.college.journeys.1.role"),
          title: t("pages.college.journeys.1.title"),
          body: t("pages.college.journeys.1.body"),
          steps: [
            t("pages.college.journeys.1.steps.0"),
            t("pages.college.journeys.1.steps.1"),
            t("pages.college.journeys.1.steps.2"),
          ],
        },
        {
          role: t("pages.college.journeys.2.role"),
          title: t("pages.college.journeys.2.title"),
          body: t("pages.college.journeys.2.body"),
          steps: [
            t("pages.college.journeys.2.steps.0"),
            t("pages.college.journeys.2.steps.1"),
            t("pages.college.journeys.2.steps.2"),
          ],
        },
      ],
      faqs: [
        [t("pages.college.faqs.0.0"), t("pages.college.faqs.0.1")],
        [t("pages.college.faqs.1.0"), t("pages.college.faqs.1.1")],
        [t("pages.college.faqs.2.0"), t("pages.college.faqs.2.1")],
      ],
    },
    university: {
      title: t("pages.university.title"),
      eyebrow: t("pages.university.eyebrow"),
      headline: t("pages.university.headline"),
      accent: t("pages.university.accent"),
      description: t("pages.university.description"),
      perspective: t("pages.university.perspective"),
      demoTitle: t("pages.university.demoTitle"),
      demoDescription: t("pages.university.demoDescription"),
      toolsTitle: t("pages.university.toolsTitle"),
      tools: [
        {
          title: t("pages.university.tools.0.title"),
          body: t("pages.university.tools.0.body"),
          href: "/apps/university/university-dashboard",
        },
        {
          title: t("pages.university.tools.1.title"),
          body: t("pages.university.tools.1.body"),
          href: "/apps/university/university-admissions",
        },
        {
          title: t("pages.university.tools.2.title"),
          body: t("pages.university.tools.2.body"),
          href: "/apps/education/academics",
        },
        {
          title: t("pages.university.tools.3.title"),
          body: t("pages.university.tools.3.body"),
          href: "/apps/education/rooms",
        },
      ],
      journeys: [
        {
          role: t("pages.university.journeys.0.role"),
          title: t("pages.university.journeys.0.title"),
          body: t("pages.university.journeys.0.body"),
          steps: [
            t("pages.university.journeys.0.steps.0"),
            t("pages.university.journeys.0.steps.1"),
            t("pages.university.journeys.0.steps.2"),
          ],
        },
        {
          role: t("pages.university.journeys.1.role"),
          title: t("pages.university.journeys.1.title"),
          body: t("pages.university.journeys.1.body"),
          steps: [
            t("pages.university.journeys.1.steps.0"),
            t("pages.university.journeys.1.steps.1"),
            t("pages.university.journeys.1.steps.2"),
          ],
        },
        {
          role: t("pages.university.journeys.2.role"),
          title: t("pages.university.journeys.2.title"),
          body: t("pages.university.journeys.2.body"),
          steps: [
            t("pages.university.journeys.2.steps.0"),
            t("pages.university.journeys.2.steps.1"),
            t("pages.university.journeys.2.steps.2"),
          ],
        },
      ],
      faqs: [
        [t("pages.university.faqs.0.0"), t("pages.university.faqs.0.1")],
        [t("pages.university.faqs.1.0"), t("pages.university.faqs.1.1")],
        [t("pages.university.faqs.2.0"), t("pages.university.faqs.2.1")],
      ],
    },
    lms: {
      title: t("pages.lms.title"),
      eyebrow: t("pages.lms.eyebrow"),
      headline: t("pages.lms.headline"),
      accent: t("pages.lms.accent"),
      description: t("pages.lms.description"),
      perspective: t("pages.lms.perspective"),
      demoTitle: t("pages.lms.demoTitle"),
      demoDescription: t("pages.lms.demoDescription"),
      toolsTitle: t("pages.lms.toolsTitle"),
      tools: [
        {
          title: t("pages.lms.tools.0.title"),
          body: t("pages.lms.tools.0.body"),
          href: "/apps/website/elearning",
        },
        {
          title: t("pages.lms.tools.1.title"),
          body: t("pages.lms.tools.1.body"),
          href: "/apps/education/students",
        },
        {
          title: t("pages.lms.tools.2.title"),
          body: t("pages.lms.tools.2.body"),
          href: "/apps/education/exams-results",
        },
        {
          title: t("pages.lms.tools.3.title"),
          body: t("pages.lms.tools.3.body"),
          href: "/apps/education/academics",
        },
      ],
      journeys: [
        {
          role: t("pages.lms.journeys.0.role"),
          title: t("pages.lms.journeys.0.title"),
          body: t("pages.lms.journeys.0.body"),
          steps: [
            t("pages.lms.journeys.0.steps.0"),
            t("pages.lms.journeys.0.steps.1"),
            t("pages.lms.journeys.0.steps.2"),
          ],
        },
        {
          role: t("pages.lms.journeys.1.role"),
          title: t("pages.lms.journeys.1.title"),
          body: t("pages.lms.journeys.1.body"),
          steps: [
            t("pages.lms.journeys.1.steps.0"),
            t("pages.lms.journeys.1.steps.1"),
            t("pages.lms.journeys.1.steps.2"),
          ],
        },
        {
          role: t("pages.lms.journeys.2.role"),
          title: t("pages.lms.journeys.2.title"),
          body: t("pages.lms.journeys.2.body"),
          steps: [
            t("pages.lms.journeys.2.steps.0"),
            t("pages.lms.journeys.2.steps.1"),
            t("pages.lms.journeys.2.steps.2"),
          ],
        },
      ],
      faqs: [
        [t("pages.lms.faqs.0.0"), t("pages.lms.faqs.0.1")],
        [t("pages.lms.faqs.1.0"), t("pages.lms.faqs.1.1")],
        [t("pages.lms.faqs.2.0"), t("pages.lms.faqs.2.1")],
      ],
    },
  };
}
export function getLearners(t: TFn) {
  return [
    { id: "S-1001", label: t("learners.0.label") },
    { id: "S-1002", label: t("learners.1.label") },
    { id: "S-1003", label: t("learners.2.label") },
    { id: "S-1004", label: t("learners.3.label") },
  ];
}
export type AttendanceStatus = "present" | "late" | "absent" | "unmarked";
export const attendanceInitial: Record<string, AttendanceStatus> = {
  "S-1001": "present",
  "S-1002": "present",
  "S-1003": "late",
  "S-1004": "unmarked",
};
export const sessions = [
  {
    id: "EX-01",
    day: "Sunday",
    start: "09:00",
    end: "10:00",
    room: "Lab 01",
    tutor: "Tutor A",
    group: "Science 1",
  },
  {
    id: "EX-02",
    day: "Sunday",
    start: "10:00",
    end: "11:00",
    room: "Hall B",
    tutor: "Tutor B",
    group: "Humanities 1",
  },
  {
    id: "EX-03",
    day: "Monday",
    start: "09:00",
    end: "10:00",
    room: "Hall B",
    tutor: "Tutor A",
    group: "Science 1",
  },
];
export function getSessions(t: TFn) {
  return sessions.map((row, index) => ({
    ...row,
    title: t(`sessions.${index}.title`),
  }));
}
export function getCourses(t: TFn) {
  return [
    {
      id: "EX-C101",
      title: t("courses.0.title"),
      credits: 3,
      area: t("courses.0.area"),
    },
    {
      id: "EX-Q102",
      title: t("courses.1.title"),
      credits: 3,
      area: t("courses.1.area"),
    },
    {
      id: "EX-E103",
      title: t("courses.2.title"),
      credits: 2,
      area: t("courses.2.area"),
    },
    {
      id: "EX-R104",
      title: t("courses.3.title"),
      credits: 3,
      area: t("courses.3.area"),
    },
    {
      id: "EX-D105",
      title: t("courses.4.title"),
      credits: 3,
      area: t("courses.4.area"),
    },
  ];
}
export function getLessons(t: TFn) {
  return [
    {
      id: "goal",
      number: "01",
      title: t("lessons.0.title"),
      duration: t("lessons.0.duration"),
      body: t("lessons.0.body"),
      prompt: t("lessons.0.prompt"),
      takeaway: t("lessons.0.takeaway"),
    },
    {
      id: "practice",
      number: "02",
      title: t("lessons.1.title"),
      duration: t("lessons.1.duration"),
      body: t("lessons.1.body"),
      prompt: t("lessons.1.prompt"),
      takeaway: t("lessons.1.takeaway"),
    },
    {
      id: "feedback",
      number: "03",
      title: t("lessons.2.title"),
      duration: t("lessons.2.duration"),
      body: t("lessons.2.body"),
      prompt: t("lessons.2.prompt"),
      takeaway: t("lessons.2.takeaway"),
    },
  ];
}
