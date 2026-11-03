"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Download,
  MapPin,
  PackageCheck,
  Search,
  TriangleAlert,
  Warehouse,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type WarehouseStatus = "Healthy" | "Near capacity" | "Low activity";
type WarehouseLocation = {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  manager: string;
  units: number;
  skuCount: number;
  capacity: number;
  inbound: number;
  outbound: number;
  status: WarehouseStatus;
};

const LOCATIONS: WarehouseLocation[] = [
  { id: "dhaka", name: "Dhaka Central DC", code: "WH-DHK-01", city: "Dhaka", address: "Tejgaon Industrial Area", manager: "Nusrat Jahan", units: 48620, skuCount: 1248, capacity: 82, inbound: 14, outbound: 28, status: "Healthy" },
  { id: "gazipur", name: "Gazipur Factory Store", code: "WH-GZP-02", city: "Gazipur", address: "Kashimpur, Gazipur", manager: "Mahmud Hasan", units: 38240, skuCount: 936, capacity: 91, inbound: 22, outbound: 17, status: "Near capacity" },
  { id: "chattogram", name: "Chattogram Port Warehouse", code: "WH-CTG-03", city: "Chattogram", address: "North Patenga, Chattogram", manager: "Farhan Kabir", units: 29680, skuCount: 714, capacity: 68, inbound: 31, outbound: 24, status: "Healthy" },
  { id: "narayanganj", name: "Narayanganj Distribution", code: "WH-NGN-04", city: "Narayanganj", address: "Fatullah, Narayanganj", manager: "Rafiq Uddin", units: 21860, skuCount: 582, capacity: 54, inbound: 9, outbound: 19, status: "Healthy" },
  { id: "sylhet", name: "Sylhet Regional Depot", code: "WH-SYL-05", city: "Sylhet", address: "South Surma, Sylhet", manager: "Tasnim Rahman", units: 9860, skuCount: 304, capacity: 37, inbound: 6, outbound: 8, status: "Low activity" },
];

const numberFormat = new Intl.NumberFormat("en-US");
const capacityColor = (capacity: number) =>
  capacity >= 90 ? "#f59e0b" : capacity >= 75 ? "#1088ef" : "#21a816";

