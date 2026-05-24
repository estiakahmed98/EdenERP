"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
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
  };
  return icons[iconName] || Sparkles;
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-800">
      <span className="text-emerald-500 dark:text-emerald-400">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

export default function InvoicingPage() {
  const t = useTranslations("pages.invoicing");
  const [activeTab, setActiveTab] = useState("preview");

  const featuresList = t.raw("featuresSection.list");
  const testimonialsList = t.raw("testimonialsSection.testimonials");
  const gatewaysList = t.raw("paymentSection.gateways");

  const getGradientClass = (gradient: string) => {
    return gradient;
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)] dark:bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <SectionEyebrow
                iconName={t("hero.eyebrowIcon")}
                labelKey="hero.eyebrowLabel"
                t={t}
              />

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
                  {t("hero.title")}
                  <br />
                  <span
                    className="text-emerald-600 dark:text-emerald-400"
                    style={{
                      fontFamily:
                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                    }}
                  >
                    {t("hero.titleHighlight")}
                  </span>
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
                  {t("hero.startButton")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <Play className="h-4 w-4" />
                  {t("hero.demoButton")}
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-700"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    {t("hero.rating")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Invoice Preview */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-emerald-100 dark:bg-emerald-900/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 dark:bg-purple-900/30 blur-3xl" />

              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                {/* Invoice Header */}
                <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      <span className="font-semibold">{t("hero.invoice.title")}</span>
                    </div>
                    <span className="text-sm opacity-90">{t("hero.invoice.number")}</span>
                  </div>
                </div>

                {/* Invoice Content */}
                <div className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        {t("hero.invoice.billTo")}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {t("hero.invoice.company")}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {t("hero.invoice.address1")}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {t("hero.invoice.address2")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        {t("hero.invoice.invoiceDate")}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {t("hero.invoice.date")}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {t("hero.invoice.dueDate")}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {t("hero.invoice.due")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="space-y-3">
                      {t.raw("hero.invoice.items").map((line: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <div>
                            <span className="text-slate-900 dark:text-slate-100">
                              {line.name}
                            </span>
                            <span className="text-slate-400 ml-2">
                              ×{line.qty}
                            </span>
                          </div>
                          <span className="text-slate-900 dark:text-slate-100">
                            {line.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-900 dark:text-slate-100">
                          {t("hero.invoice.total")}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {t("hero.invoice.totalAmount")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("hero.invoice.sendButton")}
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                      <Download className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-4 bg-white dark:bg-slate-900 rounded-full px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t("hero.invoice.instantDelivery")}
                </span>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white dark:bg-slate-900 rounded-full px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t("hero.invoice.dueIn")}
                </span>
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
            <SectionEyebrow
              iconName={t("clickSendSection.eyebrowIcon")}
              labelKey="clickSendSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("clickSendSection.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("clickSendSection.description")}
            </p>

            <div className="mt-6 space-y-3">
              {t.raw("clickSendSection.features").map((item: any, idx: number) => {
                const IconComponent = getIconComponent("Send");
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center`}>
                      <CheckCircle2 className={`h-3 w-3 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {item.text}
                    </span>
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
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("clickSendSection.demo.title")}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                  <Send className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {t("clickSendSection.demo.sentTo")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("clickSendSection.demo.sentDate")}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-slate-500 dark:text-slate-400">
                      {t("clickSendSection.demo.opened")}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {t("clickSendSection.demo.openedTime")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-slate-500 dark:text-slate-400">
                      {t("clickSendSection.demo.viewed")}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {t("clickSendSection.demo.viewedTime")}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t("clickSendSection.demo.reminder")}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full blur-2xl -z-10" />
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
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">{t("mobileSection.demo.appName")}</span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                          <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {t("mobileSection.demo.newInvoice")}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {t("mobileSection.demo.invoicePreview")}
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
                        {t("mobileSection.demo.reviewButton")}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          {t("mobileSection.demo.pendingInvoices")}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {t("mobileSection.demo.pendingCount")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          {t("mobileSection.demo.paidThisMonth")}
                        </span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {t("mobileSection.demo.paidAmount")}
                        </span>
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
            <SectionEyebrow
              iconName={t("mobileSection.eyebrowIcon")}
              labelKey="mobileSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("mobileSection.title")}{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {t("mobileSection.titleHighlight")}
              </span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("mobileSection.description")}
            </p>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition text-sm">
                <Smartphone className="h-4 w-4" />
                {t("mobileSection.appStore")}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition text-sm">
                <Play className="h-4 w-4" />
                {t("mobileSection.googlePlay")}
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
            <SectionEyebrow
              iconName={t("paymentSection.eyebrowIcon")}
              labelKey="paymentSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("paymentSection.title")}{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {t("paymentSection.titleHighlight")}
              </span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("paymentSection.description")}
            </p>

            <div className="mt-6 space-y-3">
              {t.raw("paymentSection.features").map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {gatewaysList.map((gateway: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-700"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {gateway}
                  </span>
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
            <div className="bg-linear-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-400 text-sm">{t("paymentSection.demo.totalDue")}</p>
                  <p className="text-3xl font-bold text-white">{t("paymentSection.demo.amount")}</p>
                </div>
                <CreditCard className="h-8 w-8 text-slate-500" />
              </div>

              <div className="space-y-4">
                <div className="border-b border-slate-700 pb-3">
                  <p className="text-sm text-slate-400 mb-1">{t("paymentSection.demo.cardNumber")}</p>
                  <p className="text-white font-mono">{t("paymentSection.demo.cardNumberValue")}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{t("paymentSection.demo.expiry")}</p>
                    <p className="text-white">{t("paymentSection.demo.expiryValue")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{t("paymentSection.demo.cvc")}</p>
                    <p className="text-white">{t("paymentSection.demo.cvcValue")}</p>
                  </div>
                </div>
                <button className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 py-3 rounded-xl font-semibold text-white hover:shadow-lg transition">
                  {t("paymentSection.demo.payButton")}
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/40 border-b dark:border-slate-700 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                      {t("bankSection.demo.title")}
                    </span>
                  </div>
                  <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700">
                    {t("bankSection.demo.syncButton")}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {t.raw("bankSection.demo.transactions").map((transaction: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          transaction.status === "matched"
                            ? "bg-emerald-500"
                            : transaction.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">
                          {transaction.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                        {transaction.amount}
                      </span>
                      {transaction.status === "matched" && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      )}
                      {transaction.status === "pending" && (
                        <Clock className="h-3 w-3 text-yellow-600" />
                      )}
                      {transaction.status === "overdue" && (
                        <AlertCircle className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 px-5 py-3 border-t border-emerald-100 dark:border-emerald-900">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-800 dark:text-emerald-300">
                    {t("bankSection.demo.followup")}
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
              iconName={t("bankSection.eyebrowIcon")}
              labelKey="bankSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("bankSection.title")}
              <br />
              {t("bankSection.subtitle")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("bankSection.description")}
            </p>

            <div className="mt-6 space-y-4">
              {t.raw("bankSection.features").map((feature: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow
            iconName={t("featuresSection.eyebrowIcon")}
            labelKey="featuresSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-4">
            {t("featuresSection.title")}
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t("featuresSection.description")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.map((feature: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}
              />
              <div className="relative">
                <div
                  className={`h-10 w-10 rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-3`}
                >
                  {(() => {
                    const IconComponent = getIconComponent(feature.title === "Global Tax Support" ? "Globe" : 
                      feature.title === "Smart Reminders" ? "Bell" :
                      feature.title === "Recurring Billing" ? "Repeat" :
                      feature.title === "Sales Analytics" ? "BarChart3" :
                      feature.title === "Multi-Currency" ? "DollarSign" :
                      feature.title === "Custom Branding" ? "Palette" :
                      feature.title === "Revenue Analytics" ? "LineChart" :
                      "Calculator");
                    return <IconComponent className="h-5 w-5 text-slate-700 dark:text-slate-300" />;
                  })()}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {testimonialsList.map((testimonial: any, idx: number) => (
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
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="get-started"
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-emerald-900 to-cyan-900 px-6 py-16 text-center shadow-2xl sm:px-10">
          <div className="absolute inset-0 bg-noise opacity-5" />
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-emerald-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-cyan-500 rounded-full blur-3xl opacity-20" />

          <div className="relative">
            <Sparkles className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <ScriptHeading className="text-white text-4xl sm:text-5xl">
              {t("ctaBanner.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
              {t("ctaBanner.description")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-6 py-3 font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("ctaBanner.trialButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white px-6 py-3 font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                {t("ctaBanner.salesButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}