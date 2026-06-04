"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { HandText, SectionTag } from "./landing-ui";

export default function LevelUpSection() {
  const t = useTranslations("pages.home");
  const stats = t.raw("levelUp.stats") as Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  const board = t.raw("levelUp.board") as {
    projectName: string;
    sprint: string;
    columns: Array<{
      title: string;
      color: string;
      items: string[];
    }>;
  };

  return (
    <section className="bg-background px-6 py-25">
      <div className="mx-auto max-w-250">
        <div className="grid items-center gap-18 lg:grid-cols-2">
          <div className="reveal">
            <SectionTag>{t("levelUp.tag")}</SectionTag>

            <h2 className="mt-4 font-hand text-[clamp(36px,5vw,56px)] font-bold leading-[1.15] text-(--ink)">
              {t("levelUp.titlePrefix")}{" "}
              <HandText color="#bfdbfe" className="text-[#1d4ed8]">
                {t("levelUp.titleHand")}
              </HandText>
            </h2>

            <p className="mt-5 font-body text-[15px] leading-[1.8] text-[var(--muted)]">
              {t("levelUp.description")}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 rounded-[14px] border border-border bg-(--cream) px-4.5 py-3.5"
                >
                  <span className="text-[22px]">{stat.icon}</span>

                  <span className="font-body text-base font-extrabold text-(--purple)">
                    {stat.value}
                  </span>

                  <span className="font-body text-[13px] text-[var(--muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal shadow-float overflow-hidden rounded-[20px] border border-border">
            <div className="flex items-center gap-2.5 bg-(--purple) px-5 py-3.5">
              <span className="text-base">✅</span>

              <span className="font-body text-sm font-bold text-white">
                {board.projectName}
              </span>

              <span className="ml-auto rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {board.sprint}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 bg-(--gray-bg) p-4">
              {board.columns.map((column) => (
                <div key={column.title}>
                  <div className="mb-2 font-body text-[10px] font-bold uppercase tracking-[1px] text-[var(--muted)]">
                    {column.title}
                  </div>

                  {column.items.map((item) => (
                    <div
                      key={item}
                      className="mb-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-(--ink)"
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
