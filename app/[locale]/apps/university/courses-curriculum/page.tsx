import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  Sparkles,
  Users,
  WalletCards,
  School,
  FileText,
  CreditCard,
  Award,
  Calendar,
  Globe,
  Plus,
  Upload,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.coursesCurriculum") || "Courses & Curriculum | AdonERP",
    description:
      "Manage course catalogs, prerequisites, and programme curricula in one unified hub.",
    alternates: await getLocaleAlternates("/apps/university/courses-curriculum"),
  };
}

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Course Catalog",
    question: "Is the course library easy to navigate?",
    answer: "Store every course with its unique code, title, and description. Tag them with prerequisites and equivalencies so students and advisors always know the exact requirements.",
    source: "Synced from Academic Operations",
  },
  {
    title: "Curriculum Mapping",
    question: "How do we ensure students follow the right path?",
    answer: "The system links courses to specific programmes and catalog years. This guarantees that a student's degree audit is always based on the exact rules they enrolled under.",
    source: "Synced from Curriculum Modules",
  },
  {
    title: "Prerequisites & Equivalencies",
    question: "Can we manage complex course dependencies?",
    answer: "Easily define what a student must complete before taking a course. If a course changes code, the system tracks the equivalency so no student is penalized.",
    source: "Synced from Registrar Rules",
  },
  {
    title: "Publication Control",
    question: "When does a new curriculum go live?",
    answer: "Draft curriculums internally, review them, and publish them when ready. The system automatically applies the published version to the relevant cohorts.",
    source: "Synced from Approval Workflows",
  },
];

const faqs = [
  {
    q: "Can we bulk import our existing course catalog?",
    a: "Yes. The 'Import' button allows you to upload a CSV file containing hundreds of courses, their codes, and prerequisites, saving weeks of manual data entry.",
  },
  {
    q: "How are 'active' courses different from inactive ones?",
    a: "Active courses are currently being offered to students. Inactive courses remain in the system for historical records but cannot be enrolled in by new students.",
  },
  {
    q: "Can a course have multiple prerequisites?",
    a: "Yes. The system allows you to chain multiple prerequisites together (e.g., Course A AND Course B, or Course A OR Course C) to match your exact academic rules.",
  },
  {
    q: "What happens if a curriculum changes?",
    a: "If you update a curriculum, you can choose whether it applies to new intakes only or existing students. The catalog year system ensures clarity for everyone.",
  },
];

export default function UniversityCoursesCurriculumPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Course & Curriculum Management
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Map every course. <span className="text-primary">Guide every degree.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              From prerequisites to published curriculums, manage the entire academic journey with a single source of truth.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="btn-gradient rounded-lg px-6 py-3 text-[13px] font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                Request a Demo
              </button>
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                Explore Features
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (Courses & Curriculum Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Courses & Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <Globe className="h-3 w-3" /> English
                  </div>
                  <div className="flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <School className="h-3 w-3" /> National University <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* App Body */}
              <div className="flex h-[600px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    University <ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: "University Dashboard" },
                      { icon: FileText, label: "University Admissions" },
                      { icon: Users, label: "University Students" },
                      { icon: School, label: "Faculties & Programmes" },
                      { icon: BookOpen, label: "Courses & Curriculum", active: true },
                      { icon: CalendarDays, label: "Class Schedule" },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts" },
                      { icon: Award, label: "Grades & Results" },
                      { icon: CalendarDays, label: "Exams & Attendance" },
                      { icon: GraduationCap, label: "Outcomes (OBE)" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[12px] font-medium transition-colors ${
                          item.active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className={`h-4 w-4 ${item.active ? "text-primary-foreground" : "text-muted-foreground/70"}`} />
                        {item.label}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-background p-5 sm:p-6 overflow-hidden relative">
                  
                  <div className="relative z-0">
                    {/* Page Header & Tabs */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Courses & Curriculum</h1>
                        <p className="mt-1.5 max-w-[650px] text-[12px] leading-5 text-muted-foreground">
                          The course catalog with prerequisites, corequisites and equivalencies, and each programme's curriculum per catalog year. A student follows the latest published curriculum of their programme at or before their own catalog year.
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                          Courses
                        </button>
                        <button className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          Curricula
                        </button>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-[28px] font-bold tracking-tight text-foreground leading-none">772</p>
                        <p className="mt-1 text-[12px] font-medium text-muted-foreground">courses</p>
                        <p className="text-[11px] text-muted-foreground/70">772 active</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-[28px] font-bold tracking-tight text-[#9333ea] leading-none">465</p>
                        <p className="mt-1 text-[12px] font-medium text-muted-foreground">with a prerequisite</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-[28px] font-bold tracking-tight text-[#0ea5e9] leading-none">9</p>
                        <p className="mt-1 text-[12px] font-medium text-muted-foreground">equivalencies</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-[28px] font-bold tracking-tight text-[#21a816] leading-none">19 / 19</p>
                        <p className="mt-1 text-[12px] font-medium text-muted-foreground">curricula published</p>
                      </div>
                    </div>

                    {/* Filter Box */}
                    <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-3">
                        {["Department", "Type", "Status"].map((label, i) => (
                          <div key={i}>
                            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{label}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                <option>All</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Search</label>
                          <input type="text" placeholder="Code or title" className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                          <Plus className="h-3.5 w-3.5" /> New course
                        </button>
                        <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                          <Upload className="h-3.5 w-3.5" /> Import
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "Courses & Curriculum" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[175px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full course catalog.
                      </p>
                      <button className="btn-gradient rounded-lg px-8 py-2.5 text-[13px] font-bold shadow-xl transition-transform hover:-translate-y-0.5">
                        Book a live demo
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="border-t border-border bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
                Precision in every<br />credit and<br />prerequisite
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Academic rigor requires exact rules. The Curriculum module gives you the tools to define, track, and enforce every academic requirement seamlessly.
              </p>
            </div>
            
            <div className="space-y-8">
              {featureQuestions.map((item, i) => (
                <div key={i} className="grid gap-4 border-b border-border pb-8 sm:grid-cols-[200px_1fr]">
                  <div>
                    <p className="text-[13px] font-bold text-primary">{item.title}</p>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-foreground">{item.question}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.answer}</p>
                    <p className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
                      <LayoutDashboard className="h-3.5 w-3.5" /> {item.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MADE FOR BANGLADESH SECTION */}
      <section className="bg-gray-bg border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="mb-10">
            <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
              Built for the realities of<br />academic governance
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              A curriculum is a legal document. Adon ERP ensures your course catalog is accurate, up-to-date, and always reflects the rules your institution has approved.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Catalog Year Integrity</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">When rules change, old students don't get caught off guard. The system rigidly enforces the catalog year a student enrolled under.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Equivalency Tracking</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">If a course is renamed or replaced, map the old course to the new one. The system automatically satisfies prerequisites for affected students.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Departmental Ownership</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Every course belongs to a specific department. This ensures clear ownership, accurate budgeting, and seamless faculty assignments.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Pre/Co-requisite Logic</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Define complex prerequisite chains. Students are automatically blocked from registering for courses if they haven't met the exact requirements.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Bulk Course Import</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Save hundreds of hours by importing your existing course catalog via a simple CSV file. The system validates codes and prerequisites automatically.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Active vs Inactive Status</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Retire old courses without deleting them. Marking a course as inactive removes it from registration options while preserving historical grades.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day for the Registrar</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The Registrar checks the dashboard and sees that all 19 programmes have published their curriculums for the upcoming year." },
                  { time: "11:00 am", text: "A department proposes a new course. The Registrar uses the 'New course' button to add it to the catalog and sets its prerequisites." },
                  { time: "1:30 pm", text: "A student is confused because a required course changed its code. The Registrar checks the equivalency tracker and confirms the student is fine." },
                  { time: "3:00 pm", text: "The university is launching a new faculty. The Registrar creates new departments and bulk-imports 50 new courses for the new programmes." },
                  { time: "5:00 pm", text: "Before leaving, the Registrar publishes the finalized Spring 2027 curricula, locking the rules for all incoming students." }
                ].map((item, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-card bg-primary ring-4 ring-primary/10" />
                    <p className="text-[12px] font-bold text-foreground">{item.time}</p>
                    <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
                Questions about<br />the curriculum<br />module
              </h2>
            </div>
            <div className="border-t border-border">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-border py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[14px] font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-open:rotate-180 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <p className="max-w-[700px] pb-1 pt-4 text-[13px] leading-6 text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-background pb-16 pt-4">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[24px] bg-secondary px-6 py-16 text-center text-secondary-foreground sm:px-12 md:py-20 shadow-2xl shadow-secondary/20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border-[50px] border-white/[0.03]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full border-[50px] border-white/[0.03]" />
            
            <div className="relative mx-auto max-w-[700px]">
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-0.04em]">
                Ready to master your<br />course catalog?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Curriculum module. We'll show you how easy it is to enforce prerequisites and publish programs.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button className="rounded-lg bg-card px-6 py-3 text-[13px] font-bold text-secondary transition-transform hover:-translate-y-0.5 hover:bg-muted shadow-lg">
                  Schedule a Walkthrough
                </button>
                <button className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-white/20">
                  Browse All Modules
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}