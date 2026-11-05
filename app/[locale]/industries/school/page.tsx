import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const generateMetadata = () => educationIndustryMetadata("school");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="school" />;
}
