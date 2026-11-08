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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

export async function generateMetadata(): Promise<Metadata> {
  const tx = await getTranslations("pages.universityApp.registration");
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.registration") || tx("page.registrationAdonerp"),
    description:
      tx("page.manageStudentRegistrationsAdvisingHoldsA"),
    alternates: await getLocaleAlternates("/apps/university/registration"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const registrationData = memoT((tx: TFn) => ([
  { id: "ALL231007", name: "Nafisa Chowdhury", cgpa: "2.90", credits: "106", status: tx("page.advisingPending") },
  { id: "ALL231014", name: "Habib Islam", cgpa: "2.96", credits: "106", status: tx("page.advisingPending") },
  { id: "ALL231020", name: "Nayeem Kabir", cgpa: "2.91", credits: "106", status: tx("page.advisingPending") },
]));

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = memoT((tx: TFn) => ([
  {
    title: tx("page.advisingWorkflows"),
    question: tx("page.howDoWeManageAdvisorApprovals"),
    answer: tx("page.theSystemRoutesStudentsToTheir"),
    source: tx("page.syncedFromAdvisingModules"),
  },
  {
    title: tx("page.holdManagement"),
    question: tx("page.whatHappensIfAStudentHas"),
    answer: tx("page.theSystemAutomaticallyBlocksRegistration"),
    source: tx("page.syncedFromStudentAccounts"),
  },
  {
    title: tx("page.prerequisiteLimitChecks"),
    question: tx("page.canWePreventStudentsFromTaking"),
    answer: tx("page.yesTheRegistrationEngineVerifiesThat"),
    source: tx("page.syncedFromCurriculumRules"),
  },
  {
    title: tx("page.waitlistAutomation"),
    question: tx("page.whatIfAClassIsFull"),
    answer: tx("page.ifASectionReachesCapacityThe"),
    source: tx("page.syncedFromEnrollmentEngine"),
  },
]));

const faqs = memoT((tx: TFn) => ([
  {
    q: tx("page.canStudentsRegisterForMultipleTerms"),
    a: tx("page.noTheSystemEnforcesRegistrationWindows"),
  },
  {
    q: tx("page.howAreSeniorStudentsPrioritized"),
    a: tx("page.theSystemUsesAWaveRegistration"),
  },
  {
    q: tx("page.canAnAdvisorApproveAStudent"),
    a: tx("page.generallyNoAdvisorsAreMappedTo"),
  },
  {
    q: tx("page.whatIsATimeClash"),
    a: tx("page.aTimeClashOccursWhenA"),
  },
]));

export default function UniversityRegistrationPage() {
  const tx = useTranslations("pages.universityApp.registration");
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />{" "}{tx("page.seamlessCourseRegistration")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {tx("page.aFrictionlessStart")}{" "}<span className="text-primary">{tx("page.toEverySemester")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {tx("page.fromAdvisingApprovalsToAutomaticWaitlist")}
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

          {/* Dashboard App Mockup (Registration Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{tx("page.adonErp")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{tx("page.registration")}</span>
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
                      { icon: Calendar, label: tx("page.registration"), active: true },
                      { icon: CreditCard, label: tx("page.studentAccounts") },
                      { icon: Award, label: tx("page.gradesResults") },
                      { icon: CalendarDays, label: tx("page.examsAttendance") },
                      { icon: GraduationCap, label: tx("page.outcomesObe") },
                      { icon: Briefcase, label: tx("page.facultyWorkload") },
                      { icon: Building, label: tx("page.campusServices") },
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
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">{tx("page.registration")}</h1>
                        <p className="mt-1.5 max-w-[750px] text-[12px] leading-5 text-muted-foreground">
                          {tx("page.studentsRegisterForATermS")}
                        </p>
                      </div>
                      <div className="shrink-0 mt-2 sm:mt-0">
                        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.term")}</label>
                        <div className="relative">
                          <select className="w-[180px] appearance-none rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>{tx("page.spring2027Registration")}</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <button className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                        {tx("page.registrationDesk")}
                      </button>
                      <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                        {tx("page.advising")}
                      </button>
                      {[tx("page.holds"), tx("page.windows"), tx("page.overview")].map((tab) => (
                        <button key={tab} className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Filter Box (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm opacity-60 blur-[2px] pointer-events-none mb-6">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-2">
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.status")}</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>{tx("page.advisingPending")}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.advisor")}</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>{tx("page.all")}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.programme")}</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                              <option>{tx("page.all")}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.search")}</label>
                          <input type="text" placeholder={tx("page.studentNumberOrName")} className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm" />
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-3">{tx("page.n1406Pending0Approved0Turned")}</p>
                    </div>

                    {/* Table Area (Blurred) */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden opacity-60 blur-[2px] pointer-events-none">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-semibold">{tx("page.studentNo")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.name")}</th>
                            <th className="px-4 py-3 font-semibold text-center">{tx("page.cgpa")}</th>
                            <th className="px-4 py-3 font-semibold text-center">{tx("page.creditsEarned")}</th>
                            <th className="px-4 py-3 font-semibold">{tx("page.status2")}</th>
                            <th className="px-4 py-3 font-semibold text-right">{tx("page.actions")}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {registrationData(tx).map((row, i) => (
                            <tr key={i} className="hover:bg-muted/30">
                              <td className="px-4 py-3 font-medium text-foreground">{row.id}</td>
                              <td className="px-4 py-3 text-muted-foreground">{row.name}</td>
                              <td className="px-4 py-3 text-center text-muted-foreground">{row.cgpa}</td>
                              <td className="px-4 py-3 text-center text-muted-foreground">{row.credits}</td>
                              <td className="px-4 py-3">
                                <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">{row.status}</span>
                              </td>
                              <td className="px-4 py-3 text-right flex items-center justify-end gap-1.5">
                                <button className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-primary shadow-sm hover:bg-muted">{tx("page.approve")}</button>
                                <button className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-primary shadow-sm hover:bg-muted">{tx("page.waiverOverload")}</button>
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
                        {tx("page.previewModeExploreTheFullRegistration")}
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
                {tx("page.aSeamlessFlow")}<br />{tx("page.fromAdvising")}<br />{tx("page.toEnrollment")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {tx("page.registrationIsTheBusiestTimeOf")}
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
              {tx("page.designedForThe")}<br />{tx("page.highStressRush")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {tx("page.weKnowThatDuringRegistrationWeek")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.instantHoldVerification")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.noMoreManuallyCheckingSpreadsheetsIf")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.automatedPrerequisiteChecks")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theSystemCrossReferencesTheStudent")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.waveBasedPriority")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.configureTheSystemToOpenRegistration")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.advisingDashboard")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.advisorsGetADedicatedViewWhere")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.waitlistAutomation")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.ifAClassIsFullStudents")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.clashDetection")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theSystemScansTheStudentS")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{tx("page.aDayForTheRegistrar")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: tx("page.n900Am"), text: tx("page.theRegistrarChecksTheDashboard1406") },
                  { time: tx("page.n1030Am"), text: tx("page.aStudentCallsBecauseTheyCan") },
                  { time: tx("page.n100Pm"), text: tx("page.anAdvisorRequestsPermissionToOverload") },
                  { time: tx("page.n300Pm"), text: tx("page.theRegistrarOpensTheRegistrationWindow") },
                  { time: tx("page.n500Pm"), text: tx("page.theRegistrarChecksTheWaitlistsFor") }
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
                {tx("page.questionsAbout")}<br />{tx("page.theRegistration")}<br />{tx("page.process")}
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
                {tx("page.readyToSimplify")}<br />{tx("page.yourRegistration")}
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