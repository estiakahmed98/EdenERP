"use client";

import { ArrowUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { isLocale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { LIVE_DEMO_HREF } from "@/lib/live-demo";
import css from "./live-demo-button.module.css";

/** A single label, design and destination; callers cannot override them. */
export default function LiveDemoButton() {
  const t = useTranslations("common.actions");
  const params = useParams();
  const routeLocale = params?.locale;
  // English-only content providers must not switch the booking URL's locale.
  const locale =
    typeof routeLocale === "string" && isLocale(routeLocale)
      ? routeLocale
      : undefined;

  return (
    <Link
      href={LIVE_DEMO_HREF}
      locale={locale}
      data-live-demo-cta="true"
      className={`btn-gradient ${css.button}`}
    >
      <span>{t("liveDemo")}</span>
      <ArrowUpRight size={16} aria-hidden="true" className={css.icon} />
    </Link>
  );
}
