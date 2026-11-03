import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import english from "@/messages/en.json";
import visual from "./manufacturing-visuals.module.css";

/** English-only Manufacturing content; the surrounding site's locale is preserved. */
export default function ManufacturingEnglishContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={{
        pages: {
          manufacturingDetails: english.pages.manufacturingDetails,
          manufacturingShowcase: english.pages.manufacturingShowcase,
        },
        layout: {
          header: {
            modules: {
              manufacturing: english.layout.header.modules.manufacturing,
            },
          },
        },
      }}
    >
      <div lang="en" dir="ltr" className={visual.englishContent}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
