"use client";

import {
  Banknote,
  BarChart3,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HandCoins,
  HeartHandshake,
  Landmark,
  Layers3,
  PieChart,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FundShell, type FundPage } from "@/components/fund-accounting-shell";
import { ShowcaseHeading } from "@/components/showcase-typography";

type Metric = {
  label: string;
  value: string;
  detail: string;
};

const iconClasses = [
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
];

function SampleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  );
}

function PreviewFrame({
  icon,
  title,
  subtitle,
  sampleLabel,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  sampleLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/25">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 truncate text-[10px] text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>
        <SampleBadge label={sampleLabel} />
      </div>
      {children}
    </div>
  );
}

function DashboardPreview() {
  const t = useTranslations("pages.fundAccounting.dashboard.preview");
  const restrictions = t.raw("restrictions") as {
    name: string;
    received: string;
    spent: string;
    available: string;
  }[];
  const donors = t.raw("donors") as {
    name: string;
    grantCount: string;
    award: string;
    spent: string;
  }[];
  const grants = t.raw("attentionGrants") as {
    code: string;
    title: string;
    donor: string;
    burn: number;
    status: string;
  }[];

  return (
    <PreviewFrame
      icon={<PieChart className="h-5 w-5" />}
      title={t("title")}
      subtitle={t("subtitle")}
      sampleLabel={t("sampleLabel")}
    >
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="px-3 pb-2 pt-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {t("restrictionTitle")}
            </h4>
          </div>
          <table className="w-full min-w-[510px] text-left text-[10px]">
            <thead className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">
              <tr>
                {(t.raw("restrictionHeaders") as string[]).map((header) => (
                  <th key={header} scope="col" className="px-3 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {restrictions.map((item, index) => (
                <tr key={item.name}>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                        [
                          "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200",
                          "bg-violet-50 text-violet-800 dark:bg-violet-500/10 dark:text-violet-200",
                          "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200",
                        ][index]
                      }`}
                    >
                      {item.name}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {item.received}
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {item.spent}
                  </td>
                  <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">
                    {item.available}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="min-w-0 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="px-3 pb-2 pt-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {t("donorTitle")}
            </h4>
          </div>
          <table className="w-full min-w-[490px] text-left text-[10px]">
            <thead className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">
              <tr>
                {(t.raw("donorHeaders") as string[]).map((header) => (
                  <th key={header} scope="col" className="px-3 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {donors.map((donor) => (
                <tr key={donor.name}>
                  <td className="px-3 py-3 font-medium text-slate-800 dark:text-slate-100">
                    {donor.name}
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {donor.grantCount}
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {donor.award}
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                    {donor.spent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
        <div className="mb-3">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
            {t("attentionTitle")}
          </h4>
          <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
            {t("attentionCaption")}
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {grants.map((grant) => (
            <div
              key={grant.code}
              className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                    {grant.code}
                  </p>
                  <p className="mt-1 truncate text-[10px] font-semibold text-slate-800 dark:text-slate-100">
                    {grant.title}
                  </p>
                  <p className="mt-1 truncate text-[9px] text-slate-500 dark:text-slate-400">
                    {grant.donor}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[8px] font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
                  {grant.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${Math.min(grant.burn, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                  {grant.burn}% {t("burnLabel")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800 sm:grid-cols-4">
        {(t.raw("portfolio") as { label: string; value: string }[]).map(
          (item) => (
            <div
              key={item.label}
              className="border-b border-e border-slate-100 p-3 last:border-e-0 dark:border-slate-800 sm:border-b-0 sm:p-4"
            >
              <p className="truncate text-[9px] text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          ),
        )}
      </div>
    </PreviewFrame>
  );
}

function GrantsPreview() {
  const t = useTranslations("pages.fundAccounting.grants.preview");
  const rows = t.raw("rows") as {
    code: string;
    title: string;
    donor: string;
    status: string;
    award: string;
    spent: string;
    burn: number;
    dates: string;
    endDate: string;
  }[];
  const statusStyles = [
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
    "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  ];

  return (
    <PreviewFrame
      icon={<Landmark className="h-5 w-5" />}
      title={t("title")}
      subtitle={t("subtitle")}
      sampleLabel={t("sampleLabel")}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/30">
        <p className="text-[10px] text-slate-500 dark:text-slate-400">
          {t("registerCaption")}
        </p>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            {t("allStatuses")}
          </span>
          <span className="cursor-not-allowed rounded-lg bg-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {t("addGrantPreview")}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-xs">
          <thead className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
            <tr>
              {(t.raw("headers") as string[]).map((header) => (
                <th key={header} scope="col" className="px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row, index) => (
              <tr key={row.code}>
                <td className="px-4 py-4 font-bold text-emerald-700 dark:text-emerald-300">
                  {row.code}
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {row.title}
                  </p>
                  <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
                    {row.dates}
                  </p>
                </td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {row.donor}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                      statusStyles[index % statusStyles.length]
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  {row.award}
                </td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {row.spent}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          row.burn > 100 ? "bg-rose-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(row.burn, 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400">
                      {row.burn}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {row.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 border-t border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:grid-cols-3">
        {(t.raw("tranches") as { title: string; detail: string }[]).map(
          (tranche) => (
            <div
              key={tranche.title}
              className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100">
                {tranche.title}
              </p>
              <p className="mt-1 text-[9px] leading-4 text-slate-500 dark:text-slate-400">
                {tranche.detail}
              </p>
            </div>
          ),
        )}
      </div>
    </PreviewFrame>
  );
}

function DonorsFundsPreview() {
  const t = useTranslations("pages.fundAccounting.donorsFunds.preview");
  const donors = t.raw("donors") as {
    code: string;
    name: string;
    type: string;
    country: string;
    foreign: boolean;
  }[];
  const funds = t.raw("funds") as {
    code: string;
    name: string;
    restriction: string;
    received: string;
    spent: string;
    balance: string;
  }[];

  return (
    <PreviewFrame
      icon={<HeartHandshake className="h-5 w-5" />}
      title={t("title")}
      subtitle={t("subtitle")}
      sampleLabel={t("sampleLabel")}
    >
      <div className="space-y-5 p-4 sm:p-5">
        <div className="min-w-0">
          <h4 className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-100">
            {t("donorsTitle")}
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full min-w-[570px] text-left text-[10px]">
              <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
                <tr>
                  {(t.raw("donorHeaders") as string[]).map((header) => (
                    <th key={header} scope="col" className="px-3 py-2.5">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {donors.map((donor) => (
                  <tr key={donor.code}>
                    <td className="px-3 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                      {donor.code}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {donor.name}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {donor.type}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      <span>{donor.country}</span>
                      {donor.foreign && (
                        <span className="ml-2 rounded-full bg-sky-50 px-2 py-0.5 text-[8px] font-bold text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
                          {t("foreignLabel")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-w-0">
          <h4 className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-100">
            {t("fundsTitle")}
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full min-w-[570px] text-left text-[10px]">
              <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
                <tr>
                  {(t.raw("fundHeaders") as string[]).map((header) => (
                    <th key={header} scope="col" className="px-3 py-2.5">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {funds.map((fund) => (
                  <tr key={fund.code}>
                    <td className="px-3 py-3">
                      <p className="font-bold text-emerald-700 dark:text-emerald-300">
                        {fund.code}
                      </p>
                      <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
                        {fund.name}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {fund.restriction}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {fund.received}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {fund.spent}
                    </td>
                    <td className="px-3 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                      {fund.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="border-t border-slate-100 px-4 py-3 text-[10px] leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-5">
        {t("restrictionNote")}
      </p>
    </PreviewFrame>
  );
}

function ReportsPreview() {
  const t = useTranslations("pages.fundAccounting.reports.preview");
  const reports = t.raw("reports") as { title: string; detail: string }[];
  const summaryRows = t.raw("summaryRows") as {
    fund: string;
    restriction: string;
    income: string;
    expense: string;
    netChange: string;
  }[];
  const summaryMetrics = t.raw("summaryMetrics") as Metric[];
  const regulatoryReports = t.raw("regulatoryReports") as {
    code: string;
    title: string;
    detail: string;
  }[];

  return (
    <div className="space-y-5">
      <PreviewFrame
        icon={<BarChart3 className="h-5 w-5" />}
        title={t("summaryTitle")}
        subtitle={t("summarySubtitle")}
        sampleLabel={t("sampleLabel")}
      >
        <div className="grid gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:grid-cols-3 sm:p-5">
          {summaryMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60"
            >
              <p className="text-[9px] text-slate-500 dark:text-slate-400">
                {metric.label}
              </p>
              <p
                className={`mt-1 text-sm font-bold ${
                  index === 2
                    ? "text-amber-700 dark:text-amber-300"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
              <tr>
                {(t.raw("summaryHeaders") as string[]).map((header) => (
                  <th key={header} scope="col" className="px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {summaryRows.map((row) => (
                <tr key={row.fund}>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                    {row.fund}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.restriction}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.income}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.expense}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                    {row.netChange}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold dark:border-slate-700 dark:bg-slate-950/50">
              <tr>
                <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                  {t("totalsLabel")}
                </td>
                <td />
                <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                  {t("totalIncome")}
                </td>
                <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                  {t("totalExpense")}
                </td>
                <td className="px-4 py-3 text-emerald-700 dark:text-emerald-300">
                  {t("totalNetChange")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </PreviewFrame>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => {
          const Icon = [FileText, BarChart3, ClipboardCheck][index % 3];
          return (
            <div
              key={report.title}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  iconClasses[index % iconClasses.length]
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <h4 className="mt-3 text-xs font-bold text-slate-900 dark:text-white">
                {report.title}
              </h4>
              <p className="mt-1.5 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
                {report.detail}
              </p>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5 sm:p-5">
        <div className="flex gap-3">
          <CircleAlert className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
          <div>
            <h4 className="text-xs font-bold text-amber-950 dark:text-amber-100">
              {t("complianceTitle")}
            </h4>
            <p className="mt-1.5 text-[10px] leading-5 text-amber-950/80 dark:text-amber-100/75">
              {t("complianceNote")}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {regulatoryReports.map((item) => (
                <span
                  key={item.code}
                  className="rounded-lg border border-amber-300/70 bg-white/70 p-3 dark:border-amber-500/30 dark:bg-slate-900/50"
                >
                  <strong className="block text-[10px] text-amber-950 dark:text-amber-100">
                    {item.code} · {item.title}
                  </strong>
                  <span className="mt-1 block text-[9px] leading-4 text-amber-950/75 dark:text-amber-100/70">
                    {item.detail}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeneficiariesPreview() {
  const t = useTranslations("pages.fundAccounting.beneficiaries.preview");
  const indicators = t.raw("indicators") as {
    name: string;
    kind: string;
    baseline: string;
    target: string;
    achieved: string;
    progress: number;
    state: string;
  }[];
  const indicatorSummary = t.raw("indicatorSummary") as Metric[];

  return (
    <PreviewFrame
      icon={<UsersRound className="h-5 w-5" />}
      title={t("title")}
      subtitle={t("subtitle")}
      sampleLabel={t("sampleLabel")}
    >
      <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
        {indicatorSummary.map((item, index) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <p className="text-[9px] text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p
              className={`mt-1 text-lg font-bold ${
                index === 1
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {item.value}
            </p>
            <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 p-4 dark:border-slate-800 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              {t("indicatorTitle")}
            </h4>
            <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
              {t("indicatorSubtitle")}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {t("logframeBadge")}
          </span>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full min-w-[800px] text-left text-[10px]">
            <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
              <tr>
                {(t.raw("indicatorHeaders") as string[]).map((header) => (
                  <th key={header} scope="col" className="px-3 py-2.5">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {indicators.map((indicator) => {
                const atRisk = indicator.state === t("atRiskLabel");
                return (
                  <tr key={indicator.name}>
                    <td className="min-w-[220px] px-3 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      {indicator.name}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {indicator.kind}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {indicator.baseline}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {indicator.target}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-700 dark:text-slate-200">
                      {indicator.achieved}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              atRisk ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${indicator.progress}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300">
                          {indicator.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-1 text-[8px] font-bold ${
                          atRisk
                            ? "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"
                            : "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200"
                        }`}
                      >
                        {indicator.state}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="border-t border-slate-100 px-4 py-3 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-5">
        {t("privacyNote")}
      </p>
    </PreviewFrame>
  );
}

function CostAllocationPreview() {
  const t = useTranslations("pages.fundAccounting.costAllocation.preview");
  const grants = t.raw("allocations") as {
    code: string;
    name: string;
    basis: string;
    share: number;
    amount: string;
    status: string;
  }[];
  const methods = t.raw("methods") as { title: string; detail: string }[];
  const historyRows = t.raw("historyRows") as {
    code: string;
    period: string;
    basis: string;
    amount: string;
    grants: string;
    status: string;
  }[];

  return (
    <div className="space-y-5">
      <PreviewFrame
        icon={<FileCheck2 className="h-5 w-5" />}
        title={t("formTitle")}
        subtitle={t("formSubtitle")}
        sampleLabel={t("sampleLabel")}
      >
        <div className="p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t("periodLabel"), value: t("periodValue") },
              { label: t("basisLabel"), value: t("basisValue") },
              { label: t("totalLabel"), value: t("totalValue") },
              { label: t("descriptionLabel"), value: t("descriptionValue") },
            ].map((field) => (
              <div
                key={field.label}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
                  {field.label}
                </p>
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-800 dark:text-slate-100">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[9px] text-slate-500 dark:text-slate-400">
              {t("previewOnlyLabel")}
            </p>
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="rounded-lg border border-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {t("cancelPreview")}
              </span>
              <span className="cursor-not-allowed rounded-lg bg-slate-200 px-3 py-2 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {t("suggestSplitPreview")}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800">
          <div className="px-4 pb-2 pt-4 sm:px-5">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {t("historyTitle")}
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[690px] text-left text-[10px]">
              <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
                <tr>
                  {(t.raw("historyHeaders") as string[]).map((header) => (
                    <th key={header} scope="col" className="px-3 py-2.5">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {historyRows.map((row) => (
                  <tr key={row.code}>
                    <td className="px-3 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                      {row.code}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {row.period}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {row.basis}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      {row.amount}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {row.grants}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PreviewFrame>
      <PreviewFrame
        icon={<Banknote className="h-5 w-5" />}
        title={t("title")}
        subtitle={t("subtitle")}
        sampleLabel={t("sampleLabel")}
      >
        <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/60">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {t("totalLabel")}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {t("totalValue")}
              </p>
              <p className="mt-2 text-[9px] text-slate-500 dark:text-slate-400">
                {t("periodLabel")}: {t("periodValue")}
              </p>
              <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
                {t("basisLabel")}: {t("basisValue")}
              </p>
            </div>
            <h4 className="mt-5 text-[10px] font-bold text-slate-800 dark:text-slate-100">
              {t("distributionTitle")}
            </h4>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              {grants.map((grant, index) => (
                <div
                  key={grant.code}
                  className={[
                    "h-full",
                    "bg-emerald-500",
                    "bg-sky-500",
                    "bg-violet-500",
                    "bg-amber-500",
                  ][index % 4]}
                  style={{ width: `${grant.share}%` }}
                  title={`${grant.name}: ${grant.share}%`}
                />
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {grants.map((grant, index) => (
                <div key={grant.code} className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      [
                        "bg-emerald-500",
                        "bg-sky-500",
                        "bg-violet-500",
                        "bg-amber-500",
                      ][index % 4]
                    }`}
                  />
                  <span className="min-w-0 flex-1 truncate text-[9px] text-slate-600 dark:text-slate-300">
                    {grant.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-800 dark:text-slate-100">
                    {grant.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full min-w-[540px] text-left text-[10px]">
              <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
                <tr>
                  {(t.raw("headers") as string[]).map((header) => (
                    <th key={header} scope="col" className="px-3 py-2.5">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {grants.map((grant) => (
                  <tr key={grant.code}>
                    <td className="px-3 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                      {grant.code}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      {grant.name}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {grant.basis}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {grant.share}%
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-700 dark:text-slate-200">
                      {grant.amount}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">
                        {grant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PreviewFrame>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {methods.map((method, index) => (
          <div
            key={method.title}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              {t("methodLabel", { number: index + 1 })}
            </span>
            <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
              {method.title}
            </h4>
            <p className="mt-1.5 text-[9px] leading-5 text-slate-500 dark:text-slate-400">
              {method.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[10px] leading-5 text-amber-950 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-100">
        <CircleAlert className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
        <p>{t("accountingNote")}</p>
      </div>
    </div>
  );
}

function PagePreview({ page }: { page: FundPage }) {
  switch (page) {
    case "dashboard":
      return <DashboardPreview />;
    case "grants":
      return <GrantsPreview />;
    case "donorsFunds":
      return <DonorsFundsPreview />;
    case "reports":
      return <ReportsPreview />;
    case "beneficiaries":
      return <BeneficiariesPreview />;
    case "costAllocation":
      return <CostAllocationPreview />;
  }
}

export default function FundAccountingShowcase({ page }: { page: FundPage }) {
  return <FundShell page={page} preview={<PagePreview page={page} />} />;
}
