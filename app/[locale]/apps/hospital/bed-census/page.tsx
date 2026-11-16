import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("bed-census");

export default function Page() {
  return <HospitalPage slug="bed-census" />;
}
