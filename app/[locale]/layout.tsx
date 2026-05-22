import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { isLocale, locales } from "@/i18n/config";

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

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
