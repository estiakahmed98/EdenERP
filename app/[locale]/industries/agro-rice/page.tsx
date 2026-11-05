import {
  ManufacturingIndustryPage,
  manufacturingIndustryMetadata,
} from "@/components/industries/manufacturing/page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.industries");

  return {
    title: t("links.agroRice"),
    alternates: await getLocaleAlternates("/industries/agro-rice"),
  };
}

export default function ManufacturingIndustryLanding() {
  return <ManufacturingIndustryPage slug="agro-rice" />;
}
