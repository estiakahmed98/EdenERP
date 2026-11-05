import {
  ManufacturingIndustryPage,
  manufacturingIndustryMetadata,
} from "@/components/industries/manufacturing/page";

export const generateMetadata = () => manufacturingIndustryMetadata("steel");

export default function ManufacturingIndustryLanding() {
  return <ManufacturingIndustryPage slug="steel" />;
}
