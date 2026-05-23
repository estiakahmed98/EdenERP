"use client";

import React from "react";

import { useLanguage } from "./LanguageProvider";
import { SectionTag, TypeWriter } from "./landing-ui";

export default function NativeAISection() {
  const { t } = useLanguage();
  const typeWords = t("nativeAi.typeWords") as string[];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f6f3ff_0%,#eef9ff_45%,#effdfb_100%)] px-6 py-25 text-center dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#0b1220_100%)]">
      <div className="pointer-events-none absolute -left-20 -top-20 h-85 w-85 rounded-full bg-[#714b6718] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-15 -right-20 h-80 w-80 rounded-full bg-[#02cfc318] blur-[60px]" />

      <div className="relative z-10">
        <SectionTag>{t("nativeAi.tag")}</SectionTag>

        <h2 className="reveal mt-5 mb-10 font-hand text-[clamp(32px,5vw,58px)] font-bold leading-[1.2] text-[#1a1a2e] dark:text-slate-100">
          {t("nativeAi.title")}
        </h2>

        <div className="reveal shadow-float mx-auto max-w-170 rounded-3xl border border-white bg-white/80 px-6 py-11 backdrop-blur-sm sm:px-12 dark:border-slate-700 dark:bg-slate-900/80">
          <p className="font-hand text-[clamp(28px,4vw,48px)] font-semibold leading-[1.3] text-[#1a1a2e] dark:text-slate-100">
            {t("nativeAi.quotePrefix")}{" "}
            <span className="text-teal">{t("nativeAi.quoteHighlight")}</span>{" "}
            {t("nativeAi.quoteSuffix")}
          </p>

          <p className="mt-2 min-h-[1.4em] font-hand text-[clamp(28px,4vw,48px)] font-bold">
            <TypeWriter words={typeWords} />
          </p>

          <div className="mx-auto mt-6 h-0.75 w-10 rounded-sm bg-purple" />

          <p className="mt-4 font-body text-sm leading-[1.7] text-[#475569] dark:text-slate-300">
            {t("nativeAi.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
