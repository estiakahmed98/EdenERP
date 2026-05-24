import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BlogPage from "@/components/landing/community/learn/blog/BlogPage";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.learnBlog");

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/learn/blog"),
  };
}

export default function Page() {
  return <BlogPage />;
}
