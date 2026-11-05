import {
  OtherIndustryPage,
  otherIndustryMetadata,
} from "@/components/industries/others/page";

export const generateMetadata = () => otherIndustryMetadata("ecommerce");

export default function OtherIndustryLanding() {
  return <OtherIndustryPage slug="ecommerce" />;
}
