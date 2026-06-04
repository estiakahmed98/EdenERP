"use client";

import React from "react";
import { useTranslations } from "next-intl";

import FeatureCard from "./FeatureCard";
import { SectionTag } from "./landing-ui";

export default function StatsSection() {
  const t = useTranslations("pages.home");
  const stats = t.raw("stats.items") as Array<{
    value: string;
    label: string;
  }>;

  return (
    <section className="bg-background px-6 py-22.5">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-6">
          <SectionTag>{t("stats.tag")}</SectionTag>

          <h2 className="mt-3.5 font-hand text-[clamp(34px,5vw,58px)] font-bold leading-[1.1] text-(--ink)">
            {t("stats.title")}
          </h2>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat: any) => (
            <FeatureCard key={stat.label} className="reveal p-5.5 text-center">
              <div className="font-hand text-[42px] font-extrabold text-(--purple)">
                {stat.value}
              </div>

              <div className="mt-1.5 font-body text-xs font-bold text-[var(--muted)]">
                {stat.label}
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
