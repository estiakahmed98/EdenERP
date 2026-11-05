import AccountingFirmLanding from "@/components/landing/Industries/consulting/accounting-firm/AccountingFirmLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("accounting-firm");
}

export default function AccountingFirmPage() {
  return <AccountingFirmLanding />;
}
