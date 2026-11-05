import BecomeAPartnerPage from "./BecomeAPartnerPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("become-a-partner");
}

export default function Page() {
  return <BecomeAPartnerPage />;
}
