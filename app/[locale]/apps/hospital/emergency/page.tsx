import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("emergency");

export default function Page() {
  return <HospitalPage slug="emergency" />;
}
