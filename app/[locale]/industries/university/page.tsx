import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const generateMetadata = () => educationIndustryMetadata("university");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="university" />;
}
