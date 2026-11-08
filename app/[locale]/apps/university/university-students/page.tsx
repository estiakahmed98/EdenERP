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
  Upload,
  UserPlus,
} from "lucide-react";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.university-students");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: await getLocaleAlternates("/apps/university/university-students"),
  };
}

// --- DATA FOR THE HERO SCREENSHOT ---
const studentData = [
  { id: "ALL222004", name: "Walid Nizami", programme: "BA-ALL", term: "Autumn 2022", year: "2022", advisor: "Ishrat Sadia Faruqi", status: "Active" },
  { id: "ALL231001", name: "Sajjad Alam", programme: "BA-ALL", term: "Spring 2023", year: "2023", advisor: "Fahim Yasin Uddin", status: "Active" },
  { id: "ALL231003", name: "Mostafa Siddique", programme: "BA-ALL", term: "Spring 2023", year: "2023", advisor: "Fahim Yasin Uddin", status: "Active" },
];

// --- CONTENT FOR PAGE SECTIONS ---
const featureKeys = [
  "unifiedProfiles", "academicTracking", "advisorManagement", "statusVisibility",
] as const;

const faqKeys = ["importData", "search", "studentHistory", "assignAdvisors"] as const;

export default async function UniversityStudentsPage() {
  const t = await getTranslations("pages.university-students");

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-bg pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8">
          
          {/* Hero Text */}
          <div className="mx-auto max-w-[800px] text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-[12px] font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4" /> {t("hero.badge")}
            </div>
            <h1 className="showcase-heading text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-0.04em] text-foreground">
              {t("hero.title")} <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-7 text-muted-foreground">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LiveDemoButton />
              <button className="rounded-lg border border-border bg-card px-6 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary">
                {t("hero.buttons.exploreFeatures")}
              </button>
            </div>
          </div>

          {/* Dashboard App Mockup (University Students Screenshot) */}
          <div className="relative mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 relative">
              
              {/* App Top Bar */}
              <div className="flex h-12 items-center justify-between border-b border-border bg-muted/30 px-4 sm:px-6 relative z-20">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold text-primary">{t("hero.dashboard.brand")}</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="font-semibold text-foreground">{t("hero.dashboard.pageName")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <Globe className="h-3 w-3" /> {t("hero.dashboard.language")}
                  </div>
                  <div className="flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    <School className="h-3 w-3" /> {t("hero.dashboard.institution")} <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* App Body */}
              <div className="flex h-[650px] relative">
                
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border bg-card py-4 sm:block overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("hero.dashboard.sidebar.title")} <ChevronDown className="h-3 w-3" />
                  </div>
                  <nav className="space-y-0.5 px-3">
                    {[
                      { icon: LayoutDashboard, label: t("hero.dashboard.sidebar.dashboard") },
                      { icon: FileText, label: t("hero.dashboard.sidebar.admissions") },
                      { icon: Users, label: t("hero.dashboard.sidebar.students"), active: true },
                      { icon: School, label: t("hero.dashboard.sidebar.faculties") },
                      { icon: BookOpen, label: t("hero.dashboard.sidebar.courses") },
                      { icon: CalendarDays, label: t("hero.dashboard.sidebar.classSchedule") },
                      { icon: Calendar, label: t("hero.dashboard.sidebar.registration") },
                      { icon: CreditCard, label: t("hero.dashboard.sidebar.studentAccounts") },
                      { icon: Award, label: t("hero.dashboard.sidebar.gradesResults") },
                      { icon: CalendarDays, label: t("hero.dashboard.sidebar.examsAttendance") },
                      { icon: GraduationCap, label: t("hero.dashboard.sidebar.graduation") },
                      { icon: Calendar, label: t("hero.dashboard.sidebar.terms") },
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
                      <h1 className="text-[22px] font-bold tracking-tight text-foreground">{t("hero.dashboard.directory.title")}</h1>
                      <p className="mt-1.5 max-w-[850px] text-[12px] leading-5 text-muted-foreground">
                        {t("hero.dashboard.directory.description")}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      <button className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" /> {t("hero.dashboard.directory.buttons.admitStudent")}
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <Upload className="h-3.5 w-3.5" /> {t("hero.dashboard.directory.buttons.import")}
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-primary shadow-sm transition-colors hover:bg-muted">
                        <UserPlus className="h-3.5 w-3.5" /> {t("hero.dashboard.directory.buttons.assignAdvisor")}
                      </button>
                    </div>

                    {/* Filter Box */}
                    <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 mb-3">
                        {(["faculty", "department", "programme", "admitTerm", "status"] as const).map((filterKey, i) => (
                          <div key={i}>
                            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{t(`hero.dashboard.directory.filters.${filterKey}`)}</label>
                            <div className="relative">
                              <select className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                <option>{t("hero.dashboard.directory.filters.all")}</option>
                                {filterKey === "status" && <option>{t("hero.dashboard.directory.filters.active")}</option>}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-full sm:w-[280px]">
                        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{t("hero.dashboard.directory.filters.search")}</label>
                        <input type="text" placeholder={t("hero.dashboard.directory.filters.searchPlaceholder")} className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                      </div>
                    </div>

                    {/* Table Area */}
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-border">
                        <p className="text-[12px] font-medium text-muted-foreground">{t("hero.dashboard.directory.studentCount", { count: 7453 })}</p>
                      </div>
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-muted/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.studentNo")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.name")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.programme")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.admitTerm")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.catalogYear")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.advisor")}</th>
                            <th className="px-4 py-2.5 font-semibold">{t("hero.dashboard.directory.table.status")}</th>
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
                                <span className="rounded-full bg-[#21a816]/10 px-2 py-0.5 text-[10px] font-bold text-[#21a816]">{student.status === "Active" ? t("hero.dashboard.directory.filters.active") : student.status}</span>
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
                    <div className="pointer-events-auto flex w-full flex-col items-center px-4">
                      <p className="text-[13px] font-medium text-muted-foreground mb-3 bg-card/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-border/50">
                        {t("hero.dashboard.preview.message")}
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

      {/* FEATURES SECTION */}
      <section className="border-t border-border bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="showcase-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-foreground">
                {t("featuresSection.titleLine1")}<br />{t("featuresSection.titleLine2")}<br />{t("featuresSection.titleLine3")}
              </h2>
              <p className="mt-5 max-w-[400px] text-[14px] leading-7 text-muted-foreground">
                {t("featuresSection.description")}
              </p>
            </div>
            
            <div className="space-y-8">
              {featureKeys.map((key) => (
                <div key={key} className="grid gap-4 border-b border-border pb-8 sm:grid-cols-[200px_1fr]">
                  <div>
                    <p className="text-[13px] font-bold text-primary">{t(`featuresSection.items.${key}.title`)}</p>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-foreground">{t(`featuresSection.items.${key}.question`)}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t(`featuresSection.items.${key}.answer`)}</p>
                    <p className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wide">
                      <LayoutDashboard className="h-3.5 w-3.5" /> {t(`featuresSection.items.${key}.source`)}
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
              {t("campusSection.titleLine1")}<br />{t("campusSection.titleLine2")}
            </h2>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-muted-foreground">
              {t("campusSection.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.academicRecord.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.academicRecord.description")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.financialIntegration.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.financialIntegration.description")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.bulkOperations.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.bulkOperations.description")}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.catalogYears.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.catalogYears.description")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.searchFilter.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.searchFilter.description")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground">{t("campusSection.cards.termTracking.title")}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{t("campusSection.cards.termTracking.description")}</p>
              </div>
            </div>

            {/* Timeline Box */}
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="mb-6 text-[15px] font-bold text-foreground">{t("campusSection.timeline.title")}</h3>
              <div className="relative border-l-2 border-muted ml-3 space-y-6">
                {(["morning", "import", "curriculum", "export", "advisors"] as const).map((key) => (
                  <div key={key} className="relative pl-6">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-card bg-primary ring-4 ring-primary/10" />
                    <p className="text-[12px] font-bold text-foreground">{t(`campusSection.timeline.items.${key}.time`)}</p>
                    <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{t(`campusSection.timeline.items.${key}.description`)}</p>
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
                {t("faqSection.titleLine1")}<br />{t("faqSection.titleLine2")}<br />{t("faqSection.titleLine3")}
              </h2>
            </div>
            <div className="border-t border-border">
              {faqKeys.map((key) => (
                <details key={key} className="group border-b border-border py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[14px] font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    {t(`faqSection.items.${key}.question`)}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-open:rotate-180 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <p className="max-w-[700px] pb-1 pt-4 text-[13px] leading-6 text-muted-foreground">
                    {t(`faqSection.items.${key}.answer`)}
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
                {t("ctaSection.titleLine1")}<br />{t("ctaSection.titleLine2")}
              </h2>
              <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-6 text-secondary-foreground/70">
                {t("ctaSection.description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <LiveDemoButton />
                <button className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-white/20">
                  {t("ctaSection.buttons.browseModules")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}