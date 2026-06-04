"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { HandText, SectionTag, ThreeBg, TypeWriter } from "./landing-ui";

export default function Hero() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const typeWords = t.raw("hero.typeWords") as string[];

  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-25">
      <ThreeBg />

      <div className="pointer-events-none absolute -left-20 -top-30 h-105 w-105 rounded-full bg-[#f3eef122] blur-[60px]" />

      <div className="pointer-events-none absolute -right-25 top-15 h-80 w-80 rounded-full bg-[#02cfc30a] blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-225 px-6 text-center">
        <SectionTag>{t("hero.tag")}</SectionTag>

        <h1 className="reveal reveal-d1 mt-6 font-hand text-[clamp(34px,5.5vw,78px)] font-bold leading-[1.1] tracking-[-1px] text-(--ink)">
          {t("hero.titlePrefix")} <br />
          <HandText>
            <TypeWriter words={typeWords} />
          </HandText>
        </h1>

        <p className="reveal reveal-d2 mx-auto mt-5 max-w-130 font-body text-lg leading-[1.7] text-[var(--muted)]">
          {t("hero.description")}
        </p>

        <div className="reveal reveal-d3 mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-[10px] border-[1.5px] border-transparent bg-(--purple) px-5.5 py-3 font-body text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95">
            {commonT("watchDemo")}
          </button>
        </div>

        {/* <p className="reveal mt-3 font-body text-xs text-[#aaa]">
          {t("common.priceNote")}
        </p> */}

        <div className="reveal shadow-float mt-14 animate-[scale-in_.8s_.5s_both] overflow-hidden rounded-[20px] border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/20 px-4.5 py-2.5">
            <div className="flex gap-1.25">
              {["#f87171", "#fbbf24", "#34d399"].map((color) => (
                <div
                  key={color}
                  className="h-2.75 w-2.75 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>

            <div className="flex h-5.5 flex-1 items-center justify-center rounded-md bg-muted/40 text-[11px] text-muted-foreground">
              adon-erp.com/subscriptions
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">
                📦 Client Subscriptions
              </span>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                ● 24 Active Plans
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-[80px_1fr_110px_110px_100px] bg-muted/20 px-4 py-2.25 font-body text-[10px] font-bold uppercase tracking-[1px] text-muted-foreground">
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
                  className={`grid grid-cols-[80px_1fr_110px_110px_100px] border-t border-border px-4 py-2.75 text-xs ${
                    index % 2 === 0
                      ? "bg-card"
                      : "bg-muted/10"
                  }`}
                >
                  <span className="font-semibold text-(--purple)">{row[0]}</span>

                  <span className="text-foreground">
                    {row[1]}
                  </span>

                  <span className="text-secondary">{row[2]}</span>

                  <span className="font-bold">{row[3]}</span>

                  <span>
                    <span
                      className={`rounded-full px-2.5 py-0.75 text-[10px] font-bold ${
                        row[4] === "Pending"
                          ? "bg-secondary/15 text-secondary"
                          : "bg-accent/15 text-accent-foreground"
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
