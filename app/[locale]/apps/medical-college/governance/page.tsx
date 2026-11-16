import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("governance");
}
export default function Page() {
  return <MedicalCollegePage slug="governance" />;
}
