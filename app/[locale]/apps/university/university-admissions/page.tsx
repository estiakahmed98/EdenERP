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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

export async function generateMetadata(): Promise<Metadata> {
  const tx = await getTranslations("pages.universityApp.universityAdmissions");
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universityDashboard") || tx("page.universityDashboardAdonerp"),
    description:
      tx("page.exploreAnIntegratedUniversityManagementE"),
    alternates: await getLocaleAlternates("/apps/university/university-dashboard"),
  };
}

// --- DATA FOR NEW HERO SCREENSHOT (ADMISSIONS) ---
const admissionsKpiData = memoT((tx: TFn) => ([
  { label: tx("page.applications"), value: "1,384", color: "text-foreground" },
  { label: tx("page.eligible"), value: "997", color: "text-[#8b5cf6]" }, // Purple
  { label: tx("page.offered"), value: "281", color: "text-[#f59e0b]" }, // Amber
  { label: tx("page.accepted"), value: "0", color: "text-[#10b981]" }, // Green
  { label: tx("page.admitted"), value: "506", color: "text-[#10b981]" }, // Green
  { label: tx("page.waitingList"), value: "52", color: "text-[#f59e0b]" }, // Amber
]));

// --- 100% UNIQUE CONTENT FOR PAGE SECTIONS ---
const fiveQuestions = memoT((tx: TFn) => ([
  {
    title: tx("page.enrolmentHealth"),
    question: tx("page.areWeTrackingOurAdmissionTargets"),
    answer: tx("page.stayAheadOfYourEnrolmentGoals"),
    source: tx("page.syncedFromAdmissionsCrmModules"),
  },
  {
    title: tx("page.academicVelocity"),
    question: tx("page.howSmoothlyIsTheCurriculumProgressing"),
    answer: tx("page.monitorClassCapacityFacultyAllocationAnd"),
    source: tx("page.syncedFromAcademicOperations"),
  },
  {
    title: tx("page.financialClearance"),
    question: tx("page.areTuitionAndFeesBeingProcessed"),
    answer: tx("page.trackRealTimeRevenueGenerationPending"),
    source: tx("page.syncedFromBillingStudentLedgers"),
  },
  {
    title: tx("page.resourceAllocation"),
    question: tx("page.doOurDepartmentsHaveExactlyWhat"),
    answer: tx("page.analyzeStudentToFacultyRatiosActive"),
    source: tx("page.syncedFromHrDepartmentalRecords"),
  },
  {
    title: tx("page.campusOverview"),
    question: tx("page.whatDoesTheCurrentInstitutionalLandscape"),
    answer: tx("page.fromOnLeaveCountsToTotal"),
    source: tx("page.syncedFromTheCentralRegistry"),
  },
]));

const faqs = memoT((tx: TFn) => ([
  {
    q: tx("page.whatExactlyDoesTheUniversityHub"),
    a: tx("page.theUniversityHubIsAComprehensive"),
  },
  {
    q: tx("page.isTheDataOnThisDashboard"),
    a: tx("page.yesTheDashboardIsDirectlyLinked"),
  },
  {
    q: tx("page.doesThisSystemSupportLocalFinancial"),
    a: tx("page.absolutelyTheUnderlyingFinanceModuleIs"),
  },
  {
    q: tx("page.howDoesTheMultiCampusManagement"),
    a: tx("page.youCanManageMultipleBranchesOr"),
  },
  {
    q: tx("page.canWeCustomizeWhatDataAppears"),
    a: tx("page.theDashboardIsDesignedToHighlight"),
  },
]));

