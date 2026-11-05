import {
  ManufacturingIndustryPage,
  manufacturingIndustryMetadata,
} from "@/components/industries/manufacturing/page";

export const metadata = manufacturingIndustryMetadata("steel");

export default function ManufacturingIndustryLanding() {
  return <ManufacturingIndustryPage slug="steel" />;
}
