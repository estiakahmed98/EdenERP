"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  Building2,
  Zap,
  Moon,
  Sun,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────────────────────
type BillingCycle = "yearly" | "monthly";
type CurrencyCode = "BDT" | "USD";
type PageType = "pricing" | "standard" | "success-packs";

const PRICING_CURRENCY = {
  symbol: "$",
  locale: "en-US",
};

const BDT_PER_USD = 122;
const YEARLY_DISCOUNT_RATE = 0.2;
const YEARLY_DISCOUNT_MULTIPLIER = 0.8;

// ──────────────────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────────────────
const SUCCESS_PACKS = [
  {
    id: "starter",
    nameKey: "starter",
    color: "#e06b5d",
    hours: 4,
    priceNew: 190,
    priceReturning: 223.53,
    recommendedKey: "starter",
    features: {
      projectManagement: false,
      emailPhoneSupport: true,
      trainingCoaching: true,
      configuration: true,
      dataImport: false,
      onsiteConsulting: false,
      customization: false,
      development: false,
      performanceIssues: false,
    },
  },
  {
    id: "basic",
    nameKey: "basic",
    color: "#6c757d",
    hours: 25,
    priceNew: 977.5,
    priceReturning: 1150,
    recommendedKey: "basic",
    features: {
      projectManagement: true,
      emailPhoneSupport: true,
      trainingCoaching: true,
      configuration: true,
      dataImport: true,
      onsiteConsulting: false,
      customization: true,
      development: false,
      performanceIssues: false,
    },
  },
  {
    id: "standard",
    nameKey: "standard",
    color: "#e06b5d",
    hours: 50,
    priceNew: 1904,
    priceReturning: 2240,
    recommendedKey: "standard",
    features: {
      projectManagement: true,
      emailPhoneSupport: true,
      trainingCoaching: true,
      configuration: true,
      dataImport: true,
      onsiteConsulting: true,
      customization: true,
      development: true,
      performanceIssues: true,
    },
    highlighted: true,
  },
  {
    id: "custom",
    nameKey: "custom",
    color: "#3aafa9",
    hours: 100,
    priceNew: 3400,
    priceReturning: 2500,
    recommendedKey: "custom",
    features: {
      projectManagement: true,
      emailPhoneSupport: true,
      trainingCoaching: true,
      configuration: true,
      dataImport: true,
      onsiteConsulting: true,
      customization: true,
      development: true,
      performanceIssues: true,
    },
  },
  {
    id: "pro",
    nameKey: "pro",
    color: "#3aafa9",
    hours: 200,
    priceNew: 6800,
    priceReturning: 8000,
    recommendedKey: "pro",
    features: {
      projectManagement: true,
      emailPhoneSupport: true,
      trainingCoaching: true,
      configuration: true,
      dataImport: true,
      onsiteConsulting: true,
      customization: true,
      development: true,
      performanceIssues: true,
    },
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────────────────────────────────────
const formatPricingAmount = (amount: number): string =>
  `${PRICING_CURRENCY.symbol}${new Intl.NumberFormat(PRICING_CURRENCY.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

const convertAmount = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
) => {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === "BDT" ? amount / BDT_PER_USD : amount * BDT_PER_USD;
};

const formatCurrency = (
  amount: number,
  currency: CurrencyCode,
  fromCurrency: CurrencyCode = currency,
) => {
  const value = convertAmount(amount, fromCurrency, currency);
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency === "BDT" ? 0 : 2,
    maximumFractionDigits: currency === "BDT" ? 0 : 2,
  }).format(value);

  return currency === "BDT" ? `৳${formatted}` : `$${formatted}`;
};

// Helper for BDT packages
const getMonthlyEquivalent = (quarterlyFee: number): number => {
  return quarterlyFee / 3;
};

const getPerUserMonthly = (quarterlyFee: number, users: number): number => {
  return quarterlyFee / 3 / users;
};

// ──────────────────────────────────────────────────────────────────────────────
// THEME TOGGLE
// ──────────────────────────────────────────────────────────────────────────────
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-white p-3 shadow-lg ring-1 ring-slate-200 transition-all hover:scale-110 dark:bg-slate-800 dark:ring-slate-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FAQ ITEM COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="mb-3 cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900 dark:text-white">
          {q}
        </span>
        <span
          className={`text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {a}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION EYEBROW COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────────────────────
// SUCCESS PACKS PAGE
// ──────────────────────────────────────────────────────────────────────────────
function SuccessPacksPage({ onBack }: { onBack: () => void }) {
  const t = useTranslations("pages.pricing");
  const tSuccess = useTranslations("pages.pricing.successPacksPage");
  const tPackage = useTranslations("pages.pricing.packagePricing");
  const packages = t.raw("erpPackages") as Array<{
    id: string;
    name: string;
    tagline: string;
    badge?: string | null;
    icon: string;
    accent: string;
    users: number;
    currency: CurrencyCode;
    setupFee: number;
    quarterlyFee?: number;
    monthlyFee?: number;
    serverFee?: number;
    cta: string;
    features: string[];
  }>;
  const packageFeatures = Array.from(
    new Set(packages.flatMap((pack) => pack.features)),
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <span className="text-lg">←</span> {tSuccess("backButton")}
          </button>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                {tSuccess("title")}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {tSuccess("description")}
                </strong>
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
              {tSuccess("estimatorBadge")}
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map((pack) => {
            const isEnterprise = pack.id === "enterprise";
            const isHighlighted = Boolean(pack.badge);
            const monthlyAmount = isEnterprise
              ? (pack.monthlyFee ?? 0) + (pack.serverFee ?? 0)
              : (pack.quarterlyFee ?? 0) / 3;
            const secondaryAmount = isEnterprise
              ? pack.setupFee
              : pack.setupFee;

            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={`overflow-hidden rounded-xl border transition-all ${
                  isHighlighted
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/10"
                    : "border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
                }`}
                style={{
                  background: isHighlighted ? pack.accent : undefined,
                  transform: isHighlighted ? "translateY(-4px)" : "none",
                }}
              >
                <div className="p-5 text-center">
                  <div
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                    style={{
                      background: isHighlighted
                        ? "rgba(255,255,255,0.2)"
                        : pack.accent + "15",
                      color: isHighlighted ? "#fff" : pack.accent,
                    }}
                  >
                    {pack.name}
                  </div>
                  <div className="mt-3 text-3xl">{pack.icon}</div>
                  <div
                    className="mt-3 text-3xl font-bold"
                    style={{ color: isHighlighted ? "#fff" : pack.accent }}
                  >
                    {pack.users}
                    <span className="text-sm font-normal opacity-70">
                      {" "}
                      {tPackage("usersLabel")}
                    </span>
                  </div>
                  <div
                    className="mt-1 whitespace-pre-line text-xs opacity-70"
                    style={{
                      color: isHighlighted
                        ? "rgba(255,255,255,0.8)"
                        : undefined,
                    }}
                  >
                    <span
                      className={
                        isHighlighted
                          ? ""
                          : "text-slate-500 dark:text-slate-400"
                      }
                    >
                      {pack.tagline}
                    </span>
                  </div>
                  <div
                    className={`mt-4 text-2xl font-bold ${
                      isHighlighted
                        ? "text-white"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {isEnterprise
                      ? `$${monthlyAmount.toFixed(2)}`
                      : `৳${Math.round(monthlyAmount).toLocaleString("en-US")}`}
                  </div>
                  <div
                    className={`text-xs ${isHighlighted ? "text-white/70" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {isEnterprise
                      ? tPackage("monthlyCharge")
                      : tPackage("perMonth")}
                  </div>
                </div>
                <div className="space-y-2 p-4 pt-0">
                  <div>
                    <div
                      className={`text-xs ${
                        isHighlighted
                          ? "text-white/70"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {isEnterprise
                        ? tPackage("serverMaintenance")
                        : tPackage("everyThreeMonths")}
                    </div>
                    <div
                      className={`font-semibold ${
                        isHighlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {isEnterprise
                        ? `$${(pack.serverFee ?? 0).toFixed(2)}`
                        : `৳${Math.round(pack.quarterlyFee ?? 0).toLocaleString("en-US")}`}
                    </div>
                  </div>
                  <div
                    style={{
                      background: isHighlighted
                        ? "rgba(255,255,255,0.15)"
                        : undefined,
                    }}
                    className={`rounded-lg p-2 ${
                      isHighlighted ? "" : "bg-slate-50 dark:bg-slate-800/80"
                    }`}
                  >
                    <div
                      className={`text-xs ${
                        isHighlighted
                          ? "text-white/80"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {tPackage("oneTimeSetup")}
                    </div>
                    <div
                      className={`font-bold ${
                        isHighlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {isEnterprise
                        ? `$${secondaryAmount.toFixed(2)}`
                        : `৳${Math.round(secondaryAmount).toLocaleString("en-US")}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <th className="p-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    {tSuccess("comparisonTable.featureHeader")}
                  </th>
                  {packages.map((p) => (
                    <th
                      key={p.id}
                      className="p-4 text-center text-sm font-semibold"
                      style={{ color: p.badge ? p.accent : undefined }}
                    >
                      <span
                        className={
                          p.badge ? "" : "text-slate-600 dark:text-slate-300"
                        }
                      >
                        {p.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packageFeatures.map((feature, idx) => (
                  <tr
                    key={feature}
                    className={`border-b border-slate-100 dark:border-slate-700 ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-slate-900"
                        : "bg-slate-50 dark:bg-slate-800/50"
                    }`}
                  >
                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                      {feature}
                    </td>
                    {packages.map((pack) => (
                      <td key={pack.id} className="p-4 text-center">
                        {pack.id === "enterprise" ||
                        pack.features.includes(feature) ? (
                          <CheckCircle2
                            className="mx-auto h-5 w-5"
                            style={{ color: pack.accent }}
                          />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
          {tSuccess.raw("notes").map((note: string, i: number) => (
            <p key={i}>{note}</p>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            {tSuccess("faq.title")}
          </h2>
          {tSuccess
            .raw("faq.items")
            .map((item: { question: string; answer: string }, idx: number) => (
              <FaqItem key={idx} q={item.question} a={item.answer} />
            ))}
        </div>
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// STANDARD PLAN DETAIL PAGE
// ──────────────────────────────────────────────────────────────────────────────
function StandardPlanPage({
  onBack,
  onReadMore,
}: {
  onBack: () => void;
  onReadMore: () => void;
}) {
  const t = useTranslations("pages.pricing");
  const tStandard = useTranslations("pages.pricing.standardPlanPage");
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [userCount, setUserCount] = useState(1);
  const [implService, setImplService] = useState("success-pack");

  const pricePerUser = billing === "yearly" ? 7.25 : 8.95;
  const monthly = userCount * pricePerUser;
  const annually = monthly * 12;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <span className="text-lg">←</span> {tStandard("backButton")}
        </button>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-5xl">
            <span className="text-emerald-600 dark:text-emerald-400">
              {t("plans.standard.name")}
            </span>{" "}
            {tStandard("title")}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {tStandard("description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard("userCountLabel")}
              </label>
              <div className="flex w-fit overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setUserCount(Math.max(1, userCount - 1))}
                  className="w-10 bg-slate-50 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  −
                </button>
                <input
                  type="number"
                  value={userCount}
                  min={1}
                  onChange={(e) =>
                    setUserCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center text-lg font-bold outline-none dark:bg-slate-900 dark:text-white"
                />
                <button
                  onClick={() => setUserCount(userCount + 1)}
                  className="w-10 bg-slate-50 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <label className="mb-4 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {tStandard("implementationLabel")}
              </label>
              <div className="space-y-3">
                {[
                  {
                    id: "self",
                    label: tStandard("implementationOptions.self"),
                  },
                  {
                    id: "success-pack",
                    label: tStandard("implementationOptions.successPack"),
                    sublabel: tStandard(
                      "implementationOptions.successPackSublabel",
                    ),
                  },
                  {
                    id: "partner",
                    label: tStandard("implementationOptions.partner"),
                    sublabel: tStandard(
                      "implementationOptions.partnerSublabel",
                    ),
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all ${
                      implService === opt.id
                        ? "border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                        : "border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="impl"
                      value={opt.id}
                      checked={implService === opt.id}
                      onChange={() => setImplService(opt.id)}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {opt.label}
                      </div>
                      {opt.sublabel && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {implService === "success-pack" && (
                <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-800 dark:bg-cyan-950/30">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {tStandard("successPackMessage.text")}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      {tStandard("successPackMessage.configureButton")}
                    </button>
                    <button
                      onClick={onReadMore}
                      className="rounded-lg border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
                    >
                      {tStandard("successPackMessage.readMoreButton")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-6 h-fit rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  billing === "yearly"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                {t("hero.billingToggle.yearly")}
              </span>
              <button
                onClick={() =>
                  setBilling(billing === "yearly" ? "monthly" : "yearly")
                }
                className={`relative h-6 w-12 rounded-full transition-colors ${
                  billing === "monthly"
                    ? "bg-emerald-600"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    billing === "monthly" ? "right-1" : "left-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  billing === "monthly"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                {t("hero.billingToggle.monthly")}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {userCount} {tStandard("userCountLabel")},{" "}
                  {t("plans.standard.name")}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {formatPricingAmount(userCount * 8.95)}
                </span>
              </div>
              {billing === "yearly" && (
                <div className="mb-2 flex justify-between">
                  <span className="text-sm italic text-slate-500 dark:text-slate-400">
                    {tStandard("priceSummary.firstYearDiscount")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    −{formatPricingAmount(userCount * 1.7)}
                  </span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {tStandard("priceSummary.totalPerMonth")}
                  </span>
                  {billing === "yearly" && (
                    <div className="text-xs text-slate-400">
                      {tStandard("priceSummary.yearlyBillNote")}{" "}
                      {formatPricingAmount(annually)}
                    </div>
                  )}
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {formatPricingAmount(monthly)}
                </span>
              </div>
            </div>

            {billing === "yearly" && (
              <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                🎉{" "}
                {tStandard("priceSummary.yearlySavings", {
                  amount: formatPricingAmount(userCount * 1.7 * 12),
                })}
              </div>
            )}

            <button className="mt-5 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
              {tStandard("priceSummary.buyNow")}
            </button>
            <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
              {tStandard("priceSummary.quotaPrint")}
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {tStandard("includedTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tStandard.raw("includedList").map((f: string) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PRICING PAGE
// ──────────────────────────────────────────────────────────────────────────────
function PricingPage({
  onBuyNow,
  onSuccessPacks,
}: {
  onBuyNow: () => void;
  onSuccessPacks: () => void;
}) {
  const t = useTranslations("pages.pricing");
  const tPackage = useTranslations("pages.pricing.packagePricing");
  const packagePricingMessages = t.raw("packagePricing") as Record<
    string,
    string
  >;
  const perYearLabel = packagePricingMessages.perYear ?? "Per year";
  const savePerUserMonthLabel =
    packagePricingMessages.savePerUserMonth ?? "Save {amount} / user / month";
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [currency, setCurrency] = useState<CurrencyCode>("BDT");

  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label={t("hero.eyebrow")}
          />

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {t("hero.title")}
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
            <div className="relative inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <button
                onClick={() => setBilling("yearly")}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  billing === "yearly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("hero.billingToggle.yearly")}
                <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {t("hero.billingToggle.yearlyDiscount")}
                </span>
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  billing === "monthly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("hero.billingToggle.monthly")}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                {(["BDT", "USD"] as const).map((nextCurrency) => (
                  <button
                    key={nextCurrency}
                    onClick={() => setCurrency(nextCurrency)}
                    className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                      currency === nextCurrency
                        ? "bg-slate-900 text-white shadow-md dark:bg-emerald-600"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {nextCurrency}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {t("packagePricing.currencyRate")}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.raw("erpPackages").map((plan: any) => {
              const isEnterprise = plan.id === "enterprise";
              const isHighlighted =
                plan.badge === "Most popular" ||
                plan.badge === "সবচেয়ে জনপ্রিয়";

              let usersCount = plan.users;
              let mainPrice: number;
              let mainPriceLabel: string;
              let secondaryPrice: number | null = null;
              let secondaryPriceLabel: string | null = null;
              let originalMainPrice: number | null = null;
              let originalSecondaryPrice: number | null = null;
              let savingsPerUserMonthly: number | null = null;
              let details: {
                label: string;
                amount: number;
                currency: string;
              }[] = [];
              let displayCurrency: CurrencyCode = isEnterprise
                ? "USD"
                : currency;

              if (isEnterprise) {
                mainPrice =
                  billing === "yearly"
                    ? plan.monthlyFee * 12
                    : plan.monthlyFee;
                mainPriceLabel =
                  billing === "yearly"
                    ? perYearLabel
                    : tPackage("monthlyCharge");
                secondaryPrice = null;
                secondaryPriceLabel = null;
                originalMainPrice = null;
                originalSecondaryPrice = null;
                savingsPerUserMonthly = null;

                details = [
                  {
                    label: tPackage("monthlyCharge"),
                    amount: plan.monthlyFee,
                    currency: "USD",
                  },
                  {
                    label: tPackage("serverMaintenance"),
                    amount: plan.serverFee,
                    currency: "USD",
                  },
                  {
                    label: tPackage("oneTimeSetup"),
                    amount: plan.setupFee,
                    currency: "USD",
                  },
                ];
              } else {
                const quarterlyFee = plan.quarterlyFee;
                const monthlyEquivalent = getMonthlyEquivalent(quarterlyFee);
                const perUserMonthly = getPerUserMonthly(
                  quarterlyFee,
                  usersCount,
                );
                const discountedPerUserMonthly =
                  perUserMonthly * YEARLY_DISCOUNT_MULTIPLIER;
                const yearlyEquivalent =
                  monthlyEquivalent * 12 * YEARLY_DISCOUNT_MULTIPLIER;

                mainPrice =
                  billing === "yearly"
                    ? discountedPerUserMonthly
                    : perUserMonthly;
                mainPriceLabel = tPackage("perUser");
                secondaryPrice =
                  billing === "yearly" ? yearlyEquivalent : monthlyEquivalent;
                secondaryPriceLabel =
                  billing === "yearly" ? perYearLabel : tPackage("perMonth");
                originalMainPrice =
                  billing === "yearly" ? perUserMonthly : null;
                originalSecondaryPrice =
                  billing === "yearly" ? monthlyEquivalent * 12 : null;
                savingsPerUserMonthly =
                  billing === "yearly"
                    ? perUserMonthly * YEARLY_DISCOUNT_RATE
                    : null;

                details = [
                  {
                    label: tPackage("everyThreeMonths"),
                    amount: quarterlyFee,
                    currency: "BDT",
                  },
                  {
                    label: tPackage("oneTimeSetup"),
                    amount: plan.setupFee,
                    currency: "BDT",
                  },
                ];
              }

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 ${
                    isHighlighted
                      ? "-translate-y-3 bg-slate-900 shadow-2xl shadow-slate-900/20 dark:bg-slate-900"
                      : "border border-slate-200 bg-white shadow-sm shadow-slate-200/70 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
                  } ${plan.badge ? "pt-10" : ""}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white shadow-md whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                        isHighlighted
                          ? "bg-white/10 ring-1 ring-white/10"
                          : "bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3
                      className={`mt-4 text-2xl font-bold ${
                        isHighlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        isHighlighted
                          ? "text-slate-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.tagline}
                    </p>
                  </div>

                  <div
                    className={`mt-6 rounded-2xl p-4 text-center ${
                      isHighlighted
                        ? "bg-white/5 ring-1 ring-white/10"
                        : "bg-slate-50 ring-1 ring-slate-100 dark:bg-slate-800/70 dark:ring-slate-700"
                    }`}
                  >
                    <div
                      className={`text-4xl font-bold leading-none ${
                        isHighlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {usersCount}
                    </div>
                    <div
                      className={`mt-2 text-sm font-semibold uppercase tracking-[0.18em] ${
                        isHighlighted
                          ? "text-slate-300"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {tPackage("usersLabel")}
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    {originalMainPrice !== null && (
                      <p
                        className={`text-sm line-through ${
                          isHighlighted
                            ? "text-slate-400"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {formatCurrency(
                          originalMainPrice,
                          displayCurrency,
                          "BDT",
                        )}
                      </p>
                    )}
                    <div
                      className={`text-4xl font-bold tracking-tight lg:text-[2.75rem] ${
                        isHighlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {formatCurrency(
                        mainPrice,
                        displayCurrency,
                        isEnterprise ? "USD" : "BDT",
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm ${
                        isHighlighted
                          ? "text-slate-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {mainPriceLabel}
                    </p>
                    {savingsPerUserMonthly !== null && (
                      <p className="mt-2 text-sm font-medium text-emerald-500">
                        {savePerUserMonthLabel.replace(
                          "{amount}",
                          formatCurrency(
                            savingsPerUserMonthly,
                            displayCurrency,
                            "BDT",
                          ),
                        )}
                      </p>
                    )}
                  </div>

                  {secondaryPrice !== null && secondaryPriceLabel && (
                    <div className="mt-2 text-center">
                      {originalSecondaryPrice !== null && (
                        <p
                          className={`text-xs line-through ${
                            isHighlighted
                              ? "text-slate-500"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {formatCurrency(
                            originalSecondaryPrice,
                            displayCurrency,
                            "BDT",
                          )}
                        </p>
                      )}
                      <p
                        className={`text-sm font-medium ${
                          isHighlighted
                            ? "text-slate-300"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {formatCurrency(
                          secondaryPrice,
                          displayCurrency,
                          isEnterprise ? "USD" : "BDT",
                        )}{" "}
                        {secondaryPriceLabel}
                      </p>
                    </div>
                  )}

                  <div
                    className={`mt-6 space-y-3 rounded-2xl p-4 text-sm ${
                      isHighlighted
                        ? "bg-white/5 text-slate-200 ring-1 ring-white/10"
                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700"
                    }`}
                  >
                    {details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-left">{detail.label}</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            detail.amount,
                            displayCurrency,
                            detail.currency as CurrencyCode,
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onBuyNow()}
                    className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "border bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    style={
                      !isHighlighted && !isEnterprise
                        ? {
                            borderColor: plan.accent,
                            color: plan.accent,
                            boxShadow: `inset 0 0 0 1px ${plan.accent}20`,
                          }
                        : !isHighlighted && isEnterprise
                          ? {
                              borderColor: "#3aafa9",
                              color: "#3aafa9",
                              boxShadow: "inset 0 0 0 1px rgba(58,175,169,0.2)",
                            }
                          : {}
                    }
                  >
                    {plan.cta}
                  </button>

                  <div
                    className={`mt-6 border-t pt-5 ${
                      isHighlighted
                        ? "border-slate-700"
                        : "border-slate-100 dark:border-slate-700"
                    }`}
                  >
                    <div
                      className={`mb-2 text-[10px] font-bold uppercase tracking-wide ${
                        isHighlighted ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {t("includedFeaturesHeading")}
                    </div>
                    <div className="space-y-2">
                      {plan.features.map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 flex-shrink-0"
                            style={{
                              color:
                                plan.accent ||
                                (isEnterprise ? "#3aafa9" : undefined),
                            }}
                          />
                          <span
                            className={
                              isHighlighted
                                ? "text-slate-300"
                                : "text-slate-600 dark:text-slate-400"
                            }
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              {t("modules.title")}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {t.raw("modules.list").map((module: string) => (
                <span
                  key={module}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                {t("faq.title")}
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {t("faq.description")}
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              {t
                .raw("faq.items")
                .map(
                  (faq: { question: string; answer: string }, idx: number) => (
                    <FaqItem key={idx} q={faq.question} a={faq.answer} />
                  ),
                )}
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-center text-white dark:from-slate-950 dark:to-slate-900">
            <h2 className="text-2xl font-bold">{t("finalCta.title")}</h2>
            <p className="mt-2 text-slate-300">{t("finalCta.description")}</p>
            <button className="mt-5 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold transition hover:bg-emerald-700">
              {t("finalCta.button")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ──────────────────────────────────────────────────────────────────────────────
export default function PricingPageRoot() {
  const [page, setPage] = useState<PageType>("pricing");

  if (page === "standard") {
    return (
      <StandardPlanPage
        onBack={() => setPage("pricing")}
        onReadMore={() => setPage("success-packs")}
      />
    );
  }
  if (page === "success-packs") {
    return <SuccessPacksPage onBack={() => setPage("pricing")} />;
  }
  return (
    <PricingPage
      onBuyNow={() => setPage("standard")}
      onSuccessPacks={() => setPage("success-packs")}
    />
  );
}
