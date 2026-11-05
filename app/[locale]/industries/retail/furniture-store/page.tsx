import FurnitureStoreLanding from "@/components/landing/Industries/retail/furniture-store/FurnitureStoreLanding";
import { retailMetadata } from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("furniture-store");
}

export default function FurnitureStorePage() {
  return <FurnitureStoreLanding />;
}
