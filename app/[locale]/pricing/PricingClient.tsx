// app/[locale]/pricing/PricingClient.tsx

"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  Crown,
  Gem,
  Headphones,
  HelpCircle,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type Currency = "bdt" | "usd";
type ChargeKind = "setup" | "quarterly" | "monthly" | "maintenance";

const USD_EXCHANGE_RATE = 122;

type Plan = {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: "users" | "zap" | "building2" | "layers3" | "rocket" | "crown";
  color: string;
  softBg: string;
  iconText: string;
  cta: string;
  href: string;
  highlighted: boolean;
  spotlight?: string;
  userCount: number;
  usersLabel: string;
  charges: {
    kind: ChargeKind;
    label: string;
    amountBdt: number | null;
    usdOnly?: boolean;
    note?: string;
  }[];
  features: string[];
};

type Benefit = {
  title: string;
  description: string;
  icon: "creditCard" | "lockKeyhole" | "layers3";
};

type ComparisonRow = {
  feature: string;
  values: Record<string, string | boolean>;
};

type FaqItem = {
  q: string;
  a: string;
};

type PreviewMetric = {
  value: number | string;
  label: string;
};

type PriceDisplay = {
  value: string;
};

const planIcons = {
  users: Users,
  zap: Zap,
  building2: Building2,
  layers3: Layers3,
  rocket: Rocket,
  crown: Crown,
} as const;

