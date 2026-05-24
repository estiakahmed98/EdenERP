import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getLocaleAlternates } from "@/i18n/metadata";
import AppsPageClient from "./AppsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.apps.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/apps"),
  };
}

export default function AppsPage() {
  return <AppsPageClient />;
}
