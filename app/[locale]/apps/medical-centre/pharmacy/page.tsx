import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.medicalCentre");

  return {
    title: t("links.pharmacy"),
    alternates: getLocaleAlternates("/apps/medical-centre/pharmacy"),
  };
}

export default function MedicalCentrePharmacyPage() {
  return <ComingSoonPage moduleKey="medicalCentre" linkKey="pharmacy" />;
}
