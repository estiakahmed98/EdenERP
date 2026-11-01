"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Fuel,
  Gauge,
  MapPin,
  PackageCheck,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ShowcaseHeading,
  ShowcaseHighlight,
} from "@/components/showcase-typography";

type StatusTone = "good" | "warning" | "danger" | "info" | "muted";

type PreviewRow = {
  cells: string[];
  statusIndex?: number;
  statusTone?: StatusTone;
};

type Vehicle = {
  code: string;
  name: string;
  registration: string;
  type: "Truck" | "Pickup";
  ownership: "Owned" | "Rented";
  driver: string;
  odometer: number;
  status: "Active" | "Available";
  location: string;
};

type FuelEntry = {
  date: string;
  vehicleCode: string;
  liters: number;
  rate: number;
  previousOdometer: number;
  odometer: number;
};

const vehicles: Vehicle[] = [
  { code: "TRK-001", name: "Own Truck — Tata LPT 1109", registration: "DHAKA-METRO-22-9529", type: "Truck", ownership: "Owned", driver: "Jamal Uddin", odometer: 126700, status: "Active", location: "Dhaka depot" },
  { code: "TRK-002", name: "Own Truck — Ashok Leyland", registration: "DHAKA-METRO-11-3594", type: "Truck", ownership: "Owned", driver: "Arif Hossain", odometer: 81587, status: "Active", location: "Naogaon mill" },
  { code: "TRK-003", name: "Own Truck — Eicher Pro", registration: "DHAKA-METRO-16-5471", type: "Truck", ownership: "Owned", driver: "Abdul Karim", odometer: 103588, status: "Active", location: "Naogaon mill" },
  { code: "TRK-004", name: "Own Truck — Tata 1613", registration: "DHAKA-METRO-21-2593", type: "Truck", ownership: "Owned", driver: "Jasim Uddin", odometer: 84901, status: "Active", location: "Naogaon mill" },
  { code: "TRK-005", name: "Own Pickup — Mahindra Bolero", registration: "DHAKA-METRO-19-6016", type: "Pickup", ownership: "Owned", driver: "Shila Akter", odometer: 63210, status: "Active", location: "Dhaka depot" },
  { code: "TRK-R01", name: "Rented Truck — Padma Transport", registration: "DHAKA-METRO-18-2797", type: "Truck", ownership: "Rented", driver: "Mizanur Rahman", odometer: 98320, status: "Active", location: "Naogaon mill" },
  { code: "TRK-R02", name: "Rented Truck — Jamuna Carriers", registration: "DHAKA-METRO-20-1843", type: "Truck", ownership: "Rented", driver: "Nazrul Islam", odometer: 135822, status: "Active", location: "Rajshahi depot" },
  { code: "TRK-R03", name: "Rented Truck — Meghna Logistics", registration: "DHAKA-METRO-17-6421", type: "Truck", ownership: "Rented", driver: "Saiful Islam", odometer: 116405, status: "Active", location: "Naogaon mill" },
];

