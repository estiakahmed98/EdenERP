"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PricingPage,
  StandardPlanPage,
  SuccessPacksPage,
  PageType,
} from "@/components/pricing";

export default function PricingPageRoot() {
  const router = useRouter();
  const [page, setPage] = useState<PageType>("pricing");
  const [selectedPlanId, setSelectedPlanId] = useState<string>();

  if (page === "standard") {
    return (
      <StandardPlanPage
        selectedPlanId={selectedPlanId}
        onBack={() => setPage("pricing")}
        onReadMore={() => setPage("success-packs")}
      />
    );
  }
  if (page === "success-packs") {
    return <SuccessPacksPage onBack={() => setPage("pricing")} />;
  }
  return (
    <PricingPage
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
