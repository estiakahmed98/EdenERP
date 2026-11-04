import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("outlet-stock");

export default function PosSubpage() {
  return <PosPage slug="outlet-stock" />;
}
