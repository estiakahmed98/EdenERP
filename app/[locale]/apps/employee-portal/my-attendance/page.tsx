import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.employeePortal");

  return {
    title: t("links.myAttendance"),
    alternates: getLocaleAlternates("/apps/employee-portal/my-attendance"),
  };
}

export default function EmployeePortalMyAttendancePage() {
  return <ComingSoonPage moduleKey="employeePortal" linkKey="myAttendance" />;
}
