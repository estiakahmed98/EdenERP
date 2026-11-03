/**
 * Adon ERP public site: /[locale]/apps/accounting/items-products
 * Copy lives in messages/*.json under pages.accountingShowcase.itemsProducts.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner or store keeper who sets up what the company buys and sells
 * The question:   "How do I keep one clean list of items that sales, purchases and stock all use?"
 */
import type { Metadata } from "next";
import { Box, Layers, Printer, Tag, Wrench } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Field,
  Pill,
  SectionLabel,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  mono,
  money,
  useTemplateContent,
  type Col,
  type Tone,
} from "../_template";

type Cat = "raw" | "consumable" | "finished" | "service";
const catTone: Record<Cat, Tone> = { raw: "amber", consumable: "blue", finished: "blue", service: "purple" };

/** DUMMY data. */
const items: { name: string; sku: string; cat: Cat; uom: string; cost: string; reorder: string }[] = [
  { name: "Black Masterbatch", sku: "RM-MB-BLK", cat: "raw", uom: "kg", cost: "198", reorder: "344" },
  { name: "BOPP Packing Tape", sku: "CN-TAPE", cat: "consumable", uom: "pcs", cost: "35", reorder: "299" },
  { name: "Carton Box 3-Ply", sku: "FG-CARTON-3PLY", cat: "finished", uom: "pcs", cost: "32", reorder: "83" },
  { name: "Duplex Board", sku: "RM-DUPLEX", cat: "raw", uom: "kg", cost: "88", reorder: "241" },
  { name: "Flexo Ink Cyan", sku: "RM-INK-CYN", cat: "raw", uom: "kg", cost: "620", reorder: "359" },
  { name: "Inland Freight Service", sku: "SV-FREIGHT", cat: "service", uom: "job", cost: "0", reorder: "—" },
  { name: "Kraft Paper Roll", sku: "RM-KRAFT", cat: "raw", uom: "kg", cost: "95", reorder: "141" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("itemsProducts", "items-products");
}

export default function ItemsProductsPage() {
  const content = useTemplateContent("itemsProducts");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thName },
    { head: ui.thSku, className: "hidden sm:table-cell" },
    { head: ui.thCategory },
    { head: ui.thUom, className: "hidden md:table-cell" },
    { head: ui.thCost, align: "end" },
    { head: ui.thReorder, align: "end", className: "hidden xl:table-cell" },
  ];
  const catLabel: Record<Cat, string> = {
    raw: ui.catRaw,
    consumable: ui.catConsumable,
    finished: ui.catFinished,
    service: ui.catService,
  };
  const rows = items.map((r) => [
    <span key="n" className="block truncate font-medium">{r.name}</span>,
    <span key="s" className={mono}>{r.sku}</span>,
    <Pill key="c" tone={catTone[r.cat]}>{catLabel[r.cat]}</Pill>,
    <span key="u" className="text-muted-foreground">{r.uom}</span>,
    <span key="p" className={money}>BDT {r.cost}</span>,
    <span key="r">{r.reorder}</span>,
  ]);

  return (
    <TemplatePage
      slug="items-products"
      prefix="ip"
      appName="Items / Products"
      features={[
        "One item list for products, services, raw materials, finished goods and consumables",
        "SKU, barcode, unit of measure and default unit cost",
        "Reorder point, reorder quantity, minimum and maximum stock",
        "Inventory, COGS, revenue and expense accounts filled in by category",
        "Search, CSV and Excel export, print labels",
      ]}
      content={content}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "vendors"] },
        { key: "after", tools: ["purchaseOrders", "invoicesAr", "deliveryChallans"] },
        { key: "shows", tools: ["ledgers", "financialReports", "accountingHub"] },
      ]}
      localIcons={[Tag, Layers, Box, Wrench]}
      preview={
        <TemplatePreview
          prefix="ip"
          toolKey="itemsProducts"
          title={ui.title}
          content={content}
          newLabel={ui.newItem}
          extraActions={
            <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground md:inline-flex">
              <Printer className="h-3 w-3" /> {ui.printLabels}
            </span>
          }
          tabs={[
            { label: ui.tabAll, active: true },
            { label: ui.tabProducts },
            { label: ui.tabServices },
            { label: ui.tabRaw },
            { label: ui.tabFinished },
            { label: ui.tabInactive },
          ]}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field label={ui.fName} value="e.g. Widget A" />
              <Field label={ui.fSku} value="e.g. WDG-001" />
              <Field label={ui.fBarcode} value="EAN-13 / internal code" />
              <Field label={ui.fUom} value="unit" />
              <Field label={ui.fCost} value="0.00" />
              <Field label={ui.fCategory} value={ui.catService} select />
              <SectionLabel>{ui.fReorder}</SectionLabel>
              <Field label={ui.fReorderPoint} value="0" />
              <Field label={ui.fReorderQty} value="0" />
              <SectionLabel>{ui.fAccounts}</SectionLabel>
              <Field label={ui.fInventory} value="1200 Inventory" select />
              <Field label={ui.fCogs} value="5010 COGS" select />
            </>
          }
        />
      }
    />
  );
}
