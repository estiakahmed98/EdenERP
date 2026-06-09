"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { FaqItem } from "./FaqItem";
import { PricingContent } from "./types";

interface SuccessPacksPageProps {
  data: PricingContent;
  onBack: () => void;
}

export function SuccessPacksPage({ data, onBack }: SuccessPacksPageProps) {
  const content = data.successPacksPage;
  const packages = data.erpPackages;
  const router = useRouter();
  const packageFeatures = Array.from(
    new Set(packages.flatMap((pack) => pack.features)),
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#ecfdf5_100%)] dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <span className="text-lg">←</span> {content.backButton}
          </button>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                {content.title}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {content.description}
                </strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              {content.estimatorBadge}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[175px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <th className="p-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    {content.comparisonTable?.featureHeader}
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
                            -
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

        {!!content.notes?.length && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            {content.notes.map((note: string, i: number) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            {content.faq.title}
          </h2>
          {content.faq.items.map((item, idx: number) => (
            <FaqItem
              key={item.id ?? idx}
              q={item.question}
              a={item.answer}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
