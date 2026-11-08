"use client";

import { Plus } from "lucide-react";
import css from "./pricing.module.css";

interface FaqItemProps {
  q: string;
  a: string;
}

export function FaqItem({ q, a }: FaqItemProps) {
  return (
    <details className={css.faqItem}>
      <summary>
        {q}
        <Plus size={17} aria-hidden="true" />
      </summary>
      <p>{a}</p>
    </details>
  );
}
