import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import EventsPage from "./EventsPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.collaborateEvents");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/collaborate/events"),
  };
}

export default function Page() {
  return <EventsPage />;
}
