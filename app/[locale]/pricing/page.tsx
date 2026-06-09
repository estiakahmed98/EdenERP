import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PricingPageClient from "@/components/pricing/PricingPageClient";
import { isLocale } from "@/i18n/config";
import { getPricingPageData, getPricingSiteConfig } from "@/lib/pricing/service";
import type { PricingLocale } from "@/lib/pricing/types";

interface PricingRouteProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PricingRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const data = await getPricingPageData(locale);

  return {
    title: data.metadata.title,
    description: data.metadata.description,
  };
}

export default async function PricingPageRoot({ params }: PricingRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const [config, data] = await Promise.all([
    getPricingSiteConfig(),
    getPricingPageData(locale as PricingLocale),
  ]);

  if (!config.pricingPageEnabled) {
    notFound();
  }

  return <PricingPageClient data={data} />;
}
