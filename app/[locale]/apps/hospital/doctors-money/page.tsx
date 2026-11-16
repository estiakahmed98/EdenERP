import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("doctors-money");

export default function Page() {
  return <HospitalPage slug="doctors-money" />;
}
