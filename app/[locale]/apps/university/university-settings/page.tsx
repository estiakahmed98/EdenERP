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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

export async function generateMetadata(): Promise<Metadata> {
  const tx = await getTranslations("pages.universityApp.universitySettings");
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.universitySettings") || tx("page.universitySettingsAdonerp"),
    description:
      tx("page.configureInstitutionalRulesGradingScales"),
    alternates: await getLocaleAlternates("/apps/university/university-settings"),
  };
}

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = memoT((tx: TFn) => ([
  {
    title: tx("page.institutionalRules"),
    question: tx("page.howDoWeEnforceOurSpecific"),
    answer: tx("page.everyUniversityIsDifferentConfigureExact"),
    source: tx("page.syncedFromAcademicPolicies"),
  },
  {
    title: tx("page.studentIdGeneration"),
    question: tx("page.canWeCustomizeHowStudentIds"),
    answer: tx("page.yesDefineYourExactNumberingPattern"),
    source: tx("page.syncedFromRegistrarRules"),
  },
  {
    title: tx("page.termStructures"),
    question: tx("page.doesTheSystemSupportOurSpecific"),
    answer: tx("page.whetherYouRunSemestersSpringAutumn"),
    source: tx("page.syncedFromAcademicCalendar"),
  },
  {
    title: tx("page.creditLimits"),
    question: tx("page.howDoWePreventStudentsFrom"),
    answer: tx("page.setTheExactMinimumAndMaximum"),
    source: tx("page.syncedFromRegistrationRules"),
  },
]));

const faqs = memoT((tx: TFn) => ([
  {
    q: tx("page.whatHappensIfWeChangeThe"),
    a: tx("page.changingThePatternOnlyAffectsFuture"),
  },
  {
    q: tx("page.canWeHaveDifferentGradingScales"),
    a: tx("page.theSystemCurrentlySupportsAPrimary"),
  },
  {
    q: tx("page.howDoesTheTheBetterGrade"),
    a: tx("page.ifAStudentRetakesACourse"),
  },
  {
    q: tx("page.whoHasAccessToChangeThese"),
    a: tx("page.onlyUsersWithTheHighestAdministrative"),
  },
]));

export default function UniversitySettingsPage() {
  const tx = useTranslations("pages.universityApp.universitySettings");
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />{" "}{tx("page.institutionalConfiguration")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {tx("page.rulesThatFit")}{" "}<span className="text-primary">{tx("page.yourUniversity")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {tx("page.configureGradingScalesCreditLimitsId")}
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

          {/* Dashboard App Mockup (University Settings Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{tx("page.adonErp")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{tx("page.universitySettings")}</span>
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
                  <nav className="space-y-0.5 px-3 mb-6">
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
                      { icon: Calendar, label: tx("page.terms") },
                      { icon: Settings, label: tx("page.universitySettings"), active: true },
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
                    {tx("page.admin")}{" "}<ChevronDown className="h-3 w-3 rotate-180" />
                  </div>
                  <div className="px-5 mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                    {tx("page.hrPayroll")}{" "}<ChevronDown className="h-3 w-3 rotate-180" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: FolderTree, label: tx("page.departments") },
                      { icon: User, label: tx("page.designations") },
                      { icon: Book, label: tx("page.gradesSteps") },
                      { icon: Landmark, label: tx("page.salaryComponents") },
                      { icon: Coins, label: tx("page.salaryStructures") },
                      { icon: Users, label: tx("page.employees") },
                      { icon: CreditCard, label: tx("page.payrollRuns") },
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
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">{tx("page.universitySettings2")}</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        {tx("page.theRulesTheUniversityLayerFollows")}
                      </p>
                    </div>

                    {/* Settings Form Card (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm opacity-60 blur-[2px] pointer-events-none">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Row 1 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.studentNumberPattern")}</label>
                          <input type="text" value="{DEPT}{YY}{T}{SEQ3}" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.termSystem")}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                                <option>{tx("page.semestersSpringAutumn")}</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.gradingScale")}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                                <option>{tx("page.ugcUniformGradingCgpa400")}</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.whenACourseIsRetaken")}</label>
                          <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                              <option>{tx("page.theBetterGradeCounts")}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.minimumCreditsPerTerm")}</label>
                            <input type="text" value="9" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.maximumCreditsPerTerm")}</label>
                            <input type="text" value="21" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.probationBelowCgpa")}</label>
                          <input type="text" value="2" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">{tx("page.deanSListFromTermGpa")}</label>
                          <input type="text" value="3.75" className="w-full rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground shadow-sm" readOnly />
                        </div>
                      </div>

                      {/* Help Text */}
                      <div className="text-[10px] text-muted-foreground space-y-1 mt-4">
                        <p>{tx("page.tokens")}{" "}{tx("page.text")}{" "}{tx("page.departmentCode")}{" "}{tx("page.text2")}{" "}{tx("page.programmeCode")}{" "}{tx("page.text3")}{" "}{tx("page.or")}{" "}{tx("page.text4")}{" "}{tx("page.intakeYear")}{" "}{"{T}"}{" "}{tx("page.termInTheYear")}{" "}{tx("page.text5")}—{tx("page.text6")}{" "}{tx("page.serialExample")}{" "}{tx("page.text7")}{" "}{tx("page.cse27i0001")}</p>
                        <p>{tx("page.bestARetakeReplacesTheEarlier")}</p>
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end mt-6">
                        <button className="rounded-md bg-primary px-6 py-2 text-[12px] font-bold text-primary-foreground shadow-sm">
                          {tx("page.save")}
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
                        {tx("page.previewModeExploreTheFullConfiguration")}
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
                {tx("page.tailoredToYour")}<br />{tx("page.academic")}<br />{tx("page.governance")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {tx("page.noTwoUniversitiesOperateTheSame")}
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
              {tx("page.flexibleEnoughFor")}<br />{tx("page.complexInstitutions")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {tx("page.fromCustomIdGenerationToComplex")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.dynamicIdGeneration")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.mapStudentIdsToDepartmentCodes")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.ugcCompliance")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theDefaultGradingScaleIsAligned")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.retakeFlexibility")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.chooseWhetherTheNewerGradeReplaces")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.customTermSystems")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.whetherYouOperateOnATwo")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.probationHonors")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.setTheCgpaThresholdForAcademic")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.creditLimits")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.enforceMinimumAndMaximumCreditLimits")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{tx("page.aDayForTheItAdmin")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: tx("page.n900Am"), text: tx("page.theItAdminReviewsTheUniversity") },
                  { time: tx("page.n1100Am"), text: tx("page.aNewDepartmentCyberSecurityIs") },
                  { time: tx("page.n130Pm"), text: tx("page.theAcademicCouncilDecidesToChange") },
                  { time: tx("page.n300Pm"), text: tx("page.theAdminAdjustsTheMaximumCredit") },
                  { time: tx("page.n500Pm"), text: tx("page.theAdminClicksSaveAndVerifies") }
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
                {tx("page.questionsAbout")}<br />{tx("page.systemConfiguration")}
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
                {tx("page.readyToConfigure")}<br />{tx("page.yourInstitutionSRules")}
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