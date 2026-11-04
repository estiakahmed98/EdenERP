import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const metadata = educationIndustryMetadata("university");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="university" />;
}
