"use client";

import React from "react";

import FeatureCard from "./FeatureCard";
import { useLanguage } from "./LanguageProvider";
import { SectionTag } from "./landing-ui";

export default function StatsSection() {
  const { t } = useLanguage();
  const stats = t("stats.items") as any[];

  return (
    <section className="bg-white px-6 py-22.5 dark:bg-slate-950">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-6">
          <SectionTag>{t("stats.tag")}</SectionTag>

          <h2 className="mt-3.5 font-hand text-[clamp(34px,5vw,58px)] font-bold leading-[1.1] text-[#1a1a2e] dark:text-slate-100">
            {t("stats.title")}
          </h2>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat: any) => (
            <FeatureCard key={stat.label} className="reveal p-5.5 text-center">
              <div className="font-hand text-[42px] font-extrabold text-purple">
                {stat.value}
              </div>

              <div className="mt-1.5 font-body text-xs font-bold text-muted">
                {stat.label}
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
