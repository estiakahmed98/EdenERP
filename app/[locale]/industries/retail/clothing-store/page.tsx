import ClothingStoreLanding from "@/components/landing/Industries/retail/clothing-store/ClothingStoreLanding";
import { retailMetadata } from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("clothing-store");
}

export default function ClothingStorePage() {
  return <ClothingStoreLanding />;
}
