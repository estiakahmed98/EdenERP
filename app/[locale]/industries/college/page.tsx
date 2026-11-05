import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const generateMetadata = () => educationIndustryMetadata("college");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="college" />;
}
