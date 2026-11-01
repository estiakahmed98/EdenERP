"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Database,
  Download,
  FileJson2,
  FileSpreadsheet,
  FileText,
  Gauge,
  Layers3,
  LineChart as LineChartIcon,
  Package,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

type ReportRow = {
  code: string;
  name: string;
  debit: number;
  credit: number;
};

type Department = {
  name: string;
  employees: number;
  payroll: number;
  color: string;
};

type DemandProduct = {
  code: string;
  name: string;
  share: number;
  stock: number;
  leadTime: number;
  safetyStock: number;
};

const REPORTS: ReportRow[][] = [
  [
    { code: "1000", name: "Cash and cash equivalents", debit: 52_500_000, credit: 0 },
    { code: "1100", name: "Accounts receivable", debit: 26_850_000, credit: 0 },
    { code: "1200", name: "Inventory", debit: 39_000_000, credit: 0 },
    { code: "1600", name: "Property and equipment, net", debit: 121_650_000, credit: 0 },
    { code: "2000", name: "Accounts payable", debit: 0, credit: 18_175_000 },
    { code: "2100", name: "Accrued liabilities", debit: 0, credit: 73_825_000 },
    { code: "3000", name: "Contributed capital and retained earnings", debit: 0, credit: 128_740_000 },
    { code: "4000", name: "Revenue", debit: 0, credit: 128_400_000 },
    { code: "5000", name: "Cost of sales", debit: 77_040_000, credit: 0 },
    { code: "6000", name: "Operating expenses", debit: 32_100_000, credit: 0 },
  ],
  [
    { code: "1000", name: "Cash and cash equivalents", debit: 52_500_000, credit: 0 },
    { code: "1100", name: "Accounts receivable", debit: 26_850_000, credit: 0 },
    { code: "1200", name: "Inventory", debit: 39_000_000, credit: 0 },
    { code: "1600", name: "Property and equipment, net", debit: 121_650_000, credit: 0 },
    { code: "2000", name: "Total liabilities", debit: 0, credit: 92_000_000 },
    { code: "3000", name: "Total equity", debit: 0, credit: 148_000_000 },
  ],
  [
    { code: "4000", name: "Revenue", debit: 0, credit: 128_400_000 },
    { code: "5000", name: "Cost of sales", debit: 77_040_000, credit: 0 },
    { code: "6000", name: "Operating expenses", debit: 32_100_000, credit: 0 },
  ],
  [
    { code: "CF-01", name: "Net cash from operating activities", debit: 23_500_000, credit: 0 },
    { code: "CF-02", name: "Net cash used in investing activities", debit: 0, credit: 6_000_000 },
    { code: "CF-03", name: "Net cash used in financing activities", debit: 0, credit: 4_000_000 },
    { code: "CF-04", name: "Net increase in cash", debit: 13_500_000, credit: 0 },
  ],
  [
    { code: "1000", name: "Opening balance — cash", debit: 39_000_000, credit: 0 },
    { code: "1010", name: "Operating receipts", debit: 23_500_000, credit: 0 },
    { code: "1020", name: "Investing payments", debit: 0, credit: 6_000_000 },
    { code: "1030", name: "Financing payments", debit: 0, credit: 4_000_000 },
    { code: "1040", name: "Closing balance — cash", debit: 52_500_000, credit: 0 },
  ],
  [
    { code: "C-104", name: "Northstar Trading", debit: 9_850_000, credit: 0 },
    { code: "C-218", name: "Meridian Retail Group", debit: 8_200_000, credit: 0 },
    { code: "C-307", name: "Harborline Stores", debit: 8_800_000, credit: 0 },
  ],
  [
    { code: "V-031", name: "Eastern Supply Co.", debit: 0, credit: 6_250_000 },
    { code: "V-046", name: "Summit Components", debit: 0, credit: 4_825_000 },
    { code: "V-089", name: "Riverbend Wholesale", debit: 0, credit: 7_100_000 },
  ],
  [
    { code: "P-100", name: "Core product line", debit: 0, credit: 42_000_000 },
    { code: "P-210", name: "Business essentials", debit: 0, credit: 36_500_000 },
    { code: "P-330", name: "Hardware range", debit: 0, credit: 29_000_000 },
    { code: "P-410", name: "Services and support", debit: 0, credit: 20_900_000 },
  ],
  [
    { code: "P-100", name: "Core product line", debit: 28_000_000, credit: 0 },
    { code: "P-210", name: "Business essentials", debit: 22_000_000, credit: 0 },
    { code: "P-330", name: "Hardware range", debit: 16_000_000, credit: 0 },
    { code: "P-410", name: "Services and support", debit: 11_040_000, credit: 0 },
  ],
  [
    { code: "P-100", name: "Core product line", debit: 14_000_000, credit: 0 },
    { code: "P-210", name: "Business essentials", debit: 14_500_000, credit: 0 },
    { code: "P-330", name: "Hardware range", debit: 13_000_000, credit: 0 },
    { code: "P-410", name: "Services and support", debit: 9_860_000, credit: 0 },
  ],
  [
    { code: "P-100", name: "Core product line", debit: 14_500_000, credit: 0 },
    { code: "P-210", name: "Business essentials", debit: 11_250_000, credit: 0 },
    { code: "P-330", name: "Hardware range", debit: 8_750_000, credit: 0 },
    { code: "P-410", name: "Services and support", debit: 4_500_000, credit: 0 },
  ],
];

