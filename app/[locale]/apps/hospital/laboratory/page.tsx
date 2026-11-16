import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("laboratory");

export default function Page() {
  return <HospitalPage slug="laboratory" />;
}
