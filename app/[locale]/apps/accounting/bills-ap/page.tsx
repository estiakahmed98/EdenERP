/**
 * Adon ERP public site: /[locale]/apps/accounting/bills-ap
 * Single-file page. All copy lives in messages/*.json under
 * pages.accountingShowcase.bills (and .common for the shared pieces).
 *
 * ALL DATA ON THIS PAGE IS DUMMY. Never put real client data here.
 *
 * Angle (Design Pattern Guide, section 5):
 *   Who is reading:  the accounts executive who enters supplier bills, and the owner
 *   The question:    "How do we record what suppliers charge, pay in parts,
 *                     and know what we still owe?"
 *   The real story:  one supplier bill for raw material, from the gate to paid
 */
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { BadgeCheck, ChevronDown, Download, Landmark, Layers, Plus, Printer, RefreshCw, Search, Wallet, X } from "lucide-react";

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

type Status = "draft" | "approved" | "paid" | "void";

const SAMPLE_COMPANY = "Nodi Polymer Industries";

/** DUMMY data for the product preview. Text comes from the messages. */
const sampleBills: { no: string; vendor: string; status: Status; amount: string; paid: string }[] = [
  { no: "BILL-2026-000063", vendor: "Gents Collection", status: "draft", amount: "0", paid: "0" },
  { no: "BILL-2026-000062", vendor: "Sundarban Cement", status: "approved", amount: "138,000", paid: "70,000" },
  { no: "BILL-2026-000061", vendor: "City Hardware", status: "draft", amount: "0", paid: "0" },
  { no: "BILL-2026-000060", vendor: "Polymer Corp BD", status: "paid", amount: "19,188.9", paid: "19,188.9" },
  { no: "BILL-2026-000059", vendor: "Prime Power Solutions", status: "paid", amount: "37,545.2", paid: "37,545.2" },
  { no: "BILL-2026-000058", vendor: "Friends Trading", status: "approved", amount: "29,697.6", paid: "0" },
  { no: "BILL-2026-000057", vendor: "Kaveri Furniture", status: "approved", amount: "120,890.3", paid: "0" },
];

const detail = {
  no: "BILL-2026-000062",
  vendor: "Sundarban Cement",
  status: "approved" as Status,
  amountDue: "BDT 138,000",
  amountPaid: "BDT 70,000",
  dueDate: "10/19/2026",
  line: { qty: "40", unitCost: "BDT 3,000", vat: "15%", vatAmt: "BDT 18,000", total: "BDT 138,000" },
};

const noteCols = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-5"];
const localIcons = [BadgeCheck, Wallet, Layers, Landmark];
const lifecycleStatuses: Status[] = ["draft", "approved", "paid"];

const connectStructure: { key: string; tools: ToolKey[] }[] = [
  { key: "before", tools: ["vendors", "purchaseOrders", "itemsProducts"] },
  { key: "after", tools: ["chequeRegister", "bankAccounts", "pettyCash"] },
  { key: "shows", tools: ["vatRegister", "accountingHub", "financialReports"] },
];

const statusStyle: Record<Status, string> = {
  draft: "bg-muted text-muted-foreground",
  approved: "bg-[var(--teal)]/12 text-[var(--teal)]",
  paid: "bg-[var(--teal)]/12 text-[var(--teal)]",
  void: "bg-destructive/10 text-destructive",
};

