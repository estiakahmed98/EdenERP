/**
 * Adon ERP public site: /[locale]/apps/accounting/vendors
 * Copy lives in messages/*.json under pages.accountingShowcase.vendors.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the purchasing officer and the accountant who pays suppliers
 * The question:   "Where do I keep my suppliers so orders and bills find them?"
 */
import type { Metadata } from "next";
import { CreditCard, FileText, ShoppingCart, Store } from "lucide-react";

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
const vendors = [
  { name: "Sundarban Cement", ref: "b90599de-700b-4f7f-9f0e-45cf5329d501" },
  { name: "Apex Adhesives", ref: "b94cbee2-cf3d-4842-9a33-8e43b8b2eafb" },
  { name: "Bay Logistics", ref: "aaaf7206-6591-4825-8830-823c9e07b111" },
  { name: "Bengal Plastics", ref: "28c9e4e3-cd3a-496f-adfa-7015cfb7efeb" },
  { name: "Meghna Inks Ltd", ref: "e81dc387-c549-439b-b90c-5d25c7f1a87c" },
  { name: "City Hardware", ref: "cfe71231-a192-4021-99ea-a6c1b0d8ade8" },
  { name: "Shapla Packaging", ref: "26787508-b53f-4133-bd6f-90cb422012bf" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("vendors", "vendors");
}

export default function VendorsPage() {
  const content = useTemplateContent("vendors");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thName },
    { head: ui.thRef, className: "hidden sm:table-cell" },
    { head: ui.thActive },
    { head: "", align: "end" },
  ];
  const rows = vendors.map((r) => [
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
      slug="vendors"
      prefix="ve"
      appName="Vendors"
      features={[
        "One supplier list shared by purchase orders and bills",
        "Vendor name with an optional description",
        "Reference ID on every vendor",
        "Deactivate suppliers you no longer buy from, without losing history",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "chartOfAccounts"] },
        { key: "after", tools: ["purchaseOrders", "billsAp", "chequeRegister"] },
        { key: "shows", tools: ["ledgers", "accountingHub", "vatRegister"] },
      ]}
      localIcons={[Store, ShoppingCart, FileText, CreditCard]}
      preview={
        <TemplatePreview
          prefix="ve"
          toolKey="vendors"
          content={content}
          newLabel={ui.newVendor}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field wide label={ui.fName} value="e.g. AWS" />
              <Field wide label={ui.fDescription} value={ui.optional} />
            </>
          }
        />
      }
    />
  );
}
