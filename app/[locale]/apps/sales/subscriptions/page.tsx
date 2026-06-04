"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  FileText,
  LineChart,
  Repeat,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl ${className}`}
      style={scriptFont}
    >
      {children}
    </h2>
  );
}

function HandUnderline({
  children,
  color = "bg-sky-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-2 w-[105%] -translate-x-1/2 -rotate-1 rounded-full ${color} dark:opacity-80`}
      />
    </span>
  );
}

function HandCircle({
  children,
  color = "border-teal-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.25em] -translate-y-1/2 -rotate-3 rounded-[50%] border-[5px] ${color} dark:border-opacity-70`}
      />
    </span>
  );
}

function SectionEyebrow({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/40 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-amber-100 dark:ring-amber-800">
      <span className="text-amber-500 dark:text-amber-400">{icon}</span>
      {label}
    </div>
  );
}

function SubscriptionPreview({ t }: { t: any }) {
  const subscriptionRows = [
    {
      id: t("dashboard.rows.row1.id"),
      customer: t("dashboard.rows.row1.customer"),
      nextBill: t("dashboard.rows.row1.nextBill"),
      revenue: t("dashboard.rows.row1.revenue"),
      status: t("dashboard.rows.row1.status"),
    },
    {
      id: t("dashboard.rows.row2.id"),
      customer: t("dashboard.rows.row2.customer"),
      nextBill: t("dashboard.rows.row2.nextBill"),
      revenue: t("dashboard.rows.row2.revenue"),
      status: t("dashboard.rows.row2.status"),
    },
    {
      id: t("dashboard.rows.row3.id"),
      customer: t("dashboard.rows.row3.customer"),
      nextBill: t("dashboard.rows.row3.nextBill"),
      revenue: t("dashboard.rows.row3.revenue"),
      status: t("dashboard.rows.row3.status"),
    },
    {
      id: t("dashboard.rows.row4.id"),
      customer: t("dashboard.rows.row4.customer"),
      nextBill: t("dashboard.rows.row4.nextBill"),
      revenue: t("dashboard.rows.row4.revenue"),
      status: t("dashboard.rows.row4.status"),
    },
    {
      id: t("dashboard.rows.row5.id"),
      customer: t("dashboard.rows.row5.customer"),
      nextBill: t("dashboard.rows.row5.nextBill"),
      revenue: t("dashboard.rows.row5.revenue"),
      status: t("dashboard.rows.row5.status"),
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            {t("dashboard.appName")}
          </span>
        </div>

        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {t("dashboard.status")}
        </span>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-700">
          <div className="grid grid-cols-[90px_1fr_120px_120px_120px] bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            <span>{t("dashboard.tableHeaders.id")}</span>
            <span>{t("dashboard.tableHeaders.customer")}</span>
            <span>{t("dashboard.tableHeaders.nextBill")}</span>
            <span>{t("dashboard.tableHeaders.revenue")}</span>
            <span>{t("dashboard.tableHeaders.status")}</span>
          </div>

          {subscriptionRows.map((row, index) => (
            <div
              key={row.id}
              className={`grid grid-cols-[90px_1fr_120px_120px_120px] px-4 py-3 text-sm ${
                index % 2 === 0
                  ? "bg-white dark:bg-slate-900"
                  : "bg-slate-50 dark:bg-slate-800/40"
              }`}
            >
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {row.id}
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {row.customer}
              </span>
              <span className="text-rose-500 dark:text-rose-400">
                {row.nextBill}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {row.revenue}
              </span>
              <span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    row.status === "Quotation" || row.status === "কোটেশন"
                      ? "bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400"
                      : "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                  }`}
                >
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
      </button>
    </div>
  );
}

export default function SubscriptionsPage() {
  const t = useTranslations("pages.subscriptions");

  const featureCards = [
    {
      title: t("featuresSection.features.autoRenewals.title"),
      description: t("featuresSection.features.autoRenewals.description"),
      icon: Repeat,
    },
    {
      title: t("featuresSection.features.customerPortal.title"),
      description: t("featuresSection.features.customerPortal.description"),
      icon: Users,
    },
    {
      title: t("featuresSection.features.recurringInvoices.title"),
      description: t("featuresSection.features.recurringInvoices.description"),
      icon: FileText,
    },
    {
      title: t("featuresSection.features.paymentAutomation.title"),
      description: t("featuresSection.features.paymentAutomation.description"),
      icon: CreditCard,
    },
    {
      title: t("featuresSection.features.revenueAnalytics.title"),
      description: t("featuresSection.features.revenueAnalytics.description"),
      icon: BarChart3,
    },
    {
      title: t("featuresSection.features.retentionWorkflows.title"),
      description: t("featuresSection.features.retentionWorkflows.description"),
      icon: ShieldCheck,
    },
  ];

  const appsList = [
    {
      title: t("appsSection.apps.crm.title"),
      desc: t("appsSection.apps.crm.desc"),
      icon: Users,
    },
    {
      title: t("appsSection.apps.sales.title"),
      desc: t("appsSection.apps.sales.desc"),
      icon: TrendingUp,
    },
    {
      title: t("appsSection.apps.invoicing.title"),
      desc: t("appsSection.apps.invoicing.desc"),
      icon: FileText,
    },
    {
      title: t("appsSection.apps.accounting.title"),
      desc: t("appsSection.apps.accounting.desc"),
      icon: BarChart3,
    },
    {
      title: t("appsSection.apps.payments.title"),
      desc: t("appsSection.apps.payments.desc"),
      icon: WalletCards,
    },
    {
      title: t("appsSection.apps.analytics.title"),
      desc: t("appsSection.apps.analytics.desc"),
      icon: LineChart,
    },
  ];

  const visitorCards = [
    {
      title: t("visitorsSection.cards.easySignup.title"),
      description: t("visitorsSection.cards.easySignup.description"),
      icon: FileText,
    },
    {
      title: t("visitorsSection.cards.userPortal.title"),
      description: t("visitorsSection.cards.userPortal.description"),
      icon: Users,
    },
    {
      title: t("visitorsSection.cards.autoPayments.title"),
      description: t("visitorsSection.cards.autoPayments.description"),
      icon: CreditCard,
    },
  ];

  const salesForceCards = [
    {
      title: t("salesForceSection.cards.templates.title"),
      description: t("salesForceSection.cards.templates.description"),
      icon: FileText,
    },
    {
      title: t("salesForceSection.cards.reasonTracking.title"),
      description: t("salesForceSection.cards.reasonTracking.description"),
      icon: Target,
    },
    {
      title: t("salesForceSection.cards.focusedSales.title"),
      description: t("salesForceSection.cards.focusedSales.description"),
      icon: TrendingUp,
    },
  ];

  const analysisCards = [
    {
      title: t("analysisSection.cards.salesPerformance.title"),
      description: t("analysisSection.cards.salesPerformance.description"),
      icon: BarChart3,
    },
    {
      title: t("analysisSection.cards.revenueAnalytics.title"),
      description: t("analysisSection.cards.revenueAnalytics.description"),
      icon: LineChart,
    },
    {
      title: t("analysisSection.cards.forecasting.title"),
      description: t("analysisSection.cards.forecasting.description"),
      icon: CalendarClock,
    },
  ];

  const subscriptionDetails = [
    {
      label: t("focusSection.subscriptionCard.planLabel"),
      value: t("focusSection.subscriptionCard.planValue"),
    },
    {
      label: t("focusSection.subscriptionCard.billingLabel"),
      value: t("focusSection.subscriptionCard.billingValue"),
    },
    {
      label: t("focusSection.subscriptionCard.renewalLabel"),
      value: t("focusSection.subscriptionCard.renewalValue"),
    },
    {
      label: t("focusSection.subscriptionCard.nextInvoiceLabel"),
      value: t("focusSection.subscriptionCard.nextInvoiceValue"),
    },
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(245,158,11,0.15),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(14,165,233,0.11),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(245,158,11,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(14,165,233,0.06),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label={t("hero.eyebrow.label")}
            icon={<Repeat className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {t("hero.title")}{" "}
              <span
                className="text-amber-500 dark:text-amber-400"
                style={scriptFont}
              >
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 dark:shadow-amber-500/30"
            >
              {t("hero.buttons.meetAdvisor")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <SubscriptionPreview t={t} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-amber-500 dark:text-amber-400" />
              {t("dashboard.badges.autoRenewals")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t("dashboard.badges.revenueSynced")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ScriptHeading>
            {t("focusSection.title")}
            <br />
            {t("focusSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-lg font-semibold text-slate-800 dark:text-slate-200">
            {t("focusSection.description")}
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("focusSection.paragraph")}
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/40 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-950 dark:text-white">
                {t("focusSection.subscriptionCard.title")}
              </p>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {t("focusSection.subscriptionCard.status")}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {subscriptionDetails.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 text-sm shadow-sm"
                >
                  <span className="text-slate-500 dark:text-slate-400">
                    {label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>{t("visitorsSection.title")}</ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold text-slate-700 dark:text-slate-300">
          {t("visitorsSection.description")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visitorCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>{t("salesForceSection.title")}</ScriptHeading>

          <p className="mx-auto mt-5 max-w-xl text-base font-semibold text-slate-700 dark:text-slate-300">
            {t("salesForceSection.description")}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {salesForceCards.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-3xl bg-white dark:bg-slate-800 text-amber-500 dark:text-amber-400 shadow-sm ring-4 ring-slate-950/90 dark:ring-slate-700">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>{t("analysisSection.title")}</ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold text-slate-700 dark:text-slate-300">
          {t("analysisSection.description")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {analysisCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-5">
                  <Icon className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("featuresSection.title")}{" "}
            <HandCircle color="border-teal-400 dark:border-teal-500">
              {t("featuresSection.highlight")}
            </HandCircle>
            <br />
            {t("featuresSection.subtitle")}{" "}
            <HandUnderline color="bg-sky-400">
              {t("featuresSection.subtitle")}
            </HandUnderline>
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
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
          {t("appsSection.title")}{" "}
          <HandUnderline color="bg-sky-400">
            {t("appsSection.needHighlight")}
          </HandUnderline>
          ,{" "}
          <HandUnderline color="bg-sky-400">
            {t("appsSection.appHighlight")}
          </HandUnderline>
          .
        </ScriptHeading>

        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
          {t("appsSection.description")}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appsList.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
        >
          {t("appsSection.seeAllApps")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              {t("ctaSection.description")}
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-amber-600 dark:text-amber-400" />

        <ScriptHeading>
          {t("getStartedSection.title")}
          <br />
          {t("getStartedSection.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("getStartedSection.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 dark:shadow-amber-500/30"
          >
            {t("getStartedSection.buttons.contactSales")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
