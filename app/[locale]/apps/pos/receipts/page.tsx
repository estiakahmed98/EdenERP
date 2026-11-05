import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("receipts");

export default function PosSubpage() {
  return <PosPage slug="receipts" />;
}
