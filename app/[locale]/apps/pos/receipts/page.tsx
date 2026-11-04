import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("receipts");

export default function PosSubpage() {
  return <PosPage slug="receipts" />;
}
