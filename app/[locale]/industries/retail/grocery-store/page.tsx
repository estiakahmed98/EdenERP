import GroceryStoreLanding from "@/components/landing/Industries/retail/grocery-store/GroceryStoreLanding";
import { retailMetadata } from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("grocery-store");
}

export default function GroceryStorePage() {
  return <GroceryStoreLanding />;
}
