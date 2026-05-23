import type { ReactNode } from "react";

import AuthSessionProvider from "@/lib/session-provider";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </AuthSessionProvider>
  );
}
