"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CalendarRange,
  Download,
  PackageSearch,
  Printer,
  RefreshCw,
  Search,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ForecastMethod = "Moving average" | "Weighted average" | "Linear trend";
type Product = {
  name: string;
  code: string;
  category: string;
  average: number;
  nextMonth: number;
  nextThreeMonths: number;
  trend: "up" | "down" | "flat";
  stock: number;
  reorder: number;
};

const PRODUCTS: Product[] = [
  { name: "Industrial Gloves", code: "CN-GLOVE", category: "Consumable", average: 83, nextMonth: 333, nextThreeMonths: 1000, trend: "up", stock: 216994, reorder: 0 },
  { name: "Poly Bag PE 26×44 inch", code: "FG-PB-26-44", category: "Finished good", average: 51569, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 175053, reorder: 0 },
  { name: "Inland Freight Service", code: "SV-FREIGHT", category: "Service", average: 7, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 0, reorder: 0 },
  { name: "Spooled Sewing Thread", code: "FG-THREAD-SPL", category: "Finished good", average: 1938, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 10541, reorder: 0 },
  { name: "Machine Installation Service", code: "SV-INSTALL", category: "Service", average: 7, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 0, reorder: 0 },
  { name: "Zipper Poly Bag", code: "FG-PB-ZIP", category: "Finished good", average: 61633, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 146795, reorder: 0 },
  { name: "Carton Box 5-Ply", code: "FG-CARTON-5PLY", category: "Finished good", average: 1145, nextMonth: 0, nextThreeMonths: 0, trend: "flat", stock: 0, reorder: 764 },
  { name: "Carton Box 3-Ply", code: "FG-CARTON-3PLY", category: "Finished good", average: 33554, nextMonth: 0, nextThreeMonths: 0, trend: "flat", stock: 0, reorder: 642 },
  { name: "Printed Hang Tag", code: "FG-HANGTAG", category: "Finished good", average: 34557, nextMonth: 0, nextThreeMonths: 0, trend: "flat", stock: 0, reorder: 518 },
  { name: "Shirt Backboard", code: "FG-BACKBOARD", category: "Finished good", average: 37177, nextMonth: 0, nextThreeMonths: 0, trend: "down", stock: 0, reorder: 736 },
  { name: "Poly Bag PE 12×18 inch", code: "FG-PB-12-18", category: "Finished good", average: 36834, nextMonth: 0, nextThreeMonths: 0, trend: "flat", stock: 0, reorder: 770 },
];

const HISTORY = [
  { month: "Dec ’25", actual: 635000 },
  { month: "Jan ’26", actual: 735000 },
  { month: "Feb", actual: 475000 },
  { month: "Mar", actual: 355000 },
  { month: "Apr", actual: 325000 },
  { month: "May", actual: 130000 },
  { month: "Jun", actual: 205000 },
  { month: "Jul", actual: 125000 },
  { month: "Aug", actual: 115000 },
  { month: "Sep", actual: 0 },
  { month: "Oct", actual: 0 },
  { month: "Nov", actual: 0 },
];

const numberFormat = new Intl.NumberFormat("en-US");

function forecastFromHistory(
  method: ForecastMethod,
  windowSize: number,
  horizon: number,
  history: typeof HISTORY,
) {
  const recent = history.filter((point) => point.actual > 0).slice(-windowSize).map((point) => point.actual);
  const average = recent.reduce((sum, value) => sum + value, 0) / recent.length;
  const linearChange =
    recent.length > 1 ? (recent[recent.length - 1] - recent[0]) / (recent.length - 1) : 0;

  return Array.from({ length: horizon }, (_, index) => {
    let value = average;
    if (method === "Weighted average") {
      const weightedTotal = recent.reduce((sum, item, itemIndex) => sum + item * (itemIndex + 1), 0);
      value = weightedTotal / ((recent.length * (recent.length + 1)) / 2);
    }
    if (method === "Linear trend") value = recent[recent.length - 1] + linearChange * (index + 1);
    return Math.max(0, Math.round(value));
  });
}

