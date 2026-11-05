import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
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
    const routePath = segments.length ? "/" + segments.join("/") : "";
    if (NOINDEX_PREFIXES.some((p) => routePath === p || routePath.startsWith(p + "/"))) continue;
    routes.add(routePath);
  }

  routes.add("");
  return [...routes].sort((a, b) => a.localeCompare(b));
}

const NOINDEX_PREFIXES = ["/auth", "/checkout"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appDir = path.join(process.cwd(), "app");
  const paths = discoverAppPageRoutes(appDir);

  // One entry per locale per page, each carrying hreflang alternates.
  return paths.flatMap((p) => {
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
      priority: p === "" ? 1 : Math.max(0.4, 0.8 - (depth - 1) * 0.1),
      alternates: { languages },
    }));
  });
}
