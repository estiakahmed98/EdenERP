import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("transfers");

export default function PosSubpage() {
  return <PosPage slug="transfers" />;
}
