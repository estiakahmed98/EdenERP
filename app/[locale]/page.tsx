import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LandingPage from "@/components/landing/LandingPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.home.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/"),
  };
}

export default function LocaleHomePage() {
  return <LandingPage />;
}

