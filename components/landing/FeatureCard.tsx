"use client";

import React from "react";

export default function FeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border-[1.5px] border-[#eeedf2] bg-white p-7 transition hover:-translate-y-1 hover:border-[#714b6722] hover:shadow-[0_20px_60px_#714b6712] dark:border-slate-700 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}
