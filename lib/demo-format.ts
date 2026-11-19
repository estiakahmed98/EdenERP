/** Demo amounts are BDT examples, never FX conversions or live company data. */
export function formatDemoMoney(
  amount: number,
  locale: string,
  compact = false,
): string {
  // Intl's Bangla compact currency renders "৪.৮ কো৳" / "৮৬ লা৳", which reads
  // like a broken word. Write the full unit (কোটি, লাখ, হাজার) without ৳.
  if (compact && locale === "bn") {
    const units = [
      [10_000_000, "কোটি"],
      [100_000, "লাখ"],
      [1_000, "হাজার"],
    ] as const;
    const digits = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });
    const unit = units.find(([size]) => Math.abs(amount) >= size);
    return unit ? `${digits.format(amount / unit[0])} ${unit[1]}` : digits.format(amount);
  }
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : locale === "en" ? "en-IN" : locale, {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(amount);
}
