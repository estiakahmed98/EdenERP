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
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universityDashboard") || "University Dashboard | AdonERP",
    description:
      "Explore an integrated university management experience for admissions, academics, students, examinations, fees, and graduation.",
    alternates: getLocaleAlternates("/apps/university/university-dashboard"),
  };
}

// --- DATA FROM FIRST SCREENSHOT ---
const kpiData = [
  { label: "Students in a programme", value: "7,538", color: "text-[#0ea5e9]" },
  { label: "Faculties", value: "7", color: "text-foreground" },
  { label: "Departments", value: "16", color: "text-foreground" },
  { label: "Programmes", value: "17", color: "text-foreground" },
  { label: "Graduated", value: "1,838", color: "text-[#9333ea]" },
  { label: "On leave", value: "85", color: "text-[#d97706]" },
];

const facultyData = [
  { name: "Faculty of Shari'ah & Islamic Studies", value: 998, width: "31%" },
  { name: "Faculty of Science & Technology", value: 0, width: "0%" },
  { name: "Faculty of Arts & Humanities", value: 861, width: "27%" },
  { name: "Faculty of Business Studies", value: 1116, width: "35%" },
  { name: "Faculty of Social Sciences", value: 939, width: "30%" },
  { name: "Faculty of Science & Engineering", value: 3129, width: "100%" },
  { name: "Faculty of Law", value: 495, width: "15%" },
];

const intakeData = [
  { term: "Spring 2022", value: 45, width: "4%" },
  { term: "Autumn 2022", value: 48, width: "4%" },
  { term: "Spring 2023", value: 844, width: "85%" },
  { term: "Autumn 2023", value: 786, width: "79%" },
  { term: "Spring 2024", value: 887, width: "90%" },
  { term: "Autumn 2024", value: 794, width: "80%" },
  { term: "Spring 2025", value: 922, width: "93%" },
  { term: "Autumn 2025", value: 833, width: "84%" },
];

// --- DATA FOR PAGE SECTIONS ---
const fiveQuestions = [
  {
    title: "Admissions (Intake)",
    question: "Are we bringing in the right students?",
    answer: "Every application, admission decision, and new student intake is tracked by term. Compare current intake against previous semesters to ensure your faculties are growing as planned.",
    source: "Comes from Admissions & Student Records",
  },
  {
    title: "Academic Progress",
    question: "Are students moving forward?",
    answer: "Course registrations, class schedules, and exam results tied to individual student profiles. See instantly if a cohort is falling behind or excelling.",
    source: "Comes from Academic & Examination modules",
  },
  {
    title: "Finance & Fees",
    question: "How much in fees is outstanding?",
    answer: "Invoices sent and fees collected. A fast view of which students have cleared their dues and which ones need a reminder, ensuring healthy cash flow for the university.",
    source: "Comes from Invoices (AR) and Student Accounts",
  },
  {
    title: "Faculty Workload",
    question: "Are our faculties adequately staffed?",
    answer: "Class allocations, active courses, and department sizes. Understand exactly how many students each faculty is serving to plan staffing and resources effectively.",
    source: "Comes from HR & Faculty Management",
  },
  {
    title: "Institution Size",
    question: "How big is the university right now?",
    answer: "Active students, graduated alumni, on-leave counts, and total programmes. The foundation of your institution's dashboard, updated in real-time.",
    source: "Comes from the central Student Registry",
  },
];

const faqs = [
  {
    q: "What is the Accounting Hub in Adon ERP?",
    a: "The Accounting Hub is the command center for your university's financial and operational health. It brings together admissions, academics, and finance into one unified dashboard.",
  },
  {
    q: "Where do the numbers on the hub come from?",
    a: "Every number is pulled directly from your ERP modules—Student Records, Admissions, Examinations, and Billing. There is no manual data entry required for this dashboard.",
  },
  {
    q: "Does it handle VAT in Bangladesh?",
    a: "Yes, the finance module handles local compliance, including VAT, tax deductions, and specific local payment gateways, automatically.",
  },
  {
    q: "Can we see amounts in lakh and crore?",
    a: "Yes. The dashboard supports local numbering formats. You can switch between international formats (Millions) and local formats (Lakh/Crore) with one click.",
  },
  {
    q: "Can one login manage more than one campus?",
    a: "Absolutely. If you have multiple campuses or branches, you can switch between them from the top bar. Each campus keeps its own isolated student and financial data.",
  },
];

