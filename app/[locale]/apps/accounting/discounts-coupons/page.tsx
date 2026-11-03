/**
 * Adon ERP public site: /[locale]/apps/accounting/discounts-coupons
 * Copy lives in messages/*.json under pages.accountingShowcase.discountsCoupons.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the owner or sales manager who runs offers
 * The question:   "How do I give a discount, cap it, and see how often it was used?"
 */
import type { Metadata } from "next";
import { CalendarRange, Percent, Tag, Users } from "lucide-react";

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
} from "../_template";

/** DUMMY data. */
const coupons = [
  { code: "LOYALTY", name: "Loyalty Reward", fixed: true, value: "BDT 15,000", used: "11 / 55" },
  { code: "EARLYBIRD", name: "Early Payment Discount", fixed: false, value: "3%", used: "16 / 38" },
  { code: "EIDSPECIAL", name: "Eid Special Offer", fixed: false, value: "7%", used: "4 / 66" },
  { code: "NEWBUYER", name: "New Buyer Discount", fixed: true, value: "BDT 25,000", used: "17 / 52" },
  { code: "BULK10", name: "Bulk Order 10% Off", fixed: false, value: "10%", used: "12 / 55" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("discountsCoupons", "discounts-coupons");
}

export default function DiscountsCouponsPage() {
  const content = useTemplateContent("discountsCoupons");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thCode },
    { head: ui.thName },
    { head: ui.thType, className: "hidden sm:table-cell" },
    { head: ui.thValue, align: "end" },
    { head: ui.thUsed, className: "hidden md:table-cell" },
    { head: ui.thValid, className: "hidden xl:table-cell" },
    { head: ui.thActive, className: "hidden sm:table-cell" },
    { head: "", align: "end" },
  ];
  const rows = coupons.map((r) => [
    <span key="c" className="font-mono text-[10.5px] font-semibold text-primary">{r.code}</span>,
    <span key="n" className="block truncate font-medium">{r.name}</span>,
    <Pill key="t" tone={r.fixed ? "blue" : "teal"}>{r.fixed ? ui.fixed : ui.percentage}</Pill>,
    <span key="v" className={money}>{r.value}</span>,
    <span key="u" className="tabular-nums">{r.used}</span>,
    <span key="d" className="text-muted-foreground tabular-nums">3/1/2026 → 10/31/2026</span>,
    <Pill key="a" tone="teal">{ui.yes}</Pill>,
    <Btn key="e">{common("edit")}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="discounts-coupons"
      prefix="dco"
      appName="Discounts & Coupons"
      features={[
        "Coupons with a code, a name and an optional description",
        "Percentage or fixed-amount discounts",
        "Minimum purchase and a maximum discount cap",
        "Valid-from and valid-to dates",
        "Total usage limit and a per-customer limit, with a used count",
      ]}
      content={content}
      stepTones={["teal", "blue", "amber"]}
      connectStructure={[
        { key: "before", tools: ["customers", "itemsProducts"] },
        { key: "after", tools: ["invoicesAr", "receipts"] },
        { key: "shows", tools: ["financialReports", "accountingHub", "ledgers"] },
      ]}
      localIcons={[Percent, CalendarRange, Users, Tag]}
      preview={
        <TemplatePreview
          prefix="dco"
          toolKey="discountsCoupons"
          title={ui.title}
          content={content}
          newLabel={ui.newCoupon}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field label={ui.fCode} value="SAVE10" />
              <Field label={ui.fName} value="10% off Eid" />
              <Field label={ui.fType} value={ui.typePct} select />
              <Field label={ui.fPct} value="10" />
              <Field label={ui.fMin} value={ui.optional} />
              <Field label={ui.fCap} value={ui.optional} />
              <Field label={ui.fFrom} value="mm/dd/yyyy" />
              <Field label={ui.fTo} value="mm/dd/yyyy" />
              <Field label={ui.fTotalLimit} value={ui.unlimited} />
              <Field label={ui.fPerCustomer} value={ui.unlimited} />
            </>
          }
        />
      }
    />
  );
}
