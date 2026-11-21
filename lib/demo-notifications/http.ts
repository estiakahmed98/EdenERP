import { NextResponse } from "next/server";
import { z } from "zod";
import { privateHeaders } from "@/lib/users/http";
import { NotificationSettingsError } from "./settings";

export { authorizeUserManagement as authorizeAdmin, privateHeaders } from "@/lib/users/http";

const channel = z.enum(["EMAIL", "WHATSAPP"]);
export const addRecipientSchema = z.object({ channel, recipient: z.string().trim().min(1).max(254) });
export const removeRecipientSchema = z.object({ id: z.uuid() });
export const workerActionSchema = z.object({ action: z.enum(["logout", "retryFailed"]) });

export function invalid() {
  return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
}

export function notificationFailure(error: unknown) {
  if (error instanceof NotificationSettingsError) return NextResponse.json({ error: error.code }, { status: error.status, headers: privateHeaders });
  if (error instanceof SyntaxError) return invalid();
  console.error("Notification settings operation failed", error);
  return NextResponse.json({ error: "server" }, { status: 500, headers: privateHeaders });
}
