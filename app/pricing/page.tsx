// app/pricing/page.tsx

import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | AdonERP",
  description:
    "Simple, transparent AdonERP pricing for startups, growing teams, and enterprise organizations.",
};

export default function PricingPage() {
  return <PricingClient />;
}
