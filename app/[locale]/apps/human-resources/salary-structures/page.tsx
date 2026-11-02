import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.salaryStructures"),
    alternates: getLocaleAlternates("/apps/human-resources/salary-structures"),
  };
}

export default function HrPayrollSalaryStructuresPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="salaryStructures" />;
}
