"use client";
import { useTranslations } from "next-intl";

export default function SampleDataNote() {
  const t = useTranslations("pages.home.demo");
  return (
    <p
      data-demo-disclosure
      className="border-b border-border bg-muted/30 px-5 py-3 text-center text-xs leading-6 text-muted-foreground"
    >
      {t("disclosure")}
    </p>
  );
}
