import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CommunityHubPage from "@/components/community/CommunityHubPage";
import { getLocaleAlternates } from "@/i18n/metadata";

type HubLink = {
  label: string;
  href: string;
  description?: string;
};

type HubSection = {
  title: string;
  links: HubLink[];
};

type HubAction = {
  label: string;
  href: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.getServicesFindAccountant",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/get-services/find-an-accountant"),
  };
}

export default async function FindAnAccountantPage() {
  const t = await getTranslations("pages.community.hubs.getServicesFindAccountant");

  return (
    <CommunityHubPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      highlights={t.raw("highlights") as string[]}
      primaryAction={t.raw("primaryAction") as HubAction}
      secondaryAction={t.raw("secondaryAction") as HubAction}
      sections={t.raw("sections") as HubSection[]}
    />
  );
}
