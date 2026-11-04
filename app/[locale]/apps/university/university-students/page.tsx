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
  UserPlus,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universityStudents") || "University Students | AdonERP",
    description:
      "Manage student profiles, academic history, and enrollment status in one unified hub.",
    alternates: getLocaleAlternates("/apps/university/university-students"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const studentData = [
  { id: "ALL222004", name: "Walid Nizami", programme: "BA-ALL", term: "Autumn 2022", year: "2022", advisor: "Ishrat Sadia Faruqi", status: "Active" },
  { id: "ALL231001", name: "Sajjad Alam", programme: "BA-ALL", term: "Spring 2023", year: "2023", advisor: "Fahim Yasin Uddin", status: "Active" },
  { id: "ALL231003", name: "Mostafa Siddique", programme: "BA-ALL", term: "Spring 2023", year: "2023", advisor: "Fahim Yasin Uddin", status: "Active" },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Unified Profiles",
    question: "Is every student's record easily accessible?",
    answer: "From their initial application to their final transcript, every piece of data is linked to a single student ID. No more digging through spreadsheets or filing cabinets.",
    source: "Synced from the Central Registry",
  },
  {
    title: "Academic Tracking",
    question: "How do we know which curriculum a student follows?",
    answer: "The system locks a student to the catalog year they joined. Even if the university updates its curriculum, the student's path remains clear and consistent.",
    source: "Synced from Academic Operations",
  },
  {
    title: "Advisor Management",
    question: "Are students getting the guidance they need?",
    answer: "Assign advisors in bulk or individually. Track which faculty members are responsible for which cohorts, ensuring no student falls through the cracks.",
    source: "Synced from Faculty Allocations",
  },
  {
    title: "Status Visibility",
    question: "Can we instantly see who is active or on leave?",
    answer: "Filter students by Active, Graduated, or On Leave status. Get an instant, accurate count of who is currently studying and who has stepped away.",
    source: "Synced from Student Status Modules",
  },
];

const faqs = [
  {
    q: "Can we import existing student data?",
    a: "Yes, the system includes robust import tools. You can upload CSV files to bulk-add students, update their details, and assign them to specific programmes instantly.",
  },
  {
    q: "How does the search function work?",
    a: "The search bar allows you to find students instantly using their Student Number, full Name, or Phone number. It queries the entire database in real-time.",
  },
  {
    q: "Can we track a student's entire history?",
    a: "Absolutely. Clicking on any student ID opens their full profile, showing their admission details, current courses, grades, fee history, and advisor notes.",
  },
  {
    q: "Is it easy to assign advisors?",
    a: "Yes. You can select multiple students at once and use the 'Assign advisor' button. This is perfect for assigning an entire intake cohort to a specific faculty member.",
  },
];

export default function UniversityStudentsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Unified Student Records
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Every student's journey, <span className="text-primary">perfectly organized.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Track enrollment, assign advisors, and manage academic paths from a single, powerful directory. No more scattered records.
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

          {/* Dashboard App Mockup (University Students Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">University Students</span>
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
                      { icon: Users, label: "University Students", active: true },
                      { icon: School, label: "Faculties & Programmes" },
                      { icon: BookOpen, label: "Courses & Curriculum" },
                      { icon: CalendarDays, label: "Class Schedule" },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts" },
                      { icon: Award, label: "Grades & Results" },
                      { icon: CalendarDays, label: "Exams & Attendance" },
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

                {/* Main Content Area (Students Directory Design) */}
                <div className="flex-1 bg-background p-5 sm:p-6 overflow-hidden relative">
                  
                  <div className="relative z-0">
                    {/* Page Header */}
                    <div className="mb-6">
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">University students</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        Every student belongs to a programme for the whole degree. The catalog year fixes which curriculum they follow, even after the curriculum changes.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" /> Admit a student
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <Upload className="h-3.5 w-3.5" /> Import
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <UserPlus className="h-3.5 w-3.5" /> Assign advisor
                      </button>
                    </div>

                    {/* Filter Box */}
                    <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 mb-3">
                        {["Faculty", "Department", "Programme", "Admit term", "Status"].map((label, i) => (
                          <div key={i}>
                            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{label}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                <option>All</option>
                                {label === "Status" && <option>Active</option>}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-full sm:w-[280px]">
                        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Search</label>
                        <input type="text" placeholder="No., name or phone" className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                      </div>
                    </div>

                    {/* Table Area */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-border">
                        <p className="text-[12px] font-medium text-muted-foreground">7,453 students</p>
                      </div>
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-2.5 font-semibold">STUDENT NO.</th>
                            <th className="px-4 py-2.5 font-semibold">NAME</th>
                            <th className="px-4 py-2.5 font-semibold">PROGRAMME</th>
                            <th className="px-4 py-2.5 font-semibold">ADMIT TERM</th>
                            <th className="px-4 py-2.5 font-semibold">CATALOG YEAR</th>
                            <th className="px-4 py-2.5 font-semibold">ADVISOR</th>
                            <th className="px-4 py-2.5 font-semibold">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {studentData.map((student, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-3 font-medium text-primary">{student.id}</td>
                              <td className="px-4 py-3 text-foreground">{student.name}</td>
                              <td className="px-4 py-3 text-muted-foreground">{student.programme}</td>
                              <td className="px-4 py-3 text-muted-foreground">{student.term}</td>
                              <td className="px-4 py-3 text-muted-foreground">{student.year}</td>
                              <td className="px-4 py-3 text-muted-foreground">{student.advisor}</td>
                              <td className="px-4 py-3">
                                <span className="rounded-full bg-[#21a816]/10 px-2 py-0.5 text-[10px] font-bold text-[#21a816]">{student.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "University Students" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Gradient starts right below the active "University Students" menu item (approx 145px from top) */}
                  <div className="absolute top-[145px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full student directory.
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
                What makes the<br />student directory<br />different?
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Managing thousands of students shouldn't be a headache. Here is how the Hub brings clarity to student data management.
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
              Built for the realities of<br />campus administration
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We understand that a student's record is not just a name and a number. It's their entire academic life. Adon ERP is designed to protect and organize that data.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Complete Academic Record</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">From their application test scores to their final graduation thesis, every milestone is tracked and easily retrievable.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Financial Integration</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Instantly check a student's fee clearance status. The student profile links directly to their billing and invoice history.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Bulk Operations</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Need to move an entire cohort to a new advisor? Select multiple students and update their records at once, saving hours of manual work.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Curated Catalog Years</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system automatically locks a student to the curriculum rules of the year they joined, ensuring they aren't affected by future course changes.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Intuitive Search & Filter</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Filter by Faculty, Department, Programme, or Status. Find the exact group of students you need to communicate with in seconds.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Term-based Tracking</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">See exactly which term a student was admitted in. This historical context is vital for auditing and academic planning.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A typical day for the registrar</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The registrar checks the dashboard to see how many new students have accepted their offers overnight." },
                  { time: "10:30 am", text: "A new batch of transfer students needs to be imported. The registrar uses the bulk import tool to add them in minutes." },
                  { time: "1:00 pm", text: "A student calls confused about their curriculum. The registrar searches their ID and instantly sees they are tied to the 2022 catalog year." },
                  { time: "3:00 pm", text: "The department head requests a list of all active students in the 'BA-ALL' programme. The registrar applies filters and exports the data." },
                  { time: "5:00 pm", text: "Before leaving, the registrar bulk-assigns a newly hired faculty member as the advisor for all incoming Spring 2026 students." }
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
                Questions about<br />the student<br />directory
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
                Ready to modernize<br />your student records?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Students module. We'll show you how easy it is to manage thousands of profiles.
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