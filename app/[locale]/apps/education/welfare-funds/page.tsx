import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.education");

  return {
    title: t("links.welfareFunds"),
    alternates: getLocaleAlternates("/apps/education/welfare-funds"),
  };
}

export default function EducationWelfareFundsPage() {
  return <ComingSoonPage moduleKey="education" linkKey="welfareFunds" />;
}
