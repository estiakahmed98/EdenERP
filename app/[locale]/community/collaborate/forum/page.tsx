import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ForumPage from "./ForumPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.collaborateForum");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/collaborate/forum"),
  };
}

export default function Page() {
  return <ForumPage />;
}
