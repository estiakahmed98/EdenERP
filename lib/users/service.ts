import bcrypt from "bcryptjs";
import { disconnectUserChat } from "@/lib/chat/presence";
import { db } from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma/client";
import { userAccessError, type CreateUserInput, type UpdateUserInput, type UserQuery } from "./validation";

// Explicit allowlist: password hashes and session versions never leave the server.
const publicUser = {
  id: true, name: true, email: true, phone: true, role: true, isActive: true,
  createdAt: true, updatedAt: true, lastLoginAt: true,
} satisfies Prisma.UserSelect;

export class UserManagementError extends Error {
  constructor(public code: string, public status = 409) { super(code); }
}

export async function listUsers(query: UserQuery) {
  const pageSize = 15;
  const where: Prisma.UserWhereInput = {
    ...(query.q ? { OR: ["name", "email", "phone"].map((key) => ({ [key]: { contains: query.q, mode: "insensitive" } })) } : {}),
    ...(query.role !== "ALL" ? { role: query.role } : {}),
    ...(query.status !== "ALL" ? { isActive: query.status === "ACTIVE" } : {}),
  };
  return db.$transaction(async (tx) => {
    const [total, all, active, admins] = await Promise.all([
      tx.user.count({ where }), tx.user.count(), tx.user.count({ where: { isActive: true } }),
      tx.user.count({ where: { role: "ADMIN", isActive: true } }),
    ]);
    const page = Math.min(query.page, Math.max(1, Math.ceil(total / pageSize)));
    const users = await tx.user.findMany({ where, select: publicUser, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize });
    return { users, total, page, pageSize, stats: { total: all, active, inactive: all - active, admins } };
  }, { isolationLevel: "RepeatableRead" });
}

async function withAdminWrite<T>(actorId: string, action: (tx: Prisma.TransactionClient) => Promise<T>) {
  return db.$transaction(async (tx) => {
    // Serialize admin mutations so concurrent demotions cannot remove every admin.
    await tx.$queryRaw`SELECT 1 AS locked FROM pg_advisory_xact_lock(72410621)`;
    const actor = await tx.user.findUnique({ where: { id: actorId }, select: { role: true, isActive: true } });
    if (!actor?.isActive || actor.role !== "ADMIN") throw new UserManagementError("forbidden", 403);
    return action(tx);
  });
}

export async function createUser(actorId: string, input: CreateUserInput) {
  const { password, ...profile } = input;
  const passwordHash = await bcrypt.hash(password, 12);
  return withAdminWrite(actorId, (tx) => tx.user.create({ data: { ...profile, phone: profile.phone || null, passwordHash }, select: publicUser }));
}

export async function changeUser(actorId: string, id: string, updatedAt: string, change: UpdateUserInput | { password: string } | { isActive: boolean } | null, email?: string) {
  const passwordHash = change && "password" in change ? await bcrypt.hash(change.password, 12) : null;
  const result = await withAdminWrite(actorId, async (tx) => {
    const current = await tx.user.findUnique({ where: { id } });
    if (!current) throw new UserManagementError("notFound", 404);
    if (current.updatedAt.toISOString() !== updatedAt) throw new UserManagementError("conflict");
    const next = change && "isActive" in change ? { ...current, ...change } : change ? current : null;
    const activeAdmins = await tx.user.count({ where: { role: "ADMIN", isActive: true } });
    const accessError = userAccessError(actorId, current, next, activeAdmins);
    if (accessError) throw new UserManagementError(accessError);
    if (!change) {
      if (email !== current.email) throw new UserManagementError("confirmation", 400);
      await tx.user.delete({ where: { id } });
      return null;
    }
    if (passwordHash) {
      return tx.user.update({ where: { id }, data: { passwordHash, sessionVersion: { increment: 1 } }, select: publicUser });
    }
    if (!("role" in change)) {
      if (!("isActive" in change)) throw new UserManagementError("invalid", 400);
      return tx.user.update({ where: { id }, data: {
        isActive: change.isActive,
        ...(current.isActive !== change.isActive ? { sessionVersion: { increment: 1 } } : {}),
      }, select: publicUser });
    }
    const { updatedAt: _version, ...profile } = change;
    const revoke = current.email !== profile.email || current.role !== profile.role || current.isActive !== profile.isActive;
    return tx.user.update({
      where: { id },
      data: { ...profile, phone: profile.phone || null, ...(revoke ? { sessionVersion: { increment: 1 } } : {}) },
      select: publicUser,
    });
  });
  disconnectUserChat(id);
  return result;
}
