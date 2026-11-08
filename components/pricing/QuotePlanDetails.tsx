"use client";

import { Check, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import LiveDemoButton from "@/components/live-demo-button";
import type { PricingPageData, PricingPlanData } from "@/lib/pricing/types";
import { formatCurrency } from "./utils";
import css from "./pricing.module.css";

export function QuotePlanDetails({
  data,
  plan,
  onBack,
  onReadMore,
}: {
  data: PricingPageData;
  plan: PricingPlanData;
  onBack: () => void;
  onReadMore: () => void;
}) {
  const t = useTranslations("pages.pricing.ui");
  return (
    <main className={css.page}>
      <div className={`${css.wrap} ${css.quoteDetail}`}>
        <button type="button" onClick={onBack}>
          <ArrowLeft size={14} className="inline me-2" aria-hidden="true" />
          {data.standardPlanPage.backButton}
        </button>
        <section className={css.quoteDetailPanel}>
          <p className={css.eyebrow}>{data.hero.eyebrow}</p>
          <h1 tabIndex={-1}>{plan.name}</h1>
          <p>{plan.tagline}</p>
          <p>{t("quoteDetailNote")}</p>
          {plan.users != null && (
            <p>
              <strong>{plan.users}</strong> {data.packagePricing.usersLabel}
            </p>
          )}
          {!!plan.setupFee && plan.setupFee > 0 && (
            <p>
              {data.packagePricing.oneTimeSetup}:{" "}
              {formatCurrency(plan.setupFee, plan.currency ?? "BDT")}
            </p>
          )}
          <ul>
            {plan.features.map((feature, index) => (
              <li key={`${feature}-${index}`}>
                <Check size={16} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div>
            <LiveDemoButton />
            <button type="button" onClick={onReadMore}>
              {t("implementationLink")}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
