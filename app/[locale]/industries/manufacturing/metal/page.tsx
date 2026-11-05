import MetalFabricationLanding from "@/components/landing/Industries/manufacturing/metal/MetalFabricationLanding";
import { industrialMetadata } from "@/components/industries/industrial/page";

export function generateMetadata() {
  return industrialMetadata("metal");
}

export default function MetalFabricationPage() {
  return <MetalFabricationLanding />;
}
