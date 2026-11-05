import {
  OtherIndustryPage,
  otherIndustryMetadata,
} from "@/components/industries/others/page";

export const generateMetadata = () => otherIndustryMetadata("ngo");

export default function OtherIndustryLanding() {
  return <OtherIndustryPage slug="ngo" />;
}
