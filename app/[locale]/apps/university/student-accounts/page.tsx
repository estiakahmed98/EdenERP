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
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.studentAccounts") || "Student Accounts | AdonERP",
    description:
      "Manage student billing, scholarships, and financial holds in one unified hub.",
    alternates: await getLocaleAlternates("/apps/university/student-accounts"),
  };
}

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = [
  {
    title: "Automated Billing",
    question: "How do we generate bills accurately?",
    answer: "The system automatically compiles term bills by combining registered credits, fee heads, and other charges. It then subtracts scholarships and sponsor shares to generate the final amount.",
    source: "Synced from Billing Engine",
  },
  {
    title: "Instalment Splitting",
    question: "Can students pay in multiple parts?",
    answer: "Yes. Gross fees can be split into multiple instalments. The system tracks each due date and automatically flags late payments without needing manual oversight.",
    source: "Synced from Financial Rules",
  },
  {
    title: "Adjusting Entries",
    question: "What happens if a student drops a course mid-term?",
    answer: "A bill is never edited after it is assessed. Instead, the system generates an adjusting line with its own journal entry, ensuring a perfect audit trail for every financial change.",
    source: "Synced from Accounting Ledgers",
  },
  {
    title: "Financial Holds",
    question: "How do we handle students with unpaid dues?",
    answer: "The system tracks overdue instalments and can automatically place a financial hold on a student's account, preventing them from registering for new courses until the balance is cleared.",
    source: "Synced from Student Status Modules",
  },
];

const faqs = [
  {
    q: "Can we import bank transaction data?",
    a: "Yes. The 'Bank import' tab allows you to upload bank statements to automatically reconcile payments and clear student dues without manual data entry.",
  },
  {
    q: "How are sponsor shares calculated?",
    a: "Sponsors are mapped to specific students. When a bill is generated, the system automatically deducts the sponsor's agreed share before calculating the amount owed by the student.",
  },
  {
    q: "Can we track scholarships separately?",
    a: "Absolutely. The 'Scholarships' tab tracks all awards and disbursements. You can see exactly how much is being covered by institutional or external scholarships.",
  },
  {
    q: "What is a 'Changes after assessment' line?",
    a: "If a student's registration changes after their bill is finalized (e.g., they add a late class or drop a lab), the system adds a specific line item to reflect this adjustment on their next statement.",
  },
];

export default function UniversityStudentAccountsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> Comprehensive Student Billing
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              Every fee tracked. <span className="text-primary">Every payment clear.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              From gross fees to scholarships, manage the entire financial lifecycle of your students with absolute precision and zero manual errors.
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

          {/* Dashboard App Mockup (Student Accounts Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">Adon ERP</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">Student Accounts</span>
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
                      { icon: BookOpen, label: "Courses & Curriculum" },
                      { icon: CalendarDays, label: "Class Schedule" },
                      { icon: Calendar, label: "Registration" },
                      { icon: CreditCard, label: "Student Accounts", active: true },
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
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Student Accounts</h1>
                        <p className="mt-1.5 max-w-[750px] text-[12px] leading-5 text-muted-foreground">
                          Term bills from registered credits and fee heads, less scholarships and sponsors, split into instalments. A bill is never edited: every add, drop or withdrawal after the term is assessed writes adjusting lines with their own journal.
                        </p>
                      </div>
                      <div className="shrink-0 mt-2 sm:mt-0">
                        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Term</label>
                        <div className="relative">
                          <select className="w-[180px] appearance-none rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Autumn 2026 - Running</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                        Overview
                      </button>
                      {["Assess", "Collections desk", "Bank import", "Dues & holds", "Scholarships", "Sponsors", "Student ledger", "Fee setup"].map((tab) => (
                        <button key={tab} className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* KPI Grid (Blurred) */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-4 opacity-60 blur-[2px] pointer-events-none">
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-foreground leading-tight">7,170</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Bills</p>
                        <p className="text-[9px] text-muted-foreground/70">Term assessed 1 Nov 2026</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-foreground leading-tight">44,23,92,18<br/>6.25</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Gross fees</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-[#9333ea] leading-tight">1,53,04,394</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Scholarships</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-[#0ea5e9] leading-tight">59,21,356.7<br/>5</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Sponsors' share</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-foreground leading-tight">43,53,78,40<br/>0.5</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Billed to students</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 shadow-sm col-span-1">
                        <p className="text-[18px] font-bold tracking-tight text-[#21a816] leading-tight">40,50,19,70<br/>8.55</p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground">Paid</p>
                      </div>
                    </div>

                    {/* Second Row KPI (Blurred) */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-6 opacity-60 blur-[2px] pointer-events-none">
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[20px] font-bold tracking-tight text-[#d97706] leading-tight">3,03,58,691.95</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">Owed</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[20px] font-bold tracking-tight text-[#ef4444] leading-tight">1,72,97,726.95</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">Overdue</p>
                        <p className="text-[10px] text-muted-foreground/70">2489 instalments past due</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[20px] font-bold tracking-tight text-foreground leading-tight">475</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">Financial holds</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "Student Accounts" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[175px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        Preview mode. Explore the full financial ledger.
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
                Financial clarity<br />for every<br />student account
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                Managing student finances is complex. The Student Accounts module simplifies it by providing a single, accurate view of every bill, payment, and adjustment.
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
              Built for local<br />financial realities
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              We understand the financial pressures on educational institutions. Adon ERP is designed to handle complex billing scenarios, from instalment plans to external sponsorships, with ease.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Immutable Bills</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Once a bill is assessed, it cannot be edited. Any changes are logged as adjusting lines with their own journal entries. This guarantees a perfect, untampered audit trail.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Lakh & Crore Formatting</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">The financial dashboard automatically formats large numbers into Lakh and Crore, making it instantly readable for local finance teams and administrators.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Sponsor Management</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Track external sponsors and automatically deduct their agreed share from the student's bill before it is generated.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Bank Import Reconciliation</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Upload bank statements directly. The system matches transactions to student IDs, automatically clearing dues and updating the ledger without manual input.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Instalment Tracking</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Automatically split fees into multiple instalments. The system tracks each due date and sends automated reminders before the deadline.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">Automated Holds</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Configure the system to automatically place a financial hold on accounts with overdue balances, blocking future registrations until the issue is resolved.</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">A day in the finance office</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: "9:00 am", text: "The finance director reviews the dashboard. The 'Overdue' figure has risen slightly. They notify the collections team." },
                  { time: "10:30 am", text: "The collections desk begins calling students with overdue instalments. They use the 'Collections desk' tab to log every conversation." },
                  { time: "1:00 pm", text: "A batch of sponsor payments arrives. The finance officer uses 'Bank import' to upload the statement and clear 50 student accounts instantly." },
                  { time: "3:00 pm", text: "A student disputes a late fee. The officer checks the 'Student ledger' and sees the fee was added correctly, pointing out the exact journal entry." },
                  { time: "5:00 pm", text: "The finance director approves a new scholarship batch, ensuring those students' accounts are credited before tomorrow's assessment run." }
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
                Questions about<br />student billing
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
                Ready to take control<br />of student finances?
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                Get a personalized walkthrough of the Student Accounts module. We'll show you how to automate billing and simplify collections.
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