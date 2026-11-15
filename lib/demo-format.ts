/** Demo amounts are BDT examples, never FX conversions or live company data. */
export function formatDemoMoney(
  amount: number,
  locale: string,
  compact = false,
): string {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : locale === "en" ? "en-IN" : locale, {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(amount);
}
