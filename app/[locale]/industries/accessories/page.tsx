import {
  ApparelIndustryPage,
  apparelMetadata,
} from "@/components/industries/apparel/page";

export function generateMetadata() {
  return apparelMetadata("accessories");
}

export default function IndustriesAccessoriesPage() {
  return <ApparelIndustryPage slug="accessories" />;
}
