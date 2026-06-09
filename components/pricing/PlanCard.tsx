"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { PricingPageData } from "@/lib/pricing/types";

import { BillingCycle, CurrencyCode, ERPPlan } from "./types";
import { formatCurrency, getPerUserMonthly } from "./utils";
import {
  QUARTERLY_DISCOUNT_MULTIPLIER,
  SEMIANNUAL_DISCOUNT_MULTIPLIER,
  YEARLY_DISCOUNT_MULTIPLIER,
} from "./constants";

interface PlanCardProps {
  plan: ERPPlan;
  billing: BillingCycle;
  currency: CurrencyCode;
  labels: PricingPageData["packagePricing"];
  includedFeaturesHeading?: string;
  onBuyNow: () => void;
}

export function PlanCard({
  plan,
  billing,
  currency,
  labels,
  includedFeaturesHeading,
  onBuyNow,
}: PlanCardProps) {
  const perYearLabel = labels.perYear ?? "Per year";
  const perMonthUserLabel = labels.perUserPerMonth ?? "per user / month";
  const totalMonthLabel = labels.totalPerMonth ?? "Total / month";

  const isEnterprise = plan.id === "enterprise";
  const hasPricing = Boolean(plan.quarterlyFee || plan.monthlyFee);
  const isHighlighted =
    plan.badge === "Most popular" || plan.badge === "সবচেয়ে জনপ্রিয়";

  const numericUsers = typeof plan.users === "number" ? plan.users : 0;
  const usersLabel = plan.users?.toString() ?? "";
  let mainPrice: number | null = null;
  let mainPriceLabel = "";
  let secondaryPrice: number | null = null;
  let secondaryPriceLabel: string | null = null;
  let originalMainPrice: number | null = null;
  let originalSecondaryPrice: number | null = null;
  let savingsAmount: number | null = null;
  let details: { label: string; amount: number; currency: string }[] = [];
  const displayCurrency: CurrencyCode =
    plan.currency ?? (isEnterprise ? "USD" : currency);
  const sourceCurrency: CurrencyCode = plan.currency ?? "BDT";

  if (plan.monthlyFee) {
    mainPrice = billing === "yearly" ? plan.monthlyFee * 12 : plan.monthlyFee;
    mainPriceLabel =
      billing === "yearly"
        ? perYearLabel
        : (labels.monthlyCharge ?? "Monthly charge");

    details = [
      {
        label: labels.monthlyCharge ?? "Monthly charge",
        amount: plan.monthlyFee,
        currency: "USD",
      },
      {
        label: labels.serverMaintenance ?? "Server maintenance",
        amount: plan.serverFee ?? 0,
        currency: "USD",
      },
      {
        label: labels.oneTimeSetup ?? "One-time setup",
        amount: plan.setupFee ?? 0,
        currency: "USD",
      },
    ];
  } else if (plan.quarterlyFee) {
    const quarterlyFee = plan.quarterlyFee;
    const perUserMonthly = getPerUserMonthly(quarterlyFee, numericUsers);
    const discountedPerUserQuarterly =
      perUserMonthly * QUARTERLY_DISCOUNT_MULTIPLIER;
    const discountedPerUserSemiannual =
      perUserMonthly * SEMIANNUAL_DISCOUNT_MULTIPLIER;
    const discountedPerUserYearly = perUserMonthly * YEARLY_DISCOUNT_MULTIPLIER;

    mainPrice =
      billing === "yearly"
        ? discountedPerUserYearly
        : billing === "semiannual"
          ? discountedPerUserSemiannual
          : billing === "quarterly"
            ? discountedPerUserQuarterly
            : perUserMonthly;
    mainPriceLabel = perMonthUserLabel;
    secondaryPrice = mainPrice * numericUsers;
    secondaryPriceLabel = totalMonthLabel;
    originalMainPrice =
      billing === "yearly" ||
      billing === "semiannual" ||
      billing === "quarterly"
        ? perUserMonthly
        : null;
    savingsAmount =
      billing === "yearly" ||
      billing === "semiannual" ||
      billing === "quarterly"
        ? perUserMonthly * numericUsers - secondaryPrice
        : null;

    details = [
      {
        label: labels.oneTimeSetup ?? "One-time setup",
        amount: plan.setupFee ?? 0,
        currency: "BDT",
      },
    ];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={`group relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 ${
        isHighlighted
          ? "-translate-y-3 bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 shadow-2xl shadow-slate-900/25 ring-1 ring-slate-800 dark:bg-slate-900"
          : "border border-white/80 bg-white/90 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100/80 backdrop-blur hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10 dark:border-slate-700 dark:bg-slate-900/90 dark:ring-slate-800 dark:shadow-none"
      } ${plan.badge ? "pt-10" : ""}`}
    >
      {!isHighlighted && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1 rounded-t-3xl"
          style={{ backgroundColor: plan.accent }}
        />
      )}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-emerald-600 px-5 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-lg shadow-emerald-900/20">
          {plan.badge}
        </div>
      )}

      <div className="text-center">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-inner ${
            isHighlighted
              ? "bg-white/10 ring-1 ring-white/10"
              : "bg-linear-to-br from-white to-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700"
          }`}
        >
          {plan.icon}
        </div>
        <h3
          className={`mt-4 text-2xl font-bold ${
            isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-1 text-sm ${
            isHighlighted
              ? "text-slate-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      {usersLabel && (
        <div
          className={`mt-6 rounded-2xl p-5 text-center ${
            isHighlighted
              ? "bg-white/5 ring-1 ring-white/10"
              : "bg-linear-to-br from-emerald-50 to-cyan-50 ring-1 ring-emerald-100 dark:bg-slate-800/70 dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700"
          }`}
        >
          <div
            className={`text-4xl font-bold leading-none ${
              isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            {usersLabel}
          </div>
          <div
            className={`mt-2 text-sm font-semibold uppercase tracking-[0.18em] ${
              isHighlighted
                ? "text-slate-300"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {labels.usersLabel ?? "users"}
          </div>
        </div>
      )}

      {hasPricing && mainPrice !== null && (
        <div className="mt-6 text-center">
          {originalMainPrice !== null && (
            <p
              className={`text-sm line-through ${
                isHighlighted
                  ? "text-slate-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {formatCurrency(originalMainPrice, displayCurrency, "BDT")}
            </p>
          )}
          <div
            className={`text-4xl font-bold tracking-tight lg:text-[2.75rem] ${
              isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            {formatCurrency(mainPrice, displayCurrency, sourceCurrency)}
          </div>
          <p
            className={`mt-2 text-sm ${
              isHighlighted
                ? "text-slate-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {mainPriceLabel}
          </p>
        </div>
      )}

      {secondaryPrice !== null && secondaryPriceLabel && (
        <div className="mt-2 text-center">
          {originalSecondaryPrice !== null && (
            <p
              className={`text-xs line-through ${
                isHighlighted
                  ? "text-slate-500"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {formatCurrency(originalSecondaryPrice, displayCurrency, "BDT")}
            </p>
          )}
          <p
            className={`text-sm font-medium ${
              isHighlighted
                ? "text-slate-300"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {formatCurrency(secondaryPrice, displayCurrency, sourceCurrency)}{" "}
            {secondaryPriceLabel}
          </p>
          {savingsAmount !== null && savingsAmount > 0 && (
            <p className="mt-1 text-sm font-semibold text-emerald-500">
              {(labels.youSave ?? "You save {amount} / month").replace(
                "{amount}",
                formatCurrency(savingsAmount, displayCurrency, "BDT"),
              )}
            </p>
          )}
        </div>
      )}

      {details.length > 0 && (
        <div
          className={`mt-6 space-y-3 rounded-2xl p-4 text-base ${
            isHighlighted
              ? "bg-white/5 text-slate-200 ring-1 ring-white/10"
              : "bg-slate-50 text-slate-600 ring-1 ring-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700"
          }`}
        >
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <span className="text-left">{detail.label}</span>
              <span className="font-semibold">
                {formatCurrency(
                  detail.amount,
                  displayCurrency,
                  detail.currency as CurrencyCode,
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onBuyNow}
        className={`mt-6 w-full rounded-xl py-3.5 text-base font-semibold transition-all ${
          isHighlighted
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "border bg-white/60 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800"
        }`}
        style={
          !isHighlighted && !isEnterprise
            ? {
                borderColor: plan.accent,
                color: plan.accent,
                boxShadow: `inset 0 0 0 1px ${plan.accent}20`,
              }
            : !isHighlighted && isEnterprise
              ? {
                  borderColor: "#3aafa9",
                  color: "#3aafa9",
                  boxShadow: "inset 0 0 0 1px rgba(58,175,169,0.2)",
                }
              : {}
        }
      >
        {plan.cta}
      </button>

      {plan.features.length > 0 && (
        <div
          className={`mt-6 border-t pt-5 ${
            isHighlighted
              ? "border-slate-700"
              : "border-slate-100 dark:border-slate-700"
          }`}
        >
          <div
            className={`mb-4 text-sm font-bold uppercase tracking-wide ${
              isHighlighted ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {includedFeaturesHeading ?? "Included features"}
          </div>
          <div className="space-y-3">
            {plan.features.map((feature: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-base leading-relaxed"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{
                    color:
                      plan.accent || (isEnterprise ? "#3aafa9" : undefined),
                  }}
                />
                <span
                  className={
                    isHighlighted
                      ? "text-slate-300"
                      : "text-slate-700 dark:text-slate-300"
                  }
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
