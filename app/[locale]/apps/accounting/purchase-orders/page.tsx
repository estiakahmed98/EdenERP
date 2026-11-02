/**
 * Adon ERP public site: /[locale]/apps/accounting/purchase-orders
 * Single-file page. All copy lives in messages/*.json under
 * pages.accountingShowcase.purchaseOrders (and .common for the shared pieces).
 *
 * ALL DATA ON THIS PAGE IS DUMMY. Never put real client data here.
 *
 * Angle (Design Pattern Guide, section 5):
 *   Who is reading:  the purchasing officer and the owner who approves spending
 *   The question:    "How do we agree the price first, track what arrived,
 *                     and turn the order into a bill?"
 *   The real story:  one order for printing ink, from request to bill
 */
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { CalendarCheck, ChevronDown, Download, FileText, Package, Plus, Printer, RefreshCw, Search, Truck, X } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { SITE_URL, accountingMetadata, useCommon, type ToolKey } from "../_shared";
import {
  ConnectSection,
  FinalSection,
  HandNotes,
  JsonLd,
  PrimaryButton,
  SecondaryButton,
  StorySteps,
  faqSchema,
  h2,
  lead,
  ruled,
  useSection,
  wrap,
  type Faq,
} from "../_showcase";

/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */

type Status = "draft" | "approved" | "received" | "void";

const SAMPLE_COMPANY = "Nodi Polymer Industries";

/** DUMMY data. A number in `title` points into the translated sample titles. */
const sampleOrders: {
  no: string;
  title: string | number;
  status: Status;
  amount: string;
  received: string;
  date: string;
}[] = [
  { no: "PO-2026-000012", title: 0, status: "draft", amount: "0", received: "0", date: "10/19/2026" },
  { no: "PO-2026-000011", title: 1, status: "approved", amount: "138,000", received: "138,000", date: "10/19/2026" },
  { no: "PO-2026-000010", title: "PO — Sundarban Cement", status: "draft", amount: "385,000", received: "0", date: "9/27/2026" },
  { no: "PO-2026-000009", title: "PO — Meghna Inks Ltd", status: "approved", amount: "382,000", received: "382,000", date: "9/27/2026" },
  { no: "PO-2026-000008", title: "PO — Shahin Trading", status: "approved", amount: "276,000", received: "0", date: "9/27/2026" },
  { no: "PO-2026-000007", title: "PO — Express Logistics Ltd", status: "draft", amount: "350,000", received: "0", date: "9/27/2026" },
  { no: "PO-2026-000006", title: "PO — Shapla Packaging", status: "approved", amount: "112,000", received: "112,000", date: "9/27/2026" },
];

const detail = {
  no: "PO-2026-000009",
  title: "PO — Meghna Inks Ltd",
  poAmount: "BDT 382,000",
  received: "BDT 382,000",
  approved: "9/4/2026",
};

const noteCols = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const localIcons = [FileText, Truck, Package, CalendarCheck];
const lifecycleStatuses: Status[] = ["draft", "approved", "received"];

const connectStructure: { key: string; tools: ToolKey[] }[] = [
  { key: "before", tools: ["vendors", "itemsProducts"] },
  { key: "after", tools: ["billsAp", "chequeRegister", "bankAccounts"] },
  { key: "shows", tools: ["accountingHub", "financialReports", "vatRegister"] },
];

const statusStyle: Record<Status, string> = {
  draft: "bg-muted text-muted-foreground",
  approved: "bg-[var(--teal)]/12 text-[var(--teal)]",
  received: "bg-[var(--teal)]/12 text-[var(--teal)]",
  void: "bg-destructive/10 text-destructive",
};

function usePurchaseOrdersContent() {
  const t = useSection("purchaseOrders");
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    sample: t.raw("sample") as { count: string; titles: string[]; notes: string[] },
    ui: t.raw("ui") as Record<string, string>,
    lifecycle: t.raw("lifecycle") as {
      title: string;
      intro: string;
      steps: { question: string; body: string }[];
      aside: { body: string };
      formTitle: string;
      form: { label: string; body: string }[];
    },
    connect: t.raw("connect") as {
      title: string;
      intro: string;
      groups: Record<string, string>;
      items: Record<string, string>;
    },
    local: t.raw("local") as {
      title: string;
      intro: string;
      points: { title: string; body: string }[];
      story: { title: string; intro: string; steps: { time: string; text: string }[] };
    },
    industries: t.raw("industries") as { title: string; angles: Record<string, string> },
    faq: t.raw("faq") as { title: string; items: Faq[] },
    closing: t.raw("closing") as { title: string },
    description: t("meta.description"),
  };
}

