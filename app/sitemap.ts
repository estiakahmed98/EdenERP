import type { MetadataRoute } from "next";
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
    const rel = path.relative(appDir, file);
    const segments = rel.split(path.sep);

    if (segments.some((s) => isRouteGroup(s) || isParallelRoute(s))) continue;
    if (segments.some((s) => isDynamicSegment(s))) continue;
    if (segments.some((s) => SPECIAL_SEGMENT_FILES.has(s))) continue;

    // drop trailing "page.*"
    segments.pop();
    const routePath = "/" + segments.join("/");
    routes.add(routePath === "/" ? "/" : routePath.replace(/\/+$/, ""));
  }

  // ensure root is present
  routes.add("/");

  return [...routes].sort((a, b) => a.localeCompare(b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appDir = path.join(process.cwd(), "app");
  const paths = discoverAppPageRoutes(appDir);

  const entries: MetadataRoute.Sitemap = paths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.6,
  }));

  return entries;
}
