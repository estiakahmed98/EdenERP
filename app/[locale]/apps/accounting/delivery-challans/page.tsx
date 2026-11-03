/**
 * Adon ERP public site: /[locale]/apps/accounting/delivery-challans
 * Copy lives in messages/*.json under pages.accountingShowcase.deliveryChallans.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the store keeper and the dispatch clerk
 * The question:   "How do I print a numbered challan for every load that leaves the gate?"
 */
import type { Metadata } from "next";
import { ClipboardList, Hash, Package, Truck } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  SectionLabel,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  mono,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const challans = [
  { no: "DC-2026-000013", date: "9/5/2026", customer: "Padma Knitwear Ltd.", qty: "279" },
  { no: "DC-2026-000012", date: "1/7/2026", customer: "Jamuna Apparel", qty: "447" },
  { no: "DC-2025-000002", date: "12/8/2025", customer: "Jamuna Apparel", qty: "1114" },
  { no: "DC-2026-000011", date: "4/3/2026", customer: "Karnaphuli Fashion", qty: "1036" },
  { no: "DC-2025-000001", date: "11/22/2025", customer: "Surma Textile Limited", qty: "245" },
  { no: "DC-2026-000010", date: "7/9/2026", customer: "Rupsha Sweater Ltd", qty: "57" },
  { no: "DC-2026-000009", date: "8/17/2026", customer: "Teesta International", qty: "651" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("deliveryChallans", "delivery-challans");
}

export default function DeliveryChallansPage() {
  const content = useTemplateContent("deliveryChallans");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thDc },
    { head: ui.thDate, className: "hidden md:table-cell" },
    { head: ui.thCustomer },
    { head: ui.thReference, className: "hidden xl:table-cell" },
    { head: ui.thQty, align: "end" },
    { head: ui.thPkts, className: "hidden sm:table-cell" },
    { head: "", align: "end" },
  ];
  const rows = challans.map((r) => [
    <span key="n" className={`${mono} font-semibold text-foreground`}>{r.no}</span>,
    <span key="d" className="text-muted-foreground tabular-nums">{r.date}</span>,
    <span key="c" className="block truncate font-medium">{r.customer}</span>,
    <span key="r" className="text-muted-foreground">—</span>,
    <span key="q" className="tabular-nums">{r.qty}</span>,
    <span key="p" className="text-muted-foreground">—</span>,
    <Btn key="b">{common("print")}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="delivery-challans"
      prefix="dc"
      appName="Delivery Challans"
      features={[
        "Numbered delivery challans, one series per year",
        "Customer picked from the list or typed in for a one-off delivery",
        "Reference (PO or job number), vehicle number and delivery address",
        "Item lines with description, quantity, packets and remarks",
        "Create and print in one step; search, CSV and Excel export",
      ]}
      content={content}
      stepTones={["teal", "teal", "teal"]}
      connectStructure={[
        { key: "before", tools: ["customers", "itemsProducts"] },
        { key: "after", tools: ["invoicesAr", "receipts"] },
        { key: "shows", tools: ["accountingHub", "ledgers", "financialReports"] },
      ]}
      localIcons={[Hash, Truck, Package, ClipboardList]}
      preview={
        <TemplatePreview
          prefix="dc"
          toolKey="deliveryChallans"
          content={content}
          newLabel={ui.newChallan}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.createPrint]}
          dialog={
            <>
              <Field label={ui.fDate} value="11/03/2026" />
              <Field label={ui.fCustomerExisting} value={ui.optional} select />
              <Field wide label={ui.fCustomerName} value={ui.customerNamePh} />
              <Field label={ui.fVehicle} />
              <Field label={ui.fRef} />
              <SectionLabel>{ui.items}</SectionLabel>
              <Field label={ui.fItem} value={ui.selectItem} select />
              <Field label={ui.fQty} value={ui.qty} />
            </>
          }
        />
      }
    />
  );
}
