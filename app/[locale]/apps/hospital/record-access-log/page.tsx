import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("record-access-log");

export default function Page() {
  return <HospitalPage slug="record-access-log" />;
}