const DEPARTMENTS: Department[] = [
  { name: "Operations", employees: 96, payroll: 4_200_000, color: "#0f9f76" },
  { name: "Sales", employees: 62, payroll: 2_800_000, color: "#4f46e5" },
  { name: "Finance", employees: 43, payroll: 1_856_000, color: "#0284c7" },
  { name: "People", employees: 47, payroll: 1_560_000, color: "#d97706" },
];

const MONTHLY_DEMAND = [420, 390, 440, 460, 415, 480, 500, 465, 520, 510, 550, 565];
const DEMAND_PRODUCTS: DemandProduct[] = [
  { code: "SKU-100", name: "Core product line", share: 0.3, stock: 420, leadTime: 1, safetyStock: 40 },
  { code: "SKU-210", name: "Business essentials", share: 0.24, stock: 100, leadTime: 1, safetyStock: 20 },
  { code: "SKU-330", name: "Hardware range", share: 0.18, stock: 600, leadTime: 1, safetyStock: 25 },
  { code: "SKU-410", name: "Service kits", share: 0.12, stock: 65, leadTime: 1, safetyStock: 20 },
  { code: "SKU-520", name: "Office supplies", share: 0.1, stock: 500, leadTime: 1, safetyStock: 15 },
  { code: "SKU-630", name: "Accessories", share: 0.06, stock: 15, leadTime: 1, safetyStock: 10 },
];

function allocateDemand(total: number) {
  let allocated = 0;
  return DEMAND_PRODUCTS.map((product, index) => {
    if (index === DEMAND_PRODUCTS.length - 1) return total - allocated;
    const units = Math.round(total * product.share);
    allocated += units;
    return units;
  });
}

function forecastProductDemand(index: number, history: number[], windowSize: number) {
  const productHistory = history.map((total) => allocateDemand(total)[index]);
  const window = productHistory.slice(-Math.min(windowSize, productHistory.length));
  return Math.round(window.reduce((sum, units) => sum + units, 0) / window.length);
}

const MONTHLY_CASH_FLOW = [
  { month: "May", operating: 18_200_000, investing: -4_600_000, financing: -3_100_000 },
  { month: "Jun", operating: 19_600_000, investing: -5_200_000, financing: -3_500_000 },
  { month: "Jul", operating: 20_100_000, investing: -4_800_000, financing: -3_700_000 },
  { month: "Aug", operating: 21_300_000, investing: -5_600_000, financing: -3_800_000 },
  { month: "Sep", operating: 22_400_000, investing: -5_500_000, financing: -3_900_000 },
  { month: "Oct", operating: 23_500_000, investing: -6_000_000, financing: -4_000_000 },
];

const PIPELINE = [
  { stage: "Discovery", amount: 4_800_000, color: "#0ea5e9" },
  { stage: "Qualified", amount: 3_900_000, color: "#6366f1" },
  { stage: "Proposal", amount: 2_850_000, color: "#8b5cf6" },
  { stage: "Negotiation", amount: 1_950_000, color: "#10b981" },
];

const WORKFLOW_ICONS: LucideIcon[] = [
  Database,
  FileText,
  LineChartIcon,
  TrendingUp,
  BriefcaseBusiness,
];

const BENEFIT_ICONS: LucideIcon[] = [
  Gauge,
  CircleDollarSign,
  Activity,
  UsersRound,
  Package,
  ShieldCheck,
];

const MONEY_FORMAT = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function money(value: number) {
  return `BDT ${MONEY_FORMAT.format(value)}`;
}

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function SampleBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

function PanelHeading({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <SampleBadge>{badge}</SampleBadge>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
  tone: "emerald" | "blue" | "violet" | "amber";
}) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    blue: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
    violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  };
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 break-words text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">{value}</p>
      {detail && <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">{detail}</p>}
    </article>
  );
}

function ChartCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 ${className}`}>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
      <div className="mt-4 h-64 min-w-0 sm:h-72">{children}</div>
    </section>
  );
}

function ExecutiveDashboard({ t }: { t: ReturnType<typeof useTranslations<"pages.analytics">> }) {
  const kpiLabels = t.raw("dashboard.kpiLabels") as string[];
  const chartMonths = t.raw("dashboard.chartMonths") as string[];
  const currencyAxis = (value: number) => `${Math.round(value / 1_000_000)}M`;
  const pnlData = [
    { name: t("dashboard.pnlLabels.revenue"), amount: 128_400_000 },
    { name: t("dashboard.pnlLabels.grossProfit"), amount: 51_360_000 },
    { name: t("dashboard.pnlLabels.netIncome"), amount: 19_260_000 },
  ];
  const positionData = [
    { name: t("dashboard.positionLabels.assets"), amount: 240_000_000, color: "#0ea5e9" },
    { name: t("dashboard.positionLabels.liabilities"), amount: 92_000_000, color: "#f43f5e" },
    { name: t("dashboard.positionLabels.equity"), amount: 148_000_000, color: "#10b981" },
  ];
  const revenueData = [
    { revenue: 9_800_000, target: 9_400_000 },
    { revenue: 10_400_000, target: 10_000_000 },
    { revenue: 10_100_000, target: 10_200_000 },
    { revenue: 10_900_000, target: 10_500_000 },
    { revenue: 11_100_000, target: 10_800_000 },
    { revenue: 11_600_000, target: 11_000_000 },
  ].map((item, index) => ({ ...item, month: chartMonths[index] }));
  const cashFlowData = MONTHLY_CASH_FLOW.map((item, index) => ({
    ...item,
    month: chartMonths[index],
  }));
  const kpis = [
    { value: money(128_400_000), icon: CircleDollarSign, tone: "emerald" as const },
    { value: money(19_260_000), icon: TrendingUp, tone: "emerald" as const },
    { value: money(52_500_000), icon: Wallet, tone: "blue" as const },
    { value: money(39_000_000), icon: Package, tone: "violet" as const },
    { value: money(26_850_000), icon: ArrowDownRight, tone: "amber" as const, detail: t("dashboard.overdueReceivables") },
    { value: money(18_175_000), icon: ArrowUpRight, tone: "amber" as const },
    { value: money(13_500_000), icon: BarChart3, tone: "violet" as const, detail: t("dashboard.weightedPipeline") },
    { value: "24", icon: Check, tone: "emerald" as const, detail: t("dashboard.wonDealsDetail") },
    { value: "248", icon: UsersRound, tone: "blue" as const },
    { value: "18", icon: BriefcaseBusiness, tone: "violet" as const },
  ];
  const departmentRows = [
    { name: "Operations", spend: 34_500_000, budget: 40_000_000 },
    { name: "Sales", spend: 27_800_000, budget: 31_500_000 },
    { name: "Finance", spend: 18_600_000, budget: 22_000_000 },
    { name: "People", spend: 12_400_000, budget: 15_000_000 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t("dashboard.periodLabel")} <strong className="font-semibold text-slate-900 dark:text-white">{t("dashboard.period")}</strong>
        </p>
        <SampleBadge>{t("shared.demoData")}</SampleBadge>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, index) => (
          <StatCard
            key={kpiLabels[index]}
            label={kpiLabels[index]}
            value={kpi.value}
            detail={kpi.detail}
            icon={kpi.icon}
            tone={kpi.tone}
          />
        ))}
      </div>
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <ChartCard title={t("dashboard.pnlTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pnlData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tickFormatter={currencyAxis} tick={{ fontSize: 11 }} width={42} />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {pnlData.map((item, index) => (
                  <Cell key={item.name} fill={["#0f9f76", "#0ea5e9", "#6366f1"][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t("dashboard.positionTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={positionData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={currencyAxis} tick={{ fontSize: 11 }} width={42} />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {positionData.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t("dashboard.revenueTrendTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={currencyAxis} tick={{ fontSize: 11 }} width={42} />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Area type="monotone" dataKey="revenue" name={t("dashboard.actualRevenue")} stroke="#0f9f76" fill="#10b981" fillOpacity={0.14} strokeWidth={2.5} />
              <Line type="monotone" dataKey="target" name={t("dashboard.targetRevenue")} stroke="#6366f1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t("dashboard.cashFlowTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={currencyAxis} tick={{ fontSize: 11 }} width={42} />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Bar dataKey="operating" name={t("dashboard.operatingCash")} fill="#0f9f76" radius={[4, 4, 0, 0]} />
              <Bar dataKey="investing" name={t("dashboard.investingCash")} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="financing" name={t("dashboard.financingCash")} fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t("dashboard.pipelineTitle")}</h3>
            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">{money(13_500_000)}</span>
          </div>
          <div className="mt-5 space-y-4">
            {PIPELINE.map((stage) => (
              <div key={stage.stage}>
                <div className="mb-1.5 flex justify-between gap-3 text-xs">
                  <span className="text-slate-600 dark:text-slate-300">{stage.stage}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{money(stage.amount)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full" style={{ width: `${(stage.amount / 13_500_000) * 100}%`, backgroundColor: stage.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t("dashboard.departmentTitle")}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">{t("dashboard.budgetUsage")}</span>
          </div>
          <div className="mt-4 space-y-4">
            {departmentRows.map((department) => {
              const percent = Math.round((department.spend / department.budget) * 100);
              return (
                <div key={department.name}>
                  <div className="mb-1.5 flex justify-between gap-3 text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{department.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">{percent}% · {money(department.spend)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function FinancialReports({ t }: { t: ReturnType<typeof useTranslations<"pages.analytics">> }) {
  const categories = t.raw("reports.categories") as string[];
  const [selectedReport, setSelectedReport] = useState(0);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof ReportRow>("code");
  const [ascending, setAscending] = useState(true);
  const [notice, setNotice] = useState("");
  const reportRows = REPORTS[selectedReport] ?? REPORTS[0];
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...reportRows]
      .filter((row) => `${row.code} ${row.name}`.toLowerCase().includes(query))
      .sort((left, right) => {
        const a = left[sortKey];
        const b = right[sortKey];
        const order = typeof a === "string" && typeof b === "string"
          ? a.localeCompare(b)
          : Number(a) - Number(b);
        return ascending ? order : -order;
      });
  }, [ascending, reportRows, search, sortKey]);
  const headers = [
    { key: "code" as const, label: t("reports.accountCode") },
    { key: "name" as const, label: t("reports.accountName") },
    { key: "debit" as const, label: t("reports.debit") },
    { key: "credit" as const, label: t("reports.credit") },
  ];
  const totalDebit = reportRows.reduce((total, row) => total + row.debit, 0);
  const totalCredit = reportRows.reduce((total, row) => total + row.credit, 0);

  function showAction(action: string) {
    setNotice(t("reports.previewAction", { action }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{t("reports.title")}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("reports.description")}</p>
      </div>
      <div className="flex max-w-full gap-2 overflow-x-auto pb-2" role="group" aria-label={t("reports.categoriesLabel")}>
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedReport === index}
            onClick={() => { setSelectedReport(index); setNotice(""); }}
            className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              selectedReport === index
                ? "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-slate-950"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-emerald-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <PanelHeading title={categories[selectedReport]} description={t("reports.previewDescription")} badge={t("shared.demoData")} />
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full min-w-0 lg:max-w-sm">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("reports.searchPlaceholder")}
                aria-label={t("reports.searchPlaceholder")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 ps-9 pe-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="me-1 text-xs text-slate-500 dark:text-slate-400">{t("reports.rowCount", { count: filteredRows.length })}</span>
              {[
                { label: t("shared.csv"), icon: Download },
                { label: t("shared.excel"), icon: FileSpreadsheet },
                { label: t("shared.print"), icon: Printer },
              ].map(({ label, icon: Icon }) => (
                <button key={label} type="button" onClick={() => showAction(label)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-300">
                  <Icon className="h-3.5 w-3.5" />{label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[690px] border-collapse text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  {headers.map((header) => (
                    <th key={header.key} scope="col" className={`border-b border-slate-200 px-4 py-3 font-bold dark:border-slate-800 ${header.key === "debit" || header.key === "credit" ? "text-right" : ""}`}>
                      <button type="button" className="inline-flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-300" onClick={() => { if (sortKey === header.key) setAscending(!ascending); else { setSortKey(header.key); setAscending(true); } }}>
                        {header.label}<ChevronDown className={`h-3 w-3 transition-transform ${sortKey === header.key && !ascending ? "rotate-180" : ""}`} />
                      </button>
                    </th>
                  ))}
                  <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right font-bold dark:border-slate-800">{t("reports.currency")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={`${row.code}-${row.name}`} className="border-b border-slate-100 last:border-b-0 odd:bg-white even:bg-slate-50/80 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-950/60">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-slate-300">{row.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-emerald-700 dark:text-emerald-300">{row.debit ? money(row.debit) : "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-rose-600 dark:text-rose-300">{row.credit ? money(row.credit) : "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-slate-500 dark:text-slate-400">BDT</td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500 dark:text-slate-400">{t("reports.noRows")}</td></tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 font-bold text-slate-900 dark:bg-slate-950 dark:text-white">
                <tr>
                  <td colSpan={2} className="px-4 py-3">{t("reports.total")}</td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-700 dark:text-emerald-300">{money(totalDebit)}</td>
                  <td className="px-4 py-3 text-right font-mono text-rose-600 dark:text-rose-300">{money(totalCredit)}</td>
                  <td className="px-4 py-3 text-right">BDT</td>
                </tr>
              </tfoot>
            </table>
          </div>
          {notice && <p role="status" className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">{notice}</p>}
          <p className="mt-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
            {selectedReport === 0
              ? t("reports.balanceCheck", { debit: money(totalDebit), credit: money(totalCredit) })
              : t("reports.contextNote")}
          </p>
        </div>
      </section>
    </div>
  );
}

function HrReports({ t }: { t: ReturnType<typeof useTranslations<"pages.analytics">> }) {
  const categories = t.raw("hr.categories") as string[];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const salaryTotal = DEPARTMENTS.reduce((sum, department) => sum + department.payroll, 0);
  const chartMonths = t.raw("dashboard.chartMonths") as string[];
  const chartData = [
    9_780_000, 9_940_000, 10_020_000, 10_180_000, 10_280_000, salaryTotal,
  ].map((payroll, index) => ({ month: chartMonths[index], payroll }));
  const projectCosts = [
    { project: "ERP modernization", owner: "Technology", cost: 4_200_000, percent: 84 },
    { project: "Regional expansion", owner: "Operations", cost: 3_250_000, percent: 72 },
    { project: "Customer portal", owner: "Product", cost: 2_890_000, percent: 61 },
    { project: "Workforce enablement", owner: "People", cost: 2_500_000, percent: 48 },
  ];
  const moneyAxis = (value: number) => `${Math.round(value / 1_000_000)}M`;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{t("hr.title")}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("hr.description")}</p>
      </div>
      <div className="flex max-w-full gap-2 overflow-x-auto pb-2" role="group" aria-label={t("hr.categoriesLabel")}>
        {categories.map((category, index) => (
          <button key={category} type="button" aria-pressed={selectedCategory === index} onClick={() => setSelectedCategory(index)} className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${selectedCategory === index ? "border-sky-700 bg-sky-700 text-white dark:border-sky-500 dark:bg-sky-500 dark:text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("hr.employeeHeadcount")} value="248" detail={t("hr.employeeMetric")} icon={UsersRound} tone="blue" />
        <StatCard label={t("hr.monthlyPayroll")} value={money(salaryTotal)} detail={t("hr.payrollMetric")} icon={Wallet} tone="emerald" />
        <StatCard label={t("hr.projectCosts")} value={money(12_840_000)} detail={t("hr.projectCostMetric")} icon={BriefcaseBusiness} tone="violet" />
        <StatCard label={t("hr.averageSalary")} value={money(Math.round(salaryTotal / 248))} detail={t("hr.averageSalaryMetric")} icon={CircleDollarSign} tone="amber" />
        <StatCard label={t("hr.pfStatement")} value={money(520_800)} detail={t("hr.liabilitySample")} icon={ShieldCheck} tone="blue" />
        <StatCard label={t("hr.gratuityLiability")} value={money(31_240_000)} detail={t("hr.liabilitySample")} icon={Wallet} tone="violet" />
        <StatCard label={t("hr.leaveLiability")} value={money(7_900_000)} detail={t("hr.liabilitySample")} icon={CalendarDays} tone="amber" />
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <CalendarDays className="h-4 w-4 text-slate-400" />{t("hr.reportingPeriod")}
            <select defaultValue="2026-10" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              <option value="2026-10">{t("hr.periodOct")}</option>
              <option value="2026-09">{t("hr.periodSep")}</option>
              <option value="2026-08">{t("hr.periodAug")}</option>
            </select>
          </label>
          <SampleBadge>{t("shared.demoData")}</SampleBadge>
          <span className="text-xs text-slate-500 dark:text-slate-400">{t("hr.selectedCategory", { category: categories[selectedCategory] })}</span>
        </div>
      </section>
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <ChartCard title={t("hr.payrollTrendTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={moneyAxis} tick={{ fontSize: 11 }} width={42} />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Area type="monotone" dataKey="payroll" name={t("hr.monthlyPayroll")} stroke="#0284c7" fill="#38bdf8" fillOpacity={0.16} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t("hr.departmentSummary")}</h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{t("hr.samplePeriod")}</span>
          </div>
          <div className="mt-4 space-y-4">
            {DEPARTMENTS.map((department) => (
              <div key={department.name}>
                <div className="mb-1.5 flex justify-between gap-2 text-xs">
                  <span className="text-slate-600 dark:text-slate-300">{department.name} <span className="text-slate-400">· {department.employees}</span></span>
                  <span className="font-semibold text-slate-900 dark:text-white">{money(department.payroll)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full" style={{ width: `${(department.payroll / salaryTotal) * 100}%`, backgroundColor: department.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <PanelHeading title={t("hr.projectCostSummary")} description={t("hr.projectCostDescription")} badge={t("shared.demoData")} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3">{t("hr.project")}</th>
                <th scope="col" className="px-4 py-3">{t("hr.department")}</th>
                <th scope="col" className="px-4 py-3 text-right">{t("hr.actualCost")}</th>
                <th scope="col" className="px-4 py-3">{t("hr.allocationUsed")}</th>
              </tr>
            </thead>
            <tbody>
              {projectCosts.map((row) => (
                <tr key={row.project} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-950/60">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{row.project}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.owner}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-900 dark:text-white">{money(row.cost)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-sky-500" style={{ width: `${row.percent}%` }} /></div><span className="text-slate-500 dark:text-slate-400">{row.percent}%</span></div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
              <tr><td colSpan={2} className="px-4 py-3">{t("hr.totalProjectCost")}</td><td className="px-4 py-3 text-right font-mono">{money(projectCosts.reduce((sum, row) => sum + row.cost, 0))}</td><td className="px-4 py-3 text-slate-500 dark:text-slate-400">{t("hr.portfolioTotal")}</td></tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}

function DemandForecast({ t }: { t: ReturnType<typeof useTranslations<"pages.analytics">> }) {
  const months = t.raw("forecast.months") as string[];
  const [historyMonths, setHistoryMonths] = useState(12);
  const [horizon, setHorizon] = useState(3);
  const [windowSize, setWindowSize] = useState(3);
  const [method, setMethod] = useState("moving-average");
  const chartData = useMemo(() => {
    const historyCount = Math.min(historyMonths, MONTHLY_DEMAND.length);
    const historyStart = MONTHLY_DEMAND.length - historyCount;
    const actualValues = MONTHLY_DEMAND.slice(historyStart);
    const avgWindow = actualValues.slice(-Math.min(windowSize, actualValues.length));
    const average = avgWindow.reduce((sum, value) => sum + value, 0) / avgWindow.length;
    const actualPoints = actualValues.map((actual, index) => ({
      period: months[historyStart + index],
      actual,
      forecast: null as number | null,
    }));
    const forecastPoints = Array.from({ length: horizon }, (_, index) => ({
      period: t("forecast.futurePeriod", { number: index + 1 }),
      actual: null as number | null,
      forecast: Math.round(average),
    }));
    return { points: [...actualPoints, ...forecastPoints], average: Math.round(average), actualValues };
  }, [historyMonths, horizon, months, t, windowSize]);
  const productRows = useMemo(() => DEMAND_PRODUCTS.map((product, index) => {
    const nextDemand = forecastProductDemand(index, chartData.actualValues, windowSize);
    const suggestedReorder = Math.max(0, Math.ceil(nextDemand * product.leadTime + product.safetyStock - product.stock));
    return { ...product, nextDemand, suggestedReorder };
  }), [chartData, windowSize]);
  const reorderRows = productRows.filter((item) => item.suggestedReorder > 0);
  const nextThreeDemand = chartData.average * horizon;
  const axisFormat = (value: number) => `${value}`;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{t("forecast.title")}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("forecast.description")}</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
        <strong>{t("forecast.illustrativeLabel")}</strong> {t("forecast.illustrativeNote")}
      </div>
      <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-4 sm:p-5">
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("forecast.method")}
          <select value={method} onChange={(event) => setMethod(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="moving-average">{t("forecast.movingAverage")}</option>
          </select>
        </label>
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("forecast.historyMonths")}
          <input type="number" min={3} max={12} value={historyMonths} onChange={(event) => setHistoryMonths(Math.min(12, Math.max(3, Number(event.target.value) || 3)))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("forecast.horizon")}
          <input type="number" min={1} max={6} value={horizon} onChange={(event) => setHorizon(Math.min(6, Math.max(1, Number(event.target.value) || 1)))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("forecast.averageWindow")}
          <input type="number" min={1} max={6} value={windowSize} onChange={(event) => setWindowSize(Math.min(6, Math.max(1, Number(event.target.value) || 1)))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
      </section>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label={t("forecast.itemsWithSales")} value={String(productRows.length)} icon={Package} tone="blue" />
        <StatCard label={t("forecast.nextMonthDemand")} value={`${chartData.average} ${t("forecast.units")}`} detail={t("forecast.calculatedFrom", { count: Math.min(windowSize, chartData.actualValues.length) })} icon={TrendingUp} tone="violet" />
        <StatCard label={t("forecast.horizonDemand", { count: horizon })} value={`${nextThreeDemand.toLocaleString()} ${t("forecast.units")}`} detail={t("forecast.movingAverageEstimate")} icon={Activity} tone="emerald" />
      </div>
      <ChartCard title={t("forecast.chartTitle")}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData.points} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
            <XAxis dataKey="period" tick={{ fontSize: 10 }} interval={0} />
            <YAxis tickFormatter={axisFormat} tick={{ fontSize: 11 }} width={38} />
            <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ${t("forecast.units")}`} />
            <Bar dataKey="actual" name={t("forecast.actualSales")} fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="forecast" name={t("forecast.forecastSeries")} stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <PanelHeading title={t("forecast.reorderTitle")} description={t("forecast.reorderDescription")} badge={t("shared.demoData")} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3">{t("forecast.product")}</th>
                <th scope="col" className="px-4 py-3 text-right">{t("forecast.onHand")}</th>
                <th scope="col" className="px-4 py-3 text-right">{t("forecast.nextMonthDemand")}</th>
                <th scope="col" className="px-4 py-3 text-right">{t("forecast.reorderQty")}</th>
                <th scope="col" className="px-4 py-3">{t("forecast.status")}</th>
              </tr>
            </thead>
            <tbody>
              {productRows.map((product) => (
                <tr key={product.code} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-950/60">
                  <td className="px-4 py-3"><span className="font-semibold text-slate-900 dark:text-white">{product.name}</span><span className="ms-2 text-slate-400">{product.code}</span></td>
                  <td className="px-4 py-3 text-right">{product.stock.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{product.nextDemand.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold">{product.suggestedReorder.toLocaleString()}</td>
                  <td className="px-4 py-3">{product.suggestedReorder ? <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">{t("forecast.replenish")}</span> : <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">{t("forecast.stockSufficient")}</span>}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
              <tr><td colSpan={4} className="px-4 py-3">{t("forecast.itemsRequiringReplenishment")}</td><td className="px-4 py-3">{reorderRows.length}</td></tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}

function ExportCenter({ t }: { t: ReturnType<typeof useTranslations<"pages.analytics">> }) {
  const categories = t.raw("reports.categories") as string[];
  const hrCategories = t.raw("hr.categories") as string[];
  const [dataset, setDataset] = useState("financial-0");
  const [format, setFormat] = useState("csv");
  const [asOfDate, setAsOfDate] = useState("2026-10-31");
  const [notice, setNotice] = useState("");
  const datasets = [
    ...categories.map((name, index) => ({
      id: `financial-${index}`,
      name,
      rows: (REPORTS[index] ?? REPORTS[0]).flatMap((row) => [
        ...(row.debit ? [{ code: row.code, name: row.name, metric: t("reports.debit"), value: row.debit, unit: "BDT" }] : []),
        ...(row.credit ? [{ code: row.code, name: row.name, metric: t("reports.credit"), value: row.credit, unit: "BDT" }] : []),
      ]),
    })),
    {
      id: "hr-summary",
      name: hrCategories[1],
      rows: DEPARTMENTS.map((department, index) => ({
        code: `HR-${String(index + 1).padStart(2, "0")}`,
        name: department.name,
        metric: t("hr.monthlyPayroll"),
        value: department.payroll,
        unit: "BDT",
      })),
    },
    {
      id: "demand-forecast",
      name: t("forecast.title"),
      rows: DEMAND_PRODUCTS.map((product, index) => ({
        code: product.code,
        name: product.name,
        metric: t("forecast.nextMonthDemand"),
        value: forecastProductDemand(index, MONTHLY_DEMAND, 3),
        unit: t("forecast.units"),
      })),
    },
  ];

  function downloadSample(bundle = false) {
    if (format !== "csv" && format !== "json") {
      setNotice(t("takeout.previewOnly", { format: format === "excel" ? t("shared.excel") : t("takeout.iifFormat") }));
      return;
    }

    const selectedDatasets = bundle ? datasets : [datasets.find((item) => item.id === dataset) ?? datasets[0]];
    const payload = {
      preview: t("shared.demoData"),
      asOfDate,
      datasets: selectedDatasets.map(({ name, rows }) => ({ name, rows })),
    };
    const csv = [
      [
        t("takeout.csvDataset"),
        t("takeout.csvCode"),
        t("takeout.csvName"),
        t("takeout.csvMetric"),
        t("takeout.csvValue"),
        t("takeout.csvUnit"),
        t("takeout.csvAsOfDate"),
      ].join(","),
      ...payload.datasets.flatMap(({ name, rows }) => rows.map((row) => [
        name,
        row.code,
        row.name,
        row.metric,
        row.value,
        row.unit,
        asOfDate,
      ].map(csvCell).join(","))),
    ].join("\r\n");
    const content = format === "csv" ? `\uFEFF${csv}` : JSON.stringify(payload, null, 2);
    const mimeType = format === "csv" ? "text/csv;charset=utf-8" : "application/json;charset=utf-8";
    const extension = format;
    const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `eden-erp-demo-${bundle ? "takeout" : dataset}-${asOfDate}.${extension}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setNotice(t("takeout.downloadNotice", { format: format.toUpperCase() }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{t("takeout.title")}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("takeout.description")}</p>
      </div>
      <section className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-5 dark:border-emerald-500/20 dark:from-emerald-950/30 dark:to-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950"><Database className="h-5 w-5" /></span>
          <div>
            <h4 className="font-bold text-slate-950 dark:text-white">{t("takeout.fullDataTakeout")}</h4>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-300">{t("takeout.bundleDescription")}</p>
            <p className="mt-2 text-[10px] font-semibold text-emerald-800 dark:text-emerald-200">{t("takeout.demoOnlyNotice")}</p>
          </div>
        </div>
        <button type="button" onClick={() => downloadSample(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
          <Download className="h-4 w-4" />{t("takeout.downloadBundle", { format: format.toUpperCase() })}
        </button>
      </section>
      <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:grid-cols-2">
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("takeout.dataset")}
          <select value={dataset} onChange={(event) => setDataset(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            {datasets.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("takeout.format")}
          <select value={format} onChange={(event) => { setFormat(event.target.value); setNotice(""); }} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="csv">CSV</option><option value="excel">{t("shared.excel")}</option><option value="json">JSON</option><option value="iif">{t("takeout.iifFormat")}</option>
          </select>
        </label>
        <label className="min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300 lg:max-w-xs">
          {t("takeout.asOfDate")}
          <input type="date" value={asOfDate} onChange={(event) => setAsOfDate(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        </label>
        <div className="flex items-end lg:justify-end">
          <SampleBadge>{t("shared.demoData")}</SampleBadge>
        </div>
        <div className="lg:col-span-2">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{t("takeout.formatNote")}</p>
          <button type="button" onClick={() => downloadSample()} className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
            {format === "excel" ? <FileSpreadsheet className="h-4 w-4" /> : format === "json" ? <FileJson2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {t("takeout.exportDataset", { dataset: datasets.find((item) => item.id === dataset)?.name ?? "" , format: format.toUpperCase()})}
          </button>
          {notice && <p role="status" className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">{notice}</p>}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, title: t("takeout.ownershipTitle"), description: t("takeout.ownershipDescription") },
          { icon: Layers3, title: t("takeout.flexibilityTitle"), description: t("takeout.flexibilityDescription") },
          { icon: FileText, title: t("takeout.auditTitle"), description: t("takeout.auditDescription") },
        ].map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default function AnalyticsShowcase() {
  const t = useTranslations("pages.analytics");
  const tabs = t.raw("tabs") as string[];
  const featureItems = t.raw("features.items") as { title: string; description: string }[];
  const workflow = t.raw("workflow.steps") as { title: string; description: string }[];
  const benefits = t.raw("benefits.items") as { title: string; description: string }[];
  const featureIcons: LucideIcon[] = [BarChart3, FileText, UsersRound, TrendingUp, Database];

  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white pt-10 dark:from-emerald-950/25 dark:via-slate-950 dark:to-slate-950 sm:pt-16">
        <div className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/10" />
        <div className="pointer-events-none absolute -left-48 top-64 -z-10 h-[450px] w-[450px] rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />
        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 lg:px-8 lg:pb-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900/80 dark:text-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />{t("hero.eyebrow")}
            </div>
            <ShowcaseHeading as="h1" className="mt-6 text-balance text-4xl leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[3.55rem]">
              {t("hero.title")}{" "}
              <ShowcaseHighlight className="text-emerald-700 dark:text-emerald-300">{t("hero.titleHighlight")}</ShowcaseHighlight>
            </ShowcaseHeading>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">{t("hero.description")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                {t("hero.primaryCta")}<ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#analytics-tabs" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10">
                {t("hero.secondaryCta")}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-xs font-medium text-slate-500 dark:text-slate-400">{t("hero.sampleNotice")}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative min-w-0">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-200/50 via-transparent to-sky-200/60 blur-3xl dark:from-emerald-500/10 dark:to-sky-500/10" />
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_100px_-34px_rgba(15,23,42,0.42)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"><BarChart3 className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{t("hero.previewTitle")}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{t("dashboard.period")}</p>
                  </div>
                </div>
                <SampleBadge>{t("shared.demoData")}</SampleBadge>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
                {[
                  { label: t("dashboard.revenueLabel"), value: money(128_400_000), color: "text-emerald-700 dark:text-emerald-300" },
                  { label: t("dashboard.netIncomeLabel"), value: money(19_260_000), color: "text-sky-700 dark:text-sky-300" },
                  { label: t("dashboard.cashLabel"), value: money(52_500_000), color: "text-violet-700 dark:text-violet-300" },
                  { label: t("dashboard.headcountLabel"), value: "248", color: "text-amber-700 dark:text-amber-300" },
                ].map((item) => (
                  <div key={item.label} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className={`mt-1 break-words text-sm font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="px-3 pb-3 sm:px-4">
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t("dashboard.revenueTrendTitle")}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"><TrendingUp className="h-3 w-3" />{t("hero.previewTrend")}</span>
                </div>
                <div className="h-48 min-w-0 rounded-xl bg-slate-50/70 p-2 dark:bg-slate-950/60 sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[9.8, 10.4, 10.1, 10.9, 11.1, 11.6].map((revenue, index) => ({ month: (t.raw("dashboard.chartMonths") as string[])[index], revenue }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ef" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis hide />
                      <Tooltip formatter={(value) => `BDT ${Number(value).toFixed(1)}M`} />
                      <Area type="monotone" dataKey="revenue" stroke="#0f9f76" fill="#10b981" fillOpacity={0.17} strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/80 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{t("features.eyebrow")}</p>
            <ShowcaseHeading className="mt-4 text-balance text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("features.title")}</ShowcaseHeading>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{t("features.description")}</p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {featureItems.map((item, index) => {
              const Icon = featureIcons[index];
              return (
                <article key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40 sm:p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-slate-950"><Icon className="h-[18px] w-[18px]" /></span>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="analytics-tabs" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{t("showcase.eyebrow")}</p>
            <ShowcaseHeading className="mt-4 text-balance text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("showcase.title")}</ShowcaseHeading>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{t("showcase.description")}</p>
          </div>
          <Tabs defaultValue="executive" className="mt-10">
            <div className="max-w-full overflow-x-auto border-b border-slate-200 dark:border-slate-800">
              <TabsList aria-label={t("showcase.tabsLabel")} className="h-auto w-max min-w-full justify-start gap-1 rounded-none bg-transparent p-0">
                {[
                  { value: "executive", icon: Gauge },
                  { value: "financial", icon: FileText },
                  { value: "hr", icon: UsersRound },
                  { value: "forecast", icon: TrendingUp },
                  { value: "takeout", icon: Database },
                ].map(({ value, icon: Icon }, index) => (
                  <TabsTrigger key={value} value={value} className="h-auto flex-none gap-2 rounded-none border-b-2 border-transparent px-3 py-3 text-xs font-semibold text-slate-500 shadow-none data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-800 data-[state=active]:shadow-none dark:text-slate-400 dark:data-[state=active]:border-emerald-400 dark:data-[state=active]:text-emerald-300 sm:px-4 sm:text-sm">
                    <Icon className="h-4 w-4" />{tabs[index]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value="executive" className="mt-6 focus-visible:outline-none"><ExecutiveDashboard t={t} /></TabsContent>
            <TabsContent value="financial" className="mt-6 focus-visible:outline-none"><FinancialReports t={t} /></TabsContent>
            <TabsContent value="hr" className="mt-6 focus-visible:outline-none"><HrReports t={t} /></TabsContent>
            <TabsContent value="forecast" className="mt-6 focus-visible:outline-none"><DemandForecast t={t} /></TabsContent>
            <TabsContent value="takeout" className="mt-6 focus-visible:outline-none"><ExportCenter t={t} /></TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/80 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{t("workflow.eyebrow")}</p>
            <ShowcaseHeading className="mt-4 text-balance text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("workflow.title")}</ShowcaseHeading>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{t("workflow.description")}</p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map((step, index) => {
              const Icon = WORKFLOW_ICONS[index];
              return (
                <article key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  {index < workflow.length - 1 && <ArrowRight className="absolute -right-3 top-8 z-10 hidden h-5 w-5 text-emerald-500 lg:block" />}
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><Icon className="h-5 w-5" /></span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{t("benefits.eyebrow")}</p>
            <ShowcaseHeading className="mt-4 text-balance text-3xl tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("benefits.title")}</ShowcaseHeading>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index];
              return (
                <article key={benefit.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{benefit.title}</h3><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{benefit.description}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 px-6 py-14 text-center shadow-2xl sm:px-10 sm:py-16">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <Sparkles className="mx-auto h-9 w-9 text-emerald-300" />
            <ShowcaseHeading className="mt-5 text-balance text-3xl tracking-tight text-white sm:text-4xl">{t("cta.title")}{" "}<ShowcaseHighlight className="text-emerald-300">{t("cta.titleHighlight")}</ShowcaseHighlight></ShowcaseHeading>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-emerald-50/80 sm:text-base">{t("cta.description")}</p>
            <Link href="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950">
              {t("cta.button")}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
