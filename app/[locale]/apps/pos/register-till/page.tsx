import { PosPage, posMetadata } from "@/components/pos/page";

export const metadata = posMetadata("register-till");

export default function PosSubpage() {
  return <PosPage slug="register-till" />;
}
