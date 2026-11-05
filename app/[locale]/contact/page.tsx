// app/[locale]/contact/page.tsx

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getLocaleAlternates } from "@/i18n/metadata";
import ContactClient from "./ContactClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  const title = t("metadata.title");

  return {
    // Skip the "| Adon ERP" template when the brand is already in the title.
    title: title.includes("Adon ERP") ? { absolute: title } : title,
    description: t("metadata.description"),
    alternates: await getLocaleAlternates("/contact"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactClient />;
}