export default function UniversityDashboardPage() {
  const tx = useTranslations("pages.universityApp.universityAdmissions");
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />{" "}{tx("page.nextGenCampusManagement")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {tx("page.runYourEntireCampus")}{" "}<span className="text-primary">{tx("page.fromASingleScreen")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {tx("page.fromTheFirstAdmissionApplicationTo")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LiveDemoButton />
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                {tx("page.viewAllFeatures")}
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (NOW SHOWING ADMISSIONS SCREENSHOT WITH BLUR) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{tx("page.adonErp")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{tx("page.universityAdmissions")}</span>
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
              <div className="flex h-[600px] sm:h-[650px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {tx("page.university")}{" "}<ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: tx("page.universityDashboard") },
                      { icon: FileText, label: tx("page.universityAdmissions"), active: true },
                      { icon: Users, label: tx("page.universityStudents") },
                      { icon: School, label: tx("page.facultiesProgrammes") },
                      { icon: BookOpen, label: tx("page.coursesCurriculum") },
                      { icon: CalendarDays, label: tx("page.classSchedule") },
                      { icon: Calendar, label: tx("page.registration") },
                      { icon: CreditCard, label: tx("page.studentAccounts") },
                      { icon: Award, label: tx("page.gradesResults") },
                      { icon: GraduationCap, label: tx("page.graduation") },
                      { icon: Calendar, label: tx("page.terms") },
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
                      <h1 className="text-[20px] font-bold tracking-tight text-foreground">{tx("page.universityAdmissions2")}</h1>
                      <p className="mt-1.5 max-w-[850px] text-[11px] leading-5 text-muted-foreground">
                        {tx("page.aRoundPerIntakeTermApplications")}
                      </p>
                    </div>

                    {/* Top Controls */}
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                      <div className="w-full sm:w-[280px]">
                        <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{tx("page.round")}</label>
                        <div className="relative">
                          <select className="w-full appearance-none rounded-md border border-border bg-card px-3 py-2 text-[12px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>{tx("page.spring2027UndergraduateAdmission")}</option>
                            <option>{tx("page.autumn2026UndergraduateAdmission")}</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" />{" "}{tx("page.newAdmissionRound")}
                      </button>
                    </div>

                    {/* Current Round Banner */}
                    <div className="mb-5 rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-[14px] font-bold text-foreground">{tx("page.spring2027UndergraduateAdmission")}</h2>
                            <span className="rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-bold text-[#10b981]">{tx("page.offers")}</span>
                            <span className="text-[10px] text-muted-foreground">
                              {tx("page.intakeTermSpring2027Applications31")}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <button className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                            {tx("page.offerFreedSeatsToTheWaiting")}
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            {tx("page.expireLapsedOffers")}
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            {tx("page.admitAllAccepted0")}
                          </button>
                          <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                            {tx("page.finaliseTheRound")}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-5">
                      {admissionsKpiData(tx).map((kpi, i) => (
                        <div key={i} className="rounded-lg border border-border bg-card p-3 shadow-sm flex flex-col justify-center">
                          <p className={`text-[20px] font-bold tracking-tight leading-none ${kpi.color}`}>{kpi.value}</p>
                          <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{kpi.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Fees Collected Card */}
                    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                      <p className="text-[22px] font-bold tracking-tight text-foreground">1,346,000</p>
                      <p className="mt-1 text-[10px] font-medium text-muted-foreground">{tx("page.formFeesCollected")}</p>
                    </div>

                  </div>

                </div>

                {/* Global Overlay to blur Sidebar & Main Content below "University Students" */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[150px] bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-end pb-12">
                    <div className="pointer-events-auto flex flex-col items-center">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        {tx("page.previewModeExploreTheFullCampus")}
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
                {tx("page.theCoreMetrics")}<br />{tx("page.everyDean")}<br />{tx("page.needsToSee")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {tx("page.managingAUniversityMeansBalancingHundred")}
              </p>
            </div>
            
            <div className="space-y-8">
              {fiveQuestions(tx).map((item, i) => (
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
              {tx("page.engineeredForThe")}<br />{tx("page.realitiesOfLocalCampuses")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {tx("page.weDidnTJustTranslateA")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.officialDocumentGeneration")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.generateMarkSheetsOfficialTranscriptsAnd")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.localizedFinancialViews")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.financialDashboardsAutomaticallyDisplayF")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.multiBranchArchitecture")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.whetherYouRunAMainCampus")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.streamlinedAdmissions")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.trackProspectiveStudentsFromTheirInitial")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.bilingualByDefault")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.toggleTheInterfaceBetweenEnglishAnd")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.customAcademicCalendars")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.defineYourAcademicAndFiscalYears")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{tx("page.aDayInTheLifeWith")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: tx("page.n900Am"), text: tx("page.theRegistrarOpensTheDashboardA") },
                  { time: tx("page.n1130Am"), text: tx("page.theFinanceHeadReviewsFeeCollections") },
                  { time: tx("page.n200Pm"), text: tx("page.aDepartmentHeadChecksFacultyWorkload") },
                  { time: tx("page.n430Pm"), text: tx("page.theAdmissionsTeamFinalizesARound") },
                  { time: tx("page.n600Pm"), text: tx("page.theViceChancellorReviewsTheOverall") }
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
                {tx("page.frequentlyAsked")}<br />{tx("page.questions")}<br />{tx("page.byAdministrators")}
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
                {tx("page.seeHowAdonErpFits")}<br />{tx("page.yourInstitutionSWorkflow")}
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                {tx("page.getAPersonalizedWalkthroughOfThe")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <LiveDemoButton />
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
