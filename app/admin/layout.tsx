// app/admin/layout.tsx
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminSession } from "@/lib/auth-admin";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <AdminLayout
      user={{
        name: session.user.name ?? "Admin User",
        role: session.user.role,
        image: session.user.image ?? undefined,
      }}
    >
      {children}
    </AdminLayout>
  );
}
