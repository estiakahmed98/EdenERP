"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { BillingCycle } from "./types";
import { formatPricingAmount } from "./utils";

interface StandardPlanPageProps {
  onBack: () => void;
  onReadMore: () => void;
}

export function StandardPlanPage({
  onBack,
  onReadMore,
}: StandardPlanPageProps) {
  const t = useTranslations("pages.pricing");
  const tStandard = useTranslations("pages.pricing.standardPlanPage");
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [userCount, setUserCount] = useState(1);
  const [implService, setImplService] = useState("success-pack");

  const pricePerUser = billing === "yearly" ? 7.25 : 8.95;
  const monthly = userCount * pricePerUser;
  const annually = monthly * 12;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <span className="text-lg">←</span> {tStandard("backButton")}
        </button>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-5xl">
            {tStandard("title")}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {tStandard("description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard("userCountLabel")}
              </label>
              <div className="flex w-fit overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setUserCount(Math.max(1, userCount - 1))}
                  className="w-10 bg-slate-50 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  −
                </button>
                <input
                  type="number"
                  value={userCount}
                  min={1}
                  onChange={(e) =>
                    setUserCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center text-lg font-bold outline-none dark:bg-slate-900 dark:text-white"
                />
                <button
                  onClick={() => setUserCount(userCount + 1)}
                  className="w-10 bg-slate-50 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-4 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard("implementationLabel")}
              </label>
              <div className="space-y-3">
                {[
                  {
                    id: "self",
                    label: tStandard("implementationOptions.self"),
                  },
                  {
                    id: "success-pack",
                    label: tStandard("implementationOptions.successPack"),
                    sublabel: tStandard(
                      "implementationOptions.successPackSublabel",
                    ),
                  },
                  {
                    id: "partner",
                    label: tStandard("implementationOptions.partner"),
                    sublabel: tStandard(
                      "implementationOptions.partnerSublabel",
                    ),
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all ${
                      implService === opt.id
                        ? "border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                        : "border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="impl"
                      value={opt.id}
                      checked={implService === opt.id}
                      onChange={() => setImplService(opt.id)}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {opt.label}
                      </div>
                      {opt.sublabel && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {implService === "success-pack" && (
                <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-800 dark:bg-cyan-950/30">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {tStandard("successPackMessage.text")}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      {tStandard("successPackMessage.configureButton")}
                    </button>
                    <button
                      onClick={onReadMore}
                      className="rounded-lg border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
                    >
                      {tStandard("successPackMessage.readMoreButton")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-6 h-fit rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  billing === "yearly"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                {t("hero.billingToggle.yearly")}
              </span>
              <button
                onClick={() =>
                  setBilling(billing === "yearly" ? "monthly" : "yearly")
                }
                className={`relative h-6 w-12 rounded-full transition-colors ${
                  billing === "monthly"
                    ? "bg-emerald-600"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    billing === "monthly" ? "right-1" : "left-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  billing === "monthly"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                {t("hero.billingToggle.monthly")}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {userCount} {tStandard("userCountLabel")},{" "}
                  {t("plans.standard.name")}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {formatPricingAmount(userCount * 8.95)}
                </span>
              </div>
              {billing === "yearly" && (
                <div className="mb-2 flex justify-between">
                  <span className="text-sm italic text-slate-500 dark:text-slate-400">
                    {tStandard("priceSummary.firstYearDiscount")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    −{formatPricingAmount(userCount * 1.7)}
                  </span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {tStandard("priceSummary.totalPerMonth")}
                  </span>
                  {billing === "yearly" && (
                    <div className="text-xs text-slate-400">
                      {tStandard("priceSummary.yearlyBillNote")}{" "}
                      {formatPricingAmount(annually)}
                    </div>
                  )}
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {formatPricingAmount(monthly)}
                </span>
              </div>
            </div>

            {billing === "yearly" && (
              <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                🎉{" "}
                {tStandard("priceSummary.yearlySavings", {
                  amount: formatPricingAmount(userCount * 1.7 * 12),
                })}
              </div>
            )}

            <button className="mt-5 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
              {tStandard("priceSummary.buyNow")}
            </button>
            <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
              {tStandard("priceSummary.quotaPrint")}
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {tStandard("includedTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tStandard.raw("includedList").map((f: string) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
