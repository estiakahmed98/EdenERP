"use client";

import React from "react";

import FeatureCard from "./FeatureCard";
import { useLanguage } from "./LanguageProvider";
import { TESTIMONIALS } from "./landing-data";
import { SectionTag } from "./landing-ui";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-bg px-6 py-25">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-8">
          <SectionTag>{t("testimonials.tag")}</SectionTag>
          <h2 className="mt-3.5 font-hand text-[clamp(34px,5vw,58px)] font-bold leading-[1.1] text-[#1a1a2e]">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <FeatureCard
              key={testimonial.name}
              className={`reveal reveal-d${index + 1} text-left`}
            >
              <div className="mb-4 text-[32px]">{testimonial.avatar}</div>
              <div className="mb-3 flex gap-0.5">
                {[...Array(testimonial.score)].map((_, starIndex) => (
                  <span key={starIndex} className="text-[#fbbf24]">
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-5 font-body text-sm italic leading-[1.8] text-[#475569]">
                "{testimonial.quote}"
              </p>
              <div className="font-body text-[13px] font-bold text-purple">
                {testimonial.name}
              </div>
              <div className="mt-0.5 font-body text-xs text-muted">
                {testimonial.role}
              </div>
            </FeatureCard>
          ))}
        </div>

        <div className="reveal shadow-float mt-6 flex items-start gap-6 rounded-[20px] bg-white px-6 py-9 text-left sm:px-10">
          <div className="shrink-0 font-serif text-[60px] leading-none text-[#fbbf24]">
            "
          </div>
          <div>
            <p className="font-body text-base leading-[1.8] text-[#475569]">
              {t("testimonials.extraQuote")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-light text-xl">
                👤
              </div>
              <div>
                <div className="font-body text-[13px] font-bold text-[#1a1a2e]">
                  {t("testimonials.extraAuthor")}
                </div>
                <div className="font-body text-xs text-muted">
                  {t("testimonials.extraRole")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
