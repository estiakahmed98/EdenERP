import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const generateMetadata = () => qualityMetadata("quality-dashboard");

export default function QualitySubpage() {
  return <QualityPage slug="quality-dashboard" />;
}
