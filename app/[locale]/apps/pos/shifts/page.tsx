import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("shifts");

export default function PosSubpage() {
  return <PosPage slug="shifts" />;
}
