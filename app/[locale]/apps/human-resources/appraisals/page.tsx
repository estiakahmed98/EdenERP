"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, CalendarCheck, CheckCircle2, ClipboardCheck,
    FileText, MessageSquareText, Play, Sparkles, Star, Target, Trophy, Users,
    ArrowRight,
  };
  return icons[iconName] || Trophy;
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

export default function PerformanceLandingSections() {
  const t = useTranslations("pages.performance");
  const commonT = useTranslations("common.actions");

  const evaluationFeatures = t.raw("evaluationSection.features");
  const appraisalTableHeaders = t.raw("appraisalSection.tableHeaders");
  const appraisalsList = t.raw("appraisalSection.appraisals");
  const surveyFormItems = t.raw("surveySection.formItems");
  const automationSteps = t.raw("automationSection.demo.steps");
  const appsList = t.raw("appsSection.apps");
  const employeeQuestions = t.raw("hero.dashboard.appraisal.employeeQuestions");
  const evaluationCriteria = t.raw("hero.dashboard.appraisal.evaluation");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="text-amber-500 dark:text-amber-400">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/10"
            >
              {commonT("contactSales")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:text-[#714b67]"
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

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-[#714b67]" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {t("hero.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("hero.dashboard.subtitle")}
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  {t("hero.dashboard.newButton")}
                </button>
              </div>

              <div className="bg-[#f7f8fb] dark:bg-slate-800/50 p-6">
                <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-4 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={avatars[0]}
                          alt="Anita Oliver"
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {t("hero.dashboard.appraisal.employee")}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t("hero.dashboard.appraisal.role")}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 w-fit">
                        {t("hero.dashboard.appraisal.status")}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-0 lg:grid-cols-2">
                    <div className="border-r border-slate-100 dark:border-slate-700 p-6 text-left">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        Employee's Feedback
                      </p>

                      <div className="mt-5 space-y-5">
                        {employeeQuestions.map((question: string) => (
                          <div key={question}>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              {question}
                            </p>
                            <div className="mt-2 h-3 w-full rounded bg-slate-100 dark:bg-slate-700" />
                            <div className="mt-2 h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-700" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/40 p-6 text-left">
                      <div className="mb-5 flex items-center justify-between">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          Manager's Feedback
                        </p>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                      </div>

                      <div className="rounded-lg bg-white dark:bg-slate-900 p-5 shadow-sm">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          Feedback
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                          {t("hero.dashboard.appraisal.managerFeedback")}
                        </p>
                      </div>

                      <div className="mt-5 rounded-lg bg-white dark:bg-slate-900 p-5 shadow-sm">
                        <p className="mb-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                          Evaluation
                        </p>

                        {evaluationCriteria.map(([label, score]: [string, number]) => (
                          <div
                            key={label}
                            className="mb-3 flex items-center justify-between text-sm"
                          >
                            <span className="font-medium text-slate-600 dark:text-slate-300">
                              {label}
                            </span>
                            <span className="text-amber-400 dark:text-amber-500">
                              {"★".repeat(score)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-slate-800/30 [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Evaluation Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            {t("evaluationSection.title")}
          </h2>

          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("evaluationSection.subtitle")}
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("evaluationSection.description")}
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {evaluationFeatures.map((item: any, index: number) => {
              const Icon = getIconComponent(item.icon);
              return (
                <div key={item.title} className="text-center">
                  <p className="mb-5 font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    {index === 0 && (
                      <div className="space-y-3 text-left">
                        <div className="rounded-lg bg-[#02cfc3]/20 dark:bg-[#02cfc3]/10 p-4 text-sm font-bold text-[#02a6a6] dark:text-[#02cfc3]">
                          {item.demo}
                        </div>
                        <div className="h-3 rounded bg-slate-100 dark:bg-slate-700" />
                        <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-700" />
                      </div>
                    )}

                    {index === 1 && (
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-8 rounded ${
                              [7, 16, 24].includes(i)
                                ? "bg-[#714b67]"
                                : "bg-slate-50 dark:bg-slate-800/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            Evaluation
                          </span>
                          <span className="rounded bg-[#714b67] px-3 py-1 text-xs text-white">
                            PDF
                          </span>
                        </div>
                        <div className="h-3 rounded bg-slate-100 dark:bg-slate-700" />
                        <div className="h-3 rounded bg-slate-100 dark:bg-slate-700" />
                        <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-700" />
                      </div>
                    )}

                    <Icon className="mx-auto mt-5 h-6 w-6 text-[#714b67]" />
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appraisal Section */}
      <section className="bg-[#f3f4f7] dark:bg-slate-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            {t("appraisalSection.title")}
          </h2>

          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("appraisalSection.subtitle")}
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("appraisalSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="bg-[#714b67] px-6 py-4 text-left text-white">
              <p className="font-bold">Appraisal</p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-6 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 text-left text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                  {appraisalTableHeaders.map((header: string) => (
                    <span key={header}>{header}</span>
                  ))}
                </div>

                {appraisalsList.map((row: any) => (
                  <div
                    key={row.employee}
                    className="grid grid-cols-6 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                  >
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {row.employee}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {row.department}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {row.deadline}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {row.interview}
                    </span>
                    <span className="w-fit rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {row.status}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {row.answers}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Design Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {t("surveySection.title")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
              {t("surveySection.subtitle")}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("surveySection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <p className="mb-5 text-left text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("surveySection.formTitle")}
            </p>

            <div className="space-y-4">
              {surveyFormItems.map((item: string, index: number) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {index + 1} answer
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded bg-[#02cfc3]/20 dark:bg-[#02cfc3]/10 px-3 py-1 text-xs font-bold text-[#02a6a6] dark:text-[#02cfc3]">
                {t("automationSection.demo.badge")}
              </span>
              <span className="rounded bg-[#714b67] px-3 py-1 text-xs font-bold text-white">
                {t("automationSection.demo.status")}
              </span>
            </div>

            <div className="text-left">
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t("automationSection.demo.employee")}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("automationSection.demo.description")}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {automationSteps.map((step: string) => (
                <div
                  key={step}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-4 py-3"
                >
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {step}
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {t("automationSection.title")}
              <br />
              {t("automationSection.subtitle")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
              {t("automationSection.description")}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("automationSection.explanation")}
            </p>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] hover:text-[#5f3d56] dark:hover:text-[#8b5e7e]"
          >
            {t("appsSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[400px] sm:min-h-[500px]">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-[#714b67] opacity-70 dark:opacity-50"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/95 dark:bg-slate-900/95 p-6 sm:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-2xl sm:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t("ctaBanner.description")}
              </p>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}{" "}
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6]">{t("footerCta.titleHighlight")}</span>
              </HandUnderline>{" "}
              {t("footerCta.titleEnd")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/10"
            >
              {t("footerCta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
