// app/[locale]/pricing/page.tsx

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getLocaleAlternates } from "@/i18n/metadata";
import PricingClient from "./PricingClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.pricing.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/pricing"),
  };
}

export default function PricingPage() {
  return <PricingClient />;
}
