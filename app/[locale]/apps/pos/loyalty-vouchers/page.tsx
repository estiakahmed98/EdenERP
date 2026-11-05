import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("loyalty-vouchers");

export default function PosSubpage() {
  return <PosPage slug="loyalty-vouchers" />;
}
