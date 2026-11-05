import TalentAcquisitionLanding from "@/components/landing/Industries/consulting/talent-acquisition/TalentAcquisitionLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("talent-acquisition");
}

export default function TalentAcquisitionPage() {
  return <TalentAcquisitionLanding />;
}
