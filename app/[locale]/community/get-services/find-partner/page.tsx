import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PartnersPage from "@/components/landing/community/get services/find-a-partner/PartnersPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.getServicesFindPartner");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/find-partner"),
  };
}

export default function Page() {
  return <PartnersPage />;
}
