import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const PRIVATE_PATHS = [
  "/api/",
  "/admin",
  "/auth/",
  "/checkout",
  "/*/auth/",
  "/*/checkout",
  "/_next/",
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url;
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      // Explicitly welcome AI search / answer-engine crawlers (GEO).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
        ],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
