"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { BillingCycle, CurrencyCode, ERPPlan } from "./types";
import {
  formatCurrency,
  getPerUserMonthly,
} from "./utils";
import {
  QUARTERLY_DISCOUNT_MULTIPLIER,
  SEMIANNUAL_DISCOUNT_MULTIPLIER,
  YEARLY_DISCOUNT_MULTIPLIER,
} from "./constants";

interface PlanCardProps {
  plan: ERPPlan;
  billing: BillingCycle;
  currency: CurrencyCode;
  onBuyNow: () => void;
}

export function PlanCard({ plan, billing, currency, onBuyNow }: PlanCardProps) {
  const t = useTranslations("pages.pricing");
  const tPackage = useTranslations("pages.pricing.packagePricing");
  const perYearLabel = tPackage("perYear");
  const perMonthUserLabel = tPackage("perUserPerMonth");
  const totalMonthLabel = tPackage("totalPerMonth");

  const isEnterprise = plan.id === "enterprise";
  const isHighlighted =
    plan.badge === "Most popular" || plan.badge === "সবচেয়ে জনপ্রিয়";

  let usersCount = plan.users;
  let mainPrice: number;
  let mainPriceLabel: string;
  let secondaryPrice: number | null = null;
  let secondaryPriceLabel: string | null = null;
  let originalMainPrice: number | null = null;
  let originalSecondaryPrice: number | null = null;
  let savingsAmount: number | null = null;
  let details: { label: string; amount: number; currency: string }[] = [];
  let displayCurrency: CurrencyCode = isEnterprise ? "USD" : currency;

  if (isEnterprise) {
    mainPrice = billing === "yearly" ? plan.monthlyFee! * 12 : plan.monthlyFee!;
    mainPriceLabel =
      billing === "yearly" ? perYearLabel : tPackage("monthlyCharge");
    secondaryPrice = null;
    secondaryPriceLabel = null;
    originalMainPrice = null;
    originalSecondaryPrice = null;
    savingsAmount = null;

    details = [
      {
        label: tPackage("monthlyCharge"),
        amount: plan.monthlyFee!,
        currency: "USD",
      },
      {
        label: tPackage("serverMaintenance"),
        amount: plan.serverFee!,
        currency: "USD",
      },
      {
        label: tPackage("oneTimeSetup"),
        amount: plan.setupFee,
        currency: "USD",
      },
    ];
  } else {
    const quarterlyFee = plan.quarterlyFee!;
    const perUserMonthly = getPerUserMonthly(quarterlyFee, usersCount);
    const discountedPerUserQuarterly =
      perUserMonthly * QUARTERLY_DISCOUNT_MULTIPLIER;
    const discountedPerUserSemiannual =
      perUserMonthly * SEMIANNUAL_DISCOUNT_MULTIPLIER;
    const discountedPerUserYearly =
      perUserMonthly * YEARLY_DISCOUNT_MULTIPLIER;

    mainPrice =
      billing === "yearly"
        ? discountedPerUserYearly
        : billing === "semiannual"
          ? discountedPerUserSemiannual
        : billing === "quarterly"
          ? discountedPerUserQuarterly
          : perUserMonthly;
    mainPriceLabel = perMonthUserLabel;
    secondaryPrice = mainPrice * usersCount;
    secondaryPriceLabel = totalMonthLabel;
    originalMainPrice =
      billing === "yearly" || billing === "semiannual" || billing === "quarterly"
        ? perUserMonthly
        : null;
    originalSecondaryPrice = null;
    savingsAmount =
      billing === "yearly" || billing === "semiannual" || billing === "quarterly"
        ? perUserMonthly * usersCount - secondaryPrice
        : null;

    details = [
      {
        label: tPackage("oneTimeSetup"),
        amount: plan.setupFee,
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
      className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 ${
        isHighlighted
          ? "-translate-y-3 bg-slate-900 shadow-2xl shadow-slate-900/20 dark:bg-slate-900"
          : "border border-slate-200 bg-white shadow-sm shadow-slate-200/70 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
      } ${plan.badge ? "pt-10" : ""}`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white shadow-md whitespace-nowrap">
          {plan.badge}
        </div>
      )}

      <div className="text-center">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
            isHighlighted
              ? "bg-white/10 ring-1 ring-white/10"
              : "bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
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
          className={`text-xs ${
            isHighlighted
              ? "text-slate-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      <div
        className={`mt-6 rounded-2xl p-4 text-center ${
          isHighlighted
            ? "bg-white/5 ring-1 ring-white/10"
            : "bg-slate-50 ring-1 ring-slate-100 dark:bg-slate-800/70 dark:ring-slate-700"
        }`}
      >
        <div
          className={`text-4xl font-bold leading-none ${
            isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
          }`}
        >
          {usersCount}
        </div>
        <div
          className={`mt-2 text-sm font-semibold uppercase tracking-[0.18em] ${
            isHighlighted
              ? "text-slate-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {tPackage("usersLabel")}
        </div>
      </div>

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
          {formatCurrency(
            mainPrice,
            displayCurrency,
            isEnterprise ? "USD" : "BDT",
          )}
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
            {formatCurrency(
              secondaryPrice,
              displayCurrency,
              isEnterprise ? "USD" : "BDT",
            )}{" "}
            {secondaryPriceLabel}
          </p>
          {savingsAmount !== null && savingsAmount > 0 && (
            <p className="mt-1 text-sm font-semibold text-emerald-500">
              {tPackage("youSave", {
                amount: formatCurrency(savingsAmount, displayCurrency, "BDT"),
              })}
            </p>
          )}
        </div>
      )}

      <div
        className={`mt-6 space-y-3 rounded-2xl p-4 text-sm ${
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

      <button
        onClick={onBuyNow}
        className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
          isHighlighted
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "border bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
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

      <div
        className={`mt-6 border-t pt-5 ${
          isHighlighted
            ? "border-slate-700"
            : "border-slate-100 dark:border-slate-700"
        }`}
      >
        <div
          className={`mb-2 text-[10px] font-bold uppercase tracking-wide ${
            isHighlighted ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {t("includedFeaturesHeading")}
        </div>
        <div className="space-y-2">
          {plan.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{
                  color: plan.accent || (isEnterprise ? "#3aafa9" : undefined),
                }}
              />
              <span
                className={
                  isHighlighted
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-400"
                }
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
