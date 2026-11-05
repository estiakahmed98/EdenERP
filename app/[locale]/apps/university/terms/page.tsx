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
  Settings,
  Star,
  Edit2,
  Briefcase,
  Building,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.terms") || "Terms | AdonERP",
    description:
      "Manage academic terms, registration windows, and grading periods in one unified hub.",
    alternates: await getLocaleAlternates("/apps/university/terms"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const termsData = [
  {
    name: "Autumn 2027",
    code: "2027-AUT",
    dates: "1 Jul 2027 – 31 Dec 2027",
    reg: "10 Jun 2027 – 30 Jun 2027",
    addDrop: "14 Jul 2027",
    withdrawal: "8 Sept 2027",
    status: "Planning",
    intake: "0",
  },
  {
    name: "Spring 2027",
    code: "2027-SPR",
    dates: "1 Jan 2027 – 30 Jun 2027",
    reg: "11 Dec 2026 – 31 Dec 2026",
    addDrop: "14 Jan 2027",
    withdrawal: "11 Mar 2027",
    status: "Registration",
    intake: "506",
  },
  {
    name: "Autumn 2026",
    code: "2026-AUT",
    current: true,
    dates: "1 Jul 2026 – 31 Dec 2026",
    reg: "10 Jun 2026 – 30 Jun 2026",
    addDrop: "14 Jul 2026",
    withdrawal: "8 Sept 2026",
    status: "Running",
    intake: "894",
  },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Term Lifecycle",
    question: "How do we manage the transition between semesters?",
    answer: "The system enforces a strict lifecycle: Planning → Registration → Running → Grading → Closed. Each stage unlocks specific features, ensuring students can't register during grading, and grades can't be entered during planning.",
    source: "Synced from Academic Calendar",
  },
  {
    title: "Registration Windows",
    question: "Can we control when students can add or drop classes?",
    answer: "Absolutely. You define the exact dates for registration opening, the last day to add/drop, and the final withdrawal deadline. The system automatically blocks any actions outside these windows.",
    source: "Synced from Registration Rules",
  },
  {
    title: "Refund Policies",
    question: "How are refunds calculated based on the term dates?",
    answer: "The term configuration includes a refund schedule by week. If a student withdraws, the system automatically calculates the refund amount based on exactly which week of the term they are in.",
    source: "Synced from Finance Modules",
  },
  {
    title: "Yearly Rollover",
    question: "Is it easy to set up the next academic year?",
    answer: "Yes. Use the 'Create the year's terms' button to instantly generate the full academic calendar for the upcoming year, copying over the structure and dates from the previous year.",
    source: "Synced from System Automation",
  },
];

const faqs = [
  {
    q: "Can we have overlapping terms?",
    a: "Yes, especially if you run different programmes (e.g., a summer school running alongside the main Autumn term). The system allows overlapping dates as long as they are defined in separate term records.",
  },
  {
    q: "What happens when a term is 'Closed'?",
    a: "Once a term is closed, it becomes a permanent historical record. No new registrations, grades, or financial adjustments can be made against that term without reopening it via admin override.",
  },
  {
    q: "How does the system know which term is 'Current'?",
    a: "The system looks at the defined dates. The term containing today's date is automatically highlighted as 'Current' in the dashboard, making it clear for administrators.",
  },
  {
    q: "Can we customize the refund weeks?",
    a: "Yes. The 'Refund by week' settings allow you to specify exactly what percentage of fees is refundable during week 1, week 2, etc., up to the withdrawal deadline.",
  },
];

