import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("indicators");

export default function Page() {
  return <HospitalPage slug="indicators" />;
}
