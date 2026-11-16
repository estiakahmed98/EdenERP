import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("imaging");

export default function Page() {
  return <HospitalPage slug="imaging" />;
}
