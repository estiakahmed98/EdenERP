import {
  ApparelIndustryPage,
  apparelMetadata,
} from "@/components/industries/apparel/page";

export function generateMetadata() {
  return apparelMetadata("garments");
}

export default function IndustriesGarmentsPage() {
  return <ApparelIndustryPage slug="garments" />;
}
