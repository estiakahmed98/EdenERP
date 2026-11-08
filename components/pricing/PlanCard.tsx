"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import LiveDemoButton from "@/components/live-demo-button";
import type { PricingPageData } from "@/lib/pricing/types";
import type { BillingCycle, CurrencyCode, ERPPlan } from "./types";
import { formatCurrency } from "./utils";
import { getPlanPrice } from "./plan-presentation";
import css from "./pricing.module.css";

interface PlanCardProps {
  plan: ERPPlan;
  billing: BillingCycle;
  currency: CurrencyCode;
  labels: PricingPageData["packagePricing"];
  includedFeaturesHeading?: string;
  highlighted?: boolean;
  onBuyNow: () => void;
}

export function PlanCard({
  plan,
  billing,
  currency,
  labels,
  includedFeaturesHeading,
  highlighted = false,
  onBuyNow,
}: PlanCardProps) {
  const t = useTranslations("pages.pricing");
  const [expanded, setExpanded] = useState(false);
  const price = getPlanPrice(plan, billing);
  const features = expanded ? plan.features : plan.features.slice(0, 5);
  const money = (amount: number) =>
    formatCurrency(
      amount,
      currency,
      price?.sourceCurrency ?? plan.currency ?? "BDT",
    );

  return (
    <article
      id={`plan-${plan.id}`}
      aria-labelledby={`plan-title-${plan.id}`}
      className={`${css.planCard} ${highlighted ? css.featuredPlan : ""}`}
      data-plan-id={plan.id}
      data-pricing-mode={price ? "priced" : "quote"}
    >
      <div className={css.planTop}>
        <span className={css.planIcon} aria-hidden="true">
          {plan.icon}
        </span>
        {plan.badge && <span className={css.planBadge}>{plan.badge}</span>}
      </div>
      <h3 id={`plan-title-${plan.id}`}>{plan.name}</h3>
      <p className={css.planTagline}>{plan.tagline}</p>
      <div className={css.priceBlock} aria-live="polite" aria-atomic="true">
        {price ? (
          <>
            <div className={css.priceLine}>
              <strong data-plan-price>{money(price.amount)}</strong>
              {price.original !== null && <s>{money(price.original)}</s>}
            </div>
            <p>{labels[price.label] ?? t(`packagePricing.${price.label}`)}</p>
            {price.monthlyTotal !== null && (
              <span className={css.monthlyTotal}>
                {money(price.monthlyTotal)}{" "}
                <span>
                  {labels.totalPerMonth ?? t("packagePricing.totalPerMonth")}
                </span>
              </span>
            )}
          </>
        ) : (
          <>
            <strong className={css.quotePrice}>
              {labels.customQuote ?? t("packagePricing.customQuote")}
            </strong>
            <p>
              {labels.contactForQuote ?? t("packagePricing.contactForQuote")}
            </p>
          </>
        )}
      </div>
      {plan.users != null && (
        <div className={css.teamLine}>
          <Users size={15} aria-hidden="true" />
          <strong>{plan.users}</strong>{" "}
          {labels.usersLabel ?? t("packagePricing.usersLabel")}
        </div>
      )}
      <div className={css.planAction}>
        {price ? (
          <button type="button" className={css.planBuy} onClick={onBuyNow}>
            {plan.cta}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ) : (
          <LiveDemoButton />
        )}
        <button
          type="button"
          className={css.planDetailsLink}
          onClick={onBuyNow}
        >
          {t("ui.viewPlan")}
          <ArrowUpRight size={13} aria-hidden="true" />
        </button>
      </div>
      <div className={css.featureList}>
        <p className={css.featureHeading}>
          {includedFeaturesHeading ?? t("includedFeaturesHeading")}
        </p>
        <ul id={`features-${plan.id}`}>
          {features.map((feature, index) => (
            <li key={`${feature}-${index}`}>
              <Check size={15} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {plan.features.length > 5 && (
          <button
            type="button"
            className={css.moreFeatures}
            aria-expanded={expanded}
            aria-controls={`features-${plan.id}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? t("ui.showLess")
              : t("ui.moreFeatures", { count: plan.features.length - 5 })}
            <ChevronDown size={14} aria-hidden="true" data-open={expanded} />
          </button>
        )}
      </div>
      {price && (
        <div className={css.planFees}>
          {price.fees.map((fee) => (
            <div key={fee.label}>
              <span>
                {labels[fee.label] ?? t(`packagePricing.${fee.label}`)}
                {fee.label === "serverMaintenance" && (
                  <> · {labels.perMonth ?? t("packagePricing.perMonth")}</>
                )}
              </span>
              <b>{money(fee.amount)}</b>
            </div>
          ))}
          {price.monthlySaving != null && price.monthlySaving > 0 && (
            <p>
              {(
                labels.youSave ?? (t.raw("packagePricing.youSave") as string)
              ).replace("{amount}", money(price.monthlySaving))}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
