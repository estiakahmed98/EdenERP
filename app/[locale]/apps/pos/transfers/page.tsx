import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("transfers");

export default function PosSubpage() {
  return <PosPage slug="transfers" />;
}
