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
  User,
  Book,
  Landmark,
  Coins,
  FolderTree,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universitySettings") || "University Settings | AdonERP",
    description:
      "Configure institutional rules, grading scales, and numbering formats in one unified hub.",
    alternates: getLocaleAlternates("/apps/university/university-settings"),
  };
}

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Institutional Rules",
    question: "How do we enforce our specific grading and retake policies?",
    answer: "Every university is different. Configure exactly how retakes are handled, what the minimum passing CGPA is, and how the Dean's list is calculated. The system enforces these rules automatically across all student records.",
    source: "Synced from Academic Policies",
  },
  {
    title: "Student ID Generation",
    question: "Can we customize how student IDs are formatted?",
    answer: "Yes. Define your exact numbering pattern using tokens like {DEPT} and {YY}. The system automatically generates unique, compliant student IDs for every new admission without manual intervention.",
    source: "Synced from Registrar Rules",
  },
  {
    title: "Term Structures",
    question: "Does the system support our specific academic calendar?",
    answer: "Whether you run Semesters (Spring/Autumn), Trimesters, or a unique custom system, you can define the exact structure. The rest of the ERP modules adapt to this configuration.",
    source: "Synced from Academic Calendar",
  },
  {
    title: "Credit Limits",
    question: "How do we prevent students from overloading their schedules?",
    answer: "Set the exact minimum and maximum credits a student can take per term. The registration engine automatically blocks enrollments that fall outside these bounds, protecting students from unmanageable workloads.",
    source: "Synced from Registration Rules",
  },
];

const faqs = [
  {
    q: "What happens if we change the student number pattern?",
    a: "Changing the pattern only affects future intakes. Existing students keep their originally assigned IDs to maintain historical accuracy and prevent data mix-ups.",
  },
  {
    q: "Can we have different grading scales for different faculties?",
    a: "The system currently supports a primary institution-wide grading scale (e.g., UGC 4.00). However, specific departmental overrides can be configured if your academic council requires it.",
  },
  {
    q: "How does the 'The better grade counts' retake policy work?",
    a: "If a student retakes a course, the system will automatically replace the older grade with the newer, higher grade in the CGPA calculation. Both attempts remain visible on the official transcript.",
  },
  {
    q: "Who has access to change these settings?",
    a: "Only users with the highest administrative privileges (e.g., the Registrar or Vice Chancellor) can access the University Settings page. All changes are logged for audit purposes.",
  },
];

export default function UniversitySettingsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Institutional Configuration
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Rules that fit <span className="text-primary">your university.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              Configure grading scales, credit limits, ID patterns, and retake policies. A flexible foundation that adapts to your academic governance.
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

          {/* Dashboard App Mockup (University Settings Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">University Settings</span>
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
                  <nav className="space-y-0.5 px-3 mb-6">
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
                      { icon: Calendar, label: "Terms" },
                      { icon: Settings, label: "University Settings", active: true },
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

                  {/* Other Sidebar Groups (Visual only) */}
                  <div className="px-5 mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                    Admin <ChevronDown className="h-3 w-3 rotate-180" />
                  </div>
                  <div className="px-5 mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                    HR & Payroll <ChevronDown className="h-3 w-3 rotate-180" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: FolderTree, label: "Departments" },
                      { icon: User, label: "Designations" },
                      { icon: Book, label: "Grades & Steps" },
                      { icon: Landmark, label: "Salary Components" },
                      { icon: Coins, label: "Salary Structures" },
                      { icon: Users, label: "Employees" },
                      { icon: CreditCard, label: "Payroll Runs" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[12px] font-medium text-muted-foreground hover:bg-muted">
                        <item.icon className="h-4 w-4 text-muted-foreground/70" />
                        {item.label}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-background p-5 sm:p-6 overflow-hidden relative">
                  
                  <div className="relative z-0">
                    {/* Page Header */}
                    <div className="mb-6">
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">University settings</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        The rules the university layer follows. Grading and retakes differ from one university to the next, so they are settings, not code.
                      </p>
                    </div>

                    {/* Settings Form Card (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm opacity-60 blur-[2px] pointer-events-none">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Row 1 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Student number pattern *</label>
                          <input type="text" value="{DEPT}{YY}{T}{SEQ3}" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Term system</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                                <option>Semesters (Spring - Autumn)</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Grading scale</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                                <option>UGC uniform grading (CGPA 4.00)</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">When a course is retaken</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                              <option>The better grade counts</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Minimum credits per term</label>
                            <input type="text" value="9" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Maximum credits per term</label>
                            <input type="text" value="21" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Probation below CGPA</label>
                          <input type="text" value="2" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">Dean's list from term GPA</label>
                          <input type="text" value="3.75" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                      </div>

                      {/* Help Text */}
                      <div className="text-[10px] text-muted-foreground space-y-1 mt-4">
                        <p>Tokens: {"{DEPT}"} department code · {"{PROG}"} programme code · {"{YY}"} or {"{YYYY}"} intake year · {"{T}"} term in the year · {"{SEQ3}"}—{"{SEQ6}"} serial. Example: {"{DEPT}{YY}{T}{SEQ4}"} → CSE27I0001.</p>
                        <p>Best: a retake replaces the earlier grade in the CGPA only if it is higher. Both attempts stay on the transcript.</p>
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end mt-6">
                        <button className="rounded-md bg-primary px-6 py-2 text-[12px] font-bold text-primary-foreground shadow-sm">
                          Save
                        </button>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Gradient starts right below the top row of inputs (approx 250px from top) */}
                  <div className="absolute top-[250px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full configuration.
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
                Tailored to your<br />academic<br />governance
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                No two universities operate the same way. Adon ERP gives you the controls to define your exact institutional rules, ensuring the software adapts to your university, not the other way around.
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
              Flexible enough for<br />complex institutions
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              From custom ID generation to complex retake policies, Adon ERP is built to handle the administrative intricacies that make your institution unique.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Dynamic ID Generation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Map student IDs to department codes, intake years, and serial numbers. The system guarantees a unique ID for every student, eliminating manual typos.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">UGC Compliance</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The default grading scale is aligned with UGC standards (CGPA 4.00), ensuring your transcripts and degree audits are officially compliant.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Retake Flexibility</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Choose whether the newer grade replaces the old one, or if the better of the two counts. The system automatically recalculates CGPA based on your policy.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Custom Term Systems</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Whether you operate on a two-semester system or a trimester system, you can configure the exact naming and structure of your academic year.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Probation & Honors</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Set the CGPA threshold for academic probation and the term GPA required for the Dean's list. The system flags students automatically based on these numbers.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Credit Limits</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Enforce minimum and maximum credit limits per term. The registration portal prevents students from enrolling in fewer or more courses than the institution allows.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day for the IT Admin</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The IT admin reviews the University Settings to ensure the grading scale is still aligned with the latest UGC directives." },
                  { time: "11:00 am", text: "A new department (Cyber Security) is launching. The admin updates the Student Number pattern to include the new department code." },
                  { time: "1:30 pm", text: "The academic council decides to change the retake policy. The admin updates the dropdown from 'The better grade counts' to 'Latest grade counts'." },
                  { time: "3:00 pm", text: "The admin adjusts the maximum credit limit from 21 to 24, allowing high-performing students to take extra courses next semester." },
                  { time: "5:00 pm", text: "The admin clicks 'Save' and verifies that the changes have instantly propagated across the student registration and grading modules." }
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
                Questions about<br />system configuration
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
                Ready to configure<br />your institution's rules?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Settings module. We'll show you how to tailor the ERP to your exact academic policies.
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