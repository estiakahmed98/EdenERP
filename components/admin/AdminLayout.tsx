"use client";

import React, { useMemo, useState, type ReactNode } from "react";
import AdminSidebar, {
  SIDEBAR_COLLAPSED,
  SIDEBAR_EXPANDED,
} from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Toaster } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  user?: {
    name: string;
    role: string;
    image?: string;
  };
}

const AdminLayout = ({ children, pageTitle, user }: AdminLayoutProps) => {
  const dir = useLocale() === "ar" ? "rtl" : "ltr";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sidebar is flush with the left edge; content starts right after it.
  const contentOffset = useMemo(
    () => (sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED),
    [sidebarCollapsed],
  );

  // The shell geometry (fixed left sidebar) stays LTR; text direction is set per region.
  return (
    <div dir="ltr" className="relative min-h-screen bg-background text-foreground">
      {/* Soft brand glow behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 15% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%), radial-gradient(45% 40% at 100% 100%, color-mix(in oklab, var(--secondary) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 md:flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <AdminSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
            user={user}
          />
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />

              <motion.div
                className="fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw] md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <AdminSidebar
                  drawer
                  onNavigate={() => setSidebarOpen(false)}
                  collapsed={false}
                  user={user}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div
          className="min-h-screen min-w-0 flex-1 transition-[padding] duration-300 md:pl-(--content-offset)"
          style={
            { "--content-offset": `${contentOffset}px` } as React.CSSProperties
          }
        >
          <AdminHeader
            toggleSidebar={() => setSidebarOpen(true)}
            title={pageTitle}
            user={user}
          />

          <main dir={dir}>{children}</main>
          <Toaster richColors closeButton position="top-right" />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
