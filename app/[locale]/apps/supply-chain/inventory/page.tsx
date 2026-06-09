"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Database,
  FileBarChart,
  Layers3,
  PackageCheck,
  Play,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Layers3, ShoppingCart, FileBarChart, ClipboardCheck,
    Truck, ShieldCheck, Warehouse, Boxes, QrCode, ScanLine, Sparkles, Star,
    Users, ArrowRight, Play, PackageCheck, Database,
  };
  return icons[iconName] || Warehouse;
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
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-800 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-[#02cfc3] dark:bg-[#02cfc3]/30" />
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

export default function InventoryLandingSections() {
  const t = useTranslations("pages.inventory");
  const commonT = useTranslations("common.actions");

  const dashboardStats = t.raw("hero.dashboard.stats");
  const dashboardRows = t.raw("hero.dashboard.rows");
  const tableHeaders = t.raw("hero.dashboard.tableHeaders");
  const replenishmentFeatures = t.raw("replenishmentSection.features");
  const warehouseStages = t.raw("warehouseSection.stages");
  const pickingTypes = t.raw("pickingSection.types");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      sky: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
      amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
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
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">
                {t("hero.title")}
              </span>
            </HandUnderline>{" "}
           
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {commonT("contactSales")}
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

              <div className="bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-4">
                  {dashboardStats.map((stat: any) => (
                    <div
                      key={stat.label}
                      className={`rounded-lg p-4 text-left ${getColorClass(stat.color)}`}
                    >
                      <p className="text-xs font-bold">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <div className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                    {tableHeaders.map((header: string) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>

                  {dashboardRows.map((row: any) => (
                    <div
                      key={row.reference}
                      className="grid grid-cols-7 gap-4 border-b border-slate-100 dark:border-slate-700 px-5 py-4 text-left text-xs last:border-0"
                    >
                      <span className="font-bold text-[#714b67] dark:text-[#9b6a8f]">
                        {row.reference}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200">
                        {row.product}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row.source}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {row.destination}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {row.qty}
                      </span>
                      <span
                        className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${
                          row.status === "Done" || row.status === "সম্পন্ন"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : row.status === "Ready" || row.status === "প্রস্তুত"
                              ? "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
                              : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                        }`}
                      >
                        {row.status}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">
                        {row.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>

            <div className="relative z-50 mx-auto mt-10 max-w-md rounded-xl bg-white dark:bg-slate-800 p-5 shadow-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <div className="grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {t("hero.metrics.forecasted")}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {t("hero.metrics.forecastedValue")}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {t("hero.metrics.available")}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {t("hero.metrics.availableValue")}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {t("hero.metrics.replenishment")}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {t("hero.metrics.replenishmentValue")}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {t("hero.metrics.traceability")}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {t("hero.metrics.traceabilityValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Flawless replenishments Section */}
      <section className="bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 rotate-[-20deg] text-slate-300 dark:text-slate-600" />

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("replenishmentSection.title")}{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">{t("replenishmentSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("replenishmentSection.description")}
          </p>

          <div className="mx-auto mt-12 max-w-4xl rounded-xl bg-white dark:bg-slate-900 p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
            <div className="grid items-center gap-8 md:grid-cols-3">
              {replenishmentFeatures.map((item: any, index: number) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <div key={item.title} className="relative text-center">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${getColorClass(item.color)}`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    <p
                      className="mt-4 text-xl font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {item.title}
                    </p>

                    {index < 2 && (
                      <div className="absolute -right-12 top-8 hidden w-24 border-t-2 border-dashed border-[#714b67] dark:border-[#9b6a8f] md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Speed up receipt, quality control and storage Section */}
      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="absolute left-0 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="relative -rotate-12 rounded-3xl bg-slate-900 dark:bg-slate-800 p-4 shadow-2xl">
                <div className="h-80 w-44 rounded-2xl bg-white dark:bg-slate-900 p-4">
                  <div className="mx-auto h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
                    <QrCode className="mx-auto h-20 w-20 text-slate-900 dark:text-white" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="h-10 rounded bg-[#714b67] dark:bg-[#8a5a7e]" />
                  </div>
                </div>
              </div>

              <ScanLine className="absolute -right-8 top-16 h-14 w-14 text-[#02a6a6] dark:text-[#02cfc3]" />
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("qualitySection.title")}{" "}
              <HandUnderline color="bg-amber-300 dark:bg-amber-800">
                <span className="dark:text-amber-200">{t("qualitySection.titleHighlight")}</span>
              </HandUnderline>
              <br />
              {t("qualitySection.titleEnd")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("qualitySection.description")}
            </p>

            <FloatingNote
              className="mt-10 z-30"
              text={t("qualitySection.floatingNote")}
            />
          </div>
        </div>
      </section>

      {/* Optimize your warehouse Section */}
      <section className="relative bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <DashedArrow className="mb-8 h-28 w-28 -rotate-90 text-slate-300 dark:text-slate-600" />

            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("warehouseSection.title")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("warehouseSection.description")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-10 translate-y-10 rounded-full bg-[#f3f4f7] dark:bg-[#0f0f1a]" />

            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="grid gap-4 sm:grid-cols-3">
                {warehouseStages.map((title: string, columnIndex: number) => (
                  <div key={title} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                    <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                      {title}
                    </p>

                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="rounded-lg bg-white dark:bg-slate-800 p-3 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                          <p className="text-xs font-bold text-[#714b67] dark:text-[#9b6a8f]">
                            WH/{columnIndex + 1}0{index + 1}
                          </p>
                          <div className="mt-2 h-2 rounded bg-slate-100 dark:bg-slate-700" />
                          <div className="mt-2 h-2 w-3/4 rounded bg-slate-100 dark:bg-slate-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Boxes className="absolute -bottom-8 right-8 h-14 w-14 text-amber-500 dark:text-amber-400" />
          </div>
        </div>
      </section>

      {/* Minimize picking movements Section */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <DashedArrow className="mx-auto mb-8 h-24 w-24 -rotate-90 text-slate-300 dark:text-slate-600" />

          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span className="text-[#02a6a6] dark:text-[#02cfc3]">{t("pickingSection.title")}</span>
            </HandUnderline>{" "}
            {t("pickingSection.titleHighlight")}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("pickingSection.description")}
          </p>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {pickingTypes.map((type: any, cardIndex: number) => (
              <div
                key={type.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              >
                <div className="grid h-52 grid-cols-5 gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className={`rounded ${
                        [2, 8, 13, 17].includes(index + cardIndex)
                          ? "bg-[#02cfc3] dark:bg-[#02cfc3]/50"
                          : [4, 11, 18].includes(index + cardIndex)
                            ? "bg-amber-300 dark:bg-amber-700"
                            : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <h3
                  className="mt-5 text-xl font-bold text-slate-900 dark:text-white"
                  style={{ fontFamily: handwrittenFont }}
                >
                  {type.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packing has never been easier Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <HandUnderline color="bg-rose-300 dark:bg-rose-800">
                <span className="dark:text-rose-200">{t("packingSection.title")}</span>
              </HandUnderline>{" "}
              {t("packingSection.titleHighlight")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("packingSection.description")}
            </p>
          </div>

          <div className="relative h-80">
            <div className="absolute bottom-8 right-0 h-44 w-140 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 shadow-xl">
              <div className="absolute -left-28 bottom-0 h-28 w-32 rounded-l-xl bg-slate-200 dark:bg-slate-700 shadow-lg">
                <div className="absolute bottom-0 left-4 h-12 w-12 rounded-full bg-slate-900 dark:bg-slate-700" />
                <div className="absolute bottom-0 right-4 h-12 w-12 rounded-full bg-slate-900 dark:bg-slate-700" />
              </div>
              <div className="absolute bottom-0 right-16 h-12 w-12 rounded-full bg-slate-900 dark:bg-slate-700" />
              <div className="absolute bottom-0 right-36 h-12 w-12 rounded-full bg-slate-900 dark:bg-slate-700" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-orange-500" />
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
              {t("footerCta.subtitle")}
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
