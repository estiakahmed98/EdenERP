"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Wallet,
  Building2,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  Receipt,
  DollarSign,
  PieChart,
  LineChart,
  Shield,
  Globe,
  Bell,
  Repeat,
  Palette,
  Sparkles,
  Star,
  Users,
  Play,
  Download,
  Eye,
  Send,
  CreditCard,
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

const features = [
  {
    icon: Globe,
    title: "Global Tax Compliance",
    description: "Pre-configured for 180+ countries with local tax rules",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Automated notifications for unusual activity",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Repeat,
    title: "Recurring Transactions",
    description: "Set up automated journal entries",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Financial Analytics",
    description: "Real-time P&L, balance sheets, and cash flow",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: DollarSign,
    title: "Multi-Currency",
    description: "Handle 100+ currencies with auto-conversion",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Audit Trail",
    description: "Complete visibility into every transaction",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: LineChart,
    title: "Budget Management",
    description: "Track actuals against budgets in real-time",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Calculator,
    title: "Auto-Reconciliation",
    description: "95% of transactions matched automatically",
    gradient: "from-cyan-500 to-emerald-500",
  },
];

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

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl dark:text-slate-100 ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900/60">
      <span className="text-emerald-500 dark:text-emerald-300">{icon}</span>
      {label}
    </div>
  );
}

