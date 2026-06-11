"use client";

import { useState } from "react";

import { BillingCycle, PricingContent } from "./types";
import {
  QUARTERLY_DISCOUNT_MULTIPLIER,
  SEMIANNUAL_DISCOUNT_MULTIPLIER,
  YEARLY_DISCOUNT_MULTIPLIER,
} from "./constants";
import { formatCurrency, getPerUserMonthly } from "./utils";
import { useRouter } from "@/i18n/navigation";

interface StandardPlanPageProps {
  data: PricingContent;
  selectedPlanId?: string;
  onBack: () => void;
  onReadMore: () => void;
}

export function StandardPlanPage({
  data,
  selectedPlanId,
  onBack,
  onReadMore,
}: StandardPlanPageProps) {
  const tStandard = data.standardPlanPage;
  const packages = data.erpPackages;
  const router = useRouter();
  const isBengali = data.locale === "bn";
  const pricingPlan =
    packages.find((plan) => plan.id === selectedPlanId) ??
    packages.find((plan) => plan.quarterlyFee) ??
    packages[0];
  const isEnterprise = pricingPlan.id === "enterprise";
  const isMonthlyPricedPlan = Boolean(pricingPlan.monthlyFee);
  const initialUserCount =
    typeof pricingPlan.users === "number" ? pricingPlan.users : 1;

  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [userCount, setUserCount] = useState(initialUserCount);

  const basePerUserMonthly =
    isEnterprise || isMonthlyPricedPlan
      ? 0
      : getPerUserMonthly(pricingPlan.quarterlyFee ?? 0, initialUserCount);
  const pricePerUser =
    isEnterprise || isMonthlyPricedPlan
      ? 0
      : billing === "yearly"
        ? basePerUserMonthly * YEARLY_DISCOUNT_MULTIPLIER
        : billing === "semiannual"
          ? basePerUserMonthly * SEMIANNUAL_DISCOUNT_MULTIPLIER
          : billing === "quarterly"
            ? basePerUserMonthly * QUARTERLY_DISCOUNT_MULTIPLIER
            : basePerUserMonthly;
  const fixedMonthlyPrice =
    (pricingPlan.monthlyFee ?? 0) + (pricingPlan.serverFee ?? 0);
  const originalMonthly =
    isEnterprise || isMonthlyPricedPlan
      ? fixedMonthlyPrice
      : userCount * basePerUserMonthly;
  const monthly =
    isEnterprise || isMonthlyPricedPlan
      ? fixedMonthlyPrice
      : userCount * pricePerUser;
  const monthlySavings = originalMonthly - monthly;
  const displayCurrency = pricingPlan.currency ?? "BDT";
  const buyNowLabel = (() => {
    const label = tStandard.priceSummary?.buyNow?.trim();
    if (!label) {
      return isBengali
        ? "বিলিং সহ চেকআউট করুন"
        : "Checkout with billing";
    }

    if (
      label === "Contact sales" ||
      label === "সেলসে যোগাযোগ করুন"
    ) {
      return isBengali
        ? "বিলিং সহ চেকআউট করুন"
        : "Checkout with billing";
    }

    return label;
  })();

  const handleCheckout = () => {
    const checkoutPlanData = {
      id: pricingPlan.id,
      name: pricingPlan.name,
      monthlyPrice: Number(monthly.toFixed(2)),
      currency: displayCurrency,
      userCount,
      billingCycle: billing,
      originalPrice: Number(originalMonthly.toFixed(2)),
      savings: Number(monthlySavings.toFixed(2)),
    };

    localStorage.setItem("checkoutPlanData", JSON.stringify(checkoutPlanData));

    router.push({
      pathname: "/checkout",
      query: {
        plan: encodeURIComponent(JSON.stringify(checkoutPlanData)),
      },
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#ecfdf5_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_48%,#111827_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <span className="text-lg">←</span> {tStandard.backButton}
        </button>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-5xl">
            {tStandard.title}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {tStandard.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard.userCountLabel}
              </label>
              <div className="flex w-fit overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setUserCount(Math.max(1, userCount - 1))}
                  className="w-10 bg-slate-50 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  -
                </button>
                <input
                  type="number"
                  value={userCount}
                  min={1}
                  onChange={(event) =>
                    setUserCount(Math.max(1, parseInt(event.target.value) || 1))
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

            <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-4 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard.implementationLabel}
              </label>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
                <div className="font-medium text-slate-900 dark:text-white">
                  {tStandard.implementationOptions?.successPack}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {tStandard.implementationOptions?.successPackSublabel}
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-800 dark:bg-cyan-950/30">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {tStandard.successPackMessage?.text}
                </p>
                <button
                  onClick={onReadMore}
                  className="mt-3 rounded-lg border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
                >
                  {tStandard.successPackMessage?.readMoreButton}
                </button>
              </div>
            </div>
          </div>

          <div className="sticky top-6 h-fit rounded-2xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/70 sm:grid-cols-4">
              {(["yearly", "semiannual", "quarterly", "monthly"] as const).map(
                (cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBilling(cycle)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      billing === cycle
                        ? "bg-slate-900 text-white shadow-sm dark:bg-emerald-600"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {data.hero.billingToggle?.[cycle]}
                  </button>
                ),
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="mb-2 flex justify-between gap-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {userCount} {tStandard.userCountLabel}, {pricingPlan.name}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {formatCurrency(originalMonthly, displayCurrency)}
                </span>
              </div>
              {monthlySavings > 0 && (
                <div className="mb-2 flex justify-between gap-4">
                  <span className="text-sm italic text-slate-500 dark:text-slate-400">
                    {tStandard.priceSummary?.firstYearDiscount}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    -{formatCurrency(monthlySavings, displayCurrency)}
                  </span>
                </div>
              )}
              <div className="mt-3 flex justify-between gap-4 border-t border-slate-200 pt-3 dark:border-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {tStandard.priceSummary?.totalPerMonth}
                  </span>
                  {!isEnterprise && !isMonthlyPricedPlan && (
                    <div className="text-xs text-slate-400">
                      {tStandard.priceSummary?.perUserNote}{" "}
                      {formatCurrency(pricePerUser, displayCurrency)}
                    </div>
                  )}
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(monthly, displayCurrency)}
                </span>
              </div>
            </div>

            {monthlySavings > 0 && (
              <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                {(data.packagePricing.youSave ?? "You save {amount}").replace(
                  "{amount}",
                  formatCurrency(monthlySavings, displayCurrency),
                )}
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="mt-5 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {buyNowLabel}
            </button>
            <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
              {tStandard.priceSummary?.quotaPrint}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
