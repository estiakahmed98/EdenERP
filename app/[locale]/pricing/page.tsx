"use client";

import { useState } from "react";
import {
  PricingPage,
  StandardPlanPage,
  SuccessPacksPage,
  PageType,
} from "@/components/pricing";

export default function PricingPageRoot() {
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
        setSelectedPlanId(planId);
        setPage("standard");
      }}
      onSuccessPacks={() => setPage("success-packs")}
    />
  );
}
