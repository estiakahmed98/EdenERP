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
  TrendingUp,
  Calendar,
  Clock,
  DollarSign,
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
          primaryValue: formatPriceFromBdt(corePricing.perUserAmountBdt).value,
          primaryLabel: t("plansSection.perUserLabel"),
          secondaryValue: formatPriceFromBdt(corePricing.monthlyAmountBdt).value,
          secondaryLabel: t("plansSection.monthlyLabel"),
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
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section with Glass Morphism */}
      <section className="relative isolate overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {t("hero.eyebrow")}
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-slate-100">
              {t("hero.title")}
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">
                {t("hero.titleAccent")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {actionT("viewPlans")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white/80 px-6 py-3 font-semibold text-primary backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
              >
                {actionT("talkToSales")}
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module Tags */}
      <section className="border-y border-slate-200 bg-white/50 py-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {modules.map((module) => (
              <span
                key={module}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-primary/5 hover:text-primary dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-primary/10"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Currency Toggle */}
      <section id="plans" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Gem className="h-4 w-4" />
            {t("plansSection.eyebrow")}
          </div>
          <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl dark:text-slate-100">
            {t("plansSection.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {t("plansSection.description")}
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <button
              onClick={() => setCurrency("bdt")}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                currency === "bdt"
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.currency.bdt")}
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                currency === "usd"
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.currency.usd")}
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            {t("plansSection.currency.note", { rate: USD_EXCHANGE_RATE })}
          </p>
        </div>

        {/* Pricing Cards - Professional Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = planIcons[plan.icon];
            const features = getVisibleFeatures(plan);
            const isFeatured = plan.highlighted;
            const corePricing = isCorePlan(plan) ? getCorePlanPricing(plan) : null;
            const primaryCharge = findCharge(plan, "monthly") ?? plan.charges[0];

            return (
              <div
                key={plan.id}
                className={`group relative rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                  isFeatured ? "lg:scale-105" : ""
                }`}
              >
                {/* Featured Glow */}
                {isFeatured && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-purple-600 to-amber-500 opacity-30 blur-xl transition-opacity group-hover:opacity-50" />
                )}

                {/* Popular Badge */}
                {(isFeatured || plan.spotlight) && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    {plan.spotlight || t("plansSection.popularBadge")}
                  </div>
                )}

                <div
                  className={`relative h-full rounded-2xl border bg-white p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl dark:bg-slate-950 ${
                    isFeatured
                      ? "border-primary/30 shadow-primary/10"
                      : "border-slate-200 hover:border-primary/20 dark:border-slate-800"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">{plan.usersLabel}</p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${plan.softBg} transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`h-6 w-6 ${plan.iconText}`} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {plan.description}
                  </p>

                  {/* Pricing Section */}
                  {corePricing ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 text-center dark:from-slate-900/50 dark:to-slate-950">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold">
                            {formatMetricValue(plan.userCount)}
                          </span>
                          <span className="text-sm text-slate-500">
                            {t("plansSection.usersUnit")}
                          </span>
                        </div>
                        <div className="mt-3 flex items-baseline justify-center gap-1">
                          <span className="text-2xl font-bold">
                            {formatPriceFromBdt(corePricing.perUserAmountBdt).value}
                          </span>
                          <span className="text-xs text-slate-500">/user/month</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900/50">
                          <span className="text-xs text-slate-500">
                            {t("plansSection.monthlyLabel")}
                          </span>
                          <span className="font-semibold">
                            {formatPriceFromBdt(corePricing.monthlyAmountBdt).value}
                          </span>
                        </div>
                        {corePricing.setupCharge && (
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900/50">
                            <span className="text-xs text-slate-500">
                              {corePricing.setupCharge.label}
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(corePricing.setupCharge)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 text-center dark:from-slate-900/50 dark:to-slate-950">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold">
                          {primaryCharge ? formatCurrency(primaryCharge) : stateT("custom")}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {primaryCharge?.label}
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={plan.href}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isFeatured
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  {/* Features */}
                  <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t("plansSection.featuresIncluded")}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-300">
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

      {/* Benefits Section with Cards */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900/50 dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.05),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              {t("benefitsSection.eyebrow")}
            </div>
            <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl dark:text-slate-100">
              {t("benefitsSection.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
              {t("benefitsSection.description")}
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => {
              const Icon = benefitIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <BarChart3 className="h-4 w-4" />
            {t("comparisonSection.eyebrow")}
          </div>
          <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl dark:text-slate-100">
            {t("comparisonSection.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {t("comparisonSection.description")}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-950 dark:text-slate-100">
                    {t("comparisonSection.headers.feature")}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-4 text-left font-semibold ${
                        plan.highlighted ? "text-primary" : "text-slate-950 dark:text-slate-100"
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
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/30"
                  >
                    <td className="px-6 py-4 font-medium text-slate-950 dark:text-slate-100">
                      {row.feature}
                    </td>
                    {plans.map((plan) => (
                      <td key={`${row.feature}:${plan.id}`} className="px-6 py-4">
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

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900/50 dark:to-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <HelpCircle className="h-4 w-4" />
              {t("faqSection.eyebrow")}
            </div>
            <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl dark:text-slate-100">
              {t("faqSection.title")}
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="font-semibold text-slate-950 dark:text-slate-100">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-900 to-amber-800 px-6 py-16 text-center text-white sm:px-10 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Headphones className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
              {t("ctaSection.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              {t("ctaSection.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {actionT("startFreeTrial")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {actionT("talkToSales")}
                <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}