import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import BlogImage from "@/components/blog/blog-image";
import BlogSidebar from "@/components/blog/blog-sidebar";
import {
  BLOG_PATH,
  blogListHref,
  formatMonth,
  formatPostDate,
} from "@/components/blog/format";
import { Link } from "@/i18n/navigation";
import { excerpt, type PublicBlog } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = {
  posts: PublicBlog[];
  total: number;
  pages: number;
  page: number;
  q: string;
  month: string;
};

export default async function BlogPage({
  posts,
  total,
  pages,
  page,
  q,
  month,
}: Props) {
  const [t, locale] = await Promise.all([
    getTranslations("pages.community.blog"),
    getLocale(),
  ]);

  const monthLabel = (() => {
    const match = /^(\d{4})-(\d{2})$/.exec(month);
    return match ? formatMonth(Number(match[1]), Number(match[2]), locale) : "";
  })();
  const filtered = Boolean(q || month);

  // 1 … 4 5 [6] 7 8 … 20
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("dynamic.totalPosts", { count: total })}
            </p>
          </header>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Posts column */}
            <div className="min-w-0">
              {filtered && (
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  {q && (
                    <Link
                      href={blogListHref({ month })}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                    >
                      {t("dynamic.searchLabel", { query: q })}
                      <X size={14} aria-hidden="true" />
                    </Link>
                  )}
                  {month && (
                    <Link
                      href={blogListHref({ q })}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                    >
                      {t("dynamic.archive", { month: monthLabel })}
                      <X size={14} aria-hidden="true" />
                    </Link>
                  )}
                  <Link
                    href={BLOG_PATH}
                    className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {t("dynamic.clearFilters")}
                  </Link>
                </div>
              )}

              {posts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post, index) => (
                    <article
                      key={post.id}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-16/10 overflow-hidden bg-muted">
                        <BlogImage
                          src={post.image}
                          alt={post.title}
                          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                          priority={index < 3}
                          className="transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <time
                          dateTime={post.date.toISOString()}
                          className="text-xs font-medium text-muted-foreground"
                        >
                          {formatPostDate(post.date, locale)}
                        </time>

                        <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          <Link
                            href={`${BLOG_PATH}/${post.slug}`}
                            className="after:absolute after:inset-0"
                          >
                            {post.title}
                          </Link>
                        </h2>

                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                          {excerpt(post.summary, 150)}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                          <span className="truncate text-xs font-medium text-muted-foreground">
                            {t("dynamic.by", { author: post.author })}
                          </span>
                          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                            {t("readMore")}
                            <ChevronRight size={16} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileText size={28} aria-hidden="true" />
                  </span>
                  <p className="text-lg font-bold text-foreground">
                    {filtered ? t("dynamic.noResults", { query: q || monthLabel }) : t("dynamic.emptyTitle")}
                  </p>
                  {!filtered && (
                    <p className="max-w-sm text-sm text-muted-foreground">
                      {t("dynamic.emptyText")}
                    </p>
                  )}
                  {filtered && (
                    <Link
                      href={BLOG_PATH}
                      className="rounded-xl btn-gradient px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      {t("dynamic.clearFilters")}
                    </Link>
                  )}
                </div>
              )}

              {/* Pagination */}
              {pages > 1 && (
                <nav
                  aria-label={t("pagination.aria")}
                  className="mt-12 flex flex-wrap items-center justify-between gap-4"
                >
                  <span className="text-sm text-muted-foreground">
                    {t("dynamic.pageOf", { page, pages })}
                  </span>
                  <div className="flex items-center gap-2">
                    {page > 1 ? (
                      <Link
                        href={blogListHref({ q, month, page: page - 1 })}
                        aria-label={t("dynamic.previous")}
                        className="flex h-10 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        <ChevronLeft size={16} aria-hidden="true" />
                        <span className="hidden sm:inline">{t("dynamic.previous")}</span>
                      </Link>
                    ) : null}

                    {pageNumbers.map((n, i) => (
                      <span key={n} className="flex items-center gap-2">
                        {i > 0 && n - pageNumbers[i - 1] > 1 && (
                          <span className="text-muted-foreground">…</span>
                        )}
                        <Link
                          href={blogListHref({ q, month, page: n })}
                          aria-current={n === page ? "page" : undefined}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold transition",
                            n === page
                              ? "btn-gradient text-primary-foreground"
                              : "border border-border bg-card text-foreground hover:bg-muted",
                          )}
                        >
                          {n}
                        </Link>
                      </span>
                    ))}

                    {page < pages ? (
                      <Link
                        href={blogListHref({ q, month, page: page + 1 })}
                        aria-label={t("dynamic.next")}
                        className="flex h-10 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        <span className="hidden sm:inline">{t("dynamic.next")}</span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </nav>
              )}
            </div>

            {/* Sticky, dynamic sidebar */}
            <BlogSidebar q={q} month={month} />
          </div>
        </div>
      </section>
    </main>
  );
}
