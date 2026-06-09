export type PricingLocale = "en" | "bn";
export type PricingPageType = "pricing" | "standard" | "success-packs";

export type PricingHeroContent = {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  billingToggle?: {
    yearly?: string;
    semiannual?: string;
    quarterly?: string;
    monthly?: string;
    yearlyDiscount?: string;
    semiannualDiscount?: string;
    quarterlyDiscount?: string;
  };
};

export type PricingPackageLabels = {
  currencyRate?: string;
  perMonth?: string;
  perQuarter?: string;
  perYear?: string;
  perUser?: string;
  perUserPerMonth?: string;
  perUserPerQuarter?: string;
  perUserPerYear?: string;
  totalPerMonth?: string;
  totalPerQuarter?: string;
  totalPerYear?: string;
  youSave?: string;
  everyThreeMonths?: string;
  oneTimeSetup?: string;
  monthlyCharge?: string;
  serverMaintenance?: string;
  usersLabel?: string;
  customQuote?: string;
  contactForQuote?: string;
};

export type PricingBottomNoteContent = {
  text?: string;
  buttons?: {
    successPacks?: string;
    contactSales?: string;
  };
};

export type PricingFinalCtaContent = {
  title?: string;
  description?: string;
  button?: string;
};

export type StandardPlanContent = {
  backButton?: string;
  title?: string;
  description?: string;
  userCountLabel?: string;
  implementationLabel?: string;
  implementationOptions?: {
    self?: string;
    successPack?: string;
    successPackSublabel?: string;
    partner?: string;
    partnerSublabel?: string;
  };
  successPackMessage?: {
    text?: string;
    configureButton?: string;
    readMoreButton?: string;
  };
  priceSummary?: {
    totalPerMonth?: string;
    yearlyBillNote?: string;
    yearlySavings?: string;
    buyNow?: string;
    firstYearDiscount?: string;
    perUserNote?: string;
    quotaPrint?: string;
  };
  includedTitle?: string;
  includedList?: string[];
};

export type SuccessPacksContent = {
  backButton?: string;
  title?: string;
  description?: string;
  estimatorBadge?: string;
  packCard?: {
    hours?: string;
    returning?: string;
    new?: string;
  };
  features?: Record<string, string>;
  packs?: Record<string, string>;
  recommended?: Record<string, string>;
  comparisonTable?: {
    featureHeader?: string;
  };
  notes?: string[];
};

export type PricingFaqItem = {
  id?: string;
  question: string;
  answer: string;
  order?: number;
  enabled?: boolean;
  pageType?: PricingPageType;
};

export type PricingPlanData = {
  id: string;
  dbId?: string;
  name: string;
  tagline: string;
  badge?: string | null;
  icon: string;
  accent: string;
  users?: number | string;
  currency?: "BDT" | "USD";
  setupFee?: number;
  monthlyFee?: number;
  quarterlyFee?: number;
  serverFee?: number;
  cta: string;
  order: number;
  enabled: boolean;
  features: string[];
};

export type PricingPageData = {
  locale: PricingLocale;
  metadata: {
    title?: string;
    description?: string;
  };
  hero: PricingHeroContent;
  packagePricing: PricingPackageLabels;
  erpPackages: PricingPlanData[];
  includedFeaturesHeading?: string;
  bottomNote: PricingBottomNoteContent;
  modules: {
    title?: string;
    list: string[];
  };
  faq: {
    title?: string;
    description?: string;
    items: PricingFaqItem[];
  };
  finalCta: PricingFinalCtaContent;
  standardPlanPage: StandardPlanContent;
  successPacksPage: SuccessPacksContent & {
    faq: {
      title?: string;
      items: PricingFaqItem[];
    };
  };
};

export type PricingSiteConfig = {
  pricingPageEnabled: boolean;
};
