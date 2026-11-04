import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const metadata = educationIndustryMetadata("school");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="school" />;
}
