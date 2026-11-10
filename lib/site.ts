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
  // A template value left in place would point every canonical/hreflang/sitemap
  // URL at someone else's domain; ignore it and fall through.
  const isPlaceholder = !!explicit && /your-domain\.com|example\.(com|org|net)/i.test(explicit);
  if (isPlaceholder && process.env.NODE_ENV === "production") {
    console.warn(
      `[site] NEXT_PUBLIC_SITE_URL is a placeholder (${explicit}); set it to the real production URL.`,
    );
  }
  if (explicit && !isPlaceholder) return withProtocol(explicit);

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
  // Google Search Console token (public by design: it is rendered in <head>).
  googleVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "d3rVHLAts0ra0YAcNaV2snV6_CP_mdjDF1uY4gjSzmY",
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",

  /**
   * Local SEO — NAP (Name, Address, Phone). Keep this identical to the
   * Google Business Profile listing and the contact page.
   */
  business: {
    legalName: "Adon ERP",
    phone: "+8801842781978",
    phoneDisplay: "+880 1842-781978",
    whatsapp: "8801842781978",
    salesEmail: "sales@adonerp.com",
    supportEmail: "support@adonerp.com",
    address: {
      streetAddress:
        "Tower 71, Flat # 9 A-B, 516/3 South Manikdi, Matikata Road, ECB Chattar",
      addressLocality: "Dhaka Cantonment",
      addressRegion: "Dhaka",
      postalCode: "1206",
      addressCountry: "BD",
    },
    /** Set NEXT_PUBLIC_BUSINESS_GEO="lat,lng" (copy from Google Maps pin). */
    geo: (() => {
      const [lat, lng] = (process.env.NEXT_PUBLIC_BUSINESS_GEO || "")
        .split(",")
        .map((v) => Number(v.trim()));
      return Number.isFinite(lat) && Number.isFinite(lng) && lat && lng
        ? { latitude: lat, longitude: lng }
        : null;
    })(),
    /** Google Business Profile / Maps share link (optional). */
    mapUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      "https://maps.google.com/?q=Tower+71+ECB+Chattar+Dhaka+Cantonment",
    openingHours: [
      {
        days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "11:00",
        closes: "20:00",
      },
    ],
    areaServed: ["Bangladesh", "Dhaka", "Chattogram", "Gazipur", "Narayanganj"],
  },
} as const;
