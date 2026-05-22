import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";

import { siteConfig } from "@/lib/site";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Adon ERP - Transform Your Business",
    template: "%s | Adon ERP",
  },

  description: siteConfig.description,

  keywords: [
    "ERP",
    "Business Software",
    "Inventory Management",
    "CRM",
    "Accounting",
    "POS",
    "Manufacturing",
    "HRM",
    "Adon ERP",
  ],

  applicationName: siteConfig.name,

  alternates: {
    canonical: "/",
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

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,

    title: "Adon ERP - Transform Your Business",

    description: siteConfig.description,

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adon ERP",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Adon ERP - Transform Your Business",

    description: siteConfig.description,

    creator: siteConfig.twitterHandle,

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: "/apple-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: siteConfig.name,

  url: siteConfig.url,

  logo: `${siteConfig.url}/icon.svg`,

  description: siteConfig.description,

  sameAs: [
    "https://facebook.com",
    "https://linkedin.com",
    "https://twitter.com",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: siteConfig.name,

  url: siteConfig.url,

  description: siteConfig.description,

  potentialAction: {
    "@type": "SearchAction",

    target: `${siteConfig.url}/search?q={search_term_string}`,

    "query-input": "required name=search_term_string",
  },
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
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {children}

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
