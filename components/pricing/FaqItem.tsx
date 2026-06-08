"use client";

import { useState } from "react";

interface FaqItemProps {
  q: string;
  a: string;
}

export function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="mb-3 cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900 dark:text-white">
          {q}
        </span>
        <span
          className={`text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {a}
        </p>
      )}
    </div>
  );
}
