import { PosPage, posMetadata } from "@/components/pos/page";

export const generateMetadata = () => posMetadata("register-till");

export default function PosSubpage() {
  return <PosPage slug="register-till" />;
}
