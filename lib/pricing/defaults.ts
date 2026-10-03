import enMessages from "@/messages/en.json";
import bnMessages from "@/messages/bn.json";
import zhMessages from "@/messages/zh.json";
import arMessages from "@/messages/ar.json";
import jaMessages from "@/messages/ja.json";
import neMessages from "@/messages/ne.json";
import viMessages from "@/messages/vi.json";
import { mergeMessages } from "@/i18n/messages";

import type {
  PricingLocale,
  PricingPageData,
  PricingPlanData,
} from "@/lib/pricing/types";

const enPricing = enMessages.pages.pricing;
const bnPricing = bnMessages.pages.pricing;
const arPricing = mergeMessages(enMessages, arMessages).pages.pricing;

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
  zh: normalizePricingData("zh", mergeMessages(enMessages, zhMessages).pages.pricing),
  ar: normalizePricingData("ar", arPricing),
  ja: normalizePricingData("ja", mergeMessages(enMessages, jaMessages).pages.pricing),
  ne: normalizePricingData("ne", mergeMessages(enMessages, neMessages).pages.pricing),
  vi: normalizePricingData("vi", mergeMessages(enMessages, viMessages).pages.pricing),
} satisfies Record<PricingLocale, PricingPageData>;

export function getDefaultPricingData(locale: PricingLocale): PricingPageData {
  return defaults[locale];
}
