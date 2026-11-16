import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("opd-serials");

export default function Page() {
  return <HospitalPage slug="opd-serials" />;
}
