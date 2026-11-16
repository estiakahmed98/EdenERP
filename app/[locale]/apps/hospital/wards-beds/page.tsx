import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("wards-beds");

export default function Page() {
  return <HospitalPage slug="wards-beds" />;
}
