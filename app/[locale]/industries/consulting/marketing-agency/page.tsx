import MarketingAgencyLanding from "@/components/landing/Industries/consulting/marketing-agency/MarketingAgencyLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("marketing-agency");
}

export default function MarketingAgencyPage() {
  return <MarketingAgencyLanding />;
}
