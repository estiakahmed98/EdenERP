import { QualityPage, qualityMetadata } from "@/components/quality/page";

export const metadata = qualityMetadata("spc");

export default function QualitySubpage() {
  return <QualityPage slug="spc" />;
}
