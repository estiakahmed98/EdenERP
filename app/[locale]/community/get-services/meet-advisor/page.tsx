import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import AppointmentPage from "@/components/landing/community/get services/meet-an-advisor/AppointmentPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.getServicesMeetAdvisor",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/meet-advisor"),
  };
}

export default function Page() {
  return <AppointmentPage />;
}
