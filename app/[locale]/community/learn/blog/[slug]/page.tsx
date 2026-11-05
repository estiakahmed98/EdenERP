import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import BlogImage from "@/components/blog/blog-image";
import BlogSidebar from "@/components/blog/blog-sidebar";
import { BLOG_PATH, formatPostDate } from "@/components/blog/format";
import { getLocaleAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { excerpt, getBlogBySlug, sanitizeHtmlFragment } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = Promise<{ locale: string; slug: string }>;

const slugOf = (raw: string) => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slugOf(slug));
  if (!post) return { title: "Not found", robots: { index: false } };

  const description = excerpt(post.summary, 160);
  return {
    title: post.title,
    description,
    alternates: await getLocaleAlternates(`${BLOG_PATH}/${post.slug}`),
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.date.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slugOf(slug));
  if (!post) notFound();

  const [t, locale] = await Promise.all([
    getTranslations("pages.community.blog"),
    getLocale(),
  ]);

  const absolute = (src: string) =>
    src.startsWith("http") ? src : `${siteConfig.url}${src}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerpt(post.summary, 160),
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/${locale}${BLOG_PATH}/${post.slug}`,
    ...(post.image ? { image: [absolute(post.image)] } : {}),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href={BLOG_PATH}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t("dynamic.back")}
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
            <article className="min-w-0">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <User size={15} aria-hidden="true" />
                  {post.author}
                </span>
                <time
                  dateTime={post.date.toISOString()}
                  className="inline-flex items-center gap-2"
                >
                  <CalendarDays size={15} aria-hidden="true" />
                  {formatPostDate(post.date, locale)}
                </time>
              </div>

              {post.image && (
                <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    sizes="(min-width: 1024px) 800px, 100vw"
                    priority
                  />
                </div>
              )}

              {post.summary && (
                <p className="mt-8 border-l-4 border-primary pl-5 text-lg leading-8 text-muted-foreground">
                  {excerpt(post.summary, 400)}
                </p>
              )}

              <div
                className={[
                  "mt-8 max-w-none text-base leading-8 text-foreground/90",
                  "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold",
                  "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold",
                  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold",
                  "[&_p]:mb-5",
                  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
                  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1.5",
                  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
                  "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl",
                  "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2",
                  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_code]:text-sm",
                  "[&_hr]:my-8 [&_hr]:border-border",
                  "break-words",
                ].join(" ")}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlFragment(post.content),
                }}
              />
            </article>

            {/* Sticky, dynamic sidebar */}
            <BlogSidebar excludeId={post.id} adSrc={post.ads || undefined} />
          </div>
        </div>
      </section>
    </main>
  );
}
