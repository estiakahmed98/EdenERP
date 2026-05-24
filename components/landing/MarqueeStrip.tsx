"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function MarqueeStrip() {
  const t = useTranslations("pages.home.marquee");
  const items = t.raw("items") as string[];

  return (
    <div className="overflow-hidden bg-(--purple) py-3">
      <div className="flex w-max animate-[marqueeLeft_32s_linear_infinite]">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap px-8 font-hand text-base font-semibold text-white opacity-90"
          >
            {item} <span className="text-xs opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
