import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("stock-lots");

export default function PosSubpage() {
  return <PosPage slug="stock-lots" />;
}
