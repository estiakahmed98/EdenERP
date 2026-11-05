import CustomFurnitureProductionLanding from "@/components/landing/Industries/manufacturing/furniture/CustomFurnitureProductionLanding";
import { industrialMetadata } from "@/components/industries/industrial/page";

export function generateMetadata() {
  return industrialMetadata("furniture");
}

export default function CustomFurnitureProductionPage() {
  return <CustomFurnitureProductionLanding />;
}