function downloadCsv(rows: Product[]) {
  const headers = ["Item", "Code", "Category", "Avg / month", "Next month", "Next 3 months", "On hand", "Reorder"];
  const csv = [
    headers,
    ...rows.map((product) => [
      product.name,
      product.code,
      product.category,
      product.average,
      product.nextMonth,
      product.nextThreeMonths,
      product.stock,
      product.reorder,
    ]),
  ]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "demand-forecast.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Boxes;
  tone: "blue" | "violet" | "green" | "amber";
}) {
  const tones = {
    blue: "before:bg-primary",
    violet: "before:bg-[var(--teal)]",
    green: "before:bg-emerald-500",
    amber: "before:bg-amber-500",
  };

  return (
    <article className={`relative overflow-hidden rounded-lg border border-border bg-card px-3.5 pb-3 pt-4 before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-[1.6rem] font-semibold leading-none tracking-tight text-foreground tabular-nums">{value}</p>
          <p className="mt-2 text-[10.5px] text-muted-foreground">{detail}</p>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </span>
      </div>
    </article>
  );
}

export default function InventoryDemandForecast() {
  const [method, setMethod] = useState<ForecastMethod>("Moving average");
  const [historyMonths, setHistoryMonths] = useState(12);
  const [horizon, setHorizon] = useState(3);
  const [windowSize, setWindowSize] = useState(3);
  const [search, setSearch] = useState("");
  const [computedAt, setComputedAt] = useState("Just now");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((product) =>
      `${product.name} ${product.code} ${product.category}`.toLowerCase().includes(query),
    );
  }, [search]);

  const chartData = useMemo(() => {
    const history = HISTORY.slice(-historyMonths);
    const forecast = forecastFromHistory(method, Math.min(windowSize, history.length), horizon, history);
    return [
      ...history.map((point) => ({ ...point, forecast: null as number | null })),
      ...forecast.map((value, index) => ({
        month: `F+${index + 1}`,
        actual: null as number | null,
        forecast: value,
      })),
    ];
  }, [historyMonths, horizon, method, windowSize]);

  const reorderCount = PRODUCTS.filter((product) => product.reorder > 0).length;

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-[var(--cream)] pb-12 pt-8 sm:pb-16">
        <div
          className="absolute inset-x-0 bottom-0 top-[46%] opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-32 size-[26rem] rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
          <header className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,.95fr)] lg:items-center lg:gap-16">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm">
                <TrendingUp className="size-3.5" />
                INVENTORY PLANNING
              </p>
              <h1 className="showcase-heading max-w-[680px] text-[2.65rem] leading-[1.02] tracking-[-0.035em] text-[var(--ink)] sm:text-[3.6rem] lg:text-[4.25rem]">
                Know what to stock, <span className="text-primary">before you need it.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-7 text-muted-foreground sm:text-[17px]">
                Turn sales history into a clearer demand plan. Spot what is picking up, what is already covered, and what needs a reorder.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Forecast updated {computedAt}
                </span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span>Based on approved sales &amp; current stock</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[490px] lg:me-0">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-[var(--teal)]/15 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-5 shadow-[0_24px_70px_-35px_oklch(0.25_0.08_257/0.4)] backdrop-blur sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Demand outlook</p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">Sales &amp; forecast</p>
                  </div>
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary">12 month view</span>
                </div>
                <div className="mt-5 flex h-[136px] items-end gap-2 border-b border-border/80 pb-2 sm:gap-3">
                  {HISTORY.slice(-9).map((point, index) => {
                    const maxDemand = Math.max(...HISTORY.map((entry) => entry.actual));
                    const height = point.actual ? Math.max(12, (point.actual / maxDemand) * 100) : 5;
                    const isForecast = point.actual === 0;
                    return (
                      <div key={point.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <div
                          className={`w-full rounded-t-md ${isForecast ? "border border-dashed border-violet-400 bg-violet-400/15" : index === 8 ? "bg-primary/75" : "bg-primary/25"}`}
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[9px] text-muted-foreground">{point.month}</span>
                      </div>
                    );
                  })}
                  <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="h-[45%] w-full rounded-t-md border border-dashed border-violet-400 bg-violet-400/15" />
                    <span className="text-[9px] text-violet-600 dark:text-violet-300">F+1</span>
                  </div>
                  <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="h-[38%] w-full rounded-t-md border border-dashed border-violet-400 bg-violet-400/15" />
                    <span className="text-[9px] text-violet-600 dark:text-violet-300">F+2</span>
                  </div>
                  <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="h-[32%] w-full rounded-t-md border border-dashed border-violet-400 bg-violet-400/15" />
                    <span className="text-[9px] text-violet-600 dark:text-violet-300">F+3</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-primary/50" />Actual</span>
                    <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm border border-dashed border-violet-400 bg-violet-400/20" />Forecast</span>
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground">Plan with confidence <span className="text-primary">↗</span></p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.28)]">
            <div className="flex min-h-11 items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
              <div className="flex min-w-0 items-center gap-2 text-[13px]">
                <span className="shrink-0 font-semibold text-primary">Adon</span>
                <span className="-ms-1.5 shrink-0 font-semibold text-[var(--teal)]">ERP</span>
                <span className="hidden text-muted-foreground sm:inline">/</span>
                <span className="hidden text-muted-foreground sm:inline">Inventory</span>
                <span className="hidden text-muted-foreground sm:inline">/</span>
                <span className="truncate font-medium text-foreground">Demand forecast</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Updated {computedAt}
              </div>
            </div>

            <div className="space-y-5 bg-[var(--gray-bg)] p-3 sm:space-y-6 sm:p-6">
        <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5" aria-label="Forecast settings">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <CalendarRange className="size-4" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">01 · Configure</p>
                <h2 className="mt-0.5 text-sm font-semibold text-foreground">Forecast settings</h2>
              </div>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">Choose the inputs for your demand outlook</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(190px,1.3fr)_minmax(145px,1fr)_minmax(145px,1fr)_minmax(130px,.9fr)_auto] lg:items-end">
            <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
              Forecast method
              <select value={method} onChange={(event) => setMethod(event.target.value as ForecastMethod)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
                <option>Moving average</option>
                <option>Weighted average</option>
                <option>Linear trend</option>
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
              Sales history
              <select value={historyMonths} onChange={(event) => setHistoryMonths(Number(event.target.value))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
                <option value={6}>Last 6 months</option>
                <option value={9}>Last 9 months</option>
                <option value={12}>Last 12 months</option>
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
              Forecast horizon
              <select value={horizon} onChange={(event) => setHorizon(Number(event.target.value))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
                <option value={3}>Next 3 months</option>
                <option value={6}>Next 6 months</option>
                <option value={9}>Next 9 months</option>
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
              MA window
              <select value={windowSize} onChange={(event) => setWindowSize(Number(event.target.value))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={9}>9 months</option>
              </select>
            </label>
            <button type="button" onClick={() => setComputedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg btn-gradient px-5 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <RefreshCw className="size-4" />
              Recompute
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5" aria-label="Forecast summary">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border/70 pb-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">02 · Overview</p>
              <h2 className="mt-0.5 text-base font-semibold text-foreground">At a glance</h2>
            </div>
            <p className="text-xs text-muted-foreground">Key numbers to guide your next move</p>
          </div>
          <div className="mb-2 hidden grid-cols-4 gap-3 px-1 lg:grid" aria-hidden="true">
            {[
              "items moving through your inventory",
              "what customers may need next",
              "the next quarter at a glance",
              "orders that need your attention",
            ].map((note, index) => (
              <div key={note} className="flex min-h-[76px] flex-col items-start">
                <p className="showcase-heading-highlight max-w-[12rem] ps-2 text-[1.15rem] leading-[1.02] text-[var(--purple-dark)] dark:text-primary">{note}</p>
                <svg viewBox="0 0 40 32" className={`ms-5 mt-1 h-7 w-8 text-[var(--purple-dark)] dark:text-primary ${index % 2 ? "scale-x-[-1]" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 2c12 7 19 13 17 23" />
                  <path d="m16 20 6 6 5-7" />
                </svg>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Items with sales" value="11" detail="Across all active categories" icon={Boxes} tone="blue" />
            <SummaryCard label="Next-month demand" value="333" detail="Units forecast for next month" icon={TrendingUp} tone="violet" />
            <SummaryCard label="Demand · next 3 months" value="1,000" detail="Projected total units" icon={CalendarRange} tone="green" />
            <SummaryCard label="Items to reorder" value={String(reorderCount)} detail="On-hand stock below reorder point" icon={TriangleAlert} tone="amber" />
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">03 · Trend analysis</p>
              <h2 className="mt-1 font-semibold text-foreground">Demand over time</h2>
              <p className="mt-1 text-xs text-muted-foreground">Historical sales compared with your forward forecast</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-sm bg-blue-600" />Actual sales</span>
              <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-violet-500" />Forecast</span>
            </div>
          </div>
          <div className="h-[280px] w-full sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="4 5" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickMargin={12} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(value: number) => `${Math.round(value / 1000)}k`} width={42} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", boxShadow: "0 8px 24px rgba(15,23,42,.08)" }}
                  formatter={(value, name) => [numberFormat.format(Number(value)), name === "actual" ? "Actual sales" : "Forecast"]}
                  labelStyle={{ color: "var(--muted-foreground)", marginBottom: 4 }}
                />
                <Bar dataKey="actual" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={42} />
                <Line dataKey="forecast" type="monotone" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="6 5" dot={{ r: 4, fill: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">04 · Item planning</p>
                <h2 className="mt-1 font-semibold text-foreground">Forecast by item</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">{method}</span>
                  <span className="mx-2 text-border">·</span>
                  Sorted by forecast demand
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{filteredProducts.length} of {PRODUCTS.length} items</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search items or SKU..." className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={() => downloadCsv(filteredProducts)} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:bg-muted">
                  <Download className="size-4" /> CSV
                </button>
                <button type="button" onClick={() => window.print()} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:bg-muted">
                  <Printer className="size-4" /> Print
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border-t border-border/70">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Item</th>
                  <th className="px-4 py-3.5 font-semibold">Category</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Avg / mo</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Next month</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Next 3 mo</th>
                  <th className="px-4 py-3.5 text-center font-semibold">Trend</th>
                  <th className="px-4 py-3.5 text-right font-semibold">On hand</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Reorder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {filteredProducts.map((product) => (
                  <tr key={product.code} className="transition-colors hover:bg-muted/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary"><PackageSearch className="size-4" /></span>
                        <span className="min-w-0">
                          <span className="block font-medium text-foreground">{product.name}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{product.code}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">{numberFormat.format(product.average)}</td>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">{numberFormat.format(product.nextMonth)}</td>
                    <td className="px-4 py-4 text-right font-semibold tabular-nums text-foreground">{numberFormat.format(product.nextThreeMonths)}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex size-7 items-center justify-center rounded-full ${product.trend === "up" ? "bg-emerald-500/10 text-emerald-600" : product.trend === "down" ? "bg-rose-500/10 text-rose-600" : "bg-muted text-muted-foreground"}`}>
                        {product.trend === "up" ? <ArrowUpRight className="size-4" /> : product.trend === "down" ? <ArrowDownRight className="size-4" /> : <span className="text-sm font-bold">−</span>}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right tabular-nums text-foreground">{numberFormat.format(product.stock)}</td>
                    <td className="px-5 py-4 text-right">
                      {product.reorder > 0 ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                          <TriangleAlert className="size-3.5" /> Order {numberFormat.format(product.reorder)}
                        </span>
                      ) : <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Stock OK</span>}
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-muted-foreground">No items match “{search}”. Try another item name or SKU.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
            <span>Showing {filteredProducts.length} items</span>
            <span>Demand forecast · {method}</span>
          </div>
        </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
