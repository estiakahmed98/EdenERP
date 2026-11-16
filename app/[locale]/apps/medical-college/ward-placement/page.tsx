import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("ward-placement");
}
export default function Page() {
  return <MedicalCollegePage slug="ward-placement" />;
}
