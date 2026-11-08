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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

export async function generateMetadata(): Promise<Metadata> {
  const tx = await getTranslations("pages.universityApp.terms");
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.terms") || tx("page.termsAdonerp"),
    description:
      tx("page.manageAcademicTermsRegistrationWindowsAn"),
    alternates: await getLocaleAlternates("/apps/university/terms"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const termsData = memoT((tx: TFn) => ([
  {
    name: "Autumn 2027",
    code: "2027-AUT",
    dates: tx("page.n1Jul202731Dec2027"),
    reg: tx("page.n10Jun202730Jun2027"),
    addDrop: tx("page.n14Jul2027"),
    withdrawal: tx("page.n8Sept2027"),
    status: tx("page.planning"),
    intake: "0",
  },
  {
    name: "Spring 2027",
    code: "2027-SPR",
    dates: tx("page.n1Jan202730Jun2027"),
    reg: tx("page.n11Dec202631Dec2026"),
    addDrop: tx("page.n14Jan2027"),
    withdrawal: tx("page.n11Mar2027"),
    status: tx("page.registration"),
    intake: "506",
  },
  {
    name: "Autumn 2026",
    code: "2026-AUT",
    current: true,
    dates: tx("page.n1Jul202631Dec2026"),
    reg: tx("page.n10Jun202630Jun2026"),
    addDrop: tx("page.n14Jul2026"),
    withdrawal: tx("page.n8Sept2026"),
    status: tx("page.running"),
    intake: "894",
  },
]));

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = memoT((tx: TFn) => ([
  {
    title: tx("page.termLifecycle"),
    question: tx("page.howDoWeManageTheTransition"),
    answer: tx("page.theSystemEnforcesAStrictLifecycle"),
    source: tx("page.syncedFromAcademicCalendar"),
  },
  {
    title: tx("page.registrationWindows"),
    question: tx("page.canWeControlWhenStudentsCan"),
    answer: tx("page.absolutelyYouDefineTheExactDates"),
    source: tx("page.syncedFromRegistrationRules"),
  },
  {
    title: tx("page.refundPolicies"),
    question: tx("page.howAreRefundsCalculatedBasedOn"),
    answer: tx("page.theTermConfigurationIncludesARefund"),
    source: tx("page.syncedFromFinanceModules"),
  },
  {
    title: tx("page.yearlyRollover"),
    question: tx("page.isItEasyToSetUp"),
    answer: tx("page.yesUseTheCreateTheYear"),
    source: tx("page.syncedFromSystemAutomation"),
  },
]));

const faqs = memoT((tx: TFn) => ([
  {
    q: tx("page.canWeHaveOverlappingTerms"),
    a: tx("page.yesEspeciallyIfYouRunDifferent"),
  },
  {
    q: tx("page.whatHappensWhenATermIs"),
    a: tx("page.onceATermIsClosedIt"),
  },
  {
    q: tx("page.howDoesTheSystemKnowWhich"),
    a: tx("page.theSystemLooksAtTheDefined"),
  },
  {
    q: tx("page.canWeCustomizeTheRefundWeeks"),
    a: tx("page.yesTheRefundByWeekSettings"),
  },
]));

export default function UniversityTermsPage() {
  const tx = useTranslations("pages.universityApp.terms");
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />{" "}{tx("page.academicCalendarManagement")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {tx("page.everySemester")}{" "}<span className="text-primary">{tx("page.perfectlyTimed")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {tx("page.controlRegistrationWindowsAddDropDeadlin")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="btn-gradient rounded-lg px-6 py-3 text-[13px] font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                {tx("page.requestADemo")}
              </button>
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                {tx("page.exploreFeatures")}
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (Terms Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{tx("page.adonErp")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{tx("page.terms")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <Globe className="h-3 w-3" />{" "}{tx("page.english")}
                  </div>
                  <div className="flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <School className="h-3 w-3" />{" "}{tx("page.nationalUniversity")}{" "}<ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* App Body */}
              <div className="flex h-[650px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {tx("page.university")}{" "}<ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: tx("page.universityDashboard") },
                      { icon: FileText, label: tx("page.universityAdmissions") },
                      { icon: Users, label: tx("page.universityStudents") },
                      { icon: School, label: tx("page.facultiesProgrammes") },
                      { icon: BookOpen, label: tx("page.coursesCurriculum") },
                      { icon: CalendarDays, label: tx("page.classSchedule") },
                      { icon: Calendar, label: tx("page.registration") },
                      { icon: CreditCard, label: tx("page.studentAccounts") },
                      { icon: Award, label: tx("page.gradesResults") },
                      { icon: CalendarDays, label: tx("page.examsAttendance") },
                      { icon: GraduationCap, label: tx("page.outcomesObe") },
                      { icon: Briefcase, label: tx("page.facultyWorkload") },
                      { icon: Building, label: tx("page.campusServices") },
                      { icon: Calendar, label: tx("page.terms"), active: true },
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
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">{tx("page.terms")}</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        {tx("page.eachTermCarriesTheDatesThat")}
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
                        <CalendarDays className="h-3.5 w-3.5" />{" "}{tx("page.createTheYearSTerms")}
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" />{" "}{tx("page.newTerm")}
                      </button>
                    </div>

                    {/* Table Card (Blurred) */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden opacity-60 blur-[2px] pointer-events-none">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-semibold">{tx("page.term")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.dates")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.registration2")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.addDropUntil")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.withdrawalUntil")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.status")}</th>
                            <th className="px-4 py-3 font-semibold text-right">{tx("page.intake")}</th>
                            <th className="px-4 py-3 font-semibold"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {termsData(tx).map((term, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-3">
                                <div className="flex flex-col">
                                  <span className="font-bold text-foreground flex items-center gap-1.5">
                                    {term.name}
                                    {term.current && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">{tx("page.current")}</span>}
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
                                    {term.status === "Planning" ? tx("page.openRegistration") : 
                                     term.status === "Registration" ? tx("page.backToPlanning") : 
                                     tx("page.startGrading")}
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
                        {tx("page.previewModeExploreTheFullAcademic")}
                      </p>
                      <button className="btn-gradient rounded-lg px-8 py-2.5 text-[13px] font-bold shadow-xl transition-transform hover:-translate-y-0.5">
                        {tx("page.bookALiveDemo")}
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
                {tx("page.aCalendarThat")}<br />{tx("page.runsItself")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {tx("page.forgetManuallyTrackingDatesTheTerms")}
              </p>
            </div>
            
            <div className="space-y-8">
              {featureQuestions(tx).map((item, i) => (
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
              {tx("page.builtForComplex")}<br />{tx("page.academicSchedules")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {tx("page.everyInstitutionRunsOnADifferent")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.strictLifecycleEnforcement")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.onceATermMovesToGrading")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.refundScheduleMapping")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.defineExactlyHowMuchIsRefunded")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.automatedYearGeneration")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.tiredOfSettingUpTermsOne")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.clearRegistrationWindows")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.setSpecificDatesForWhenRegistration")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.addDropDeadlines")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.defineTheExactDateWhenStudents")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.currentTermHighlighting")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theSystemAutomaticallyDetectsTheCurrent")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{tx("page.aDayForTheRegistrar")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: tx("page.n900Am"), text: tx("page.theRegistrarOpensTheTermsPage") },
                  { time: tx("page.n1030Am"), text: tx("page.theyClickOpenRegistrationOnThe") },
                  { time: tx("page.n100Pm"), text: tx("page.spring2027IsInRegistrationPhase") },
                  { time: tx("page.n300Pm"), text: tx("page.aStudentCallsWantingToWithdraw") },
                  { time: tx("page.n500Pm"), text: tx("page.theRegistrarUsesCreateTheYear") }
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
                {tx("page.questionsAbout")}<br />{tx("page.academicTerms")}
              </h2>
            </div>
            <div className="border-t border-border">
              {faqs(tx).map((faq, i) => (
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
                {tx("page.readyToMaster")}<br />{tx("page.yourAcademicCalendar")}
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                {tx("page.getAPersonalizedWalkthroughOfThe")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button className="rounded-lg bg-card px-6 py-3 text-[13px] font-bold text-secondary transition-transform hover:-translate-y-0.5 hover:bg-muted shadow-lg">
                  {tx("page.scheduleAWalkthrough")}
                </button>
                <button className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-white/20">
                  {tx("page.browseAllModules")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}