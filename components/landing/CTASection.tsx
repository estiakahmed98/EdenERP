"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

// Hand-drawn loop arrow, pointing down-right towards the button.
function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 12c22-8 46-4 52 12 5 13-8 22-16 14-7-8 4-20 20-18 20 2 34 18 44 40"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 46l10 15 4-18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CTASection() {
  const t = useTranslations("pages.home");
  const commonT = useTranslations("common.actions");
  const router = useRouter();

  return (
    <section className="bg-(--cream) px-4 py-16 sm:px-6 sm:py-20">
      <div className="reveal relative mx-auto max-w-240 overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,var(--purple),var(--purple-dark))] px-6 py-14 text-center sm:px-12 sm:py-16">
        {/* Faint graph-paper grid, like a page from a planning notebook */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          aria-hidden="true"
        />
        {/* Sketch rings in the corners */}
        <svg
          className="pointer-events-none absolute -start-10 -top-10 h-44 w-44 text-white/15"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 5" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-14 -end-8 h-52 w-52 text-white/10"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="50" cy="52" rx="45" ry="42" stroke="currentColor" strokeWidth="2" transform="rotate(-8 50 50)" />
        </svg>

        <div className="relative z-10">
          <h2 className="mx-auto max-w-180 font-hand text-[clamp(32px,4.6vw,56px)] font-bold leading-[1.1] text-white">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-130 font-body text-[15px] leading-[1.75] text-white/75">
            {t("cta.description")}
          </p>

          <div className="relative mt-9 inline-flex">
            <DoodleArrow className="pointer-events-none absolute -start-32 -top-6 hidden h-20 w-28 text-white/70 sm:block rtl:-scale-x-100" />
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-body text-[15px] font-semibold text-(--purple) shadow-[0_12px_32px_-12px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5"
            >
              {commonT("contactSales")}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
