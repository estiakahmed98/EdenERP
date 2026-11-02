import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.gradesSteps"),
    alternates: getLocaleAlternates("/apps/human-resources/grades-steps"),
  };
}

export default function HrPayrollGradesStepsPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="gradesSteps" />;
}
