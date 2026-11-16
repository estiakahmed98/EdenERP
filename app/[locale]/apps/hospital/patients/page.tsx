import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("patients");

export default function Page() {
  return <HospitalPage slug="patients" />;
}
