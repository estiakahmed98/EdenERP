export const siteConfig = {
  name: "Adon ERP",
  title: "Adon ERP - Enterprise Solution",
  description:
    "Empower your business with innovative solutions for digital transformation. Join thousands of companies scaling faster with Adon ERP.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000",
  locale: "en_US",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
  keywords: [
    "ERP",
    "ERP software",
    "ERP software Bangladesh",
    "Business Software",
    "Inventory Management",
    "CRM",
    "Accounting Software",
    "POS",
    "Manufacturing ERP",
    "HRM",
    "Payroll",
    "Adon ERP",
  ],
  /** Social profiles used in Organization schema `sameAs`. Set via env (comma separated). */
  sameAs: (process.env.NEXT_PUBLIC_SOCIAL_LINKS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
} as const;
