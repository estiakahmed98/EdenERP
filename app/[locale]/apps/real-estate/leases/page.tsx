import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.realEstate");

  return {
    title: t("links.leases"),
    alternates: getLocaleAlternates("/apps/real-estate/leases"),
  };
}

export default function RealEstateLeasesPage() {
  return <ComingSoonPage moduleKey="realEstate" linkKey="leases" />;
}
