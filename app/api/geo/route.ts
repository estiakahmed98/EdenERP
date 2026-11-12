import { NextResponse } from "next/server";

import { getClientIp } from "@/lib/security/client-ip";
import { countryFromHeaders } from "@/lib/geo/locale-cookies";
import { lookupCountry } from "@/lib/geo/lookup";

export const dynamic = "force-dynamic";

/**
 * Visitor country for the client-side locale fallback. Only called when the
 * host sets no country header (self-hosted without GeoIP), so proxy.ts could
 * not decide. Responds `{ country: "BD" | "<ISO>" | "XX" | null }`.
 */
export async function GET(req: Request) {
  let country = countryFromHeaders(req.headers);
  if (!country) {
    const ip = getClientIp(req.headers);
    country = ip ? await lookupCountry(ip) : null;
  }
  return NextResponse.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
