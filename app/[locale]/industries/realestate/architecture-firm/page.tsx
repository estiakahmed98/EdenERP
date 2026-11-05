import ArchitectureFirmLanding from "@/components/landing/Industries/realestate/architecture-firm/ArchitectureFirmLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("architecture-firm");
}

export default function ArchitectureFirmPage() {
  return <ArchitectureFirmLanding />;
}
