import ConstructionLanding from "@/components/landing/Industries/realestate/construction/ConstructionLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("construction");
}

export default function ConstructionPage() {
  return <ConstructionLanding />;
}