const trips = [
  { code: "TRIP-0024", vehicle: "TRK-R01 · Rented Truck — Padma Transport", driver: "Mizanur Rahman", origin: "Naogaon Mill", destination: "Rajshahi Depot", distance: 243, date: "Aug 24, 2026", completed: "Aug 24, 2026", status: "Completed" },
  { code: "TRIP-0023", vehicle: "TRK-R03 · Rented Truck — Meghna Logistics", driver: "Saiful Islam", origin: "Naogaon Mill", destination: "Khulna Depot", distance: 286, date: "Aug 22, 2026", completed: "Aug 23, 2026", status: "Completed" },
  { code: "TRIP-0022", vehicle: "TRK-002 · Own Truck — Ashok Leyland", driver: "Arif Hossain", origin: "Naogaon Mill", destination: "Rangpur Depot", distance: 240, date: "Aug 20, 2026", completed: "Aug 20, 2026", status: "Completed" },
  { code: "TRIP-0021", vehicle: "TRK-R02 · Rented Truck — Jamuna Carriers", driver: "Nazrul Islam", origin: "Naogaon Mill", destination: "Rangpur Depot", distance: 176, date: "Aug 20, 2026", completed: "Aug 21, 2026", status: "Completed" },
  { code: "TRIP-0020", vehicle: "TRK-R01 · Rented Truck — Padma Transport", driver: "Mizanur Rahman", origin: "Naogaon Mill", destination: "Rajshahi Depot", distance: 209, date: "Aug 18, 2026", completed: "Aug 18, 2026", status: "Completed" },
  { code: "TRIP-0019", vehicle: "TRK-001 · Own Truck — Tata LPT 1109", driver: "Jamal Uddin", origin: "Naogaon Mill", destination: "Dhaka Depot", distance: 172, date: "Aug 15, 2026", completed: "Aug 16, 2026", status: "Completed" },
  { code: "TRIP-0018", vehicle: "TRK-001 · Own Truck — Tata LPT 1109", driver: "Jamal Uddin", origin: "Naogaon Mill", destination: "Khulna Depot", distance: 335, date: "Aug 12, 2026", completed: "Aug 13, 2026", status: "Completed" },
  { code: "TRIP-0017", vehicle: "TRK-R03 · Rented Truck — Meghna Logistics", driver: "Saiful Islam", origin: "Naogaon Mill", destination: "Khulna Depot", distance: 205, date: "Aug 10, 2026", completed: "Aug 11, 2026", status: "Completed" },
  { code: "TRIP-0016", vehicle: "TRK-002 · Own Truck — Ashok Leyland", driver: "Arif Hossain", origin: "Naogaon Mill", destination: "Dhaka Depot", distance: 296, date: "Nov 04, 2026", completed: "—", status: "Scheduled" },
  { code: "TRIP-0015", vehicle: "TRK-R02 · Rented Truck — Jamuna Carriers", driver: "Nazrul Islam", origin: "Naogaon Mill", destination: "Rangpur Depot", distance: 176, date: "Sep 28, 2026", completed: "—", status: "Cancelled" },
];

const fuelEntries: FuelEntry[] = [
  { date: "Aug 24, 2026", vehicleCode: "TRK-004", liters: 91, rate: 110, previousOdometer: 84545, odometer: 84901 },
  { date: "Aug 22, 2026", vehicleCode: "TRK-002", liters: 99, rate: 108, previousOdometer: 81198, odometer: 81587 },
  { date: "Aug 20, 2026", vehicleCode: "TRK-R02", liters: 110, rate: 105, previousOdometer: 135400, odometer: 135822 },
  { date: "Aug 20, 2026", vehicleCode: "TRK-003", liters: 58, rate: 111, previousOdometer: 103174, odometer: 103588 },
  { date: "Aug 18, 2026", vehicleCode: "TRK-001", liters: 80, rate: 110, previousOdometer: 126332, odometer: 126700 },
  { date: "Aug 15, 2026", vehicleCode: "TRK-R01", liters: 36, rate: 106, previousOdometer: 98157, odometer: 98320 },
];

const maintenance = [
  { code: "VM-TRK-002", vehicle: "TRK-002 · Own Truck — Ashok Leyland", type: "Routine servicing", date: "Nov 03, 2026", cost: 3000, due: "Nov 03, 2026", status: "Scheduled" },
  { code: "VM-TRK-003", vehicle: "TRK-003 · Own Truck — Eicher Pro", type: "Engine maintenance", date: "Nov 05, 2026", cost: 11000, due: "Nov 05, 2026", status: "In progress" },
  { code: "VM-TRK-R03", vehicle: "TRK-R03 · Rented Truck — Meghna Logistics", type: "Brake inspection", date: "Nov 10, 2026", cost: 14000, due: "Nov 10, 2026", status: "Scheduled" },
  { code: "VM-TRK-R01", vehicle: "TRK-R01 · Rented Truck — Padma Transport", type: "Oil and filter change", date: "Nov 14, 2026", cost: 6000, due: "Nov 14, 2026", status: "Scheduled" },
  { code: "VM-TRK-R02", vehicle: "TRK-R02 · Rented Truck — Jamuna Carriers", type: "Tire replacement", date: "Nov 20, 2026", cost: 13000, due: "Nov 20, 2026", status: "Scheduled" },
  { code: "VM-TRK-004", vehicle: "TRK-004 · Own Truck — Tata 1613", type: "Corrective repair", date: "Oct 28, 2026", cost: 8500, due: "Oct 28, 2026", status: "Overdue" },
];

