import { ReactNode } from "react";

interface SectionEyebrowProps {
  icon: ReactNode;
  label: string;
}

export function SectionEyebrow({ icon, label }: SectionEyebrowProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800">
      <span className="text-emerald-500 dark:text-emerald-400">{icon}</span>
      {label}
    </div>
  );
}
