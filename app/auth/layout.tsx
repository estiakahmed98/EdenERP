import type { ReactNode } from "react";
import type { Metadata } from "next";

import AuthSessionProvider from "@/lib/session-provider";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

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
