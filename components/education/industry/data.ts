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
export const pages: Record<EducationIndustry, Content> = {
  school: {
    title: "School",
    eyebrow: " Adon ERP FOR SCHOOLS",
    headline: "Make room for",
    accent: "a connected school day.",
    description:
      "Bring the admissions desk, classroom and school office into one considered view of the learner’s journey.",
    perspective: "A school day has more than one perspective.",
    demoTitle: "A small register. A clearer morning.",
    demoDescription:
      "Try marking attendance for four fictional learners. Every change stays in this browser session; no student record is saved.",
    toolsTitle: "Explore the work around the classroom.",
    tools: [
      {
        title: "Admissions & student records",
        body: "Follow the application journey into a structured student record.",
        href: "/apps/education/admissions",
      },
      {
        title: "Attendance & the timetable",
        body: "Explore classroom registers and the school-day schedule.",
        href: "/apps/education/student-attendance",
      },
      {
        title: "Fees & the school office",
        body: "Look at fee structures, collections and their reporting context.",
        href: "/apps/education/fees",
      },
      {
        title: "Notices & school communication",
        body: "See how a notice brings its audience and message together.",
        href: "/apps/education/notices",
      },
    ],
    journeys: [
      {
        role: "School office",
        title: "Keep the learner’s context together.",
        body: "Start with admissions, follow the student record and keep the fee conversation connected to the right learner.",
        steps: [
          "Application & admission",
          "Student identity",
          "Fee and office context",
        ],
      },
      {
        role: "Teachers",
        title: "Begin with the class in front of you.",
        body: "Explore the attendance, timetable and results views that support a teacher’s working day.",
        steps: ["Class & timetable", "Attendance register", "Exams & results"],
      },
      {
        role: "School leadership",
        title: "Read the school as a connected whole.",
        body: "Move between enrolment, academic activity and administrative detail without losing the context of the school.",
        steps: [
          "School dashboard",
          "Academic structure",
          "Reports & follow-up",
        ],
      },
    ],
    faqs: [
      [
        "Is this a live school system?",
        "This page is an industry showcase. Its attendance exercise uses fictional learners and resets with the page. Use the advisor demo to discuss the complete product workflow.",
      ],
      [
        "Can we explore our class and fee structure?",
        "Yes. Bring your class levels, sections, academic terms and fee rules to the demo so the discussion can follow your institution’s process.",
      ],
      [
        "Will our existing data be changed here?",
        "No. This page does not connect to a student database, record attendance or collect fees.",
      ],
    ],
  },
  college: {
    title: "College",
    eyebrow: " Adon ERP FOR COLLEGES",
    headline: "A clearer rhythm",
    accent: "for every academic session.",
    description:
      "Connect the programme, the classroom and the college office around the practical work of an academic session.",
    perspective: "A college runs on coordinated decisions.",
    demoTitle: "Try a timetable conversation.",
    demoDescription:
      "Compare a proposed lesson with three illustrative sessions. Check room, tutor and group overlaps without creating a booking.",
    toolsTitle: "Connect the session with the supporting work.",
    tools: [
      {
        title: "Academic structure",
        body: "Explore classes, sections and the academic framework behind the session.",
        href: "/apps/education/academics",
      },
      {
        title: "Timetable planning",
        body: "Inspect the teaching timetable and its classroom context.",
        href: "/apps/education/timetable",
      },
      {
        title: "Examinations & results",
        body: "Look at assessment records and how results are presented.",
        href: "/apps/education/exams-results",
      },
      {
        title: "Fees & reporting",
        body: "Explore the office’s view of fee reporting and collections.",
        href: "/apps/education/fee-reports",
      },
    ],
    journeys: [
      {
        role: "Academic office",
        title: "Plan the session as a whole.",
        body: "Bring the academic structure, class timetable and examination context into the same planning conversation.",
        steps: [
          "Programme & class structure",
          "Teaching timetable",
          "Assessment context",
        ],
      },
      {
        role: "Faculty",
        title: "See the teaching commitment in context.",
        body: "Start from the group and teaching slot, then follow attendance and the assessment record.",
        steps: [
          "Teaching assignment",
          "Class attendance",
          "Assessment records",
        ],
      },
      {
        role: "Administration",
        title: "Keep the office close to the session.",
        body: "Read learner and fee context alongside the academic calendar when reviewing college operations.",
        steps: ["Student records", "Fees & collections", "Reports & follow-up"],
      },
    ],
    faqs: [
      [
        "Does the planner reserve a room?",
        "No. It is a local demonstration that checks only the three visible example sessions. It does not read or update a college timetable.",
      ],
      [
        "Can we discuss different programmes and sessions?",
        "Yes. Use your own programme, group, room and teaching arrangements as the starting point for an advisor walkthrough.",
      ],
      [
        "Is a conflict-free example a complete timetable approval?",
        "No. A full timetable may also need institutional rules, availability and other constraints that are outside this small example.",
      ],
    ],
  },
  university: {
    title: "University",
    eyebrow: " Adon ERP FOR UNIVERSITIES",
    headline: "A connected campus.",
    accent: "A considered academic journey.",
    description:
      "Explore the relationship between admissions, academic structure and the student journey, with space for the detail each university needs.",
    perspective: "One campus. Different responsibilities.",
    demoTitle: "Sketch an example semester.",
    demoDescription:
      "Choose from five fictional courses and compare their credits with an illustrative planning budget. This is not course registration or an eligibility decision.",
    toolsTitle: "Start with the available university previews.",
    tools: [
      {
        title: "University overview",
        body: "Explore the existing dashboard presentation and its campus-level context.",
        href: "/apps/university/university-dashboard",
      },
      {
        title: "Admissions journey",
        body: "Look at the existing university admissions showcase.",
        href: "/apps/university/university-admissions",
      },
      {
        title: "Academic planning context",
        body: "Explore the Education academic-structure preview as a starting point for discussion.",
        href: "/apps/education/academics",
      },
      {
        title: "Campus resource context",
        body: "Inspect the existing room-management showcase for a resource conversation.",
        href: "/apps/education/rooms",
      },
    ],
    journeys: [
      {
        role: "Academic office",
        title: "Begin with the shape of the institution.",
        body: "Use faculties, programmes, terms and courses to frame a discussion around your university’s academic structure.",
        steps: [
          "Institutional structure",
          "Term & curriculum context",
          "Student academic journey",
        ],
      },
      {
        role: "Admissions team",
        title: "Keep the applicant’s journey readable.",
        body: "Explore the admissions showcase, then discuss the handoff into student and academic records.",
        steps: [
          "Application context",
          "Admissions review",
          "Student-record handoff",
        ],
      },
      {
        role: "Campus leadership",
        title: "Follow the detail behind the overview.",
        body: "Use the campus overview to guide questions about academic activity, admissions and resource planning.",
        steps: ["University overview", "Academic activity", "Resource context"],
      },
    ],
    faqs: [
      [
        "Is the credit planner an official registration check?",
        "No. The courses, credits and budget are illustrative. It does not check prerequisites, degree requirements, academic standing or registration eligibility.",
      ],
      [
        "Which university previews can I explore here?",
        "The linked university presentations cover the dashboard and admissions. Academic planning on this page is an illustrative discussion tool; use a guided demo to explore your institution’s requirements.",
      ],
      [
        "Can we discuss our own academic rules?",
        "Yes. Bring programme structures, credit rules, term arrangements and reporting needs to the advisor conversation.",
      ],
    ],
  },
  lms: {
    title: "LMS",
    eyebrow: " Adon ERP FOR LEARNING EXPERIENCES",
    headline: "Give every lesson",
    accent: "a thoughtful next step.",
    description:
      "Explore a focused learning experience that brings the lesson, practice and progress into a clear, approachable flow.",
    perspective: "Design the experience around the learner.",
    demoTitle: "Step inside a sample learning studio.",
    demoDescription:
      "Read three short example lessons, try a knowledge check and mark local progress. No enrolment, grade or certificate is created.",
    toolsTitle: "Connect learning with its wider context.",
    tools: [
      {
        title: "eLearning showcase",
        body: "Explore the existing eLearning product presentation.",
        href: "/apps/website/elearning",
      },
      {
        title: "Learner records",
        body: "Look at the Education student-record showcase for institutional context.",
        href: "/apps/education/students",
      },
      {
        title: "Assessment context",
        body: "Explore the existing examinations and results presentation.",
        href: "/apps/education/exams-results",
      },
      {
        title: "Academic structure",
        body: "See the structure that can frame an institutional learning conversation.",
        href: "/apps/education/academics",
      },
    ],
    journeys: [
      {
        role: "Learners",
        title: "A clear place to begin, practice and reflect.",
        body: "The sample studio keeps a short lesson, a practice question and a visible next action together.",
        steps: ["Open the lesson", "Try the activity", "Reflect & continue"],
      },
      {
        role: "Educators",
        title: "Make the learning intention visible.",
        body: "Use the studio to discuss how lesson content, practice and feedback should work for your learners.",
        steps: ["Frame the goal", "Shape the practice", "Explain the feedback"],
      },
      {
        role: "Learning teams",
        title: "Think beyond the content list.",
        body: "Use the product conversation to explore course structure and how learning should connect to your institution’s context.",
        steps: ["Course structure", "Learner experience", "Progress context"],
      },
    ],
    faqs: [
      [
        "Is there a video playing in this preview?",
        "No. The working demo is a reading-based lesson studio with local progress and a sample knowledge check. No video player or streaming integration is implied.",
      ],
      [
        "Will completing the sample issue a certificate?",
        "No. Completion marks exist only in local component state and reset when the page is reloaded. They are not official learning records.",
      ],
      [
        "How can we discuss our actual courses?",
        "Bring course outlines, learner groups and assessment needs to an advisor walkthrough. The sample studio is a starting point for that conversation.",
      ],
    ],
  },
};
export const learners = [
  { id: "S-1001", label: "Learner 01" },
  { id: "S-1002", label: "Learner 02" },
  { id: "S-1003", label: "Learner 03" },
  { id: "S-1004", label: "Learner 04" },
];
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
    title: "Applied science",
  },
  {
    id: "EX-02",
    day: "Sunday",
    start: "10:00",
    end: "11:00",
    room: "Hall B",
    tutor: "Tutor B",
    group: "Humanities 1",
    title: "Communication",
  },
  {
    id: "EX-03",
    day: "Monday",
    start: "09:00",
    end: "10:00",
    room: "Hall B",
    tutor: "Tutor A",
    group: "Science 1",
    title: "Quantitative skills",
  },
];
export const courses = [
  {
    id: "EX-C101",
    title: "Academic communication",
    credits: 3,
    area: "Foundation",
  },
  {
    id: "EX-Q102",
    title: "Quantitative thinking",
    credits: 3,
    area: "Foundation",
  },
  {
    id: "EX-E103",
    title: "Environment & society",
    credits: 2,
    area: "Interdisciplinary",
  },
  { id: "EX-R104", title: "Research foundations", credits: 3, area: "Methods" },
  { id: "EX-D105", title: "Design & inquiry", credits: 3, area: "Elective" },
];
export const lessons = [
  {
    id: "goal",
    number: "01",
    title: "Start with a clear goal",
    duration: "Short reading",
    body: "A useful learning goal describes something a learner can do. In this sample, the goal is to explain an idea in your own words and connect it with a simple example.",
    prompt:
      "Choose a familiar idea. Write one sentence about what you would like someone to understand after a short lesson.",
    takeaway:
      "A visible goal gives the lesson and its practice a shared direction.",
  },
  {
    id: "practice",
    number: "02",
    title: "Make room for practice",
    duration: "Short reading",
    body: "Practice gives the learner a chance to use the idea. It can be a small explanation, a worked example or a comparison. This sample uses a short reflection rather than an uploaded assignment.",
    prompt:
      "Explain your chosen idea in your own words. Add one example that would help another person understand it.",
    takeaway: "The practice should connect directly with the goal.",
  },
  {
    id: "feedback",
    number: "03",
    title: "Connect feedback with the next step",
    duration: "Short reading",
    body: "Feedback is easier to use when it points to something specific. In this studio, the sample question explains why an answer fits the learning goal, then gives you a next step to try.",
    prompt:
      "Read your explanation again. Identify one part that is clear and one part where a more concrete example would help.",
    takeaway: "Reflection can turn feedback into a useful next action.",
  },
];
