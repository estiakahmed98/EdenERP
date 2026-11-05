import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const generateMetadata = () => qualityMetadata("spc");

export default function QualitySubpage() {
  return <QualityPage slug="spc" />;
}
