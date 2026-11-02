import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ComingSoonPage from "@/components/coming-soon-page";
import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.header.modules.pos");

  return {
    title: t("links.outletsRegisters"),
    alternates: getLocaleAlternates("/apps/pos/outlets-registers"),
  };
}

export default function PosOutletsRegistersPage() {
  return <ComingSoonPage moduleKey="pos" linkKey="outletsRegisters" />;
}
