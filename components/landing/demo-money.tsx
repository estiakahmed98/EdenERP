"use client";
import { useLocale } from "next-intl";
import { formatDemoMoney } from "@/lib/demo-format";

export function DemoMoney({ amount }: { amount: number }) {
  return <>{formatDemoMoney(amount, useLocale(), true)}</>;
}
