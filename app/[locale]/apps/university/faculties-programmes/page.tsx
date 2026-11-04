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
  Edit2,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.facultiesProgrammes") || "Faculties & Programmes | AdonERP",
    description:
      "Manage academic structures, departments, and programmes in one unified hub.",
    alternates: getLocaleAlternates("/apps/university/faculties-programmes"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const facultyData = [
  {
    code: "FSIS",
    nameEn: "Faculty of Shari'ah & Islamic Studies",
    nameBn: "শরীয়াহ ও ইসলামিক স্টাডিজ অনুষদ",
    dean: "Yasin Imran Hossain",
    departments: "3",
    programmes: "3",
  },
  {
    code: "FST",
    nameEn: "Faculty of Science & Technology",
    nameBn: "",
    dean: "Abdullah Mahmudul Bhuiyan",
    departments: "1",
    programmes: "1",
  },
  {
    code: "FAH",
    nameEn: "Faculty of Arts & Humanities",
    nameBn: "কলা ও মানবিক অনুষদ",
    dean: "Abdur Rahman Minhaz Uddin",
    departments: "2",
    programmes: "2",
  },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Academic Hierarchy",
    question: "Is your institutional structure clearly mapped?",
    answer: "Define Faculties, Departments, and Programmes with perfect clarity. The system enforces the relationship between them, ensuring no programme is left without a department.",
    source: "Synced from Academic Operations",
  },
  {
    title: "Curriculum Control",
    question: "How do we manage credit requirements?",
    answer: "Set the exact credit requirements and normal duration for every programme. These rules automatically drive the degree audit for every enrolled student.",
    source: "Synced from Curriculum Modules",
  },
  {
    title: "Leadership Assignments",
    question: "Who is responsible for each faculty?",
    answer: "Assign Deans to Faculties and Chairs to Departments. The system links these leadership roles directly to the academic structure.",
    source: "Synced from HR & Faculty Management",
  },
  {
    title: "Bilingual Structure",
    question: "Can we display names in both English and Bangla?",
    answer: "Yes. The system natively supports dual-language naming for faculties and programmes, ensuring official documents and student portals display correctly.",
    source: "Synced from Localization Settings",
  },
];

const faqs = [
  {
    q: "Can we easily add new programmes?",
    a: "Absolutely. Using the 'New programme' button, you can define a new course of study, assign it to a department, and set its credit requirements in a few clicks.",
  },
  {
    q: "How does the system handle name changes?",
    a: "If a faculty or department changes its name, you can update it instantly via the edit icon. All linked records, including student profiles, will reflect the update automatically.",
  },
  {
    q: "Can one department offer multiple programmes?",
    a: "Yes. The hierarchy is designed to be flexible. A single department can host multiple distinct programmes, each with its own credit and duration rules.",
  },
  {
    q: "Are the codes strictly enforced?",
    a: "Yes. Each faculty and programme must have a unique code. This prevents data mix-ups and ensures accurate reporting across the entire institution.",
  },
];

export default function UniversityFacultiesProgrammesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Academic Architecture
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Build the foundation of <span className="text-primary">your institution.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Map out faculties, manage departments, and define programmes with perfect clarity. A structured foundation for academic success.
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

          {/* Dashboard App Mockup (Faculties & Programmes Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Faculties & Programmes</span>
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
                      { icon: School, label: "Faculties & Programmes", active: true },
                      { icon: BookOpen, label: "Courses & Curriculum" },
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
                    {/* Page Header */}
                    <div className="mb-5">
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">Faculties & programmes</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        The academic structure: a faculty holds departments, a department offers programmes. A programme's credits and normal duration drive the degree audit later.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" /> New faculty
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <Plus className="h-3.5 w-3.5" /> New department
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <Plus className="h-3.5 w-3.5" /> New programme
                      </button>
                    </div>

                    {/* Table Card */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-border bg-muted/10">
                        <h2 className="text-[15px] font-bold text-foreground">Faculties</h2>
                      </div>
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-semibold">CODE</th>
                            <th className="px-4 py-3 font-semibold">NAME</th>
                            <th className="px-4 py-3 font-semibold">DEAN</th>
                            <th className="px-4 py-3 font-semibold text-center">DEPARTMENTS</th>
                            <th className="px-4 py-3 font-semibold text-center">PROGRAMMES</th>
                            <th className="px-4 py-3 font-semibold"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {facultyData.map((faculty, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-4 font-medium text-foreground">{faculty.code}</td>
                              <td className="px-4 py-4">
                                <p className="font-medium text-foreground">{faculty.nameEn}</p>
                                {faculty.nameBn && <p className="text-[10px] text-muted-foreground mt-0.5">{faculty.nameBn}</p>}
                              </td>
                              <td className="px-4 py-4 text-muted-foreground">{faculty.dean}</td>
                              <td className="px-4 py-4 text-center text-muted-foreground">{faculty.departments}</td>
                              <td className="px-4 py-4 text-center text-muted-foreground">{faculty.programmes}</td>
                              <td className="px-4 py-4 text-right">
                                <button className="rounded-md border border-border p-1.5 text-primary hover:bg-muted transition-colors">
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Gradient starts exactly below the "Faculties & Programmes" menu item */}
                  <div className="absolute top-[175px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full academic structure.
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
                Structure that<br />scales with<br />your ambition
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Whether you are launching a new department or restructuring an entire faculty, the system adapts to your institutional needs.
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
              Designed for the<br />academic landscape
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We understand that academic structures aren't just data points—they are the backbone of your institution's identity. Adon ERP treats them with the respect they deserve.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Strict Academic Hierarchy</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The system enforces the rules: a Faculty must hold Departments, and a Department must offer Programmes. No shortcuts, no messy data.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Credit & Duration Rules</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Define the exact number of credits and the normal duration for every programme. The system uses these to audit degrees automatically.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Instant Structural Updates</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Need to rename a department or add a new programme? Changes are applied instantly across all linked student and HR records.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Dual Language Support</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Natively input and display faculty and programme names in both English and Bangla, ensuring official records are always accurate.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Leadership Mapping</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Assign Deans and Chairs directly to their respective faculties and departments. Clear accountability starts with clear mapping.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Seamless Integration</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Everything connects. The programmes defined here automatically feed into the Admissions module, Student Records, and Graduation Audits.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A dean's typical day</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The Dean reviews the faculty structure and confirms the department head assignments are correct in the system." },
                  { time: "10:30 am", text: "A new programme proposal is approved. The Dean creates the programme in the dashboard and sets its credit requirements." },
                  { time: "1:00 pm", text: "An audit reveals a department name needs updating to reflect its new scope. The Dean edits it, and all student records update instantly." },
                  { time: "3:00 pm", text: "The university council asks for a full list of departments and the programmes they offer. The Dean exports the data directly from the table." },
                  { time: "5:00 pm", text: "Before leaving, the Dean assigns a new chair to a growing department to ensure proper leadership." }
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
                Questions about<br />academic<br />structure
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
                Ready to structure<br />your academic future?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Academic module. We'll show you how easy it is to map out your entire institution.
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