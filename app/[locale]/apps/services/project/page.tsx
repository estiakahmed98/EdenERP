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
  ClipboardList,
  FileText,
  FolderKanban,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Timer,
  Users,
  Workflow,
  X,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, BriefcaseBusiness, CalendarDays, CheckCircle2,
    ClipboardList, FileText, FolderKanban, MessageCircle, Play, Rocket,
    Sparkles, Star, Timer, Users, Workflow, X, ArrowRight,
  };
  return icons[iconName] || FolderKanban;
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
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900 dark:text-white" />
      {text}
    </div>
  );
}

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 25C75 30 105 58 102 91C99 120 70 138 36 130"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />
      <path
        d="M37 130L57 116M37 130L52 151"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectLandingSections() {
  const t = useTranslations("pages.project");

  const dashboardColumns = t.raw("hero.dashboard.columns");
  const viewItems = t.raw("viewsSection.items");
  const demoRows = t.raw("viewsSection.demo.rows");
  const dashboardColumnsList = t.raw("dashboardSection.columns");
  const dashboardTasksList = t.raw("dashboardSection.tasks");
  const collaborationMessages = t.raw("collaborationSection.demo.messages");
  const timesheetRows = t.raw("timesheetSection.checklist.rows");
  const timesheetHeaders = t.raw("timesheetSection.checklist.headers");
  const progressStats = t.raw("progressSection.stats");
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
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
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
              {t("hero.button")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <FolderKanban className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
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
                {dashboardColumns.map((column: any, columnIndex: number) => (
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
                      {column.cards.map((card: string, cardIndex: number) => (
                        <div
                          key={card}
                          className="rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                        >
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {card}
                          </p>

                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            {cardIndex + 2} {t("hero.dashboard.tasksText")} · {columnIndex + 1} {t("hero.dashboard.daysLeftText")}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full bg-[#714b67] px-2 py-1 text-[10px] font-bold text-white dark:bg-[#8a5a7e]">
                              Project
                            </span>

                            <div className="flex -space-x-2">
                              <img
                                src={avatars[(columnIndex + cardIndex) % avatars.length]}
                                alt="Member"
                                className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                              />
                              <img
                                src={avatars[(columnIndex + cardIndex + 2) % avatars.length]}
                                alt="Member"
                                className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                              />
                            </div>
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

      {/* Different needs, different views Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 rotate-90 text-slate-300 dark:text-slate-600" />

          <div className="mb-8 flex justify-center gap-6">
            {[
              { icon: CalendarDays, color: "text-amber-500 dark:text-amber-400" },
              { icon: ClipboardList, color: "text-sky-500 dark:text-sky-400" },
              { icon: Workflow, color: "text-[#02a6a6] dark:text-[#02cfc3]" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>
              );
            })}
          </div>

          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("viewsSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("viewsSection.titleHighlight")}</span>
            </HandUnderline>
            , {t("viewsSection.titleMiddle")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("viewsSection.titleHighlight2")}</span>
            </HandUnderline>
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 text-left">
              {viewItems.map((item: any, index: number) => (
                <div key={item.description} className="flex gap-4">
                  <Sparkles className="mt-1 h-5 w-5 flex-none text-[#02cfc3]" />
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </span>{" "}
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("viewsSection.demo.title")}
                </p>
                <span className="rounded-full bg-sky-50 dark:bg-sky-950/50 px-3 py-1 text-xs font-bold text-sky-600 dark:text-sky-400">
                  {t("viewsSection.demo.badge")}
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-3 text-left">
                {demoRows.map((row: string, rowIndex: number) => (
                  <div key={row} className="contents">
                    <p className="py-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                      {row}
                    </p>
                    <div className="grid grid-cols-5 gap-2 py-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-10 rounded-md ${
                            index >= rowIndex && index <= rowIndex + 1
                              ? "bg-[#714b67]/20 dark:bg-[#9b6a8f]/20"
                              : index === rowIndex + 2
                                ? "bg-amber-100 dark:bg-amber-950/50"
                                : "bg-slate-50 dark:bg-slate-800/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enjoy a comprehensive dashboard Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("dashboardSection.title")}
          </h2>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <p
              className="absolute -left-10 top-20 hidden rotate-[-15deg] text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("dashboardSection.labels.statusView")}
            </p>

            <p
              className="absolute -right-10 top-28 hidden rotate-15 text-lg font-bold text-[#714b67] dark:text-[#9b6a8f] lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("dashboardSection.labels.tags")}
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-5 md:grid-cols-2">
                {dashboardColumnsList.map((column: string, columnIndex: number) => (
                  <div key={column} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
                    <p className="mb-4 text-left font-bold text-slate-900 dark:text-white">
                      {column}
                    </p>

                    {dashboardTasksList.map((task: string, index: number) => (
                      <div
                        key={`${column}-${task}`}
                        className="mb-3 rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 dark:text-white">
                            {task}
                          </p>
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </div>

                        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                          Task #{columnIndex + 1}{index + 1}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Client
                          </span>
                          <span className="rounded-full bg-[#714b67]/10 dark:bg-[#9b6a8f]/20 px-2 py-1 text-[10px] font-bold text-[#714b67] dark:text-[#9b6a8f]">
                            Internal
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-5 text-center text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("dashboardSection.labels.kanbanView")} &nbsp;&nbsp;&nbsp;&nbsp; {t("dashboardSection.labels.allActivities")}
            </p>
          </div>
        </div>
      </section>

      {/* Foster collaboration Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <Rocket className="mb-6 h-14 w-14 rotate-25 text-amber-500 dark:text-amber-400" />
            <DashedArrow className="absolute left-16 -top-20 h-32 w-32 rotate-20 text-slate-300 dark:text-slate-600" />

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("collaborationSection.title")}{" "}
              <span className="relative inline-block px-2">
                <span className="relative z-10">{t("collaborationSection.titleHighlight")}</span>
                <span className="absolute inset-x-0 bottom-2 h-7 rounded-lg bg-amber-300 dark:bg-amber-700" />
              </span>{" "}
              {t("collaborationSection.titleEnd")}
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Involve your customers.
              </span>{" "}
              {t("collaborationSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white">
                {t("collaborationSection.demo.title")}
              </p>
            </div>

            <div className="space-y-4">
              {collaborationMessages.map((msg: any, index: number) => (
                <div
                  key={msg.text}
                  className="flex gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-left"
                >
                  <img
                    src={avatars[index % avatars.length]}
                    alt={msg.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {msg.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Time is money Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400">
            <Timer className="h-9 w-9" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("timesheetSection.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("timesheetSection.description")}
          </p>

          <div className="mx-auto mt-8 flex w-fit rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button className="rounded-md bg-[#714b67] px-5 py-2 text-xs font-bold text-white dark:bg-[#8a5a7e]">
              {t("timesheetSection.stageButton")}
            </button>
            <button className="px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              {t("timesheetSection.recordButton")}
            </button>
            <button className="px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              {t("timesheetSection.timerButton")}
            </button>
          </div>

          <DashedArrow className="mx-auto my-8 h-24 w-24 rotate-90 text-[#714b67] dark:text-[#9b6a8f]/50" />

          <div className="relative mx-auto max-w-4xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t("timesheetSection.checklist.title")}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("timesheetSection.checklist.subtitle")}
            </p>

            <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-slate-100 dark:ring-slate-800">
              <div className="grid grid-cols-5 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                {timesheetHeaders.map((header: string) => (
                  <span key={header}>{header}</span>
                ))}
              </div>

              {timesheetRows.map((row: any) => (
                <div
                  key={row.date}
                  className="grid grid-cols-5 border-b border-slate-100 dark:border-slate-800 px-4 py-4 text-xs last:border-0"
                >
                  <span className="text-slate-500 dark:text-slate-400">{row.date}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{row.employee}</span>
                  <span className="text-slate-500 dark:text-slate-400">{row.description}</span>
                  <span className="text-slate-500 dark:text-slate-400">{row.hours}</span>
                  <span className="text-slate-500 dark:text-slate-400">{row.billable}</span>
                </div>
              ))}
            </div>
          </div>

          <DashedArrow className="mx-auto mt-10 h-28 w-28 rotate-90 text-slate-300 dark:text-slate-600" />
          <X className="mx-auto -mt-8 h-10 w-10 text-[#02cfc3] dark:text-[#02cfc3]" />
        </div>
      </section>

      {/* Always know where your project stands Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2
                className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("progressSection.title")}
                <br />
                {t("progressSection.subtitle")}
              </h2>

              <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {t("progressSection.description")}
              </p>
            </div>

            <FloatingNote
              className="justify-self-center lg:justify-self-end"
              color="bg-[#02cfc3] dark:bg-[#02cfc3]/30"
              text={t("progressSection.floatingNote")}
            />
          </div>

          <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="absolute inset-0 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            {progressStats.map((stat: any, index: number) => (
              <div
                key={stat.title}
                className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              >
                <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/50 text-xs font-bold text-rose-500 dark:text-rose-400">
                  {index + 1}
                </span>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {stat.trend}
                </p>
              </div>
            ))}
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
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:row-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {t("featuresSection.planningDemo.title")}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t("featuresSection.planningDemo.description")}
              </p>

              <div className="mt-8 grid grid-cols-5 gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
                {Array.from({ length: 30 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-8 rounded ${
                      [2, 8, 12, 17, 21, 25].includes(index)
                        ? "bg-[#714b67]/30 dark:bg-[#9b6a8f]/30"
                        : [5, 15, 24].includes(index)
                          ? "bg-amber-200 dark:bg-amber-800/50"
                          : "bg-white dark:bg-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            {featuresList.map((feature: any) => (
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
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("appsSection.description")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
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

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}