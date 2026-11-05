import {
  CommunityPage,
  communityMetadata,
} from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("tutorials");
}

export default function Page() {
  return <CommunityPage slug="tutorials" />;
}
