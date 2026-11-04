import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("loyalty-vouchers");

export default function PosSubpage() {
  return <PosPage slug="loyalty-vouchers" />;
}
