import LandingPage from "@/components/landing/LandingPage";
import { isLocale } from "@/i18n/config";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return <LandingPage locale={safeLocale as "en" | "bn"} />;
}

