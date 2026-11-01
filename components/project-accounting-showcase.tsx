"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Calendar,
  Check,
  CircleDollarSign,
  ClipboardList,
  FilePlus2,
  FileText,
  Flag,
  Folder,
  GitBranch,
  HardHat,
  LayoutDashboard,
  ListChecks,
  PieChart,
  Receipt,
  ShieldAlert,
  Sparkles,
  Tag,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

type DashboardMetric = {
  label: string;
  value: string;
  caption: string;
};

type FinancialRow = {
  label: string;
  value: string;
  emphasis?: boolean;
  tone?: "positive" | "negative";
};

type ShowcaseItem = {
  title: string;
  description: string;
};

const moduleIcons: LucideIcon[] = [
  Folder,
  LayoutDashboard,
  Tag,
  Wallet,
  CircleDollarSign,
  FilePlus2,
  BarChart3,
  Receipt,
  Calendar,
  ShieldAlert,
  FileText,
  Flag,
  ListChecks,
  GitBranch,
  PieChart,
];

const benefitIcons: LucideIcon[] = [
  BarChart3,
  Receipt,
  CircleDollarSign,
  PieChart,
  FileText,
  ArrowDownRight,
];

const industryIcons: LucideIcon[] = [
  HardHat,
  BriefcaseBusiness,
  ClipboardList,
  Folder,
  GitBranch,
  BarChart3,
];

