import HardwareStoreLanding from "@/components/landing/Industries/retail/hardware-store/HardwareStoreLanding";
import { retailMetadata } from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("hardware-store");
}

export default function HardwareStorePage() {
  return <HardwareStoreLanding />;
}
