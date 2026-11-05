import {
  EducationIndustryPage,
  educationIndustryMetadata,
} from "@/components/education/industry/page";

export const generateMetadata = () => educationIndustryMetadata("lms");

export default function EducationIndustryLanding() {
  return <EducationIndustryPage industry="lms" />;
}
