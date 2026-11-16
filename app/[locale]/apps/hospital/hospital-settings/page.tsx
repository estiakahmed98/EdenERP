import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("hospital-settings");

export default function Page() {
  return <HospitalPage slug="hospital-settings" />;
}
