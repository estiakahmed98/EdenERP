import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import TranslationsPage from "./TranslationsPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.collaborateTranslations",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/collaborate/translations"),
  };
}

export default function Page() {
  return <TranslationsPage />;
}
