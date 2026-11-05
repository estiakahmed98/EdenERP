import AuditCertificationLanding from "@/components/landing/Industries/consulting/audit-certification/AuditCertificationLanding";
import { professionalMetadata } from "@/components/industries/professional/page";

export function generateMetadata() {
  return professionalMetadata("audit-certification");
}

export default function AuditCertificationPage() {
  return <AuditCertificationLanding />;
}
