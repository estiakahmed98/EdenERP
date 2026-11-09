// app/admin/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminSession } from "@/lib/auth-admin";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{ admin: messages.admin }}
    >
      <AdminLayout
        user={{
          name: session.user.name ?? "Admin User",
          role: session.user.role,
          image: session.user.image ?? undefined,
        }}
      >
        {children}
      </AdminLayout>
    </NextIntlClientProvider>
  );
}