function exportWarehouses(rows: WarehouseLocation[]) {
  const headers = ["Warehouse", "Code", "City", "Manager", "Stock units", "SKUs", "Capacity", "Inbound today", "Outbound today", "Status"];
  const csv = [
    headers,
    ...rows.map((location) => [
      location.name,
      location.code,
      location.city,
      location.manager,
      location.units,
      location.skuCount,
      `${location.capacity}%`,
      location.inbound,
      location.outbound,
      location.status,
    ]),
  ]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "warehouse-overview.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Warehouse;
  tone: "blue" | "green" | "violet" | "amber";
}) {
  const accent = {
    blue: {
      bar: "before:bg-primary",
      icon: "bg-primary/10 text-primary",
    },
    green: {
      bar: "before:bg-[var(--teal)]",
      icon: "bg-[var(--teal)]/10 text-[var(--teal)]",
    },
    violet: {
      bar: "before:bg-violet-500",
      icon: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    },
    amber: {
      bar: "before:bg-amber-500",
      icon: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    },
  }[tone];

  return (
    <article className={`relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${accent.bar}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-[1.7rem] font-semibold leading-none tracking-tight text-foreground tabular-nums">{value}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">{detail}</p>
        </div>
        <span className={`grid size-9 place-items-center rounded-lg ${accent.icon}`}>
          <Icon className="size-4" />
        </span>
      </div>
    </article>
  );
}

function CapacityBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-amber-500"
      : value >= 75
        ? "bg-primary"
        : "bg-[var(--teal)]";

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function InventoryWarehouses() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "attention">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return LOCATIONS.filter((location) => {
      const matchesSearch = `${location.name} ${location.code} ${location.city} ${location.manager}`
        .toLowerCase()
        .includes(normalizedQuery);
      const needsAttention = location.status === "Near capacity";
      return matchesSearch && (filter === "all" || needsAttention);
    });
  }, [filter, query]);

  const totalUnits = LOCATIONS.reduce((total, location) => total + location.units, 0);
  const totalSkus = LOCATIONS.reduce((total, location) => total + location.skuCount, 0);
  const averageCapacity = Math.round(
    LOCATIONS.reduce((total, location) => total + location.capacity, 0) / LOCATIONS.length,
  );
  const chartData = LOCATIONS.map((location) => ({
    name: location.city,
    capacity: location.capacity,
    fill: capacityColor(location.capacity),
  }));
  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-[var(--cream)] text-foreground">
        <div className="absolute inset-x-0 bottom-0 top-[42%] -z-10 opacity-65" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 8%, transparent) 31px, color-mix(in oklch, var(--primary) 8%, transparent) 32px)" }} aria-hidden="true" />
        <div className="absolute -right-32 -top-44 -z-10 size-[38rem] rounded-full bg-primary/10 blur-[100px]" aria-hidden="true" />
        <div className="absolute -left-36 bottom-[-22rem] -z-10 size-[38rem] rounded-full bg-[var(--teal)]/10 blur-[110px]" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8">
          <div className="mb-9 flex items-center justify-between border-b border-border/80 pb-4 text-xs sm:mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold text-foreground">Adon<span className="text-[var(--teal)]">ERP</span></span>
              <span>/</span><span>Inventory</span><span>/</span>
              <span className="font-medium text-foreground">Warehouses</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[10px] font-medium text-muted-foreground shadow-sm sm:text-xs">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sample operations view
            </span>
          </div>

          <header className="grid gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-14">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.24em] text-primary sm:text-xs">
                <span className="h-px w-7 bg-primary/60" />
                Warehouse control center
              </p>
              <h1 className="showcase-heading max-w-[620px] text-[2.8rem] font-semibold leading-[.99] tracking-[-.045em] text-[var(--ink)] sm:text-[4rem] lg:text-[4.7rem]">
                Every location.<br />
                <span className="font-light text-primary">One clear picture.</span>
              </h1>
              <p className="mt-6 max-w-[500px] text-sm leading-7 text-muted-foreground sm:text-base">
                Track stock, storage pressure, and daily flow across your warehouse network—without losing sight of the details that keep orders moving.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex min-w-[145px] items-center gap-3 rounded-xl border border-border bg-card/85 px-4 py-3 shadow-sm">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Warehouse className="size-4" /></span>
                  <span><span className="block text-lg font-semibold tabular-nums text-foreground">{LOCATIONS.length}</span><span className="text-[10px] text-muted-foreground">active sites</span></span>
                </div>
                <div className="flex min-w-[175px] items-center gap-3 rounded-xl border border-border bg-card/85 px-4 py-3 shadow-sm">
                  <span className="grid size-9 place-items-center rounded-lg bg-[var(--teal)]/10 text-[var(--teal)]"><Boxes className="size-4" /></span>
                  <span><span className="block text-lg font-semibold tabular-nums text-foreground">{numberFormat.format(totalUnits)}</span><span className="text-[10px] text-muted-foreground">units in network</span></span>
                </div>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Illustrative warehouse data · ready to connect to live inventory
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-sky-400/[0.08] blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-border/80 bg-card/95 shadow-[0_24px_70px_-35px_oklch(0.25_0.08_257/0.28)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground">Network schematic</p>
                    <p className="mt-1 text-sm font-medium text-foreground">Bangladesh distribution grid</p>
                  </div>
                  <span className="rounded-md border border-border px-2 py-1 font-mono text-[9px] text-muted-foreground">SAMPLE / 05</span>
                </div>
                <div className="relative h-[260px] overflow-hidden bg-[var(--gray-bg)] sm:h-[310px]">
                  <div className="absolute inset-0 opacity-55" style={{ backgroundImage: "radial-gradient(var(--border) .7px, transparent .7px)", backgroundSize: "12px 12px" }} aria-hidden="true" />
                  <svg viewBox="0 0 640 330" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full" role="img" aria-label="Schematic connections between warehouse locations in Bangladesh">
                    <defs>
                      <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#1088ef" stopOpacity=".8" />
                        <stop offset="1" stopColor="#21a816" stopOpacity=".75" />
                      </linearGradient>
                      <radialGradient id="map-glow">
                        <stop stopColor="#1088ef" stopOpacity=".12" />
                        <stop offset="1" stopColor="#1088ef" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="328" cy="170" rx="245" ry="155" fill="url(#map-glow)" />
                    <path d="M92 84 186 142 267 113 345 174 445 112 530 201M186 142 209 251 345 174 392 278M345 174 530 201 468 279 392 278" fill="none" stroke="url(#route-gradient)" strokeWidth="2" strokeDasharray="5 8" />
                    <path d="m171 131 15 11m67-39 14 10m68 51 10 10m92-67 8 8m-338-36 12 15m109 166 4-20m179-48 12 5" fill="none" stroke="#1088ef" strokeWidth="1.5" opacity=".4" />
                    {[
                      { x: 92, y: 84, city: "SYLHET", id: "SYL-05", selected: false },
                      { x: 186, y: 142, city: "DHAKA", id: "DHK-01", selected: true },
                      { x: 267, y: 113, city: "NARAYANGANJ", id: "NGN-04", selected: false },
                      { x: 345, y: 174, city: "GAZIPUR", id: "GZP-02", selected: false },
                      { x: 530, y: 201, city: "CHATTOGRAM", id: "CTG-03", selected: false },
                    ].map((node) => (
                      <g key={node.id}>
                        {node.selected && <circle cx={node.x} cy={node.y} r="23" fill="#1088ef" opacity=".12"><animate attributeName="r" values="17;27;17" dur="3s" repeatCount="indefinite" /></circle>}
                        <circle cx={node.x} cy={node.y} r={node.selected ? 7 : 5} fill={node.selected ? "#1088ef" : "#21a816"} stroke="var(--card)" strokeWidth="3" />
                        <text x={node.x + 12} y={node.y - 5} fill="var(--foreground)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.1">{node.city}</text>
                        <text x={node.x + 12} y={node.y + 9} fill="var(--muted-foreground)" fontSize="8" fontFamily="ui-monospace, monospace">{node.id}</text>
                      </g>
                    ))}
                    <text x="34" y="306" fill="var(--muted-foreground)" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="1">ROUTE CONNECTIVITY</text>
                    <line x1="164" y1="303" x2="216" y2="303" stroke="#21a816" strokeWidth="2" strokeDasharray="4 5" />
                    <text x="227" y="306" fill="var(--muted-foreground)" fontSize="8" fontFamily="ui-monospace, monospace">SAMPLE ROUTES</text>
                  </svg>
                  <div className="absolute bottom-4 right-4 rounded-lg border border-border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Network utilization</p>
                    <p className="mt-0.5 text-lg font-semibold text-foreground">{averageCapacity}<span className="text-xs text-muted-foreground">%</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-border/70 border-t border-border/80">
                  <div className="px-4 py-3"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Inbound today</p><p className="mt-1 text-sm font-semibold text-foreground">82 <span className="text-[9px] font-normal text-muted-foreground">receipts</span></p></div>
                  <div className="px-4 py-3"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Outbound today</p><p className="mt-1 text-sm font-semibold text-foreground">96 <span className="text-[9px] font-normal text-muted-foreground">dispatches</span></p></div>
                  <div className="px-4 py-3"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Attention</p><p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-300">01 <span className="text-[9px] font-normal text-muted-foreground">site</span></p></div>
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
                <span className="truncate font-medium text-foreground">Warehouses</span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                5 locations active
              </span>
            </div>

            <div className="space-y-5 bg-[var(--gray-bg)] p-3 sm:space-y-6 sm:p-6">
              <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5" aria-label="Warehouse summary">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border/70 pb-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">01 · Network overview</p>
                    <h2 className="mt-0.5 text-base font-semibold text-foreground">Warehouse performance</h2>
                  </div>
                  <p className="text-xs text-muted-foreground">A quick read on your distributed inventory</p>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-3 px-1 xl:grid-cols-4" aria-hidden="true">
                  {[
                    "every site in one place",
                    "stock ready to move",
                    "products across locations",
                    "make room before it fills",
                  ].map((note, index) => (
                    <div key={note} className="flex min-h-[72px] flex-col items-start">
                      <p className="showcase-heading-highlight max-w-[12rem] ps-2 text-[1.15rem] leading-[1.02] text-[var(--purple-dark)] dark:text-primary">
                        {note}
                      </p>
                      <svg
                        viewBox="0 0 40 32"
                        className={`ms-5 mt-1 h-7 w-8 text-[var(--purple-dark)] dark:text-primary ${index % 2 ? "scale-x-[-1]" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 2c12 7 19 13 17 23" />
                        <path d="m16 20 6 6 5-7" />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Active warehouses" value={String(LOCATIONS.length)} detail="Across 5 operating cities" icon={Warehouse} tone="blue" />
                  <MetricCard label="Stock on hand" value={numberFormat.format(totalUnits)} detail="Units across all locations" icon={Boxes} tone="green" />
                  <MetricCard label="SKU placements" value={numberFormat.format(totalSkus)} detail="Tracked throughout the network" icon={PackageCheck} tone="violet" />
                  <MetricCard label="Capacity alert" value="1 location" detail="Approaching its storage limit" icon={TriangleAlert} tone="amber" />
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,.8fr)]" aria-label="Capacity and daily activity">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">02 · Space utilization</p>
                      <h2 className="mt-1 font-semibold text-foreground">Capacity by warehouse</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Storage occupied at each active location</p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">Average {averageCapacity}%</span>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 8 }} barCategoryGap={16}>
                        <CartesianGrid stroke="var(--border)" strokeDasharray="4 5" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(value: number) => `${value}%`} />
                        <YAxis type="category" dataKey="name" width={86} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                          cursor={{ fill: "var(--muted)", opacity: 0.45 }}
                          contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: 12 }}
                          formatter={(value) => [`${value}%`, "Capacity used"]}
                        />
                        <Bar dataKey="capacity" radius={[0, 5, 5, 0]} maxBarSize={24} background={{ fill: "var(--muted)", radius: 5 }}>
                          {chartData.map((item) => <Cell key={item.name} fill={item.fill} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-border/70 pt-3 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[var(--teal)]" />Available</span>
                    <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-primary" />High utilization</span>
                    <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-amber-500" />Near capacity</span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">03 · Today</p>
                    <h2 className="mt-1 font-semibold text-foreground">Stock movement</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Inbound and outbound activity</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><span className="grid size-7 place-items-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><ArrowDownRight className="size-4" /></span>Inbound today</span>
                        <span className="text-lg font-semibold tabular-nums text-foreground">82 <span className="text-[10px] font-normal text-muted-foreground">receipts</span></span>
                      </div>
                      <div className="mt-3 flex h-1.5 gap-1 overflow-hidden rounded-full bg-muted">
                        <span className="w-[38%] rounded-full bg-emerald-500" />
                        <span className="w-[27%] rounded-full bg-emerald-500/60" />
                        <span className="w-[20%] rounded-full bg-emerald-500/35" />
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">Across all 5 warehouse locations</p>
                    </div>
                    <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary"><ArrowUpRight className="size-4" /></span>Outbound today</span>
                        <span className="text-lg font-semibold tabular-nums text-foreground">96 <span className="text-[10px] font-normal text-muted-foreground">dispatches</span></span>
                      </div>
                      <div className="mt-3 flex h-1.5 gap-1 overflow-hidden rounded-full bg-muted">
                        <span className="w-[34%] rounded-full bg-primary" />
                        <span className="w-[31%] rounded-full bg-primary/60" />
                        <span className="w-[22%] rounded-full bg-primary/35" />
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">Orders fulfilled from active stock</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium text-amber-700 dark:text-amber-300"><TriangleAlert className="size-3.5" />Capacity needs review</span>
                    <span className="text-[10px] text-muted-foreground">1 site</span>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm" aria-label="Warehouse locations">
                <div className="flex flex-col gap-5 p-4 sm:p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">04 / Site intelligence</p>
                      <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Warehouse locations</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Select a site to inspect its operating snapshot</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => exportWarehouses(filteredLocations)}
                      className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-border bg-background px-3.5 text-xs font-medium text-foreground transition hover:bg-muted sm:self-auto"
                    >
                      <Download className="size-4" /> Export locations
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="relative block w-full sm:max-w-sm">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search warehouse, city, or manager..."
                        className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </label>
                    <div className="inline-flex self-start rounded-lg border border-border bg-muted/50 p-1" aria-label="Filter warehouse locations">
                      <button type="button" onClick={() => setFilter("all")} className={`rounded-md px-3.5 py-2 text-xs font-medium transition ${filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                        All locations
                      </button>
                      <button type="button" onClick={() => setFilter("attention")} className={`rounded-md px-3.5 py-2 text-xs font-medium transition ${filter === "attention" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                        Attention <span className="ms-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] text-amber-700 dark:text-amber-300">1</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/70 bg-muted/20 p-4 sm:p-5">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {filteredLocations.map((location, index) => {
                      const isSelected = selectedId === location.id;
                      const isAlert = location.status === "Near capacity";
                      return (
                        <article key={location.id} className={`group overflow-hidden rounded-xl border bg-card transition-all duration-200 ${isSelected ? "border-primary/45 shadow-md shadow-primary/5" : "border-border hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"}`}>
                          <div className={`h-1 ${isAlert ? "bg-amber-500" : location.status === "Low activity" ? "bg-slate-400" : "bg-[var(--teal)]"}`} />
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-3">
                                <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${isAlert ? "bg-amber-500/10 text-amber-600 dark:text-amber-300" : "bg-primary/8 text-primary"}`}>
                                  <Warehouse className="size-[18px]" />
                                </span>
                                <div className="min-w-0">
                                  <h3 className="truncate text-sm font-semibold text-foreground">{location.name}</h3>
                                  <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"><MapPin className="size-3" />{location.city} <span className="text-border">/</span> {location.code}</p>
                                </div>
                              </div>
                              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${isAlert ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" : location.status === "Low activity" ? "bg-muted text-muted-foreground" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}`}>
                                <span className={`size-1.5 rounded-full ${isAlert ? "bg-amber-500" : location.status === "Low activity" ? "bg-muted-foreground" : "bg-emerald-500"}`} />
                                {location.status}
                              </span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-muted/45 px-3 py-2.5">
                                <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Stock on hand</p>
                                <p className="mt-1 text-base font-semibold tabular-nums text-foreground">{numberFormat.format(location.units)} <span className="text-[9px] font-normal text-muted-foreground">units</span></p>
                              </div>
                              <div className="rounded-lg bg-muted/45 px-3 py-2.5">
                                <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">SKU placements</p>
                                <p className="mt-1 text-base font-semibold tabular-nums text-foreground">{numberFormat.format(location.skuCount)} <span className="text-[9px] font-normal text-muted-foreground">SKUs</span></p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="text-[10px] font-medium text-muted-foreground">Storage utilization</span>
                                <span className={`text-xs font-semibold tabular-nums ${isAlert ? "text-amber-600 dark:text-amber-300" : "text-foreground"}`}>{location.capacity}%</span>
                              </div>
                              <CapacityBar value={location.capacity} />
                              <div className="mt-1.5 flex justify-between text-[9px] text-muted-foreground"><span>0%</span><span>{numberFormat.format(100 - location.capacity)}% free</span><span>100%</span></div>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                              <div className="flex items-center gap-3 text-[10px]">
                                <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300"><ArrowDownRight className="size-3.5" />{location.inbound} in</span>
                                <span className="inline-flex items-center gap-1 text-primary"><ArrowUpRight className="size-3.5" />{location.outbound} out</span>
                              </div>
                              <button
                                type="button"
                                aria-expanded={isSelected}
                                onClick={() => setSelectedId(isSelected ? null : location.id)}
                                className="rounded-md px-2 py-1 text-[10px] font-semibold text-primary transition hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                {isSelected ? "Hide details" : "Site details"}
                              </button>
                            </div>

                            {isSelected && (
                              <div className="mt-3 grid gap-2 rounded-lg border border-primary/15 bg-primary/[0.035] p-3 text-[10px] sm:grid-cols-2">
                                <div><p className="text-muted-foreground">Site address</p><p className="mt-1 font-medium text-foreground">{location.address}</p></div>
                                <div><p className="text-muted-foreground">Location manager</p><p className="mt-1 font-medium text-foreground">{location.manager}</p></div>
                                <div><p className="text-muted-foreground">Inbound receipts today</p><p className="mt-1 font-medium text-foreground">{location.inbound}</p></div>
                                <div><p className="text-muted-foreground">Outbound dispatches</p><p className="mt-1 font-medium text-foreground">{location.outbound}</p></div>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                    {filteredLocations.length === 0 && (
                      <div className="col-span-full rounded-xl border border-dashed border-border bg-card px-5 py-12 text-center text-sm text-muted-foreground">No warehouses match your search.</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 text-[10px] text-muted-foreground">
                  <span>Showing {filteredLocations.length} of {LOCATIONS.length} warehouses</span>
                  <span>Warehouse network overview</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