function DashboardPreview() {
  const t = useTranslations("pages.project.showcase");
  const dashboard = t.raw("dashboard") as {
    workspace: string;
    project: string;
    projectCode: string;
    status: string;
    tabs: string[];
    metrics: DashboardMetric[];
    revenueTitle: string;
    revenueRows: FinancialRow[];
    costTitle: string;
    costRows: FinancialRow[];
    note: string;
    menu: string[];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto w-full min-w-0 max-w-[760px]"
    >
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/50 via-transparent to-violet-200/50 blur-2xl dark:from-sky-500/10 dark:to-violet-500/10" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_100px_-34px_rgba(30,41,59,0.42)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {dashboard.workspace}
              </p>
              <p className="hidden text-[10px] text-slate-400 sm:block">
                {dashboard.project}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:inline-flex">
              {t("dashboard.previewLabel")}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        <div className="flex">
          <aside className="hidden w-[138px] shrink-0 border-r border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60 sm:block">
            <p className="mb-3 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {dashboard.projectCode}
            </p>
            <div className="space-y-1">
              {dashboard.menu.map((label, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 text-[10px] font-medium ${
                    index === 0
                      ? "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {index === 0 ? (
                    <Folder className="h-3.5 w-3.5" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                  )}
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium text-slate-400">
                  {dashboard.projectCode} <span className="px-1">·</span>{" "}
                  {dashboard.project}
                </p>
                <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  {t("dashboard.projectName")}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {dashboard.status}
              </span>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto border-b border-slate-100 text-[10px] dark:border-slate-800">
              {dashboard.tabs.map((tab) => (
                <span
                  key={tab}
                  className={`shrink-0 border-b-2 pb-2 font-semibold ${
                    tab === t("dashboard.activeTab")
                      ? "border-violet-600 text-violet-700 dark:text-violet-300"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
              {dashboard.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900 sm:p-3"
                >
                  <p className="min-h-7 text-[9px] leading-4 text-slate-500 dark:text-slate-400 sm:text-[10px]">
                    {metric.label}
                  </p>
                  <p
                    className={`mt-0.5 truncate text-xs font-bold sm:text-sm ${
                      index === 2
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-1 truncate text-[8px] text-slate-400 sm:text-[9px]">
                    {metric.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2.5 md:grid-cols-2">
              <FinancialPanel title={dashboard.revenueTitle} rows={dashboard.revenueRows} />
              <FinancialPanel title={dashboard.costTitle} rows={dashboard.costRows} />
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-[9px] leading-4 text-slate-400">
              <Sparkles className="h-3 w-3 shrink-0" />
              {dashboard.note}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FinancialPanel({
  title,
  rows,
}: {
  title: string;
  rows: FinancialRow[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700 sm:p-3.5">
      <h4 className="mb-2.5 text-[10px] font-bold text-slate-900 dark:text-white sm:text-xs">
        {title}
      </h4>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-2 py-2 text-[9px] sm:text-[10px] ${
              row.emphasis
                ? "font-bold text-slate-800 dark:text-slate-100"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <span>{row.label}</span>
            <span
              className={`shrink-0 ${
                row.tone === "positive"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : row.tone === "negative"
                    ? "text-rose-600 dark:text-rose-400"
                    : ""
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectAccountingShowcase() {
  const t = useTranslations("pages.project.showcase");
  const modules = t.raw("modules") as ShowcaseItem[];
  const steps = t.raw("workflow.steps") as ShowcaseItem[];
  const benefits = t.raw("benefits.items") as ShowcaseItem[];
  const industries = t.raw("industries.items") as ShowcaseItem[];
  const wip = t.raw("wip") as {
    earnedLabel: string;
    earnedValue: string;
    billedLabel: string;
    billedValue: string;
    underbillingLabel: string;
    underbillingValue: string;
    completionLabel: string;
    completionValue: string;
    costToDateLabel: string;
    costToDateValue: string;
    costToCompleteLabel: string;
    costToCompleteValue: string;
    eacLabel: string;
    eacValue: string;
  };

  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-12 dark:from-slate-900/70 dark:via-slate-950 dark:to-slate-950 sm:pt-20">
        <div className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/10" />
        <div className="pointer-events-none absolute -left-48 top-64 -z-10 h-[450px] w-[450px] rounded-full bg-violet-200/25 blur-3xl dark:bg-violet-500/10" />
        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 lg:px-8 lg:pb-28">
          <div className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-violet-800 shadow-sm dark:border-violet-500/30 dark:bg-slate-900/80 dark:text-violet-200">
              <Sparkles className="h-3.5 w-3.5 text-violet-500" />
              {t("hero.eyebrow")}
            </div>
            <h1
              className="mt-6 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[3.55rem]"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              {t("hero.title")}{" "}
              <span className="relative inline-block text-violet-700 dark:text-violet-300">
                {t("hero.titleHighlight")}
                <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full rounded-full bg-sky-200/80 dark:bg-sky-500/25" />
              </span>
            </h1>
            <p className="mt-6 w-full min-w-0 max-w-xl break-words text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#714b67] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:shadow-[#714b67]/30"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#wip"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/10"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              {(t.raw("hero.highlights") as string[]).map((highlight) => (
                <span key={highlight} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <DashboardPreview />
        </div>
      </section>

      <section
        id="feature-areas"
        className="scroll-mt-20 border-y border-slate-100 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
              {t("modulesEyebrow")}
            </p>
            <h2
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              {t("modulesTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("modulesDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {modules.map((module, index) => {
              const Icon = moduleIcons[index] ?? Folder;
              return (
                <article
                  key={module.title}
                  className="group rounded-xl border border-slate-200/90 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-500/40 dark:hover:shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700 transition group-hover:bg-violet-700 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-300 dark:group-hover:bg-violet-500">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-slate-300 dark:text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {module.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="wip"
        className="scroll-mt-16 bg-white py-20 dark:bg-slate-950 sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/20">
              <PieChart className="h-3.5 w-3.5" />
              {t("wip.eyebrow")}
            </div>
            <h2
              className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              {t("wip.title")}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("wip.description")}
            </p>
            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {t("wip.formulaTitle")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-100">
                {t("wip.formula")}
              </p>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400 dark:text-slate-500">
              {t("wip.disclaimer")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-36px_rgba(30,41,59,0.4)] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t("wip.projectLabel")}
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                  {t("wip.projectName")}
                </h3>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                {t("wip.forecastLabel")}
              </span>
            </div>

            <div className="grid items-center gap-6 py-6 sm:grid-cols-[auto_1fr]">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full p-2 sm:mx-0" style={{ background: "conic-gradient(#7c3aed 0% 68.4%, #e2e8f0 68.4% 100%)" }}>
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
                  <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {wip.completionValue}
                  </span>
                  <span className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    {wip.completionLabel}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <ComparisonRow
                  label={wip.earnedLabel}
                  value={wip.earnedValue}
                  icon={ArrowUpRight}
                  iconClass="text-emerald-600 dark:text-emerald-400"
                  barClass="bg-emerald-500"
                  width="68%"
                />
                <ComparisonRow
                  label={wip.billedLabel}
                  value={wip.billedValue}
                  icon={ArrowDownRight}
                  iconClass="text-sky-600 dark:text-sky-400"
                  barClass="bg-sky-500"
                  width="62%"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MiniMetric label={wip.costToDateLabel} value={wip.costToDateValue} />
              <MiniMetric
                label={wip.costToCompleteLabel}
                value={wip.costToCompleteValue}
              />
              <MiniMetric label={wip.eacLabel} value={wip.eacValue} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-amber-50 px-4 py-3 dark:bg-amber-500/10">
              <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                {wip.underbillingLabel}
              </span>
              <span className="shrink-0 text-sm font-bold text-amber-800 dark:text-amber-200">
                {wip.underbillingValue}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
              {t("workflow.eyebrow")}
            </p>
            <h2
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              {t("workflow.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("workflow.description")}
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="relative rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-7 z-10 hidden h-5 w-5 rounded-full bg-slate-50 p-0.5 text-violet-400 dark:bg-slate-900 lg:block xl:hidden" />
                )}
              </article>
            ))}
          </div>
          <div className="mt-8 hidden items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500 xl:flex">
            <span>{t("workflow.startLabel")}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-violet-200 via-violet-400 to-emerald-300 dark:from-violet-500/30 dark:via-violet-400/60 dark:to-emerald-400/50" />
            <span>{t("workflow.endLabel")}</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                {t("benefits.eyebrow")}
              </p>
              <h2
                className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                {t("benefits.title")}
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
                {t("benefits.description")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefitIcons[index] ?? Check;
                return (
                  <article
                    key={benefit.title}
                    className="flex gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {benefit.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                {t("industries.eyebrow")}
              </p>
              <h2
                className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                {t("industries.title")}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {t("industries.description")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {industries.map((industry, index) => {
                const Icon = industryIcons[index] ?? BriefcaseBusiness;
                return (
                  <div
                    key={industry.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {industry.title}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                        {industry.description}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-20 -top-40 -z-10 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-violet-200 ring-1 ring-white/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
            {t("cta.eyebrow")}
          </p>
          <h2
            className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            {t("cta.description")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ComparisonRow({
  label,
  value,
  icon: Icon,
  iconClass,
  barClass,
  width,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClass: string;
  barClass: string;
  width: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Icon className={`h-3.5 w-3.5 shrink-0 ${iconClass}`} />
          <span className="truncate">{label}</span>
        </span>
        <span className="shrink-0 text-xs font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className={`h-full rounded-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-800/70">
      <p className="text-[10px] leading-4 text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
