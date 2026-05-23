"use client";

import React from "react";

import { useLanguage } from "./LanguageProvider";
import { HandText, SectionTag, ThreeBg, TypeWriter } from "./landing-ui";

export default function Hero() {
  const { t } = useLanguage();
  const typeWords = t("hero.typeWords") as string[];

  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-25 dark:bg-slate-950">
      <ThreeBg />

      <div className="pointer-events-none absolute -left-20 -top-30 h-105 w-105 rounded-full bg-[#f3eef122] blur-[60px]" />

      <div className="pointer-events-none absolute -right-25 top-15 h-80 w-80 rounded-full bg-[#02cfc30a] blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-225 px-6 text-center">
        <div className="reveal animate-[fadeIn_.6s_both]">
          <SectionTag>{t("hero.tag")}</SectionTag>
        </div>

        <h1 className="reveal reveal-d1 mt-6 font-hand text-[clamp(52px,8vw,96px)] font-bold leading-[1.05] tracking-[-1px] text-[#1a1a2e] dark:text-slate-100">
          {t("hero.titlePrefix")} <br />
          <HandText>
            <TypeWriter words={typeWords} />
          </HandText>
        </h1>

        <p className="reveal reveal-d2 mx-auto mt-5 max-w-130 font-body text-lg leading-[1.7] text-muted">
          {t("hero.description")}
        </p>

        <div className="reveal reveal-d3 mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-[10px] border-[1.5px] border-purple bg-(--purple) text-white px-5.5 py-3 font-body text-[15px] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-purple hover:text-purple">
            {t("common.watchDemo")}
          </button>
        </div>

        {/* <p className="reveal mt-3 font-body text-xs text-[#aaa]">
          {t("common.priceNote")}
        </p> */}

        <div className="reveal shadow-float mt-14 animate-[scale-in_.8s_.5s_both] overflow-hidden rounded-[20px] border border-[#eeedf2] bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-[#ede8e0] bg-[#f8f5f2] px-4.5 py-2.5 dark:border-slate-800 dark:bg-slate-800">
            <div className="flex gap-1.25">
              {["#f87171", "#fbbf24", "#34d399"].map((color) => (
                <div
                  key={color}
                  className="h-2.75 w-2.75 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>

            <div className="flex h-5.5 flex-1 items-center justify-center rounded-md bg-[#ede8e0] text-[11px] text-[#999] dark:bg-slate-700 dark:text-slate-300">
              adon-erp.com/subscriptions
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-sm font-bold text-[#1a1a2e] dark:text-slate-100">
                📦 Client Subscriptions
              </span>

              <span className="rounded-full bg-[#dbeafe] px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
                ● 24 Active Plans
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#f0eae0] dark:border-slate-700">
              <div className="grid grid-cols-[80px_1fr_110px_110px_100px] bg-[#f8f5f0] px-4 py-2.25 font-body text-[10px] font-bold uppercase tracking-[1px] text-[#999] dark:bg-slate-800 dark:text-slate-300">
                {["ID", "Business", "Renewal", "Plan", "Status"].map(
                  (heading) => (
                    <span key={heading}>{heading}</span>
                  ),
                )}
              </div>

              {[
                ["AD-102", "Pixel Craft", "12 Sep", "Starter", "Active"],
                ["AD-103", "Nexa Fashion", "18 Sep", "Business", "Active"],
                ["AD-104", "Urban Mart", "22 Sep", "Starter", "Pending"],
                ["AD-105", "Bright Agency", "01 Oct", "Enterprise", "Active"],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className={`grid grid-cols-[80px_1fr_110px_110px_100px] border-t border-[#f0eae0] px-4 py-2.75 text-xs ${
                    index % 2 === 0
                      ? "bg-white dark:bg-slate-900"
                      : "bg-[#fdfaf7] dark:bg-slate-800/70"
                  }`}
                >
                  <span className="font-semibold text-purple">{row[0]}</span>

                  <span className="text-[#1a1a2e] dark:text-slate-200">
                    {row[1]}
                  </span>

                  <span className="text-[#f59e0b]">{row[2]}</span>

                  <span className="font-bold">{row[3]}</span>

                  <span>
                    <span
                      className={`rounded-full px-2.5 py-0.75 text-[10px] font-bold ${
                        row[4] === "Pending"
                          ? "bg-[#fef3c7] text-[#92400e]"
                          : "bg-[#d1fae5] text-[#065f46]"
                      }`}
                    >
                      {row[4]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
