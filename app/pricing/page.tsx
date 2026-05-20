// app/pricing/page.tsx

import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | EdenERP",
  description:
    "Simple, transparent EdenERP pricing for startups, growing teams, and enterprise organizations.",
};

export default function PricingPage() {
  return <PricingClient />;
}
