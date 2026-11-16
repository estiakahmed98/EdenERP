import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("hospital-departments");

export default function Page() {
  return <HospitalPage slug="hospital-departments" />;
}
