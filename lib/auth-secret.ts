/** Keep JWT encryption identical in API routes and server session checks. */
export function getAuthSecret(env: Record<string, string | undefined> = process.env): string {
  for (const key of ["NEXTAUTH_SECRET", "AUTH_SECRET"] as const) {
    const value = env[key];
    if (value?.trim()) return value;
  }

  // NextAuth's development fallback hashes options, but getServerSession removes
  // providers. That produces a different key and a sign-in redirect loop.
  throw new Error("Set NEXTAUTH_SECRET or AUTH_SECRET to a persistent random secret in your environment (including development).");
}
