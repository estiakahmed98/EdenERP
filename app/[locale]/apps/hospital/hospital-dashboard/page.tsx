import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("hospital-dashboard");

export default function Page() {
  return <HospitalPage slug="hospital-dashboard" />;
}