export default function AccountingPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <SectionEyebrow
                icon={<Calculator className="h-4 w-4" />}
                label="Intelligent Accounting"
              />

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl dark:text-slate-100">
                  Accounting made
                  <br />
                  <span
                    className="text-emerald-600"
                    style={{
                      fontFamily:
                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                    }}
                  >
                    effortlessly simple
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  AI-native accounting platform for all your financial
                  operations — from reconciliation and expenses to tax returns
                  and real-time reporting. Fast, complete, and simple.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-slate-200"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                    from 15,000+ businesses
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 blur-3xl" />

              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
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

                {/* Dashboard Content */}
                <div className="p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Customer Invoices Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-xs text-slate-500">
                          Customer Invoices
                        </p>
                        <div className="flex gap-1">
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            5 Unpaid
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">
                            3 Late
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Unpaid</span>
                          <span className="font-semibold">$128,657.25</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Late</span>
                          <span className="font-semibold text-red-600">
                            $92,750.00
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vendor Bills Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-xs text-slate-500">Vendor Bills</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>To Pay</span>
                          <span className="font-semibold">$652.27</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Late</span>
                          <span className="font-semibold text-red-600">
                            $622.27
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Balance Card */}
                  <div className="mt-4 bg-linear-to-r from-emerald-50 to-cyan-50 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Bank Balance</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        $9,944.87
                      </p>
                      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                        <div>
                          <p className="text-slate-500">Last Statement</p>
                          <p className="font-semibold">$6,378.00</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Payments</p>
                          <p className="font-semibold text-emerald-600">
                            +$8,578.50
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Expenses</p>
                          <p className="font-semibold text-red-600">
                            -$2,500.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-4 bg-white rounded-full dark:bg-slate-900 px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium">Real-time sync</span>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white rounded-full dark:bg-slate-900 px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-medium">Auto-updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              icon={<TrendingUp className="h-4 w-4" />}
              label="Lightning fast"
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Unlock true performance
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Speed matters. All operations are processed in less than 90
              milliseconds, faster than the blink of an eye. It helps
              accountants do much more in less time.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: Clock,
                  value: "5 seconds",
                  label: "From login to vendor bill",
                  color: "emerald",
                },
                {
                  icon: Zap,
                  value: "Lightning Speed",
                  label: "Processing speed",
                  color: "cyan",
                },
                {
                  icon: TrendingUp,
                  value: "3x",
                  label: "Faster month-end close",
                  color: "purple",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700"
                >
                  <div
                    className={`h-10 w-10 rounded-lg bg-${item.color}-100 flex items-center justify-center`}
                  >
                    <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </div>
                    <div className="text-sm text-slate-500">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden dark:bg-slate-900 dark:border-slate-700">
              <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-3">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm font-semibold">Vendor Bill</span>
                  <span className="text-xs opacity-90">BILL/2024/11/0001</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">Vendor</span>
                  <span className="font-medium text-sm">Azure Interior</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      Office Design Software
                    </span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-600 dark:text-slate-300">
                      Office Chair (x5)
                    </span>
                    <span>$20.00</span>
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-emerald-600">$30.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 h-20 w-20 bg-emerald-100 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40/50 rounded-3xl my-8 dark:bg-slate-900/40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden dark:bg-slate-900 dark:border-slate-700">
              <div className="bg-slate-50 dark:bg-slate-800/40 border-b dark:bg-slate-800 dark:border-slate-700 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">
                    Smart OCR Processing
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <Camera className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Invoice scanned
                    </p>
                    <p className="text-xs text-slate-500">
                      98% recognition rate
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      AI processing
                    </p>
                    <p className="text-xs text-slate-500">
                      Auto-extracting data
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cyan-600" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Ready to validate
                    </p>
                    <p className="text-xs text-slate-500">Zero manual entry</p>
                  </div>
                  <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg">
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
              label="No data entry"
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Just automation
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Experience zero data entry. Our advanced AI-powered invoice data
              capture has a 98% recognition rate. All you have to do is to
              validate the invoice.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700">
                <div className="text-2xl font-bold text-emerald-600">98%</div>
                <div className="text-xs text-slate-500">Recognition Rate</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:border-slate-700">
                <div className="text-2xl font-bold text-cyan-600">95%</div>
                <div className="text-xs text-slate-500">Auto-Matching</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile & Banking Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              icon={<Smartphone className="h-4 w-4" />}
              label="Mobile companion"
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Your finances in your{" "}
              <span className="text-emerald-600">pocket</span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Take pictures of your expenses, and let the Artificial
              Intelligence do the rest. Snap, scan, and sync — all from your
              phone.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Instant receipt capture",
                "Real-time expense tracking",
                "Automatic cloud sync",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-200">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Smartphone className="h-4 w-4" />
                App Store
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Play className="h-4 w-4" />
                Google Play
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
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-purple-600 rounded-[3rem] blur-2xl opacity-30" />
              <div className="relative bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">
                        Expense Tracker
                      </span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-slate-100 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">Receipt scanned</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Office Supplies</span>
                          <span>$45.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meal Expense</span>
                          <span>$28.50</span>
                        </div>
                        <div className="border-t pt-1 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>$74.49</span>
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40/50 rounded-3xl my-8 dark:bg-slate-900/40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden dark:bg-slate-900 dark:border-slate-700">
              <div className="bg-slate-50 dark:bg-slate-800/40 border-b dark:bg-slate-800 dark:border-slate-700 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium">
                      Bank Reconciliation
                    </span>
                  </div>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700">
                    Sync Now
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {recentTransactions.map((transaction, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 transition"
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
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">
                          {transaction.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {transaction.amount}
                      </span>
                      {transaction.status === "cleared" && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      )}
                      {transaction.status === "pending" && (
                        <Clock className="h-3 w-3 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 px-5 py-3 border-t border-emerald-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-800">
                    95% of transactions matched automatically
                  </span>
                  <ArrowRight className="h-3 w-3 text-emerald-600" />
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
              label="Smart sync"
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Smart bank reconciliation
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Never import bank statements manually again. Adon ERP integrates
              with 28,000+ banks from all around the world with smart AI
              matching.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    28,000+ banks supported
                  </h4>
                  <p className="text-sm text-slate-500">
                    Global coverage across 50+ countries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    95% auto-matching rate
                  </h4>
                  <p className="text-sm text-slate-500">
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow
            icon={<PieChart className="h-4 w-4" />}
            label="Track spending"
          />
          <ScriptHeading className="mt-4">
            All your expenses in one place
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Categorize and track every transaction automatically.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {expenseCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div
                className={`h-12 w-12 mx-auto rounded-xl bg-${category.color}-100 flex items-center justify-center mb-3`}
              >
                <category.icon
                  className={`h-6 w-6 text-${category.color}-600`}
                />
              </div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {category.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">{category.amount}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40/50 rounded-3xl my-8 dark:bg-slate-900/40">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Enterprise-grade"
          />
          <ScriptHeading className="mt-4">
            All the features done right.
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Everything you need to manage your business finances in one place.
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
              className="group relative bg-white rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}
              />
              <div className="relative">
                <div
                  className={`h-10 w-10 rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-3`}
                >
                  <feature.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 px-6 py-12 text-center shadow-xl sm:px-10">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-emerald-500" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-500" />
          </div>

          <div className="relative">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto mb-6">
              "A VAT closing that used to take 4 days is now done in 3 hours
              with Adon ERP, with a better service for our clients: real-time
              accounting."
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                WV
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Wim Van den Brande
                </p>
                <p className="text-sm text-slate-500">
                  Head of Accounting, KPMG
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
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-emerald-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-cyan-500 rounded-full blur-3xl opacity-20" />

          <div className="relative">
            <Sparkles className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <ScriptHeading className="text-white text-4xl sm:text-5xl">
              Unleash your growth potential
            </ScriptHeading>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
              Join 15 million users who grow their business with Adon ERP. Start
              your 30-day free trial today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 dark:text-slate-100 px-6 py-3 font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm dark:bg-white/5 text-white px-6 py-3 font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                Contact Sales
              </Link>
            </div>

            <p className="mt-6 text-sm text-emerald-200/80">
              Free forever plan available • No credit card required • Instant
              access
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
