import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("outlet-dashboard");

export default function PosSubpage() {
  return <PosPage slug="outlet-dashboard" />;
}
