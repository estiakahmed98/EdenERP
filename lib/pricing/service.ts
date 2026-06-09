import { Prisma } from "@/lib/generated/prisma/client";
import { db } from "@/lib/db";
import { getDefaultPricingData } from "@/lib/pricing/defaults";
import type {
  PricingFaqItem,
  PricingLocale,
  PricingPageData,
  PricingPageType,
  PricingPlanData,
  PricingSiteConfig,
} from "@/lib/pricing/types";

const SETTINGS_SINGLETON_ID = 1;

function decimalToNumber(value: Prisma.Decimal | null | undefined) {
  return value == null ? undefined : Number(value);
}

function sectionMap(
  rows: Array<{ sectionKey: string; content: Prisma.JsonValue }>,
): Record<string, any> {
  return Object.fromEntries(rows.map((row) => [row.sectionKey, row.content]));
}

function mapFaqs(
  rows: Array<{
    id: string;
    question: string;
    answer: string;
    order: number;
    enabled: boolean;
    pageType: string;
  }>,
): PricingFaqItem[] {
  return rows
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      order: item.order,
      enabled: item.enabled,
      pageType: item.pageType as PricingPageType,
    }));
}

function mapPlans(
  rows: Array<{
    id: string;
    planKey: string;
    order: number;
    enabled: boolean;
    name: string;
    tagline: string;
    badge: string | null;
    icon: string;
    accent: string;
    usersLabel: string | null;
    usersCount: number | null;
    currency: string | null;
    setupFee: Prisma.Decimal | null;
    monthlyFee: Prisma.Decimal | null;
    quarterlyFee: Prisma.Decimal | null;
    serverFee: Prisma.Decimal | null;
    cta: string;
    features: Array<{ text: string; order: number }>;
  }>,
  includeDisabled = false,
): PricingPlanData[] {
  return rows
    .filter((plan) => includeDisabled || plan.enabled)
    .sort((a, b) => a.order - b.order)
    .map((plan) => ({
      id: plan.planKey,
      dbId: plan.id,
      name: plan.name,
      tagline: plan.tagline,
      badge: plan.badge,
      icon: plan.icon,
      accent: plan.accent,
      users: plan.usersLabel ?? plan.usersCount ?? undefined,
      currency: (plan.currency as "BDT" | "USD" | null) ?? undefined,
      setupFee: decimalToNumber(plan.setupFee),
      monthlyFee: decimalToNumber(plan.monthlyFee),
      quarterlyFee: decimalToNumber(plan.quarterlyFee),
      serverFee: decimalToNumber(plan.serverFee),
      cta: plan.cta,
      order: plan.order,
      enabled: plan.enabled,
      features: [...plan.features]
        .sort((a, b) => a.order - b.order)
        .map((feature) => feature.text),
    }));
}

export async function getPricingSiteConfig(): Promise<PricingSiteConfig> {
  const settings = await db.pricingSettings.findUnique({
    where: { id: SETTINGS_SINGLETON_ID },
  });

  return {
    pricingPageEnabled: settings?.pricingPageEnabled ?? true,
  };
}

export async function getPricingPageData(
  locale: PricingLocale,
): Promise<PricingPageData> {
  const defaultData = getDefaultPricingData(locale);

  const [contentRows, faqRows, moduleRows, planRows] = await Promise.all([
    db.pricingPageContent.findMany({
      where: { locale },
    }),
    db.pricingFaq.findMany({
      where: { locale },
    }),
    db.pricingModule.findMany({
      where: { locale },
      orderBy: { order: "asc" },
    }),
    db.pricingPlan.findMany({
      where: { locale },
      include: {
        features: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    }),
  ]);

  if (
    contentRows.length === 0 &&
    faqRows.length === 0 &&
    moduleRows.length === 0 &&
    planRows.length === 0
  ) {
    return defaultData;
  }

  const content = sectionMap(contentRows);
  const pricingFaq = mapFaqs(faqRows.filter((item) => item.pageType === "pricing"));
  const successFaq = mapFaqs(
    faqRows.filter((item) => item.pageType === "success-packs"),
  );
  const modules = moduleRows
    .filter((item) => item.enabled)
    .map((item) => item.label);
  const hasStoredPricingData =
    contentRows.length > 0 ||
    faqRows.length > 0 ||
    moduleRows.length > 0 ||
    planRows.length > 0;

  return {
    locale,
    metadata: (content.metadata as PricingPageData["metadata"]) ?? defaultData.metadata,
    hero: (content.hero as PricingPageData["hero"]) ?? defaultData.hero,
    packagePricing:
      (content.packagePricing as PricingPageData["packagePricing"]) ??
      defaultData.packagePricing,
    erpPackages: hasStoredPricingData ? mapPlans(planRows) : defaultData.erpPackages,
    includedFeaturesHeading:
      (content.includedFeaturesHeading as string | undefined) ??
      defaultData.includedFeaturesHeading,
    bottomNote:
      (content.bottomNote as PricingPageData["bottomNote"]) ?? defaultData.bottomNote,
    modules: {
      title:
        (content.modulesTitle as string | undefined) ?? defaultData.modules.title,
      list: hasStoredPricingData ? modules : defaultData.modules.list,
    },
    faq: {
      title: (content.faqMeta as any)?.title ?? defaultData.faq.title,
      description:
        (content.faqMeta as any)?.description ?? defaultData.faq.description,
      items: hasStoredPricingData ? pricingFaq : defaultData.faq.items,
    },
    finalCta:
      (content.finalCta as PricingPageData["finalCta"]) ?? defaultData.finalCta,
    standardPlanPage:
      (content.standardPlanPage as PricingPageData["standardPlanPage"]) ??
      defaultData.standardPlanPage,
    successPacksPage: {
      ...defaultData.successPacksPage,
      ...((content.successPacksPage as PricingPageData["successPacksPage"]) ?? {}),
      faq: {
        title:
          (content.successPacksFaqMeta as any)?.title ??
          defaultData.successPacksPage.faq.title,
        items: hasStoredPricingData
          ? successFaq
          : defaultData.successPacksPage.faq.items,
      },
    },
  };
}

export async function getPricingAdminData(locale: PricingLocale) {
  const [settings, pageData, planRows, faqRows, moduleRows, contentRows] =
    await Promise.all([
      getPricingSiteConfig(),
      getPricingPageData(locale),
      db.pricingPlan.findMany({
        where: { locale },
        include: { features: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
      db.pricingFaq.findMany({
        where: { locale },
        orderBy: [{ pageType: "asc" }, { order: "asc" }],
      }),
      db.pricingModule.findMany({
        where: { locale },
        orderBy: { order: "asc" },
      }),
      db.pricingPageContent.findMany({
        where: { locale },
        orderBy: { sectionKey: "asc" },
      }),
    ]);

  return {
    settings,
    pageData,
    plans: mapPlans(planRows, true),
    faqs: faqRows,
    modules: moduleRows,
    sections: contentRows,
  };
}

export async function ensurePricingSettings() {
  return db.pricingSettings.upsert({
    where: { id: SETTINGS_SINGLETON_ID },
    update: {},
    create: {
      id: SETTINGS_SINGLETON_ID,
      pricingPageEnabled: true,
    },
  });
}
