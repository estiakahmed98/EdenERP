"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  PageType,
  PricingPage,
  StandardPlanPage,
  SuccessPacksPage,
  type BillingCycle,
  type CurrencyCode,
} from "@/components/pricing";
import type { PricingPageData } from "@/lib/pricing/types";

interface PricingPageClientProps {
  data: PricingPageData;
}

export default function PricingPageClient({ data }: PricingPageClientProps) {
  const router = useRouter();
  const [page, setPage] = useState<PageType>("pricing");
  const [selectedPlanId, setSelectedPlanId] = useState<string>();
  const [selectedBilling, setSelectedBilling] =
    useState<BillingCycle>("yearly");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("BDT");
  const viewRef = useRef<HTMLDivElement>(null);
  const previousPage = useRef(page);

  useEffect(() => {
    if (previousPage.current === page) return;
    previousPage.current = page;
    const heading = viewRef.current?.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  if (page === "standard") {
    return (
      <div ref={viewRef}>
        <StandardPlanPage
          data={data}
          selectedPlanId={selectedPlanId}
          initialBilling={selectedBilling}
          onBack={() => setPage("pricing")}
          onReadMore={() => setPage("success-packs")}
        />
      </div>
    );
  }

  if (page === "success-packs") {
    return (
      <div ref={viewRef}>
        <SuccessPacksPage data={data} onBack={() => setPage("pricing")} />
      </div>
    );
  }

  return (
    <div ref={viewRef}>
      <PricingPage
        data={data}
        initialBilling={selectedBilling}
        initialCurrency={selectedCurrency}
        onBuyNow={(planId, billing, currency) => {
          if (planId === "enterprise") {
            router.push("/contact");
            return;
          }

          setSelectedPlanId(planId);
          setSelectedBilling(billing);
          setSelectedCurrency(currency);
          setPage("standard");
        }}
        onSuccessPacks={() => setPage("success-packs")}
      />
    </div>
  );
}
