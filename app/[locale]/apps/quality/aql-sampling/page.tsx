import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const generateMetadata = () => qualityMetadata("aql-sampling");

export default function QualitySubpage() {
  return <QualityPage slug="aql-sampling" />;
}