function StatusPill({ status }: { status: Status }) {
  const t = useSection("purchaseOrders.status");
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${statusStyle[status]}`}>{t(status)}</span>
  );
}

/* ================================================================== */
/* 2. PRODUCT PREVIEW                                                 */
/* ================================================================== */

function PurchaseOrdersPreview() {
  const { sample, ui } = usePurchaseOrdersContent();
  const { t: common, tools } = useCommon();
  const d = detail;

  return (
    <figure className="relative">
      <HandNotes
        prefix="po"
        notes={sample.notes}
        cols={noteCols}
        itemClass={(i) => (i === 0 ? "items-start" : i === 1 ? "items-end pe-10" : "items-start ps-16")}
      />

      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        <div className="relative max-h-[600px] overflow-hidden sm:max-h-[500px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools.purchaseOrders}</span>
            </div>
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] font-medium text-foreground">
              <span className="truncate">{SAMPLE_COMPANY}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12">
            {/* the list */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-foreground">{tools.purchaseOrders}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  <span className="btn-gradient inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium">
                    <Plus className="h-3 w-3" /> {ui.newPo}
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
                  <span className="inline-flex w-36 items-center gap-1.5 rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[11.5px] text-muted-foreground">
                    <Search className="h-3 w-3" /> {common("search")}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="me-1">{sample.count}</span>
                    <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground">
                      <Download className="h-3 w-3" /> {common("csv")}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground">
                      <Download className="h-3 w-3" /> {common("excel")}
                    </span>
                    <span className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground sm:inline-flex">
                      <Printer className="h-3 w-3" /> {common("print")}
                    </span>
                  </div>
                </div>

                <table className="w-full table-fixed text-[11.5px]">
                  <thead className="bg-[var(--gray-bg)] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="hidden w-[7.6rem] px-3 py-2 text-start sm:table-cell">{ui.thPo}</th>
                      <th className="px-3 py-2 text-start">{ui.thTitle}</th>
                      <th className="w-[4.8rem] px-2 py-2 text-start">{ui.thStatus}</th>
                      <th className="w-[5.2rem] px-2 py-2 text-end">{ui.thAmount}</th>
                      <th className="hidden w-[5.2rem] px-2 py-2 text-end md:table-cell">{ui.thReceived}</th>
                      <th className="hidden w-[5.6rem] px-3 py-2 text-start xl:table-cell">{ui.thDate}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleOrders.map((o, i) => (
                      <tr key={o.no} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                        <td className="hidden px-3 py-2.5 font-medium text-primary tabular-nums sm:table-cell">{o.no}</td>
                        <td className="truncate px-3 py-2.5 text-foreground">
                          {typeof o.title === "number" ? sample.titles[o.title] : o.title}
                        </td>
                        <td className="px-2 py-2.5">
                          <StatusPill status={o.status} />
                        </td>
                        <td className="px-2 py-2.5 text-end text-amber-600 tabular-nums dark:text-amber-400">{o.amount}</td>
                        <td className="hidden px-2 py-2.5 text-end text-[var(--teal)] tabular-nums md:table-cell">{o.received}</td>
                        <td className="hidden px-3 py-2.5 text-muted-foreground tabular-nums xl:table-cell">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PO detail panel */}
            <div className="order-first lg:order-none lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{ui.detailTitle.replace("{no}", d.no)}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="px-4 py-4">
                  <dl className="grid grid-cols-3 gap-x-3 gap-y-3 text-[11.5px]">
                    <div>
                      <dt className="text-muted-foreground">{ui.title}</dt>
                      <dd className="mt-0.5 font-medium text-foreground">{d.title}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.status}</dt>
                      <dd className="mt-1 flex flex-wrap gap-1">
                        <StatusPill status="approved" />
                        <StatusPill status="received" />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.estimate}</dt>
                      <dd className="mt-0.5 text-foreground">—</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.poAmount}</dt>
                      <dd className="mt-0.5 font-semibold text-amber-600 tabular-nums dark:text-amber-400">{d.poAmount}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.amountReceived}</dt>
                      <dd className="mt-0.5 font-semibold text-[var(--teal)] tabular-nums">{d.received}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.approved}</dt>
                      <dd className="mt-0.5 text-foreground tabular-nums">{d.approved}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.lineItems}</p>
                  <table className="mt-1 w-full text-[10.5px]">
                    <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-start">{ui.thItem}</th>
                        <th className="py-1.5 text-end">{ui.thQty}</th>
                        <th className="py-1.5 text-end">{ui.thUnitCost}</th>
                        <th className="py-1.5 text-end">{ui.thVat}</th>
                        <th className="py-1.5 text-end">{ui.thVatAmt}</th>
                        <th className="py-1.5 text-end">{ui.thTotal}</th>
                      </tr>
                    </thead>
                  </table>
                  <p className="border-t border-border py-4 text-center text-[11.5px] text-muted-foreground">{ui.noItems}</p>

                  <div className="flex items-center justify-between text-[11.5px] font-medium">
                    <span className="btn-gradient rounded-md px-2.5 py-1.5">{ui.convert}</span>
                    <span className="rounded-md bg-destructive/10 px-2.5 py-1.5 text-destructive">{ui.voidPo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/90 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6 pt-10">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg btn-gradient px-5 py-2.5 text-[14px] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {common("bookLiveDemo")}
            </Link>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">{ui.caption}</figcaption>
    </figure>
  );
}

/* ================================================================== */
/* 3. PAGE                                                            */
/* ================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("purchaseOrders", "purchase-orders");
}

export default function PurchaseOrdersPage() {
  const locale = useLocale();
  const { hero, lifecycle, connect, local, industries, faq, closing, description } = usePurchaseOrdersContent();
  const { t: common } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Purchase Orders",
    url: `${SITE_URL}/${locale}/apps/accounting/purchase-orders`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: [
      "Purchase orders with vendor, date and reference",
      "Items with quantity, unit cost and VAT",
      "Draft, approved and received tracking",
      "Convert an order to a supplier bill",
      "Search, CSV and Excel export, print",
    ],
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section aria-labelledby="po-title" className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="po-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PrimaryButton href="/demo">{common("bookDemo")}</PrimaryButton>
                <SecondaryButton href="#life">{hero.secondaryCta}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">{common("onboardingNote")}</p>
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <PurchaseOrdersPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. How an order moves ============ */}
      <section id="life" aria-labelledby="life-title" className="scroll-mt-20 py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="life-title" className={h2}>
                {lifecycle.title}
              </h2>
              <p className={`${lead} mt-5`}>{lifecycle.intro}</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {lifecycle.steps.map((s, i) => (
                <li
                  key={lifecycleStatuses[i]}
                  className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]"
                >
                  <div>
                    <StatusPill status={lifecycleStatuses[i]} />
                    <h3 className="mt-2.5 text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {s.question}
                    </h3>
                  </div>
                  <p className="text-[15.5px] leading-[1.7] text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex max-w-[62ch] items-start gap-3 text-[15px] leading-[1.65] text-muted-foreground">
              <StatusPill status="void" />
              <span>{lifecycle.aside.body}</span>
            </p>

            <h3 className="mt-16 text-[1.25rem] font-semibold text-foreground">{lifecycle.formTitle}</h3>
            <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {lifecycle.form.map((f) => (
                <div key={f.label} className="border-s-2 border-primary/25 ps-5">
                  <dt className="text-[16px] font-semibold text-foreground">{f.label}</dt>
                  <dd className="mt-1.5 text-[15px] leading-[1.65] text-muted-foreground">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 3. Connected tools ============ */}
      <ConnectSection copy={connect} structure={connectStructure} />

      {/* ============ 4. Local detail + one order's story ============ */}
      <section aria-labelledby="local-title" className="py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="local-title" className={h2}>
              {local.title}
            </h2>
            <p className={`${lead} mt-5`}>{local.intro}</p>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
              {local.points.map((p, i) => {
                const Icon = localIcons[i];
                return (
                  <li key={p.title}>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--purple-light)] text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                  </li>
                );
              })}
            </ul>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8 lg:sticky lg:top-24">
                <h3 className="text-[1.3rem] font-semibold text-foreground">{local.story.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground">{local.story.intro}</p>
                <div className="mt-6">
                  <StorySteps steps={local.story.steps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. Industries, FAQ, next step ============ */}
      <FinalSection industries={industries} faq={faq} closingTitle={closing.title} />
    </main>
  );
}
