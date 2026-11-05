import TranslationsPage from "./TranslationsPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("translations");
}

export default function Page() {
  return <TranslationsPage />;
}
