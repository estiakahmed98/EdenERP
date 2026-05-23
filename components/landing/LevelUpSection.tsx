"use client";

import React from "react";

import { useLanguage } from "./LanguageProvider";
import { HandText, SectionTag } from "./landing-ui";

export default function LevelUpSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white px-6 py-25 dark:bg-slate-950">
      <div className="mx-auto max-w-250">
        <div className="grid items-center gap-18 lg:grid-cols-2">
          <div className="reveal">
            <SectionTag>{t("levelUp.tag")}</SectionTag>

            <h2 className="mt-4 font-hand text-[clamp(36px,5vw,56px)] font-bold leading-[1.15] text-[#1a1a2e] dark:text-slate-100">
              {t("levelUp.titlePrefix")}{" "}
              <HandText color="#bfdbfe" className="text-[#1d4ed8]">
                {t("levelUp.titleHand")}
              </HandText>
            </h2>

            <p className="mt-5 font-body text-[15px] leading-[1.8] text-muted">
              {t("levelUp.description")}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {(t("levelUp.stats") as any[]).map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 rounded-[14px] border border-[#eeedf2] bg-cream px-4.5 py-3.5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="text-[22px]">{stat.icon}</span>

                  <span className="font-body text-base font-extrabold text-purple">
                    {stat.value}
                  </span>

                  <span className="font-body text-[13px] text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal shadow-float overflow-hidden rounded-[20px] border border-[#eeedf2] dark:border-slate-700">
            <div className="flex items-center gap-2.5 bg-purple px-5 py-3.5">
              <span className="text-base">✅</span>

              <span className="font-body text-sm font-bold text-white">
                Adon Project
              </span>

              <span className="ml-auto rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                Sprint 4
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 bg-gray-bg p-4">
              {[
                {
                  col: "To Do",
                  color: "#fef3c7",
                  items: ["Design mockup", "User research", "API spec"],
                },
                {
                  col: "In Progress",
                  color: "#dbeafe",
                  items: ["Auth flow", "Dashboard", "Mobile nav"],
                },
                {
                  col: "Done",
                  color: "#d1fae5",
                  items: ["DB schema", "CI/CD", "Staging env"],
                },
              ].map((column) => (
                <div key={column.col}>
                  <div className="mb-2 font-body text-[10px] font-bold uppercase tracking-[1px] text-muted">
                    {column.col}
                  </div>

                  {column.items.map((item) => (
                    <div
                      key={item}
                      className="mb-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-[#1a1a2e]"
                      style={{ background: column.color }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
