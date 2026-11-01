"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Layers3,
  MoreHorizontal,
  Plus,
  Printer,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type PreviewMetric = {
  label: string;
  value: string;
  change: string;
};

type VersionCard = {
  name: string;
  state: string;
  date: string;
  amount: string;
  note: string;
};

type Department = {
  name: string;
  owner: string;
  allocation: string;
  utilization: number;
  color: string;
};

type WorkflowStep = {
  title: string;
  description: string;
};

type DepartmentSpend = {
  name: string;
  planned: string;
  actual: string;
  utilization: number;
  variance: string;
};

type BudgetVersion = {
  year: string;
  name: string;
  number: string;
  status: string;
  approval: string;
};

type Report = {
  title: string;
  description: string;
};

type Benefit = {
  title: string;
  description: string;
};

const departmentColors = [
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
];
const departmentIconClasses = [
  "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
];

const reportIcons: LucideIcon[] = [BarChart3, Building2, Layers3, ArrowDownRight];

function DashboardPreview() {
  const t = useTranslations("pages.budgetManagement.hero.preview");
  const metrics = t.raw("metrics") as PreviewMetric[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto w-full max-w-[690px]"
      aria-label={t("accessibleLabel")}
    >
      <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-200/50 via-transparent to-sky-200/60 blur-3xl dark:from-emerald-500/10 dark:to-sky-500/10" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_100px_-34px_rgba(15,23,42,0.42)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {t("title")}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-400">
                {t("period")}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t("demoBadge")}
          </span>
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 dark:border-slate-800 dark:bg-slate-950/60 sm:p-3"
              >
                <p className="truncate text-[9px] font-medium text-slate-500 dark:text-slate-400 sm:text-[10px]">
                  {metric.label}
                </p>
                <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  {metric.value}
                </p>
                <p
                  className={`mt-1 flex items-center gap-1 text-[8px] font-semibold sm:text-[9px] ${
                    index === 3
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {index === 3 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 sm:text-xs">
                  {t("chartTitle")}
                </p>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[8px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  {t("chartPeriod")}
                </span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2 border-b border-slate-100 px-1 dark:border-slate-800 sm:h-28 sm:gap-3">
                {[44, 58, 51, 72, 63, 84, 69, 92].map((height, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 items-end"
                    aria-hidden="true"
                  >
                    <div
                      className={`w-full rounded-t-md ${
                        index === 7
                          ? "bg-emerald-500"
                          : "bg-emerald-200 dark:bg-emerald-500/30"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[8px] text-slate-400">
                {(t.raw("chartLabels") as string[]).map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-slate-950 p-3.5 text-white dark:bg-slate-800 sm:p-4">
              <div>
                <p className="text-[9px] font-medium text-slate-400">
                  {t("remainingLabel")}
                </p>
                <p className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
                  {t("remainingValue")}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[8px] text-slate-300">
                  <span>{t("utilizationLabel")}</span>
                  <span>{t("utilizationValue")}</span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15"
                  role="img"
                  aria-label={t("utilizationAccessible", {
                    value: t("utilizationValue"),
                  })}
                >
                  <div className="h-full w-[72%] rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[9px] leading-4 text-slate-400">
            <Sparkles className="h-3 w-3 shrink-0 text-emerald-500" />
            {t("footnote")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default function BudgetManagementShowcase() {
  const t = useTranslations("pages.budgetManagement");
  const versions = t.raw("versions.cards") as VersionCard[];
  const departments = t.raw("planning.departments") as Department[];
  const workflow = t.raw("workflow.steps") as WorkflowStep[];
  const departmentSpend = t.raw("monitoring.departments") as DepartmentSpend[];
  const budgetVersions = t.raw("table.rows") as BudgetVersion[];
  const reports = t.raw("reports.items") as Report[];
  const benefits = t.raw("benefits.items") as Benefit[];

  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white pt-12 dark:from-emerald-950/30 dark:via-slate-950 dark:to-slate-950 sm:pt-20">
        <div className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/10" />
        <div className="pointer-events-none absolute -left-48 top-64 -z-10 h-[450px] w-[450px] rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />
        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 lg:px-8 lg:pb-28">
          <div className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900/80 dark:text-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              {t("hero.eyebrow")}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[3.55rem]">
              {t("hero.title")}{" "}
              <span className="text-emerald-700 dark:text-emerald-300">
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10"
              >
                {t("hero.secondaryCta")}
                <ChevronRight className="h-4 w-4" />
              </a>
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

      <section className="border-y border-slate-100 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("versions.eyebrow")}
            title={t("versions.title")}
            description={t("versions.description")}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {versions.map((version, index) => (
              <div
                key={version.name}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900 ${
                  index === 0
                    ? "border-emerald-300 ring-1 ring-emerald-200 dark:border-emerald-500/50 dark:ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                {index === 0 && (
                  <span className="absolute end-4 top-4 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {t("versions.currentBadge")}
                  </span>
                )}
                <div className="flex items-center gap-2 text-slate-400">
                  {index === 0 ? (
                    <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <GitBranch className="h-4 w-4" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {version.state}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {version.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {version.date}
                </p>
                <p className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {version.amount}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">
                    {version.note}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <FileSpreadsheet className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {t("versions.emptyStateTitle")}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t("versions.emptyStateDescription")}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              {t("versions.emptyStateBadge")}
            </span>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {t("versions.footnote")}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow={t("planning.eyebrow")}
              title={t("planning.title")}
              description={t("planning.description")}
              align="left"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {departments.map((department, index) => (
                <div
                  key={department.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${departmentIconClasses[index % departmentIconClasses.length]}`}
                      >
                        {index === 0 ? (
                          <Building2 className="h-5 w-5" />
                        ) : index === 1 ? (
                          <ClipboardList className="h-5 w-5" />
                        ) : index === 2 ? (
                          <Layers3 className="h-5 w-5" />
                        ) : (
                          <Wallet className="h-5 w-5" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {department.name}
                        </h3>
                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                          {department.owner}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {department.allocation}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 dark:text-slate-400">
                      {t("planning.utilizationLabel")}
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {department.utilization}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${departmentColors[index % departmentColors.length]}`}
                      style={{ width: `${department.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            {(t.raw("planning.footerPoints") as string[]).map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-20 border-y border-slate-100 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("workflow.eyebrow")}
            title={t("workflow.title")}
            description={t("workflow.description")}
          />
          <div className="relative mt-14 grid gap-4 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-emerald-200 dark:bg-emerald-900 md:block" />
            {workflow.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div
                  className={`relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-bold shadow-sm ${
                    index === workflow.length - 1
                      ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950"
                      : "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300"
                  }`}
                >
                  {index === workflow.length - 1 ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    `0${index + 1}`
                  )}
                </div>
                <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[190px] text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
                {index < workflow.length - 1 && (
                  <ArrowRight className="mx-auto mt-3 hidden h-4 w-4 text-emerald-500 md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 flex max-w-3xl items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-xs leading-5 text-slate-600 dark:border-emerald-900/60 dark:bg-slate-900 dark:text-slate-300">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p>{t("workflow.footnote")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow={t("monitoring.eyebrow")}
              title={t("monitoring.title")}
              description={t("monitoring.description")}
              align="left"
            />
            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                <CircleAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                  {t("monitoring.alertTitle")}
                </h3>
                <p className="mt-1 text-xs leading-5 text-amber-900/75 dark:text-amber-100/70">
                  {t("monitoring.alertDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("monitoring.panelTitle")}
                </p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  {t("monitoring.panelSubtitle")}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {t("monitoring.demoBadge")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:grid-cols-3 sm:p-5">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t("monitoring.plannedLabel")}
                </p>
                <p className="mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  {t("monitoring.plannedValue")}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t("monitoring.actualLabel")}
                </p>
                <p className="mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  {t("monitoring.actualValue")}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t("monitoring.remainingLabel")}
                </p>
                <p className="mt-1 text-base font-bold text-emerald-700 dark:text-emerald-300 sm:text-lg">
                  {t("monitoring.remainingValue")}
                </p>
              </div>
            </div>
            <div className="space-y-4 p-4 sm:p-5">
              {departmentSpend.map((department) => (
                <div key={department.name}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px]">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {department.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {department.actual} / {department.planned}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          department.utilization > 90
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{
                          width: `${Math.min(department.utilization, 100)}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`w-12 text-end text-[9px] font-bold ${
                        department.utilization > 90
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {department.variance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={t("table.eyebrow")}
              title={t("table.title")}
              description={t("table.description")}
              align="left"
            />
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              {t("table.demoBadge")}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Layers3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {t("table.panelTitle")}
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-700 px-2 py-1 text-[9px] font-semibold text-white dark:bg-emerald-500 dark:text-slate-950">
                  <Plus className="h-3 w-3" />
                  {t("table.newVersionLabel")}
                </span>
                <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  CSV
                </span>
                <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  Excel
                </span>
                <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  <Printer className="inline h-3 w-3" /> {t("table.printLabel")}
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
                  <tr>
                    {(t.raw("table.headers") as string[]).map((header) => (
                      <th key={header} scope="col" className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          {header}
                          <span className="text-slate-300" aria-hidden="true">
                            ↕
                          </span>
                        </span>
                      </th>
                    ))}
                    <th scope="col" className="px-5 py-3 text-end">
                      {t("table.actionsHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {budgetVersions.map((version, index) => (
                    <tr
                      key={version.number}
                      className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                        {version.year}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                        {version.name}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                        {version.number}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${
                            index === 0
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : index === 1
                                ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {version.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <CheckCircle2
                            className={`h-3.5 w-3.5 ${
                              index === 0
                                ? "text-emerald-500"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          />
                          {version.approval}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-end">
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400"
                          aria-label={t("table.previewAction")}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>{t("table.footerNote")}</span>
              <span>{t("table.rowsCount", { count: budgetVersions.length })}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("reports.eyebrow")}
            title={t("reports.title")}
            description={t("reports.description")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reports.map((report, index) => {
              const Icon = reportIcons[index % reportIcons.length];
              return (
                <div
                  key={report.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-transform duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-slate-900 dark:text-white">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {report.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="me-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t("reports.exportLabel")}
            </span>
            {[
              { label: "CSV", Icon: FileText },
              { label: "Excel", Icon: FileSpreadsheet },
              { label: t("reports.printLabel"), Icon: Printer },
            ].map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {label}
              </span>
            ))}
            <span className="sr-only">{t("reports.showcaseOnly")}</span>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("benefits.eyebrow")}
            title={t("benefits.title")}
            description={t("benefits.description")}
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {index === 0 ? (
                    <BarChart3 className="h-5 w-5" />
                  ) : index === 1 ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : index === 2 ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : index === 3 ? (
                    <GitBranch className="h-5 w-5" />
                  ) : index === 4 ? (
                    <ClipboardList className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#064e3b,#047857_55%,#0f766e)] px-4 py-20 text-center sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute -left-20 -top-28 -z-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-36 -right-16 -z-10 h-96 w-96 rounded-full bg-teal-300/15 blur-3xl" />
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-emerald-100">
            <Wallet className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-50/80 sm:text-base">
            {t("finalCta.description")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
          >
            {t("finalCta.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-emerald-100/65">
            {t("finalCta.caption")}
          </p>
        </div>
      </section>
    </main>
  );
}