const workflowIcons: LucideIcon[] = [Truck, Route, MapPin, Fuel, Wrench, PackageCheck];
const benefitIcons: LucideIcon[] = [Truck, Fuel, Gauge, Route, CalendarDays, ShieldCheck, ArrowUpRight];

function getStatusTone(status: string): StatusTone {
  switch (status.toLowerCase()) {
    case "active":
    case "completed":
      return "good";
    case "scheduled":
      return "warning";
    case "in progress":
    case "ongoing":
      return "info";
    case "overdue":
    case "cancelled":
      return "danger";
    default:
      return "muted";
  }
}

function translatedValue(
  t: ReturnType<typeof useTranslations<"pages.transportPool">>,
  value: string,
) {
  const values = t.raw("values") as Record<string, string>;
  return values[value] ?? value;
}

function translatedTableLabels(
  t: ReturnType<typeof useTranslations<"pages.transportPool">>,
  keys: string[],
) {
  const labels = t.raw("table") as Record<string, string>;
  return keys.map((key) => labels[key] ?? key);
}

function PreviewTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: PreviewRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full min-w-[790px] border-collapse text-left text-xs sm:text-sm">
        <thead className="bg-slate-100 text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="whitespace-nowrap border-b border-slate-200 px-3 py-3 font-bold dark:border-slate-700 sm:px-4">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row.cells[0]}-${rowIndex}`} className={rowIndex % 2 ? "bg-slate-50/80 dark:bg-slate-800/35" : "bg-white dark:bg-slate-900"}>
              {row.cells.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="max-w-[280px] border-b border-slate-100 px-3 py-3 text-slate-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200 sm:px-4">
                  {row.statusIndex === cellIndex ? (
                    <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ${
                      row.statusTone === "good" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" :
                      row.statusTone === "warning" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300" :
                      row.statusTone === "danger" ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" :
                      row.statusTone === "info" ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    }`}>
                      {cell}
                    </span>
                  ) : (
                    <span className="block min-w-0">{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DemoToolbar({
  count,
  t,
}: {
  count: number;
  t: ReturnType<typeof useTranslations<"pages.transportPool">>;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("table.rowCount", { count })}</span>
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">CSV</span>
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">Excel</span>
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">{t("table.print")}</span>
        <span className="text-amber-700 dark:text-amber-300">{t("table.previewOnly")}</span>
      </div>
    </div>
  );
}

function PanelIntro({
  icon: Icon,
  title,
  description,
  t,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  t: ReturnType<typeof useTranslations<"pages.transportPool">>;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><Icon className="h-5 w-5" /></div>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300"><Sparkles className="h-3.5 w-3.5" />{t("table.demoData")}</p>
      </div>
    </div>
  );
}

function FleetDashboard({
  t,
  fuelSpend,
  fuelMonth,
}: {
  t: ReturnType<typeof useTranslations<"pages.transportPool">>;
  fuelSpend: number;
  fuelMonth: string;
}) {
  const metrics = [
    { label: t("metrics.activeVehicles"), value: "8", note: t("metrics.fleetRegistered"), icon: Truck, tone: "text-emerald-600 dark:text-emerald-300" },
    { label: t("metrics.ongoingTrips"), value: "0", note: t("metrics.noLiveTrips"), icon: Route, tone: "text-blue-600 dark:text-blue-300" },
    { label: t("metrics.fuelCost"), value: `BDT ${fuelSpend.toLocaleString("en-BD")}`, note: t("metrics.mtdNoEntries", { month: fuelMonth }), icon: Fuel, tone: "text-amber-600 dark:text-amber-300" },
    { label: t("metrics.maintenanceDue"), value: "6", note: t("metrics.maintenanceSchedule"), icon: Wrench, tone: "text-violet-600 dark:text-violet-300" },
    { label: t("metrics.documentsExpiring"), value: "0", note: t("metrics.documentsCurrent"), icon: CalendarDays, tone: "text-rose-600 dark:text-rose-300" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
      className="relative mx-auto w-full max-w-[1080px]"
      aria-label={t("hero.previewAccessible")}
    >
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/50 via-transparent to-indigo-200/50 blur-3xl dark:from-sky-500/10 dark:to-indigo-500/10" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_100px_-34px_rgba(30,41,59,0.42)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"><Truck className="h-4 w-4" /></div>
            <div><p className="text-xs font-bold text-slate-900 dark:text-white">{t("hero.previewTitle")}</p><p className="mt-0.5 text-[10px] text-slate-400">{t("hero.previewSubtitle")}</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />{t("table.demoBadge")}</span>
        </div>
        <div className="grid gap-3 bg-slate-50/80 p-4 dark:bg-slate-950/50 sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-2"><p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{metric.label}</p><metric.icon className={`h-4 w-4 shrink-0 ${metric.tone}`} /></div>
              <p className={`mt-2 text-xl font-bold tracking-tight ${metric.tone}`}>{metric.value}</p>
              <p className="mt-1.5 text-[10px] leading-4 text-slate-400 dark:text-slate-500">{metric.note}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 border-t border-slate-100 p-4 dark:border-slate-800 sm:p-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold text-slate-900 dark:text-white">{t("hero.fleetComposition")}</p><p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{t("hero.ownedRented")}</p></div><Truck className="h-4 w-4 text-sky-600 dark:text-sky-300" /></div>
            <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="img" aria-label={t("hero.compositionAccessible")}>
              <div className="bg-sky-500" style={{ width: "62.5%" }} />
              <div className="bg-indigo-500" style={{ width: "37.5%" }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[10px]">
              <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-sky-500" />{t("hero.owned")}: 5</span>
              <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-indigo-500" />{t("hero.rented")}: 3</span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">{t("hero.truckCount")}: 7 · {t("hero.pickupCount")}: 1</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold text-slate-900 dark:text-white">{t("hero.readinessTitle")}</p><BellRing className="h-4 w-4 text-amber-500" /></div>
            <div className="mt-4 space-y-3">
              {[
                { label: t("hero.vehiclesAvailable"), value: 8, max: 8, color: "bg-emerald-500" },
                { label: t("hero.maintenanceScheduled"), value: 6, max: 8, color: "bg-amber-500" },
                { label: t("hero.documentsCurrent"), value: 8, max: 8, color: "bg-sky-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex justify-between text-[10px]"><span className="text-slate-500 dark:text-slate-400">{item.label}</span><span className="font-bold text-slate-800 dark:text-slate-200">{item.value}/{item.max}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.value / item.max) * 100}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{t("hero.previewNote")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VehiclesPanel({ t }: { t: ReturnType<typeof useTranslations<"pages.transportPool">> }) {
  const [query, setQuery] = useState("");
  const columns = translatedTableLabels(t, ["code", "vehicle", "registration", "type", "ownership", "driver", "odometer", "status", "location"]);
  const rows = useMemo(() => {
    const search = query.trim().toLowerCase();
    return vehicles.filter((vehicle) => Object.values(vehicle).join(" ").toLowerCase().includes(search)).map((vehicle) => ({
      cells: [vehicle.code, vehicle.name, vehicle.registration, translatedValue(t, vehicle.type), translatedValue(t, vehicle.ownership), vehicle.driver, `${vehicle.odometer.toLocaleString("en-BD")} km`, translatedValue(t, vehicle.status), translatedValue(t, vehicle.location)],
      statusIndex: 7,
      statusTone: getStatusTone(vehicle.status),
    }));
  }, [query, t]);
  const owned = vehicles.filter((vehicle) => vehicle.ownership === "Owned").length;
  const rented = vehicles.length - owned;

  return (
    <>
      <PanelIntro icon={Truck} title={t("tabs.vehicles")} description={t("panels.vehicles")} t={t} />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: t("vehicles.fleetTotal"), value: String(vehicles.length), icon: Truck, tone: "text-sky-600 dark:text-sky-300" },
          { label: t("vehicles.ownedVehicles"), value: String(owned), icon: ShieldCheck, tone: "text-emerald-600 dark:text-emerald-300" },
          { label: t("vehicles.rentedVehicles"), value: String(rented), icon: Route, tone: "text-indigo-600 dark:text-indigo-300" },
        ].map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><span className="text-xs text-slate-600 dark:text-slate-300">{metric.label}</span><span className={`inline-flex items-center gap-2 text-lg font-bold ${metric.tone}`}><metric.icon className="h-4 w-4" />{metric.value}</span></div>)}
      </div>
      <label className="mb-4 flex max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 focus-within:ring-2 focus-within:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        <Search className="h-4 w-4 shrink-0" /><span className="sr-only">{t("table.searchVehicles")}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("table.searchVehicles")} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" />
      </label>
      <DemoToolbar count={rows.length} t={t} />
      {rows.length ? <PreviewTable columns={columns} rows={rows} /> : <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">{t("table.noVehicles")}</p>}
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />{t("panels.vehiclesNote")}</p>
    </>
  );
}

function TripsPanel({ t }: { t: ReturnType<typeof useTranslations<"pages.transportPool">> }) {
  const [filter, setFilter] = useState("All");
  const filters = t.raw("trips.filters") as Array<{ value: string; label: string }>;
  const filteredTrips = filter === "All" ? trips : trips.filter((trip) => trip.status === filter);
  const rows = filteredTrips.map((trip) => ({
    cells: [trip.code, trip.vehicle, trip.driver, translatedValue(t, trip.origin), translatedValue(t, trip.destination), `${trip.distance} km`, trip.date, trip.completed, translatedValue(t, trip.status)],
    statusIndex: 8,
    statusTone: getStatusTone(trip.status),
  }));
  const totalDistance = filteredTrips.reduce((sum, trip) => sum + trip.distance, 0);

  return (
    <>
      <PanelIntro icon={Route} title={t("tabs.trips")} description={t("panels.trips")} t={t} />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><p className="text-[11px] text-slate-500 dark:text-slate-400">{t("trips.completedTrips")}</p><p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-300">8</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><p className="text-[11px] text-slate-500 dark:text-slate-400">{t("trips.ongoingTrips")}</p><p className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-300">0</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><p className="text-[11px] text-slate-500 dark:text-slate-400">{t("trips.sampleDistance")}</p><p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{totalDistance.toLocaleString("en-BD")} km</p></div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t("trips.filterLabel")}>
        {filters.map((item) => (
          <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${filter === item.value ? "border-sky-600 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>{item.label}</button>
        ))}
      </div>
      <DemoToolbar count={rows.length} t={t} />
      <PreviewTable columns={translatedTableLabels(t, ["tripNumber", "vehicle", "driver", "origin", "destination", "distance", "startDate", "completionDate", "status"])} rows={rows} />
      <div className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("trips.historyTitle")}</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(t.raw("trips.history") as Array<{ date: string; title: string; detail: string }>).map((event) => (
            <div key={event.title} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
              <p className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">{event.date}</p>
              <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white">{event.title}</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{event.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-amber-700 dark:text-amber-300">{t("table.demoData")} · {t("table.previewOnly")}</p>
      </div>
      <div className="mt-4 grid gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs leading-5 text-sky-950 dark:border-sky-500/20 dark:bg-sky-500/5 dark:text-sky-100 sm:grid-cols-[auto_1fr]">
        <MapPin className="h-4 w-4 text-sky-700 dark:text-sky-300" /><p><span className="font-bold">{t("trips.workflowLabel")}</span> {t("trips.workflow")}</p>
      </div>
    </>
  );
}

function FuelPanel({ t, fuelSpend }: { t: ReturnType<typeof useTranslations<"pages.transportPool">>; fuelSpend: number }) {
  const columns = translatedTableLabels(t, ["fuelDate", "vehicle", "liters", "ratePerLiter", "fuelAmount", "odometer", "distance", "efficiency"]);
  const rows = fuelEntries.map((entry) => {
    const distance = entry.odometer - entry.previousOdometer;
    const efficiency = distance > 0 && entry.liters > 0 ? (distance / entry.liters).toFixed(2) : null;
    const amount = entry.liters * entry.rate;
    return {
      cells: [entry.date, entry.vehicleCode, `${entry.liters} L`, `BDT ${entry.rate}`, `BDT ${amount.toLocaleString("en-BD")}`, `${entry.odometer.toLocaleString("en-BD")} km`, `${distance.toLocaleString("en-BD")} km`, efficiency ? `${efficiency} km/L` : t("fuel.notAvailable")],
    };
  });
  const totalLiters = fuelEntries.reduce((sum, entry) => sum + entry.liters, 0);
  const totalFuelCost = fuelEntries.reduce((sum, entry) => sum + entry.liters * entry.rate, 0);
  const averageEfficiency = fuelEntries.reduce((sum, entry) => sum + (entry.odometer - entry.previousOdometer), 0) / totalLiters;
  const maxAmount = Math.max(...fuelEntries.map((entry) => entry.liters * entry.rate));

  return (
    <>
      <PanelIntro icon={Fuel} title={t("tabs.fuelLog")} description={t("panels.fuel")} t={t} />
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t("fuel.sampleSpend"), value: `BDT ${fuelSpend.toLocaleString("en-BD")}`, note: t("fuel.currentMonthNote"), icon: Fuel, tone: "text-amber-600 dark:text-amber-300" },
          { label: t("fuel.historicalSpend"), value: `BDT ${totalFuelCost.toLocaleString("en-BD")}`, note: t("fuel.historicalNote"), icon: PackageCheck, tone: "text-sky-600 dark:text-sky-300" },
          { label: t("fuel.totalVolume"), value: `${totalLiters.toLocaleString("en-BD")} L`, note: t("fuel.sampleVolume"), icon: Fuel, tone: "text-indigo-600 dark:text-indigo-300" },
          { label: t("fuel.avgEfficiency"), value: `${averageEfficiency.toFixed(2)} km/L`, note: t("fuel.calculatedMileage"), icon: Gauge, tone: "text-emerald-600 dark:text-emerald-300" },
        ].map((metric) => <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between gap-2"><p className="text-[11px] text-slate-500 dark:text-slate-400">{metric.label}</p><metric.icon className={`h-4 w-4 ${metric.tone}`} /></div><p className={`mt-2 text-lg font-bold ${metric.tone}`}>{metric.value}</p><p className="mt-1 text-[10px] text-slate-400">{metric.note}</p></div>)}
      </div>
      <div className="mb-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2"><div><h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("fuel.trendTitle")}</h4><p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{t("fuel.trendDescription")}</p></div><span className="text-xs font-bold text-slate-600 dark:text-slate-300">BDT {totalFuelCost.toLocaleString("en-BD")}</span></div>
        <div className="mt-4 flex h-28 items-end gap-2" aria-label={t("fuel.chartAccessible")}>
          {fuelEntries.map((entry) => {
            const amount = entry.liters * entry.rate;
            return <div key={`${entry.vehicleCode}-${entry.date}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1"><span className="text-[8px] text-slate-500 dark:text-slate-400">{(amount / 1000).toFixed(1)}k</span><div className="w-full max-w-12 rounded-t-md bg-gradient-to-t from-sky-600 to-cyan-400" style={{ height: `${Math.max(14, (amount / maxAmount) * 78)}%` }} /><span className="mb-1 text-[8px] text-slate-500 dark:text-slate-400">{entry.vehicleCode}</span></div>;
          })}
        </div>
      </div>
      <DemoToolbar count={rows.length} t={t} />
      <PreviewTable columns={columns} rows={rows} />
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{t("fuel.accuracyNote")}</p>
    </>
  );
}

