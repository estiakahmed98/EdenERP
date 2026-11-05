import HotelLanding from "@/components/landing/Industries/Food & Hospitality/hotel/HotelLanding";
import { hospitalityMetadata } from "@/components/industries/hospitality/page";

export function generateMetadata() {
  return hospitalityMetadata("hotel");
}

export default function HotelPage() {
  return <HotelLanding />;
}
