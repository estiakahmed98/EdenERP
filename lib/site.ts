export const siteConfig = {
  name: "Adon ERP",
  description:
    "Empower your business with innovative solutions for digital transformation. Join thousands of companies scaling faster with Adon ERP.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000",
  locale: "en_US",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
} as const;

