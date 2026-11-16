"use client";
import { Button, css, useCollege } from "@/components/medical-college/ui";
export default function CollegeError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const { t } = useCollege();
  return (
    <main className={css.college}>
      <div className={css.wrap}>
        <div className={css.panel} role="alert">
          <p>{t("ui.loadError")}</p>
          <Button onClick={retry}>{t("ui.retry")}</Button>
        </div>
      </div>
    </main>
  );
}
