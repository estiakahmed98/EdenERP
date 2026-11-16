import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("billing");

export default function Page() {
  return <HospitalPage slug="billing" />;
}
