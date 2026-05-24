import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import GithubPage from "./GithubPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.collaborateGithub");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/collaborate/github"),
  };
}

export default function Page() {
  return <GithubPage />;
}
