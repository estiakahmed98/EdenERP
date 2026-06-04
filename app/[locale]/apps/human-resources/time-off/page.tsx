"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSignature,
  HeartHandshake,
  Plane,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, BriefcaseBusiness, CalendarCheck, CalendarDays,
    CheckCircle2, Clock3, FileSignature, HeartHandshake, Plane, Play,
    ShieldCheck, Sparkles, Star, Users, WalletCards, ArrowRight,
  };
  return icons[iconName] || CalendarDays;
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
  text = "Approved in one click",
  color = "bg-amber-400",
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
        className={`absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] ${color} dark:opacity-70`}
      />
      <img
        src={avatars[1]}
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      {text}
    </div>
  );
}

export default function TimeOffLandingSections() {
  const t = useTranslations("pages.timeoff");

  const timeOffTypesList = t.raw("readySection.timeOffTypes");
  const selectedTypeFields = t.raw("readySection.selectedType.fields");
  const selectedTypeTags = t.raw("readySection.selectedType.tags");
  const accrualDemoList = t.raw("featuresSection.accrualDemo");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");
  const dashboardRequests = t.raw("hero.dashboard.requests");
  const tableHeaders = t.raw("hero.dashboard.tableHeaders");
  const reviewColumns = t.raw("reviewSection.columns");
  const months = t.raw("availabilitySection.months");

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
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="text-rose-500 dark:text-rose-400">
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
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/10"
            >
              {t("hero.startButton")}
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
                  <CalendarDays className="h-5 w-5 text-[#714b67]" />
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
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-[#714b67] p-4 text-left text-white">
                    <p className="text-xs font-bold opacity-80">{t("hero.dashboard.stats.requests")}</p>
                    <p className="mt-2 text-2xl font-bold">{t("hero.dashboard.stats.requestsValue")}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-left text-emerald-600 dark:text-emerald-400">
                    <p className="text-xs font-bold opacity-80">{t("hero.dashboard.stats.approved")}</p>
                    <p className="mt-2 text-2xl font-bold">{t("hero.dashboard.stats.approvedValue")}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-4 text-left text-amber-600 dark:text-amber-400">
                    <p className="text-xs font-bold opacity-80">{t("hero.dashboard.stats.pending")}</p>
                    <p className="mt-2 text-2xl font-bold">{t("hero.dashboard.stats.pendingValue")}</p>
                  </div>
                  <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-4 text-left text-rose-600 dark:text-rose-400">
                    <p className="text-xs font-bold opacity-80">{t("hero.dashboard.stats.refused")}</p>
                    <p className="mt-2 text-2xl font-bold">{t("hero.dashboard.stats.refusedValue")}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                    {tableHeaders.map((header: string) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>

                  {dashboardRequests.map((row: any) => (
                    <div
                      key={`${row.employee}-${row.start}`}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="font-bold text-slate-900 dark:text-slate-100">{row.employee}</span>
                      <span className="text-slate-600 dark:text-slate-300">{row.type}</span>
                      <span className="text-slate-500 dark:text-slate-400">{row.start}</span>
                      <span className="text-slate-500 dark:text-slate-400">{row.end}</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{row.duration}</span>
                      <span className="text-slate-500 dark:text-slate-400">{row.approver}</span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row.status === "Approved" || row.status === "অনুমোদিত"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                            : row.status === "To Approve" || row.status === "Pending" || row.status === "অনুমোদন বাকি" || row.status === "বিচারাধীন"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                              : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
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

      {/* Features Section 2 */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("readySection.title")}
            <br />
            {t("readySection.titleHighlight")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">{t("readySection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("readySection.description")}
          </p>

          <div className="relative mx-auto mt-14 grid max-w-4xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <p className="mb-5 text-left font-bold text-slate-900 dark:text-slate-100">
                Time Off Types
              </p>

              {timeOffTypesList.map((item: string, index: number) => (
                <div
                  key={item}
                  className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-left text-sm"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      index % 3 === 0
                        ? "bg-[#714b67]"
                        : index % 2 === 0
                          ? "bg-sky-400 dark:bg-sky-500"
                          : "bg-amber-400 dark:bg-amber-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t("readySection.selectedType.title")}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedTypeFields.map(([label, value]: [string, string]) => (
                  <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {selectedTypeTags.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#714b67]/10 dark:bg-[#714b67]/20 px-3 py-1 text-xs font-bold text-[#714b67]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ArrowRight className="absolute left-[39%] top-1/2 hidden h-8 w-8 -translate-y-1/2 text-[#714b67]/60 dark:text-[#714b67]/40 lg:block" />
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="relative bg-[#f3f4f7] dark:bg-slate-800/30 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <p
              className="mb-5 text-center text-lg font-bold text-rose-400 dark:text-rose-500"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("availabilitySection.title")}
            </p>

            <div className="grid grid-cols-6 gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
              {months.map((month: string) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {Array.from({ length: 36 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-14 rounded-md p-1 text-left text-[10px] ${
                    [3, 9, 16, 22, 30].includes(index)
                      ? "bg-[#714b67] text-white"
                      : [5, 14, 25].includes(index)
                        ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400"
                        : "bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span>{index + 1}</span>
                  {[3, 9, 16, 22, 30].includes(index) && (
                    <p className="mt-1 font-bold">{t("availabilitySection.ptoText")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Clock3 className="mb-6 h-12 w-12 text-rose-400 dark:text-rose-500" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("availabilitySection.subtitle")}
              <br />
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="text-amber-600 dark:text-amber-400">
                  {t("availabilitySection.subtitleHighlight")}
                </span>
              </HandUnderline>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("availabilitySection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Freedom Section */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-slate-800/20 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="text-sky-600 dark:text-sky-400">{t("freedomSection.title")}</span>
              </HandUnderline>{" "}
              {t("freedomSection.titleHighlight")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("freedomSection.description")}
            </p>
          </div>

          <div>
            <p
              className="mb-4 text-right text-lg font-bold text-sky-500 dark:text-sky-400"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("freedomSection.requestLabel")}
            </p>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={avatars[3]}
                  alt="Employee"
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {t("freedomSection.request.name")}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("freedomSection.request.type")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.raw("freedomSection.request.fields").map(([label, value]: [string, string]) => (
                  <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-md bg-[#714b67] px-5 py-2 text-sm font-bold text-white">
                  {t("freedomSection.request.approveButton")}
                </button>
                <button className="rounded-md border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                  {t("freedomSection.request.refuseButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#02a6a6] dark:text-[#02a6a6]" />

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("reviewSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6]">{t("reviewSection.titleHighlight")}</span>
            </HandUnderline>
            , {t("reviewSection.titleEnd")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("reviewSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="grid gap-4 md:grid-cols-3">
                {reviewColumns.map((column: string, columnIndex: number) => (
                  <div key={column} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4">
                    <p className="mb-5 text-left font-bold text-slate-900 dark:text-slate-100">
                      {column}
                    </p>

                    <div className="space-y-4">
                      {dashboardRequests.slice(0, 3).map((request: any, index: number) => (
                        <div
                          key={`${column}-${request.employee}`}
                          className="flex gap-3 rounded-lg bg-white dark:bg-slate-900 p-3 text-left shadow-sm"
                        >
                          <img
                            src={avatars[index % avatars.length]}
                            alt={request.employee}
                            className="h-14 w-14 rounded-xl object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                              {request.employee}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              {request.type}
                            </p>
                            <span
                              className={`mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${
                                (index + columnIndex) % 2 === 0
                                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                              }`}
                            >
                              {request.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-amber-400 dark:bg-amber-600"
              text={t("reviewSection.floatingNote")}
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-slate-800/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/50" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6]">{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#714b67]/20 text-[#714b67]">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                {featuresList[0]?.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {featuresList[0]?.description}
              </p>

              <div className="mt-8 space-y-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 p-5">
                {accrualDemoList.map(([label, value]: [string, string]) => (
                  <div key={label} className="rounded-lg bg-white dark:bg-slate-900 p-4">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {featuresList.slice(1).map((feature: any) => {
              const Icon = getIconComponent(feature.icon);
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#714b67]/20 text-[#714b67]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] hover:text-[#5f3d56] dark:hover:text-[#8b5e7e]"
          >
            {t("featuresSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
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
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-600 dark:text-sky-400">app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-6 sm:p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                "
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
                    <p className="font-bold text-slate-900 dark:text-slate-100">
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
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
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