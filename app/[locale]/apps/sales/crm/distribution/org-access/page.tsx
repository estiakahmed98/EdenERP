/**
 * Adon ERP public site: /apps/sales/crm/distribution/org-access
 * Copy lives in messages/*.json under pages.accountingShowcase.crOrgPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { KeyRound, Lock, Network, Users } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: the sales territory tree as [depth, name, head]. */
const tree: [number, string, string][] = [
  [0, "National sales", "Mahmud Hossain"],
  [1, "Dhaka North region", "Ashraful"],
  [2, "Uttara area", "Rasel mia"],
  [3, "Uttara–Tongi beat", "Pranto"],
  [3, "Airport Road beat", "Hasnat"],
  [2, "Gazipur area", "Riad"],
  [1, "Chattogram region", "Tanvir Hasan"],
];
const roles = ["roleRep", "roleManager", "roleHead"];
const rights = ["rOwn", "rTeam", "rPrices", "rDiscount", "rApprove"];
const matrix = ["ynnnn", "yyyyn", "yyyyy"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crOrgPage", "/apps/sales/crm/distribution/org-access");
}

export default function OrgAccessPage() {
  return (
    <HrPage
      section="crOrgPage"
      path="/apps/sales/crm/distribution/org-access"
      prefix="org"
      appName="Org & Access"
      tool="crOrg"
      group="crDistributionG"
      features={[
        "A sales tree: national, region, area and beat",
        "A head at each level who sees everyone below",
        "Reps see their own accounts, managers see their team",
        "Rights for prices, discounts and approvals by role",
        "Accounts moved with their history when territories change",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "hrDepartments"] },
        { key: "after", tools: ["crField", "crDealers", "crTargets"] },
        { key: "shows", tools: ["crScorecard"] },
      ]}
      icons={[Network, Users, KeyRound, Lock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-6" title={ui.treeTitle}>
            <ul className="space-y-1">
              {tree.map(([depth, name, head], i) => (
                <li key={name} className="flex items-center gap-2 rounded-md py-1 pe-2 text-[11px]" style={{ paddingInlineStart: `${depth * 16}px` }}>
                  <span className="text-[9px] text-muted-foreground" aria-hidden="true">
                    {depth === 3 ? "•" : "▾"}
                  </span>
                  <span className={`min-w-0 flex-1 truncate ${depth === 0 ? "font-semibold" : ""} text-foreground`}>{name}</span>
                  <Avatar name={head} size={18} tone={i} />
                  <span className="w-20 truncate text-[10px] text-muted-foreground">{head}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-6" title={ui.rightsTitle}>
            <div className="grid grid-cols-[6.5rem_repeat(3,1fr)] gap-1 text-[10px]">
              <span />
              {roles.map((r) => (
                <span key={r} className="text-center font-semibold text-muted-foreground">
                  {ui[r]}
                </span>
              ))}
              {rights.map((r, ri) => (
                <div key={r} className="contents">
                  <span className="self-center text-foreground">{ui[r]}</span>
                  {roles.map((_, ci) => {
                    const y = matrix[ci][ri] === "y";
                    return (
                      <span key={ci} className={`grid h-6 place-items-center rounded ${y ? "bg-[var(--teal)]/15 text-[var(--teal)]" : "bg-[var(--gray-bg)] text-muted-foreground"}`}>
                        {y ? <Chip tone="teal">{ui.yes}</Chip> : "—"}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    />
  );
}
