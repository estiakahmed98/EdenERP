import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("blood-bank");

export default function Page() {
  return <HospitalPage slug="blood-bank" />;
}
