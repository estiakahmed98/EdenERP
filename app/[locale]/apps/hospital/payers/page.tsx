import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("payers");

export default function Page() {
  return <HospitalPage slug="payers" />;
}
