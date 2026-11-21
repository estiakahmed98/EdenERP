import NotificationSettings from "@/components/admin/notifications/NotificationSettings";
import { requireAdminSession } from "@/lib/auth-admin";

export default async function NotificationsPage() {
  await requireAdminSession();
  return <NotificationSettings />;
}
