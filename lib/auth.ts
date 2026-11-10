import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getClientIp } from "@/lib/security/client-ip";
import { createRateLimiter } from "@/lib/security/rate-limit";

// Brute-force guard: per account+IP and per IP (credential stuffing across accounts).
const loginPerAccount = createRateLimiter({ limit: 10, windowMs: 15 * 60_000 });
const loginPerIp = createRateLimiter({ limit: 50, windowMs: 15 * 60_000 });

function headerReader(headers: unknown) {
  const h = (headers ?? {}) as Record<string, string | string[] | undefined>;
  return {
    get(name: string) {
      const v = h[name] ?? h[name.toLowerCase()];
      return Array.isArray(v) ? (v[0] ?? null) : (v ?? null);
    },
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).trim().toLowerCase().slice(0, 254);
        const password = String(credentials.password);
        // bcrypt only uses the first 72 bytes; reject absurd inputs early.
        if (password.length > 256) return null;

        const ip = getClientIp(headerReader(req?.headers)) ?? "unknown";
        // Per-IP limit only when the IP is known; otherwise all clients would share one bucket.
        const perIpOk = ip === "unknown" ? true : loginPerIp.check(ip).ok;
        const perAccount = loginPerAccount.check(`${email}|${ip}`);
        if (!perIpOk || !perAccount.ok) {
          throw new Error("Too many sign-in attempts. Please try again later.");
        }

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash,
        );
        if (!isPasswordValid) return null;

        loginPerAccount.reset(`${email}|${ip}`);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
};
