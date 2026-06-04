"use client";

import React from "react";
import { useTranslations } from "next-intl";

import FeatureCard from "./FeatureCard";
import { Circled, SectionTag } from "./landing-ui";

export default function EnterpriseSection() {
  const t = useTranslations("pages.home");
  const cards = t.raw("enterprise.cards") as Array<{
    icon: string;
    title: string;
    desc: string;
    badge: string;
  }>;

  return (
    <section className="bg-background px-6 py-25">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-14">
          <SectionTag>{t("enterprise.tag")}</SectionTag>

          <h2 className="mt-4 font-hand text-[clamp(36px,5vw,60px)] font-bold leading-[1.15] text-(--ink)">
            {t("enterprise.titlePrefix")}{" "}
            <Circled color="var(--teal)">
              {t("enterprise.titleCircled")}
            </Circled>
            <br />
            {t("enterprise.titleSuffix")}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <FeatureCard
              key={card.title}
              className={`reveal reveal-d${(index % 2) + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{card.icon}</div>

                <span className="rounded-full bg-(--purple-light) px-2.5 py-1 font-body text-[11px] font-extrabold text-(--purple)">
                  {card.badge}
                </span>
              </div>

              <h3 className="mt-4 mb-2 font-body text-base font-extrabold">
                {card.title}
              </h3>

              <p className="font-body text-[13px] leading-[1.7] text-[var(--muted)]">
                {card.desc}
              </p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
