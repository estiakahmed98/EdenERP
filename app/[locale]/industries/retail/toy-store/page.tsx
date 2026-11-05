import ToyStoreLanding from "@/components/landing/Industries/retail/toy-store/ToyStoreLanding";
import { retailMetadata } from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("toy-store");
}

export default function ToyStorePage() {
  return <ToyStoreLanding />;
}
