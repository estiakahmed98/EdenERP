import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const metadata = educationIndustryMetadata("college");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="college" />;
}
