import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.employeePortal");

  return {
    title: t("links.myProfile"),
    alternates: getLocaleAlternates("/apps/employee-portal/my-profile"),
  };
}

export default function EmployeePortalMyProfilePage() {
  return <ComingSoonPage moduleKey="employeePortal" linkKey="myProfile" />;
}
