import CustomerStoriesPage from "./CustomerStoriesPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("customer-stories");
}

export default function Page() {
  return <CustomerStoriesPage />;
}
