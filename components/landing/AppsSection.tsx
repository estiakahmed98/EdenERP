"use client";

import React, { useState } from "react";

import { useLanguage } from "./LanguageProvider";
import { ALTS, APPS } from "./landing-data";
import { HandText, SectionTag } from "./landing-ui";

export default function AppsSection() {
  const { t } = useLanguage();
  const [altsOn, setAltsOn] = useState(false);
  const rows = [0, 1, 2, 3].map((rowIndex) =>
    APPS.slice(rowIndex * 6, rowIndex * 6 + 6),
  );

  const monogram = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <section className="relative overflow-hidden bg-(--cream) px-6 py-25 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,40 C220,120 360,20 560,90 C760,160 920,60 1200,140"
            fill="none"
            stroke="var(--purple)"
            strokeDasharray="6 10"
            strokeWidth="2"
            opacity=".28"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-230 text-center">
        <div className="reveal">
          <SectionTag>{t("apps.tag")}</SectionTag>
          <h2 className="mt-4 mb-2.5 font-hand text-[clamp(36px,5vw,62px)] font-bold leading-[1.1] text-[#1a1a2e] dark:text-slate-100">
            {t("apps.title")} <HandText>{t("apps.titleHand")}</HandText>{" "}
            {t("apps.titleSuffix")}
          </h2>
          <p className="mx-auto mb-12 max-w-115 font-body text-[15px] leading-[1.7] text-muted)">
            {t("apps.description")}
          </p>
        </div>

        <div
          className={`reveal mx-auto max-w-215 transition-[padding-top] duration-300 ${
            altsOn ? "pt-11" : "pt-0"
          }`}
        >
          {rows.map((row, rowIndex) => {
            const track = [...row, ...row];
            const direction =
              rowIndex % 2 === 0 ? "marquee-right" : "marquee-left";

            return (
              <div
                key={rowIndex}
                className="mb-3 overflow-hidden rounded-[14px] border border-dashed border-[#d8cbbe] bg-white/50 dark:border-slate-700 dark:bg-slate-900/50"
              >
                <div className={`flex w-max gap-3 p-2 ${direction}`}>
                  {track.map((app, cardIndex) => {
                    const alt = ALTS[app.name];
                    return (
                      <div
                        key={`${rowIndex}-${app.name}-${cardIndex}`}
                        className="relative min-w-33 cursor-pointer overflow-visible rounded-2xl border-[1.5px] border-[#f0edf4] bg-white px-3 py-4.5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.04] hover:border-[#714b6733] hover:shadow-[0_16px_40px_#714b6715] dark:border-slate-700 dark:bg-slate-900"
                      >
                        {alt && altsOn && (
                          <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#714b6733] bg-white px-2 py-1 font-hand text-[10px] italic text-(--purple)]">
                            {alt}
                            <div className="absolute -bottom-1.5 left-1/2 h-1.5 w-px -translate-x-1/2 bg-(--purple)]" />
                          </div>
                        )}

                        <div
                          className="relative mx-auto mb-2.5 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_14px_28px_#0000000a] dark:bg-slate-900"
                          style={{ border: `1px solid ${app.color}` }}
                        >
                          <svg
                            width="62"
                            height="62"
                            viewBox="0 0 62 62"
                            className="pointer-events-none absolute -inset-1"
                          >
                            <path
                              d="M10,22 C14,10 27,7 34,10 C45,14 54,24 52,36 C50,49 39,55 27,52 C16,49 6,35 10,22 Z"
                              fill={`${app.color}22`}
                              stroke={app.color}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.3"
                            />
                          </svg>
                          <div
                            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl text-[24px]"
                            style={{
                              background: `${app.color}20`,
                              color: app.color,
                            }}
                          >
                            {app.icon}
                          </div>
                        </div>

                        <span className="font-body text-xs font-extrabold uppercase tracking-[0.4px] text-[#55637a] dark:text-slate-300">
                          {app.name}
                        </span>
                        <div
                          className={`mt-1.5 min-h-5 font-hand text-sm ${
                            altsOn && alt
                              ? "text-(--purple)] opacity-100"
                              : "text-[#8f8688] opacity-90"
                          }`}
                        >
                          {altsOn && alt ? alt : (t("apps.altLabel") as string)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <a
          href="apps"
          className="mt-5 inline-block font-body text-[13px] font-bold text-(--purple)] no-underline"
        >
          {t("common.viewAllApps")}
        </a>
      </div>
    </section>
  );
}
