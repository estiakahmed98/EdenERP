/**
 * Adon ERP public site: /apps/sales/crm/pipeline/leads
 * Copy lives in messages/*.json under pages.accountingShowcase.crLeadsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Filter, Magnet, Sparkles, UserPlus } from "lucide-react";

import { Avatar, Bar, Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [company, contact, source key, score, owner, tone]. */
const leads: [string, string, string, number, string, HrTone][] = [
  ["Beximco Apparels", "Head of Sourcing", "srcExpo", 86, "Ashraful", "teal"],
  ["Mahadi International", "Merchandiser", "srcWeb", 64, "Pranto", "primary"],
  ["Trust Apparel Sourcing", "Owner", "srcReferral", 52, "Rasel", "primary"],
  ["KLD Apparels Ltd.", "Purchase Manager", "srcCall", 38, "Hasnat", "muted"],
  ["Long Term Acuty Ltd", "Director", "srcWeb", 21, "Riad", "muted"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crLeadsPage", "/apps/sales/crm/pipeline/leads");
}

export default function LeadsPage() {
  return (
    <HrPage
      section="crLeadsPage"
      path="/apps/sales/crm/pipeline/leads"
      prefix="lead"
      appName="Leads"
      tool="crLeads"
      group="crPipelineG"
      features={[
        "Leads from the website, trade fairs, calls and referrals",
        "A score from fit and activity, so the best are called first",
        "An owner for every lead, assigned by territory or by hand",
        "Duplicates caught against existing accounts and contacts",
        "A lead converted to a contact, an account and a deal in one step",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crCapture", "crSequences"] },
        { key: "after", tools: ["crContacts", "crDeals"] },
        { key: "shows", tools: ["crPipeline", "crDashboard"] },
      ]}
      icons={[Magnet, Sparkles, UserPlus, Filter]}
      render={(ui) => (
        <Card title={ui.listTitle} right={<Chip tone="primary">{ui.newLead}</Chip>}>
          <ul className="divide-y divide-border">
            {leads.map(([co, who, src, score, owner, tone], i) => (
              <li key={co} className="grid items-center gap-3 py-2 text-[11px] sm:grid-cols-[1fr_6rem_8rem_6rem]">
                <span className="min-w-0">
                  <span className="block truncate font-medium text-foreground">{co}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">{who}</span>
                </span>
                <Chip tone="navy">{ui[src]}</Chip>
                <span className="flex items-center gap-2">
                  <Bar pct={score} tone={tone} />
                  <span className="w-6 text-end font-semibold tabular-nums text-foreground">{score}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                  <Avatar name={owner} size={20} tone={i} /> {owner}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.scoreNote}</p>
        </Card>
      )}
    />
  );
}
