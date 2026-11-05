import LiveDemoButton from "@/components/live-demo-button";
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
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universityDashboard") || "University Dashboard | AdonERP",
    description:
      "Explore an integrated university management experience for admissions, academics, students, examinations, fees, and graduation.",
    alternates: await getLocaleAlternates("/apps/university/university-dashboard"),
  };
}

// --- DATA FOR NEW HERO SCREENSHOT (ADMISSIONS) ---
const admissionsKpiData = [
  { label: "Applications", value: "1,384", color: "text-foreground" },
  { label: "Eligible", value: "997", color: "text-[#8b5cf6]" }, // Purple
  { label: "Offered", value: "281", color: "text-[#f59e0b]" }, // Amber
  { label: "Accepted", value: "0", color: "text-[#10b981]" }, // Green
  { label: "Admitted", value: "506", color: "text-[#10b981]" }, // Green
  { label: "Waiting list", value: "52", color: "text-[#f59e0b]" }, // Amber
];

// --- 100% UNIQUE CONTENT FOR PAGE SECTIONS ---
const fiveQuestions = [
  {
    title: "Enrolment Health",
    question: "Are we tracking our admission targets efficiently?",
    answer: "Stay ahead of your enrolment goals. This dashboard consolidates application pipelines, acceptance rates, and final admissions into a singular, real-time view so you never miss a target.",
    source: "Synced from Admissions & CRM modules",
  },
  {
    title: "Academic Velocity",
    question: "How smoothly is the curriculum progressing?",
    answer: "Monitor class capacity, faculty allocation, and student progress simultaneously. Instantly identify bottlenecks in course registration or exam scheduling before they impact the academic calendar.",
    source: "Synced from Academic Operations",
  },
  {
    title: "Financial Clearance",
    question: "Are tuition and fees being processed seamlessly?",
    answer: "Track real-time revenue generation, pending invoices, and scholarship disbursements. A unified ledger ensures your finance team stays aligned with student accounts at every step.",
    source: "Synced from Billing & Student Ledgers",
  },
  {
    title: "Resource Allocation",
    question: "Do our departments have exactly what they need?",
    answer: "Analyze student-to-faculty ratios, active department sizes, and programme workloads. Use live data to optimize resource distribution across the entire university ecosystem.",
    source: "Synced from HR & Departmental Records",
  },
  {
    title: "Campus Overview",
    question: "What does the current institutional landscape look like?",
    answer: "From on-leave counts to total active graduates, get the macro picture of your university's scale. It's the single source of truth for board meetings and strategic planning.",
    source: "Synced from the Central Registry",
  },
];

