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
      className={`relative overflow-hidden rounded-[20px] border-[1.5px] border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}
