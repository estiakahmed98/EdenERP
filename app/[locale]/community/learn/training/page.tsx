import {
  CommunityPage,
  communityMetadata,
} from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("training");
}

export default function Page() {
  return <CommunityPage slug="training" />;
}
