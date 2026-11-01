"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Boxes,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Factory,
  Gauge,
  HardHat,
  ListFilter,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
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

type DemoRow = {
  cells: string[];
  statusTone?: StatusTone;
  statusTones?: Record<number, StatusTone>;
};

type DemoTableProps = {
  columns: string[];
  rows: DemoRow[];
  statusColumn?: number | number[];
};

type Part = {
  code: string;
  name: string;
  uom: string;
  onHand: number;
  reorder: number;
  unitCost: number;
  location: string;
};

const equipment = [
  ["EQ-CCL-COAT", "CCL roll coaters (primer / finish / back)", "Elenga line bay", "Critical", "6,548", "M. Rahman", "Operational", "Coating"],
  ["EQ-CCL-OVEN", "CCL curing ovens (gas-fired)", "Elenga line bay", "Critical", "17,104", "S. Islam", "Operational", "Thermal"],
  ["EQ-CCL-PRE", "Pre-treatment section & pumps", "Elenga line bay", "High", "13,289", "A. Hossain", "Maintenance", "Process"],
  ["EQ-CGL-FURN", "CGL annealing furnace", "Galvanizing bay", "Critical", "10,701", "M. Rahman", "Operational", "Thermal"],
  ["EQ-CGL-POT", "CGL Al-Zn pot & air knives", "Galvanizing bay", "Critical", "19,378", "T. Karim", "Operational", "Process"],
  ["EQ-CORR-BD", "Boro Dew roll former", "Forming bay", "High", "3,109", "N. Akter", "Operational", "Rolling"],
  ["EQ-CRANE-01", "EOT crane · 15 tonne", "Finishing bay", "Critical", "8,420", "R. Das", "Operational", "Lifting"],
  ["EQ-GEN-01", "Gas generator · 1 MW", "Utility plant", "Critical", "12,640", "F. Ahmed", "Operational", "Utilities"],
  ["EQ-WB-01", "Weighbridge · 80 tonne", "Dispatch gate", "Medium", "4,225", "J. Alam", "Operational", "Measurement"],
  ["EQ-PUMP-04", "Cooling water pump · 04", "Utility plant", "Medium", "7,932", "S. Islam", "Standby", "Utilities"],
];

const pmSchedules = [
  ["PM-EQ-CORR-BD", "Roll-former alignment", "Boro Dew roll former", "Preventive", "90 days", "Oct 28, 2026", "Overdue"],
  ["PM-EQ-CCL-OVEN", "Oven burner service", "CCL curing ovens", "Preventive", "30 days", "Nov 03, 2026", "Due soon"],
  ["PM-EQ-CGL-FURN", "Furnace refractory inspection", "CGL annealing furnace", "Inspection", "Quarterly", "Nov 08, 2026", "Due soon"],
  ["PM-EQ-CRANE-01", "Hoist and brake inspection", "EOT crane · 15 tonne", "Preventive", "500 run hrs", "Nov 14, 2026", "Due soon"],
  ["PM-EQ-GEN-01", "Generator oil and filter service", "Gas generator · 1 MW", "Preventive", "Monthly", "Nov 21, 2026", "Scheduled"],
  ["PM-EQ-CCL-PRE", "Pump seal and filter check", "Pre-treatment pumps", "Inspection", "Annual", "Nov 28, 2026", "Scheduled"],
];

const workOrders = [
  ["WO-0006", "Oven trip on zone 3 — burner fault", "CCL curing ovens", "Corrective", "Urgent", "BDT 10,972", "In progress", "A. Hossain"],
  ["WO-0005", "Replace scored coater roll", "CCL roll coaters", "Breakdown", "Low", "BDT 7,799", "Completed", "R. Das"],
  ["WO-0004", "Inspect pot air-knife assembly", "CGL Al-Zn pot", "Preventive", "Low", "BDT 8,145", "Completed", "M. Rahman"],
  ["WO-0003", "Re-align forming line", "Boro Dew roll former", "Preventive", "High", "BDT 3,772", "Open", "N. Akter"],
  ["WO-0002", "Replace crane limit switch", "EOT crane · 15 tonne", "Corrective", "Medium", "BDT 6,974", "Cancelled", "T. Karim"],
  ["WO-0001", "Generator oil and filter service", "Gas generator · 1 MW", "Preventive", "High", "BDT 8,717", "In progress", "F. Ahmed"],
];

