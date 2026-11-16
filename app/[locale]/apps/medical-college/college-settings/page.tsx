import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("college-settings");
}
export default function Page() {
  return <MedicalCollegePage slug="college-settings" />;
}
