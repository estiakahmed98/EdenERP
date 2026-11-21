export const MAX_NOTIFICATION_ATTEMPTS = 8;
export const NOTIFICATION_LEASE_MS = 5 * 60_000;

export function retryDelayMs(attempts: number) {
  return Math.min(60 * 60_000, 30_000 * 2 ** Math.max(0, attempts - 1));
}

/** Store known error categories only, never raw SMTP errors or browser/session data. */
export function safeNotificationError(value: string) {
  return /^[A-Z][A-Z0-9_]{0,79}$/.test(value) ? value : "DELIVERY_FAILED";
}
