import { Archive, Clock, Search } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import {
  getArchiveMonths,
  getRecentBlogs,
  getSidebarAd,
} from "@/lib/blog";
import { cn } from "@/lib/utils";
import BlogImage from "./blog-image";
import {
  BLOG_PATH,
  blogListHref,
  formatMonth,
  formatPostDate,
} from "./format";

/**
 * Right column: search, recent posts, archive and ad. Everything comes from
 * the same posts managed at /admin/blog. Sticky on large screens.
 */
export default async function BlogSidebar({
  q = "",
  month = "",
  excludeId,
  adSrc,
}: {
  q?: string;
  month?: string;
  /** Hide the post currently being read from "Recent posts". */
  excludeId?: number;
  /** Ad image for this page; falls back to the newest post's ad. */
  adSrc?: string;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("pages.community.blog"),
    getLocale(),
  ]);
  const [recent, archive, globalAd] = await Promise.all([
    getRecentBlogs(5, excludeId),
    getArchiveMonths(),
    adSrc ? Promise.resolve(null) : getSidebarAd(),
  ]);
  const ad = adSrc ?? globalAd?.ads ?? "";

  const card =
    "rounded-2xl border border-border bg-card p-5 shadow-sm";
  const heading =
    "mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground";

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-1 lg:[scrollbar-width:thin]">
      {/* Search */}
      <form
        action={`/${locale}${BLOG_PATH}`}
        method="get"
        role="search"
        className={cn(card, "p-4")}
      >
        {month && <input type="hidden" name="month" value={month} />}
        <label className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
          <input
            type="search"
            name="q"
            defaultValue={q}
            maxLength={100}
            placeholder={t("sidebar.search")}
            aria-label={t("sidebar.search")}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label={t("sidebar.search")}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Search size={18} />
          </button>
        </label>
      </form>

      {/* Recent posts */}
      {recent.length > 0 && (
        <section className={card}>
          <h3 className={heading}>
            <Clock size={16} className="text-primary" aria-hidden="true" />
            {t("dynamic.recent")}
          </h3>
          <ul className="space-y-4">
            {recent.map((post) => (
              <li key={post.id}>
                <Link
                  href={`${BLOG_PATH}/${post.slug}`}
                  className="group flex items-center gap-3"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <BlogImage
                      src={post.image}
                      alt=""
                      sizes="64px"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {formatPostDate(post.date, locale)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Archive */}
      {archive.length > 0 && (
        <section className={card}>
          <h3 className={heading}>
            <Archive size={16} className="text-primary" aria-hidden="true" />
            {t("sidebar.archives")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href={blogListHref({ q })}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  !month
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t("sidebar.allDates")}
              </Link>
            </li>
            {archive.map((item) => (
              <li key={item.value}>
                <Link
                  href={blogListHref({ q, month: item.value })}
                  aria-current={month === item.value ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    month === item.value
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span>{formatMonth(item.year, item.month, locale)}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums">
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Ad */}
      {ad && (
        <section className={cn(card, "overflow-hidden p-0")}>
          <p className="px-4 pt-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("dynamic.sponsored")}
          </p>
          <div className="relative mt-2 aspect-4/5 w-full">
            <BlogImage
              src={ad}
              alt={t("dynamic.sponsored")}
              sizes="(min-width: 1024px) 320px, 100vw"
            />
          </div>
        </section>
      )}
    </aside>
  );
}
