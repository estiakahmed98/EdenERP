import EventsPage from "./EventsPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("events");
}

export default function Page() {
  return <EventsPage />;
}
