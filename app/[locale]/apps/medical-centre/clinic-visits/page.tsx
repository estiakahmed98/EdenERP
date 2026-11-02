import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.medicalCentre");

  return {
    title: t("links.clinicVisits"),
    alternates: getLocaleAlternates("/apps/medical-centre/clinic-visits"),
  };
}

export default function MedicalCentreClinicVisitsPage() {
  return <ComingSoonPage moduleKey="medicalCentre" linkKey="clinicVisits" />;
}
