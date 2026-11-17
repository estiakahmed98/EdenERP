import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { getAuthSecret } from "../lib/auth-secret.ts";

const require = createRequire(import.meta.url);
const { default: NextAuth, getServerSession } = require("next-auth/next");
const { encode } = require("next-auth/jwt");

test("auth secret prefers NEXTAUTH_SECRET and skips blank values", () => {
  assert.equal(getAuthSecret({ NEXTAUTH_SECRET: "primary", AUTH_SECRET: "alias" }), "primary");
  assert.equal(getAuthSecret({ NEXTAUTH_SECRET: "", AUTH_SECRET: "alias" }), "alias");
  assert.equal(getAuthSecret({ NEXTAUTH_SECRET: " \t", AUTH_SECRET: "alias" }), "alias");
  assert.equal(getAuthSecret({ NEXTAUTH_SECRET: "primary", AUTH_SECRET: "" }), "primary");
});

test("missing or blank secrets fail before NextAuth derives incompatible keys", () => {
  for (const env of [{}, { NEXTAUTH_SECRET: "", AUTH_SECRET: " \t" }]) {
    assert.throws(() => getAuthSecret(env), /Set NEXTAUTH_SECRET or AUTH_SECRET/);
  }
});

test("the session API and getServerSession accept the same encrypted cookie", async () => {
  const secret = getAuthSecret({ NEXTAUTH_SECRET: "", AUTH_SECRET: "regression-test-secret-for-auth-only" });
  const token = await encode({ secret, token: { sub: "test-user", name: "Test Admin", email: "test@example.invalid" } });
  const options = {
    secret,
    session: { strategy: "jwt" },
    providers: [{ id: "credentials", name: "Credentials", type: "credentials", credentials: {}, authorize: async () => null }],
  };
  const req = {
    method: "GET",
    headers: {},
    query: { nextauth: ["session"] },
    cookies: { "next-auth.session-token": token },
  };
  let apiSession: { user?: unknown } | undefined;
  const headers = new Map();
  const res = {
    getHeader: (key: string) => headers.get(key),
    setHeader: (key: string, value: unknown) => headers.set(key, value),
    status: () => res,
    json: (body: { user?: unknown }) => { apiSession = body; },
    send: (body: { user?: unknown }) => { apiSession = body; },
    end: () => {},
  };

  await NextAuth(req, res, options);
  // NextAuth strips providers inside getServerSession. Without an explicit
  // secret, this path derives a different encryption key from the API route.
  const serverSession = await getServerSession(req, res, options);
  assert.ok(serverSession?.user);
  assert.equal(serverSession.user.email, "test@example.invalid");
  assert.deepEqual(serverSession.user, apiSession?.user);
});
