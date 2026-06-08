"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { FaqItem } from "./FaqItem";
import { ERPPlan } from "./types";

interface SuccessPacksPageProps {
  onBack: () => void;
}

export function SuccessPacksPage({ onBack }: SuccessPacksPageProps) {
  const t = useTranslations("pages.pricing");
  const tSuccess = useTranslations("pages.pricing.successPacksPage");
  const tPackage = useTranslations("pages.pricing.packagePricing");
  const packages = t.raw("erpPackages") as ERPPlan[];
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
            <table className="w-full min-w-[175] border-collapse">
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
