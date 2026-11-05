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
  Briefcase,
  Building,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.registration") || "Registration | AdonERP",
    description:
      "Manage student registrations, advising holds, and course waivers in one unified hub.",
    alternates: await getLocaleAlternates("/apps/university/registration"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const registrationData = [
  { id: "ALL231007", name: "Nafisa Chowdhury", cgpa: "2.90", credits: "106", status: "Advising pending" },
  { id: "ALL231014", name: "Habib Islam", cgpa: "2.96", credits: "106", status: "Advising pending" },
  { id: "ALL231020", name: "Nayeem Kabir", cgpa: "2.91", credits: "106", status: "Advising pending" },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Advising Workflows",
    question: "How do we manage advisor approvals efficiently?",
    answer: "The system routes students to their assigned advisors based on their programme. Advisors can review, approve, or turn back registrations in bulk, ensuring no student is left waiting.",
    source: "Synced from Advising Modules",
  },
  {
    title: "Hold Management",
    question: "What happens if a student has an unpaid fee or a library hold?",
    answer: "The system automatically blocks registration if an active hold exists. Once the respective department clears the hold in their module, the student is instantly allowed to register.",
    source: "Synced from Student Accounts",
  },
  {
    title: "Prerequisite & Limit Checks",
    question: "Can we prevent students from taking the wrong courses?",
    answer: "Yes. The registration engine verifies that all prerequisites are met and that the student hasn't exceeded the maximum credit limit for the term before accepting the registration.",
    source: "Synced from Curriculum Rules",
  },
  {
    title: "Waitlist Automation",
    question: "What if a class is full?",
    answer: "If a section reaches capacity, the student is automatically placed on a waitlist. When another student drops the course, the system automatically promotes the first person on the waitlist.",
    source: "Synced from Enrollment Engine",
  },
];

const faqs = [
  {
    q: "Can students register for multiple terms at once?",
    a: "No. The system enforces registration windows. Students can only register for courses within the active term's designated registration window.",
  },
  {
    q: "How are senior students prioritized?",
    a: "The system uses a 'wave' registration system. Seniors are given an earlier registration window than juniors or freshmen, ensuring they get the seats they need to graduate on time.",
  },
  {
    q: "Can an advisor approve a student outside their department?",
    a: "Generally, no. Advisors are mapped to specific cohorts or departments. However, the Registrar's office always retains the ability to approve registrations across the board.",
  },
  {
    q: "What is a 'time clash'?",
    a: "A time clash occurs when a student tries to register for two courses that occur at the same time. The system detects this and blocks the registration to ensure students don't miss classes.",
  },
];

export default function UniversityRegistrationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Seamless Course Registration
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              A frictionless start <span className="text-primary">to every semester.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              From advising approvals to automatic waitlist management, streamline the entire registration process for students and faculty alike.
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

          {/* Dashboard App Mockup (Registration Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Registration</span>
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
                      { icon: Calendar, label: "Registration", active: true },
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
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Registration</h1>
                        <p className="mt-1.5 max-w-[750px] text-[12px] leading-5 text-muted-foreground">
                          Students register for a term's sections in waves (seniors first). A hold, a missing advisor approval, an unmet prerequisite, a time clash or the credit limit stops a registration; a full section puts the student on its waitlist, and a drop moves the first waiting student up at once.
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

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <button className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                        Registration desk
                      </button>
                      <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                        Advising
                      </button>
                      {["Holds", "Windows", "Overview"].map((tab) => (
                        <button key={tab} className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Filter Box (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm opacity-60 blur-[2px] pointer-events-none mb-6">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-2">
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Status</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>Advising pending</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Advisor</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>All</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Programme</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>All</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Search</label>
                          <input type="text" placeholder="Student number or name" className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm" />
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-3">1406 pending · 0 approved · 0 turned back</p>
                    </div>

                    {/* Table Area (Blurred) */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden opacity-60 blur-[2px] pointer-events-none">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-semibold">STUDENT NO.</th>
                            <th className="px-4 py-3 font-semibold">NAME</th>
                            <th className="px-4 py-3 font-semibold text-center">CGPA</th>
                            <th className="px-4 py-3 font-semibold text-center">CREDITS EARNED</th>
                            <th className="px-4 py-3 font-semibold">STATUS</th>
                            <th className="px-4 py-3 font-semibold text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {registrationData.map((row, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-3 font-medium text-foreground">{row.id}</td>
                              <td className="px-4 py-3 text-muted-foreground">{row.name}</td>
                              <td className="px-4 py-3 text-center text-muted-foreground">{row.cgpa}</td>
                              <td className="px-4 py-3 text-center text-muted-foreground">{row.credits}</td>
                              <td className="px-4 py-3">
                                <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">{row.status}</span>
                              </td>
                              <td className="px-4 py-3 text-right flex items-center justify-end gap-1.5">
                                <button className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-primary shadow-sm hover:bg-muted">Approve</button>
                                <button className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-primary shadow-sm hover:bg-muted">Waiver / overload...</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "Registration" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[175px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full registration flow.
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
                A seamless flow<br />from advising<br />to enrollment
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Registration is the busiest time of the year. The Adon ERP Registration module is designed to handle thousands of students without a single glitch.
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
              Designed for the<br />high-stress rush
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We know that during registration week, every second counts. Adon ERP ensures that the system handles the heavy lifting, so your staff can focus on helping students.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Instant Hold Verification</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">No more manually checking spreadsheets. If a student has an unpaid fee or an administrative hold, the system catches it instantly during registration.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Automated Prerequisite Checks</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system cross-references the student's academic history against the course requirements. If they haven't passed the prerequisite, they can't register.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Wave-Based Priority</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Configure the system to open registration for seniors first, then juniors, then freshmen. This ensures graduating students get the classes they need to finish.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Advising Dashboard</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Advisors get a dedicated view where they can see all pending student registrations, approve them in bulk, or turn them back with notes for the student.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Waitlist Automation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">If a class is full, students are queued. As soon as someone drops, the system automatically bumps the next person from the waitlist into the class and notifies them.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Clash Detection</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system scans the student's selected courses against the master timetable. If two classes overlap, the registration is blocked with a clear error message.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day for the registrar</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The registrar checks the dashboard. 1406 students are pending advising. They notify the department heads to review their queues." },
                  { time: "10:30 am", text: "A student calls because they can't register. The registrar searches their ID and sees they have a library hold. They direct the student to the library." },
                  { time: "1:00 pm", text: "An advisor requests permission to overload a student's schedule. The registrar reviews the student's high CGPA and approves the waiver in the system." },
                  { time: "3:00 pm", text: "The registrar opens the registration window for the senior cohort. The system automatically emails all eligible students." },
                  { time: "5:00 pm", text: "The registrar checks the waitlists for the most popular sections and informs the department that they need to add another section." }
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
                Questions about<br />the registration<br />process
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
                Ready to simplify<br />your registration?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Registration module. We'll show you how to handle advising, holds, and waitlists without the stress.
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