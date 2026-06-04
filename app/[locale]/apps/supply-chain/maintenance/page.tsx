"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Factory,
  LineChart,
  MonitorSmartphone,
  PackageCheck,
  Play,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Factory, ShieldCheck, PackageCheck, Wrench, Sparkles, Star, Users,
    ArrowRight, Play, CalendarDays, ClipboardList, BarChart3, LineChart,
    MonitorSmartphone, Settings2, CheckCircle2, TrendingUp,
  };
  return icons[iconName] || Wrench;
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

export default function MaintenanceLandingSections() {
  const t = useTranslations("pages.maintenance");

  const dashboardColumns = t.raw("hero.dashboard.columns");
  const preventiveDays = t.raw("preventiveSection.days");
  const requestStages = t.raw("requestsSection.stages");
  const equipmentList = t.raw("equipmentSection.equipment");
  const dashboardStats = t.raw("dashboardSection.stats");
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
                  <Wrench className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
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
                            Request #{columnIndex + 1}{cardIndex + 1} / Equipment
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1 text-amber-400 dark:text-amber-500">
                              {Array.from({ length: 3 }).map((_, idx) => (
                                <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                              ))}
                            </div>

                            <img
                              src={avatars[(columnIndex + cardIndex) % avatars.length]}
                              alt="Assignee"
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

      {/* Automate preventive maintenance Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                {preventiveDays.map((day: string) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`min-h-16 rounded-md p-1 text-left text-[10px] ${
                      [3, 10, 16, 18, 25, 29].includes(index)
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400"
                        : [7, 14, 23].includes(index)
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400"
                          : "bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <span>{index + 1}</span>
                    {[3, 10, 16, 18, 25, 29].includes(index) && (
                      <p className="mt-1 font-bold">Preventive</p>
                    )}
                    {[7, 14, 23].includes(index) && (
                      <p className="mt-1 font-bold">Repair</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("preventiveSection.title")}
              <br />
              {t("preventiveSection.subtitle")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              {t("preventiveSection.description")}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("preventiveSection.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Organize your maintenance requests Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("requestsSection.title")}
              <br />
              {t("requestsSection.subtitle")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              {t("requestsSection.description")}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("requestsSection.text")}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 md:grid-cols-3">
              {requestStages.map((stage: string, stageIndex: number) => (
                <div key={stage} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                    {stage}
                  </p>

                  <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm"
                      >
                        <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mt-2 h-2 w-full rounded bg-slate-100 dark:bg-slate-700/50" />
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex gap-1 text-amber-400 dark:text-amber-500">
                            {Array.from({ length: 3 }).map((_, starIdx) => (
                              <Star key={starIdx} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          <img
                            src={avatars[(stageIndex + idx) % avatars.length]}
                            alt="User"
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Increase overall equipment effectiveness Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex justify-center">
            <div className="relative rounded-[2.3rem] bg-slate-900 dark:bg-slate-800 p-4 shadow-2xl">
              <div className="h-130 w-62 rounded-[1.7rem] bg-white dark:bg-slate-900 p-4">
                <div className="mx-auto mb-5 h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />

                <div className="rounded-lg bg-[#714b67] dark:bg-[#8a5a7e] px-4 py-3 text-white">
                  <p className="text-sm font-bold">Equipment</p>
                </div>

                <div className="mt-5 space-y-3">
                  {equipmentList.map((item: string, index: number) => (
                    <div
                      key={item}
                      className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {item}
                        </p>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            index % 3 === 0
                              ? "bg-rose-400 dark:bg-rose-500"
                              : index % 2 === 0
                                ? "bg-amber-400 dark:bg-amber-500"
                                : "bg-emerald-400 dark:bg-emerald-500"
                          }`}
                        />
                      </div>
                      <div className="mt-2 h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("equipmentSection.title")}
              <br />
              {t("equipmentSection.subtitle")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              {t("equipmentSection.description")}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("equipmentSection.text1")}
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("equipmentSection.text2")}
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard & Statistics Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("dashboardSection.title")}
            </h2>

            <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              {t("dashboardSection.subtitle")}
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("dashboardSection.description")}
            </p>
          </div>

          <div className="mt-16 flex h-107 items-end justify-center gap-6">
            {dashboardStats.map((bar: any) => (
              <div key={bar.name} className="relative flex w-36 flex-col items-center">
                <div className="absolute -top-12 z-10 rounded-md bg-white dark:bg-slate-800 px-4 py-2 text-xs shadow-lg ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {bar.name}
                  </p>
                  <p className="mt-1 text-slate-400 dark:text-slate-500">
                    {t("dashboardSection.label")}
                  </p>
                </div>

                {bar.hasOrange && bar.orange > 0 && (
                  <div
                    className="w-full bg-orange-300 dark:bg-orange-600"
                    style={{ height: `${bar.orange}px` }}
                  />
                )}
                <div
                  className="w-full bg-sky-200 dark:bg-sky-800"
                  style={{ height: `${bar.light}px` }}
                />
                <div
                  className="w-full bg-sky-600/70 dark:bg-sky-500/70"
                  style={{ height: `${bar.blue}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>


          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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