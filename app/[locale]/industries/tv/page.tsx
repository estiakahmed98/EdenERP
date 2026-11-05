import {
  OtherIndustryPage,
  otherIndustryMetadata,
} from "@/components/industries/others/page";

export const generateMetadata = () => otherIndustryMetadata("tv");

export default function OtherIndustryLanding() {
  return <OtherIndustryPage slug="tv" />;
}
