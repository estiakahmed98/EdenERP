import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";
import AnalyticsTracker from "@/components/admin/AnalyticsTracker";
import { isLocale, locales } from "@/i18n/config";
import { getPricingSiteConfig } from "@/lib/pricing/service";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
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
      <AnalyticsTracker />
      <Header showPricing={pricingConfig.pricingPageEnabled} />
      {children}
      <Footer showPricing={pricingConfig.pricingPageEnabled} />
    </NextIntlClientProvider>
  );
}
