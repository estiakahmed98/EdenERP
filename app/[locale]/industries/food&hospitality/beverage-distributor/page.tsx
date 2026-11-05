import BeverageDistributorLanding from "@/components/landing/Industries/Food & Hospitality/beverage-distributor/BeverageDistributorLanding";
import { hospitalityMetadata } from "@/components/industries/hospitality/page";

export function generateMetadata() {
  return hospitalityMetadata("beverage-distributor");
}

export default function BeverageDistributorPage() {
  return <BeverageDistributorLanding />;
}
