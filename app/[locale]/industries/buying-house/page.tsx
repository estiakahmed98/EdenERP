import {
  ApparelIndustryPage,
  apparelMetadata,
} from "@/components/industries/apparel/page";

export function generateMetadata() {
  return apparelMetadata("buying-house");
}

export default function IndustriesBuyingHousePage() {
  return <ApparelIndustryPage slug="buying-house" />;
}
