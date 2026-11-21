import { validEmail } from "./config.ts";

export type DemoNotificationDetails = {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string | null;
  modules: string[];
  message: string | null;
  createdAt: Date | string;
};

export type DemoNotificationContent = { subject: string; text: string; html: string; replyTo?: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

function adminUrl(siteOrigin?: string) {
  if (!siteOrigin) return null;
  try {
    const url = new URL(siteOrigin);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return null;
    return new URL("/admin/demo-bookings", url.origin).href;
  } catch { return null; }
}

export function formatDemoNotification(details: DemoNotificationDetails, siteOrigin?: string): DemoNotificationContent {
  const submitted = new Date(details.createdAt);
  const date = Number.isNaN(submitted.getTime()) ? "Not recorded" : new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka",
  }).format(submitted);
  const values: [string, string][] = [
    ["Name", details.fullName],
    ["Company", details.companyName],
    ["Phone", details.phone],
    ["Email", details.email || "Not provided"],
    ["Modules", details.modules.length ? details.modules.join(", ") : "Not specified"],
    ["Message", details.message || "Not provided"],
    ["Submitted", `${date} (Dhaka)`],
    ["Request ID", details.id],
  ];
  const link = adminUrl(siteOrigin);
  const subject = "Adon ERP — New live demo request";
  const text = [subject, "", ...values.map(([label, value]) => `${label}: ${value}`), ...(link ? ["", `Admin panel: ${link}`] : [])].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f5f8fc;font-family:Arial,sans-serif;color:#14233b"><main style="max-width:640px;margin:24px auto;padding:28px;background:#fff;border:1px solid #dce6f1;border-radius:12px"><p style="color:#1088ef;font-weight:bold">ADON ERP</p><h1 style="font-size:24px">New live demo request</h1><p>A visitor submitted the Request a Live Demo form.</p><table style="border-collapse:collapse;width:100%">${values.map(([label, value]) => `<tr><th scope="row" style="padding:10px 12px 10px 0;border-bottom:1px solid #edf1f7;text-align:left;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:10px 0;border-bottom:1px solid #edf1f7;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}</table>${link ? `<p style="margin-top:24px"><a href="${escapeHtml(link)}" style="color:#087de0">Open demo requests in the admin panel</a></p>` : ""}</main></body></html>`;
  return { subject, text, html, ...(details.email && validEmail(details.email) ? { replyTo: details.email } : {}) };
}
