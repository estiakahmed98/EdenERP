"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeDollarSign,
  BadgePercent,
  BarChart3,
  Boxes,
  CheckCircle2,
  CirclePlay,
  CreditCard,
  FileCheck2,
  FileText,
  Globe2,
  HandCoins,
  Layers3,
  PackageCheck,
  Palette,
  ReceiptText,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tags,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl ${className}`}
      style={scriptFont}
    >
      {children}
    </h2>
  );
}

function HandUnderline({
  children,
  color = "bg-amber-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-2 w-[105%] -translate-x-1/2 -rotate-1 rounded-full ${color}`}
      />
    </span>
  );
}

function HandCircle({
  children,
  color = "border-teal-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-2">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 top-1/2 h-[1.25em] -translate-y-1/2 -rotate-3 rounded-[50%] border-[5px] ${color}`}
      />
    </span>
  );
}

function SectionEyebrow({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-950/40 px-4 py-2 text-sm font-semibold text-rose-700 dark:text-rose-300 shadow-sm ring-1 ring-rose-100 dark:ring-rose-800">
      <span className="text-rose-500 dark:text-rose-400">{icon}</span>
      {label}
    </div>
  );
}

function QuotationPreview({ t }: { t: any }) {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            {t("dashboard.appName")}
          </span>
        </div>
        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {t("dashboard.status")}
        </span>
      </div>

      <Image
        src="/Assets/Sales/Smart sales quotations.png"
        alt="Smart sales quotations"
        width={1200}
        height={900}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function SalesQuotationPage() {
  const t = useTranslations("pages.sales-quotation");

  // Get translated features
  const featuresList = [
    {
      title: t("featuresSection.features.reporting.title"),
      description: t("featuresSection.features.reporting.description"),
      icon: BarChart3,
    },
    {
      title: t("featuresSection.features.shippingIntegration.title"),
      description: t(
        "featuresSection.features.shippingIntegration.description",
      ),
      icon: PackageCheck,
    },
    {
      title: t("featuresSection.features.invoicing.title"),
      description: t("featuresSection.features.invoicing.description"),
      icon: ReceiptText,
    },
    {
      title: t("featuresSection.features.upselling.title"),
      description: t("featuresSection.features.upselling.description"),
      icon: Tags,
    },
    {
      title: t("featuresSection.features.quotationTemplates.title"),
      description: t("featuresSection.features.quotationTemplates.description"),
      icon: Layers3,
    },
    {
      title: t("featuresSection.features.customerCommunication.title"),
      description: t(
        "featuresSection.features.customerCommunication.description",
      ),
      icon: Send,
    },
  ];

  // Get translated apps
  const appsList = [
    {
      title: t("appsSection.apps.crm.title"),
      desc: t("appsSection.apps.crm.desc"),
      icon: Users,
    },
    {
      title: t("appsSection.apps.invoicing.title"),
      desc: t("appsSection.apps.invoicing.desc"),
      icon: ReceiptText,
    },
    {
      title: t("appsSection.apps.sign.title"),
      desc: t("appsSection.apps.sign.desc"),
      icon: FileCheck2,
    },
    {
      title: t("appsSection.apps.accounting.title"),
      desc: t("appsSection.apps.accounting.desc"),
      icon: BadgeDollarSign,
    },
    {
      title: t("appsSection.apps.onlinePayment.title"),
      desc: t("appsSection.apps.onlinePayment.desc"),
      icon: CreditCard,
    },
    {
      title: t("appsSection.apps.inventory.title"),
      desc: t("appsSection.apps.inventory.desc"),
      icon: Boxes,
    },
  ];

  // Get translated strategies
  const strategies = [
    {
      title: t("strategiesSection.items.loyaltyPrograms"),
      icon: HandCoins,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: t("strategiesSection.items.coupons"),
      icon: BadgePercent,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: t("strategiesSection.items.giftCards"),
      icon: WalletCards,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: t("strategiesSection.items.eWallet"),
      icon: CreditCard,
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
  ];

  const portalFeatures = [
    t("portalSection.features.onlineAcceptance"),
    t("portalSection.features.integratedPayment"),
    t("portalSection.features.automaticConfirmation"),
  ];

  const configItems = [
    {
      label: t("productControlSection.configCard.items.seats"),
      value: t("productControlSection.configCard.values.seats"),
      width: 70,
    },
    {
      label: t("productControlSection.configCard.items.supportLevel"),
      value: t("productControlSection.configCard.values.supportLevel"),
      width: 85,
    },
    {
      label: t("productControlSection.configCard.items.implementationSpeed"),
      value: t("productControlSection.configCard.values.implementationSpeed"),
      width: 60,
    },
    {
      label: t("productControlSection.configCard.items.paymentTerm"),
      value: t("productControlSection.configCard.values.paymentTerm"),
      width: 90,
    },
  ];

  const priceListItems = [
    { name: t("productsSection.priceList.items.starter"), price: "$499" },
    { name: t("productsSection.priceList.items.business"), price: "$1,299" },
    { name: t("productsSection.priceList.items.enterprise"), price: "$2,899" },
  ];

  const productCatalogItems = [
    t("productsSection.productCatalog.items.crm"),
    t("productsSection.productCatalog.items.erp"),
    t("productsSection.productCatalog.items.support"),
    t("productsSection.productCatalog.items.training"),
  ];

  const templateItems = [
    {
      title: t("templatesSection.templateCard.items.implementation"),
      price: "$4,500",
    },
    {
      title: t("templatesSection.templateCard.items.support"),
      price: "$950/mo",
    },
    {
      title: t("templatesSection.templateCard.items.training"),
      price: "$1,250",
    },
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(244,63,94,0.13),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(251,146,60,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(244,63,94,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(251,146,60,0.07),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            label={t("hero.eyebrow.label")}
            icon={<FileText className="h-4 w-4" />}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {t("hero.title")}{" "}
              <span
                className="text-rose-500 dark:text-rose-400"
                style={scriptFont}
              >
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-rose-300 hover:text-rose-700 dark:hover:border-rose-600 dark:hover:text-rose-400"
            >
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <QuotationPreview t={t} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-rose-600 dark:text-rose-400" />
              {t("dashboard.badges.fasterProposals")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t("dashboard.badges.readyToApprove")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionEyebrow
              label={t("productsSection.eyebrow.label")}
              icon={<ShoppingCart className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              {t("productsSection.title")}
              <br />
              {t("productsSection.subtitle")}
            </ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("productsSection.description")}
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_25px_70px_rgba(15,23,42,0.1)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <Image
              src="/Assets/Sales/Manage products and pricing.png"
              alt="Manage products and pricing"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -bottom-4 -left-14 h-20 w-20 rounded-full border-8 border-slate-200 dark:border-slate-700" />
            <div className="absolute -bottom-7 left-2 h-14 w-14 rounded-full border-6 border-slate-200 dark:border-slate-700" />
            <div className="relative rotate-6 rounded-2xl bg-amber-400 dark:bg-amber-500 p-4 shadow-xl ring-4 ring-slate-950 dark:ring-slate-800">
              <FileText className="h-14 w-14 text-slate-950 dark:text-slate-900" />
            </div>
          </div>
        </div>

        <SectionEyebrow
          label={t("templatesSection.eyebrow.label")}
          icon={<Layers3 className="h-4 w-4" />}
        />

        <ScriptHeading className="mt-5">
          {t("templatesSection.title")}
          <br />
          <HandUnderline color="bg-amber-400 dark:bg-amber-500">
            {t("templatesSection.highlight")}
          </HandUnderline>
        </ScriptHeading>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("templatesSection.description")}
        </p>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5 text-left">
            <div>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                {t("templatesSection.templateCard.title")}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                {t("templatesSection.templateCard.name")}
              </h3>
            </div>
            <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition">
              {t("templatesSection.templateCard.button")}
            </button>
          </div>

          <Image
            src="/Assets/Sales/Use quote templates.png"
            alt="Use quote templates"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            label={t("portalSection.eyebrow.label")}
            icon={<Globe2 className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("portalSection.title")}
            <br />
            {t("portalSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("portalSection.description")}
          </p>

          <div className="mt-8 space-y-4">
            {portalFeatures.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <Image
            src="/Assets/Sales/Customer portal.png"
            alt="Customer portal"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionEyebrow
              label={t("leadsSection.eyebrow.label")}
              icon={<ShieldCheck className="h-4 w-4" />}
            />

            <ScriptHeading className="mt-5">
              {t("leadsSection.title")}
              <br />
              <HandCircle color="border-teal-400 dark:border-teal-500">
                {t("leadsSection.highlight")}
              </HandCircle>
            </ScriptHeading>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("leadsSection.description")}
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <Image
              src="/Assets/Sales/Qualified leads.png"
              alt="Qualified leads"
              width={1200}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <ScriptHeading>
              {t("strategiesSection.title")}
              <br />
              {t("strategiesSection.subtitle")}
            </ScriptHeading>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {strategies.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-3xl ${item.bg} dark:bg-opacity-20 ${item.color} shadow-sm ring-4 ring-slate-950/90 dark:ring-slate-700`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>
                  <p
                    className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white"
                    style={scriptFont}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-5">
            <p className="font-semibold text-slate-950 dark:text-white">
              {t("productControlSection.configCard.title")}
            </p>

            <div className="mt-5 space-y-4">
              {configItems.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="text-rose-600 dark:text-rose-400">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-linear-to-r from-rose-500 to-orange-400"
                      style={{ width: `${item.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionEyebrow
            label={t("productControlSection.eyebrow.label")}
            icon={<Palette className="h-4 w-4" />}
          />

          <ScriptHeading className="mt-5">
            {t("productControlSection.title")}
            <br />
            {t("productControlSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("productControlSection.description")}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {t("featuresSection.title")}{" "}
            <HandCircle color="border-teal-400 dark:border-teal-500">
              {t("featuresSection.highlight")}
            </HandCircle>
            <br />
            <HandUnderline color="bg-sky-400 dark:bg-sky-500">
              {t("featuresSection.subtitle")}
            </HandUnderline>
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuresList.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-4xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300"
          >
            {t("featuresSection.seeAllFeatures")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          {t("appsSection.title")}{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-500">
            {t("appsSection.needHighlight")}
          </HandUnderline>
          ,{" "}
          <HandUnderline color="bg-sky-400 dark:bg-sky-500">
            {t("appsSection.appHighlight")}
          </HandUnderline>
          .
        </ScriptHeading>
        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
          {t("appsSection.description")}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appsList.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300"
        >
          {t("appsSection.seeAllApps")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 dark:bg-slate-900/70 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              {t("ctaSection.description")}
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-rose-600 dark:text-rose-400" />

        <ScriptHeading>
          {t("getStartedSection.title")}
          <br />
          {t("getStartedSection.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t("getStartedSection.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5 dark:shadow-rose-500/30"
          >
            {t("getStartedSection.buttons.contactSales")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
