import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("operating-theatre");

export default function Page() {
  return <HospitalPage slug="operating-theatre" />;
}
