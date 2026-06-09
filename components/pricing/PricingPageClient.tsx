"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  PageType,
  PricingPage,
  StandardPlanPage,
  SuccessPacksPage,
} from "@/components/pricing";
import type { PricingPageData } from "@/lib/pricing/types";

interface PricingPageClientProps {
  data: PricingPageData;
}

export default function PricingPageClient({ data }: PricingPageClientProps) {
  const router = useRouter();
  const [page, setPage] = useState<PageType>("pricing");
  const [selectedPlanId, setSelectedPlanId] = useState<string>();

  if (page === "standard") {
    return (
      <StandardPlanPage
        data={data}
        selectedPlanId={selectedPlanId}
        onBack={() => setPage("pricing")}
        onReadMore={() => setPage("success-packs")}
      />
    );
  }

  if (page === "success-packs") {
    return <SuccessPacksPage data={data} onBack={() => setPage("pricing")} />;
  }

  return (
    <PricingPage
      data={data}
      onBuyNow={(planId) => {
        if (planId === "enterprise") {
          router.push("/contact");
          return;
        }

        setSelectedPlanId(planId);
        setPage("standard");
      }}
      onSuccessPacks={() => setPage("success-packs")}
    />
  );
}
