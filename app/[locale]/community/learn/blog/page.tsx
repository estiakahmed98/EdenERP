import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BlogPage from "@/components/landing/community/learn/blog/BlogPage";
import { getLocaleAlternates } from "@/i18n/metadata";
import { getBlogList, parseListQuery } from "@/lib/blog";

// Posts come from the database and change whenever an admin publishes,
// edits or deletes one, so this page is rendered on every request.
export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const t = await getTranslations("pages.community.metadata.learnBlog");
  const query = parseListQuery(await searchParams);
  const filtered = Boolean(query.q || query.month || query.page > 1);

  return {
    // The translated title already carries the brand ("… | Adon ERP Community").
    title: { absolute: t("title") },
    description: t("description"),
    alternates: await getLocaleAlternates("/community/learn/blog"),
    // Search / archive / pagination variants are thin duplicates of the main list.
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = parseListQuery(await searchParams);
  let result = await getBlogList(query);
  // ?page=999 → show the last page instead of an empty list
  if (!result.posts.length && result.total > 0 && query.page > result.pages) {
    query.page = result.pages;
    result = await getBlogList(query);
  }
  const { posts, total, pages } = result;

  return (
    <BlogPage
      posts={posts}
      total={total}
      pages={pages}
      page={query.page}
      q={query.q}
      month={query.month}
    />
  );
}
