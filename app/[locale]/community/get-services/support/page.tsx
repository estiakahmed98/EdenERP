import SupportPage from "@/components/landing/community/get services/support/SupportPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("support");
}

export default function Page() {
  return <SupportPage />;
}
