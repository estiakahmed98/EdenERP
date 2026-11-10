import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import fs from "node:fs";
import path from "node:path";

const SPECIAL_SEGMENT_FILES = new Set([
  "layout.tsx",
  "layout.ts",
  "layout.jsx",
  "layout.js",
  "template.tsx",
  "template.ts",
  "template.jsx",
  "template.js",
  "loading.tsx",
  "loading.ts",
  "loading.jsx",
  "loading.js",
  "error.tsx",
  "error.ts",
  "error.jsx",
  "error.js",
  "global-error.tsx",
  "global-error.ts",
  "not-found.tsx",
  "not-found.ts",
  "default.tsx",
  "default.ts",
]);

function isRouteGroup(segment: string) {
  return segment.startsWith("(") && segment.endsWith(")");
}

function isParallelRoute(segment: string) {
  return segment.startsWith("@");
}

function isDynamicSegment(segment: string) {
  return segment.startsWith("[") && segment.endsWith("]");
}

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
      continue;
    }
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function discoverAppPageRoutes(appDir: string): string[] {
  const allFiles = walkDir(appDir);
  const pageFiles = allFiles.filter((f) =>
    /[\\/](page)\.(tsx|ts|jsx|js)$/.test(f)
  );

  const routes = new Set<string>();

  for (const file of pageFiles) {
    const segments = path.relative(appDir, file).split(path.sep);

    // Only localized public pages live under app/[locale]
    if (segments[0] !== "[locale]") continue;
    segments.shift();

    if (segments.some((s) => isRouteGroup(s) || isParallelRoute(s))) continue;
    if (segments.some((s) => isDynamicSegment(s))) continue;
    if (segments.some((s) => SPECIAL_SEGMENT_FILES.has(s))) continue;
    if (segments.some((s) => s.startsWith("_"))) continue;

    segments.pop(); // drop page.*
    // Legacy-URL stubs that only redirect must not be listed (sitemaps should hold final URLs).
    if (REDIRECT_STUB.test(fs.readFileSync(file, "utf8"))) continue;
    const routePath = segments.length ? "/" + segments.join("/") : "";
    if (NOINDEX_PREFIXES.some((p) => routePath === p || routePath.startsWith(p + "/"))) continue;
    routes.add(routePath);
  }

  routes.add("");
  return [...routes].sort((a, b) => a.localeCompare(b));
}

const NOINDEX_PREFIXES = ["/auth", "/checkout"];
const REDIRECT_STUB = /^\s*(?:permanentRedirect|redirect)\(/m;

/**
 * Next.js writes sitemap URLs into the XML verbatim (no escaping), so a raw "&"
 * (e.g. "/industries/food&hospitality") produces invalid XML. Escape XML entities.
 * Percent-encoding is not an option: "/food%26hospitality" returns 404.
 */
function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const BLOG_BASE = "/community/learn/blog";

/** Published blog posts (managed in /admin/blog). Never fails the whole sitemap. */
async function blogPostEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await prisma.blog.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { date: "desc" },
    });
    return posts.flatMap((post) => {
      const rel = `${BLOG_BASE}/${encodeURIComponent(post.slug)}`;
      const languages = {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, xmlEscape(`${siteConfig.url}/${l}${rel}`)]),
        ),
        "x-default": xmlEscape(`${siteConfig.url}/${routing.defaultLocale}${rel}`),
      };
      return routing.locales.map((locale) => ({
        url: xmlEscape(`${siteConfig.url}/${locale}${rel}`),
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages },
      }));
    });
  } catch (error) {
    // Don't fail the whole sitemap, but never drop blog URLs silently either.
    console.error("[sitemap] blog entries omitted — database query failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const appDir = path.join(process.cwd(), "app");
  const paths = discoverAppPageRoutes(appDir);

  // One entry per locale per page, each carrying hreflang alternates.
  const pages = paths.map(xmlEscape).flatMap((p) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, `${siteConfig.url}/${l}${p}`])
      ),
      "x-default": `${siteConfig.url}/${routing.defaultLocale}${p}`,
    };
    const depth = p === "" ? 0 : p.split("/").length - 1;

    return routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority:
        p === ""
          ? 1
          : Math.round(Math.max(0.4, 0.8 - (depth - 1) * 0.1) * 10) / 10,
      alternates: { languages },
    }));
  });

  return [...pages, ...(await blogPostEntries())];
}
