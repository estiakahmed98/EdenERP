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
  Clock3,
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

type BillingCycle = "monthly" | "annually";

type Plan = {
  id: string;
  name: string;
  badge: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  periodMonthly: string;
  periodAnnual: string;
  description: string;
  icon: "users" | "zap" | "building2" | "layers3" | "rocket" | "crown";
  color: string;
  softBg: string;
  iconText: string;
  cta: string;
  href: string;
  highlighted: boolean;
  spotlight?: string;
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

type AddOn = {
  title: string;
  amount: number | null;
  unit: string;
  description: string;
  icon: "shieldCheck" | "barChart3" | "sparkles";
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
  currencyLabel: string;
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

const addOnIcons = {
  shieldCheck: ShieldCheck,
  barChart3: BarChart3,
  sparkles: Sparkles,
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
  const isBangla = locale === "bn";
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const isAnnual = billingCycle === "annually";
  const plans = t.raw("plans") as Plan[];
  const modules = t.raw("modules") as string[];
  const benefits = t.raw("benefits") as Benefit[];
  const comparison = t.raw("comparison") as ComparisonRow[];
  const addOns = t.raw("addons") as AddOn[];
  const faqs = t.raw("faqs") as FaqItem[];
  const previewMetrics = t.raw("hero.preview.metrics") as PreviewMetric[];
  const featuredPlan =
    plans.find((plan) => plan.highlighted) ??
    plans.find((plan) => plan.id === "professional") ??
    plans[0];

  function formatAmount(amount: number) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  }

  function getPriceDisplay(amount: number | null): PriceDisplay {
    if (amount === null) {
      return { value: stateT("custom"), currencyLabel: "" };
    }

    if (isBangla) {
      return {
        value: formatAmount(amount),
        currencyLabel: "ডলার",
      };
    }

    return {
      value: `$${formatAmount(amount)}`,
      currencyLabel: "",
    };
  }

  function formatCurrency(amount: number) {
    const price = getPriceDisplay(amount);
    return price.currencyLabel
      ? `${price.value} ${price.currencyLabel}`
      : price.value;
  }

  function formatMetricValue(value: number | string) {
    return typeof value === "number"
      ? new Intl.NumberFormat(locale).format(value)
      : value;
  }

  function getVisibleFeatures(plan: Plan) {
    return plan.features.slice(0, 4);
  }

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

  const previewPrice =
    featuredPlan.annualPrice !== null && featuredPlan.monthlyPrice !== null
      ? isAnnual
        ? `${formatCurrency(featuredPlan.annualPrice)} ${featuredPlan.periodAnnual}`.trim()
        : `${formatCurrency(featuredPlan.monthlyPrice)} ${featuredPlan.periodMonthly}`.trim()
      : stateT("custom");

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
                      <p className="mt-3 text-lg font-bold">{previewPrice}</p>
                      <p className="text-xs text-white/50">
                        {t("hero.preview.cards.monthlyCostNote")}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <Clock3 className="h-5 w-5 text-amber-300" />
                      <p className="mt-3 text-lg font-bold">
                        {isAnnual
                          ? t("hero.preview.cards.secondaryMetricAnnualValue")
                          : t("hero.preview.cards.secondaryMetricTrialValue")}
                      </p>
                      <p className="text-xs text-white/50">
                        {isAnnual
                          ? t("hero.preview.cards.secondaryMetricAnnual")
                          : t("hero.preview.cards.secondaryMetricTrial")}
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
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.billing.monthly")}
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("annually")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "annually"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 hover:text-primary dark:text-slate-300"
              }`}
            >
              {t("plansSection.billing.annually")}
              <span
                className={`ml-2 rounded-full px-2 py-1 text-xs ${
                  billingCycle === "annually"
                    ? "bg-white/20 text-white"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"
                }`}
              >
                {t("plansSection.billing.save")}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => {
            const Icon = planIcons[plan.icon];
            const visibleFeatures = getVisibleFeatures(plan);
            const remainingFeatures = plan.features.length - visibleFeatures.length;
            const isFeatured = plan.highlighted;
            const priceDisplay = getPriceDisplay(
              isAnnual ? plan.annualPrice : plan.monthlyPrice,
            );

            return (
              <div
                key={plan.name}
                className="group relative h-full rounded-[2.2rem] transition-all duration-300 hover:-translate-y-1"
              >
                {isFeatured && (
                  <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] px-5 py-2 text-sm font-semibold text-white shadow-xl">
                    {t("plansSection.popularBadge")}
                  </div>
                )}

                <div
                  className={`absolute inset-0 rounded-[2.2rem] bg-gradient-to-br ${plan.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20 ${
                    isFeatured ? "opacity-20" : ""
                  }`}
                />

                <div
                  className={`relative flex h-full min-h-[40rem] flex-col overflow-hidden rounded-[2.2rem] border bg-white p-7 shadow-sm transition-all duration-300 group-hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950 ${
                    isFeatured
                      ? "border-primary/40 shadow-[0_35px_90px_rgba(124,58,237,0.18)]"
                      : "border-slate-200"
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${plan.color}`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-h-[5.5rem]">
                      <p
                        className={`font-semibold leading-snug text-primary ${
                          isBangla ? "text-base" : "text-sm"
                        }`}
                      >
                        {plan.badge}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-slate-950 dark:text-slate-100">
                        {plan.name}
                      </h3>
                      {plan.spotlight ? (
                        <p
                          className={`mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary ${
                            isBangla ? "text-sm leading-snug" : "text-xs"
                          }`}
                        >
                          {plan.spotlight}
                        </p>
                      ) : null}
                    </div>

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${plan.softBg} ${plan.iconText}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <p
                    className={`mt-4 min-h-[10rem] text-slate-600 dark:text-slate-300 ${
                      isBangla ? "text-[15px] leading-8" : "text-sm leading-7"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                      <span
                        className={`leading-none font-bold tracking-tight text-slate-950 dark:text-slate-100 ${
                          plan.monthlyPrice === null
                            ? isBangla
                              ? "text-5xl sm:text-6xl"
                              : "text-5xl"
                            : isBangla
                              ? "text-[2.85rem] sm:text-5xl"
                              : "text-5xl"
                        }`}
                      >
                        {priceDisplay.value}
                      </span>
                      {priceDisplay.currencyLabel ? (
                        <span className="pb-1 text-lg font-semibold text-slate-500 dark:text-slate-400">
                          {priceDisplay.currencyLabel}
                        </span>
                      ) : null}
                      </div>

                      <span
                        className={`font-medium text-slate-500 dark:text-slate-400 ${
                          isBangla ? "text-sm leading-none" : "text-base"
                        }`}
                      >
                        {isAnnual ? plan.periodAnnual : plan.periodMonthly}
                      </span>
                    </div>

                    {isAnnual &&
                      plan.annualPrice !== null &&
                      plan.monthlyPrice !== null && (
                      <p className="mt-3 max-w-[16rem] text-sm font-semibold leading-6 text-emerald-600">
                        {t("plansSection.annualSavings")}
                      </p>
                    )}
                  </div>

                  <Link
                    href={plan.href}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                      isFeatured
                        ? "bg-primary text-white shadow-xl shadow-primary/20 hover:-translate-y-0.5 hover:shadow-2xl"
                        : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-7 flex-1 border-t border-slate-100 pt-6 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                      {t("plansSection.featuresIncluded")}
                    </p>

                    <ul className="mt-5 space-y-3">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {remainingFeatures > 0 ? (
                      <p className="mt-5 text-sm font-semibold text-primary">
                        {t("plansSection.moreFeatures", { count: remainingFeatures })}
                      </p>
                    ) : null}
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

      <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#fbf7ff_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,#0b1220_0%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<Sparkles className="h-4 w-4" />}
              label={t("addonsSection.eyebrow")}
            />
            <div className="mt-8">
              <ScriptHeading>{t("addonsSection.title")}</ScriptHeading>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("addonsSection.description")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {addOns.map((item) => {
              const Icon = addOnIcons[item.icon];

              return (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-primary">
                    {item.amount === null
                      ? stateT("custom")
                      : `${formatCurrency(item.amount)}${item.unit}`}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
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
