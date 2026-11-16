import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("doctors-sittings");

export default function Page() {
  return <HospitalPage slug="doctors-sittings" />;
}