function MaintenancePanel({ t }: { t: ReturnType<typeof useTranslations<"pages.transportPool">> }) {
  const columns = translatedTableLabels(t, ["maintenanceNumber", "vehicle", "maintenanceType", "maintenanceDate", "cost", "nextDueDate", "status"]);
  const rows = maintenance.map((entry) => ({
    cells: [entry.code, entry.vehicle, translatedValue(t, entry.type), entry.date, `BDT ${entry.cost.toLocaleString("en-BD")}`, entry.due, translatedValue(t, entry.status)],
    statusIndex: 6,
    statusTone: getStatusTone(entry.status),
  }));
  const history = t.raw("maintenance.history") as Array<{ date: string; label: string; detail: string }>;

  return (
    <>
      <PanelIntro icon={Wrench} title={t("tabs.maintenance")} description={t("panels.maintenance")} t={t} />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-500/20 dark:bg-amber-500/5"><p className="text-[11px] text-amber-800 dark:text-amber-200">{t("maintenance.upcoming")}</p><p className="mt-1 text-xl font-bold text-amber-700 dark:text-amber-300">5</p></div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 dark:border-rose-500/20 dark:bg-rose-500/5"><p className="text-[11px] text-rose-800 dark:text-rose-200">{t("maintenance.overdue")}</p><p className="mt-1 text-xl font-bold text-rose-700 dark:text-rose-300">1</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"><p className="text-[11px] text-slate-500 dark:text-slate-400">{t("maintenance.documentRenewals")}</p><p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-300">0 <span className="text-xs font-medium">{t("maintenance.expiring")}</span></p></div>
      </div>
      <DemoToolbar count={rows.length} t={t} />
      <PreviewTable columns={columns} rows={rows} />
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("maintenance.historyTitle")}</h4>
          <div className="mt-4 space-y-4">
            {history.map((event) => <div key={event.date} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500 ring-4 ring-sky-50 dark:ring-sky-500/10" /><div><p className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">{event.date}</p><p className="mt-0.5 text-xs font-bold text-slate-900 dark:text-white">{event.label}</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{event.detail}</p></div></div>)}
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/30">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("maintenance.workflowTitle")}</h4>
          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{t("maintenance.workflow")}</p>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs leading-5 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-100"><CalendarDays className="mb-1 h-4 w-4" />{t("maintenance.documentsNote")}</div>
        </section>
      </div>
    </>
  );
}

