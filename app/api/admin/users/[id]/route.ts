import { NextResponse } from "next/server";
import { authorizeUserManagement, privateHeaders, userManagementFailure } from "@/lib/users/http";
import { deleteUserSchema, resetPasswordSchema, updateUserSchema, userStatusSchema } from "@/lib/users/validation";
import { changeUser } from "@/lib/users/service";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const auth = await authorizeUserManagement(request);
    if (auth.response) return auth.response;
    const { id } = await context.params;
    const body = await request.json();
    const input = updateUserSchema.safeParse(body);
    const reset = resetPasswordSchema.safeParse(body);
    const status = userStatusSchema.safeParse(body);
    const data = input.success ? input.data : reset.success ? reset.data : status.success ? status.data : null;
    if (!data) return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
    return NextResponse.json({ user: await changeUser(auth.actorId, id, data.updatedAt, data) }, { headers: privateHeaders });
  } catch (error) { return userManagementFailure(error); }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const auth = await authorizeUserManagement(request);
    if (auth.response) return auth.response;
    const { id } = await context.params;
    const input = deleteUserSchema.safeParse(await request.json());
    if (!input.success) return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
    await changeUser(auth.actorId, id, input.data.updatedAt, null, input.data.email);
    return NextResponse.json({ success: true }, { headers: privateHeaders });
  } catch (error) { return userManagementFailure(error); }
}
