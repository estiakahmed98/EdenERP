import { prisma } from "@/lib/prisma";

function isLocalOrPrivateIp(ip: string) {
  const s = ip.toLowerCase();
  return (
    s === "::1" ||
    s.startsWith("127.") ||
    s.startsWith("10.") ||
    s.startsWith("192.168.") ||
    s.startsWith("fc") ||
    s.startsWith("fd") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(s)
  );
}

type GeoLookupResponse = {
  status?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  regionName?: string;
  lat?: number;
  lon?: number;
  isp?: string;
};

/** The analytics cache stores country *names*; map the one we act on. */
const ISO_BY_NAME: Record<string, string> = { bangladesh: "BD" };

function toIso(country: string | null | undefined) {
  if (!country) return null;
  if (/^[A-Za-z]{2}$/.test(country)) return country.toUpperCase();
  return ISO_BY_NAME[country.trim().toLowerCase()] ?? "XX";
}

/**
 * ISO country code for an IP. Reads/writes the analytics GeoIpCache table so a
 * returning visitor never triggers another third-party lookup.
 * Returns "XX" for a known non-Bangladesh country, null when unknown.
 */
export async function lookupCountry(ip: string): Promise<string | null> {
  if (isLocalOrPrivateIp(ip)) return null;

  try {
    const cached = await prisma.geoIpCache.findUnique({ where: { ip } });
    if (cached?.country) return toIso(cached.country);
  } catch {
    // Cache unavailable: fall through to the live lookup.
  }

  const fields = "status,country,countryCode,city,regionName,lat,lon,isp";
  const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=${fields}`;
  let json: GeoLookupResponse;
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(1500) });
    json = (await res.json()) as GeoLookupResponse;
  } catch {
    return null;
  }
  if (json?.status !== "success") return null;

  try {
    await prisma.geoIpCache.upsert({
      where: { ip },
      update: {},
      create: {
        ip,
        country: typeof json.country === "string" ? json.country : null,
        city: typeof json.city === "string" ? json.city : null,
        region: typeof json.regionName === "string" ? json.regionName : null,
        lat: typeof json.lat === "number" ? json.lat : null,
        lon: typeof json.lon === "number" ? json.lon : null,
        isp: typeof json.isp === "string" ? json.isp : null,
      },
    });
  } catch {
    // Best-effort cache.
  }

  return typeof json.countryCode === "string"
    ? json.countryCode.toUpperCase()
    : toIso(json.country);
}
