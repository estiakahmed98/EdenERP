import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("outlet-stock");

export default function PosSubpage() {
  return <PosPage slug="outlet-stock" />;
}