const parts: Part[] = [
  { code: "SP-BEARING", name: "Line bearing set", uom: "pcs", onHand: 10, reorder: 3, unitCost: 6_500, location: "Paint & spares store" },
  { code: "SP-BLADE", name: "Flying-shear blade", uom: "pcs", onHand: 1, reorder: 2, unitCost: 22_000, location: "Paint & spares store" },
  { code: "SP-BURNER", name: "Oven burner nozzle", uom: "pcs", onHand: 6, reorder: 2, unitCost: 12_000, location: "Utility store" },
  { code: "SP-SEAL-04", name: "Pump mechanical seal", uom: "pcs", onHand: 2, reorder: 4, unitCost: 8_750, location: "Process store" },
  { code: "SP-FILTER", name: "Generator oil filter", uom: "pcs", onHand: 14, reorder: 5, unitCost: 1_850, location: "Utility store" },
  { code: "SP-BELT-02", name: "Drive belt · heavy duty", uom: "pcs", onHand: 8, reorder: 3, unitCost: 3_200, location: "Paint & spares store" },
  { code: "SP-SWITCH", name: "Crane limit switch", uom: "pcs", onHand: 5, reorder: 2, unitCost: 4_600, location: "Electrical store" },
  { code: "SP-THERMO", name: "Furnace thermocouple", uom: "pcs", onHand: 4, reorder: 2, unitCost: 7_200, location: "Instrument store" },
];

const downtime = [
  ["MDT-0004", "Boro Dew roll former", "Re-coiler bearing seized", "Mechanical", "Oct 26 · 20:00", "1 h", "Closed"],
  ["MDT-0003", "EOT crane · 15 tonne", "Hoist limit switch fault", "Electrical", "Oct 19 · 10:00", "2 h", "Closed"],
  ["MDT-0002", "CGL annealing furnace", "Coater roll scored", "Mechanical", "Oct 12 · 06:00", "6 h", "Closed"],
  ["MDT-0001", "Gas generator · 1 MW", "Oven burner tripped", "Utilities", "Oct 04 · 07:00", "4 h", "Closed"],
];

const calibrations = [
  ["CAL-EQ-CCL-OVEN", "CCL curing oven · temperature probe", "Oct 01, 2026", "Nov 12, 2026", "CERT-26-0914", "Pass", "BDT 0", "Due soon"],
  ["CAL-EQ-WB-01", "Weighbridge · 80 tonne", "Oct 01, 2026", "Nov 21, 2026", "CERT-26-0915", "Pass", "BDT 0", "Due soon"],
  ["CAL-EQ-FURN-01", "Furnace pressure transmitter", "Oct 18, 2026", "Nov 28, 2026", "CERT-26-0940", "Pass", "BDT 4,500", "Due soon"],
  ["CAL-EQ-GEN-01", "Generator fuel flow meter", "Sep 01, 2026", "Sep 01, 2027", "CERT-26-0832", "Pass", "BDT 0", "Current"],
  ["CAL-EQ-CRANE-01", "Crane load indicator", "Oct 20, 2026", "Nov 03, 2026", "CERT-26-0972", "Fail", "BDT 6,800", "Action required"],
  ["CAL-EQ-CGL-POT", "Pot temperature sensor", "Jul 15, 2026", "Jul 15, 2027", "CERT-26-0703", "Pass", "BDT 3,200", "Current"],
];

const featureIcons: LucideIcon[] = [
  Factory,
  CalendarClock,
  ClipboardList,
  Boxes,
  Activity,
  Gauge,
];

const benefitIcons: LucideIcon[] = [
  ArrowDown,
  Activity,
  CalendarDays,
  Wrench,
  Package,
  ShieldCheck,
];
const partConceptIcons: LucideIcon[] = [Package, ArrowDown, Boxes, ClipboardCheck];

