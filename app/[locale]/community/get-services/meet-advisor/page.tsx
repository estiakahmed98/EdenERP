import AppointmentPage from "@/components/landing/community/get services/meet-an-advisor/AppointmentPage";
import { communityMetadata } from "@/components/community/redesign/page";

export function generateMetadata() {
  return communityMetadata("meet-advisor");
}

export default function Page() {
  return <AppointmentPage />;
}
