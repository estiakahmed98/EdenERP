import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("postgraduate-trainees");
}
export default function Page() {
  return <MedicalCollegePage slug="postgraduate-trainees" />;
}
