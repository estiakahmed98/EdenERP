/**
 * Adon ERP public site: /[locale]/apps/accounting/fixed-asset-register
 * Copy lives in messages/*.json under pages.accountingShowcase.fixedAssetRegister.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the accountant and the owner who buy plant, vehicles and buildings
 * The question:   "What do we own, what did it cost, and what is it worth now?"
 */
import type { Metadata } from "next";
import { Building2, CalendarClock, DollarSign, Truck } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  money,
  useTemplateContent,
  type Col,
  type Tone,
} from "../_template";

type Cat = "building" | "plant" | "vehicles" | "equipment" | "furniture";
const catTone: Record<Cat, Tone> = { building: "amber", plant: "purple", vehicles: "blue", equipment: "muted", furniture: "teal" };

/** DUMMY data. */
const assets: { code: string; name: string; cat: Cat; date: string; cost: string; acc: string; book: string; life: string }[] = [
  { code: "FA-2026-001", name: "Factory Building — Gazipur", cat: "building", date: "8/20/2025", cost: "18,500,000", acc: "509,034.91", book: "17,990,965.09", life: "40" },
  { code: "FA-2026-002", name: "PE Extruder Line 1", cat: "plant", date: "8/22/2024", cost: "6,200,000", acc: "1,082,135.52", book: "5,117,864.48", life: "12" },
  { code: "FA-2026-009", name: "Delivery Pickup — Toyota Hilux", cat: "vehicles", date: "3/7/2024", cost: "3,400,000", acc: "1,447,501.71", book: "1,952,498.29", life: "6" },
  { code: "FA-2026-012", name: "Air Conditioning Units", cat: "equipment", date: "6/24/2023", cost: "540,000", acc: "219,917.86", book: "320,082.14", life: "8" },
  { code: "FA-2026-004", name: "Flexo Printing Machine 6-colour", cat: "plant", date: "11/17/2022", cost: "4,800,000", acc: "1,543,052.7", book: "3,256,947.3", life: "12" },
  { code: "FA-2026-011", name: "Office Furniture & Fixtures", cat: "furniture", date: "8/14/2022", cost: "380,000", acc: "156,473.65", book: "223,526.35", life: "10" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("fixedAssetRegister", "fixed-asset-register");
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg bg-[var(--gray-bg)] px-3 py-2.5">
      <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-[13px] font-semibold tabular-nums sm:text-[15px] ${tone}`}>{value}</p>
    </div>
  );
}

export default function FixedAssetRegisterPage() {
  const content = useTemplateContent("fixedAssetRegister");
  const { t: common } = useCommon();
  const { ui } = content;

  const catLabel: Record<Cat, string> = { building: ui.catBuilding, plant: ui.catPlant, vehicles: ui.catVehicles, equipment: ui.catEquipment, furniture: ui.catFurniture };

  const cols: Col[] = [
    { head: ui.thCode },
    { head: ui.thName },
    { head: ui.thCategory, className: "hidden sm:table-cell" },
    { head: ui.thAcquired, className: "hidden xl:table-cell" },
    { head: ui.thCost, align: "end", className: "hidden md:table-cell" },
    { head: ui.thAccDepr, align: "end", className: "hidden md:table-cell" },
    { head: ui.thBook, align: "end" },
    { head: ui.thLife, className: "hidden xl:table-cell" },
    { head: ui.thStatus, className: "hidden sm:table-cell" },
  ];
  const rows = assets.map((r) => [
    <span key="c" className="font-mono text-[10.5px] font-semibold">{r.code}</span>,
    <span key="n" className="block truncate font-medium">{r.name}</span>,
    <Pill key="k" tone={catTone[r.cat]}>{catLabel[r.cat]}</Pill>,
    <span key="a" className="text-muted-foreground tabular-nums">{r.date}</span>,
    <span key="co" className="tabular-nums text-primary">BDT {r.cost}</span>,
    <span key="ad" className={money}>BDT {r.acc}</span>,
    <span key="b" className="tabular-nums text-[var(--teal)]">BDT {r.book}</span>,
    <span key="l">{r.life}</span>,
    <Pill key="s" tone="teal">{ui.active}</Pill>,
  ]);

  return (
    <TemplatePage
      slug="fixed-asset-register"
      prefix="fa"
      appName="Fixed Asset Register"
      features={[
        "A register of buildings, plant and machinery, vehicles, equipment and furniture",
        "Acquisition date, cost, salvage value and useful life for each asset",
        "Straight-line depreciation, run monthly with one button",
        "Accumulated depreciation and net book value on every asset",
        "A journal entry posted automatically when an asset is created",
      ]}
      content={content}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["billsAp", "vendors", "bankAccounts"] },
        { key: "after", tools: ["journalEntries", "ledgers", "closingFy"] },
        { key: "shows", tools: ["financialReports", "accountingHub"] },
      ]}
      localIcons={[Building2, Truck, CalendarClock, DollarSign]}
      preview={
        <TemplatePreview
          prefix="fa"
          toolKey="fixedAssetRegister"
          content={content}
          newLabel={ui.newAsset}
          extraActions={
            <span className="hidden items-center gap-1 rounded-md border border-[var(--teal)]/30 bg-[var(--teal)]/10 px-2 py-1 font-medium text-[var(--teal)] md:inline-flex">
              <DollarSign className="h-3 w-3" /> {ui.runDepr}
            </span>
          }
          above={
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label={ui.sAssets} value="12" tone="text-foreground" />
              <Stat label={ui.sCost} value="BDT 47,620,000" tone="text-primary" />
              <Stat label={ui.sAcc} value="BDT 10,789,165.86" tone="text-amber-600 dark:text-amber-400" />
              <Stat label={ui.sBook} value="BDT 36,830,834.14" tone="text-[var(--teal)]" />
            </div>
          }
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field label={ui.fName} value="e.g. PE Extruder Line #2" />
              <Field label={ui.fCategory} value={ui.catPlantFull} select />
              <Field label={ui.fFunding} value={ui.cashBank} select />
              <Field label={ui.fDate} value="11/03/2026" />
              <Field label={ui.fCost} value="500000" />
              <Field label={ui.fSalvage} value="0" />
              <Field label={ui.fLife} value="10" />
              <Field label={ui.fMethod} value={ui.straight} select />
              <Field label={ui.fVendor} value="e.g. Reifenhauser GmbH" />
              <Field label={ui.fBill} value="BILL-2024-001" />
              <p className="col-span-2 rounded-md bg-primary/10 px-3 py-2 text-[10.5px] leading-snug text-foreground">{ui.jeNote}</p>
            </>
          }
        />
      }
    />
  );
}
