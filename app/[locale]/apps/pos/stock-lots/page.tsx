import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("stock-lots");

export default function PosSubpage() {
  return <PosPage slug="stock-lots" />;
}
