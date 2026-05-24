import CustomerStoriesPage from "./CustomerStoriesPage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.getServicesCustomerStories",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/customer-stories"),
  };
}

export default function Page() {
  return <CustomerStoriesPage />;
}
