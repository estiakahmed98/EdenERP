import TextileManufacturingLanding from "@/components/landing/Industries/manufacturing/textile/TextileManufacturingLanding";
import { industrialMetadata } from "@/components/industries/industrial/page";

export function generateMetadata() {
  return industrialMetadata("textile");
}

export default function TextileManufacturingPage() {
  return <TextileManufacturingLanding />;
}
