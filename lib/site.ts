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

const officeAddress = {
  building: "Tower 71, Flat # 9 A-B, 516/3 South Manikdi",
  road: "Matikata Road, ECB Chattar",
  locality: "Dhaka Cantonment",
  city: "Dhaka",
  postalCode: "1206",
  country: "Bangladesh",
} as const;

const officeAddressLines = [
  officeAddress.building,
  `${officeAddress.road}, ${officeAddress.locality}`,
  `${officeAddress.city} - ${officeAddress.postalCode}, ${officeAddress.country}`,
] as const;

// The office's supplied Google Maps embed and its matching public place pin.
const officeMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.9458590854933!2d90.390585!3d23.820524199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e42bf9d07b%3A0x1b48a34d1a5a717c!2sAdon%20ERP!5e0!3m2!1sen!2sbd!4v1795430380256!5m2!1sen!2sbd";
const officeMapUrl = "https://www.google.com/maps?cid=1966000788897165692";

const businessPhones = [
  { number: "+8801842781978", display: "+880 1842-781978" },
  { number: "+8801805412462", display: "+880 1805412462" },
] as const;
const businessEmail = "adonventure@gmail.com";
const supportEmails = [
  "support@adonerp.com",
  "support@adonerp.com.bd",
  "support@adonerp.bd",
] as const;

export const siteConfig = {
  name: "Adon ERP",
  title: "Adon ERP - Enterprise Solution",
  description:
    "Connected modules for finance, sales, inventory, manufacturing and team operations. Explore AdonERP for your business.",
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
    companyName: "Birds Of Eden",
    companyWebsite: "https://birdsofeden.me/",
    phones: businessPhones,
    phone: businessPhones[0].number,
    phoneDisplay: businessPhones[0].display,
    whatsapp: "8801842781978",
    email: businessEmail,
    salesEmail: businessEmail,
    supportEmail: supportEmails[0],
    supportEmails,
    addressLines: officeAddressLines,
    address: {
      streetAddress: `${officeAddress.building}, ${officeAddress.road}`,
      addressLocality: officeAddress.locality,
      addressRegion: officeAddress.city,
      postalCode: officeAddress.postalCode,
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
      officeMapUrl,
    mapEmbedUrl: officeMapEmbedUrl,
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
