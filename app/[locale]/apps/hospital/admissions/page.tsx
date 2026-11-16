import { HospitalPage, hospitalMetadata } from "@/components/hospital/page";

export const generateMetadata = () => hospitalMetadata("admissions");

export default function Page() {
  return <HospitalPage slug="admissions" />;
}
