import {
  ManufacturingIndustryPage,
  manufacturingIndustryMetadata,
} from "@/components/industries/manufacturing/page";

export const metadata = manufacturingIndustryMetadata("agro-rice");

export default function ManufacturingIndustryLanding() {
  return <ManufacturingIndustryPage slug="agro-rice" />;
}
