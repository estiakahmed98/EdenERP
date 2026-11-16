import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("consultations");

export default function Page() {
  return <HospitalPage slug="consultations" />;
}
