import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("professional-exams");
}
export default function Page() {
  return <MedicalCollegePage slug="professional-exams" />;
}
