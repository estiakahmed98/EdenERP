import { NextResponse } from "next/server";
import { authorizeAdmin, invalid, notificationFailure, privateHeaders, workerActionSchema } from "@/lib/demo-notifications/http";
import { getNotificationOverview, requestWorkerCommand, retryFailedNotifications } from "@/lib/demo-notifications/settings";

export async function GET(request: Request) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;
    return NextResponse.json(await getNotificationOverview(), { headers: privateHeaders });
  } catch (error) { return notificationFailure(error); }
}

export async function POST(request: Request) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;
    const input = workerActionSchema.safeParse(await request.json());
    if (!input.success) return invalid();
    if (input.data.action === "logout") {
      await requestWorkerCommand("LOGOUT");
      return NextResponse.json({ ok: true }, { headers: privateHeaders });
    }
    return NextResponse.json({ ok: true, retried: await retryFailedNotifications() }, { headers: privateHeaders });
  } catch (error) { return notificationFailure(error); }
}
