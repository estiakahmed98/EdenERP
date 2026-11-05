import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("outlets-registers");

export default function PosSubpage() {
  return <PosPage slug="outlets-registers" />;
}
