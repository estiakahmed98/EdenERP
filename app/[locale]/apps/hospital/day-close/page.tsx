import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("day-close");

export default function Page() {
  return <HospitalPage slug="day-close" />;
}
