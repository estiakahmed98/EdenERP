import GuestHouseLanding from "@/components/landing/Industries/Food & Hospitality/guest-house/GuestHouseLanding";
import { hospitalityMetadata } from "@/components/industries/hospitality/page";

export function generateMetadata() {
  return hospitalityMetadata("guest-house");
}

export default function GuestHousePage() {
  return <GuestHouseLanding />;
}
