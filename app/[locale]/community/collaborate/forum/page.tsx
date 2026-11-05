import ForumPage from "./ForumPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("forum");
}

export default function Page() {
  return <ForumPage />;
}
