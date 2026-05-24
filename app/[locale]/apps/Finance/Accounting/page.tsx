"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Building2,
  RefreshCw,
  CheckCircle2,
  Clock,
  BarChart3,
  Receipt,
  DollarSign,
  PieChart,
  LineChart,
  Shield,
  Globe,
  Bell,
  Repeat,
  Sparkles,
  Star,
  Play,
  Smartphone,
  Camera,
  Zap,
  BookOpen,
  Briefcase,
  Home,
  Car,
  Coffee,
  Gift,
} from "lucide-react";

const expenseCategories = [
  { icon: Home, name: "Rent", amount: "$2,500", color: "emerald" },
  { icon: Briefcase, name: "Salaries", amount: "$15,000", color: "purple" },
  { icon: Coffee, name: "Office Supplies", amount: "$450", color: "cyan" },
  { icon: Car, name: "Travel", amount: "$1,200", color: "orange" },
  { icon: Gift, name: "Marketing", amount: "$3,000", color: "pink" },
  { icon: BookOpen, name: "Software", amount: "$800", color: "blue" },
];

const recentTransactions = [
  {
    name: "Acme Corp",
    amount: "$3,500.00",
    status: "cleared",
    date: "Today",
    type: "payment",
  },
  {
    name: "TechStart Inc",
    amount: "$1,200.00",
    status: "pending",
    date: "Yesterday",
    type: "payment",
  },
  {
    name: "Global Supplies",
    amount: "$890.00",
    status: "cleared",
    date: "3 days ago",
    type: "expense",
  },
  {
    name: "Design Studio",
    amount: "$2,450.00",
    status: "cleared",
    date: "5 days ago",
    type: "payment",
  },
  {
    name: "Office Depot",
    amount: "$320.00",
    status: "pending",
    date: "Yesterday",
    type: "expense",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
  },
  cyan: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
};

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800">
      <span className="text-emerald-500 dark:text-emerald-400">{icon}</span>
      {label}
    </div>
  );
}

