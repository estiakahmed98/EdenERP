import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("pharmacy");

export default function Page() {
  return <HospitalPage slug="pharmacy" />;
}
