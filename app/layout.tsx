import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Plus_Jakarta_Sans,
  Rubik,
  Tiro_Bangla,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";

import GoogleAnalytics from "@/components/google-analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

// Landing page body font (was a render-blocking @import from fonts.googleapis.com)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap", // used by the hero H1 (LCP) — keep preloaded
});

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-tiro-bangla",
  preload: false, // only used on Bengali pages
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: "%s | Adon ERP",
  },

  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },

  // Local SEO geo signals (Dhaka, Bangladesh)
  other: {
    "geo.region": "BD-13",
    "geo.placename": "Dhaka",
    ...(siteConfig.business.geo
      ? {
          "geo.position": `${siteConfig.business.geo.latitude};${siteConfig.business.geo.longitude}`,
          ICBM: `${siteConfig.business.geo.latitude}, ${siteConfig.business.geo.longitude}`,
        }
      : {}),
  },

  verification: {
    google: siteConfig.googleVerification || undefined,
    other: siteConfig.bingVerification
      ? { "msvalidate.01": siteConfig.bingVerification }
      : undefined,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // og:image / twitter:image are provided by app/opengraph-image.tsx
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },

  icons: {
    // SVG favicon first (crisp at any size); PNG/ICO fallbacks are rendered
    // from the same public/icon.svg so every browser shows the same icon.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

const { business } = siteConfig;

const postalAddress = {
  "@type": "PostalAddress",
  ...business.address,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: business.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/adon_erp_logo.png`,
  description: siteConfig.description,
  email: business.salesEmail,
  telephone: business.phone,
  address: postalAddress,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: business.phone,
      email: business.salesEmail,
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: business.phone,
      email: business.supportEmail,
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
  ],
  ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
};

/** Local SEO: makes the Dhaka office eligible for Google local / Maps results. */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  url: `${siteConfig.url}/en/contact`,
  image: `${siteConfig.url}/adon_erp_logo.png`,
  logo: `${siteConfig.url}/adon_erp_logo.png`,
  description: siteConfig.description,
  telephone: business.phone,
  email: business.salesEmail,
  address: postalAddress,
  ...(business.geo
    ? { geo: { "@type": "GeoCoordinates", ...business.geo } }
    : {}),
  hasMap: business.mapUrl,
  openingHoursSpecification: business.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: business.areaServed.map((name) => ({
    "@type": name === "Bangladesh" ? "Country" : "City",
    name,
  })),
  parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: ["en", "bn", "zh", "tr", "ar", "ja", "ne", "vi"],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${jakarta.variable} ${rubik.variable} ${caveat.variable} ${tiroBangla.variable}`}
    >
      <body className="bg-background font-sans antialiased" suppressHydrationWarning>
        {[organizationSchema, localBusinessSchema, websiteSchema, softwareSchema].map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}

        <GoogleAnalytics />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "green", "ocean"]}
        >
          {children}
        </ThemeProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
