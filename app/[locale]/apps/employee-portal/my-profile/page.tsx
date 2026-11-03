/**
 * Adon ERP public site: /apps/employee-portal/my-profile
 * Copy lives in messages/*.json under pages.accountingShowcase.epProfilePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { FileCheck2, Pencil, Phone, UserRound } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

const personal: [string, string][] = [
  ["fDob", "14 Aug 1994"],
  ["fNid", "•••• •••• 2231"],
  ["fBlood", "B+"],
  ["fPhone", "+880 17•• •••412"],
  ["fAddress", "Tongi, Gazipur"],
  ["fBank", "Dutch-Bangla Bank •••• 7781"],
];
const docs: [string, boolean][] = [
  ["dNid", true],
  ["dCert", true],
  ["dPhoto", true],
  ["dTin", false],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("epProfilePage", "/apps/employee-portal/my-profile");
}

export default function MyProfilePage() {
  return (
    <HrPage
      section="epProfilePage"
      path="/apps/employee-portal/my-profile"
      prefix="prof"
      appName="My Profile"
      tool="epProfile"
      group="portal"
      features={[
        "Personal, job and bank details in one place",
        "Changes sent to HR for approval, not saved straight away",
        "Emergency contacts and nominees",
        "Documents uploaded once and kept on file",
        "Works on a phone, in English or Bangla",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "hrServiceRecords"] },
        { key: "after", tools: ["hrApprovals"] },
        { key: "shows", tools: ["epPayslips", "epPf"] },
      ]}
      icons={[UserRound, Pencil, Phone, FileCheck2]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-4">
            <div className="h-14 bg-gradient-to-r from-primary to-[var(--secondary)]" aria-hidden="true" />
            <div className="-mt-7 flex flex-col items-center px-4 pb-4 text-center">
              <span className="rounded-full ring-4 ring-card">
                <Avatar name="Farhana Akter" size={54} tone={1} />
              </span>
              <p className="mt-2 text-[13px] font-semibold text-foreground">Farhana Akter</p>
              <p className="text-[10.5px] text-muted-foreground">HR Executive · EMP-0089</p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                <Chip tone="primary">HR & Admin</Chip>
                <Chip tone="navy">G3 · 2</Chip>
                <Chip tone="teal">{ui.confirmed}</Chip>
              </div>
              <dl className="mt-3 w-full space-y-1 text-start text-[10.5px]">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{ui.joined}</dt>
                  <dd className="text-foreground">01 Mar 2022</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{ui.manager}</dt>
                  <dd className="text-foreground">Shamima Akter</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="space-y-3 lg:col-span-8">
            <Card title={ui.personal} right={<Chip tone="primary">{ui.edit}</Chip>}>
              <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                {personal.map(([k, v]) => (
                  <div key={k} className="border-b border-dashed border-border pb-1.5">
                    <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{ui[k]}</dt>
                    <dd className="text-[11.5px] text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card title={ui.documents}>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {docs.map(([k, ok]) => (
                  <li key={k} className="flex items-center justify-between rounded-lg bg-[var(--gray-bg)] px-3 py-1.5 text-[11px] text-foreground">
                    {ui[k]}
                    <Chip tone={ok ? "teal" : "brown"}>{ok ? ui.onFile : ui.upload}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    />
  );
}