function useBillsContent() {
  const t = useSection("bills");
  return {
    hero: t.raw("hero") as { title: string; lead: string; secondaryCta: string },
    sample: t.raw("sample") as { count: string; terms: string; lineItem: string; notes: string[] },
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
  const t = useSection("bills.status");
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${statusStyle[status]}`}>{t(status)}</span>
  );
}

/* ================================================================== */
/* 2. PRODUCT PREVIEW                                                 */
/* ================================================================== */

function BillsPreview() {
  const { sample, ui } = useBillsContent();
  const { t: common, tools } = useCommon();
  const d = detail;

  return (
    <figure className="relative">
      <HandNotes
        prefix="bill"
        notes={sample.notes}
        cols={noteCols}
        itemClass={(i) => (i === 0 ? "items-end pe-6" : i === 2 ? "items-start ps-24" : "items-start")}
      />

      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        <div className="relative max-h-[640px] overflow-hidden sm:max-h-[540px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ms-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">{tools.billsAp}</span>
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
                <p className="text-lg font-semibold text-foreground">{tools.billsAp}</p>
                <div className="flex items-center gap-2 text-[11.5px]">
                  <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground sm:inline-flex">
                    <RefreshCw className="h-3 w-3" /> {common("refresh")}
                  </span>
                  <span className="btn-gradient inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium">
                    <Plus className="h-3 w-3" /> {ui.newBill}
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
                  </div>
                </div>

                <table className="w-full table-fixed text-[11.5px]">
                  <thead className="bg-[var(--gray-bg)] text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="hidden w-[7.6rem] px-3 py-2 text-start sm:table-cell">{ui.thBill}</th>
                      <th className="px-3 py-2 text-start">{ui.thVendor}</th>
                      <th className="w-[4.8rem] px-2 py-2 text-start">{ui.thStatus}</th>
                      <th className="w-[5.2rem] px-2 py-2 text-end">{ui.thAmount}</th>
                      <th className="w-[5.2rem] px-2 py-2 text-end">{ui.thPaid}</th>
                      <th className="hidden w-[8.4rem] px-3 py-2 xl:table-cell" />
                    </tr>
                  </thead>
                  <tbody>
                    {sampleBills.map((b, i) => (
                      <tr key={b.no} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                        <td className="hidden px-3 py-2.5 font-medium text-primary tabular-nums sm:table-cell">{b.no}</td>
                        <td className="truncate px-3 py-2.5 text-foreground">{b.vendor}</td>
                        <td className="px-2 py-2.5">
                          <StatusPill status={b.status} />
                        </td>
                        <td className="px-2 py-2.5 text-end text-destructive tabular-nums">{b.amount}</td>
                        <td className="px-2 py-2.5 text-end text-primary tabular-nums">{b.paid}</td>
                        <td className="hidden px-3 py-2 xl:table-cell">
                          <span className="flex items-center justify-end gap-1 text-[10.5px] font-medium text-foreground">
                            <span className="rounded border border-border bg-[var(--gray-bg)] px-1.5 py-0.5">{ui.view}</span>
                            <span className="rounded border border-border bg-[var(--gray-bg)] px-1.5 py-0.5">{ui.allocate}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* bill detail panel */}
            <div className="order-first lg:order-none lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[14px] font-semibold text-foreground">{ui.detailTitle.replace("{no}", d.no)}</p>
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="px-4 py-4">
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-[11.5px] font-medium text-foreground">
                      <Printer className="h-3 w-3" /> {ui.printBill}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-3 gap-x-3 gap-y-3 text-[11.5px]">
                    <div>
                      <dt className="text-muted-foreground">{ui.vendor}</dt>
                      <dd className="mt-0.5 font-medium text-foreground">{d.vendor}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.status}</dt>
                      <dd className="mt-1">
                        <StatusPill status={d.status} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.terms}</dt>
                      <dd className="mt-0.5 text-foreground">{sample.terms}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.amountDue}</dt>
                      <dd className="mt-0.5 font-semibold text-destructive tabular-nums">{d.amountDue}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.amountPaid}</dt>
                      <dd className="mt-0.5 font-semibold text-primary tabular-nums">{d.amountPaid}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{ui.dueDate}</dt>
                      <dd className="mt-0.5 text-foreground tabular-nums">{d.dueDate}</dd>
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
                    <tbody>
                      <tr>
                        <td className="py-2 pe-2 text-foreground">{sample.lineItem}</td>
                        <td className="py-2 text-end tabular-nums text-foreground">{d.line.qty}</td>
                        <td className="py-2 text-end tabular-nums text-foreground">{d.line.unitCost}</td>
                        <td className="py-2 text-end tabular-nums text-muted-foreground">{d.line.vat}</td>
                        <td className="py-2 text-end tabular-nums text-amber-600 dark:text-amber-400">{d.line.vatAmt}</td>
                        <td className="py-2 text-end font-medium tabular-nums text-foreground">{d.line.total}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 flex items-center justify-between text-[11.5px] font-medium">
                    <span className="rounded-md bg-[var(--teal)]/12 px-2.5 py-1.5 text-[var(--teal)]">{ui.recordPayment}</span>
                    <span className="rounded-md bg-destructive/10 px-2.5 py-1.5 text-destructive">{ui.voidBill}</span>
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
  return accountingMetadata("bills", "bills-ap");
}

export default function BillsApPage() {
  const locale = useLocale();
  const { hero, lifecycle, connect, local, industries, faq, closing, description } = useBillsContent();
  const { t: common } = useCommon();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adon ERP Bills (AP)",
    url: `${SITE_URL}/${locale}/apps/accounting/bills-ap`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web browser",
    inLanguage: locale,
    description,
    featureList: [
      "Supplier bills with VAT per line",
      "Draft, approved, paid and void statuses",
      "Part payments tracked against each bill",
      "Allocate a payment to the bills it settles",
      "Search, CSV and Excel export, print",
    ],
    areaServed: { "@type": "City", name: "Dhaka" },
    publisher: { "@type": "Organization", name: "Adon ERP", url: SITE_URL },
  };

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, faqSchema(faq.items)]} />

      {/* ============ 1. Hero ============ */}
      <section aria-labelledby="bill-title" className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="bill-title"
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
            <BillsPreview />
          </div>
        </div>
      </section>

      {/* ============ 2. The life of a bill ============ */}
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

      {/* ============ 4. Local detail + one bill's story ============ */}
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
