import { ArrowLeft, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function ComingSoonPage({
  moduleKey,
  linkKey,
  backHref = "/apps",
  backKey = "back",
}: {
  moduleKey: string;
  linkKey: string;
  backHref?: string;
  backKey?: "back" | "backIndustries";
}) {
  const t = await getTranslations("layout");

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
        {t(`header.modules.${moduleKey}.title`)}
      </p>

      <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
        {t(`header.modules.${moduleKey}.links.${linkKey}`)}
      </h1>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/15">
        <Clock className="h-4 w-4" />
        {t("comingSoon.title")}
      </div>

      <p className="mt-4 text-muted-foreground">
        {t("comingSoon.description")}
      </p>

      <Link
        href={backHref}
        className="mt-8 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t(`comingSoon.${backKey}`)}
      </Link>
    </main>
  );
}
