"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Send,
  Mail,
  CheckCircle2,
  Clock,
  CreditCard,
  Zap,
  Bell,
  FileText,
  Smartphone,
  Camera,
  Building2,
  RefreshCw,
  AlertCircle,
  Globe,
  Repeat,
  BarChart3,
  DollarSign,
  Palette,
  LineChart,
  Calculator,
  Sparkles,
  Star,
  Users,
  Play,
  Check,
  TrendingUp,
  Shield,
  Receipt,
  Download,
  Eye,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Tax Support",
    description: "Pre-configured for 180+ countries with local tax requirements",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Automated follow-ups via email and SMS",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Repeat,
    title: "Recurring Billing",
    description: "Set and forget subscription invoicing",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Real-time insights and performance metrics",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: DollarSign,
    title: "Multi-Currency",
    description: "Invoice in 100+ currencies automatically",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Brand your invoices with custom designs",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: LineChart,
    title: "Revenue Analytics",
    description: "Visualize your business performance",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Calculator,
    title: "Auto-Tax Calculation",
    description: "Smart tax engine for perfect accuracy",
    gradient: "from-cyan-500 to-emerald-500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow Solutions",
    content: "Adon ERP transformed our invoicing workflow. We've reduced payment collection time by 60% and eliminated manual data entry entirely.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Michael Chen",
    role: "Finance Director, Innovate Corp",
    content: "The automated reconciliation feature alone saved us 20+ hours per month. Best invoicing platform we've ever used.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const paymentGateways = [
  { name: "Stripe", gradient: "from-blue-600 to-indigo-600" },
  { name: "PayPal", gradient: "from-blue-500 to-sky-500" },
  { name: "Razorpay", gradient: "from-cyan-500 to-blue-500" },
  { name: "Square", gradient: "from-emerald-500 to-teal-500" },
];

function ScriptHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

function SectionEyebrow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900/60">
      <span className="text-emerald-500 dark:text-emerald-300">{icon}</span>
      {label}
    </div>
  );
}

