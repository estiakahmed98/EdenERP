import type { PricingPlanData } from "@/lib/pricing/types";
import type { BillingCycle, CurrencyCode } from "./types";
import {
  QUARTERLY_DISCOUNT_MULTIPLIER,
  SEMIANNUAL_DISCOUNT_MULTIPLIER,
  YEARLY_DISCOUNT_MULTIPLIER,
} from "./constants";

export type PlanPrice = {
  amount: number;
  label: "perUserPerMonth" | "monthlyCharge" | "perYear";
  original: number | null;
  monthlyTotal: number | null;
  monthlySaving: number | null;
  sourceCurrency: CurrencyCode;
  fees: Array<{ label: "oneTimeSetup" | "serverMaintenance"; amount: number }>;
};

/** Presentation of configured fees only. Zero/unset fees are not a free offer. */
export function getPlanPrice(
  plan: PricingPlanData,
  billing: BillingCycle,
): PlanPrice | null {
  const sourceCurrency = plan.currency ?? "BDT";
  const fees: PlanPrice["fees"] = [];
  if (plan.setupFee != null && plan.setupFee >= 0)
    fees.push({ label: "oneTimeSetup", amount: plan.setupFee });
  if (plan.monthlyFee && plan.monthlyFee > 0) {
    if (plan.serverFee != null && plan.serverFee >= 0)
      fees.push({ label: "serverMaintenance", amount: plan.serverFee });
    return {
      amount: billing === "yearly" ? plan.monthlyFee * 12 : plan.monthlyFee,
      label: billing === "yearly" ? "perYear" : "monthlyCharge",
      original: null,
      monthlyTotal: null,
      monthlySaving: null,
      sourceCurrency,
      fees,
    };
  }
  if (
    !plan.quarterlyFee ||
    plan.quarterlyFee <= 0 ||
    typeof plan.users !== "number" ||
    plan.users <= 0
  )
    return null;
  const monthly = plan.quarterlyFee / 3 / plan.users;
  const multiplier = {
    yearly: YEARLY_DISCOUNT_MULTIPLIER,
    semiannual: SEMIANNUAL_DISCOUNT_MULTIPLIER,
    quarterly: QUARTERLY_DISCOUNT_MULTIPLIER,
    monthly: 1,
  }[billing];
  const amount = monthly * multiplier;
  return {
    amount,
    label: "perUserPerMonth",
    original: multiplier < 1 ? monthly : null,
    monthlyTotal: amount * plan.users,
    monthlySaving: multiplier < 1 ? (monthly - amount) * plan.users : null,
    sourceCurrency,
    fees,
  };
}

/** A tier name alone never grants an unlisted feature. */
export function hasConfiguredFeature(plan: PricingPlanData, feature: string) {
  return plan.features.includes(feature);
}
