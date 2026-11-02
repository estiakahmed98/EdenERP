import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");

  return {
    title: t("links.registration"),
    alternates: getLocaleAlternates("/apps/university/registration"),
  };
}

export default function UniversityRegistrationPage() {
  return <ComingSoonPage moduleKey="university" linkKey="registration" />;
}
