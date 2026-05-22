"use client";

import React from "react";

export default function MarqueeStrip() {
  const items = [
    "Accounting",
    "CRM",
    "HR Suite",
    "Inventory",
    "eCommerce",
    "Marketing",
    "Helpdesk",
    "AI Studio",
    "Subscribe",
    "Sign",
    "Project",
    "Knowledge",
    "Point of Sale",
    "Website",
  ];

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
