import {
  CommunityPage,
  communityMetadata,
} from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("documentation");
}

export default function Page() {
  return <CommunityPage slug="documentation" />;
}
