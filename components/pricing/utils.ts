import { CurrencyCode, BillingCycle } from "./types";
import { PRICING_CURRENCY, BDT_PER_USD } from "./constants";

export const formatPricingAmount = (amount: number): string =>
  `${PRICING_CURRENCY.symbol}${new Intl.NumberFormat(PRICING_CURRENCY.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

export const convertAmount = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
) => {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === "BDT" ? amount / BDT_PER_USD : amount * BDT_PER_USD;
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode,
  fromCurrency: CurrencyCode = currency,
) => {
  const value = convertAmount(amount, fromCurrency, currency);
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency === "BDT" ? 0 : 2,
    maximumFractionDigits: currency === "BDT" ? 0 : 2,
  }).format(value);

  return currency === "BDT" ? `৳${formatted}` : `$${formatted}`;
};

export const getMonthlyEquivalent = (quarterlyFee: number): number => {
  return quarterlyFee / 3;
};

export const getPerUserMonthly = (
  quarterlyFee: number,
  users: number,
): number => {
  return quarterlyFee / 3 / users;
};
