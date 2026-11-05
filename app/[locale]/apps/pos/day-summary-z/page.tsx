import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("day-summary-z");

export default function PosSubpage() {
  return <PosPage slug="day-summary-z" />;
}
