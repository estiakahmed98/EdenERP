"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Factory,
  FileText,
  GitBranch,
  Layers3,
  PackageCheck,
  Play,
  Recycle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Warehouse, ClipboardCheck, GitBranch, ShieldCheck,
    Factory, Recycle, ScanLine, Sparkles, Star, Users, ArrowRight, Play,
    Boxes, Layers3, PackageCheck, TrendingUp, Zap, FileText,
  };
  return icons[iconName] || Factory;
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
  text = "Share information and make connections",
  color = "bg-sky-400",
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

export default function MRPLandingSections() {
  const t = useTranslations("pages.mrp");

  const dashboardMenu = t.raw("hero.dashboard.menu");
  const dashboardStats = t.raw("hero.dashboard.stats");
  const dashboardOrders = t.raw("hero.dashboard.orders");
  const simulationRows = t.raw("simulationSection.table.rows");
  const simulationHeaders = t.raw("simulationSection.table.headers");
  const planningDays = t.raw("planningSection.days");
  const planningOps = t.raw("planningSection.operations");
  const productionSteps = t.raw("productionSection.steps");
  const paperlessMenu = t.raw("paperlessSection.menuItems");
  const paperlessComponents = t.raw("paperlessSection.components");
  const qualityCategories = t.raw("qualitySection.categories");
  const kaizenSteps = t.raw("kaizenSection.steps");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  const getStatusColor = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      sky: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
      amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    };
    return colorMap[color] || colorMap.sky;
  };

  const getBlockColor = (color: string) => {
    const colorMap: Record<string, string> = {
      amber: "bg-amber-200 dark:bg-amber-800/50",
      rose: "bg-rose-200 dark:bg-rose-800/50",
      sky: "bg-sky-200 dark:bg-sky-800/50",
      purple: "bg-purple-200 dark:bg-purple-800/50",
      emerald: "bg-emerald-200 dark:bg-emerald-800/50",
    };
    return colorMap[color] || colorMap.sky;
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>{" "}
            {t("hero.titleEnd")}
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
              {t("hero.demoButton")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-lg font-bold text-[#714b67] dark:text-[#9b6a8f]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {t("hero.dashboard.title")}
                    </span>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {t("hero.dashboard.subtitle")}
                    </p>
                  </div>

                  <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                    {t("hero.dashboard.createButton")}
                  </button>
                </div>
              </div>

              <div className="grid bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-[210px_1fr]">
                <aside className="rounded-lg bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    MRP Menu
                  </p>

                  <div className="mt-5 space-y-2">
                    {dashboardMenu.map((item: string, index: number) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-xs font-semibold ${
                          index === 1
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="mt-5 lg:ml-5 lg:mt-0">
                  <div className="grid gap-4 md:grid-cols-3">
                    {dashboardStats.map((stat: any) => (
                      <div
                        key={stat.label}
                        className={`rounded-lg p-4 text-left ${getStatusColor(stat.color)}`}
                      >
                        <p className="text-xs font-bold">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {dashboardOrders.map((item: any) => (
                      <div
                        key={item.title}
                        className="rounded-lg bg-white dark:bg-slate-800 p-5 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </p>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold ${getStatusColor(item.statusColor)}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-2 w-[68%] rounded-full bg-[#714b67] dark:bg-[#8a5a7e]" />
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <span>Components</span>
                            <span>Work center</span>
                            <span>Deadline</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <FloatingNote
              className="mx-auto mt-12 z-30"
              color="bg-sky-400 dark:bg-sky-800"
              text={t("hero.floatingNote")}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Real-time simulated operations Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-24 w-24 rotate-[-18deg] text-slate-300 dark:text-slate-600" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("simulationSection.title")}</span>
              </HandUnderline>{" "}
              {t("simulationSection.titleHighlight")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("simulationSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900 dark:text-white">
                {t("simulationSection.table.title")}
              </p>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {t("simulationSection.table.badge")}
              </span>
            </div>

            <div className="overflow-hidden rounded-lg ring-1 ring-slate-100 dark:ring-slate-700">
              <div className="grid grid-cols-5 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                {simulationHeaders.map((header: string) => (
                  <span key={header}>{header}</span>
                ))}
              </div>

              {simulationRows.map((row: any) => (
                <div
                  key={row.order}
                  className="grid grid-cols-5 border-b border-slate-100 dark:border-slate-700 px-4 py-4 text-left text-xs last:border-0"
                >
                  <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                    {row.order}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {row.material}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {row.stock}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {row.time}
                  </span>
                  <span
                    className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                      row.status === "Ready" || row.status === "প্রস্তুত"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planning that puts you ahead of schedule Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Factory className="mx-auto h-12 w-12 text-amber-500 dark:text-amber-400" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("planningSection.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("planningSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 text-xs font-bold text-slate-400 dark:text-slate-500">
                {planningDays.map((day: string) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="mt-5 space-y-4 text-left">
                {planningOps.map((op: any, rowIndex: number) => (
                  <div
                    key={op.name}
                    className="grid grid-cols-[140px_1fr] items-center gap-4"
                  >
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {op.name}
                    </p>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-12 rounded-md ${getBlockColor(op.blocks[(index + rowIndex) % op.blocks.length])}`}
                        >
                          {index % 2 === 0 && (
                            <div className="p-2 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                              MO/{rowIndex + 1}{index + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Record production and components Section */}
      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("productionSection.title")}</span>
              </HandUnderline>{" "}
              {t("productionSection.titleHighlight")}
              <br />
              {t("productionSection.titleEnd")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("productionSection.description")}
            </p>

            <FloatingNote
              className="mt-10 z-30"
              color="bg-sky-400 dark:bg-sky-800"
              text={t("productionSection.floatingNote")}
            />
          </div>

          <div className="relative">
            <p
              className="absolute -top-10 right-4 hidden rotate-[-10deg] text-lg font-bold text-sky-500 dark:text-sky-400 lg:block"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("productionSection.mobileLabel")}
            </p>

            <div className="mx-auto max-w-xs rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.16)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5">
                <div className="mx-auto mb-5 h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />

                <ScanLine className="mx-auto h-16 w-16 text-[#714b67] dark:text-[#9b6a8f]" />

                <p className="mt-6 text-center text-sm font-bold text-slate-900 dark:text-white">
                  Active work order
                </p>

                <div className="mt-5 space-y-3">
                  {productionSteps.map((step: string) => (
                    <div
                      key={step}
                      className="rounded-lg bg-white dark:bg-slate-800 px-4 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm"
                    >
                      {step}
                    </div>
                  ))}
                </div>

                <button className="mt-5 w-full rounded-md bg-[#714b67] px-4 py-3 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("productionSection.validateButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a paperless company Section */}
      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                <div className="space-y-3">
                  {paperlessMenu.map((item: string) => (
                    <div
                      key={item}
                      className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-sm font-bold text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-5">
                  <div className="mb-4 h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-3">
                    {paperlessComponents.map((comp: string, idx: number) => (
                      <div
                        key={comp}
                        className="flex items-center justify-between rounded-lg bg-white dark:bg-slate-800 px-4 py-3 shadow-sm"
                      >
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {comp}
                        </span>
                        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          Ready
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("paperlessSection.title")}{" "}
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="text-rose-500 dark:text-rose-400">
                  {t("paperlessSection.titleHighlight")}
                </span>
              </HandUnderline>
              <br />
              {t("paperlessSection.titleEnd")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("paperlessSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Get ready for Six-Sigma level 6 Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Recycle className="mx-auto h-12 w-12 text-[#02a6a6] dark:text-[#02cfc3]" />

          <h2
            className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("qualitySection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("qualitySection.titleHighlight")}</span>
            </HandUnderline>{" "}
            {t("qualitySection.titleEnd")}
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <p className="text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("qualitySection.description")}
            </p>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 md:grid-cols-3">
                {qualityCategories.map((title: string, col: number) => (
                  <div
                    key={title}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
                  >
                    <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                      {title}
                    </p>

                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-white dark:bg-slate-800 p-3 text-left shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                (index + col) % 2 === 0
                                  ? "bg-emerald-400 dark:bg-emerald-500"
                                  : "bg-amber-400 dark:bg-amber-500"
                              }`}
                            />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              QC Step {index + 1}
                            </span>
                          </div>
                          <div className="mt-2 h-2 rounded bg-slate-100 dark:bg-slate-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The perfect tool for Kaizen Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("kaizenSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("kaizenSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="grid items-center gap-5 md:grid-cols-5">
              {kaizenSteps.map((item: string, index: number) => (
                <div key={item} className="relative">
                  <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                    {item}
                  </div>

                  {index < kaizenSteps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 dark:text-slate-600 md:block" />
                  )}
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
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="dark:text-[#02cfc3]">{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
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