"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--purple),var(--purple-dark))] px-6 py-25 text-center">
      <div className="pointer-events-none absolute -left-25 -top-25 h-75 w-75 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-65 w-65 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className="mb-4 text-5xl">✨</div>

        <h2 className="reveal mb-5 font-hand text-[clamp(28px,4.5vw,58px)] font-bold leading-[1.1] text-white">
          {t("cta.title")}
        </h2>

        <p className="reveal mx-auto mb-10 max-w-115 font-body text-base leading-[1.7] text-white/60">
          {t("cta.description")}
        </p>

        <div className="reveal flex flex-wrap justify-center gap-3">
          {/* <button className="rounded-[10px] bg-white px-8 py-3.75 font-body text-[15px] font-bold text-(--purple) shadow-[0_8px_32px_#00000033] transition hover:-translate-y-0.5">
            {t("common.tryFree")}
          </button> */}

          <button 
           onClick={() => router.push("/contact")}
          className="rounded-[10px] border-[1.5px] border-white/25 bg-transparent px-5.5 py-3 font-body text-[15px] font-semibold text-white transition hover:-translate-y-0.5">
            {commonT("contactSales")}
          </button>
        </div>

        {/* <p className="reveal mt-5 font-body text-xs text-white/35">
          {t("common.freeTrialNote")}
        </p> */}
      </div>
    </section>
  );
}
