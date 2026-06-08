"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { BillingCycle, CurrencyCode } from "./types";
import { SectionEyebrow } from "./SectionEyebrow";
import { FaqItem } from "./FaqItem";
import { PlanCard } from "./PlanCard";

interface PricingPageProps {
  onBuyNow: () => void;
  onSuccessPacks: () => void;
}

export function PricingPage({ onBuyNow, onSuccessPacks }: PricingPageProps) {
  const t = useTranslations("pages.pricing");
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [currency, setCurrency] = useState<CurrencyCode>("BDT");

  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-white via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label={t("hero.eyebrow")}
          />

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {t("hero.title")}
            <br />
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
            <div className="relative inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <button
                onClick={() => setBilling("yearly")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  billing === "yearly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("hero.billingToggle.yearly")}
                <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {t("hero.billingToggle.yearlyDiscount")}
                </span>
              </button>
              <button
                onClick={() => setBilling("quarterly")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  billing === "quarterly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("hero.billingToggle.quarterly")}
                <span className="absolute -right-2 -top-2 rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {t("hero.billingToggle.quarterlyDiscount")}
                </span>
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  billing === "monthly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("hero.billingToggle.monthly")}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                {(["BDT", "USD"] as const).map((nextCurrency) => (
                  <button
                    key={nextCurrency}
                    onClick={() => setCurrency(nextCurrency)}
                    className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                      currency === nextCurrency
                        ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {nextCurrency}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {t("packagePricing.currencyRate")}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.raw("erpPackages").map((plan: any) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                currency={currency}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              {t("modules.title")}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {t.raw("modules.list").map((module: string) => (
                <span
                  key={module}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                {t("faq.title")}
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {t("faq.description")}
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              {t
                .raw("faq.items")
                .map(
                  (faq: { question: string; answer: string }, idx: number) => (
                    <FaqItem key={idx} q={faq.question} a={faq.answer} />
                  ),
                )}
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 p-8 text-center text-white dark:from-slate-950 dark:to-slate-900">
            <h2 className="text-2xl font-bold">{t("finalCta.title")}</h2>
            <p className="mt-2 text-slate-300">{t("finalCta.description")}</p>
            <button className="mt-5 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold transition hover:bg-emerald-700">
              {t("finalCta.button")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
