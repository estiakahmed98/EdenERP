export const banglaWhatsAppMessage =
  "হ্যালো, আমাদের ব্যবসার জন্য AdonERP-এর একটি ডেমো দেখতে চাই। প্রয়োজনীয় মডিউল, খরচ ও ইমপ্লিমেন্টেশন নিয়ে বিস্তারিত জানাবেন?";

export function whatsappUrl(
  number: string,
  message = banglaWhatsAppMessage,
): string {
  const digits = number.replace(/[+\s()-]/g, "");
  if (!/^\d{8,15}$/.test(digits))
    throw new Error("Invalid configured WhatsApp number");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
