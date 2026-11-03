"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDemoBooking } from "@/components/demo-booking/provider";
import css from "./live-demo-button.module.css";

/** A single label, design and booking popup; callers cannot override them. */
export default function LiveDemoButton() {
  const t = useTranslations("common.actions");
  const { openBooking } = useDemoBooking();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => openBooking(event.currentTarget)}
      data-live-demo-cta="true"
      className={`btn-gradient ${css.button}`}
    >
      <span>{t("liveDemo")}</span>
      <ArrowUpRight size={16} aria-hidden="true" className={css.icon} />
    </button>
  );
}
