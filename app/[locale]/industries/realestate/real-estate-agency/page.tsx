import RealEstateAgencyLanding from "@/components/landing/Industries/realestate/real-estate-agency/RealEstateAgencyLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("real-estate-agency");
}

export default function RealEstateAgencyPage() {
  return <RealEstateAgencyLanding />;
}
