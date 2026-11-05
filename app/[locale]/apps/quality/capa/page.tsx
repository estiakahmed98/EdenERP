import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const generateMetadata = () => qualityMetadata("capa");

export default function QualitySubpage() {
  return <QualityPage slug="capa" />;
}
