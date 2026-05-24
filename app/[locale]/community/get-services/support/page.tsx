import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import SupportPage from "@/components/landing/community/get services/support/SupportPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.support.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/support"),
  };
}

export default function Page() {
  return <SupportPage />;
}
