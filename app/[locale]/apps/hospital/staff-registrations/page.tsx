import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("staff-registrations");

export default function Page() {
  return <HospitalPage slug="staff-registrations" />;
}
