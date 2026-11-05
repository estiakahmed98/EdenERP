/** Post dates are stored as UTC midnight, so format in UTC to avoid a day shift. */
export function formatPostDate(date: Date | string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatMonth(year: number, month: number, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export const BLOG_PATH = "/community/learn/blog";

/** Build a list URL (relative to the locale) keeping the active filters. */
export function blogListHref(params: { q?: string; month?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.month) query.set("month", params.month);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `${BLOG_PATH}?${qs}` : BLOG_PATH;
}
