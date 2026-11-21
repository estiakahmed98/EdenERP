import { NextResponse } from "next/server";
import { authorizeUserManagement, privateHeaders, userManagementFailure } from "@/lib/users/http";
import { createUserSchema, userQuerySchema } from "@/lib/users/validation";
import { createUser, listUsers } from "@/lib/users/service";

export async function GET(request: Request) {
  try {
    const auth = await authorizeUserManagement(request);
    if (auth.response) return auth.response;
    const query = userQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
    if (!query.success) return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
    return NextResponse.json(await listUsers(query.data), { headers: privateHeaders });
  } catch (error) { return userManagementFailure(error); }
}

export async function POST(request: Request) {
  try {
    const auth = await authorizeUserManagement(request);
    if (auth.response) return auth.response;
    const input = createUserSchema.safeParse(await request.json());
    if (!input.success) return NextResponse.json({ error: "invalid" }, { status: 400, headers: privateHeaders });
    return NextResponse.json({ user: await createUser(auth.actorId, input.data) }, { status: 201, headers: privateHeaders });
  } catch (error) { return userManagementFailure(error); }
}
