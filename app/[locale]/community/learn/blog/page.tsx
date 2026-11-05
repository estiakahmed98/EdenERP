import BlogPage from "@/components/landing/community/learn/blog/BlogPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("blog");
}

export default function Page() {
  return <BlogPage />;
}
