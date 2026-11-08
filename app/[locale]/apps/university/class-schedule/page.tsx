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
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";

export async function generateMetadata(): Promise<Metadata> {
  const tx = await getTranslations("pages.universityApp.classSchedule");
  const t = await getTranslations("layout.header.modules.university");
  return {
    title: t("links.classSchedule") || tx("page.classScheduleAdonerp"),
    description:
      tx("page.manageSectionsTimetablesRoomAllocationsA"),
    alternates: await getLocaleAlternates("/apps/university/class-schedule"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const scheduleData = memoT((tx: TFn) => ([
  {
    section: tx("page.all11011"),
    title: tx("page.arabicGrammarNahwI"),
    teacher: tx("page.shahriarNazmulRahman"),
    times: tx("page.sat08300950Abi"),
    cohort: tx("page.baAll2027SprA"),
    seats: "0 / 18",
    status: tx("page.open"),
  },
]));

// --- CONTENT FOR PAGE SECTIONS ---
const featureQuestions = memoT((tx: TFn) => ([
  {
    title: tx("page.conflictFreeScheduling"),
    question: tx("page.howDoWePreventDoubleBooking"),
    answer: tx("page.theSystemAutomaticallyChecksForClashes"),
    source: tx("page.syncedFromSchedulingEngine"),
  },
  {
    title: tx("page.cohortManagement"),
    question: tx("page.canWeScheduleForSpecificGroups"),
    answer: tx("page.groupStudentsByProgrammeIntakeYear"),
    source: tx("page.syncedFromAcademicOperations"),
  },
  {
    title: tx("page.roomResourceTracking"),
    question: tx("page.areWeUsingOurCampusEfficiently"),
    answer: tx("page.trackExactlyWhichRoomsAreIn"),
    source: tx("page.syncedFromCampusServices"),
  },
  {
    title: tx("page.facultyWorkload"),
    question: tx("page.areTeachersOverburdened"),
    answer: tx("page.theSystemTracksHowManySections"),
    source: tx("page.syncedFromHrFacultyManagement"),
  },
]));

const faqs = memoT((tx: TFn) => ([
  {
    q: tx("page.canWeScheduleALabWithout"),
    a: tx("page.noTheSystemEnforcesARule"),
  },
  {
    q: tx("page.howDoesTheOnlyTeacherTba"),
    a: tx("page.ifASectionIsCreatedBefore"),
  },
  {
    q: tx("page.whatHappensIfARoomIs"),
    a: tx("page.youCanMarkARoomAs"),
  },
  {
    q: tx("page.canWeViewAVisualTimetable"),
    a: tx("page.yesClickingOnTheTimetableTab"),
  },
]));

export default function UniversityClassSchedulePage() {
  const tx = useTranslations("pages.universityApp.classSchedule");
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />{" "}{tx("page.intelligentTimetableManagement")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {tx("page.everyClassEveryRoom")}{" "}<span className="text-primary">{tx("page.perfectlyTimed")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {tx("page.eliminateSchedulingConflictsManageRoomCa")}
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

          {/* Dashboard App Mockup (Class Schedule Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{tx("page.adonErp")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{tx("page.classSchedule")}</span>
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
                      { icon: CalendarDays, label: tx("page.classSchedule"), active: true },
                      { icon: Calendar, label: tx("page.registration") },
                      { icon: CreditCard, label: tx("page.studentAccounts") },
                      { icon: Award, label: tx("page.gradesResults") },
                      { icon: CalendarDays, label: tx("page.examsAttendance") },
                      { icon: GraduationCap, label: tx("page.outcomesObe") },
                      { icon: Briefcase, label: tx("page.facultyWorkload2") },
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
                        <h1 className="text-[22px] font-bold tracking-tight text-foreground">{tx("page.classSchedule")}</h1>
                        <p className="mt-1.5 max-w-[750px] text-[12px] leading-5 text-muted-foreground">
                          {tx("page.aTermSSectionsWithTheir")}
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

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-foreground leading-none">1,585</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">{tx("page.sections")}</p>
                        <p className="text-[10px] text-muted-foreground/70">{tx("page.n1585Open")}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#0ea5e9] leading-none">48,113</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">{tx("page.seats")}</p>
                        <p className="text-[10px] text-muted-foreground/70">{tx("page.n7124Taken")}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#21a816] leading-none">0</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">{tx("page.withoutClassTimes")}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#d97706] leading-none">1</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">{tx("page.teacherToBeAnnounced")}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-[24px] font-bold tracking-tight text-[#9333ea] leading-none">120 / 133</p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">{tx("page.roomsInUse")}</p>
                        <p className="text-[10px] text-muted-foreground/70">{tx("page.n40465RoomHoursA")}</p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <button className="rounded-md bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                        {tx("page.sections2")}
                      </button>
                      {[tx("page.timetable"), tx("page.planning"), tx("page.facultyLoad"), tx("page.setup")].map((tab) => (
                        <button key={tab} className="rounded-md border border-border bg-card px-4 py-1.5 text-[12px] font-medium text-primary shadow-sm hover:bg-muted">
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Filter Box (Blurred) */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm opacity-60 blur-[2px] pointer-events-none">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-3">
                        {[tx("page.department"), tx("page.cohortProgramme"), tx("page.status")].map((label, i) => (
                          <div key={i}>
                            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{label}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                <option>{tx("page.all")}</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                        <div>
                          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{tx("page.search")}</label>
                          <input type="text" placeholder={tx("page.codeOrTitle")} className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" />{" "}{tx("page.onlyWithoutClassTimes")}
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" />{" "}{tx("page.onlyTeacherTba")}
                        </label>
                        <button className="ml-auto flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm">
                          <Plus className="h-3.5 w-3.5" />{" "}{tx("page.newSection")}
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
                        {tx("page.previewModeExploreTheFullScheduling")}
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
                {tx("page.smartScheduling")}<br />{tx("page.forComplex")}<br />{tx("page.campuses")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {tx("page.manualTimetablingIsARecipeFor")}
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
              {tx("page.optimizedForThe")}<br />{tx("page.localCampusReality")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {tx("page.weKnowThatUniversitySchedulingIsn")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.roomCapacityMatching")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theSystemPreventsYouFromAssigning")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.roomUtilizationMetrics")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.seeExactlyHowManyRoomHours")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.labTheoryPairing")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theSystemUnderstandsThatAPhysics")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.cohortBasedAllocation")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.scheduleForAnEntireIntakeGroup")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.facultyLoadBalancing")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.theFacultyLoadTabVisualizesTeaching")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{tx("page.visualTimetableGrid")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{tx("page.switchToTheTimetableTabTo")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{tx("page.aDayForTheSchedulingTeam")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {[
                  { time: tx("page.n900Am"), text: tx("page.theTeamReviewsTheFacultyLoad") },
                  { time: tx("page.n1030Am"), text: tx("page.aNewSectionForAdvancedPhysics") },
                  { time: tx("page.n100Pm"), text: tx("page.aConflictAlertPopsUpThe") },
                  { time: tx("page.n300Pm"), text: tx("page.theSchedulingTeamFiltersByOnly") },
                  { time: tx("page.n500Pm"), text: tx("page.theSpring2027TimetableIsFinalized") }
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
                {tx("page.questionsAbout")}<br />{tx("page.scheduling")}<br />{tx("page.andTimetables")}
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
                {tx("page.readyToOptimize")}<br />{tx("page.yourCampusTimetable")}
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