const faqs = [
  {
    q: "What exactly does the University Hub cover?",
    a: "The University Hub is a comprehensive, 360-degree command center. It integrates student admissions, academic schedules, financial ledgers, and graduation tracking into a single, unified dashboard experience.",
  },
  {
    q: "Is the data on this dashboard updated automatically?",
    a: "Yes. The dashboard is directly linked to your ERP system. Every number, from 'Applications' to 'Graduated', is populated in real-time based on the actions taken by your staff across various modules.",
  },
  {
    q: "Does this system support local financial compliance?",
    a: "Absolutely. The underlying finance module is built for local compliance, handling everything from specific tax deductions to local currency formatting (Lakh/Crore) and popular payment gateways.",
  },
  {
    q: "How does the multi-campus management work?",
    a: "You can manage multiple branches or campuses from a single login. A simple dropdown in the top bar allows you to switch contexts instantly, keeping each campus's data securely isolated yet easily accessible.",
  },
  {
    q: "Can we customize what data appears on the dashboard?",
    a: "The dashboard is designed to highlight the most critical metrics by default. However, individual users can often customize their views and permissions based on their specific administrative roles.",
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
              <Sparkles className="h-4 w-4" /> Next-Gen Campus Management
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Run your entire campus <span className="text-primary">from a single screen.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              From the first admission application to the final graduation clearance. Track applications, faculty workload, and financial health instantly—without switching tabs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LiveDemoButton />
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                View All Features
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (NOW SHOWING ADMISSIONS SCREENSHOT WITH BLUR) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">University Admissions</span>
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
              <div className="flex h-[600px] sm:h-[650px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    University <ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: "University Dashboard" },
                      { icon: FileText, label: "University Admissions", active: true },
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

                {/* Main Content Area (Admissions Design) */}
                <div className="flex-1 bg-background p-5 sm:p-6 overflow-hidden relative">
                  
                  <div className="relative z-0">
                    {/* Page Header */}
                    <div className="mb-6">
                      <h1 className="text-[20px] font-bold tracking-tight text-foreground">University admissions</h1>
                      <p className="mt-1.5 max-w-[850px] text-[11px] leading-5 text-muted-foreground">
                        A round per intake term: applications with SSC and HSC results and up to three programme choices, the admission test, a merit list, offers in merit order (quota seats first), and admission with the waiver the applicant's results earned.
                      </p>
                    </div>

                    {/* Top Controls */}
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                      <div className="w-full sm:w-[280px]">
                        <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Round</label>
                        <div className="relative">
                          <select className="w-full appearance-none rounded-md border border-border bg-card px-3 py-2 text-[12px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Spring 2027 — undergraduate admission</option>
                            <option>Autumn 2026 — undergraduate admission</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" /> New admission round
                      </button>
                    </div>

                    {/* Current Round Banner */}
                    <div className="mb-5 rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-[14px] font-bold text-foreground">Spring 2027 — undergraduate admission</h2>
                            <span className="rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-bold text-[#10b981]">Offers</span>
                            <span className="text-[10px] text-muted-foreground">
                              Intake term: Spring 2027 · Applications: 31 Aug 2026 – 10 Oct 2026 · test on 18 Oct 2026 · Form fee: 1,000
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <button className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                            Offer freed seats to the waiting list
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            Expire lapsed offers
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            Admit all accepted (0)
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            Finalise the round
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-5">
                      {admissionsKpiData.map((kpi, i) => (
                        <div key={i} className="rounded-lg border border-border bg-card p-3 shadow-sm flex flex-col justify-center">
                          <p className={`text-[20px] font-bold tracking-tight leading-none ${kpi.color}`}>{kpi.value}</p>
                          <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{kpi.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Fees Collected Card */}
                    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                      <p className="text-[22px] font-bold tracking-tight text-foreground">1,346,000</p>
                      <p className="mt-1 text-[10px] font-medium text-muted-foreground">Form fees collected</p>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "University Students" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[150px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full campus hub inside Adon ERP.
                      </p>
                      <LiveDemoButton />
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
                The core metrics<br />every dean<br />needs to see
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Managing a university means balancing hundreds of moving parts. Here is how the Hub translates raw ERP data into actionable insights for your leadership team.
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
              Engineered for the<br />realities of local campuses
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We didn't just translate a foreign software. Adon ERP was built from the ground up to handle the specific administrative, financial, and cultural nuances of educational institutions here.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Official Document Generation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Generate mark sheets, official transcripts, and certificates that strictly adhere to national education board formats, ready for immediate printing.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Localized Financial Views</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Financial dashboards automatically display figures in Lakh and Crore, eliminating mental math and ensuring clarity during budget meetings.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Multi-Branch Architecture</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Whether you run a main campus and an urban branch, or multiple colleges, switch between them effortlessly. Data remains completely isolated per branch.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Streamlined Admissions</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Track prospective students from their initial inquiry through to fee payment and student ID generation, all within a single, unified workflow.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Bilingual by Default</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Toggle the interface between English and Bangla instantly. The entire UI translates, ensuring all staff members can work comfortably.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Custom Academic Calendars</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Define your academic and fiscal years exactly as they are. The system adapts to your specific start and end dates, with no rigid constraints.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day in the life with the Hub</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The registrar opens the dashboard. A quick glance shows a spike in new applications for the upcoming Spring term." },
                  { time: "11:30 am", text: "The finance head reviews fee collections. The hub highlights a specific department lagging behind on tuition clearances." },
                  { time: "2:00 pm", text: "A department head checks faculty workload. Live data helps them reallocate classes to balance the teaching load." },
                  { time: "4:30 pm", text: "The admissions team finalizes a round. They generate the final merit list and send out offers directly from the platform." },
                  { time: "6:00 pm", text: "The Vice Chancellor reviews the overall student metrics from home, confirming the university is on track for its enrollment targets." }
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
                Frequently asked<br />questions<br />by administrators
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
                See how Adon ERP fits<br />your institution's workflow.
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Admissions Hub. We'll use sample data that mirrors your campus structure to show you exactly how it works.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <LiveDemoButton />
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