export default function InvoicingPage() {
  const [activeTab, setActiveTab] = useState("preview");

  return (
    <main className="overflow-hidden bg-white text-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)]" />
        
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <SectionEyebrow icon={<Receipt className="h-4 w-4" />} label="Intelligent Invoicing" />
              
              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
                  Invoicing made
                  <br />
                  <span className="text-emerald-600" style={{ fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive' }}>
                    effortlessly simple
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Automate your entire billing workflow — from creation to payment.
                  Save hours every week with smart templates, auto-reminders, and instant reconciliation.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">from 15,000+ businesses</span>
                </div>
              </div>
            </div>

            {/* Right - Invoice Preview */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 blur-3xl" />
              
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white shadow-2xl overflow-hidden">
                {/* Invoice Header */}
                <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      <span className="font-semibold">INVOICE</span>
                    </div>
                    <span className="text-sm opacity-90">INV-2024-00123</span>
                  </div>
                </div>
                
                {/* Invoice Content */}
                <div className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Bill To</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Acme Corporation</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">123 Business Ave</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">San Francisco, CA 94105</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">Invoice Date</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">March 15, 2024</p>
                      <p className="text-xs text-slate-500 mt-2">Due Date</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">April 14, 2024</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <div className="space-y-3">
                      {[
                        { item: "Enterprise Plan - Annual", qty: 1, price: "$2,400.00" },
                        { item: "Implementation Fee", qty: 1, price: "$500.00" },
                        { item: "Premium Support", qty: 12, price: "$600.00" },
                      ].map((line, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <div>
                            <span className="text-slate-900 dark:text-slate-100">{line.item}</span>
                            <span className="text-slate-400 ml-2">×{line.qty}</span>
                          </div>
                          <span className="text-slate-900 dark:text-slate-100">{line.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-slate-100 dark:border-slate-700 mt-4 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-emerald-600">$3,500.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Invoice
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 transition">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-3 -right-4 bg-white rounded-full dark:bg-slate-900 px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium">Instant delivery</span>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white rounded-full dark:bg-slate-900 px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-medium">Due in 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Click & Send Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow icon={<Send className="h-4 w-4" />} label="One-click billing" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Click. Invoice sent.
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Send professional invoices in seconds. Our intelligent system automates email delivery,
              payment reminders, and PDF generation — all with a single click.
            </p>
            
            <div className="mt-6 space-y-3">
              {[
                { icon: Send, text: "Instant email delivery", color: "emerald" },
                { icon: Bell, text: "Automated payment reminders", color: "cyan" },
                { icon: FileText, text: "Beautiful PDF generation", color: "purple" },
                { icon: Eye, text: "Real-time open tracking", color: "blue" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                    <item.icon className={`h-3 w-3 text-${item.color}-600`} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200">{item.text}</span>
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
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-white border-b border-slate-100 dark:border-slate-700 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Delivery Status</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <Send className="h-5 w-5 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Invoice sent to client@acme.com</p>
                    <p className="text-xs text-slate-500">March 15, 2024 • 10:32 AM</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                
                <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-slate-500">Email opened</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">2 minutes ago</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-slate-500">Invoice viewed</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">5 minutes ago</span>
                  </div>
                </div>
                
                <div className="bg-slate-100 rounded-lg p-3 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300">✨ Smart reminder scheduled in 7 days</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 h-20 w-20 bg-emerald-100 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Mobile Experience Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-purple-600 rounded-[3rem] blur-2xl opacity-30" />
              <div className="relative bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">Adon Mobile</span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-slate-100 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Camera className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Invoice</p>
                          <p className="text-xs text-slate-500">Acme Corp • $3,500</p>
                        </div>
                      </div>
                      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium">
                        Review & Send
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Pending Invoices</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Paid This Month</span>
                        <span className="font-semibold text-emerald-600">$12,450</span>
                      </div>
                    </div>
                  </div>
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
            <SectionEyebrow icon={<Smartphone className="h-4 w-4" />} label="Mobile-first" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Your invoices in your <span className="text-emerald-600">pocket</span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Manage your entire invoicing workflow from anywhere. Create, send, and track
              invoices on the go with our native mobile apps.
            </p>
            
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
        </div>
      </section>

      {/* Payment Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow icon={<CreditCard className="h-4 w-4" />} label="Fast payments" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Get paid <span className="text-emerald-600">in a flash</span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Accept payments from anywhere in the world. Seamless integration with major
              payment gateways, automatic reconciliation, and real-time payment tracking.
            </p>
            
            <div className="mt-6 space-y-3">
              {["Instant payment confirmation", "Automatic reconciliation", "Multi-currency support", "Recurring billing"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              {paymentGateways.map((gateway, idx) => (
                <div key={idx} className={`bg-linear-to-r ${gateway.gradient} bg-opacity-10 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-700`}>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{gateway.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-400 text-sm">Total Due</p>
                  <p className="text-3xl font-bold text-white">$3,500.00</p>
                </div>
                <CreditCard className="h-8 w-8 text-slate-500" />
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-slate-700 pb-3">
                  <p className="text-sm text-slate-400 mb-1">Card Number</p>
                  <p className="text-white font-mono">**** **** **** 4242</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Expiry</p>
                    <p className="text-white">12/26</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">CVC</p>
                    <p className="text-white">***</p>
                  </div>
                </div>
                <button className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 py-3 rounded-xl font-semibold text-white hover:shadow-lg transition">
                  Pay $3,500.00
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bank Automation Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
                    <span className="font-medium text-sm">Bank Reconciliation</span>
                  </div>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700">Sync Now</button>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Acme Corp", amount: "$3,500.00", status: "pending", date: "Today" },
                  { name: "TechStart Inc", amount: "$1,200.00", status: "matched", date: "Yesterday" },
                  { name: "Global Solutions", amount: "$890.00", status: "overdue", date: "3 days ago" },
                ].map((transaction, idx) => (
                  <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 transition">
                    <div className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        transaction.status === 'matched' ? 'bg-emerald-500' :
                        transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{transaction.name}</p>
                        <p className="text-xs text-slate-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{transaction.amount}</span>
                      {transaction.status === 'matched' && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                      {transaction.status === 'pending' && <Clock className="h-3 w-3 text-yellow-600" />}
                      {transaction.status === 'overdue' && <AlertCircle className="h-3 w-3 text-red-600" />}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-emerald-50 px-5 py-3 border-t border-emerald-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-800">Auto-follow-up scheduled</span>
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
            <SectionEyebrow icon={<RefreshCw className="h-4 w-4" />} label="Smart sync" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Connect your bank.
              <br />
              Automate follow-ups.
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Never chase payments again. Smart bank synchronization combined with automated
              follow-ups ensures you get paid faster.
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">28,000+ banks supported</h4>
                  <p className="text-sm text-slate-500">Global coverage across 50+ countries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">95% auto-matching rate</h4>
                  <p className="text-sm text-slate-500">AI-powered transaction matching</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={<Sparkles className="h-4 w-4" />} label="Enterprise-grade" />
          <ScriptHeading className="mt-4">
            All the features done right.
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Everything you need to manage invoicing, payments, and reconciliation in one place.
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
              <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
              <div className="relative">
                <div className={`h-10 w-10 rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-3`}>
                  <feature.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden">
                  <img src={testimonial.avatar} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
              Join thousands of businesses already saving hours every week with intelligent invoicing.
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
              Free forever plan available • No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


