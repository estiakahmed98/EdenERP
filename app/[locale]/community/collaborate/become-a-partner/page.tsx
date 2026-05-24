import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BecomeAPartnerPage from "./BecomeAPartnerPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.collaborateBecomePartner",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/collaborate/become-a-partner"),
  };
}

export default function Page() {
  return <BecomeAPartnerPage />;
}
