"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MailCheck,
  MessageCircle,
  Play,
  SearchCheck,
  Sparkles,
  Star,
  Target,
  Users,
  UserSearch,
  WandSparkles,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

type DashboardColumn = {
  title: string;
  cards: string[];
};

type Candidate = {
  name: string;
  role: string;
};

type IconItem = {
  title: string;
  description: string;
  icon?: string;
};

const asArray = <T,>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Users, UserSearch, BriefcaseBusiness, CalendarDays, BadgeCheck,
    BarChart3, Target, Sparkles, Star, ArrowRight, Play, WandSparkles,
    FileText, MailCheck, MessageCircle, SearchCheck, ClipboardCheck, CheckCircle2,
  };
  return icons[iconName] || Target;
};

// Avatar images array (kept as static since these are image URLs)
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&h=96&fit=crop&crop=face",
];

export default function RecruitmentATSPage() {
  const t = useTranslations("pages.recruitment");

  const dashboardColumns = asArray<DashboardColumn>(t.raw("hero.dashboard.columns"));
  const pipelineColumns = asArray<string>(t.raw("pipelineSection.columns"));
  const visualizeStages = asArray<string>(t.raw("visualizeSection.stages"));
  const visualizeCandidates = asArray<Candidate>(t.raw("visualizeSection.candidates"));
  const automationFields = asArray<[string, string]>(t.raw("automationSection.fields"));
  const pipelineSteps = asArray<string>(t.raw("pipelinesSection.steps"));
  const scheduleDays = asArray<string>(t.raw("schedulingSection.days"));
  const reportingStages = asArray<string>(t.raw("reportingSection.stages"));
  const featuresList = asArray<IconItem>(t.raw("featuresSection.features"));
  const appsList = asArray<IconItem>(t.raw("appsSection.apps"));

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3]">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("hero.title")}
              </span>
            </HandUnderline>{" "}
            {t("hero.titleHighlight")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("hero.startButton")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.advisorButton")}
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            {t("hero.freeText")}
          </p>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t("hero.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("hero.dashboard.subtitle")}
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("hero.dashboard.newButton")}
                </button>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 md:grid-cols-4">
                {dashboardColumns.map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {column.title}
                      </p>
                      <span className="text-lg font-bold text-slate-400 dark:text-slate-500">
                        +
                      </span>
                    </div>

                    <div className="space-y-3">
                      {asArray<string>(column.cards).map((card, cardIndex) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-800"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {card}
                          </p>
                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            {cardIndex + 2} {t("hero.dashboard.applicationsText")}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white dark:bg-[#8a5a7e]">
                              Interview
                            </span>
                            <img
                              src={avatars[(columnIndex + cardIndex) % avatars.length]}
                              alt="Candidate"
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("pipelineSection.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">{t("pipelineSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("pipelineSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 md:grid-cols-3">
                {pipelineColumns.map((column, columnIndex) => (
                  <div key={column} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                    <p className="mb-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      {column}
                    </p>

                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="mb-3 rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm"
                      >
                        <div className="h-3 w-3/4 rounded bg-[#714b67] dark:bg-[#8a5a7e]" />
                        <div className="mt-2 h-2 w-full rounded bg-slate-100 dark:bg-slate-800" />
                        <div className="mt-2 h-2 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
                        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                          {columnIndex + index + 2} {t("pipelineSection.candidatesCount")}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("visualizeSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="dark:text-[#02cfc3]">{t("visualizeSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("visualizeSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute inset-0 translate-y-12 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 md:grid-cols-3">
                {visualizeStages.map((stage, stageIndex) => (
                  <div key={stage} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                    <p className="mb-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      {stage}
                    </p>

                    {visualizeCandidates.slice(0, 3).map((candidate, index) => (
                      <div
                        key={`${stage}-${candidate.name}`}
                        className="mb-3 rounded-lg bg-white dark:bg-slate-900 p-4 text-left shadow-sm"
                      >
                        <div className="flex gap-3">
                          <img
                            src={avatars[index % avatars.length]}
                            alt={candidate.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {candidate.role}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {stageIndex + index + 1} {t("visualizeSection.starsText")}
                          </span>
                          <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white dark:bg-[#8a5a7e]">
                            {t("visualizeSection.interviewText")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t("automationSection.title")}</span>
              </HandUnderline>{" "}
              {t("automationSection.titleHighlight")}
              <br />
              {t("automationSection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("automationSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("automationSection.jobDescription")}
              </p>
              <WandSparkles className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            </div>

            <div className="space-y-4 text-left">
              {automationFields.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-4">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full rounded-md bg-[#714b67] px-5 py-3 text-sm font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
              {t("automationSection.button")}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("pipelinesSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="dark:text-[#02cfc3]">{t("pipelinesSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("pipelinesSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("pipelinesSection.builderTitle")}
                </p>
                <span className="text-slate-400 dark:text-slate-500">×</span>
              </div>

              {pipelineSteps.map((step, index) => (
                <div
                  key={step}
                  className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {step}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      index < 2
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "bg-[#714b67]/10 text-[#714b67] dark:bg-[#9b6a8f]/20 dark:text-[#9b6a8f]"
                    }`}
                  >
                    {t("pipelinesSection.stageText")} {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute left-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              {scheduleDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-14 rounded-md p-1 text-left text-[10px] ${
                    [3, 8, 16, 22, 29].includes(index)
                      ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                      : [10, 18, 24].includes(index)
                        ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                        : "bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span>{index + 1}</span>
                  {[3, 8, 16, 22, 29].includes(index) && (
                    <p className="mt-1 font-bold">{t("schedulingSection.interviewText")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("schedulingSection.title")}
              <br />
              {t("schedulingSection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("schedulingSection.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">{t("reportingSection.title")}</span>
            </HandUnderline>{" "}
            {t("reportingSection.titleHighlight")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("reportingSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("reportingSection.analysisTitle")}
                </p>
                <BarChart3 className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              </div>

              <div className="flex h-72 items-end gap-5 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-5">
                {[35, 58, 80, 130].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div
                      className="w-full bg-emerald-300 dark:bg-emerald-700"
                      style={{ height: `${height * 0.35}px` }}
                    />
                    <div
                      className="w-full bg-sky-200 dark:bg-sky-700"
                      style={{ height: `${height * 0.55}px` }}
                    />
                    <div
                      className="w-full bg-orange-400 dark:bg-orange-600"
                      style={{ height: `${height}px` }}
                    />
                    <p className="mt-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                      {reportingStages[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span className="dark:text-[#02cfc3]">{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("featuresSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appsList.map((app) => {
              const Icon = getIconComponent(app.icon ?? "Target");
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("appsSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaBanner.description")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {t("testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("testimonial.role")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                  {t("footerCta.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("footerCta.titleEnd")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("footerCta.button")}
            </Link>

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}
