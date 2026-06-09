import enPricing from "@/messages/en/pages/pricing.json";
import bnPricing from "@/messages/bn/pages/pricing.json";

import type {
  PricingLocale,
  PricingPageData,
  PricingPlanData,
} from "@/lib/pricing/types";

type RawPricingSource = typeof enPricing;

function normalizePlan(
  plan: RawPricingSource["erpPackages"][number],
  order: number,
): PricingPlanData {
  return {
    id: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    badge: plan.badge ?? null,
    icon: plan.icon,
    accent: plan.accent,
    users: plan.users,
    currency:
      plan.currency === "BDT" || plan.currency === "USD"
        ? plan.currency
        : undefined,
    setupFee: plan.setupFee,
    monthlyFee: plan.monthlyFee,
    quarterlyFee: plan.quarterlyFee,
    serverFee: plan.serverFee,
    cta: plan.cta,
    order,
    enabled: true,
    features: [...plan.features],
  };
}

function normalizePricingData(
  locale: PricingLocale,
  source: RawPricingSource,
): PricingPageData {
  return {
    locale,
    metadata: source.metadata,
    hero: source.hero,
    packagePricing: source.packagePricing,
    erpPackages: source.erpPackages.map(normalizePlan),
    includedFeaturesHeading: source.includedFeaturesHeading,
    bottomNote: source.bottomNote,
    modules: source.modules,
    faq: source.faq,
    finalCta: source.finalCta,
    standardPlanPage: source.standardPlanPage,
    successPacksPage: source.successPacksPage,
  };
}

const defaults = {
  en: normalizePricingData("en", enPricing),
  bn: normalizePricingData("bn", bnPricing),
} satisfies Record<PricingLocale, PricingPageData>;

export function getDefaultPricingData(locale: PricingLocale): PricingPageData {
  return defaults[locale];
}