export default function TransportPoolShowcase() {
  const t = useTranslations("pages.transportPool");
  const features = t.raw("features.items") as Array<{ title: string; description: string }>;
  const workflow = t.raw("workflow.steps") as Array<{ title: string; description: string }>;
  const benefits = t.raw("benefits.items") as Array<{ title: string; description: string }>;
  const industries = t.raw("industries.items") as Array<{ title: string; description: string }>;
  const tabKeys = ["vehicles", "trips", "fuelLog", "maintenance"] as const;
  const tabLabels = t.raw("tabs") as Record<string, string>;
  const tabs: { key: (typeof tabKeys)[number]; icon: LucideIcon }[] = [
    { key: "vehicles", icon: Truck },
    { key: "trips", icon: Route },
    { key: "fuelLog", icon: Fuel },
    { key: "maintenance", icon: Wrench },
  ];
  const fuelSpendMtd = fuelEntries.filter((entry) => entry.date.startsWith("Nov")).reduce((sum, entry) => sum + entry.liters * entry.rate, 0);
  const fuelMonth = t("metrics.currentMonth");
  const featureIcons: LucideIcon[] = [Truck, Route, Fuel, Wrench];

  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-12 pt-14 dark:from-slate-900/70 dark:via-slate-950 dark:to-slate-950 sm:pt-20">
        <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />
        <div className="pointer-events-none absolute -right-32 top-32 -z-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-700 shadow-sm dark:border-sky-500/20 dark:bg-slate-900/80 dark:text-sky-300"><Truck className="h-4 w-4" />{t("hero.eyebrow")}</div>
            <ShowcaseHeading as="h1" className="text-4xl leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{t("hero.title")} <ShowcaseHighlight className="text-sky-600 dark:text-sky-300">{t("hero.titleHighlight")}</ShowcaseHighlight></ShowcaseHeading>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{t("hero.description")}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">{t("hero.primaryCta")} <ArrowRight className="h-4 w-4" /></Link>
              <a href="#transport-preview" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300">{t("hero.secondaryCta")} <ArrowDown className="h-4 w-4" /></a>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{t("hero.sampleNotice")}</p>
          </div>
          <FleetDashboard t={t} fuelSpend={fuelSpendMtd} fuelMonth={fuelMonth} />
        </div>
      </section>

      <section id="fleet-overview" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t("features.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("features.title")}</ShowcaseHeading><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("features.description")}</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.04 }} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><Icon className="h-5 w-5" /></div><h3 className="text-base font-bold text-slate-900 dark:text-white">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p></motion.div>;
            })}
          </div>
        </div>
      </section>

      <section id="transport-preview" className="scroll-mt-24 bg-slate-50 py-16 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t("showcase.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("showcase.title")}</ShowcaseHeading><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("showcase.description")}</p></div>
          <Tabs defaultValue="vehicles" className="w-full">
            <div className="mb-5 overflow-x-auto pb-2"><TabsList aria-label={t("showcase.tabsLabel")} className="h-auto min-w-max gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">{tabs.map(({ key, icon: Icon }) => <TabsTrigger key={key} value={key} className="h-10 gap-2 rounded-lg px-4 text-xs font-semibold text-slate-600 data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:bg-sky-500 sm:text-sm"><Icon className="h-4 w-4" />{tabLabels[key]}</TabsTrigger>)}</TabsList></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-7">
              <TabsContent value="vehicles"><VehiclesPanel t={t} /></TabsContent>
              <TabsContent value="trips"><TripsPanel t={t} /></TabsContent>
              <TabsContent value="fuelLog"><FuelPanel t={t} fuelSpend={fuelSpendMtd} /></TabsContent>
              <TabsContent value="maintenance"><MaintenancePanel t={t} /></TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t("workflow.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("workflow.title")}</ShowcaseHeading><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("workflow.description")}</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{workflow.map((step, index) => {const Icon = workflowIcons[index]; return <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><div className="mb-3 flex items-center justify-between"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><Icon className="h-4 w-4" /></span><span className="text-xs font-bold text-slate-400">0{index + 1}</span></div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h3><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{step.description}</p></div>;})}</div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-9 max-w-2xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t("benefits.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("benefits.title")}</ShowcaseHeading></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit, index) => {const Icon = benefitIcons[index];return <div key={benefit.title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><Icon className="h-4 w-4" /></div><div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{benefit.title}</h3><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{benefit.description}</p></div></div>;})}</div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t("industries.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("industries.title")}</ShowcaseHeading><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("industries.description")}</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{industries.map((industry) => <div key={industry.title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><Truck className="h-4 w-4" /></div><div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{industry.title}</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{industry.description}</p></div></div>)}</div></div></div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-sky-700 via-sky-600 to-indigo-600 px-6 py-10 text-center text-white shadow-xl shadow-sky-900/15 sm:px-12 sm:py-14"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-100">{t("cta.eyebrow")}</p><ShowcaseHeading as="h2" className="text-3xl tracking-tight text-white sm:text-4xl">{t("cta.title")} <ShowcaseHighlight className="text-amber-200">{t("cta.titleHighlight")}</ShowcaseHighlight></ShowcaseHeading><p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-sky-100">{t("cta.description")}</p><Link href="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-700 transition hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600">{t("cta.button")} <ArrowRight className="h-4 w-4" /></Link><p className="mt-4 text-[11px] text-sky-100">{t("cta.note")}</p></div>
      </section>
    </main>
  );
}
