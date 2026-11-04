import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const metadata = educationIndustryMetadata("lms");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="lms" />;
}