export default function UniversityTermsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Academic Calendar Management
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Every semester. <span className="text-primary">Perfectly timed.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Control registration windows, add/drop deadlines, and grading periods. A single source of truth for your entire academic calendar.
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

          {/* Dashboard App Mockup (Terms Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Terms</span>
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
              <div className="flex h-[650px] relative">
                
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
                      { icon: BookOpen, label: "Courses & Curriculum" },
                      { icon: CalendarDays, label: "Class Schedule" },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts" },
                      { icon: Award, label: "Grades & Results" },
                      { icon: CalendarDays, label: "Exams & Attendance" },
                      { icon: GraduationCap, label: "Outcomes (OBE)" },
                      { icon: Briefcase, label: "Faculty & Workload" },
                      { icon: Building, label: "Campus Services" },
                      { icon: Calendar, label: "Terms", active: true },
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
                    {/* Page Header */}
                    <div className="mb-5">
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">Terms</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        Each term carries the dates that registration, billing and refunds obey: when registration opens and closes, the last day of add/drop, the withdrawal deadline, and the refund by week. A term moves Planning → Registration → Running → Grading → Closed.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      <div className="relative mr-2">
                        <select className="w-[100px] appearance-none rounded-md border border-border bg-card px-2.5 py-1.5 text-[12px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                          <option>2027</option>
                          <option>2026</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <CalendarDays className="h-3.5 w-3.5" /> Create the year's terms
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" /> New term
                      </button>
                    </div>

                    {/* Table Card (Blurred) */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden opacity-60 blur-[2px] pointer-events-none">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-semibold">TERM</th>
                            <th className="px-4 py-3 font-semibold">DATES</th>
                            <th className="px-4 py-3 font-semibold">REGISTRATION</th>
                            <th className="px-4 py-3 font-semibold">ADD/DROP UNTIL</th>
                            <th className="px-4 py-3 font-semibold">WITHDRAWAL UNTIL</th>
                            <th className="px-4 py-3 font-semibold">STATUS</th>
                            <th className="px-4 py-3 font-semibold text-right">INTAKE</th>
                            <th className="px-4 py-3 font-semibold"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {termsData.map((term, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-3">
                                <div className="flex flex-col">
                                  <span className="font-bold text-foreground flex items-center gap-1.5">
                                    {term.name}
                                    {term.current && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">Current</span>}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">{term.code}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">{term.dates}</td>
                              <td className="px-4 py-3 text-muted-foreground">{term.reg}</td>
                              <td className="px-4 py-3 text-muted-foreground">{term.addDrop}</td>
                              <td className="px-4 py-3 text-muted-foreground">{term.withdrawal}</td>
                              <td className="px-4 py-3">
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  term.status === "Planning" ? "bg-muted text-muted-foreground" :
                                  term.status === "Registration" ? "bg-[#0ea5e9]/10 text-[#0ea5e9]" :
                                  "bg-[#21a816]/10 text-[#21a816]"
                                }`}>{term.status}</span>
                              </td>
                              <td className="px-4 py-3 text-right text-muted-foreground">{term.intake}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                                    <Star className="h-3.5 w-3.5" />
                                  </button>
                                  <button className="rounded-md border border-border px-2 py-1 text-[10px] font-medium text-primary hover:bg-muted transition-colors">
                                    {term.status === "Planning" ? "Open registration" : 
                                     term.status === "Registration" ? "Back to planning" : 
                                     "Start grading"}
                                  </button>
                                  <button className="rounded-md border border-border p-1.5 text-primary hover:bg-muted transition-colors">
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "Terms" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[185px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full academic calendar.
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
                A calendar that<br />runs itself
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Forget manually tracking dates. The Terms module enforces the rules of your academic calendar, ensuring consistency across registration, billing, and grading.
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
              Built for complex<br />academic schedules
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              Every institution runs on a different calendar. Adon ERP gives you the flexibility to define your terms exactly as they are, without rigid constraints.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Strict Lifecycle Enforcement</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Once a term moves to 'Grading', students can no longer register. The system automatically locks features based on the term's current status.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Refund Schedule Mapping</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Define exactly how much is refunded based on the withdrawal week. The finance module automatically calculates this when a student drops out.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Automated Year Generation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Tired of setting up terms one by one? Use the 'Create the year's terms' tool to generate your entire academic calendar in seconds.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Clear Registration Windows</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Set specific dates for when registration opens and closes. The system displays countdown timers to students and blocks access outside those dates.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Add/Drop Deadlines</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Define the exact date when students can no longer modify their schedule. This prevents chaos later in the semester and locks in accurate billing.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Current Term Highlighting</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system automatically detects the current date and highlights the active term, ensuring administrators always know which term they are operating in.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day for the registrar</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The registrar opens the Terms page. The 'Autumn 2027' term is currently in 'Planning' status. They review the dates." },
                  { time: "10:30 am", text: "They click 'Open registration' on the Autumn 2027 term. The system updates the status and emails all eligible students." },
                  { time: "1:00 pm", text: "Spring 2027 is in 'Registration' phase. The registrar checks the intake number and sees 506 students have already registered." },
                  { time: "3:00 pm", text: "A student calls wanting to withdraw from a course. The registrar checks the withdrawal date for the current term and approves the request." },
                  { time: "5:00 pm", text: "The registrar uses 'Create the year's terms' to instantly generate the full calendar for 2028, saving hours of manual setup." }
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
                Questions about<br />academic terms
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
                Ready to master<br />your academic calendar?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Terms module. We'll show you how to automate your registration windows and grading periods.
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