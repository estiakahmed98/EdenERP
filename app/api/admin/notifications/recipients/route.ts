import { NextResponse } from "next/server";
import { addRecipientSchema, authorizeAdmin, invalid, notificationFailure, privateHeaders, removeRecipientSchema } from "@/lib/demo-notifications/http";
import { addRecipient, removeRecipient } from "@/lib/demo-notifications/settings";

export async function POST(request: Request) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;
    const input = addRecipientSchema.safeParse(await request.json());
    if (!input.success) return invalid();
    return NextResponse.json({ recipient: await addRecipient(input.data.channel, input.data.recipient) }, { status: 201, headers: privateHeaders });
  } catch (error) { return notificationFailure(error); }
}

export async function DELETE(request: Request) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;
    const input = removeRecipientSchema.safeParse(await request.json());
    if (!input.success) return invalid();
    await removeRecipient(input.data.id);
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  } catch (error) { return notificationFailure(error); }
}
