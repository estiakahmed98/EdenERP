import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PricingPageClient from "@/components/pricing/PricingPageClient";
import { isLocale } from "@/i18n/config";
import { getLocaleAlternates } from "@/i18n/metadata";
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

  // Title comes from the admin/DB; drop any trailing brand(s) since the
  // root layout template already appends "| Adon ERP".
  const rawTitle = data.metadata.title ?? "";
  const title = rawTitle
    .replace(/(\s*[|\-–—]\s*(Adon ERP| Adon ERP))+\s*$/i, "")
    .trim();

  return {
    title: title || rawTitle || "Pricing",
    description: data.metadata.description,
    alternates: await getLocaleAlternates("/pricing"),
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
