"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { BillingCycle, CurrencyCode, ERPPlan, PricingContent } from "./types";
import { SectionEyebrow } from "./SectionEyebrow";
import { FaqItem } from "./FaqItem";
import { PlanCard } from "./PlanCard";
import { useRouter } from "next/navigation";

interface PricingPageProps {
  data: PricingContent;
  onBuyNow: (planId: string) => void;
  onSuccessPacks: () => void;
}

export function PricingPage({
  data,
  onBuyNow,
  onSuccessPacks,
}: PricingPageProps) {
  const router = useRouter();
  const packages = data.erpPackages;
  const packageFeatures = Array.from(
    new Set(packages.flatMap((pack) => pack.features)),
  );
  const enterprisePlan = packages.find((plan) => plan.id === "enterprise");
  const enterpriseCustomIntegrationFeature =
    enterprisePlan?.features[enterprisePlan.features.length - 1];
  const hasPackageFeature = (pack: ERPPlan, feature: string) => {
    if (pack.id === "enterprise") return true;
    if (pack.id === "enterpriselite") {
      return feature !== enterpriseCustomIntegrationFeature;
    }

    return pack.features.includes(feature);
  };
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [currency, setCurrency] = useState<CurrencyCode>("BDT");

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.16),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_46%,#ecfdf5_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#020617_100%)]">
        <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label={data.hero.eyebrow ?? ""}
          />

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {data.hero.title}
            <br />
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {data.hero.titleHighlight}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {data.hero.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
            <div className="relative inline-flex flex-wrap items-center justify-center rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-xl shadow-emerald-900/5 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <button
                onClick={() => setBilling("yearly")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${billing === "yearly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                {data.hero.billingToggle?.yearly}
                <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {data.hero.billingToggle?.yearlyDiscount}
                </span>
              </button>

              <button
                onClick={() => setBilling("semiannual")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${billing === "semiannual"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                {data.hero.billingToggle?.semiannual}
                <span className="absolute -right-2 -top-2 rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {data.hero.billingToggle?.semiannualDiscount}
                </span>
              </button>
              <button
                onClick={() => setBilling("quarterly")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${billing === "quarterly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                {data.hero.billingToggle?.quarterly}
                <span className="absolute -right-2 -top-2 rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {data.hero.billingToggle?.quarterlyDiscount}
                </span>
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${billing === "monthly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                {data.hero.billingToggle?.monthly}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex rounded-xl border border-white/70 bg-white/90 p-1 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                {(["BDT", "USD"] as const).map((nextCurrency) => (
                  <button
                    key={nextCurrency}
                    onClick={() => setCurrency(nextCurrency)}
                    className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${currency === nextCurrency
                        ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                  >
                    {nextCurrency}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {data.packagePricing.currencyRate}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                currency={currency}
                labels={data.packagePricing}
                includedFeaturesHeading={data.includedFeaturesHeading}
                onBuyNow={() => onBuyNow(plan.id)}
              />
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none">
            <div className="border-b border-slate-200 bg-linear-to-r from-emerald-50 via-white to-cyan-50 px-6 py-5 dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
              <h2 className="text-left text-2xl font-bold text-slate-900 dark:text-white">
                {data.includedFeaturesHeading}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900">
                    <th className="p-5 text-left text-base font-semibold text-slate-900 dark:text-white">
                      {data.successPacksPage.comparisonTable?.featureHeader}
                    </th>
                    {packages.map((pack) => (
                      <th
                        key={pack.id}
                        className="p-5 text-center text-base font-semibold"
                        style={{ color: pack.badge ? pack.accent : undefined }}
                      >
                        <span
                          className={
                            pack.badge
                              ? ""
                              : "text-slate-600 dark:text-slate-300"
                          }
                        >
                          {pack.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packageFeatures.map((feature, idx) => (
                    <tr
                      key={feature}
                      className={`border-b border-slate-100 dark:border-slate-700 ${
                        idx % 2 === 0
                          ? "bg-white dark:bg-slate-900"
                          : "bg-slate-50 dark:bg-slate-800/50"
                      }`}
                    >
                      <td className="p-5 text-base font-medium text-slate-700 dark:text-slate-300">
                        {feature}
                      </td>
                      {packages.map((pack) => (
                        <td key={pack.id} className="p-5 text-center">
                          {hasPackageFeature(pack, feature) ? (
                            <CheckCircle2
                              className="mx-auto h-6 w-6"
                              style={{ color: pack.accent }}
                            />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              {data.modules.title}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {data.modules.list.map((module: string) => (
                <span
                  key={module}
                  className="rounded-full border border-emerald-100 bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm shadow-emerald-900/5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                {data.faq.title}
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {data.faq.description}
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              {data.faq.items.map((faq, idx: number) => (
                <FaqItem key={faq.id ?? idx} q={faq.question} a={faq.answer} />
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-linear-to-r from-slate-950 via-slate-900 to-emerald-950 p-8 text-center text-white shadow-2xl shadow-slate-900/20 dark:from-slate-950 dark:to-slate-900">
            <h2 className="text-2xl font-bold">{data.finalCta.title}</h2>
            <p className="mt-2 text-slate-300">{data.finalCta.description}</p>
            <button
              onClick={() => router.push("/contact")}
              className="mt-5 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold transition hover:bg-emerald-700"
            >
              {data.finalCta.button}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
