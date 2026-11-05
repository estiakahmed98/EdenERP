import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("shifts");

export default function PosSubpage() {
  return <PosPage slug="shifts" />;
}
