"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Timer,
  Users,
  X,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, BriefcaseBusiness, CheckCircle2, Clock3,
    FileText, HelpCircle, MessageCircle, Play, Rocket, Sparkles,
    Star, Timer, Users, X, Zap, ArrowRight,
  };
  return icons[iconName] || Clock3;
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

function FloatingNote({
  className = "",
  text = "Project note",
  color = "bg-[#02cfc3] dark:bg-[#02cfc3]/30",
}: {
  className?: string;
  text?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color}`}
      />
      <img
        src={avatars[1]}
        alt=""
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900 dark:text-white" />
      {text}
    </div>
  );
}

export default function TimesheetsLandingPage() {
  const t = useTranslations("pages.timesheets");
  const dashboardRows = t.raw("hero.dashboard.rows");
  const tableHeaders = t.raw("hero.dashboard.tableHeaders");
  const hoursRows = t.raw("hoursSection.demo.rows");
  const hoursTableHeaders = t.raw("hoursSection.demo.tableHeaders");
  const viewsEntries = t.raw("featuresSection.viewsDemo.entries");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
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

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
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

              <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-[1.4fr_repeat(7,80px)] border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                    {tableHeaders.map((header: string, idx: number) => (
                      <span key={header} className={idx === 0 ? "" : "text-center"}>
                        {header}
                      </span>
                    ))}
                  </div>

                  {dashboardRows.map((row: any, rowIndex: number) => (
                    <div
                      key={row.description}
                      className="grid grid-cols-[1.4fr_repeat(7,80px)] items-center border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <img
                          src={avatars[rowIndex % avatars.length]}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {row.description}
                      </span>

                      {["mon", "tue", "wed", "thu", "fri", "sat", "total"].map((key, colIndex) => (
                        <span
                          key={key}
                          className={`text-center ${
                            colIndex === 5
                              ? "bg-[#b9eef0]/80 dark:bg-[#02cfc3]/30 py-3 font-bold text-slate-900 dark:text-white"
                              : colIndex === 6
                                ? "bg-slate-200 dark:bg-slate-700 py-3 font-bold text-slate-900 dark:text-white"
                                : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {row[key]}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400 dark:bg-amber-700"
              text={t("hero.floatingNote")}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Where did all those hours go? Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center gap-8 text-2xl">
            <span className="rotate-[-20deg] text-rose-400 dark:text-rose-500">
              ⌞
            </span>
            <span className="text-sky-400 dark:text-sky-500">|||</span>
            <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
            <span className="rotate-30 text-amber-400 dark:text-amber-500">
              ⌝
            </span>
          </div>

          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hoursSection.title")}
            <br />
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">{t("hoursSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("hoursSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="mb-4 rounded-lg bg-white dark:bg-slate-800 px-5 py-3 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
              {t.raw("hoursSection.demo.tabs").map((tab: string, idx: number) => (
                <span
                  key={tab}
                  className={`${idx === 0 ? "rounded bg-[#714b67] px-3 py-1 text-xs font-bold text-white dark:bg-[#8a5a7e]" : "ml-4 text-xs font-bold text-slate-500 dark:text-slate-400"}`}
                >
                  {tab}
                </span>
              ))}
              <span className="ml-6 text-xs text-slate-400 dark:text-slate-500">
                {t("hoursSection.demo.infoText")}
              </span>
            </div>

            <p
              className="absolute -left-4 top-14 hidden rotate-[-8deg] text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("hoursSection.demo.labels.timer")}
            </p>

            <p
              className="absolute left-44 top-12 hidden rotate-[4deg] text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("hoursSection.demo.labels.projects")}
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-[1fr_1fr_90px] border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                {hoursTableHeaders.map((header: string) => (
                  <span key={header} className={header === "Task Time" ? "text-center" : ""}>
                    {header}
                  </span>
                ))}
              </div>

              {hoursRows.map((row: any) => (
                <div
                  key={row.day}
                  className="grid grid-cols-[1fr_1fr_90px] border-b border-slate-100 dark:border-slate-700 px-4 py-4 text-left text-xs last:border-0"
                >
                  <span className="font-bold text-slate-800 dark:text-white">
                    {row.day}
                  </span>
                  <span className="bg-[#b9eef0]/70 dark:bg-[#02cfc3]/30 py-2 text-center font-bold text-slate-800 dark:text-white">
                    {row.taskTime}
                  </span>
                  <span className="text-center text-slate-500 dark:text-slate-400">
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-7 max-w-xl rounded-lg bg-white dark:bg-slate-800 px-5 py-3 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
              <div className="h-6 rounded bg-[#714b67]/40 dark:bg-[#9b6a8f]/40">
                <div className="h-6 w-3/4 rounded bg-[#714b67]/60 dark:bg-[#9b6a8f]/60 text-center text-xs font-bold leading-6 text-white">
                  05:15
                </div>
              </div>
            </div>

            <div
              className="mt-3 flex justify-center gap-24 text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
              style={{ fontFamily: handwrittenFont }}
            >
              <span>{t("hoursSection.demo.labels.salesOrders")}</span>
              <span>{t("hoursSection.demo.labels.totalHours")}</span>
            </div>

            <p
              className="mt-4 text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("hoursSection.demo.labels.overtime")}
            </p>
          </div>
        </div>
      </section>

      {/* Make every minute count Section */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute left-1/2 top-1/2 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("productivitySection.title")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("productivitySection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-4 flex justify-end">
              <div className="w-48 rounded bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs text-slate-400 dark:text-slate-500">
                Time
              </div>
            </div>

            <div className="flex h-64 items-end gap-3">
              {[65, 92, 88, 70, 110, 220, 85, 76, 95, 130, 230, 92, 97, 105, 82, 75, 68, 110, 80].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-sky-600/80 dark:bg-sky-500/80"
                    style={{ height: `${height}px` }}
                  />
                  <span className="mt-2 h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
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
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                  <Clock3 className="h-5 w-5" />
                </div>
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {t("featuresSection.viewsDemo.title")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t("featuresSection.viewsDemo.description")}
              </p>

              <div className="mt-8 overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="mb-3 flex gap-2">
                  {t.raw("featuresSection.viewsDemo.tabs").map((tab: string, idx: number) => (
                    <span
                      key={tab}
                      className={`rounded ${idx === 0 ? "bg-[#714b67] px-3 py-1 text-xs font-bold text-white dark:bg-[#8a5a7e]" : "bg-white dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400"}`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                {viewsEntries.map((entry: any) => (
                  <div
                    key={entry.employee}
                    className="grid grid-cols-[1fr_1fr_60px] border-b border-white dark:border-slate-700 px-3 py-3 text-xs last:border-0"
                  >
                    <span className="font-bold text-slate-800 dark:text-white">
                      {entry.employee}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {entry.task}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {entry.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {featuresList.slice(1).map((feature: any) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
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

      {/* CTA Section */}
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
                    src={avatars[5]}
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
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
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
          </div>
        </div>
      </section>
    </main>
  );
}