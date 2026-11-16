import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("interns");
}
export default function Page() {
  return <MedicalCollegePage slug="interns" />;
}
