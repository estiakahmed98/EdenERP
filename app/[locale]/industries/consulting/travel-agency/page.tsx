import {
  ProfessionalIndustryPage,
  professionalMetadata,
} from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("travel-agency");
}

export default function IndustriesTravelAgencyPage() {
  return <ProfessionalIndustryPage slug="travel-agency" />;
}
