import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("intake-admission");
}
export default function Page() {
  return <MedicalCollegePage slug="intake-admission" />;
}
