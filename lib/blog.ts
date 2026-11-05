import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { processBlogSummary } from "@/components/admin/blog/summaryUtils";

/** Public blog data layer: reads the same posts the admin manages at /admin/blog. */

export const BLOG_PAGE_SIZE = 9;

export type PublicBlog = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  author: string;
  image: string;
  date: Date;
};

export type BlogListQuery = {
  page: number;
  q: string;
  /** "YYYY-MM" */
  month: string;
};

export type ArchiveMonth = { value: string; year: number; month: number; count: number };

const listSelect = {
  id: true,
  slug: true,
  title: true,
  summary: true,
  author: true,
  image: true,
  date: true,
} satisfies Prisma.BlogSelect;

const MONTH_RE = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function parseListQuery(params: {
  page?: string | string[];
  q?: string | string[];
  month?: string | string[];
}): BlogListQuery {
  const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) ?? "";
  const rawPage = Number.parseInt(first(params.page), 10);
  const month = first(params.month);
  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? Math.min(rawPage, 1000) : 1,
    q: first(params.q).trim().slice(0, 100),
    month: MONTH_RE.test(month) ? month : "",
  };
}

function whereFor({ q, month }: Pick<BlogListQuery, "q" | "month">): Prisma.BlogWhereInput {
  const where: Prisma.BlogWhereInput = {};
  if (q)
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { author: { contains: q, mode: "insensitive" } },
      { summary: { contains: q, mode: "insensitive" } },
    ];
  const match = MONTH_RE.exec(month);
  if (match) {
    const year = Number(match[1]);
    const index = Number(match[2]) - 1;
    where.date = {
      gte: new Date(Date.UTC(year, index, 1)),
      lt: new Date(Date.UTC(year, index + 1, 1)),
    };
  }
  return where;
}

export async function getBlogList(query: BlogListQuery) {
  const where = whereFor(query);
  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      select: listSelect,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      skip: (query.page - 1) * BLOG_PAGE_SIZE,
      take: BLOG_PAGE_SIZE,
    }),
    prisma.blog.count({ where }),
  ]);
  return {
    posts: posts as PublicBlog[],
    total,
    pages: Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE)),
  };
}

export async function getRecentBlogs(limit = 5, excludeId?: number) {
  const posts = await prisma.blog.findMany({
    where: excludeId ? { id: { not: excludeId } } : {},
    select: listSelect,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  return posts as PublicBlog[];
}

/** Months that have posts, newest first (text from SQL, so no time-zone drift). */
export async function getArchiveMonths(): Promise<ArchiveMonth[]> {
  const rows = await prisma.$queryRaw<{ ym: string; count: number }[]>`
    SELECT to_char("date", 'YYYY-MM') AS ym, COUNT(*)::int AS count
    FROM "Blog" GROUP BY ym ORDER BY ym DESC`;
  return rows.map((row) => {
    const [year, month] = row.ym.split("-").map(Number);
    return { value: row.ym, year, month, count: row.count };
  });
}

/** Sidebar ad: the image attached to the newest post that has one. */
export async function getSidebarAd() {
  return prisma.blog.findFirst({
    where: { ads: { not: null }, NOT: { ads: "" } },
    select: { ads: true, slug: true, title: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

/** Excerpt that is safe to render as plain text. */
export const excerpt = (summary: string, max = 150) => processBlogSummary(summary, max);

/** Strip the most dangerous constructs from admin-authored HTML before rendering. */
export function sanitizeHtmlFragment(value: string) {
  return value
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, " ")
    .replace(/<\s*(iframe|object|embed|svg|math|style|link|form|meta|base)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, " ")
    .replace(/<\s*(iframe|object|embed|link|meta|base|input)[^>]*>/gi, " ")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, " ")
    .replace(/(href|src|xlink:href|formaction)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html)[^"]*"|'\s*(?:javascript|vbscript|data:text\/html)[^']*')/gi, "$1=\"#\"");
}
