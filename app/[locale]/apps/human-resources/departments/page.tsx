import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.departments"),
    alternates: getLocaleAlternates("/apps/human-resources/departments"),
  };
}

export default function HrPayrollDepartmentsPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="departments" />;
}
