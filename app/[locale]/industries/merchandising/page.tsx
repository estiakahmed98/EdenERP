import {
  ApparelIndustryPage,
  apparelMetadata,
} from "@/components/industries/apparel/page";

export function generateMetadata() {
  return apparelMetadata("merchandising");
}

export default function IndustriesMerchandisingPage() {
  return <ApparelIndustryPage slug="merchandising" />;
}
