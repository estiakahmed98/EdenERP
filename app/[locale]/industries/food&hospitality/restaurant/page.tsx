import RestaurantLanding from "@/components/landing/Industries/Food & Hospitality/Restaurant/RestaurentLanding";
import { hospitalityMetadata } from "@/components/industries/hospitality/page";

export function generateMetadata() {
  return hospitalityMetadata("restaurant");
}

export default function RestaurantPage() {
  return <RestaurantLanding />;
}
