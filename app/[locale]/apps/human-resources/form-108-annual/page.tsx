import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.form108Annual"),
    alternates: getLocaleAlternates("/apps/human-resources/form-108-annual"),
  };
}

export default function HrPayrollForm108AnnualPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="form108Annual" />;
}
