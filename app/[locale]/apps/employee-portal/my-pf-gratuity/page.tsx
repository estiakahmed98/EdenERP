import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.employeePortal");

  return {
    title: t("links.myPfGratuity"),
    alternates: getLocaleAlternates("/apps/employee-portal/my-pf-gratuity"),
  };
}

export default function EmployeePortalMyPfGratuityPage() {
  return <ComingSoonPage moduleKey="employeePortal" linkKey="myPfGratuity" />;
}
