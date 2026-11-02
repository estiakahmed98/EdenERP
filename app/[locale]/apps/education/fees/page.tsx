import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.education");

  return {
    title: t("links.fees"),
    alternates: getLocaleAlternates("/apps/education/fees"),
  };
}

export default function EducationFeesPage() {
  return <ComingSoonPage moduleKey="education" linkKey="fees" />;
}
