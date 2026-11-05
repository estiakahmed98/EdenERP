import FastFoodLanding from "@/components/landing/Industries/Food & Hospitality/fast-food/FastFoodLanding";
import { hospitalityMetadata } from "@/components/industries/hospitality/page";

export function generateMetadata() {
  return hospitalityMetadata("fast-food");
}

export default function FastFoodPage() {
  return <FastFoodLanding />;
}
