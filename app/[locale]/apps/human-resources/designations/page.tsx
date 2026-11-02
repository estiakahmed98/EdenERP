import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.designations"),
    alternates: getLocaleAlternates("/apps/human-resources/designations"),
  };
}

export default function HrPayrollDesignationsPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="designations" />;
}
