import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}

export async function getAdminSession() {
  return getServerSession(authOptions);
}

/** For API routes: true only for a signed-in ADMIN (no redirect). */
export async function isAdminRequest() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}
