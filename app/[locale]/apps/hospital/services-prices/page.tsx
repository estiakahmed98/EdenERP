import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("services-prices");

export default function Page() {
  return <HospitalPage slug="services-prices" />;
}
