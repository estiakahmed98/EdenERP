import {
  CommunityPage,
  communityMetadata,
} from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("home");
}

export default function Page() {
  return <CommunityPage slug="home" />;
}
