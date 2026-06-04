"use client";

import React from "react";
import { useTranslations } from "next-intl";

import FeatureCard from "./FeatureCard";
import { Circled } from "./landing-ui";

export default function FeaturesSection() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const features = t.raw("features.cards") as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  return (
    <section id="features" className="rounded-t-[48px] bg-(--gray-bg) px-6 py-25">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-12">
          <h2 className="max-w-125 font-hand text-[clamp(40px,6vw,68px)] font-bold leading-[1.1] text-(--ink)">
            {t("features.titlePrefix")}{" "}
            <Circled color="var(--teal)">{t("features.titleHand")}</Circled>
            <br />
            {t("features.titleSuffix")}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              className={`reveal reveal-d${(index % 2) + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-(--purple-light) text-[22px]">
                  {feature.icon}
                </div>

                <span className="text-base text-[#fbbf24]">★</span>
              </div>

              <h3 className="mt-4.5 mb-2 font-body text-base font-bold text-foreground">
                {feature.title}
              </h3>

              <p className="font-body text-[13px] leading-[1.7] text-[var(--muted)]">
                {feature.desc}
              </p>
            </FeatureCard>
          ))}
        </div>

        <a
          href="#"
          className="reveal mt-8 inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-(--purple) no-underline"
        >
          {commonT("seeAllFeatures")}
        </a>
      </div>
    </section>
  );
}
