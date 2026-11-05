import {
  OtherIndustryPage,
  otherIndustryMetadata,
} from "@/components/industries/others/page";

export const metadata = otherIndustryMetadata("ecommerce");

export default function OtherIndustryLanding() {
  return <OtherIndustryPage slug="ecommerce" />;
}
