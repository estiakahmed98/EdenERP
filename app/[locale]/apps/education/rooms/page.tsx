import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.education");

  return {
    title: t("links.rooms"),
    alternates: getLocaleAlternates("/apps/education/rooms"),
  };
}

export default function EducationRoomsPage() {
  return <ComingSoonPage moduleKey="education" linkKey="rooms" />;
}
