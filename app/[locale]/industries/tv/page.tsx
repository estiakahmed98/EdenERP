import {
  OtherIndustryPage,
  otherIndustryMetadata,
} from "@/components/industries/others/page";

export const metadata = otherIndustryMetadata("tv");

export default function OtherIndustryLanding() {
  return <OtherIndustryPage slug="tv" />;
}