const formatBDT = (amount: number) => `BDT ${amount.toLocaleString("en-BD")}`;

function valueLabel(
  t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">>,
  value: string,
) {
  const values = t.raw("values") as Record<string, string>;
  return values[value] ?? value;
}

function tableLabels(
  t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">>,
  keys: string[],
) {
  const labels = t.raw("table") as Record<string, string>;
  return keys.map((key) => labels[key] ?? key);
}

function getStatusTone(value: string): StatusTone {
  const status = value.toLowerCase();
  if (["operational", "completed", "pass", "current", "closed"].includes(status)) return "good";
  if (["due soon", "open", "maintenance", "review"].includes(status)) return "warning";
  if (["overdue", "urgent", "critical", "cancelled", "action required", "fail"].includes(status)) return "danger";
  if (["in progress", "scheduled", "high"].includes(status)) return "info";
  return "muted";
}

function DemoTable({ columns, rows, statusColumn }: DemoTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full min-w-[860px] border-collapse text-left text-xs sm:text-sm">
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
                <td key={`${cell}-${cellIndex}`} className="max-w-[260px] border-b border-slate-100 px-3 py-3 text-slate-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200 sm:px-4">
                  {(Array.isArray(statusColumn) ? statusColumn.includes(cellIndex) : statusColumn === cellIndex) ? (
                    <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ${
                      (row.statusTones?.[cellIndex] ?? row.statusTone) === "good" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" :
                      (row.statusTones?.[cellIndex] ?? row.statusTone) === "warning" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300" :
                      (row.statusTones?.[cellIndex] ?? row.statusTone) === "danger" ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" :
                      (row.statusTones?.[cellIndex] ?? row.statusTone) === "info" ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300" :
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

function PreviewToolbar({ rows, t }: { rows: number; t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <ListFilter className="h-3.5 w-3.5" />
        {t("table.rowCount", { count: rows })}
      </span>
      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">CSV</span>
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">Excel</span>
        <span className="rounded-md border border-slate-200 px-2 py-1 dark:border-slate-700">Print</span>
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
  t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">>;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
          <Sparkles className="h-3.5 w-3.5" /> {t("table.sampleData")}
        </p>
      </div>
    </div>
  );
}

function MaintenanceDashboard({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const stats = [
    { label: t("metrics.equipment"), value: "10", note: t("metrics.assetsRegistered"), icon: Factory, tone: "text-emerald-600 dark:text-emerald-300" },
    { label: t("metrics.openWorkOrders"), value: "3", note: t("metrics.activeWork"), icon: ClipboardList, tone: "text-blue-600 dark:text-blue-300" },
    { label: t("metrics.pmDue"), value: "6", note: t("metrics.dueNext30Days"), icon: CalendarClock, tone: "text-amber-600 dark:text-amber-300" },
    { label: t("metrics.lowStock"), value: "2", note: t("metrics.reorderAlerts"), icon: Boxes, tone: "text-rose-600 dark:text-rose-300" },
    { label: t("metrics.downtime"), value: "13 h", note: t("metrics.thisMonth"), icon: Clock3, tone: "text-violet-600 dark:text-violet-300" },
    { label: t("metrics.calibrationDue"), value: "4", note: t("metrics.dueNext30Days"), icon: Gauge, tone: "text-cyan-600 dark:text-cyan-300" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
      className="relative mx-auto w-full max-w-[1050px]"
      aria-label={t("hero.previewAccessible")}
    >
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-200/50 via-transparent to-emerald-200/50 blur-3xl dark:from-indigo-500/10 dark:to-emerald-500/10" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_100px_-34px_rgba(30,41,59,0.42)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
              <Wrench className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{t("hero.previewTitle")}</p>
              <p className="mt-0.5 truncate text-[10px] text-slate-400">{t("hero.previewSubtitle")}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {t("table.demoBadge")}
          </span>
        </div>

        <div className="grid gap-3 bg-slate-50/80 p-4 dark:bg-slate-950/50 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-bold tracking-tight ${stat.tone}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.tone}`} />
              </div>
              <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">{stat.note}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-slate-100 p-4 dark:border-slate-800 sm:p-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t("hero.healthTitle")}</p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{t("hero.healthCaption")}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                <ArrowUpRight className="h-3.5 w-3.5" /> 80%
              </span>
            </div>
            <div className="mt-5 flex h-24 items-end gap-2" aria-label={t("hero.healthChartAccessible")}>
              {[43, 62, 54, 75, 67, 82, 71, 88, 79, 94, 83, 90].map((height, index) => (
                <div key={`${height}-${index}`} className="flex h-full flex-1 items-end">
                  <span className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-sky-400 opacity-90" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-slate-400">
              <span>{t("hero.chartStart")}</span><span>{t("hero.chartEnd")}</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{t("hero.workloadTitle")}</p>
              <BellRing className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: t("hero.workOrderOpen"), width: "45%", color: "bg-sky-500", amount: "3" },
                { label: t("hero.workOrderOverdue"), width: "24%", color: "bg-rose-500", amount: "1" },
                { label: t("hero.workOrderCompleted"), width: "76%", color: "bg-emerald-500", amount: "2" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex justify-between text-[10px]">
                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.amount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {t("hero.previewNote")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EquipmentPanel({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const [query, setQuery] = useState("");
  const columns = tableLabels(t, ["code", "equipment", "location", "criticality", "runningHours", "custodian", "status", "category"]);
  const rows = useMemo(() => {
    const search = query.trim().toLowerCase();
    return equipment
      .filter((record) => record.join(" ").toLowerCase().includes(search))
      .map((record) => ({
        cells: [record[0], record[1], record[2], valueLabel(t, record[3]), record[4], record[5], valueLabel(t, record[6]), valueLabel(t, record[7])],
        statusTone: getStatusTone(record[6]),
      }));
  }, [query, t]);

  return (
    <>
      <PanelIntro icon={Factory} title={t("tabs.equipment")} description={t("panels.equipment")} t={t} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 focus-within:ring-2 focus-within:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          <Search className="h-4 w-4 shrink-0" />
          <span className="sr-only">{t("table.searchEquipment")}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("table.searchEquipment")} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" />
        </label>
      </div>
      <PreviewToolbar rows={rows.length} t={t} />
      {rows.length ? (
        <DemoTable columns={columns} rows={rows} statusColumn={6} />
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">{t("table.noResults")}</p>
      )}
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" /> {t("panels.equipmentNote")}
      </p>
    </>
  );
}

function StaticTablePanel({
  t,
  panel,
  title,
  description,
  icon,
  columns,
  records,
  statusColumn,
  note,
}: {
  t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">>;
  panel: string;
  title: string;
  description: string;
  icon: LucideIcon;
  columns: string[];
  records: DemoRow[];
  statusColumn: number;
  note?: string;
}) {
  return (
    <>
      <PanelIntro icon={icon} title={title} description={description} t={t} />
      {panel === "schedules" && (
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: t("schedule.overdue"), value: "1", tone: "text-rose-600 dark:text-rose-300", icon: AlertTriangle },
            { label: t("schedule.upcoming"), value: "3", tone: "text-amber-600 dark:text-amber-300", icon: CalendarClock },
            { label: t("schedule.scheduled"), value: "2", tone: "text-emerald-600 dark:text-emerald-300", icon: BadgeCheck },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs text-slate-600 dark:text-slate-300">{item.label}</span>
              <span className={`inline-flex items-center gap-2 text-lg font-bold ${item.tone}`}><item.icon className="h-4 w-4" />{item.value}</span>
            </div>
          ))}
        </div>
      )}
      <PreviewToolbar rows={records.length} t={t} />
      <DemoTable columns={columns} rows={records} statusColumn={statusColumn} />
      {note && (
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs leading-5 text-indigo-900 dark:border-indigo-500/20 dark:bg-indigo-500/5 dark:text-indigo-200">
          <span className="font-bold">{t("table.workflowLabel")}</span> {note}
        </div>
      )}
    </>
  );
}

function SparePartsPanel({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const lowStock = parts.filter((part) => part.onHand <= part.reorder).length;
  const inventoryValue = parts.reduce((total, part) => total + part.onHand * part.unitCost, 0);
  const concepts = t.raw("parts.concepts") as Array<{ title: string; description: string }>;
  const rows = parts.map((part) => {
    const isLow = part.onHand <= part.reorder;
    return {
      cells: [
        part.code,
        part.name,
        part.uom,
        String(part.onHand),
        String(part.reorder),
        formatBDT(part.unitCost),
        formatBDT(part.onHand * part.unitCost),
        part.location,
        valueLabel(t, isLow ? "Low stock" : "In stock"),
      ],
      statusTone: isLow ? "warning" as const : "good" as const,
    };
  });

  return (
    <>
      <PanelIntro icon={Boxes} title={t("tabs.spareParts")} description={t("panels.spareParts")} t={t} />
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
          <p className="text-xs text-amber-800 dark:text-amber-200">{t("parts.lowStockMetric")}</p>
          <p className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-300">{lowStock} <span className="text-xs font-medium">{t("parts.items")}</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("parts.inventoryValue")}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatBDT(inventoryValue)}</p>
        </div>
      </div>
      <PreviewToolbar rows={rows.length} t={t} />
      <DemoTable
        columns={tableLabels(t, ["code", "part", "uom", "onHand", "reorderLevel", "unitCost", "inventoryValue", "storageLocation", "stockStatus"])}
        rows={rows}
        statusColumn={8}
      />
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{t("panels.partsNote")}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((concept, index) => {
          const Icon = partConceptIcons[index];
          return (
            <div key={concept.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/35">
              <div className="mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-300"><Icon className="h-4 w-4" /><span className="text-xs font-bold">{concept.title}</span></div>
              <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">{concept.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function DowntimePanel({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const totalHours = downtime.reduce((total, record) => total + Number(record[5].split(" ")[0]), 0);
  const mttr = totalHours / downtime.length;
  const failureCategories = Array.from(
    downtime.reduce((counts, record) => counts.set(record[3], (counts.get(record[3]) ?? 0) + 1), new Map<string, number>()),
  );
  const trend = [
    { month: t("downtime.aug"), value: 18 },
    { month: t("downtime.sep"), value: 11 },
    { month: t("downtime.oct"), value: totalHours },
  ];
  const columns = tableLabels(t, ["downtimeNumber", "equipment", "failureReason", "category", "startDate", "duration", "status"]);
  const rows = downtime.map((record) => ({
    cells: [record[0], record[1], record[2], valueLabel(t, record[3]), record[4], record[5], valueLabel(t, record[6])],
    statusTone: "good" as const,
  }));

  return (
    <>
      <PanelIntro icon={Activity} title={t("tabs.downtime")} description={t("panels.downtime")} t={t} />
      <div className="mb-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("downtime.trendTitle")}</h4>
              <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{t("downtime.trendCaption")}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t("table.demoBadge")}</span>
          </div>
          <div className="mt-5 flex h-32 items-end justify-around gap-4 border-b border-slate-200 dark:border-slate-700">
            {trend.map((item) => (
              <div key={item.month} className="flex h-full w-1/4 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{item.value} h</span>
                <div className="w-full max-w-16 rounded-t-lg bg-gradient-to-t from-indigo-600 to-sky-400" style={{ height: `${Math.max(14, (item.value / 20) * 78)}%` }} />
                <span className="mb-2 text-[10px] text-slate-500 dark:text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{t("downtime.unplannedLabel")}: {totalHours} h</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t("downtime.plannedLabel")}: 0 h</span>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <p className="mb-2 text-[10px] font-bold text-slate-700 dark:text-slate-200">{t("downtime.failureCategories")}</p>
            <div className="flex flex-wrap gap-2">
              {failureCategories.map(([category, count]) => (
                <span key={category} className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {valueLabel(t, category)} · {count}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t("downtime.availability")}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">99.8%</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{t("downtime.availabilityNote")}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t("downtime.mttr")}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{mttr.toFixed(1)} h</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{t("downtime.mttrNote", { count: downtime.length })}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t("downtime.mtbf")}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,800 h</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{t("downtime.mtbfNote")}</p>
          </div>
        </div>
      </div>
      <PreviewToolbar rows={rows.length} t={t} />
      <DemoTable columns={columns} rows={rows} statusColumn={6} />
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{t("downtime.calculationNote", { hours: totalHours })}</p>
    </>
  );
}

function WorkOrderHistory({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const history = t.raw("workOrders.history") as Array<{ date: string; title: string; detail: string }>;

  return (
    <section className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("workOrders.historyTitle")}</h4>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {history.map((event, index) => (
          <div key={event.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                {index === history.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
              </span>
              {index < history.length - 1 && <span className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-700 sm:hidden" />}
            </div>
            <div>
              <p className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">{event.date}</p>
              <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white">{event.title}</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-amber-700 dark:text-amber-300">{t("table.sampleData")} · {t("table.previewOnly")}</p>
    </section>
  );
}

function CalibrationPanel({ t }: { t: ReturnType<typeof useTranslations<"pages.engineeringMaintenance">> }) {
  const columns = tableLabels(t, ["calibrationNumber", "instrument", "calibrationDate", "nextDueDate", "certificate", "result", "cost", "calibrationStatus"]);
  const rows = calibrations.map((record) => ({
    cells: [record[0], record[1], record[2], record[3], record[4], valueLabel(t, record[5]), record[6], valueLabel(t, record[7])],
    statusTone: getStatusTone(record[7]),
    statusTones: {
      5: getStatusTone(record[5]),
      7: getStatusTone(record[7]),
    },
  }));

  return (
    <>
      <PanelIntro icon={Gauge} title={t("tabs.calibration")} description={t("panels.calibration")} t={t} />
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50/70 px-4 py-3 text-xs text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/5 dark:text-cyan-100">
        <CalendarDays className="h-4 w-4 shrink-0" />
        <span className="font-bold">{t("calibration.upcomingTitle")}</span>
        <span>{t("calibration.upcomingDescription")}</span>
      </div>
      <PreviewToolbar rows={rows.length} t={t} />
      <DemoTable columns={columns} rows={rows} statusColumn={[5, 7]} />
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{t("calibration.note")}</p>
    </>
  );
}

export default function EngineeringMaintenanceShowcase() {
  const t = useTranslations("pages.engineeringMaintenance");
  const features = t.raw("features.items") as Array<{ title: string; description: string }>;
  const benefits = t.raw("benefits.items") as Array<{ title: string; description: string }>;
  const industries = t.raw("industries.items") as Array<{ title: string; description: string }>;
  const workflow = t.raw("workflow.steps") as Array<{ title: string; description: string }>;
  const tabs = ["equipment", "schedules", "workOrders", "spareParts", "downtime", "calibration"] as const;
  const tabLabels = t.raw("tabs") as Record<string, string>;
  const table = (keys: string[]) => tableLabels(t, keys);
  const tabIcons: LucideIcon[] = [Factory, CalendarClock, ClipboardList, Boxes, Activity, Gauge];

  const workOrderRows = workOrders.map((record) => ({
    cells: [record[0], record[1], record[2], valueLabel(t, record[3]), valueLabel(t, record[4]), record[5], valueLabel(t, record[6]), record[7]],
    statusTone: getStatusTone(record[6]),
  }));

  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-12 pt-14 dark:from-slate-900/70 dark:via-slate-950 dark:to-slate-950 sm:pt-20">
        <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute -right-32 top-32 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-slate-900/80 dark:text-indigo-300">
              <HardHat className="h-4 w-4" /> {t("hero.eyebrow")}
            </div>
            <ShowcaseHeading as="h1" className="text-4xl leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t("hero.title")} <ShowcaseHighlight className="text-indigo-600 dark:text-indigo-300">{t("hero.titleHighlight")}</ShowcaseHighlight>
            </ShowcaseHeading>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{t("hero.description")}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                {t("hero.primaryCta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#maintenance-preview" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300">
                {t("hero.secondaryCta")} <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{t("hero.sampleNotice")}</p>
          </div>
          <MaintenanceDashboard t={t} />
        </div>
      </section>

      <section id="features" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">{t("features.eyebrow")}</p>
            <ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("features.title")}</ShowcaseHeading>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("features.description")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.04 }} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="maintenance-preview" className="scroll-mt-24 bg-slate-50 py-16 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">{t("showcase.eyebrow")}</p>
            <ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("showcase.title")}</ShowcaseHeading>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("showcase.description")}</p>
          </div>

          <Tabs defaultValue="equipment" className="w-full">
            <div className="mb-5 overflow-x-auto pb-2">
              <TabsList aria-label={t("showcase.tabsLabel")} className="h-auto min-w-max gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                {tabs.map((tab, index) => {
                  const Icon = tabIcons[index];
                  return (
                    <TabsTrigger key={tab} value={tab} className="h-10 gap-2 rounded-lg px-3 text-xs font-semibold text-slate-600 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm dark:text-slate-300 dark:data-[state=active]:bg-indigo-500 sm:px-4 sm:text-sm">
                      <Icon className="h-4 w-4" /> {tabLabels[tab]}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-7">
              <TabsContent value="equipment"><EquipmentPanel t={t} /></TabsContent>
              <TabsContent value="schedules">
                <StaticTablePanel
                  t={t}
                  panel="schedules"
                  title={t("tabs.schedules")}
                  description={t("panels.schedules")}
                  icon={CalendarClock}
                  columns={table(["code", "schedule", "equipment", "type", "frequency", "nextDue", "status"])}
                  records={pmSchedules.map((record) => ({
                    cells: [record[0], record[1], record[2], valueLabel(t, record[3]), valueLabel(t, record[4]), record[5], valueLabel(t, record[6])],
                    statusTone: getStatusTone(record[6]),
                  }))}
                  statusColumn={6}
                  note={t("schedule.workflow")}
                />
              </TabsContent>
              <TabsContent value="workOrders">
                <>
                  <StaticTablePanel
                    t={t}
                    panel="workOrders"
                    title={t("tabs.workOrders")}
                    description={t("panels.workOrders")}
                    icon={ClipboardList}
                    columns={table(["workOrderNumber", "title", "equipment", "type", "priority", "estimatedCost", "status", "technician"])}
                    records={workOrderRows}
                    statusColumn={6}
                    note={t("workOrders.workflow")}
                  />
                  <WorkOrderHistory t={t} />
                </>
              </TabsContent>
              <TabsContent value="spareParts"><SparePartsPanel t={t} /></TabsContent>
              <TabsContent value="downtime"><DowntimePanel t={t} /></TabsContent>
              <TabsContent value="calibration"><CalibrationPanel t={t} /></TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">{t("workflow.eyebrow")}</p>
              <ShowcaseHeading as="h2" className="text-3xl leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("workflow.title")}</ShowcaseHeading>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("workflow.description")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {workflow.map((step, index) => (
                <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">0{index + 1}</span>
                    {index < workflow.length - 1 && <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">{t("benefits.eyebrow")}</p>
            <ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("benefits.title")}</ShowcaseHeading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <div key={benefit.title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><Icon className="h-4 w-4" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">{t("industries.eyebrow")}</p>
              <ShowcaseHeading as="h2" className="text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("industries.title")}</ShowcaseHeading>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t("industries.description")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry.title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><Factory className="h-4 w-4" /></div>
                  <div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{industry.title}</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{industry.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-600 px-6 py-10 text-center text-white shadow-xl shadow-indigo-900/15 sm:px-12 sm:py-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">{t("cta.eyebrow")}</p>
          <ShowcaseHeading as="h2" className="text-3xl tracking-tight text-white sm:text-4xl">{t("cta.title")} <ShowcaseHighlight className="text-amber-200">{t("cta.titleHighlight")}</ShowcaseHighlight></ShowcaseHeading>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100">{t("cta.description")}</p>
          <Link href="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600">
            {t("cta.button")} <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-[11px] text-indigo-100">{t("cta.note")}</p>
        </div>
      </section>
    </main>
  );
}
