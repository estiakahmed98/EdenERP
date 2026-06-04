"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { SectionTag, TypeWriter } from "./landing-ui";

export default function NativeAISection() {
  const t = useTranslations("pages.home");
  const typeWords = t.raw("nativeAi.typeWords") as string[];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--purple-light)_0%,color-mix(in_srgb,var(--color-background)_88%,var(--teal)_12%)_45%,color-mix(in_srgb,var(--color-background)_92%,white_8%)_100%)] px-6 py-25 text-center">
      <div className="pointer-events-none absolute -left-20 -top-20 h-85 w-85 rounded-full bg-[#714b6718] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-15 -right-20 h-80 w-80 rounded-full bg-[#02cfc318] blur-[60px]" />

      <div className="relative z-10">
        <SectionTag>{t("nativeAi.tag")}</SectionTag>

        <h2 className="reveal mt-5 mb-10 font-hand text-[clamp(32px,5vw,58px)] font-bold leading-[1.2] text-(--ink)">
          {t("nativeAi.title")}
        </h2>

        <div className="reveal shadow-float mx-auto max-w-170 rounded-3xl border border-border bg-card/80 px-6 py-11 backdrop-blur-sm sm:px-12">
          <p className="font-hand text-[clamp(28px,4vw,48px)] font-semibold leading-[1.3] text-(--ink)">
            {t("nativeAi.quotePrefix")}{" "}
            <span className="text-(--teal)">{t("nativeAi.quoteHighlight")}</span>{" "}
            {t("nativeAi.quoteSuffix")}
          </p>

          <p className="mt-2 min-h-[1.4em] font-hand text-[clamp(28px,4vw,48px)] font-bold">
            <TypeWriter words={typeWords} />
          </p>

          <div className="mx-auto mt-6 h-0.75 w-10 rounded-sm bg-(--purple)" />

          <p className="mt-4 font-body text-sm leading-[1.7] text-[var(--muted)]">
            {t("nativeAi.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
