import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PricingPageClient from "@/components/pricing/PricingPageClient";
import { getPricingPageData, getPricingSiteConfig } from "@/lib/pricing/service";
import type { PricingLocale } from "@/lib/pricing/types";

interface PricingRouteProps {
  params: Promise<{ locale: PricingLocale }>;
}

export async function generateMetadata({
  params,
}: PricingRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getPricingPageData(locale);

  return {
    title: data.metadata.title,
    description: data.metadata.description,
  };
}

export default async function PricingPageRoot({ params }: PricingRouteProps) {
  const { locale } = await params;
  const [config, data] = await Promise.all([
    getPricingSiteConfig(),
    getPricingPageData(locale),
  ]);

  if (!config.pricingPageEnabled) {
    notFound();
  }

  return <PricingPageClient data={data} />;
}
