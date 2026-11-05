import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import LocaleDocument from "@/components/locale-document";
import Header from "@/components/header";
import FloatingActions from "@/components/floating-actions";
import AnalyticsTracker from "@/components/admin/AnalyticsTracker";
import AuthSessionProvider from "@/lib/session-provider";
import DemoBookingProvider from "@/components/demo-booking/provider";
import { isLocale, locales } from "@/i18n/config";
import { getPricingSiteConfig } from "@/lib/pricing/service";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const ogLocales: Record<string, string> = {
  en: "en_US",
  bn: "bn_BD",
  zh: "zh_CN",
  tr: "tr_TR",
  ar: "ar_AR",
  ja: "ja_JP",
  ne: "ne_NP",
  vi: "vi_VN",
};

/**
 * Default canonical + hreflang for every localized page. Pages that define
 * their own `alternates` override this.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const pathname = (await headers()).get("x-pathname") ?? `/${locale}`;
  const rest =
    pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "").replace(/\/+$/, "") ||
    "";

  return {
    alternates: {
      canonical: `/${locale}${rest}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${rest}`])),
        "x-default": `/${routing.defaultLocale}${rest}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: `/${locale}${rest}`,
      locale: ogLocales[locale] ?? siteConfig.locale,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale = await getLocale();
  const messages = await getMessages();
  const pricingConfig = await getPricingSiteConfig();

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages}>
      <LocaleDocument />
      <AuthSessionProvider>
        <DemoBookingProvider>
          <AnalyticsTracker />
          <Header showPricing={pricingConfig.pricingPageEnabled} />
          {children}
          <Footer showPricing={pricingConfig.pricingPageEnabled} />
          <FloatingActions />
        </DemoBookingProvider>
      </AuthSessionProvider>
    </NextIntlClientProvider>
  );
}
