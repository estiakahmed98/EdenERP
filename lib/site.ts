/**
 * Resolves the public site URL dynamically. Priority:
 *  1. NEXT_PUBLIC_SITE_URL           – explicit override (custom domain)
 *  2. VERCEL_PROJECT_PRODUCTION_URL  – Vercel's production domain (e.g. adon-erp.vercel.app,
 *                                      or the custom domain once one is attached)
 *  3. VERCEL_URL                     – current deployment URL (previews)
 *  4. http://localhost:PORT          – local dev
 */
function resolveSiteUrl(): string {
  const withProtocol = (host: string) =>
    (/^https?:\/\//.test(host) ? host : `https://${host}`).replace(/\/+$/, "");

  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return withProtocol(explicit);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return withProtocol(vercelProd);

  const vercelDeployment = process.env.VERCEL_URL?.trim();
  if (vercelDeployment) return withProtocol(vercelDeployment);

  return `http://localhost:${process.env.PORT || 3000}`;
}

export const siteConfig = {
  name: "Adon ERP",
  title: "Adon ERP - Enterprise Solution",
  description:
    "Empower your business with innovative solutions for digital transformation. Join thousands of companies scaling faster with Adon ERP.",
  url: resolveSiteUrl(),
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
