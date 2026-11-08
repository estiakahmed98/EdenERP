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
  Briefcase,
  Building,
  Settings,
  Home,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.classSchedule") || "Class Schedule | AdonERP",
    description:
      "Manage sections, timetables, room allocations, and faculty workloads in one unified hub.",
    alternates: await getLocaleAlternates("/apps/university/class-schedule"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const scheduleData = [
  {
    section: "ALL 1101 §1",
    title: "Arabic Grammar (Nahw) I",
    teacher: "Shahriar Nazmul Rahman",
    times: "Sat 08:30–09:50 · ABI-105; Mon 08:30–09:50 · ABI-105",
    cohort: "BA-ALL · 2027-SPR · A",
    seats: "0 / 18",
    status: "Open",
  },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Conflict-Free Scheduling",
    question: "How do we prevent double-booking?",
    answer: "The system automatically checks for clashes in room availability, teacher schedules, and student cohorts. If a conflict exists, the schedule is refused, saving hours of manual checking.",
    source: "Synced from Scheduling Engine",
  },
  {
    title: "Cohort Management",
    question: "Can we schedule for specific groups?",
    answer: "Group students by programme, intake year, and section. The system ensures every student in a cohort gets a seat without overlapping with their other required classes.",
    source: "Synced from Academic Operations",
  },
  {
    title: "Room & Resource Tracking",
    question: "Are we using our campus efficiently?",
    answer: "Track exactly which rooms are in use, their capacity, and the total room-hours consumed per week. Identify underutilized spaces and optimize your campus footprint.",
    source: "Synced from Campus Services",
  },
  {
    title: "Faculty Workload",
    question: "Are teachers overburdened?",
    answer: "The system tracks how many sections and hours each teacher is assigned to. The 'Faculty load' tab gives department heads an instant view of teaching distribution.",
    source: "Synced from HR & Faculty Management",
  },
];

const faqs = [
  {
    q: "Can we schedule a lab without a theory section?",
    a: "No. The system enforces a rule that a lab section must be paired with its corresponding theory section. This ensures students are properly enrolled in both components.",
  },
  {
    q: "How does the 'Only teacher TBA' filter work?",
    a: "If a section is created before a teacher is assigned, it will appear under this filter. Administrators can quickly see which classes still need a faculty member.",
  },
  {
    q: "What happens if a room is under maintenance?",
    a: "You can mark a room as unavailable in the Setup tab. The scheduling engine will automatically avoid assigning any sections to that room during the blocked period.",
  },
  {
    q: "Can we view a visual timetable?",
    a: "Yes. Clicking on the 'Timetable' tab provides a grid view of the week, showing exactly where and when every section is meeting, color-coded by department.",
  },
];

export default function UniversityClassSchedulePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Intelligent Timetable Management
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Every class. Every room. <span className="text-primary">Perfectly timed.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Eliminate scheduling conflicts, manage room capacities, and balance faculty workloads with a powerful, automated engine.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LiveDemoButton />
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                Explore Features
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (Class Schedule Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Class Schedule</span>
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
                      { icon: CalendarDays, label: "Class Schedule", active: true },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts" },
                      { icon: Award, label: "Grades & Results" },
                      { icon: CalendarDays, label: "Exams & Attendance" },
                      { icon: GraduationCap, label: "Outcomes (OBE)" },
                      { icon: Briefcase, label: "Faculty & Workload" },
                      { icon: Building, label: "Campus Services" },
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
                    <div className="mb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Class Schedule</h1>
                        <p className="mt-1.5 max-w-[750px] text-[12px] leading-5 text-muted-foreground">
                          A term's sections with their times, rooms and teachers. A section can be kept for one cohort (programme × intake × group) and for men or women only; a lab is paired with its theory section. A clash of room, teacher or cohort is refused.
                        </p>
                      </div>
                      <div className="shrink-0 mt-2 sm:mt-0">
                        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Term</label>
                        <div className="relative">
                          <select className="w-[180px] appearance-none rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Spring 2027 - Registration</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-foreground leading-none">1,585</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">sections</p>
                        <p className="text-[10px] text-muted-foreground/70">1,585 open</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#0ea5e9] leading-none">48,113</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">seats</p>
                        <p className="text-[10px] text-muted-foreground/70">7,124 taken</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#21a816] leading-none">0</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">without class times</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#d97706] leading-none">1</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">teacher to be announced</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#9333ea] leading-none">120 / 133</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">rooms in use</p>
                        <p className="text-[10px] text-muted-foreground/70">4,046.5 room-hours a week</p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                        Sections
                      </button>
                      {["Timetable", "Planning", "Faculty load", "Setup"].map((tab) => (
                        <button key={tab} className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Filter Box (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm opacity-60 blur-[2px] pointer-events-none">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-3">
                        {["Department", "Cohort programme", "Status"].map((label, i) => (
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
                      <div className="flex items-center gap-4 mt-4">
                        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" /> Only without class times
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" /> Only teacher TBA
                        </label>
                        <button className="ml-auto flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                          <Plus className="h-3.5 w-3.5" /> New section
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "Class Schedule" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[200px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex w-full flex-col items-center px-4">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full scheduling engine.
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

      {/* FEATURES SECTION */}
      <section className="border-t border-border bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
                Smart scheduling<br />for complex<br />campuses
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Manual timetabling is a recipe for disaster. The Adon ERP scheduling engine handles thousands of data points to create a flawless academic week.
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
              Optimized for the<br />local campus reality
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We know that university scheduling isn't just about time. It's about space, resources, and the physical limits of your campus. Adon ERP is built to respect those limits.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Room Capacity Matching</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system prevents you from assigning a 100-student section to a 30-seat classroom. Capacity rules are enforced automatically.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Room Utilization Metrics</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">See exactly how many room-hours your campus is consuming per week. Use this data to decide if you need to build more classrooms or consolidate.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Lab & Theory Pairing</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system understands that a physics lab requires a corresponding theory class. It automatically links them, ensuring students don't face schedule clashes.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Cohort-Based Allocation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Schedule for an entire intake group at once. The system guarantees that every student in that cohort has a free slot for the assigned section.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Faculty Load Balancing</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The 'Faculty load' tab visualizes teaching distribution. Identify which teachers are overloaded and which have room to take on more sections.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Visual Timetable Grid</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Switch to the 'Timetable' tab to see a visual representation of the week. Instantly spot free periods and potential bottlenecks in the schedule.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day for the scheduling team</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The team reviews the 'Faculty load' tab and realizes Dr. Rahman is assigned to too many morning classes. They begin reallocating." },
                  { time: "10:30 am", text: "A new section for 'Advanced Physics' is needed. The team uses 'New section' to create it, assigning a room and a time slot." },
                  { time: "1:00 pm", text: "A conflict alert pops up. The team realizes a lab was booked in a room already reserved for a seminar. They choose an alternative room." },
                  { time: "3:00 pm", text: "The scheduling team filters by 'Only teacher TBA' to find classes that still need a faculty member assigned. They fill the gaps." },
                  { time: "5:00 pm", text: "The Spring 2027 timetable is finalized. The team publishes it, and students can now view their exact schedule in their portals." }
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
                Questions about<br />scheduling<br />and timetables
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
                Ready to optimize<br />your campus timetable?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Scheduling module. We'll show you how to eliminate conflicts and maximize room usage.
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