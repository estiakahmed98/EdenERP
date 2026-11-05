import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const generateMetadata = () => qualityMetadata("non-conformance");

export default function QualitySubpage() {
  return <QualityPage slug="non-conformance" />;
}
