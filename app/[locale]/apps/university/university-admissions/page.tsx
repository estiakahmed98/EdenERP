import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.university");

  return {
    title: t("links.universityAdmissions"),
    alternates: getLocaleAlternates("/apps/university/university-admissions"),
  };
}

export default function UniversityUniversityAdmissionsPage() {
  return <ComingSoonPage moduleKey="university" linkKey="universityAdmissions" />;
}
