import {
  MedicalCollegePage,
  collegeMetadata,
} from "@/components/medical-college/page";

export function generateMetadata() {
  return collegeMetadata("cards-items");
}
export default function Page() {
  return <MedicalCollegePage slug="cards-items" />;
}
