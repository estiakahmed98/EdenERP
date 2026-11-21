import { test } from "node:test";
import assert from "node:assert/strict";
import { createUserSchema, passwordSchema, updateUserSchema, userAccessError, userQuerySchema, userStatusSchema } from "../lib/users/validation.ts";

const profile = { name: "Test User", email: "  TEAM@Example.com  ", phone: "+880 1700 000000", role: "USER", isActive: true, password: "Example-password-42" };

test("admin creation normalizes identity and rejects mass assignment", () => {
  const result = createUserSchema.parse(profile);
  assert.equal(result.email, "team@example.com");
  for (const extra of [{ sessionVersion: 10 }, { id: "existing-user" }, { passwordHash: "raw" }]) {
    assert.equal(createUserSchema.safeParse({ ...profile, ...extra }).success, false);
  }
  for (const patch of [{ email: "bad email@example.com" }, { name: "  " }, { role: "SUPERADMIN" }, { isActive: "false" }, { phone: "<script>" }]) {
    assert.equal(createUserSchema.safeParse({ ...profile, ...patch }).success, false);
  }
});

test("passwords enforce bcrypt's byte boundary for multibyte input", () => {
  assert.equal(passwordSchema.safeParse("short").success, false);
  assert.equal(passwordSchema.safeParse("a".repeat(72)).success, true);
  assert.equal(passwordSchema.safeParse("a".repeat(73)).success, false);
  assert.equal(passwordSchema.safeParse("আ".repeat(24)).success, true);
  assert.equal(passwordSchema.safeParse("আ".repeat(25)).success, false);
});

test("pagination rejects invalid ranges and unsupported filters", () => {
  assert.deepEqual(userQuerySchema.parse({}), { q: "", page: 1, role: "ALL", status: "ALL" });
  for (const query of [{ page: -1 }, { page: 0 }, { page: 1.5 }, { page: "x" }, { role: "OWNER" }, { status: "DISABLED" }, { q: "a".repeat(101) }]) {
    assert.equal(userQuerySchema.safeParse(query).success, false);
  }
});

test("profile and status mutations require a version and forbid unrelated fields", () => {
  const { password: _password, ...details } = profile;
  assert.equal(updateUserSchema.safeParse(details).success, false);
  assert.equal(updateUserSchema.safeParse({ ...details, updatedAt: new Date().toISOString() }).success, true);
  assert.equal(userStatusSchema.safeParse({ isActive: false, updatedAt: new Date().toISOString(), role: "ADMIN" }).success, false);
});

test("an administrator cannot remove their own access, even with other admins", () => {
  const self = { id: "admin-1", role: "ADMIN", isActive: true };
  for (const change of [null, { role: "USER", isActive: true }, { role: "ADMIN", isActive: false }]) {
    assert.equal(userAccessError(self.id, self, change, 4), "selfProtection");
  }
  assert.equal(userAccessError(self.id, self, self, 1), null);
});

test("last active admin stays protected, while inactive admins and users can be managed", () => {
  const admin = { id: "other", role: "ADMIN", isActive: true };
  assert.equal(userAccessError("actor", admin, null, 1), "lastAdmin");
  assert.equal(userAccessError("actor", admin, { role: "USER", isActive: true }, 1), "lastAdmin");
  assert.equal(userAccessError("actor", admin, { role: "ADMIN", isActive: false }, 1), "lastAdmin");
  assert.equal(userAccessError("actor", admin, null, 2), null);
  assert.equal(userAccessError("actor", { ...admin, isActive: false }, null, 1), null);
  assert.equal(userAccessError("actor", { ...admin, role: "USER" }, null, 1), null);
});