const benefitIcons = {
  creditCard: CreditCard,
  lockKeyhole: LockKeyhole,
  layers3: Layers3,
} as const;

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100 ${className}`}
      style={{
        fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl dark:bg-slate-950/60">
      <span>{icon}</span>
      {label}
    </div>
  );
}

export default function PricingClient() {
  const t = useTranslations("pages.pricing");
  const actionT = useTranslations("common.actions");
  const stateT = useTranslations("common.states");
  const locale = useLocale();
  const [currency, setCurrency] = useState<Currency>("bdt");
  const plans = t.raw("plans") as Plan[];
  const modules = t.raw("modules") as string[];
  const benefits = t.raw("benefits") as Benefit[];
  const comparison = t.raw("comparison") as ComparisonRow[];
  const faqs = t.raw("faqs") as FaqItem[];
  const previewMetrics = t.raw("hero.preview.metrics") as PreviewMetric[];
  const featuredPlan =
    plans.find((plan) => plan.highlighted) ??
    plans.find((plan) => plan.id === "star") ??
    plans[0];

  function isCorePlan(plan: Plan) {
    return plan.id !== "enterprise";
  }

  function findCharge(plan: Plan, kind: ChargeKind) {
    return plan.charges.find((charge) => charge.kind === kind);
  }

  function formatAmount(amount: number, minimumFractionDigits = 0, maximumFractionDigits = 0) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  }

  function hasFraction(amount: number) {
    return Math.abs(amount - Math.round(amount)) > 0.001;
  }

  function formatPriceFromBdt(amountBdt: number | null, usdOnly = false): PriceDisplay {
    if (amountBdt === null) {
      return { value: stateT("custom") };
    }

    if (usdOnly) {
      const amountUsd = amountBdt / USD_EXCHANGE_RATE;
      const showDecimals = hasFraction(amountUsd) || amountUsd < 100;
      return {
        value: `$${formatAmount(
          amountUsd,
          showDecimals ? 2 : 0,
          showDecimals ? 2 : 0,
        )}`,
      };
    }

    if (currency === "bdt") {
      const showDecimals = hasFraction(amountBdt);
      return {
        value: `৳${formatAmount(amountBdt, showDecimals ? 2 : 0, showDecimals ? 2 : 0)}`,
      };
    }

    const amountUsd = amountBdt / USD_EXCHANGE_RATE;
    const showDecimals = hasFraction(amountUsd) || amountUsd < 100;

    return {
      value: `$${formatAmount(
        amountUsd,
        showDecimals ? 2 : 0,
        showDecimals ? 2 : 0,
      )}`,
    };
  }

  function getPriceDisplay(charge: { amountBdt: number | null; usdOnly?: boolean }): PriceDisplay {
    return formatPriceFromBdt(charge.amountBdt, charge.usdOnly);
  }

  function formatCurrency(charge: { amountBdt: number | null; usdOnly?: boolean }) {
    return getPriceDisplay(charge).value;
  }

  function formatMetricValue(value: number | string) {
    return typeof value === "number"
      ? new Intl.NumberFormat(locale).format(value)
      : value;
  }

  function getVisibleFeatures(plan: Plan) {
    return plan.features;
  }

  function getCorePlanPricing(plan: Plan) {
    const quarterlyCharge = findCharge(plan, "quarterly");
    const setupCharge = findCharge(plan, "setup");

    if (!quarterlyCharge || quarterlyCharge.amountBdt === null) {
      return null;
    }

    const monthlyAmountBdt = quarterlyCharge.amountBdt / 3;
    const perUserAmountBdt =
      plan.userCount > 0 ? monthlyAmountBdt / plan.userCount : null;

    return {
      monthlyAmountBdt,
      perUserAmountBdt,
      quarterlyCharge,
      setupCharge,
    };
  }

  function getPreviewCharges(plan: Plan) {
    if (isCorePlan(plan)) {
      const corePricing = getCorePlanPricing(plan);

      if (corePricing) {
        return {
          primaryValue: formatPriceFromBdt(corePricing.monthlyAmountBdt).value,
          primaryLabel: t("plansSection.monthlyLabel"),
          secondaryValue: formatPriceFromBdt(corePricing.perUserAmountBdt).value,
          secondaryLabel: t("plansSection.perUserLabel"),
        };
      }
    }

    const primaryCharge = findCharge(plan, "monthly") ?? plan.charges[0];
    const secondaryCharge =
      findCharge(plan, "maintenance") ?? findCharge(plan, "setup") ?? plan.charges[1];

    return {
      primaryValue: primaryCharge ? formatCurrency(primaryCharge) : stateT("custom"),
      primaryLabel: primaryCharge?.label ?? "",
      secondaryValue: secondaryCharge ? formatCurrency(secondaryCharge) : stateT("custom"),
      secondaryLabel: secondaryCharge?.label ?? "",
    };
  }

  const previewCharges = getPreviewCharges(featuredPlan);

  function renderFeatureValue(value: string | boolean) {
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center gap-2 font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          {stateT("included")}
        </span>
      ) : (
        <span className="text-slate-400 dark:text-slate-500">
          {stateT("notIncluded")}
        </span>
      );
    }

    return <span>{value}</span>;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf7ff_22%,_#ffffff_55%,_#fff8ed_100%)] text-slate-800 dark:bg-[linear-gradient(180deg,_#020617_0%,_#0b1220_35%,_#020617_70%,_#020617_100%)] dark:text-slate-100">
      <section className="relative isolate overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] lg:rounded-b-[7rem]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_12%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.16),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fbf7ff_62%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_15%_12%,rgba(124,58,237,0.22),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.18),transparent_30%),linear-gradient(180deg,#020617_0%,#0b1220_62%,#020617_100%)]" />
        <div className="absolute left-10 top-28 -z-10 hidden h-24 w-24 rounded-[2rem] bg-white/80 shadow-xl backdrop-blur-xl lg:block dark:bg-slate-950/50 dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]" />
        <div className="absolute right-20 top-32 -z-10 hidden h-36 w-36 rounded-full bg-primary/10 blur-3xl lg:block" />
        <div className="absolute bottom-12 left-1/2 -z-10 hidden h-56 w-56 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex max-w-3xl flex-col justify-center space-y-8">
            <SectionEyebrow
              icon={<Sparkles className="h-4 w-4" />}
              label={t("hero.eyebrow")}
            />

            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/70">
                {t("hero.label")}
              </p>

              <h1
                className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-slate-100"
                style={{
                  fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
                }}
              >
                {t("hero.title")}
                <span className="block bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] bg-clip-text text-transparent">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                {actionT("viewPlans")}
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/80 px-7 py-4 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-white dark:bg-slate-950/60 dark:hover:bg-slate-950/80"
              >
                {actionT("talkToSales")}
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
              {(t.raw("hero.highlights") as string[]).map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="absolute -left-4 top-8 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block dark:border-slate-800/70 dark:bg-slate-950/60 dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t("hero.badges.bestValueTitle")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("hero.badges.bestValuePlan")}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 bottom-12 z-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:block dark:border-slate-800/70 dark:bg-slate-950/60 dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Rocket className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t("hero.badges.scaleReadyTitle")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("hero.badges.scaleReadyDescription")}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/75 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-medium text-white/50">
                    {t("hero.preview.windowTitle")}
                  </span>
                </div>

                <div className="space-y-5 p-5">
                  <div className="rounded-2xl bg-white p-5 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          {t("hero.preview.currentPlanLabel")}
                        </p>
                        <h3 className="mt-1 text-2xl font-bold">
                          {featuredPlan.name}
                        </h3>
                      </div>
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                        <Crown className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {previewMetrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-2xl bg-slate-50 p-3 text-center dark:bg-slate-800/60"
                        >
                          <p className="font-bold text-slate-950 dark:text-slate-100">
                            {formatMetricValue(metric.value)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <CircleDollarSign className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-lg font-bold">
                        {previewCharges.primaryValue}
                      </p>
                      <p className="text-xs text-white/50">
                        {previewCharges.primaryLabel}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <Sparkles className="h-5 w-5 text-amber-300" />
                      <p className="mt-3 text-lg font-bold">
                        {previewCharges.secondaryValue}
                      </p>
                      <p className="text-xs text-white/50">
                        {previewCharges.secondaryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[linear-gradient(135deg,_rgba(124,58,237,0.35),_rgba(245,158,11,0.22))] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <Workflow className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {t("hero.preview.cards.workflowTitle")}
                        </p>
                        <p className="text-xs text-white/60">
                          {t("hero.preview.cards.workflowDescription")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {modules.map((module) => (
              <span
                key={module}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Pricing Table Section - Redesigned based on image */}
      <section
        id="plans"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<Gem className="h-4 w-4" />}
            label={t("plansSection.eyebrow")}
          />
          <div className="mt-8">
            <ScriptHeading>{t("plansSection.title")}</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("plansSection.description")}
          </p>

          <div className="mt-8 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setCurrency("bdt")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                currency === "bdt"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.currency.bdt")}
            </button>

            <button
              type="button"
              onClick={() => setCurrency("usd")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                currency === "usd"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.currency.usd")}
            </button>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            {t("plansSection.currency.note", { rate: USD_EXCHANGE_RATE })}
          </p>
        </div>

        {/* Redesigned Pricing Cards - Clean & Professional */}
        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, idx) => {
            const Icon = planIcons[plan.icon];
            const features = getVisibleFeatures(plan);
            const isFeatured = plan.highlighted;
            const corePricing = isCorePlan(plan) ? getCorePlanPricing(plan) : null;
            const primaryCharge = findCharge(plan, "monthly") ?? plan.charges[0];
            const enterpriseExtraCharges = plan.charges.filter(
              (charge) => charge.kind !== primaryCharge?.kind,
            );

            return (
              <div
                key={plan.name}
                className={`group relative h-full transition-all duration-300 hover:-translate-y-1 ${
                  idx === 2 ? "md:scale-105" : ""
                }`}
              >
                {/* Featured Badge */}
                {plan.spotlight && (
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    {plan.spotlight}
                  </div>
                )}

                {isFeatured && !plan.spotlight && (
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    {t("plansSection.popularBadge")}
                  </div>
                )}

                <div
                  className={`relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-slate-950 ${
                    isFeatured || plan.spotlight
                      ? "border-primary/30 shadow-xl shadow-primary/5"
                      : "border-slate-200 hover:border-primary/20 dark:border-slate-800"
                  }`}
                >
                  {/* Plan Name & Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {plan.badge}
                      </p>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.softBg} ${plan.iconText}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {plan.description}
                  </p>

                  {corePricing ? (
                    <>
                      <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-5 text-center dark:bg-slate-900/70">
                        <p className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                          {formatMetricValue(plan.userCount)}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                          {t("plansSection.usersUnit")}
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                          {plan.usersLabel}
                        </p>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            {t("plansSection.monthlyLabel")}
                          </p>
                          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">
                            {formatPriceFromBdt(corePricing.monthlyAmountBdt).value}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                            {t("plansSection.perUserLabel")}
                          </p>
                          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                            {formatPriceFromBdt(corePricing.perUserAmountBdt).value}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          {primaryCharge ? formatCurrency(primaryCharge) : stateT("custom")}
                        </span>
                        {primaryCharge && (
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {primaryCharge.label}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={plan.href}
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      isFeatured || plan.spotlight
                        ? "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features Section */}
                  <div className="mt-6 flex-1">
                    {corePricing && (
                      <div className="mb-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                          {t("plansSection.breakdownLabel")}
                        </p>
                        <div className="mt-3 space-y-3">
                          {[corePricing.quarterlyCharge, corePricing.setupCharge]
                            .filter((charge): charge is Plan["charges"][number] => Boolean(charge))
                            .map((charge) => (
                              <div
                                key={`${plan.id}:${charge.kind}`}
                                className="flex items-center justify-between gap-3 text-sm"
                              >
                                <span className="text-slate-600 dark:text-slate-300">
                                  {charge.label}
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                  {formatCurrency(charge)}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {!corePricing && enterpriseExtraCharges.length > 0 && (
                      <div className="mb-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                          {t("plansSection.breakdownLabel")}
                        </p>
                        <div className="mt-3 space-y-3">
                          {enterpriseExtraCharges.map((charge) => (
                            <div
                              key={`${plan.id}:${charge.kind}`}
                              className="flex items-center justify-between gap-3 text-sm"
                            >
                              <span className="text-slate-600 dark:text-slate-300">
                                {charge.label}
                              </span>
                              <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {formatCurrency(charge)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t("plansSection.featuresIncluded")}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span className="text-slate-600 dark:text-slate-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f5f8] py-16 lg:py-24 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.16),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="self-center">
              <SectionEyebrow
                icon={<ShieldCheck className="h-4 w-4" />}
                label={t("benefitsSection.eyebrow")}
              />
              <div className="mt-8">
                <ScriptHeading>{t("benefitsSection.title")}</ScriptHeading>
              </div>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                {t("benefitsSection.description")}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((item) => {
                const Icon = benefitIcons[item.icon];

                return (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-white bg-white/85 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/70 dark:bg-slate-950/60"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow
            icon={<BarChart3 className="h-4 w-4" />}
            label={t("comparisonSection.eyebrow")}
          />
          <div className="mt-8">
            <ScriptHeading>{t("comparisonSection.title")}</ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("comparisonSection.description")}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
                  <th className="px-6 py-5 text-left font-bold text-slate-950 dark:text-slate-100">
                    {t("comparisonSection.headers.feature")}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-5 text-left font-bold ${
                        plan.highlighted
                          ? "text-primary"
                          : "text-slate-950 dark:text-slate-100"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/30"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-950 dark:text-slate-100">
                      {row.feature}
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={`${row.feature}:${plan.id}`}
                        className="px-6 py-5 text-slate-600 dark:text-slate-300"
                      >
                        {renderFeatureValue(row.values[plan.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#fff8ed_0%,_#ffffff_100%)] py-16 lg:py-24 dark:bg-[linear-gradient(180deg,_#020617_0%,_#0b1220_65%,_#020617_100%)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<HelpCircle className="h-4 w-4" />}
              label={t("faqSection.eyebrow")}
            />
            <div className="mt-8">
              <ScriptHeading>{t("faqSection.title")}</ScriptHeading>
            </div>
          </div>

          <div className="mt-12 grid gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="text-base font-semibold text-slate-950 transition-colors group-hover:text-primary dark:text-slate-100">
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#111827_0%,_#4c1d95_55%,_#f59e0b_140%)] px-6 py-14 text-center text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:px-10 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.14),transparent_26%)]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl">
              <Headphones className="h-8 w-8" />
            </div>

            <h2
              className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{
                fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
              }}
            >
              {t("ctaSection.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
              {t("ctaSection.description")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {actionT("startFreeTrial")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/15"
              >
                {actionT("talkToSales")}
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              {(t.raw("ctaSection.points") as string[]).map((point, index) => (
                <span key={point} className="inline-flex items-center gap-2">
                  {index === 0 ? (
                    <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                  ) : index === 1 ? (
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <Rocket className="h-4 w-4 text-amber-300" />
                  )}
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
