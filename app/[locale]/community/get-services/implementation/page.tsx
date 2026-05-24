import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PricingPacksPage from "@/components/landing/community/get services/implementation/ImplementationPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.getServicesImplementation",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/implementation"),
  };
}

export default function Page() {
  return <PricingPacksPage />;
}