export default function AccountingPage() {
  const t = useTranslations("pages.accounting");

  const features = [
    {
      icon: Globe,
      title: t("features.items.globalTax"),
      description: t("features.items.globalTaxDesc"),
      gradient: "from-emerald-500 to-cyan-500",
    },
    {
      icon: Bell,
      title: t("features.items.smartAlerts"),
      description: t("features.items.smartAlertsDesc"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Repeat,
      title: t("features.items.recurring"),
      description: t("features.items.recurringDesc"),
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: BarChart3,
      title: t("features.items.analytics"),
      description: t("features.items.analyticsDesc"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: DollarSign,
      title: t("features.items.multiCurrency"),
      description: t("features.items.multiCurrencyDesc"),
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: t("features.items.auditTrail"),
      description: t("features.items.auditTrailDesc"),
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: LineChart,
      title: t("features.items.budget"),
      description: t("features.items.budgetDesc"),
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Calculator,
      title: t("features.items.autoReconciliation"),
      description: t("features.items.autoReconciliationDesc"),
      gradient: "from-cyan-500 to-emerald-500",
    },
  ];

  const performanceMetrics = [
    {
      icon: Clock,
      value: "5 seconds",
      label: t("performance.metrics.loginToBill"),
      color: "emerald" as const,
    },
    {
      icon: Zap,
      value: "Lightning Speed",
      label: t("performance.metrics.processing"),
      color: "cyan" as const,
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: t("performance.metrics.monthEndClose"),
      color: "purple" as const,
    },
  ];

  const mobileFeatures = [
    t("mobile.features.receiptCapture"),
    t("mobile.features.expenseTracking"),
    t("mobile.features.cloudSync"),
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)] dark:bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="max-w-xl space-y-8">
              <SectionEyebrow
                icon={<Calculator className="h-4 w-4" />}
                label={t("hero.eyebrow")}
              />

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
                  {t("hero.title")}
                </h1>

                <p className="max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-emerald-500/30"
                >
                  <Play className="h-4 w-4" />
                  {t("hero.watchDemo")}
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-slate-800 dark:bg-slate-700"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    {t("hero.rating")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -right-8 -top-6 h-32 w-32 rounded-full bg-emerald-100 blur-3xl dark:bg-emerald-900/30" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 blur-3xl dark:bg-purple-900/30" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Accounting Dashboard
                      </span>
                    </div>
                    <span className="text-xs opacity-90">Live</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                      <div className="mb-3 flex items-start justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Customer Invoices
                        </p>
                        <div className="flex gap-1">
                          <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/40 dark:text-red-400">
                            5 Unpaid
                          </span>
                          <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400">
                            3 Late
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            Unpaid
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            $128,657.25
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            Late
                          </span>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            $92,750.00
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                      <div className="mb-3 flex items-start justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Vendor Bills
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            To Pay
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            $652.27
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            Late
                          </span>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            $622.27
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-linear-to-r from-emerald-50 to-cyan-50 p-4 dark:from-emerald-950/30 dark:to-cyan-950/30">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Bank Balance
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        $9,944.87
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">
                            Last Statement
                          </p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            $6,378.00
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">
                            Payments
                          </p>
                          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                            +$8,578.50
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400">
                            Expenses
                          </p>
                          <p className="font-semibold text-red-600 dark:text-red-400">
                            -$2,500.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-3 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Real-time sync
                </span>
              </div>
              <div className="absolute -bottom-3 -left-4 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <RefreshCw className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Auto-updated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              icon={<TrendingUp className="h-4 w-4" />}
              label={t("performance.eyebrow")}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("performance.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t("performance.description")}
            </p>

            <div className="mt-6 space-y-4">
              {performanceMetrics.map((item, idx) => {
                const colors = colorClasses[item.color];

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/40"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}
                    >
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-3">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm font-semibold">Vendor Bill</span>
                  <span className="text-xs opacity-90">BILL/2024/11/0001</span>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Vendor
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Azure Interior
                  </span>
                </div>
                <div className="border-t pt-3 dark:border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Office Design Software
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      $10.00
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Office Chair (x5)
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      $20.00
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between border-t pt-3 font-semibold dark:border-slate-700">
                    <span className="text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      $30.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 -z-10 h-20 w-20 rounded-full bg-emerald-100 blur-2xl dark:bg-emerald-900/30" />
          </motion.div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="mx-auto my-8 max-w-7xl rounded-3xl bg-slate-50 px-4 py-20 dark:bg-slate-800/30 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Smart OCR Processing
                  </span>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800">
                    <Camera className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Invoice scanned
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      98% recognition rate
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-cyan-50 p-3 dark:bg-cyan-950/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800">
                    <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      AI processing
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Auto-extracting data
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Ready to validate
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Zero manual entry
                    </p>
                  </div>
                  <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white transition hover:bg-emerald-700">
                    Validate
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <SectionEyebrow
              icon={<Sparkles className="h-4 w-4" />}
              label={t("automation.eyebrow")}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("automation.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t("automation.description")}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-700 dark:bg-slate-900">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  98%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("automation.metrics.recognitionRate")}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-700 dark:bg-slate-900">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  95%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("automation.metrics.autoMatching")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              icon={<Smartphone className="h-4 w-4" />}
              label={t("mobile.eyebrow")}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("mobile.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t("mobile.description")}
            </p>

            <div className="mt-6 space-y-3">
              {mobileFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
                <Smartphone className="h-4 w-4" />
                {t("mobile.appStore")}
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
                <Play className="h-4 w-4" />
                {t("mobile.googlePlay")}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 rounded-[3rem] bg-linear-to-r from-emerald-500 to-purple-600 opacity-30 blur-2xl" />
              <div className="relative rounded-[3rem] bg-slate-900 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">
                        Expense Tracker
                      </span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                      <div className="mb-2 flex items-center gap-2">
                        <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Receipt scanned
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Office Supplies
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">
                            $45.99
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Meal Expense
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">
                            $28.50
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-1 font-semibold dark:border-slate-700">
                          <span className="text-slate-900 dark:text-white">
                            Total
                          </span>
                          <span className="text-slate-900 dark:text-white">
                            $74.49
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bank Reconciliation Section */}
      <section className="mx-auto my-8 max-w-7xl rounded-3xl bg-slate-50 px-4 py-20 dark:bg-slate-800/30 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Bank Reconciliation
                    </span>
                  </div>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                    Sync Now
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentTransactions.map((transaction, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-5 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          transaction.status === "cleared"
                            ? "bg-emerald-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {transaction.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {transaction.amount}
                      </span>
                      {transaction.status === "cleared" && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      )}
                      {transaction.status === "pending" && (
                        <Clock className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-emerald-100 bg-emerald-50 px-5 py-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-800 dark:text-emerald-300">
                    95% of transactions matched automatically
                  </span>
                  <ArrowRight className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <SectionEyebrow
              icon={<RefreshCw className="h-4 w-4" />}
              label={t("bankReconciliation.eyebrow")}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("bankReconciliation.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t("bankReconciliation.description")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
                  <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {t("bankReconciliation.features.banksSupported")}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Global coverage across 50+ countries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/40">
                  <RefreshCw className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {t("bankReconciliation.features.autoMatching")}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    AI-powered transaction matching
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expense Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionEyebrow
            icon={<PieChart className="h-4 w-4" />}
            label={t("expenseCategories.eyebrow")}
          />
          <ScriptHeading className="mt-4">
            {t("expenseCategories.title")}
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t("expenseCategories.description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {expenseCategories.map((category, idx) => {
            const colors =
              colorClasses[category.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                >
                  <category.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {category.name}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {category.amount}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto my-8 max-w-7xl rounded-3xl bg-slate-50 px-4 py-20 dark:bg-slate-800/30 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label={t("features.eyebrow")}
          />
          <ScriptHeading className="mt-4">{t("features.title")}</ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t("features.description")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-linear-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
              />
              <div className="relative">
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10`}
                >
                  <feature.icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-100 to-white px-6 py-12 text-center shadow-xl dark:from-slate-900 dark:to-slate-950 sm:px-10">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-emerald-500" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-500" />
          </div>

          <div className="relative">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
              &quot;{t("testimonial.quote")}&quot;
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 font-bold text-white">
                WV
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {t("testimonial.name")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("testimonial.role")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="get-started"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-emerald-900 to-cyan-900 px-6 py-16 text-center shadow-2xl sm:px-10">
          <div className="absolute inset-0 bg-noise opacity-5" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500 opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500 opacity-20 blur-3xl" />

          <div className="relative">
            <Sparkles className="mx-auto mb-6 h-12 w-12 text-emerald-400" />
            <ScriptHeading className="text-4xl text-white sm:text-5xl">
              {t("cta.title")}
            </ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
              {t("cta.description")}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:bg-slate-950 dark:text-slate-100"
              >
                {t("cta.trial")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {t("cta.sales")}
              </Link>
            </div>

            <p className="mt-6 text-sm text-emerald-200/80">
              Free forever plan available • Instant access
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
