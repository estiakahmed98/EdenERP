import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HelpCenter from "@/components/help/help-center";
import { guides, referenceNotes } from "@/components/community/redesign/data";
import { getLocaleAlternates } from "@/i18n/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.help.metadata");
  return {
    title: t("title"),
    description: t("description"),
    alternates: await getLocaleAlternates("/help"),
  };
}

export default async function HelpPage() {
  const t = await getTranslations("pages.communityApp");
  return (
    <HelpCenter
      resources={[
        ...referenceNotes(t).map((note) => ({
          ...note,
          kind: "reference" as const,
        })),
        ...guides(t).map((guide) => ({ ...guide, kind: "guide" as const })),
      ]}
      faqs={[
        [
          t("data.whereShouldIStart"),
          t("data.chooseLearnForProductExplorationGet"),
        ],
        [
          t("data.canISearchTheNotes"),
          t("data.yesSearchTitlesSummariesAndGuide"),
        ],
        [
          t("data.willAnAdvisorRequestBookA"),
          t("data.theSharedFormRequestsYourContact"),
        ],
      ]}
      contact={{
        email: siteConfig.business.supportEmail,
        phone: siteConfig.business.phone,
        phoneDisplay: siteConfig.business.phoneDisplay,
      }}
    />
  );
}
