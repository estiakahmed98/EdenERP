import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.realEstate");

  return {
    title: t("links.bookings"),
    alternates: getLocaleAlternates("/apps/real-estate/bookings"),
  };
}

export default function RealEstateBookingsPage() {
  return <ComingSoonPage moduleKey="realEstate" linkKey="bookings" />;
}
