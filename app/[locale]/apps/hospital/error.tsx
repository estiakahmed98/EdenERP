"use client";

import { useTranslations } from "next-intl";
import { Button, css } from "@/components/hospital/ui";

export default function HospitalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("pages.hospitalApp");
  return (
    <main className={css.hospital}>
      <div className={css.panel} role="alert">
        <p>{t("ui.loadError")}</p>
        <Button onClick={reset}>{t("ui.retry")}</Button>
      </div>
    </main>
  );
}
