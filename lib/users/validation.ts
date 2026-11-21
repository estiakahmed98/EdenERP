import { z } from "zod";

export const passwordSchema = z.string().min(8).refine(
  (value) => new TextEncoder().encode(value).length <= 72,
  "Password must contain between 8 characters and 72 UTF-8 bytes",
);

const profile = {
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  phone: z.string().trim().max(40).refine((value) => !value || /^[+\d\s().-]{5,40}$/.test(value)),
  role: z.enum(["USER", "ADMIN"]),
  isActive: z.boolean(),
};

export const createUserSchema = z.object({ ...profile, password: passwordSchema }).strict();
export const updateUserSchema = z.object({
  ...profile,
  updatedAt: z.iso.datetime(),
}).strict();
export const resetPasswordSchema = z.object({ password: passwordSchema, updatedAt: z.iso.datetime() }).strict();
export const userStatusSchema = z.object({ isActive: z.boolean(), updatedAt: z.iso.datetime() }).strict();
export const deleteUserSchema = z.object({ email: z.email(), updatedAt: z.iso.datetime() }).strict();
export const userQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  role: z.enum(["ALL", "USER", "ADMIN"]).default("ALL"),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).default("ALL"),
  page: z.coerce.number().int().min(1).max(100_000).default(1),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;

export type ManagedUser = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type UserList = {
  users: ManagedUser[];
  total: number;
  page: number;
  pageSize: number;
  stats: { total: number; active: number; inactive: number; admins: number };
};

/** Also enforced inside the locked database transaction, never only in the UI. */
export function userAccessError(
  actorId: string,
  current: { id: string; role: string; isActive: boolean },
  next: { role: string; isActive: boolean } | null,
  activeAdmins: number,
) {
  if (current.id === actorId && (!next || next.role !== "ADMIN" || !next.isActive)) return "selfProtection";
  if (current.role === "ADMIN" && current.isActive && (!next || next.role !== "ADMIN" || !next.isActive) && activeAdmins <= 1) return "lastAdmin";
  return null;
}
