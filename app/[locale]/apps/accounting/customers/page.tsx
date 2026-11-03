/**
 * Adon ERP public site: /[locale]/apps/accounting/customers
 * Copy lives in messages/*.json under pages.accountingShowcase.customers.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner or accountant who bills customers
 * The question:   "Where do I keep my customers so invoices and receipts find them?"
 */
import type { Metadata } from "next";
import { FileText, Receipt, Truck, Users } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  mono,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const customers = [
  { name: "Padma Knitwear Ltd.", ref: "7e0f13b2-d389-4e24-aa56-b2764fbb3f70" },
  { name: "Jamuna Apparel", ref: "dc483500-56b8-4538-adb8-3d2dab786114" },
  { name: "Karnaphuli Fashion", ref: "6ef3d214-73f2-450a-b806-4e08c16ddca4" },
  { name: "Surma Textile Limited", ref: "a4df9542-65c5-4c1c-9b2c-374807506001" },
  { name: "Rupsha Sweater Ltd", ref: "5ee173a5-fa55-424e-be53-650673932e61" },
  { name: "Teesta International", ref: "8f097d26-a443-432f-b7d1-b40f00a87601" },
  { name: "Bhairab Active Wear", ref: "ab12c226-1f81-4099-9fe9-49ec3fe6d884" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("customers", "customers");
}

export default function CustomersPage() {
  const content = useTemplateContent("customers");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thName },
    { head: ui.thRef, className: "hidden sm:table-cell" },
    { head: ui.thActive },
    { head: "", align: "end" },
  ];
  const rows = customers.map((r) => [
    <span key="n" className="block truncate font-medium">{r.name}</span>,
    <span key="r" className={`${mono} block max-w-[11rem] truncate`}>{r.ref}</span>,
    <Pill key="a" tone="teal">{ui.yes}</Pill>,
    <span key="b" className="inline-flex gap-1">
      <Btn>{common("edit")}</Btn>
      <Btn>{common("deactivate")}</Btn>
    </span>,
  ]);

  return (
    <TemplatePage
      slug="customers"
      prefix="cu"
      appName="Customers"
      features={[
        "One customer list shared by invoices, receipts and delivery challans",
        "Customer name with an optional description",
        "Reference ID on every customer",
        "Deactivate customers you no longer sell to, without losing history",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "chartOfAccounts"] },
        { key: "after", tools: ["invoicesAr", "receipts", "deliveryChallans"] },
        { key: "shows", tools: ["ledgers", "accountingHub", "financialReports"] },
      ]}
      localIcons={[Users, FileText, Receipt, Truck]}
      preview={
        <TemplatePreview
          prefix="cu"
          toolKey="customers"
          content={content}
          newLabel={ui.newCustomer}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field wide label={ui.fName} value="e.g. Acme Corp" />
              <Field wide label={ui.fDescription} value={ui.optional} />
            </>
          }
        />
      }
    />
  );
}
