import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.hrPayroll");

  return {
    title: t("links.leaveApplications"),
    alternates: getLocaleAlternates("/apps/human-resources/leave-applications"),
  };
}

export default function HrPayrollLeaveApplicationsPage() {
  return <ComingSoonPage moduleKey="hrPayroll" linkKey="leaveApplications" />;
}