export default function UniversityDashboardPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> University Management System
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              The whole state of your university, <span className="text-primary">on one screen.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Students, faculties, intake trends, and academic progress. Five numbers, read live from your ERP systems, show you the exact health of your institution in real-time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="btn-gradient rounded-lg px-6 py-3 text-[13px] font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                Book a demo
              </button>
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                See all modules
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">University Dashboard</span>
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
              <div className="flex h-[520px] sm:h-[560px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    University <ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: "University Dashboard", active: true },
                      { icon: FileText, label: "University Admissions" },
                      { icon: Users, label: "University Students" },
                      { icon: School, label: "Faculties & Programmes" },
                      { icon: BookOpen, label: "Courses & Curriculum" },
                      { icon: CalendarDays, label: "Class Schedule" },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts" },
                      { icon: Award, label: "Grades & Results" },
                      { icon: GraduationCap, label: "Graduation" },
                      { icon: Calendar, label: "Terms" },
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
                <div className="flex-1 bg-card p-5 sm:p-6 overflow-hidden relative">
                  
                  {/* Page Header & KPI Cards */}
                  <div className="relative z-0">
                    <div className="mb-5">
                      <h1 className="text-[18px] font-bold tracking-tight text-foreground">University dashboard</h1>
                      <p className="mt-1 text-[11px] text-muted-foreground">Current term: Autumn 2026 (1 Jul 2026 – 31 Dec 2026)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
                      {kpiData.map((kpi, i) => (
                        <div key={i} className="rounded-lg border border-border bg-card p-3 shadow-sm">
                          <p className={`text-[20px] font-bold tracking-tight leading-none ${kpi.color}`}>{kpi.value}</p>
                          <p className="mt-2 text-[10px] font-medium leading-tight text-muted-foreground">{kpi.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Blurred Charts Area */}
                    <div className="grid gap-4 lg:grid-cols-2 blur-[3px] opacity-60 pointer-events-none select-none">
                      {/* Students by Faculty */}
                      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                        <h3 className="mb-4 text-[13px] font-bold text-foreground">Students by faculty</h3>
                        <div className="space-y-3">
                          {facultyData.map((faculty, i) => (
                            <div key={i}>
                              <div className="mb-1 flex items-center justify-between text-[10px]">
                                <span className="text-muted-foreground truncate mr-2">{faculty.name}</span>
                                <span className="font-bold text-foreground">{faculty.value.toLocaleString()}</span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div className="h-full rounded-full bg-primary" style={{ width: faculty.width }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Intake by Term */}
                      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                        <h3 className="mb-4 text-[13px] font-bold text-foreground">Intake by term (still enrolled)</h3>
                        <div className="space-y-2">
                          {intakeData.map((term, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-[70px] shrink-0 text-[10px] text-muted-foreground">{term.term}</span>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div className="h-full rounded-full bg-[#9333ea]" style={{ width: term.width }} />
                              </div>
                              <span className="w-6 shrink-0 text-right text-[10px] font-bold text-foreground">{term.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below KPIs */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[180px] bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/95 to-transparent backdrop-blur-[2px] flex flex-col items-center justify-end pb-10">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/60 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        You're seeing a preview. The full hub is yours to explore.
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

      {/* FIVE QUESTIONS SECTION */}
      <section className="border-t border-border bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
                Five questions any<br />university leader<br />actually asks
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                A dashboard is only useful if you know what to do with it. Here is what each figure on the hub means, where it comes from, and when it should make you pick up the phone.
              </p>
            </div>
            
            <div className="space-y-8">
              {fiveQuestions.map((item, i) => (
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
              Made for the way universities are<br />run in Bangladesh
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              Most academic software is written somewhere else and adapted for us later. Adon ERP started here, so the paperwork you actually handle every day has a proper place in it.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Transcripts & Grade Sheets</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The exact format your university uses. Print official transcripts and grade sheets that comply with local education board standards.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Lakh, crore, not millions</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The hub shows 92.2 Cr and 5.8 L, with the full amount underneath. Nobody has to convert numbers in their head.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">More than one campus</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">A main campus and a city branch, or a college and a university. Switch campus from the top bar. Each keeps its own books.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Admission & Fees</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Track applications, process admission fees, and generate student IDs directly from the dashboard.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">English or Bangla</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Switch the language from the top bar. The interface changes, and the underlying records stay intact.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Your fiscal year, your dates</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Close the year when your university closes it, whether that is June like most firms here or December for a foreign parent.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A normal Tuesday with the hub</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:30 am", text: "The admissions team opens the hub. Applications are up since last week, and the top five faculties show exactly which are filling up." },
                  { time: "11:00 am", text: "The examination controller reviews pending grades. The hub shows which faculty submissions are overdue before the board meeting." },
                  { time: "2:30 pm", text: "The finance office sends a fee reminder. The hub shows which students have cleared their dues." },
                  { time: "4:00 pm", text: "A new semester's course registration opens. The dashboard updates instantly with new enrolments." },
                  { time: "6:15 pm", text: "The Vice Chancellor checks the hub from home. Today's numbers are already in place." }
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
                Questions we get<br />about the<br />University Hub
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
                Tell us how your university runs.<br />We will show you this screen set up like it.
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                A live demo in English or Bangla, using sample data close to your own, with time for your academic questions.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button className="rounded-lg bg-card px-6 py-3 text-[13px] font-bold text-secondary transition-transform hover:-translate-y-0.5 hover:bg-muted shadow-lg">
                  Book a demo
                </button>
                <button className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-white/20">
                  Explore the dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}