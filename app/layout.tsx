import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Adon ERP - Transform Your Business",
    template: "%s | Adon ERP",
  },
  description: siteConfig.description,
  generator: "v0.app",
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
    siteName: siteConfig.name,
    title: "Adon ERP - Transform Your Business",
    description: siteConfig.description,
    url: "/",
    locale: siteConfig.locale,
    images: [{ url: "/icon.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adon ERP - Transform Your Business",
    description: siteConfig.description,
    images: ["/icon.svg"],
    creator: siteConfig.twitterHandle,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-background"
      suppressHydrationWarning={true}
      data-lt-installed="true"
    >
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
