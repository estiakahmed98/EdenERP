/**
 * Adon ERP public site: /apps/sales/crm/pipeline/contacts
 * Copy lives in messages/*.json under pages.accountingShowcase.crContactsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Building2, Contact, MessageCircle, Phone } from "lucide-react";

import { Avatar, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [name, title, company, last touch, role key, tone]. */
const people: [string, string, string, string, string, HrTone][] = [
  ["Najim Uddin", "Head of Merchandising", "ADS Apparel Limited", "2 days ago", "rDecider", "primary"],
  ["Md Asraf", "Purchase Manager", "KLD Apparels Ltd.", "Today", "rBuyer", "teal"],
  ["Shirin Akter", "Accounts Payable", "Babylon Group", "1 week ago", "rPayer", "brown"],
  ["Rahman Kabir", "Production Head", "Nelima Fashion Ltd", "3 days ago", "rUser", "sky"],
  ["Tahmina Haque", "Compliance Lead", "Viyellatex Group", "Yesterday", "rInfluencer", "navy"],
  ["Imran Hossain", "Owner", "Mahadi International", "2 weeks ago", "rDecider", "primary"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crContactsPage", "/apps/sales/crm/pipeline/contacts");
}

export default function ContactsPage() {
  return (
    <HrPage
      section="crContactsPage"
      path="/apps/sales/crm/pipeline/contacts"
      prefix="cont"
      appName="Contacts"
      tool="crContacts"
      group="crPipelineG"
      features={[
        "People at every customer, with title, phone and email",
        "Each contact's role in the buying decision",
        "The last call, visit or email, and who made it",
        "Several contacts under one account",
        "WhatsApp and phone one tap away",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crLeads", "crCapture"] },
        { key: "after", tools: ["crDeals", "crTasks", "crVisits"] },
        { key: "shows", tools: ["cr360", "crRelationships"] },
      ]}
      icons={[Contact, Building2, Phone, MessageCircle]}
      render={(ui) => (
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {people.map(([name, title, co, last, role, tone], i) => (
            <div key={name} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-start gap-2.5">
                <Avatar name={name} size={32} tone={i} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-foreground">{name}</p>
                  <p className="truncate text-[10.5px] text-muted-foreground">{title}</p>
                </div>
                <Chip tone={tone}>{ui[role]}</Chip>
              </div>
              <p className="mt-2.5 truncate text-[11px] text-foreground">{co}</p>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[10px] text-muted-foreground">
                <span>
                  {ui.lastTouch}: {last}
                </span>
                <span className="flex gap-1" aria-hidden="true">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <MessageCircle className="h-3.5 w-3.5 text-[var(--teal)]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
}
