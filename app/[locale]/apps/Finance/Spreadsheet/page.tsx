"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CirclePlay,
  Database,
  FileSpreadsheet,
  Grid3X3,
  LineChart,
  Lock,
  PieChart,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  Table2,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BarChart3,
    CheckCircle2,
    Database,
    FileSpreadsheet,
    Grid3X3,
    LineChart,
    Lock,
    PieChart,
    RefreshCw,
    Share2,
    Sparkles,
    Star,
    Table2,
    Users,
    WandSparkles,
    Zap,
  };
  return icons[iconName] || BarChart3;
};

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm ring-1 ring-cyan-100 dark:ring-cyan-800">
      <span className="text-cyan-500 dark:text-cyan-400">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

function SpreadsheetMockup({
  t,
  raw,
}: {
  t: (key: string) => string;
  raw: (key: string) => unknown;
}) {
  const fallbackHeaders = ["Metric", "Jan", "Feb", "Mar", "Apr", "Total"];
  const fallbackRows = [
    ["Revenue", "$12.4k", "$18.7k", "$21.9k", "$28.2k", "$81.2k"],
    ["Expenses", "$4.8k", "$6.1k", "$7.3k", "$8.9k", "$27.1k"],
    ["Profit", "$7.6k", "$12.6k", "$14.6k", "$19.3k", "$54.1k"],
    ["Growth", "12%", "18%", "21%", "32%", "24%"],
  ];
  const fallbackInsights = [
    "Sales increased by 32%",
    "Marketing cost is stable",
    "Cashflow forecast is healthy",
  ];
  const headers = raw("hero.spreadsheet.headers");
  const rows = raw("hero.spreadsheet.rows");
  const insights = raw("hero.spreadsheet.insights");
  const spreadsheetHeaders = Array.isArray(headers) ? headers : fallbackHeaders;
  const spreadsheetRows = Array.isArray(rows) ? rows : fallbackRows;
  const spreadsheetInsights = Array.isArray(insights) ? insights : fallbackInsights;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t("hero.spreadsheet.title")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-emerald-700 dark:text-emerald-400">
            {t("hero.spreadsheet.live")}
          </span>
          <Share2 className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-[120px_repeat(5,1fr)] border-b border-slate-100 dark:border-slate-800 text-xs">
        {spreadsheetHeaders.map((item: string) => (
          <div
            key={item}
            className="border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-4 py-3 font-semibold text-slate-500 dark:text-slate-400"
          >
            {item}
          </div>
        ))}
      </div>

      {spreadsheetRows.map((row: string[], index: number) => (
        <div
          key={row[0]}
          className="grid grid-cols-[120px_repeat(5,1fr)] text-sm"
        >
          {row.map((cell: string, cellIndex: number) => (
            <div
              key={cell}
              className={`border-r border-t border-slate-100 dark:border-slate-800 px-4 py-3 ${
                cellIndex === 0
                  ? "font-semibold text-slate-800 dark:text-slate-100"
                  : index === 2
                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <div className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {t("hero.spreadsheet.revenueTrend")}
            </span>
            <LineChart className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex h-28 items-end gap-3">
            {[35, 55, 48, 75, 68, 92].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t-xl bg-linear-to-t from-cyan-600 to-emerald-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {t("hero.spreadsheet.smartInsights")}
            </span>
            <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="space-y-3">
            {spreadsheetInsights.map((item: string) => (
              <div
                key={item}
                className="rounded-xl bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-cyan-600 text-cyan-600 dark:fill-cyan-500 dark:text-cyan-500" />
      </button>
    </div>
  );
}

export default function SpreadsheetPage() {
  const t = useTranslations("pages");
  const commonT = useTranslations("common.actions");
  const tr = (key: string) => t(`spreadsheet.${key}`);
  const raw = (key: string) => {
    try {
      return t.raw(`spreadsheet.${key}`);
    } catch {
      return undefined;
    }
  };
  const fallbackFeaturesList = [
    {
      title: "Collaborative sheets",
      description: "Work with your team in real time with controlled access and shared views.",
      icon: "Users",
    },
    {
      title: "Smart formulas",
      description: "Create calculations faster with formula suggestions and reusable logic.",
      icon: "WandSparkles",
    },
  ];
  const fallbackAppsList = [
    { title: "Sales", description: "Pipeline and revenue sheets", icon: "BarChart3" },
    { title: "Inventory", description: "Stock planning and forecasts", icon: "Database" },
  ];
  const fallbackModulesList = [
    { title: "CRM pipeline", icon: "Users" },
    { title: "Project data", icon: "Grid3X3" },
    { title: "Sales orders", icon: "BarChart3" },
    { title: "Inventory values", icon: "Database" },
  ];
  const fallbackStatsList = [
    { label: "Leads", value: "1,240", change: "+18%" },
    { label: "Revenue", value: "$92.4k", change: "+32%" },
    { label: "Orders", value: "846", change: "+21%" },
    { label: "Profit", value: "$41.8k", change: "+27%" },
  ];
  const fallbackPivotRowsList = [
    ["North Region", "Sales", "$42,900", "32%"],
    ["South Region", "Inventory", "$21,400", "18%"],
    ["Online Store", "Orders", "$59,120", "41%"],
    ["Corporate", "Projects", "$33,700", "24%"],
  ];
  const fallbackPivotFeatures = [
    "Group data by customer, product, region, or team",
    "Refresh reports without exporting CSV files",
    "Share protected views with managers",
  ];

  const featuresData = raw("featuresSection.list");
  const appsData = raw("appsSection.apps");
  const modulesData = raw("connectSection.modules");
  const statsData = raw("visualizeSection.stats");
  const pivotRowsData = raw("pivotSection.demo.rows");
  const pivotFeaturesData = raw("pivotSection.features");
  const ctaRating = raw("ctaBanner.rating");

  const featuresList = Array.isArray(featuresData) ? featuresData : fallbackFeaturesList;
  const appsList = Array.isArray(appsData) ? appsData : fallbackAppsList;
  const modulesList = Array.isArray(modulesData) ? modulesData : fallbackModulesList;
  const statsList = Array.isArray(statsData) ? statsData : fallbackStatsList;
  const pivotRowsList = Array.isArray(pivotRowsData) ? pivotRowsData : fallbackPivotRowsList;
  const pivotFeaturesList = Array.isArray(pivotFeaturesData) ? pivotFeaturesData : fallbackPivotFeatures;
  const ratingCount = typeof ctaRating === "number" ? ctaRating : 5;

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.14),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.08),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            iconName={tr("hero.eyebrowIcon")}
            labelKey="hero.eyebrowLabel"
            t={tr}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              {tr("hero.title")}{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                {tr("hero.titleHighlight")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {tr("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
            >
              {commonT("contactSales")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
            >
              {tr("hero.demoButton")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <SpreadsheetMockup t={tr} raw={raw} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              {tr("hero.badges.realTimeSync")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {tr("hero.badges.noCopyPaste")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>
            {tr("connectSection.title")}
            <br />
            {tr("connectSection.subtitle")}
          </ScriptHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {tr("connectSection.description")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-4">
          {modulesList.map((module: any) => {
            const IconComponent = getIconComponent(module.icon);
            return (
              <div
                key={module.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                  <IconComponent className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {module.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow
              iconName={tr("pivotSection.eyebrowIcon")}
              labelKey="pivotSection.eyebrowLabel"
              t={tr}
            />
            <ScriptHeading className="mt-5">
              {tr("pivotSection.title")}{" "}
              <span className="text-cyan-600 dark:text-cyan-400">{tr("pivotSection.titleHighlight")}</span>
            </ScriptHeading>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {tr("pivotSection.description")}
            </p>

            <div className="mt-8 space-y-4">
              {pivotFeaturesList.map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {tr("pivotSection.demo.title")}
              </span>
              <RefreshCw className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-3">
              {pivotRowsList.map((row: string[]) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {row[0]}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {row[1]}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {row[2]}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {row[3]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>
            {tr("visualizeSection.title")}{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {tr("visualizeSection.titleHighlight")}
            </span>
          </ScriptHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {tr("visualizeSection.description")}
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="grid gap-5 md:grid-cols-4">
            {statsList.map((stat: any) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-100">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-linear-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 p-6">
            <div className="flex h-56 items-end gap-4">
              {[38, 52, 44, 70, 62, 88, 74, 96].map((height, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-2xl bg-linear-to-t from-cyan-600 to-emerald-400"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {tr("featuresSection.title")}
            <br />
            {tr("featuresSection.subtitle")}
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuresList.map((feature: any) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.6rem] border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          {tr("appsSection.title")}{" "}
        </ScriptHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appsList.map((app: any) => {
            const IconComponent = getIconComponent(app.icon);
            return (
              <div
                key={app.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {tr("ctaBanner.title")}
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              {tr("ctaBanner.description")}
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: ratingCount }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-cyan-600 dark:text-cyan-400" />
        <ScriptHeading>
          {tr("footerCta.title")}
          <br />
          {tr("footerCta.subtitle")}
        </ScriptHeading>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {tr("footerCta.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 dark:hover:border-cyan-600 dark:hover:text-cyan-400"
          >
            {tr("footerCta.salesButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
