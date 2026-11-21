import UserManagement from "@/components/admin/users/UserManagement";
import { requireAdminSession } from "@/lib/auth-admin";

export default async function UsersPage() {
  const session = await requireAdminSession();
  return <UserManagement currentUserId={session.user.id} />;
}
